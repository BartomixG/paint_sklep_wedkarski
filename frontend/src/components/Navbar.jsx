import { useState, useEffect } from 'react';
import { User, ShoppingCart, Fish } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
  const [isAnimate, setIsAnimate] = useState(false);

  const fetchCartCount = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setCartItemCount(0);
      return;
    }

    fetch(`http://localhost:8080/api/cart/${userId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((cartArray) => {
        // Ponieważ backend zwraca bezpośrednio tablicę, sprawdzamy Array.isArray
        if (cartArray && Array.isArray(cartArray)) {
          const totalCount = cartArray.reduce((sum, item) => sum + item.quantity, 0);
          setCartItemCount(totalCount);
        } else {
          setCartItemCount(0);
        }
      })
      .catch((err) => console.error('Błąd licznika koszyka:', err));
  };

  useEffect(() => {
    fetchCartCount();

    const handleUpdate = () => {
      fetchCartCount();
      setIsAnimate(true);
    };

    const handleAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('userId'));
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleUpdate);
    window.addEventListener('authChange', handleAuth);

    return () => {
      window.removeEventListener('cartUpdated', handleUpdate);
      window.removeEventListener('authChange', handleAuth);
    };
  }, []);

  // Reset animacji po 300ms
  useEffect(() => {
    if (!isAnimate) return;
    const timer = setTimeout(() => setIsAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [isAnimate]);

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition-colors duration-300">
          <Fish size={36} className="text-blue-500" />
          <span className="text-2xl font-black tracking-widest uppercase">E-Fishing</span>
        </Link>

        {/* LINKI */}
        <div className="hidden md:flex space-x-6 font-bold tracking-wide">
          <Link to="/rezerwacja" className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-sm">
            ŁOWISKA
          </Link>
          <Link to="/sklep" className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 transition-all duration-300 shadow-sm">
            SKLEP
          </Link>
        </div>

        {/* IKONY */}
        <div className="flex items-center space-x-6">
          <Link to={isLoggedIn ? "/profil" : "/logowanie"} className="hover:text-blue-400 transition-transform duration-300 hover:scale-110">
            <User size={28} className={isLoggedIn ? "text-blue-400" : "text-white"} />
          </Link>
          
          {/* KOSZYK */}
          <Link 
            to="/koszyk" 
            className="hover:text-blue-400 transition-transform duration-300 hover:scale-110 relative inline-block p-1"
          >
            <div className={`transition-transform duration-300 ${isAnimate ? 'scale-125 text-blue-400' : ''}`}>
              <ShoppingCart size={28} />
            </div>
            
            {cartItemCount > 0 && (
              <span className={`absolute -top-1 -right-1 bg-red-600 text-white text-xs font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border border-slate-900 transition-all duration-300 ${
                isAnimate ? 'scale-125 bg-blue-500 animate-pulse' : ''
              }`}>
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;