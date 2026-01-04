import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, LogIn, LogOut, User as UserIcon, 
  LayoutDashboard, Trophy, Home, BookOpen, Menu, X, 
  Briefcase, Globe, Award, Newspaper, ChevronDown 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const isActive = (path) => location.pathname === path;

  // --- CONFIGURATION INTELLIGENTE DES LIENS ---
  
  const mainLinks = [
    { path: '/', label: 'Accueil', icon: Home },
    // Si connecté : Dashboard, sinon caché
    { path: '/dashboard', label: 'Espace', icon: LayoutDashboard, protected: true },
    // Si connecté : Bibliothèque, sinon Brochure Publique
    { 
      path: user ? '/knowledge' : '/formation/informatique', 
      label: user ? 'Bibliothèque' : 'Savoir', 
      icon: BookOpen 
    },
    { path: '/career', label: 'Carrière', icon: Briefcase, protected: true },
  ];

  const secondaryLinks = [
    { path: '/news', label: 'Actualités', icon: Newspaper },
    { path: '/showroom', label: 'Showroom', icon: Award },
    { path: '/about', label: 'Institution', icon: Globe },
    { path: '/quizz', label: 'Quizz & XP', icon: Trophy, protected: true },
    { path: '/elections', label: 'Élections', icon: UserIcon, protected: true },
    { path: '/network', label: 'Réseau', icon: Globe, protected: true },
  ];

  // Fusion pour le mobile (Tout afficher)
  const allLinksMobile = [...mainLinks, ...secondaryLinks];

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <nav className="hidden md:block fixed w-full z-50 bg-white/90 dark:bg-ucak-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 transition-all">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-3">
            <img src={logoUcak} alt="UCAK" className="w-10 h-10 object-contain bg-white rounded-lg p-0.5 shadow-md" />
            <span className="text-xl font-extrabold text-ucak-blue dark:text-white tracking-tighter leading-none flex flex-col">
              <span>CLUB</span><span className="text-ucak-green text-sm">MET</span>
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="flex items-center gap-6">
            {/* On affiche les liens principaux + les 2 premiers secondaires */}
            {[...mainLinks, ...secondaryLinks].filter(l => !l.protected || user).slice(0, 6).map(link => (
              <Link key={link.path} to={link.path} className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive(link.path) ? 'text-ucak-green' : 'text-gray-500 hover:text-ucak-blue dark:text-gray-400 dark:hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-ucak-blue dark:text-ucak-gold">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {user ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all">
                  <div className="w-8 h-8 rounded-full bg-ucak-blue text-white flex items-center justify-center font-black text-xs">
                    {user.full_name?.charAt(0)}
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-ucak-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                     <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5 mb-2">
                        <p className="text-sm font-black text-ucak-blue dark:text-white truncate">{user.full_name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{user.matricule}</p>
                     </div>
                     {/* Liens cachés dans la navbar principale */}
                     {secondaryLinks.slice(2).filter(l => !l.protected || user).map(link => (
                        <Link key={link.path} to={link.path} onClick={() => setIsProfileOpen(false)} className="block px-5 py-2 text-xs font-bold text-gray-500 hover:text-ucak-blue hover:bg-gray-50 dark:hover:bg-white/5">
                           {link.label}
                        </Link>
                     ))}
                     <div className="h-px bg-gray-100 dark:bg-white/5 my-2"></div>
                     <button onClick={handleLogout} className="w-full text-left px-5 py-2 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2">
                        <LogOut size={14}/> Déconnexion
                     </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-ucak-blue text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-ucak-green transition-colors">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* --- MOBILE NAVBAR (BOTTOM) --- */}
      <div className="md:hidden fixed bottom-0 w-full z-50 bg-white dark:bg-[#0f141e] border-t border-gray-100 dark:border-white/5 pb-safe px-2 h-[80px] flex justify-around items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         {mainLinks.map((link) => {
           if (link.protected && !user) return null;
           const active = isActive(link.path);
           return (
             <Link key={link.path} to={link.path} className="flex flex-col items-center justify-center w-16 h-full gap-1">
                <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-ucak-blue/10 text-ucak-blue dark:text-ucak-gold dark:bg-ucak-gold/10' : 'text-gray-400'}`}>
                   <link.icon size={22} strokeWidth={active ? 2.5 : 2} />
                </div>
                <span className={`text-[9px] font-bold ${active ? 'text-ucak-blue dark:text-ucak-gold' : 'text-gray-400'}`}>{link.label}</span>
             </Link>
           )
         })}
         <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center justify-center w-16 h-full gap-1">
            <div className={`p-1.5 rounded-xl ${isMenuOpen ? 'bg-ucak-green/10 text-ucak-green' : 'text-gray-400'}`}><Menu size={22} /></div>
            <span className="text-[9px] font-bold text-gray-400">Menu</span>
         </button>
      </div>

      {/* --- MOBILE DRAWER (MENU PLUS) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed bottom-0 left-0 w-full bg-white dark:bg-ucak-dark-card z-[70] md:hidden rounded-t-[2.5rem] overflow-hidden max-h-[80vh] flex flex-col">
               <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-white/5">
                  <span className="font-black text-lg dark:text-white">Menu Complet</span>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full"><X size={20}/></button>
               </div>
               <div className="p-6 grid grid-cols-3 gap-4 overflow-y-auto pb-32">
                  {!user && <Link to="/login" onClick={() => setIsMenuOpen(false)} className="col-span-3 p-4 bg-ucak-blue text-white rounded-2xl flex justify-center font-black text-xs uppercase mb-2">Se Connecter</Link>}
                  
                  {secondaryLinks.map((link) => {
                    if (link.protected && !user) return null;
                    return (
                      <Link key={link.path} to={link.path} onClick={() => setIsMenuOpen(false)} className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl active:scale-95 transition-transform">
                         <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-full flex items-center justify-center text-ucak-blue dark:text-white shadow-sm"><link.icon size={20} /></div>
                         <span className="text-[10px] font-bold text-center uppercase text-gray-600 dark:text-gray-300">{link.label}</span>
                      </Link>
                    )
                  })}
                  {user && <button onClick={handleLogout} className="col-span-3 mt-4 p-4 border border-red-100 bg-red-50 text-red-500 rounded-2xl font-bold text-xs uppercase">Déconnexion</button>}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MOBILE TOP BAR (LOGO) --- */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-white/95 dark:bg-ucak-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 h-14 px-4 flex items-center justify-between">
         <Link to="/" className="flex items-center gap-2"><img src={logoUcak} alt="Logo" className="w-8 h-8" /><span className="font-black text-ucak-blue dark:text-white">CLUB MET</span></Link>
         <button onClick={toggleTheme} className="p-2 text-ucak-blue dark:text-ucak-gold">{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</button>
      </div>
    </>
  );
}