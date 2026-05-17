import { useState } from 'react';
import { MapPin, Calendar, CheckCircle, ChevronDown, Clock, ShoppingBag, X, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// TODO: Te dwa łowiska zostają w kodzie, są jako podstawowe
// Pobierz z bazy nowo dodane łowiska przez admina i doklej je do tej tablicy
const DEFAULT_LAKES = [
  { id: 1, name: "Jezioro Ciche (Główne)", image: "/lake-map.jpg" },
  { id: 2, name: "Staw Ósemka (Mały)", image: "/lake-map-2.jpg" },
];

// TODO: Stanowiska także pobierane z bazy na podstawie tego co admin dodał
const DEFAULT_SPOTS = {
  1: [ 
      { id: 1, top: '20%', left: '15%', name: "Stanowisko 1 (Karp)" },
      { id: 2, top: '45%', left: '15%', name: "Stanowisko 2 (Drapieżnik)" },
      { id: 3, top: '45%', left: '65%', name: "Stanowisko 3 (Spławik)" },
      { id: 4, top: '75%', left: '85%', name: "Stanowisko 4 (Cicha zatoka)" },
      { id: 5, top: '85%', left: '35%', name: "Stanowisko 5 (Płycizna)" },
      { id: 6, top: '65%', left: '15%', name: "Stanowisko 6 (Głęboka woda)" },
  ],
  2: [ 
    { id: 1, top: '25%', left: '90%', name: "Stanowisko 1 (Karp)" },
    { id: 2, top: '70%', left: '95%', name: "Stanowisko 2 (Płycizna)" },
    { id: 3, top: '25%', left: '15%', name: "Stanowisko 3 (Spławik)" },
    { id: 4, top: '65%', left: '7%', name: "Stanowisko 4 (Karp)" },
  ]
};

// TODO: Pobieranie dostępności stanowisk, finalnie będzie pobierne z bazy
const getBookedHoursMock = () => {
  return ["10:00", "11:00", "12:00", "13:00"];
};

// TODO: To Mock Data polecanego sprzętu, docelowo będzie to jakas funkcja, która na podstawie tego wybranego stanowiska pobiera produkty ze sklepu rekomendowane
const MOCK_RECOMMENDATIONS = [
  { id: 101, name: "Wędka Karpiowa Pro 360", price: "299.00", category: "Wędki" },
  { id: 102, name: "Zestaw Spławików (5 szt.)", price: "24.99", category: "Akcesoria" },
  { id: 103, name: "Podbierak Teleskopowy", price: "89.00", category: "Akcesoria" },
];

const ALL_HOURS = Array.from({ length: 17 }, (_, i) => `${String(i + 6).padStart(2, '0')}:00`);

const MapArea = () => {
  const [selectedLakeId, setSelectedLakeId] = useState(DEFAULT_LAKES[0].id);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showModal, setShowModal] = useState(false);

  const currentLake = DEFAULT_LAKES.find(lake => lake.id === selectedLakeId);
  const currentSpots = DEFAULT_SPOTS[selectedLakeId] || [];
  const bookedHours = (selectedSpot && selectedDate) ? getBookedHoursMock() : [];
  
  const today = new Date();
  const todayString = today.toLocaleDateString('en-CA'); 
  const currentHour = today.getHours();

  const handleLakeChange = (e) => {
    setSelectedLakeId(parseInt(e.target.value));
    setSelectedSpot(null); 
    setSelectedDate("");
    setStartTime("");
    setEndTime("");
  };

  const isHourDisabled = (hourStr) => {
    if (bookedHours.includes(hourStr)) return true;
    if (selectedDate === todayString) {
      const hourNum = parseInt(hourStr.split(':')[0]);
      if (hourNum <= currentHour) return true;
    }
    return false;
  };

  const isEndTimeDisabled = (hourStr) => {
    if (!startTime) return true;
    
    const startNum = parseInt(startTime.split(':')[0]);
    const endNum = parseInt(hourStr.split(':')[0]);
    
    if (endNum <= startNum) return true;
    
    // Blokowanie wyboru godzin pomiędzy startem a końcem, które są już zarezerwowane
    for (let i = startNum; i < endNum; i++) {
       const checkHour = `${String(i).padStart(2, '0')}:00`;
       if (bookedHours.includes(checkHour)) return true;
       // Zabezpieczenie przed przeskakiwaniem minionych godzin z dzisiaj
       if (selectedDate === todayString && i <= currentHour) return true;
    }
    
    return false;
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 p-6 flex flex-col sm:flex-row items-center justify-between text-white">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <MapPin className="text-blue-500" size={28} />
            <h2 className="text-2xl font-black tracking-wide">Wybierz Łowisko:</h2>
          </div>
          <div className="relative w-full sm:w-72 text-slate-900">
            {/* TODO: Zmodyfikuj mapowanie, żeby uwzględniało nowe łowiska z bazy */}
            <select 
              className="w-full appearance-none bg-white p-3 pr-10 rounded-xl font-bold border-2 border-transparent focus:border-blue-500 outline-none cursor-pointer shadow-sm"
              value={selectedLakeId}
              onChange={handleLakeChange}
            >
              {DEFAULT_LAKES.map(lake => (
                <option key={lake.id} value={lake.id}>{lake.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 p-8 bg-slate-50 relative min-h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={currentLake.image} alt={currentLake.name} className="w-full h-auto object-cover aspect-video" />
              <div className="absolute inset-0 bg-slate-900/20 pointer-events-none"></div>
              
              {currentSpots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => { setSelectedSpot(spot); setStartTime(""); setEndTime(""); }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 z-10"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-xl border-2 transition-colors ${selectedSpot?.id === spot.id ? 'bg-blue-600 border-blue-300 scale-110 ring-4 ring-blue-500/50' : 'bg-slate-800 border-slate-600 hover:bg-slate-700 text-white'}`}>
                    <span className="font-bold text-sm text-white">{spot.id}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 p-8 border-l border-slate-100 bg-white">
            {!selectedSpot ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-4">
                <MapPin size={48} className="opacity-20" />
                <p className="text-lg font-medium">Kliknij pinezkę na mapie, aby sprawdzić dostępne terminy.</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 h-full flex flex-col">
                <div className="mb-6">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 bg-blue-100 text-blue-700">Wybrane stanowisko</span>
                  <h3 className="text-3xl font-black text-slate-800">{selectedSpot.name}</h3>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <Calendar size={16} className="text-blue-500" /> Wybierz dzień
                  </label>
                  <input type="date" min={todayString} value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setStartTime(""); setEndTime(""); }} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium" />
                </div>

                {selectedDate ? (
                  <div className="flex-grow flex flex-col">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <Clock size={16} className="text-blue-500" /> Wybierz godziny
                      </div>
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="text-xs text-slate-500 font-bold block mb-1">Od godziny</label>
                          <select value={startTime} onChange={(e) => { setStartTime(e.target.value); setEndTime(""); }} className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer">
                            <option value="" disabled>Wybierz...</option>
                            {ALL_HOURS.map(hour => (
                              <option key={hour} value={hour} disabled={isHourDisabled(hour)}>
                                {hour} {isHourDisabled(hour) ? "(Zajęte)" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-1/2">
                          <label className="text-xs text-slate-500 font-bold block mb-1">Do godziny</label>
                          <select value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={!startTime} className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer disabled:opacity-50">
                            <option value="" disabled>Wybierz...</option>
                            {ALL_HOURS.map(hour => (
                              <option key={hour} value={hour} disabled={isEndTimeDisabled(hour)}>
                                {hour} {isEndTimeDisabled(hour) ? "(Zajęte)" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {startTime && endTime && (
                      <div className="mt-auto pt-6">
                        {/* TODO: Pod ten przycisk podpiąć wysyłkę formularza rezerwacji */}
                        <button onClick={() => setShowModal(true)} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
                          <CheckCircle size={24} /> Dodaj do rezerwacji
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 bg-slate-50/50 mt-4">
                    Wybierz datę powyżej, aby zobaczyć dostępne godziny rezerwacji.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Polecany sprzęt */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  <CheckCircle className="text-green-500" /> Rezerwacja dodana wstępnie!
                </h3>
                <p className="text-slate-500 mt-1">Brakuje Ci sprzętu na to łowisko? Sprawdź nasze propozycje.</p>
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
                      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">Zobacz szczegóły</span>
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-grow">
                      <span className="text-xs font-bold text-blue-500 uppercase mb-1">{item.category}</span>
                      <h4 className="font-bold text-slate-800 mb-4 line-clamp-2">{item.name}</h4>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xl font-black text-slate-900">{item.price} zł</span>
                        {/* TODO: Podpiąć dodawanie do koszyka po kliknięciu */}
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
              <button className="px-8 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors shadow-lg">
                Przejdź do koszyka
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MapArea;