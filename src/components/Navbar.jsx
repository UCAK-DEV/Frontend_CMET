import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, LogIn, LogOut, Menu, ShieldAlert, 
  LayoutDashboard, BookOpen, Briefcase, Network, Trophy
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const { user, logout, isAdmin } = useUser(); 
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

  // Fermer les menus au changement de page
  useEffect(() => { setIsProfileOpen(false); setIsMobileMenuOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  // --- LOGIQUE DES LIENS ---
  
  // 1. Liens pour VISITEURS (Site Vitrine)
  const guestLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'L\'Institution', path: '/about' },
    { name: 'Nos Formations', path: '/formation/informatique' },
    { name: 'Vie Étudiante', path: '/news' },
    { name: 'Showroom', path: '/showroom' },
  ];

  // 2. Liens pour ÉTUDIANTS (Application)
  const studentLinks = [
    { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Bibliothèque', path: '/knowledge', icon: BookOpen },
    { name: 'Carrière', path: '/career', icon: Briefcase },
    { name: 'Réseau', path: '/network', icon: Network },
    { name: 'Challenges', path: '/quizz', icon: Trophy },
  ];

  // 3. Liens ADMIN (Ajoutés si isAdmin)
  const adminLinks = isAdmin ? [
    { name: 'Gestion Cours', path: '/admin/courses' },
    { name: 'Gestion Étudiants', path: '/admin/students' },
  ] : [];

  // Sélection de la liste à afficher
  const currentLinks = user ? studentLinks : guestLinks;

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-ucak-dark/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
          <div className="p-1.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 group-hover:border-ucak-blue/30 transition-colors">
             <img src={logoUcak} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black text-ucak-blue dark:text-white tracking-tighter">CLUB MET</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase group-hover:text-ucak-green transition-colors">UFR SET</span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50 dark:bg-white/5 p-1.5 rounded-full border border-gray-100 dark:border-white/5">
          {currentLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
                isActive(link.path) 
                ? 'bg-white dark:bg-ucak-dark-card text-ucak-blue dark:text-white shadow-sm scale-105' 
                : 'text-gray-500 hover:text-ucak-blue dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {link.icon && <link.icon size={14} className={isActive(link.path) ? 'text-ucak-green' : 'opacity-70'} />}
              {link.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS (Theme & User) */}
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2.5 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-ucak-blue transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1"></div>

          {user ? (
            <div className="relative">
              {/* Trigger Profil */}
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-100 dark:hover:border-white/10 transition-all">
                <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-black shadow-md ${isAdmin ? 'bg-red-500' : 'bg-gradient-to-br from-ucak-blue to-ucak-green'}`}>
                  {user.full_name?.charAt(0)}
                </div>
                <span className="hidden md:block text-xs font-bold text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                  {user.full_name.split(' ')[0]}
                </span>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-4 w-64 bg-white dark:bg-ucak-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 origin-top-right">
                    
                    {/* Header Dropdown */}
                    <div className="p-4 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {isAdmin ? <span className="text-red-500 flex items-center gap-1"><ShieldAlert size={12}/> ADMIN MODE</span> : 'Espace Étudiant'}
                      </p>
                      <p className="text-sm font-black text-ucak-blue dark:text-white truncate">{user.full_name}</p>
                      <p className="text-[10px] text-gray-500 font-mono mt-0.5">{user.matricule}</p>
                    </div>
                    
                    {/* Links Dropdown */}
                    <div className="p-2">
                      {isAdmin && (
                        <div className="mb-2 pb-2 border-b border-gray-100 dark:border-white/5">
                           <p className="px-4 py-1 text-[10px] uppercase font-bold text-gray-400 mb-1">Administration</p>
                           {adminLinks.map(link => (
                             <Link key={link.path} to={link.path} className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">
                               {link.name}
                             </Link>
                           ))}
                           <Link to="/admin/elections" className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">Gestion Votes</Link>
                           <Link to="/admin/news" className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors">Publier News</Link>
                        </div>
                      )}
                      
                      <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
                        <LayoutDashboard size={16} className="text-ucak-blue"/> Mon Tableau de bord
                      </Link>
                      
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
            <Link to="/login" className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-ucak-blue text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-ucak-green hover:shadow-lg transition-all">
              <LogIn size={16} /> Connexion
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 transition-all">
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay (Simplifié pour l'exemple) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-ucak-dark border-b border-gray-100 dark:border-white/5 p-4 flex flex-col gap-2 shadow-xl">
          {currentLinks.map(link => (
            <Link key={link.path} to={link.path} className="p-4 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl">
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}