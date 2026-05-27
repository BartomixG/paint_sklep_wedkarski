import { useState, useEffect, useCallback } from 'react';
import { MapPin, Calendar, CheckCircle, ChevronDown, Clock, ShoppingBag, X, Image as ImageIcon, DollarSign, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/api';

// Stałe przedziały rezerwacji (pół dnia)
const RESERVATION_SLOTS = [
  { id: 'DAY', name: 'Dzień', time: '06:00 - 18:00', start: '06:00', end: '18:00', price: 50 },
  { id: 'NIGHT', name: 'Noc', time: '18:00 - 06:00', start: '18:00', end: '06:00', price: 50 }
];

const MOCK_RECOMMENDATIONS = [
  { id: 101, name: "Wędka Karpiowa Pro 360", price: "299.00", category: "Wędki" },
  { id: 102, name: "Zestaw Spławików (5 szt.)", price: "24.99", category: "Akcesoria" },
  { id: 103, name: "Podbierak Teleskopowy", price: "89.00", category: "Akcesoria" },
];

const MapArea = () => {
  const [lakes, setLakes] = useState([]);
  const [spots, setSpots] = useState([]);
  const [existingOrders, setExistingOrders] = useState([]);
  const [userCartHasReservation, setUserCartHasReservation] = useState(false); // NOWE: Stan przechowujący informację o rezerwacji w koszyku

  const [selectedLakeId, setSelectedLakeId] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null); // Przechowuje wybrany slot (DAY lub NIGHT)
  const [showModal, setShowModal] = useState(false);

  const currentLake = lakes.find(lake => lake.id === selectedLakeId) || null;
  
  const today = new Date();
  const todayString = today.toLocaleDateString('en-CA'); 
  const currentHour = today.getHours();
  const userId = localStorage.getItem('userId');

  // NOWE: Pobieranie koszyka użytkownika, aby sprawdzić obecność rezerwacji
  const fetchCartReservationStatus = useCallback(() => {
    if (!userId) return;
    
    fetch(`${API_BASE_URL}/cart/${userId}/reservation`)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Błąd pobierania koszyka");
      })
      .then(cart => {
        // Jeśli koszyk istnieje i pole fishingStand nie jest nullem, użytkownik ma już rezerwację
        if (cart && cart.fishingStand) {
          setUserCartHasReservation(true);
        } else {
          setUserCartHasReservation(false);
        }
      })
      .catch(err => console.error("Błąd podczas sprawdzania rezerwacji w koszyku:", err));
  }, [userId]);

  useEffect(() => {
    fetchCartReservationStatus();
  }, [fetchCartReservationStatus]);

  // 1. Pobieranie łowisk z bazy i zabezpieczenie brakujących zdjęć
  useEffect(() => {
    fetch(`${API_BASE_URL}/fisheries`)
      .then(res => res.json())
      .then(data => {
        const enrichedLakes = data.map(lake => {
          let imagePath = lake.image;
          if (!imagePath) {
            if (lake.id === 1) imagePath = "/lake-map.jpg";
            else if (lake.id === 2) imagePath = "/lake-map-2.jpg";
            else imagePath = "/lake-map.jpg";
          }
          return { ...lake, image: imagePath };
        });

        setLakes(enrichedLakes);
        if (enrichedLakes.length > 0) {
          setSelectedLakeId(enrichedLakes[0].id);
        }
      })
      .catch(err => console.error("Błąd podczas pobierania łowisk:", err));
  }, []);

  // 2. Pobieranie stanowisk i pozycjonowanie na mapie
  useEffect(() => {
    if (!selectedLakeId) return;
    
    fetch(`${API_BASE_URL}/stands/fishery/${selectedLakeId}`)
      .then(res => res.json())
      .then(data => {
        const defaultCoordinates = [
          { top: '20%', left: '15%' },
          { top: '45%', left: '15%' },
          { top: '45%', left: '65%' },
          { top: '75%', left: '85%' },
          { top: '85%', left: '35%' },
          { top: '35%', left: '45%' },
          { top: '60%', left: '75%' },
          { top: '15%', left: '70%' }
        ];

        const enrichedSpots = (data || []).map((spot, index) => {
          const coords = defaultCoordinates[index % defaultCoordinates.length];
          return {
            ...spot,
            top: spot.top || coords.top,   
            left: spot.left || coords.left, 
            name: spot.name || `Stanowisko ${spot.id}`
          };
        });

        setSpots(enrichedSpots);
      })
      .catch(err => console.error("Błąd podczas pobierania stanowisk:", err));
  }, [selectedLakeId]);

  // 3. Pobieranie wszystkich zamówień w celu weryfikacji zajętości terminów
  const fetchOrders = useCallback(() => {
    fetch(`${API_BASE_URL}/orders/all`)
      .then(res => res.json())
      .then(data => {
        setExistingOrders(data || []);
      })
      .catch(err => console.error("Błąd podczas pobierania zamówień:", err));
  }, []);

  // REAKTYWNOŚĆ: Wywołaj pobieranie za KAŻDYM RAZEM, gdy użytkownik zmieni parametry
  useEffect(() => {
    fetchOrders();
  }, [selectedDate, selectedLakeId, selectedSpot, fetchOrders]);

  const handleLakeChange = (e) => {
    setSelectedLakeId(parseInt(e.target.value));
    setSelectedSpot(null); 
    setSelectedDate("");
    setSelectedSlot(null);
  };

  const isSlotDisabled = (slot) => {
    if (!selectedSpot || !selectedDate) return true;

    // 1. Zabezpieczenie przed przeszłością (jeśli dzisiaj minęła już godzina startu)
    if (selectedDate === todayString) {
      if (slot.id === 'DAY' && currentHour >= 18) return true;
      if (slot.id === 'NIGHT' && currentHour >= 6) return true; 
    }

    // 2. Sprawdzenie zajętości w pobranych, aktualnych zamówieniach
    return existingOrders.some(order => {
      if (order.status === 'CANCELLED' || order.status === 'ANULOWANE') {
        return false;
      }

      const orderStandId = order.fishingStand?.id;
      if (!orderStandId || Number(orderStandId) !== Number(selectedSpot.id)) {
        return false;
      }

      let orderDate = order.reservationDate;
      if (orderDate && orderDate.includes('T')) {
        orderDate = orderDate.split('T')[0];
      }

      const isSameDate = orderDate === selectedDate || 
                         (order.startTime && order.startTime.startsWith(selectedDate));

      if (!isSameDate) return false;

      const isSameTime = order.startTime && order.startTime.includes(slot.start);
      return isSameTime;
    });
  };

  // 4. Złożenie zamówienia do bazy danych z przekazaniem daty
  const handleAddToCart = async () => {
    if (!selectedSpot || !selectedDate || !selectedSlot) return;

    // Dodatkowe zabezpieczenie front-endowe przed wysłaniem requestu
    if (userCartHasReservation) {
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Musisz się zalogować, aby dodać rezerwację do koszyka.");
      return;
    }

    const payload = {
      fishingStand: { id: selectedSpot.id },
      reservationDate: selectedDate, 
      startTime: selectedSlot.start, 
      endTime: selectedSlot.end      
    };

    try {
      const response = await fetch(`http://localhost:8080/api/cart/${userId}/reservation`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setShowModal(true); 
        fetchCartReservationStatus(); // Odśwież stan koszyka po udanej rezerwacji
      } else {
        alert("Nie udało się dodać rezerwacji do koszyka.");
      }
    } catch (error) {
      console.error("Błąd zapisu rezerwacji w koszyku:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Górny panel wyboru łowiska */}
        <div className="bg-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between text-white">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <MapPin className="text-blue-500" size={28} />
            <h2 className="text-2xl font-black tracking-wide">Wybierz Łowisko:</h2>
          </div>
          <div className="relative w-full sm:w-72 text-slate-900">
            <select 
              className="w-full appearance-none bg-white p-3 pr-10 rounded-xl font-bold border-2 border-transparent focus:border-blue-500 outline-none cursor-pointer shadow-sm"
              value={selectedLakeId || ""}
              onChange={handleLakeChange}
            >
              {lakes.map(lake => (
                <option key={lake.id} value={lake.id}>{lake.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Lewa strona: Mapa interaktywna */}
          <div className="w-full lg:w-2/3 p-8 bg-slate-50 relative min-h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              {currentLake?.image && (
                <img src={currentLake.image} alt={currentLake.name} className="w-full h-auto object-cover aspect-video" />
              )}
              <div className="absolute inset-0 bg-slate-900/20 pointer-events-none"></div>
              
              {spots.map((spot) => {
                const available = spot.isAvailable;
                const isSelected = selectedSpot?.id === spot.id;

                return (
                  <button
                    key={spot.id}
                    onClick={() => { setSelectedSpot(spot); setSelectedSlot(null); }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 z-10"
                    style={{ top: spot.top, left: spot.left }}
                  >
                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-xl border-2 transition-colors ${
                      !available 
                        ? (isSelected ? 'bg-red-600 border-red-300 scale-110 ring-4 ring-red-500/50 text-white' : 'bg-red-500 border-red-700 hover:bg-red-600 text-white')
                        : (isSelected ? 'bg-blue-600 border-blue-300 scale-110 ring-4 ring-blue-500/50 text-white' : 'bg-slate-800 border-slate-600 hover:bg-slate-700 text-white')
                    }`}>
                      <span className="font-bold text-sm text-white">{spot.id}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prawa strona: Formularz rezerwacji */}
          <div className="w-full lg:w-1/3 p-8 border-l border-slate-100 bg-white">
            {!selectedSpot ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-4">
                <MapPin size={48} className="opacity-20" />
                <p className="text-lg font-medium">Kliknij pinezkę na mapie, aby sprawdzić dostępne terminy.</p>
              </div>
            ) : !selectedSpot.isAvailable ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 bg-red-100 text-red-700">Stanowisko wyłączone</span>
                    <h3 className="text-3xl font-black text-slate-800">{selectedSpot.name}</h3>
                  </div>
                  <div className="text-center p-6 border-2 border-dashed border-red-200 rounded-2xl text-red-600 bg-red-50/50 mt-4">
                    <X size={32} className="mx-auto mb-2 text-red-500" />
                    <p className="font-bold">To stanowisko jest obecnie niedostępne do rezerwacji.</p>
                    <p className="text-xs text-red-500/80 mt-1">Wybierz inne stanowisko na mapie.</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-slate-100 opacity-50 pointer-events-none">
                  <button disabled className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-bold text-lg bg-slate-200 text-slate-400 cursor-not-allowed">
                    Niedostępne
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 bg-blue-100 text-blue-700">Wybrane stanowisko</span>
                    <h3 className="text-3xl font-black text-slate-800">{selectedSpot.name}</h3>
                  </div>

                  {/* Wybór daty */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                      <Calendar size={16} className="text-blue-500" /> Wybierz dzień
                    </label>
                    <input 
                      type="date" 
                      min={todayString} 
                      value={selectedDate} 
                      onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot(null); }} 
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium" 
                    />
                  </div>

                  {/* Wybór pory dnia */}
                  {selectedDate ? (
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                        <Clock size={16} className="text-blue-500" /> Wybierz porę rezerwacji
                      </label>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {RESERVATION_SLOTS.map(slot => {
                          const disabled = isSlotDisabled(slot);
                          const isSelected = selectedSlot?.id === slot.id;
                          
                          return (
                            <button
                              key={slot.id}
                              disabled={disabled}
                              onClick={() => setSelectedSlot(slot)}
                              className={`w-full p-4 rounded-2xl border text-left transition-all flex justify-between items-center ${
                                disabled 
                                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60' 
                                  : isSelected
                                    ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20'
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                              }`}
                            >
                              <div>
                                <p className="font-bold text-base">{slot.name}</p>
                                <p className="text-xs text-slate-500">{slot.time}</p>
                              </div>
                              <div className="text-right">
                                <span className={`font-black text-lg ${disabled ? 'text-slate-400' : 'text-slate-900'}`}>
                                  {disabled ? 'Zajęte' : `${slot.price} PLN`}
                                </span>
                                {!disabled && <p className="text-[10px] text-slate-400">pół dnia</p>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 bg-slate-50/50 mt-4">
                      Wybierz datę powyżej, aby zobaczyć dostępne bloki godzinowe.
                    </div>
                  )}
                </div>

                {/* Sekcja podsumowania i Przycisku */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className={`flex justify-between items-center mb-4 p-4 rounded-xl border transition-all ${
                    selectedSlot 
                      ? 'bg-blue-50/60 border-blue-100' 
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}>
                    <span className="text-slate-700 font-medium flex items-center gap-1">
                      <DollarSign size={16} className={selectedSlot ? 'text-blue-600' : 'text-slate-400'} /> Do zapłaty:
                    </span>
                    <span className={`text-2xl font-black ${selectedSlot ? 'text-slate-900' : 'text-slate-400'}`}>
                      {selectedSlot ? `${selectedSlot.price} PLN` : '0 PLN'}
                    </span>
                  </div>
                  
                  {/* WARUNKOWY PRZYCISK: Jeśli rezerwacja jest już w koszyku, pokazujemy żółty przycisk blokady */}
                  {userCartHasReservation ? (
                    <div className="w-full flex flex-col gap-2 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
                      <button 
                        disabled
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-lg bg-amber-500 text-white cursor-not-allowed opacity-90 shadow-sm"
                      >
                        <AlertTriangle size={24} /> 
                        Rezerwacja niemożliwa
                      </button>
                      <p className="text-xs font-semibold text-center mt-1">
                        Masz już rezerwację w koszyku. Na jedno zamówienie przypada maksymalnie jedno stanowisko.
                      </p>
                    </div>
                  ) : (
                    /* Standardowy przycisk rezerwacji */
                    <button 
                      onClick={handleAddToCart} 
                      disabled={!selectedSlot}
                      className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-bold text-lg transition-all ${
                        selectedSlot 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-70'
                      }`}
                    >
                      <CheckCircle size={24} /> 
                      {!selectedDate 
                        ? 'Wybierz datę' 
                        : !selectedSlot 
                          ? 'Wybierz porę rezerwacji' 
                          : 'Rezerwuj stanowisko'}
                    </button>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal - Rekomendacje produktów */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-2xl font-black text-green-600 flex items-center gap-2">
                  <CheckCircle className="text-green-500" /> Rezerwacja dodana pomyślnie!
                </h3>
                <p className="text-slate-500 mt-1">Twój termin został zapisany. Potrzebujesz sprzętu na wyprawę? Zobacz nasze rekomendacje.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition-colors">
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_RECOMMENDATIONS.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                    <Link to={`/sklep/produkt/${item.id}`} className="block relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center">
                      <ImageIcon size={48} className="text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                    </Link>
                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-xs font-bold text-blue-500 uppercase mb-1">{item.category}</span>
                      <h4 className="font-bold text-slate-800 mb-4 line-clamp-2">{item.name}</h4>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xl font-black text-slate-900">{item.price} zł</span>
                        <button className="bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white p-2.5 rounded-xl transition-colors">
                          <ShoppingBag size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 font-bold text-slate-600 hover:text-slate-900 transition-colors">
                Pomiń
              </button>
              <Link to="/koszyk" className="px-8 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center">
                Przejdź do koszyka
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapArea;