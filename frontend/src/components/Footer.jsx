import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4 tracking-wider">E-FISHING</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Twoje centrum wędkarskiej pasji. Rezerwuj najlepsze stanowiska, kupuj sprawdzony sprzęt i ciesz się każdą chwilą spędzoną nad wodą.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>
          <div className="space-y-3 text-sm flex flex-col">
            <span className="flex items-center gap-3 hover:text-blue-400 transition-colors cursor-pointer"><MapPin size={18} /> ul. Wędkarska 12, 00-001 Warszawa</span>
            <span className="flex items-center gap-3 hover:text-blue-400 transition-colors cursor-pointer"><Phone size={18} /> +48 123 456 789</span>
            <span className="flex items-center gap-3 hover:text-blue-400 transition-colors cursor-pointer"><Mail size={18} /> kontakt@e-fishing.pl</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Znajdź nas w sieci</h3>
          <div className="flex gap-4">
            <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"><FaFacebook size={20} /></a>
            <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110"><FaInstagram size={20} /></a>
            <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-110"><FaXTwitter size={20} /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} E-Fishing. Projekt akademicki (PAINT). Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
};

export default Footer;