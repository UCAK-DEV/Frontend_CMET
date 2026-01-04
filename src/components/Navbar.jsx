import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, Menu, X, LogIn, LogOut, 
  User as UserIcon, ChevronDown, LayoutDashboard, Trophy 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  // --- 1. LIENS PUBLICS ---
  const publicLinks = [
    { path: '/about', label: 'Institution' },
    { path: '/news', label: 'Actualités' },
    { path: '/showroom', label: 'Showroom' },
  ];

  // --- 2. LIENS MEMBRES (Quizz ajouté ici) ---
  const memberLinks = [
    { path: '/dashboard', label: 'Espace Étudiant' },
    { path: '/knowledge', label: 'Bibliothèque' },
    { path: '/quizz', label: 'Quizz' }, // Ajout conforme à App.jsx
    { path: '/elections', label: 'Élections' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-ucak-dark/90 backdrop-blur-md border-b border-ucak-green/10 dark:border-ucak-gold/10 transition-all duration-500">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoUcak} alt="UCAK Logo" className="w-10 h-10 object-contain bg-white rounded-lg p-0.5 shadow-md" />
          <span className="text-2xl font-extrabold text-ucak-blue dark:text-white tracking-tighter flex flex-col leading-none">
            <span>CLUB</span>
            <span className="text-ucak-green dark:text-ucak-gold text-lg">MET</span>
          </span>
        </Link>
        
        {/* MENU BUREAU */}
        <div className="hidden md:flex items-center gap-8 font-bold text-[13px] uppercase tracking-[0.15em]">
          
          <div className="flex gap-8 text-gray-500 dark:text-gray-400">
            {publicLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`transition-all hover:text-ucak-blue dark:hover:text-white ${isActive(link.path) ? 'text-ucak-blue dark:text-white font-black' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {user && <div className="h-6 w-px bg-gray-200 dark:bg-gray-800"></div>}

          {user && (
            <div className="flex gap-6 items-center">
               {memberLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`relative py-2 transition-all hover:text-ucak-green dark:hover:text-ucak-gold ${isActive(link.path) ? 'text-ucak-green dark:text-ucak-gold' : 'text-ucak-blue dark:text-gray-300'}`}>
                  {link.label}
                  {isActive(link.path) && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ucak-green dark:bg-ucak-gold rounded-full"></span>}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200 dark:border-gray-800">
            <button onClick={toggleTheme} className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 text-ucak-blue dark:text-ucak-gold hover:bg-gray-200 transition-colors">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 p-1 pr-3 bg-gray-50 dark:bg-white/5 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10">
                   <div className="w-8 h-8 rounded-full bg-ucak-blue text-white flex items-center justify-center text-xs font-black uppercase shadow-sm">
                      {user.full_name?.charAt(0)}
                   </div>
                   <ChevronDown size={14} className={`transition-transform text-gray-400 ${isProfileOpen ? 'rotate-180' : ''}`}/>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-ucak-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                     <div className="px-5 py-4 border-b border-gray-50 dark:border-gray-800 mb-2 bg-gray-50/30 dark:bg-white/5">
                        <p className="text-sm font-black text-ucak-blue dark:text-white truncate">{user.full_name}</p>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">{user.matricule}</p>
                     </div>
                     <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="block px-5 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-ucak-blue flex items-center gap-3">
                        <LayoutDashboard size={14}/> Dashboard
                     </Link>
                     <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-3 transition-colors">
                        <LogOut size={14}/> Déconnexion
                     </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 bg-ucak-blue text-white px-7 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-ucak-blue/20 transition-all active:scale-95">
                  <LogIn size={14}/> Connexion
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}