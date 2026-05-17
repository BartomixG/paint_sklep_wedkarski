import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail, Phone } from 'lucide-react';

// TODO: Do podmiany na dane pobierane z bazy
const MOCK_USER = {
  name: "Jan Kowalski",
  email: "jan.kowalski@example.com",
  phone: "+48 123 456 789",
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(MOCK_USER.name);
  const [phone, setPhone] = useState(MOCK_USER.phone);

  // TODO: Podpiąć obsługę wysyłania zaktualizowanego formularza 
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profil');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        
        <Link to="/profil" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors text-sm">
          <ArrowLeft size={16} /> Wróć do profilu
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 lg:p-12">
          <h1 className="text-3xl font-black text-slate-800 mb-2">Edycja danych</h1>
          <p className="text-slate-500 mb-8">Zaktualizuj informacje profilowe swojego konta wędkarskiego.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2 flex items-center gap-2">
                <User size={16} className="text-blue-500" /> Imię i nazwisko
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white font-medium" 
                required
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2 flex items-center gap-2">
                <Mail size={16} className="text-blue-500" /> Adres e-mail
              </label>
              <input 
                type="email" 
                value={MOCK_USER.email} 
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-100 text-slate-400 outline-none font-medium cursor-not-allowed" 
                disabled 
              />
              <p className="text-xs text-slate-400 mt-1">Adresu e-mail nie można edytować ponieważ stanowi główny login konta.</p>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2 flex items-center gap-2">
                <Phone size={16} className="text-blue-500" /> Numer telefonu
              </label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white font-medium" 
                required
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Link to="/profil" className="w-1/2 text-center p-4 rounded-2xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                Anuluj
              </Link>
              <button type="submit" className="w-1/2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold transition-all hover:shadow-lg hover:-translate-y-1">
                <Save size={20} /> Zapisz zmiany
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;