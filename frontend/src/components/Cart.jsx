import { useState } from 'react';
import { Trash2, ArrowRight, ArrowLeft, CreditCard, Smartphone, Landmark, CheckCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// TODO: Do podmiany na globalny stan koszyka
const MOCK_CART_ITEMS = [
  { id: 1, type: "reservation", name: "Rezerwacja: Jezioro Ciche", details: "Stanowisko 1 (Karp), 20.05.2026, 06:00-18:00", price: 120.00 },
  { id: 2, type: "product", name: "Wędka Karpiowa Pro 360", details: "Ilość: 1", price: 299.99 },
  { id: 3, type: "product", name: "Zanęta truskawkowa 5kg", details: "Ilość: 2", price: 91.02 }
];

const Cart = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('blik');

  // TODO: Zastąpić dynamicznym wyliczaniem na podstawie stanu koszyka
  const totalAmount = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price, 0);

  // TODO: Podpiąć funkcję wysyłającą ostateczne zamówienie
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-800">Twój Koszyk</h1>
            <p className="text-slate-500 mt-2">Przejrzyj swoje produkty i sfinalizuj zamówienie.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-bold text-sm">
            <span className={step >= 1 ? 'text-blue-600' : 'text-slate-400'}>1. Koszyk</span>
            <ArrowRight size={16} className="text-slate-300" />
            <span className={step >= 2 ? 'text-blue-600' : 'text-slate-400'}>2. Dostawa i płatność</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Lista produktów w koszyku */}
          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <div className="p-8">
                {MOCK_CART_ITEMS.length > 0 ? (
                  <div className="space-y-4">
                    {MOCK_CART_ITEMS.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50 gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                            <ShoppingBag className="text-blue-500" size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800">{item.name}</h4>
                            <p className="text-sm text-slate-500">{item.details}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                          <span className="font-black text-slate-900 text-lg">{item.price.toFixed(2)} zł</span>
                          {/* TODO: Podpiąć funkcję usuwającą element z koszyka */}
                          <button className="text-slate-400 hover:text-red-500 transition-colors p-2 bg-white rounded-lg border border-slate-200 hover:border-red-200 shadow-sm">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium">Twój koszyk jest pusty.</p>
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-bold text-slate-500">Do zapłaty:</p>
                  <p className="text-3xl font-black text-slate-900">{totalAmount.toFixed(2)} zł</p>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  disabled={MOCK_CART_ITEMS.length === 0}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Dalej <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Formularze */}
          {step === 2 && (
            <form onSubmit={handlePlaceOrder} className="animate-in slide-in-from-right-8 duration-300">
              <div className="p-8 flex flex-col md:flex-row gap-12">
                
                {/* Formularz dostawy */}
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span> 
                    Dane do dostawy
                  </h3>
                  
                  {/* TODO: Dodać walidację formularza */}
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Imię i nazwisko</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Adres dostawy (Ulica, nr domu/lokalu)</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" required />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label className="text-sm font-bold text-slate-700 block mb-2">Kod pocztowy</label>
                      <input type="text" placeholder="00-000" className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" required />
                    </div>
                    <div className="w-2/3">
                      <label className="text-sm font-bold text-slate-700 block mb-2">Miejscowość</label>
                      <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" required />
                    </div>
                  </div>
                </div>

                {/* Wybór płatności */}
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">2</span> 
                    Metoda płatności
                  </h3>
                  
                  <div className="space-y-3">
                    <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'blik' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
                      <input type="radio" name="payment" value="blik" checked={paymentMethod === 'blik'} onChange={() => setPaymentMethod('blik')} className="w-5 h-5 accent-blue-600" />
                      <Smartphone className={paymentMethod === 'blik' ? 'text-blue-600' : 'text-slate-400'} size={24} />
                      <span className="font-bold text-slate-700">BLIK</span>
                    </label>
                    <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
                      <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 accent-blue-600" />
                      <CreditCard className={paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'} size={24} />
                      <span className="font-bold text-slate-700">Karta płatnicza</span>
                    </label>
                    <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
                      <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-5 h-5 accent-blue-600" />
                      <Landmark className={paymentMethod === 'transfer' ? 'text-blue-600' : 'text-slate-400'} size={24} />
                      <span className="font-bold text-slate-700">Szybki przelew</span>
                    </label>
                  </div>
                </div>

              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
                  <ArrowLeft size={20} /> Wróć do koszyka
                </button>
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-500">Razem:</p>
                    <p className="text-xl font-black text-slate-900">{totalAmount.toFixed(2)} zł</p>
                  </div>
                  <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
                    <CheckCircle size={20} /> Złóż zamówienie
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Sukces zamówienia */}
          {step === 3 && (
            <div className="p-16 text-center animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-4xl font-black text-slate-800 mb-4">Dziękujemy za zamówienie!</h2>
              <p className="text-slate-500 text-lg mb-8 max-w-lg mx-auto">
                Twoje zamówienie zostało pomyślnie złożone. Szczegóły oraz potwierdzenie prześlemy na Twój adres e-mail.
              </p>
              <Link to="/profil" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
                Przejdź do swoich zamówień
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Cart;