import { Mail, Lock, User, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {

  // TODO: Podpiąć funkcje wysyłające dane do backendu oraz obsługę błędów formularzy

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative p-4 py-12"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Logowanie */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-8 transition-colors text-sm">
            <ArrowLeft size={16} /> Wróć do strony głównej
          </Link>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            Zaloguj się
          </h2>
          <p className="text-slate-500 mb-8">
            Masz już konto? Zaloguj się, aby zarządzać swoimi rezerwacjami i zamówieniami.
          </p>

          <div className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="Adres e-mail" 
                className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="Hasło" 
                className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* TODO: Przycisk wywołujący logowanie powinien logować użytkownika */}
          <button className="w-full mt-8 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
            <LogIn size={24} /> Zaloguj się
          </button>
        </div>

        {/* Rejestracja */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100">
          <div className="md:mt-14">
            <h2 className="text-3xl font-black text-slate-800 mb-2">
              Zarejestruj się
            </h2>
            <p className="text-slate-500 mb-8">
              Nie masz konta? Dołącz do nas i zyskaj dostęp do najlepszych łowisk.
            </p>

            <div className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Imię i nazwisko" 
                  className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-white"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="email" 
                  placeholder="Adres e-mail" 
                  className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-white"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Hasło" 
                  className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-white"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Powtórz hasło" 
                  className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-white"
                />
              </div>
            </div>

            {/* TODO: Przycisk wywołujący rejestrację powinien tworzyć nowe konto użytkownika */}
            <button className="w-full mt-8 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
              <UserPlus size={24} /> Załóż konto
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;