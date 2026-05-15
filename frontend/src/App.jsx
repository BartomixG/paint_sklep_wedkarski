import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Tutaj wrzucamy nasz nowy pasek */}
      <Navbar />

      {/* Główna zawartość strony (na razie pusta) */}
      <main className="container mx-auto p-6 mt-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Rezerwuj najlepsze stanowiska wędkarskie.
        </h1>
        <p className="mt-4 text-slate-600">
          Zajmij się łowieniem, my zajmiemy się resztą.
        </p>
      </main>
    </div>
  );
}

export default App;