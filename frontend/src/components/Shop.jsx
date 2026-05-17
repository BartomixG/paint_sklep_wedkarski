import { useState } from 'react';
import { Search, Filter, ShoppingCart, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// TODO: Produkty do podmiany na pobierane z bazy
const MOCK_PRODUCTS = [
  { id: 101, name: "Wędka Karpiowa Pro 360", price: 299.99, category: "Wędki", inStock: true },
  { id: 1, name: "Kołowrotek Master Spin", price: 149.50, category: "Kołowrotki", inStock: true },
  { id: 2, name: "Zestaw Spławików (5 szt.)", price: 24.99, category: "Akcesoria", inStock: true },
  { id: 3, name: "Podbierak Teleskopowy", price: 89.00, category: "Akcesoria", inStock: false },
  { id: 4, name: "Wędka Spinningowa Ultra", price: 199.00, category: "Wędki", inStock: true },
  { id: 5, name: "Skrzynka Wędkarska XL", price: 120.00, category: "Akcesoria", inStock: true },
];

const Shop = () => {
  const [maxPrice, setMaxPrice] = useState(1000);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-black text-slate-800">Sklep Wędkarski</h1>
          <div className="relative w-full md:w-96">
            {/* TODO: Podpiąć filtrowanie po wpisaniu tekstu */}
            <input 
              type="text" 
              placeholder="Szukaj produktów..." 
              className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-4 text-slate-400" size={20} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filtry */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-28">
              <div className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-6 border-b border-slate-100 pb-4">
                <Filter size={20} className="text-blue-500" /> Filtry
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-700 mb-3">Kategorie</h3>
                  <div className="space-y-2">
                    {/* TODO: Podpiąć filtrowanie po zaznaczeniu checkboxa */}
                    {['Wszystkie', 'Wędki', 'Kołowrotki', 'Akcesoria', 'Zestawy'].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                        <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-700">Cena maksymalna</h3>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      do {maxPrice} zł
                    </span>
                  </div>
                  {/* TODO: Podpiąć odświeżanie listy produktów po zmianie tej ceny */}
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full accent-blue-600 cursor-pointer" 
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>0 zł</span>
                    <span>2000+ zł</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {MOCK_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col relative">
                  
                  <Link to={`/sklep/produkt/${product.id}`} className="block h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                    <ImageIcon size={48} className="text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg">
                          Chwilowy brak
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">Zobacz szczegóły</span>
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">{product.category}</span>
                    <Link to={`/sklep/produkt/${product.id}`} className="hover:text-blue-600 transition-colors">
                      <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2">{product.name}</h3>
                    </Link>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-black text-slate-900">{product.price.toFixed(2)} zł</span>
                      {/* TODO: Podpiąć logikę dodawania elementu do koszyka */}
                      <button 
                        disabled={!product.inStock}
                        className={`p-3 rounded-xl transition-all hover:-translate-y-1 ${product.inStock ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-xl' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shop;