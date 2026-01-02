import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
// IMPORT CORRIGÉ
import logoUcak from '../assets/logo-ucak.png'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/about', label: 'A Propos' },
    { path: '/news', label: 'Actualités' },
    { path: '/showroom', label: 'Showroom' },
    { path: '/knowledge', label: 'Savoir' },
    { path: '/quizz', label: 'Challenges' },
    { path: '/elections', label: 'Vote 2026' },
    { path: '/network', label: 'Réseau' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-ucak-dark/80 backdrop-blur-md border-b border-ucak-green/10 dark:border-ucak-gold/10 transition-all duration-500">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoUcak} alt="UCAK Logo" className="w-10 h-10 object-contain bg-white rounded-lg p-0.5 shadow-md" />
          <span className="text-2xl font-extrabold text-ucak-blue dark:text-white tracking-tight flex flex-col leading-none">
            <span>CLUB</span>
            <span className="text-ucak-green dark:text-ucak-gold text-lg">MET</span>
          </span>
        </Link>
        
        {/* ... (Reste du code identique) ... */}
        
        <div className="hidden md:flex items-center gap-6 font-bold text-ucak-blue dark:text-gray-300 text-sm uppercase tracking-wider">
          {links.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`relative py-2 transition-colors hover:text-ucak-green dark:hover:text-ucak-gold ${isActive(link.path) ? 'text-ucak-green dark:text-ucak-gold' : ''}`}
            >
              {link.label}
              {isActive(link.path) && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-ucak-green dark:bg-ucak-gold rounded-full"></span>}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

          <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-100 dark:bg-ucak-dark-card hover:bg-gray-200 dark:hover:bg-ucak-hover transition-all text-ucak-blue dark:text-ucak-gold">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link to="/login">
            <button className="bg-ucak-blue dark:bg-gradient-to-r dark:from-ucak-green dark:to-ucak-blue text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition-all">Connexion</button>
          </Link>
        </div>

        <button className="md:hidden text-ucak-blue dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-ucak-dark/95 backdrop-blur-md border-t dark:border-gray-700 p-6 absolute w-full flex flex-col gap-6 shadow-xl">
           {links.map((link) => (
              <Link key={link.path} to={link.path} className="text-ucak-blue dark:text-white font-bold" onClick={() => setIsOpen(false)}>{link.label}</Link>
           ))}
        </div>
      )}
    </nav>
  );
}