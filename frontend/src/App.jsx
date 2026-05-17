import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import MapArea from './components/MapArea';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Auth from './components/Auth'; 
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';
import ErrorPage from './components/ErrorPage';
import './index.css';

const Home = () => (
  <main className="flex-grow">
    <Hero />
  </main>
);

const Reservation = () => (
  <main className="flex-grow bg-slate-50 py-12">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-800 mb-4">Wybierz stanowisko</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Kliknij wybrane miejsce na zdjęciu łowiska, aby sprawdzić jego dostępność i dokonać rezerwacji.
        </p>
      </div>
      <MapArea />
    </div>
  </main>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rezerwacja" element={<Reservation />} />
          <Route path="/sklep" element={<Shop />} />
          <Route path="/sklep/produkt/:id" element={<ProductDetail />} />
          <Route path="/logowanie" element={<Auth />} /> 
          <Route path="/profil" element={<Profile />} />
          <Route path="/profil/edycja" element={<EditProfile />} />
          <Route path="/koszyk" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<ErrorPage code={404} />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;