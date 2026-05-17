import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Shield, Truck, Image as ImageIcon } from 'lucide-react';

const ProductDetail = () => {
  // Odczytujemy ID produktu z paska adresu URL
  const { id } = useParams();

  // TODO: Zamiast tych udawanych danych trzeba będzie pobrać szczegóły produktu z bazy danych na podstawie tego ID
  const mockProduct = {
    id: id,
    // Symulacja, żeby zobaczyć czy komponent reaguje na różne ID
    name: id === "101" ? "Wędka Karpiowa Pro 360" : `Przykładowy Produkt Wędkarski (ID: ${id})`,
    price: id === "101" ? 299.00 : 149.99,
    category: "Sklep wędkarski",
    description: "To jest opis produktu, w przyszłości będzie pobierany z bazy danych.",
    inStock: true,
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <Link to="/sklep" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
          <ArrowLeft size={20} /> Wróć do sklepu
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          
          {/* Zdjęcie */}
          <div className="w-full md:w-1/2 bg-slate-100 min-h-[400px] flex items-center justify-center p-12">
            <ImageIcon size={120} className="text-slate-300 drop-shadow-md" />
          </div>

          {/* Szczegóły i Koszyk */}
          <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col">
            <span className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-2">
              {mockProduct.category}
            </span>
            <h1 className="text-4xl font-black text-slate-800 mb-4">{mockProduct.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
              <span className="text-4xl font-black text-slate-900">{mockProduct.price.toFixed(2)} zł</span>
              {mockProduct.inStock ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Check size={16} /> Dostępny od ręki
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                  Brak w magazynie
                </span>
              )}
            </div>


            <p className="text-slate-600 leading-relaxed mb-8 flex-grow text-lg">
              {mockProduct.description}
            </p>

            {/* TODO: Podpiąć dodawanie do koszyka */}
            <button 
              disabled={!mockProduct.inStock}
              className="mt-auto w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-bold text-xl transition-all hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={24} /> 
              {mockProduct.inStock ? "Dodaj do koszyka" : "Niedostępne"}
            </button>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm font-bold text-slate-400">
              <span className="flex items-center gap-2"><Truck size={18} /> Szybka wysyłka</span>
              <span className="flex items-center gap-2"><Shield size={18} /> 2 lata gwarancji</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;