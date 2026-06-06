import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Imported for redirection handling
import { Upload, MapPin, Save, X, PlusCircle, Target, Trash2, CheckCircle, ShieldAlert } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  
  // Checking user permissions directly from storage
  const userRole = localStorage.getItem('userRole'); // Assumes your login saves 'admin' or 'user' here

  // Stany służące wyłącznie do obsługi wizualnej części interfejsu
  const [imagePreview, setImagePreview] = useState(null);
  const [showSpotForm, setShowSpotForm] = useState(false);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [visualSpots, setVisualSpots] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [spotName, setSpotName] = useState('');
  const [fishList, setFishList] = useState([]);
  const [selectedFishIds, setSelectedFishIds] = useState([]);
  const [file, setFile] = useState(null);
  
  // Nowy stan do sterowania modalem sukcesu
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef(null);

  // Redirection hook if the role check fails
  useEffect(() => {
    if (userRole !== 'ADMIN') {
      const timer = setTimeout(() => {
        navigate('/'); // Redirect to homepage or login if unauthorized
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userRole, navigate]);

  useEffect(() => {
    // Only fetch data if the user is verified as an admin
    if (userRole !== 'ADMIN') return;

    fetch('/api/fish')
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się pobrać listy ryb');
        return res.json();
      })
      .then((data) => {
        setFishList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userRole]);

  // SECURITY GUARD: If not an admin, intercept rendering immediately
  if (userRole !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-red-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Brak dostępu</h2>
          <p className="text-slate-500 mb-6">
            Ta strona jest dostępna wyłącznie dla administratorów systemu. 
          </p>
          <div className="w-full bg-slate-100 rounded-xl p-3 text-xs font-semibold text-slate-500 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
            Automatyczne przekierowanie za chwilę...
          </div>
        </div>
      </div>
    );
  }

  const handleCheckboxChange = (fishId) => {
    setSelectedFishIds((prevSelected) => {
      if (prevSelected.includes(fishId)) {
        return prevSelected.filter((id) => id !== fishId);
      } else {
        return [...prevSelected, fishId];
      }
    });
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setTempCoordinates({ left: `${x}%`, top: `${y}%` });
    setShowSpotForm(true);
  };

  const handleAddVisualSpot = () => {
    setVisualSpots([...visualSpots, { name: spotName, ...tempCoordinates }]);
    setShowSpotForm(false);
  };

  const handleCreateFisheryWithStands = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Nazwa łowiska jest wymagana!');
      return;
    }

    try {
      const formData = new FormData();

      const fisheryData = {
        name: name,
        description: desc,
        fish: selectedFishIds.map(id => ({ id: id })) 
      };

      formData.append('fisheryStr', JSON.stringify(fisheryData));
      formData.append('image', file);

      const fisheryResponse = await fetch('/api/fisheries', { 
        method: 'POST',
        body: formData
      });

      if (!fisheryResponse.ok) {
        throw new Error('Nie udało się zapisać łowiska.');
      }

      const savedFishery = await fisheryResponse.json();
      const newFisheryId = savedFishery.id;

      console.log('Łowisko utworzone pomyślnie! Przypisane ID:', newFisheryId);

      if (visualSpots.length > 0) {
        const standPromises = visualSpots.map((spot) => {
          const standPayload = {
            standNumber: spot.name,
            xPos: Number(spot.left.replace('%', '')),
            yPos: Number(spot.top.replace('%', ''))
          };

          return fetch(`/api/stands/fishery/${newFisheryId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(standPayload)
          }).then((res) => {
            if (!res.ok) throw new Error(`Błąd przy dodawaniu stanowiska ${spot.name}`);
            return res.json();
          });
        });

        await Promise.all(standPromises);
        console.log('Wszystkie stanowiska zostały przypisane i zapisane.');
      }

      setShowSuccessModal(true);

      setName('');
      setDesc('');
      setSpotName('');
      setVisualSpots([]);
      setSelectedFishIds([]);
      setFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error) {
      console.error('Wystąpił błąd podczas procesu zapisu:', error);
      alert(`Wystąpił błąd: ${error.message}`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="mb-8">
          <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Panel Administratora</span>
          <h1 className="text-4xl font-black text-slate-800">Kreator nowego łowiska</h1>
          <p className="text-slate-500 mt-2">Dodaj zdjęcie z lotu ptaka i nanieś na nie stanowiska dla klientów.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-2/3 space-y-6">

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <label className="text-sm font-bold text-slate-700 block mb-2">Nazwa łowiska</label>
              <input
                type="text"
                value={name}
                placeholder="np. Jezioro Mazurskie (Duże)"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <label className="text-sm font-bold text-slate-700 block mb-2">Opis łowiska</label>
              <input
                type="text"
                value={desc}
                placeholder="np. Piękne jezioro idealna na piątkowy wieczór."
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
              <label className="text-sm font-bold text-slate-700 block mb-4 flex items-center gap-2">
                <MapPin className="text-blue-500" size={18} /> Mapa łowiska
              </label>

              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="flex-grow border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 hover:border-blue-400 hover:text-blue-500 transition-all py-12"
                >
                  <Upload size={48} className="mb-4" />
                  <p className="font-bold text-lg">Kliknij, aby wgrać zdjęcie łowiska</p>
                  <p className="text-sm">PNG, JPG do 5MB</p>
                  <input type="file" className="hidden" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                </div>
              ) : (
                <div className="relative w-full rounded-2xl overflow-hidden border-4 border-slate-100 cursor-crosshair shadow-inner" onClick={handleImageClick}>
                  <img src={imagePreview} alt="Podgląd mapy" className="w-full h-auto block" />
                  <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>

                  {visualSpots.map((spot, index) => (
                    <div
                      key={spot.id}
                      className="absolute w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-xs transform -translate-x-1/2 -translate-y-1/2 shadow-lg border-2 border-white pointer-events-none"
                      style={{ top: spot.top, left: spot.left }}
                    >
                      {index + 1}
                    </div>
                  ))}

                  {showSpotForm && tempCoordinates && (
                    <div
                      className="absolute w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs transform -translate-x-1/2 -translate-y-1/2 shadow-lg border-2 border-white animate-bounce pointer-events-none ring-4 ring-blue-500/50"
                      style={{ top: tempCoordinates.top, left: tempCoordinates.left }}
                    >
                      <Target size={16} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">

            <div>
              <label className="text-xs font-bold text-blue-800 block mb-2">Wybierz ryby dostępne w łowisku</label>
              <div className="space-y-2 max-h-48 overflow-y-auto bg-white p-2 rounded-xl border border-blue-200">
                {fishList.map((fish) => (
                  <label
                    key={fish.id}
                    className="flex items-center gap-3 text-sm cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFishIds.includes(fish.id)}
                      onChange={() => handleCheckboxChange(fish.id)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="truncate text-slate-700 font-medium">{fish.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {showSpotForm ? (
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm animate-in slide-in-from-right-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-blue-900 flex items-center gap-2">Nowe stanowisko</h3>
                  <button onClick={() => setShowSpotForm(false)} className="text-blue-400 hover:text-blue-600"><X size={20} /></button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-blue-800 block mb-1">Nazwa / Opis</label>
                    <input
                      type="text"
                      value={spotName}
                      placeholder="np. Stanowisko 1 (Spławik)"
                      onChange={(e) => setSpotName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <button
                    onClick={handleAddVisualSpot}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors mt-2"
                  >
                    <PlusCircle size={18} /> Dodaj stanowisko
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200 border-dashed text-center text-slate-400 flex flex-col items-center justify-center min-h-[200px]">
                <MapPin size={32} className="mb-2 opacity-50" />
                <p className="font-medium text-sm">Kliknij na mapę, aby skonfigurować stanowisko</p>
              </div>
            )}

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-700 mb-4">Podsumowanie</h3>

              {visualSpots.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Dodane stanowiska</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {visualSpots.map((spot, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                        <span className="text-sm font-medium text-slate-700 flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="truncate max-w-[150px]">{spot.name}</span>
                        </span>
                        <button
                          onClick={() => setVisualSpots(visualSpots.filter((s, index) => index !== idx))}
                          className="text-slate-400 hover:text-red-500 p-1.5 bg-white rounded-lg border border-slate-200 hover:border-red-200 transition-colors shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all" onClick={handleCreateFisheryWithStands}>
                <Save size={20} /> Opublikuj łowisko
              </button>
            </div>

          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-8 flex flex-col items-center text-center animate-in scale-in duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Gotowe!</h3>
            <p className="text-slate-500 mb-6">
              Nowe łowisko wraz ze wszystkimi oznaczonymi stanowiskami zostało pomyślnie opublikowane i zapisane w bazie danych.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-xl font-bold transition-colors shadow-md"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;