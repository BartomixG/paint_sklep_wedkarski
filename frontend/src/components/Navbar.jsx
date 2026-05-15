import { useState } from 'react';
import { User, ShoppingCart, Fish } from 'lucide-react';

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0); // Przykładowa liczba przedmiotów w koszyku(w przyszłości będzie dynamiczna)

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors duration-300">
          <Fish size={36} className="text-blue-500" />
          <span className="text-2xl font-black tracking-widest uppercase">E-Fishing</span>
        </div>

        <div className="hidden md:flex space-x-6 font-bold tracking-wide">
          <a href="#" className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-sm">
            ŁOWISKA
          </a>
          <a href="#" className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-sm">
            SKLEP
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="hover:text-blue-400 transition-transform duration-300 hover:scale-110">
            <User size={28} />
          </button>
          
          <button className="hover:text-blue-400 transition-transform duration-300 hover:scale-110 relative">
            <ShoppingCart size={28} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;