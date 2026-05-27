import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, User, Mail } from 'lucide-react';

const EditProfile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Stany dla pól zgodnych z encją User.java na backendzie
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Przechowujemy hasło, aby przesłać pełny obiekt użytkownika
  const [userRole, setUserRole] = useState('');   // Zachowujemy obecną rolę użytkownika

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Pobieranie aktualnych danych użytkownika z bazy danych
  useEffect(() => {
    if (!userId) {
      navigate('/logowanie');
      return;
    }

    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się wczytać danych profilu.');
        return res.json();
      })
      .then((data) => {
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setEmail(data.email || '');
        setPassword(data.password || '');
        setUserRole(data.userRole || 'USER');
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId, navigate]);

  // 2. Obsługa zapisu zmienionych danych do backendu (PUT)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(false);

    const updatedUser = {
      id: parseInt(userId),
      firstName,
      lastName,
      email,
      password,
      userRole
    };

    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8' // Kluczowe kodowanie UTF-8 dodane w Twoim UserController
      },
      body: JSON.stringify(updatedUser)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Wystąpił błąd podczas zapisywania zmian.');
        return res.json();
      })
      .then(() => {
        navigate('/profil');
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center text-slate-500">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p>Wczytywanie danych formularza...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 flex flex-col items-center justify-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl border text-center max-w-md">
          <p className="font-bold mb-2">Błąd aplikacji</p>
          <p className="text-sm text-slate-600 mb-4">{error}</p>
          <Link to="/profil" className="text-sm font-bold text-blue-600 underline">Wróć do profilu</Link>
        </div>
      </div>
    );
  }

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
            
            {/* Siatka dla Imienia i Nazwiska */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2 flex items-center gap-2">
                  <User size={16} className="text-blue-500" /> Imię
                </label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white font-medium" 
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2 flex items-center gap-2">
                  <User size={16} className="text-blue-500" /> Nazwisko
                </label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50 focus:bg-white font-medium" 
                  required
                />
              </div>
            </div>

            {/* Adres E-mail (Zablokowany zgodnie z Twoim oryginalnym zamysłem) */}
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2 flex items-center gap-2">
                <Mail size={16} className="text-blue-500" /> Adres e-mail
              </label>
              <input 
                type="email" 
                value={email} 
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-100 text-slate-400 outline-none font-medium cursor-not-allowed" 
                disabled 
              />
              <p className="text-xs text-slate-400 mt-1">Adresu e-mail nie można edytować ponieważ stanowi główny login konta.</p>
            </div>

            {/* Przyciski Akcji */}
            <div className="pt-4 flex gap-4">
              <Link to="/profil" className="w-1/2 text-center p-4 rounded-2xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                Anuluj
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-1/2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-bold transition-all hover:shadow-lg hover:-translate-y-1 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                <Save size={20} /> {isSubmitting ? 'Zapisywanie...' : 'Zapisz zmiany'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;