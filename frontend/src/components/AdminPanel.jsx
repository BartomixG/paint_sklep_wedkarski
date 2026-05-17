import { useState, useRef } from 'react';
import { Upload, MapPin, Save, X, PlusCircle, Target, Trash2 } from 'lucide-react';

const AdminPanel = () => {
  const [lakeName, setLakeName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [spots, setSpots] = useState([]);
  const [activeSpot, setActiveSpot] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setActiveSpot({
      id: Date.now(),
      left: `${x}%`,
      top: `${y}%`,
      name: '',
      equipmentType: 'Karp'
    });
  };

  const handleSaveSpot = () => {
    if (!activeSpot.name) return alert("Podaj nazwę stanowiska!");
    setSpots([...spots, activeSpot]);
    setActiveSpot(null);
  };

  const handleRemoveSpot = (spotId) => {
    setSpots(spots.filter(spot => spot.id !== spotId));
  };

  // TODO: Funkcja wysyłająca całe łowisko (nazwa, plik zdjęcia, tablica stanowisk) do backendu
  const handleSaveLake = () => {
    console.log("Dane do wysłania do bazy:", { lakeName, imagePreview, spots });
    alert("Zapisano łowisko!");
    setLakeName('');
    setImagePreview(null);
    setSpots([]);
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
                placeholder="np. Jezioro Mazurskie (Duże)"
                value={lakeName}
                onChange={(e) => setLakeName(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white" 
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
              <label className="text-sm font-bold text-slate-700 block mb-4 flex items-center gap-2">
                <MapPin className="text-blue-500" size={18}/> Mapa łowiska
              </label>
              
              {!imagePreview ? (
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="flex-grow border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 hover:border-blue-400 hover:text-blue-500 transition-all"
                >
                  <Upload size={48} className="mb-4" />
                  <p className="font-bold text-lg">Kliknij, aby wgrać zdjęcie łowiska</p>
                  <p className="text-sm">PNG, JPG do 5MB</p>
                  {/* TODO: Przechwytywanie pliku do FormData */}
                  <input type="file" className="hidden" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                </div>
              ) : (
                <div className="relative w-full rounded-2xl overflow-hidden border-4 border-slate-100 cursor-crosshair shadow-inner" onClick={handleImageClick}>
                  <img src={imagePreview} alt="Podgląd mapy" className="w-full h-auto block" />
                  <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>
                  
                  {spots.map((spot, index) => (
                    <div 
                      key={spot.id}
                      className="absolute w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-xs transform -translate-x-1/2 -translate-y-1/2 shadow-lg border-2 border-white pointer-events-none"
                      style={{ top: spot.top, left: spot.left }}
                    >
                      {index + 1}
                    </div>
                  ))}

                  {activeSpot && (
                    <div 
                      className="absolute w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs transform -translate-x-1/2 -translate-y-1/2 shadow-lg border-2 border-white animate-bounce pointer-events-none ring-4 ring-blue-500/50"
                      style={{ top: activeSpot.top, left: activeSpot.left }}
                    >
                      <Target size={16} />
                    </div>
                  )}
                </div>
              )}
              
              {imagePreview && (
                <p className="text-xs text-slate-400 mt-4 text-center flex items-center justify-center gap-2">
                  <Target size={14}/> Kliknij w dowolne miejsce na zdjęciu, aby dodać nowe stanowisko.
                </p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
            
            {activeSpot ? (
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 shadow-sm animate-in slide-in-from-right-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-blue-900 flex items-center gap-2">Nowe stanowisko</h3>
                  <button onClick={() => setActiveSpot(null)} className="text-blue-400 hover:text-blue-600"><X size={20}/></button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-blue-800 block mb-1">Nazwa / Opis</label>
                    <input 
                      type="text" 
                      placeholder="np. Stanowisko 1 (Spławik)"
                      value={activeSpot.name}
                      onChange={(e) => setActiveSpot({...activeSpot, name: e.target.value})}
                      className="w-full p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-blue-800 block mb-1">Rekomendowany sprzęt (Tag)</label>
                    {/* TODO: Lista tagów może być pobierana z bazy ewentualnie zostawiamy jak jest */}
                    <select 
                      value={activeSpot.equipmentType}
                      onChange={(e) => setActiveSpot({...activeSpot, equipmentType: e.target.value})}
                      className="w-full p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                      <option value="Karp">Sprzęt Karpiowy</option>
                      <option value="Spławik">Sprzęt Spławikowy</option>
                      <option value="Drapieżnik">Sprzęt Spinningowy (Drapieżnik)</option>
                      <option value="Uniwersalny">Uniwersalny</option>
                    </select>
                  </div>
                  
                  <button 
                    onClick={handleSaveSpot}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition-colors mt-2"
                  >
                    <PlusCircle size={18} /> Zapisz na mapie
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
              
              {/* Lista dodanych stanowisk z możliwością usunięcia */}
              {spots.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Dodane stanowiska</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {spots.map((spot, idx) => (
                      <div key={spot.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                        <span className="text-sm font-medium text-slate-700 flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="truncate max-w-[150px]">{spot.name}</span>
                        </span>
                        <button 
                          onClick={() => handleRemoveSpot(spot.id)} 
                          className="text-slate-400 hover:text-red-500 p-1.5 bg-white rounded-lg border border-slate-200 hover:border-red-200 transition-colors shadow-sm"
                          title="Usuń stanowisko"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                <li className="flex justify-between text-sm">
                  <span className="text-slate-500">Zdjęcie wgrane:</span>
                  <span className="font-bold text-slate-800">{imagePreview ? 'Tak' : 'Nie'}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-slate-500">Liczba stanowisk:</span>
                  <span className="font-bold text-slate-800">{spots.length}</span>
                </li>
              </ul>
              
              <button 
                onClick={handleSaveLake}
                disabled={!lakeName || !imagePreview || spots.length === 0}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} /> Opublikuj łowisko
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;