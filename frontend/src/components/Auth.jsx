import { useState } from 'react';
import { Mail, Lock, User, LogIn, UserPlus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  // Stany dla formularza logowania
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Stany dla formularza rejestracji
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

    // Logika logowania
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert('Uzupełnij wszystkie pola logowania!');
      return;
    }

    fetch('api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Błędny e-mail lub hasło.');
        return res.json();
      })
      .then((user) => {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userRole', user.userRole || 'USER');
        window.dispatchEvent(new Event('authChange'));
        navigate('/profil');
      })
      .catch((err) => alert(err.message));
  };

  // Logika rejestracji
  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
      alert('Uzupełnij wszystkie pola rejestracji!');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      alert('Podane hasła nie są identyczne!');
      return;
    }

    const nameParts = regName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email: regEmail,
        password: regPassword,
        userRole: 'USER'
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Rejestracja nie powiodła się. Ten email może być zajęty.');
        return res.json();
      })
      .then((user) => {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userRole', user.userRole || 'USER');
        window.dispatchEvent(new Event('authChange'));
        alert('Konto zostało pomyślnie utworzone!');
        navigate('/profil');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative p-4 py-12"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Logowanie */}
        <form onSubmit={handleLogin} className="w-full md:w-1/2 p-8 lg:p-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-8 transition-colors text-sm">
            <ArrowLeft size={16} /> Wróć do strony głównej
          </Link>

          <h2 className="text-3xl font-black text-slate-800 mb-2">Zaloguj się</h2>
          <p className="text-slate-500 mb-8">Masz już konto? Zaloguj się, aby zarządzać swoimi rezerwacjami.</p>

          <div className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="Adres e-mail" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="Hasło" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <button type="submit" className="w-full mt-8 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
            <LogIn size={24} /> Zaloguj się
          </button>
        </form>

        {/* Rejestracja */}
        <form onSubmit={handleRegister} className="w-full md:w-1/2 p-8 lg:p-12 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100">
          <div className="md:mt-14">
            <h2 className="text-3xl font-black text-slate-800 mb-2">Zarejestruj się</h2>
            <p className="text-slate-500 mb-8">Nie masz konta? Dołącz do nas i zyskaj dostęp do najlepszych łowisk.</p>

            <div className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Imię i nazwisko" 
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-white"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="email" 
                  placeholder="Adres e-mail" 
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-white"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Hasło" 
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-white"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Powtórz hasło" 
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-white"
                />
              </div>
            </div>

            <button type="submit" className="w-full mt-8 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1">
              <UserPlus size={24} /> Załóż konto
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Auth;