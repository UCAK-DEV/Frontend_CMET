import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Lock, LogIn } from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();
  const isMember = true; // Simulation membre connecté (changez à false pour tester la vue visiteur)

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

  // LIENS PUBLICS
  const publicLinks = [
    { path: '/about', label: 'A Propos' },
    { path: '/news', label: 'Actualités' },
    { path: '/showroom', label: 'Talents' },
  ];

  // LIENS MEMBRES
  const memberLinks = [
    { path: '/dashboard', label: 'Mon Espace' },
    { path: '/knowledge', label: 'Savoir' },
    { path: '/network', label: 'Réseau' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-ucak-dark/80 backdrop-blur-md border-b border-ucak-green/10 dark:border-ucak-gold/10 transition-all duration-500">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoUcak} alt="UCAK Logo" className="w-10 h-10 object-contain bg-white rounded-lg p-0.5 shadow-md" />
          <span className="text-2xl font-extrabold text-ucak-blue dark:text-white tracking-tight flex flex-col leading-none">
            <span>CLUB</span>
            <span className="text-ucak-green dark:text-ucak-gold text-lg">MET</span>
          </span>
        </Link>
        
        {/* MENU BUREAU (Desktop) */}
        <div className="hidden md:flex items-center gap-6 font-bold text-sm uppercase tracking-wider">
          
          {/* Zone Public */}
          <div className="flex gap-6 text-gray-500 dark:text-gray-400">
            {publicLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`transition-colors hover:text-ucak-blue dark:hover:text-white ${isActive(link.path) ? 'text-ucak-blue dark:text-white font-extrabold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

          {/* Zone Membre */}
          {isMember ? (
            <div className="flex gap-5 items-center">
               <span className="text-[10px] text-ucak-gold flex items-center gap-1 border border-ucak-gold/30 px-2 py-0.5 rounded-full">
                  <Lock size={10} /> Private
               </span>
               {memberLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`relative py-2 transition-colors hover:text-ucak-green dark:hover:text-ucak-gold 
                  ${isActive(link.path) ? 'text-ucak-green dark:text-ucak-gold' : 'text-ucak-blue dark:text-gray-300'}`}
                >
                  {link.label}
                  {isActive(link.path) && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-ucak-green dark:bg-ucak-gold rounded-full"></span>}
                </Link>
              ))}
            </div>
          ) : (
            <Link to="/login">
              <button className="flex items-center gap-2 bg-ucak-blue text-white px-4 py-2 rounded-full text-xs font-bold hover:shadow-lg transition-all">
                <LogIn size={14}/> Connexion
              </button>
            </Link>
          )}

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-ucak-dark-card text-ucak-blue dark:text-ucak-gold hover:bg-gray-200">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Bouton Mobile */}
        <button className="md:hidden text-ucak-blue dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-ucak-dark/95 backdrop-blur-md border-t dark:border-gray-700 p-6 absolute w-full flex flex-col gap-6 shadow-xl h-screen">
           <div className="space-y-4">
             {publicLinks.map((link) => (
                <Link key={link.path} to={link.path} className="block text-xl font-bold text-ucak-blue dark:text-white" onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
             ))}
           </div>

           <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-2"></div>

           {isMember ? (
             <div className="space-y-4">
               <p className="text-xs font-bold text-ucak-gold uppercase tracking-widest flex items-center gap-2"><Lock size={12}/> Espace Membre</p>
               {memberLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="block text-xl font-bold text-ucak-green dark:text-ucak-gold" onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
               ))}
             </div>
           ) : (
             <div className="mt-4">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-ucak-blue text-white py-4 rounded-xl font-bold text-lg flex justify-center gap-2"><LogIn /> Se Connecter</button>
                </Link>
             </div>
           )}
        </div>
      )}
    </nav>
  );
}