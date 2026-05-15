import { Map, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div 
      className="relative min-h-[calc(100vh-76px)] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-900/65"></div>

      <div className="relative z-10 text-center px-4 w-full max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-xl tracking-tight">
          Poczuj magię <span className="text-blue-500">łowienia.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto drop-shadow-md">
          Zajmij się pasją, my zajmiemy się resztą. Zarezerwuj idealne stanowisko wędkarskie lub skompletuj profesjonalny sprzęt w naszym sklepie.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/rezerwacja" className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
            <Map size={28} className="group-hover:-translate-y-1 transition-transform duration-300" />
            REZERWACJA ŁOWISKA
          </Link>
          
          <Link to="/sklep" className="group flex items-center justify-center gap-3 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 text-white px-8 py-5 rounded-2xl font-bold text-lg sm:text-xl border border-slate-600 transition-all duration-300 hover:scale-105 shadow-xl">
            <ShoppingBag size={28} className="group-hover:-translate-y-1 transition-transform duration-300" />
            SKLEP WĘDKARSKI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;