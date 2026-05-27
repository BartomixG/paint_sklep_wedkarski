import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Trash2, User, LogOut, Edit3, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); 

  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  const [reservations] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate('/logowanie');
      return;
    }

    // 1. Pobieranie danych profilu
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Nie znaleziono danych zalogowanego profilu.');
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoadingUser(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingUser(false);
      });

    // 2. Pobieranie zamówień
    fetch(`http://localhost:8080/api/users/${userId}/orders`)
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się pobrać historii zamówień.');
        return res.json();
      })
      .then(async (ordersList) => {
        const ordersWithItems = await Promise.all(
          ordersList.map(async (order) => {
            try {
              const itemsResponse = await fetch(`http://localhost:8080/api/orders/${order.id}/items`);
              if (itemsResponse.ok) {
                const itemsData = await itemsResponse.json();
                return { ...order, items: itemsData };
              }
              return { ...order, items: [] };
            } catch {
              return { ...order, items: [] };
            }
          })
        );
        ordersWithItems.sort((a, b) => b.id - a.id);
        setOrders(ordersWithItems);
        setLoadingOrders(false);
      })
      .catch(() => setLoadingOrders(false));
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.dispatchEvent(new Event('authChange'));
    window.dispatchEvent(new Event('cartUpdated'));
    alert('Wylogowano pomyślnie.');
    navigate('/logowanie');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  if (loadingUser) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center text-slate-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p>Wczytywanie profilu wędkarza...</p>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 flex flex-col items-center justify-center">
        <div className="bg-red-50 text-red-700 p-8 rounded-3xl max-w-md text-center border">
          <p className="font-bold text-lg mb-2">Błąd wczytywania profilu</p>
          <p className="text-sm text-slate-600 mb-4">{error || 'Zaloguj się ponownie.'}</p>
          <Link to="/logowanie" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Przejdź do logowania</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-fit text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div className="relative pt-8 mb-4 flex justify-center">
              <div className="w-28 h-28 bg-white rounded-full p-1.5 shadow-lg border flex items-center justify-center text-blue-600"><User size={56} /></div>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{userData.firstName} {userData.lastName}</h2>
            <p className="text-sm font-bold text-blue-500 uppercase tracking-wider mt-1">{userData.userRole}</p>
            <div className="mt-8 space-y-4 border-t border-b border-slate-100 py-6 text-left">
              <div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Adres E-mail</span><p className="text-slate-800 font-medium mt-0.5 break-all">{userData.email}</p></div>
              <div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status konta</span><p className="text-emerald-600 font-bold mt-0.5 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Zweryfikowane</p></div>
            </div>
            <div className="mt-6 space-y-3">
              <a href="/profil/edycja" ><button className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-bold text-sm"><Edit3 size={16} /> Edytuj profil</button></a>
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 py-3.5 rounded-xl font-bold text-sm"><LogOut size={16} /> Wyloguj się</button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6"><MapPin className="text-blue-600" size={24} /><h3 className="text-2xl font-black text-slate-900">Twoje rezerwacje stanowisk</h3></div>
              <div className="space-y-4">
                {reservations.map((res) => (
                  <div key={res.id} className="border border-slate-100 p-5 rounded-2xl bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2"><span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">{res.id}</span><span className={`text-xs font-bold px-2 py-0.5 rounded-md ${res.status === 'Aktywna' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>{res.status}</span></div>
                      <h4 className="font-bold text-slate-800 text-lg">{res.lake}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 font-medium"><span>{res.spot}</span><span>{res.date}</span><span>{res.time}</span></div>
                    </div>
                    <div className="flex md:flex-col justify-between items-center md:items-end w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0">
                      <span className="font-black text-slate-900 text-xl md:mb-2">{res.price.toFixed(2)} zł</span>
                      {res.status === 'Aktywna' && <button className="text-rose-600 font-bold text-sm flex items-center gap-1"><Trash2 size={16} /> Anuluj</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6"><ShoppingBag className="text-blue-600" size={24} /><h3 className="text-2xl font-black text-slate-900">Historia zamówień ze sklepu</h3></div>
              {loadingOrders ? (
                <div className="text-center py-8 text-slate-400 font-medium">Ładowanie historii zakupów...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-2xl bg-slate-50">
                  <p className="text-slate-400 font-medium">Nie dokonałeś jeszcze żadnych zakupów.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border p-6 rounded-2xl bg-slate-50/50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">Zamówienie #{order.id}</span>
                            <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-700">{order.status}</span>
                          </div>
                          <h4 className="font-bold text-slate-800 text-base">Złożone: {formatDate(order.orderDate)}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block">Suma:</span>
                          <span className="font-black text-slate-900 text-xl">{order.totalAmount?.toFixed(2)} zł</span>
                        </div>
                      </div>
                      <div className="space-y-3 bg-white p-4 rounded-xl border">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm text-slate-600 border-b last:border-0 pb-2 last:pb-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800">{item.product?.name || 'Produkt'}</span>
                                <span className="text-xs text-slate-400 font-bold px-1.5 py-0.5 bg-slate-100 rounded-md">x{item.quantity}</span>
                              </div>
                              <span className="font-bold text-slate-700">{((item.purchasePrice || item.product?.price || 0) * item.quantity).toFixed(2)} zł</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-slate-400 italic">Brak szczegółów pozycji.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;