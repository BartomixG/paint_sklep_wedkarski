import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/produkty')
      .then((response) => {
        if (!response.ok) throw new Error('Nie udało się pobrać produktów.');
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleQuickAdd = (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Zaloguj się, aby dodać artykuł do koszyka.');
      return;
    }
    fetch(`/api/cart/${userId}/add?productId=${productId}&quantity=1`, {
      method: 'POST'
    })
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się dodać produktu.');
        window.dispatchEvent(new Event('cartUpdated'));
      })
      .catch((err) => alert(err.message));
  };

  const availableCategories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = product.price <= maxPrice;
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sklep Wędkarski</h1>
            <p className="text-slate-500 mt-2">Znajdź profesjonalny sprzęt na każdą wyprawę</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Szukaj wędki, kołowrotka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold"><Filter size={18} /><h2>Kategorie</h2></div>
              <div className="space-y-2">
                {availableCategories.map((category) => (
                  <label key={category} className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer text-sm font-medium text-slate-600">
                    <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} className="w-4 h-4 rounded text-blue-600 accent-blue-600" />
                    <span>{category}</span>
                  </label>
                ))}
                {selectedCategories.length > 0 && (
                  <button onClick={() => setSelectedCategories([])} className="text-xs text-blue-600 font-bold pt-2 px-2 block">Wyczyść filtry</button>
                )}
              </div>
            </div>
            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-bold text-slate-900 mb-4">Maksymalna cena</h3>
              <input type="range" min="0" max="1000" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-blue-600 mb-2 cursor-pointer" />
              <div className="flex justify-between text-sm font-bold text-slate-700"><span>0 zł</span><span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{maxPrice} zł</span></div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-500"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div><p>Wczytywanie oferty...</p></div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-6 rounded-2xl text-center shadow-sm"><p className="font-bold">Błąd: {error}</p></div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border"><p className="text-slate-400 font-medium">Brak produktów.</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isAvailable = product.stockQuantity > 0;
                  return (
                    <div key={product.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl flex flex-col overflow-hidden transition-all duration-300">
                      <Link to={`/sklep/produkt/${product.id}`} className="block relative aspect-square bg-slate-100 overflow-hidden">
                        {product.productUrl ? <img src={product.productUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" /> : <div className="w-full h-full flex flex-col items-center justify-center text-slate-400"><ImageIcon size={40} /><span className="text-xs">Brak zdjęcia</span></div>}
                      </Link>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">{product.category}</span>
                        <Link to={`/sklep/produkt/${product.id}`} className="hover:text-blue-600 font-bold text-xl text-slate-800 line-clamp-2 mb-2">{product.name}</Link>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-slate-900">{product.price?.toFixed(2)} zł</span>
                            <span className={`text-xs font-medium mt-0.5 ${isAvailable ? 'text-emerald-600' : 'text-rose-500'}`}>{isAvailable ? `W magazynie: ${product.stockQuantity} szt.` : 'Brak na stanie'}</span>
                          </div>
                          <button onClick={() => handleQuickAdd(product.id)} disabled={!isAvailable} className={`p-3 rounded-xl transition-all ${isAvailable ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-200 text-slate-400'}`}><ShoppingCart size={20} /></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;