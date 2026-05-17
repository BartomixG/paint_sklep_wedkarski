import { MapPin, Calendar, Clock, Trash2, User, LogOut, Edit3, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// TODO: Do podmiany na dane pobierane z bazy
const MOCK_USER = {
  name: "Jan Kowalski",
  email: "jan.kowalski@example.com",
  phone: "+48 123 456 789",
};

const MOCK_RESERVATIONS = [
  { id: "RES-1029", lake: "Jezioro Ciche (Główne)", spot: "Stanowisko 1 (Karp)", date: "2026-05-20", time: "06:00 - 18:00", status: "Aktywna", price: 120.00 },
  { id: "RES-0982", lake: "Staw Ósemka (Mały)", spot: "Stanowisko 4 (Karp)", date: "2026-04-15", time: "Cały dzień", status: "Zakończona", price: 90.00 },
];

const MOCK_ORDERS = [
  { 
    id: "ORD-5541", 
    date: "2026-05-15", 
    total: 344.50, 
    status: "Wysłane", 
    items: [
      { name: "Wędka Karpiowa Pro 360", qty: 1, price: 299.99 },
      { name: "Zanęta truskawkowa 5kg", qty: 1, price: 44.51 }
    ]
  },
  { 
    id: "ORD-4210", 
    date: "2026-04-10", 
    total: 89.00, 
    status: "Dostarczone", 
    items: [
      { name: "Podbierak Teleskopowy", qty: 1, price: 89.00 }
    ]
  },
];

const Profile = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        <h1 className="text-4xl font-black text-slate-800 mb-8">Moje Konto</h1>

        {/* Dane klienta */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-3xl shrink-0">
              {MOCK_USER.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-1">{MOCK_USER.name}</h2>
              <div className="text-slate-500 space-y-1">
                <p className="flex items-center gap-2"><User size={16} /> {MOCK_USER.email}</p>
                <p className="flex items-center gap-2"><User size={16} className="opacity-0" /> {MOCK_USER.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Link to="/profil/edycja" className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition-colors">
              <Edit3 size={20} /> Edytuj dane
            </Link>
            {/* TODO: Podpiąć funkcję wylogowania */}
            <button className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold transition-colors">
              <LogOut size={20} /> Wyloguj
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Aktualne rezerwacje */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <MapPin className="text-blue-500" /> Aktualne rezerwacje
            </h2>
            
            <div className="space-y-4">
              {MOCK_RESERVATIONS.map(res => (
                <div key={res.id} className="border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow bg-slate-50 relative group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">{res.id}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${res.status === 'Aktywna' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                      {res.status}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 text-lg">{res.lake}</h4>
                  <p className="text-slate-500 text-sm mb-4">{res.spot}</p>
                  
                  <div className="flex items-center gap-4 text-slate-600 text-sm font-medium mb-4">
                    <div className="flex items-center gap-1.5"><Calendar size={16} className="text-blue-500" /> {res.date}</div>
                    <div className="flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> {res.time}</div>
                  </div>

                  {/* TODO: Dodać funkcję anulowania rezerwacji */}
                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <span className="font-black text-slate-900">{res.price.toFixed(2)} zł</span>
                    {res.status === 'Aktywna' && (
                      <button className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 size={16} /> Anuluj rezerwację
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historia zamówień */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <ShoppingBag className="text-blue-500" /> Historia zamówień
            </h2>
            
            <div className="space-y-4">
              {MOCK_ORDERS.map(order => (
                <div key={order.id} className="border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow bg-slate-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded-md">{order.id}</span>
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">{order.status}</span>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 text-lg mb-2">Zamówienie z dnia {order.date}</h4>
                  
                  {/* Wykaz konkretnych zakupionych towarów */}
                  <div className="space-y-2 my-3 bg-white p-4 rounded-xl border border-slate-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-slate-600">
                        <span>{item.name} <span className="text-xs text-slate-400 font-bold">x{item.qty}</span></span>
                        <span className="font-bold text-slate-700">{item.price.toFixed(2)} zł</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                    <span className="text-sm text-slate-400 font-bold">Łączna kwota:</span>
                    <span className="font-black text-slate-900 text-lg">{order.total.toFixed(2)} zł</span>
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

export default Profile;