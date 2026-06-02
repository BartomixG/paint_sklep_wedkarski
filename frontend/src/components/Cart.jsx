import { useState, useEffect } from 'react';
import { Trash2, ArrowRight, ArrowLeft, CreditCard, Smartphone, Landmark, CheckCircle, ShoppingBag, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Stany komponentu
  const [cartItems, setCartItems] = useState([]);
  const [standItem, setStandItem] = useState(null); // Stan przechowujący zarezerwowane stanowisko
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('blik');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // pobieranie zawartości koszyka z backendu wraz ze stanowiskiem
  const fetchCart = () => {
    if (!userId || userId === "null") {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/cart/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się pobrać danych koszyka z serwera.');
        return res.json();
      })
      .then((data) => {
        // 1. Mapowanie produktów z koszyka
        let rawItems = [];
        if (Array.isArray(data)) {
          rawItems = data;
        } else if (data && typeof data === 'object') {
          const foundArray = Object.values(data).find(val => Array.isArray(val));
          if (foundArray) {
            rawItems = foundArray;
          } else if (data.cartItems) {
            rawItems = data.cartItems;
          } else if (data.items) {
            rawItems = data.items;
          }
        }

        if (rawItems && rawItems.length > 0) {
          const mappedItems = rawItems.map((item) => {
            const productObj = item.product || item.produkt;
            const unitPrice = productObj?.price || productObj?.cena || 0;
            const itemQuantity = item.quantity || item.ilosc || 1;
            const productName = productObj?.name || productObj?.nazwa || "Produkt wędkarski";
            const productCategory = productObj?.category || productObj?.kategoria || "Sprzęt";

            return {
              id: item.id,
              productId: productObj?.id,
              type: "product",
              name: productName,
              details: `Kategoria: ${productCategory} | Ilość: ${itemQuantity} szt.`,
              price: Number(unitPrice) * Number(itemQuantity),
              quantity: itemQuantity
            };
          });
          setCartItems(mappedItems);
        } else {
          setCartItems([]);
        }
      })
      .catch((err) => {
        console.error('Błąd parsowania koszyka:', err);
      })
      .finally(() => setLoading(false));

          fetch(`/api/cart/${userId}/reservation`)
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się pobrać danych koszyka z serwera.');
        return res.json();
      })
      .then((data) => {
                  if (data && data.fishingStand) {
          setStandItem({
            id: data.fishingStand.id,
            name: data.fishingStand.name || `Stanowisko #${data.fishingStand.id}`,
            reservationDate: data.reservationDate,
            startTime: data.startTime,
            endTime: data.endTime,
            price: 50.00 // Cena rezerwacji stanowiska wędkarskiego
          });
        } else {
          setStandItem(null);
        }
      })
      .catch((err) => {
        console.error('Błąd parsowania koszyka:', err);
      })
      .finally(() => setLoading(false));
  };



  useEffect(() => {
    fetchCart();
  }, [userId]);

  // Dynamiczne wyliczanie sumy koszyka (produkty + ewentualne stanowisko 50 PLN)
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0) + (standItem ? standItem.price : 0);

  // Usuwanie pojedynczego przedmiotu z koszyka
  const handleRemoveItem = (cartItemId) => {
    if (!cartItemId) return;

    fetch(`/api/cart/item/${cartItemId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się usunąć produktu z koszyka.');
        setCartItems(prev => prev.filter((item) => item.id !== cartItemId));
        window.dispatchEvent(new Event('cartUpdated'));
      })
      .catch((err) => alert(err.message));
  };

  // Usuwanie rezerwacji stanowiska z koszyka
  const handleRemoveStand = () => {
    if (!userId || userId === "null") return;

    // Wysyłamy pusty obiekt rezerwacji do Twojego zaimplementowanego endpointu, aby go wyczyścić
    fetch(`/api/cart/${userId}/reservation`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        fishingStand: null,
        reservationDate: null,
        startTime: null,
        endTime: null
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się anulować rezerwacji stanowiska.');
        setStandItem(null);
        window.dispatchEvent(new Event('cartUpdated'));
      })
      .catch((err) => alert(err.message));
  };

const handlePlaceOrder = (e) => {
  e.preventDefault();
  if (!userId || userId === "null") return;

  setIsSubmitting(true);

  const orderDateIso = new Date().toISOString();

  // Budujemy DTO zamówienia. Wyciągamy daty bezpośrednio ze stanu standItem (pochodzącego z koszyka)
  const orderDto = {
    user: { id: parseInt(userId) },
    totalAmount: totalAmount,
    status: "NOWE",
    orderDate: orderDateIso,
    
    // Mapowanie relacji stanowiska
    fishingStand: standItem ? { id: standItem.id } : null,
    
    // Kluczowa poprawka: Przekazujemy parametry rezerwacji na głównym poziomie zamówienia
    reservationDate: standItem?.reservationDate || null,
    startTime: standItem?.startTime || null,
    endTime: standItem?.endTime || null
  };

  console.log("Wysyłane DTO zamówienia do API:", orderDto);

  fetch(`/api/orders/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(orderDto)
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Wystąpił błąd podczas tworzenia zamówienia.');
      }
      return res.json();
    })
    .then((createdOrder) => {
      // Jeśli w koszyku są produkty, dodajemy je jako OrderItems
      if (cartItems.length === 0) return createdOrder;

      const orderItemPromises = cartItems.map((item) => {
        const orderItemDto = {
          order: { id: createdOrder.id },
          product: { id: item.productId },
          quantity: item.quantity,
          purchasePrice: item.price / item.quantity
        };

        return fetch(`/api/orders/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify(orderItemDto)
        }).then((itemRes) => itemRes.json());
      });

      return Promise.all(orderItemPromises);
    })
    .then(() => {
      // Czyszczenie koszyka po udanym zakupie
      return fetch(`/api/cart/${userId}/clear`, {
        method: 'DELETE'
      });
    })
    .then(() => {
      setStep(3); // Ekran sukcesu
      setCartItems([]);
      setStandItem(null);
      window.dispatchEvent(new Event('cartUpdated'));
    })
    .catch((err) => {
      console.error("Błąd składania zamówienia:", err);
      alert(`Błąd: ${err.message}`);
    })
    .finally(() => setIsSubmitting(false));
};

  if (!userId || userId === "null") {
    return (
      <div className="bg-slate-50 min-h-screen py-24 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">Twój koszyk jest pusty</h2>
        <p className="text-slate-500 max-w-sm mb-8 font-medium">Musisz się zalogować, aby przeglądać swój koszyk oraz składać zamówienia.</p>
        <Link to="/logowanie" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all">
          Zaloguj się teraz
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center text-slate-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="font-medium">Wczytywanie koszyka z bazy danych...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Nagłówek i Status Kroków */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Twój Koszyk</h1>
            <p className="text-slate-500 mt-1">Dokończ składanie zamówienia</p>
          </div>

          {step < 3 && (
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm font-bold text-sm text-slate-400">
              <span className={`px-4 py-2 rounded-xl transition-all ${step === 1 ? 'bg-blue-600 text-white' : 'text-slate-700 bg-slate-50'}`}>1. Przegląd</span>
              <ArrowRight size={16} className="text-slate-300" />
              <span className={`px-4 py-2 rounded-xl transition-all ${step === 2 ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>2. Płatność</span>
            </div>
          )}
        </div>

        {/* KROK 1: Lista zakupowa */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length === 0 && !standItem ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center">
                  <p className="text-slate-400 font-medium text-lg">Twój koszyk jest pusty.</p>
                  <Link to="/sklep" className="text-blue-600 font-bold mt-2 inline-block hover:underline">Dodaj produkty lub zarezerwuj stanowisko &rarr;</Link>
                </div>
              ) : (
                <>
                  {/* Wyświetlanie rezerwacji stanowiska jeśli istnieje */}
                  {standItem && (
                    <div className="bg-amber-50/40 p-6 rounded-2xl border border-amber-100 shadow-sm flex justify-between items-center gap-4 border-l-4 border-l-amber-500">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl mt-1">
                          <MapPin size={24} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Rezerwacja Łowiska</span>
                          <h3 className="font-black text-slate-800 text-lg leading-snug">{standItem.name}</h3>
                          <p className="text-sm text-slate-500 font-medium">
                            Data: <span className="text-slate-800 font-bold">{standItem.reservationDate}</span> | Godziny: <span className="text-slate-800 font-bold">{standItem.startTime} - {standItem.endTime}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-black text-slate-900 text-xl whitespace-nowrap">{standItem.price.toFixed(2)} zł</span>
                        <button
                          onClick={handleRemoveStand}
                          className="text-slate-300 hover:text-rose-500 p-2 rounded-xl hover:bg-rose-50 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Wyświetlanie produktów */}
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Sprzęt wędkarski</span>
                        <h3 className="font-black text-slate-800 text-lg leading-snug">{item.name}</h3>
                        <p className="text-sm text-slate-400 font-medium">{item.details}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-black text-slate-900 text-xl whitespace-nowrap">{Number(item.price).toFixed(2)} zł</span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-300 hover:text-rose-500 p-2 rounded-xl hover:bg-rose-50 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Panel podsumowania płatności */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 sticky top-28">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">Podsumowanie</h3>
                
                {/* Rozbicie podsumowania */}
                <div className="space-y-2">
                  <div className="flex justify-between font-medium text-slate-500 text-sm">
                    <span>Produkty:</span>
                    <span className="text-slate-700 font-bold">{(totalAmount - (standItem ? standItem.price : 0)).toFixed(2)} zł</span>
                  </div>
                  {standItem && (
                    <div className="flex justify-between font-medium text-slate-500 text-sm">
                      <span>Rezerwacja stanowiska:</span>
                      <span className="text-amber-600 font-bold">{standItem.price.toFixed(2)} zł</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-slate-500 text-sm">
                    <span>Wysyłka:</span>
                    <span className="text-emerald-600 font-bold">Gratis</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                  <span className="font-bold text-slate-800">Do zapłaty:</span>
                  <span className="text-3xl font-black text-blue-600">{totalAmount.toFixed(2)} zł</span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={cartItems.length === 0 && !standItem}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg"
                >
                  Przejdź do kasy <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* KROK 2: Bramka płatności */}
        {step === 2 && (
          <form onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">Wybierz formę płatności</h3>

            <div className="space-y-3 mb-8">
              <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'blik' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="payment" value="blik" checked={paymentMethod === 'blik'} onChange={() => setPaymentMethod('blik')} className="w-5 h-5 accent-blue-600" />
                  <div>
                    <span className="font-bold text-slate-800 block text-lg">BLIK</span>
                    <span className="text-sm text-slate-400 font-medium">Błyskawiczny przelew kodem z banku</span>
                  </div>
                </div>
                <Smartphone className="text-slate-400" size={28} />
              </label>

              <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 accent-blue-600" />
                  <div>
                    <span className="font-bold text-slate-800 block text-lg">Karta debetowa / kredytowa</span>
                    <span className="text-sm text-slate-400 font-medium">Visa, Mastercard, Maestro</span>
                  </div>
                </div>
                <CreditCard className="text-slate-400" size={28} />
              </label>

              <label className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-4">
                  <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-5 h-5 accent-blue-600" />
                  <div>
                    <span className="font-bold text-slate-800 block text-lg">Szybki przelew elektroniczny</span>
                    <span className="text-sm text-slate-400 font-medium">Przekierowanie bezpośrednio do Twojego banku</span>
                  </div>
                </div>
                <Landmark className="text-slate-400" size={28} />
              </label>
            </div>

            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors">
                <ArrowLeft size={18} /> Powrót do podsumowania
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <div className="text-center sm:text-right">
                  <span className="text-sm text-slate-400 block font-medium">Kwota końcowa:</span>
                  <span className="text-2xl font-black text-blue-600">{totalAmount.toFixed(2)} zł</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all disabled:opacity-50 shadow-md"
                >
                  <CheckCircle size={20} /> {isSubmitting ? "Przetwarzanie..." : "Kupuję i płacę"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* KROK 3: Sukces */}
        {step === 3 && (
          <div className="p-16 text-center bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4">Zamówienie przyjęte!</h2>
            <p className="text-slate-500 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Pomyślnie utworzyliśmy Twoje zamówienie w sklepie wędkarskim. Zmiany statusów oraz historię sprawdzisz w panelu profilu.
            </p>
            <Link to="/profil" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md">
              Przejdź do profilu &rarr;
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;