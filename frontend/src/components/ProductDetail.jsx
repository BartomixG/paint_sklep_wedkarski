import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Shield, Truck, Image as ImageIcon } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/api/produkty/${id}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) throw new Error('Nie znaleziono takiego produktu.');
          throw new Error('Wystąpił błąd podczas pobierania danych.');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Musisz się zalogować, aby dodać produkt do koszyka!');
    return;
  }

  setIsAdding(true);
  // Kluczowe: wysyłamy poprawne zapytanie z parametrami productId oraz quantity
  fetch(`http://localhost:8080/api/cart/${userId}/add?productId=${product.id}&quantity=1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (response) => {
      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || 'Problem z dodawaniem do koszyka.');
      }
      window.dispatchEvent(new Event('cartUpdated'));
    })
    .catch((err) => alert(err.message))
    .finally(() => setIsAdding(false));
};

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center text-slate-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p>Wczytywanie szczegółów sprzętu...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 flex flex-col items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-3xl max-w-md text-center shadow-sm">
          <p className="font-bold text-lg mb-2">Problem z wyświetleniem produktu</p>
          <p className="text-sm text-slate-600 mb-6">{error || 'Nieznany błąd serwera'}</p>
          <Link to="/sklep" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all">
            <ArrowLeft size={18} /> Wróć do sklepu
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = product.stockQuantity > 0;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link to="/sklep" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Wróć do sklepu
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid grid-cols-1 md:grid-cols-2">
          <div className="bg-slate-50 p-8 flex items-center justify-center relative aspect-square md:aspect-auto">
            {product.productUrl ? (
              <img src={product.productUrl} alt={product.name} className="max-h-[450px] object-contain rounded-2xl drop-shadow-xl" />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 gap-3">
                <ImageIcon size={64} strokeWidth={1} />
                <span className="text-sm font-medium">Brak zdjęcia podglądowego</span>
              </div>
            )}
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-blue-600">{product.price?.toFixed(2)} zł</span>
                {isAvailable ? (
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><Check size={16} /> Dostępny ({product.stockQuantity} szt.)</span>
                ) : (
                  <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-sm font-bold">Brak w magazynie</span>
                )}
              </div>
              <div className="border-t border-slate-100 pt-6">
                <h3 className="font-bold text-slate-900 mb-2 text-base">Opis produktu:</h3>
                <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">{product.description || 'Brak opisu dla tego produktu w bazie danych.'}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button 
                onClick={handleAddToCart}
                disabled={!isAvailable || isAdding}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-bold text-xl transition-all hover:shadow-lg disabled:opacity-50"
              >
                <ShoppingCart size={24} /> 
                {isAdding ? "Dodawanie..." : isAvailable ? "Dodaj do koszyka" : "Niedostępne"}
              </button>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Truck size={16} className="text-blue-500" /> Szybka wysyłka</span>
                <span className="flex items-center gap-1.5"><Shield size={16} className="text-blue-500" /> Gwarancja jakości</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;