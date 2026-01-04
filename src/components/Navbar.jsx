import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, LogIn, LogOut, User, LayoutDashboard, 
  BookOpen, Menu, X, Briefcase, Globe, Award, 
  Newspaper, Trophy, ChevronRight, Users
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Menu Mobile
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Menu Profil
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Gestion du Thème
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const isActive = (path) => location.pathname === path;

  // Fermer le menu mobile lors d'un changement de page
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- LOGIQUE DES MENUS ---
  
  // 1. LES INCONTOURNABLES (Visibles directement dans la Navbar Desktop)
  const primaryLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Institution', path: '/about' },
    // Lien intelligent : "Formations" pour visiteur, "Ma Bibliothèque" pour étudiant
    { 
      name: user ? 'Bibliothèque' : 'Formations', 
      path: user ? '/knowledge' : '/formation/informatique' 
    },
    // Espace étudiant visible uniquement si connecté
    ...(user ? [{ name: 'Mon Espace', path: '/dashboard' }] : []),
  ];

  // 2. LE RESTE (Accessible via Menu Mobile ou Dropdown Profil)
  const secondaryLinks = [
    { name: 'Actualités', path: '/news', icon: Newspaper },
    { name: 'Showroom Projets', path: '/showroom', icon: Award },
    ...(user ? [
      { name: 'Carrière & Stages', path: '/career', icon: Briefcase },
      { name: 'Challenges XP', path: '/quizz', icon: Trophy },
      { name: 'Élections', path: '/elections', icon: User },
      { name: 'Réseau Alumni', path: '/network', icon: Users },
    ] : [])
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-ucak-dark/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* === LOGO & IDENTITÉ === */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-1.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 group-hover:border-ucak-blue/30 transition-colors">
             <img src={logoUcak} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black text-ucak-blue dark:text-white tracking-tighter">CLUB MET</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase group-hover:text-ucak-green transition-colors">UFR SET</span>
          </div>
        </Link>

        {/* === DESKTOP : NAVIGATION CENTRALE (Incontournables) === */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50 dark:bg-white/5 p-1.5 rounded-full border border-gray-100 dark:border-white/5">
          {primaryLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                isActive(link.path) 
                ? 'bg-white dark:bg-ucak-dark-card text-ucak-blue dark:text-white shadow-sm' 
                : 'text-gray-500 hover:text-ucak-blue dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* === ACTIONS DROITE (Thème + Auth + Menu Mobile) === */}
        <div className="flex items-center gap-3">
          
          {/* Switch Thème */}
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-ucak-blue transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Séparateur */}
          <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1"></div>

          {/* État Connecté */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-100 dark:hover:border-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ucak-blue to-ucak-green text-white flex items-center justify-center text-xs font-black shadow-md">
                  {user.full_name?.charAt(0)}
                </div>
                <span className="hidden md:block text-xs font-bold text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                  {user.full_name.split(' ')[0]}
                </span>
              </button>

              {/* Dropdown Profil (Desktop & Mobile) */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 bg-white dark:bg-ucak-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 origin-top-right"
                  >
                    <div className="p-4 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Connecté en tant que</p>
                      <p className="text-sm font-black text-ucak-blue dark:text-white truncate">{user.full_name}</p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">{user.matricule}</p>
                    </div>
                    
                    <div className="p-2">
                      {secondaryLinks.filter(l => l.path !== '/dashboard').map((link) => (
                        <Link 
                          key={link.path} to={link.path}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <link.icon size={16} className="text-gray-400"/> {link.name}
                        </Link>
                      ))}
                      <div className="h-px bg-gray-100 dark:bg-white/5 my-2 mx-2"></div>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
                        <LogOut size={16} /> Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* État Non Connecté */
            <Link to="/login" className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-ucak-blue text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-ucak-green hover:shadow-lg hover:shadow-ucak-green/20 transition-all transform hover:-translate-y-0.5">
              <LogIn size={16} /> Connexion
            </Link>
          )}

          {/* Bouton Hamburger (Mobile Seulement) */}
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 transition-all"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* === MENU MOBILE FULLSCREEN (OVERLAY) === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white dark:bg-ucak-dark z-[100] md:hidden flex flex-col"
          >
            {/* Header Mobile */}
            <div className="px-6 h-20 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
              <span className="text-xl font-black text-ucak-blue dark:text-white">Menu</span>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-gray-50 dark:bg-white/5 hover:bg-red-50 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Liens Mobile */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-2">Navigation</p>
                {primaryLinks.map(link => (
                  <Link 
                    key={link.path} to={link.path}
                    className={`block p-4 rounded-2xl text-lg font-bold transition-all ${isActive(link.path) ? 'bg-ucak-blue text-white shadow-lg shadow-ucak-blue/20' : 'bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 pl-2">Explorer</p>
                {secondaryLinks.map(link => (
                  <Link 
                    key={link.path} to={link.path}
                    className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-ucak-blue/30 active:bg-gray-50 dark:active:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-500 group-hover:text-ucak-blue transition-colors">
                        <link.icon size={20} />
                      </div>
                      <span className="font-bold text-gray-700 dark:text-gray-200">{link.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </Link>
                ))}
              </div>

              {/* Bouton Login Mobile (si pas connecté) */}
              {!user && (
                <div className="mt-8">
                  <Link to="/login" className="flex items-center justify-center gap-3 w-full p-5 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">
                    <LogIn size={20} /> Se Connecter
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}