import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ShieldAlert, ServerCrash, FileQuestion } from 'lucide-react';

const ErrorPage = ({ code = 404, message }) => {
  
  const getErrorContent = () => {
    switch (code) {
      case 401:
      case 403:
        return {
          icon: <ShieldAlert size={80} className="text-red-500 mb-6 drop-shadow-md" />,
          title: "Brak dostępu",
          defaultMessage: "Nie masz uprawnień do przeglądania tej strony. Zaloguj się na konto z odpowiednimi uprawnieniami."
        };
      case 500:
      case 502:
      case 503:
        return {
          icon: <ServerCrash size={80} className="text-orange-500 mb-6 drop-shadow-md" />,
          title: "Błąd serwera",
          defaultMessage: "Coś poszło nie tak po naszej stronie. Nasi inżynierowie już pracują nad rozwiązaniem problemu."
        };
      case 404:
      default:
        return {
          icon: <FileQuestion size={80} className="text-blue-500 mb-6 drop-shadow-md" />,
          title: "Nie znaleziono strony",
          defaultMessage: "Strona, której szukasz, nie istnieje, została przeniesiona lub wpisano błędny adres."
        };
    }
  };

  const content = getErrorContent();

  return (
    <div className="min-h-[calc(100vh-200px)] bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-16 max-w-2xl w-full text-center animate-in zoom-in duration-300">
        
        <div className="flex justify-center">
          {content.icon}
        </div>
        
        <h1 className="text-6xl font-black text-slate-800 mb-2">
          {code}
        </h1>
        
        <h2 className="text-3xl font-bold text-slate-700 mb-6">
          {content.title}
        </h2>
        
        <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto">
          {message || content.defaultMessage}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
          >
            <Home size={20} /> Wróć na stronę główną
          </Link>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all w-full sm:w-auto"
          >
            <AlertTriangle size={20} /> Spróbuj ponownie
          </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;