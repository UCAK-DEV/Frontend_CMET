import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, LogIn, LogOut, ShieldAlert, LayoutDashboard, 
  BookOpen, Briefcase, Home, GraduationCap, Newspaper, User, MoreHorizontal 
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';
import { motion, AnimatePresence } from 'framer-motion';

// --- SOUS-COMPOSANTS (Définis AVANT pour éviter le crash) ---

const DesktopProfileMenu = ({ user, isAdmin, logout }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
    animate={{ opacity: 1, y: 0, scale: 1 }} 
    exit={{ opacity: 0, y: 10, scale: 0.95 }} 
    className="absolute right-0 mt-4 w-64 bg-white dark:bg-ucak-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 origin-top-right"
  >
     <div className="p-4 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
           {isAdmin ? <span className="text-red-500">ADMINISTRATEUR</span> : 'Connecté'}
        </p>
        <p className="text-sm font-black text-ucak-blue dark:text-white truncate">{user.full_name}</p>
     </div>
     <div className="p-2">
        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors">
          <LayoutDashboard size={16}/> Dashboard
        </Link>
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
          <LogOut size={16}/> Déconnexion
        </button>
     </div>
  </motion.div>
);

const MobileMenuButton = ({ icon: Icon, label, to, visible = true, onClick }) => {
  if (!visible) return null;
  
  // Si on passe une fonction onClick (ex: Logout), on l'utilise, sinon on utilise Link
  if (onClick) {
    return (
      <button onClick={onClick} className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl active:scale-95 transition-all w-full h-full">
         <Icon size={24} className="mb-2 text-ucak-blue dark:text-gray-200" />
         <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{label}</span>
      </button>
    );
  }

  return (
    <Link to={to} className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl active:scale-95 transition-all h-full">
       <Icon size={24} className="mb-2 text-ucak-blue dark:text-gray-200" />
       <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{label}</span>
    </Link>
  );
};

// --- COMPOSANT PRINCIPAL ---

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const { user, logout, isAdmin } = useUser(); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowMobileMenu(false); // Ferme le menu mobile si ouvert
  };

  // --- LIENS DE NAVIGATION ---

  const guestLinks = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Formations', path: '/formation/informatique', icon: GraduationCap },
    { name: 'Infos', path: '/news', icon: Newspaper },
    { name: 'Login', path: '/login', icon: LogIn },
  ];

  const studentMobileLinks = [
    { name: 'Accueil', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Cours', path: '/knowledge', icon: BookOpen },
    { name: 'Carrière', path: '/career', icon: Briefcase },
    { name: 'Menu', path: '#', action: 'menu', icon: MoreHorizontal }, // Bouton Menu
  ];

  const desktopLinks = user ? [
    { name: 'Tableau de bord', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Bibliothèque', path: '/knowledge', icon: BookOpen },
    { name: 'Carrière', path: '/career', icon: Briefcase },
    { name: 'Réseau', path: '/network', icon: User },
  ] : guestLinks.filter(l => l.path !== '/login');

  const currentMobileLinks = user ? studentMobileLinks : guestLinks;

  return (
    <>
      {/* =======================
          1. DESKTOP NAVBAR
         ======================= */}
      <nav className="hidden md:flex fixed w-full z-50 bg-white/90 dark:bg-ucak-dark/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all duration-300 h-20 items-center justify-between px-6">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
            <div className="p-1.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 group-hover:border-ucak-blue/30 transition-colors">
               <img src={logoUcak} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black text-ucak-blue dark:text-white tracking-tighter">CLUB MET</span>
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase group-hover:text-ucak-green transition-colors">UFR SET</span>
            </div>
          </Link>

          <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 p-1.5 rounded-full border border-gray-100 dark:border-white/5">
            {desktopLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${
                  isActive(link.path) 
                  ? 'bg-white dark:bg-ucak-dark-card text-ucak-blue dark:text-white shadow-sm scale-105' 
                  : 'text-gray-500 hover:text-ucak-blue dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <link.icon size={14} className={isActive(link.path) ? 'text-ucak-green' : 'opacity-70'} />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2.5 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-ucak-blue transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1"></div>
            
            {user ? (
               <div className="relative">
                 <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent hover:border-gray-100 dark:hover:border-white/10 transition-all">
                   <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs font-black shadow-md ${isAdmin ? 'bg-red-500' : 'bg-gradient-to-br from-ucak-blue to-ucak-green'}`}>
                     {user.full_name?.charAt(0)}
                   </div>
                   <span className="text-xs font-bold text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                     {user.full_name.split(' ')[0]}
                   </span>
                 </button>
                 <AnimatePresence>
                   {isProfileOpen && (
                     <DesktopProfileMenu user={user} isAdmin={isAdmin} logout={handleLogout} />
                   )}
                 </AnimatePresence>
               </div>
            ) : (
               <Link to="/login" className="flex items-center gap-2 px-6 py-2.5 bg-ucak-blue text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-ucak-green hover:shadow-lg transition-all">
                 <LogIn size={16} /> Connexion
               </Link>
            )}
          </div>
      </nav>

      {/* =======================
          2. MOBILE HEADER
         ======================= */}
      <div className="md:hidden fixed top-0 w-full z-40 bg-white/80 dark:bg-ucak-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 px-4 h-16 flex items-center justify-between transition-colors duration-300">
         <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <img src={logoUcak} alt="Logo" className="w-8 h-8" />
            <span className="font-black text-ucak-blue dark:text-white tracking-tight">CLUB MET</span>
         </Link>
         
         <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-200">
               {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user && (
               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white ${isAdmin ? 'bg-red-500' : 'bg-ucak-blue'}`}>
                  {user.full_name.charAt(0)}
               </div>
            )}
         </div>
      </div>

      {/* =======================
          3. MOBILE BOTTOM NAV
         ======================= */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white dark:bg-[#0f141f] border-t border-gray-200 dark:border-white/5 pb-safe-area-inset-bottom transition-colors duration-300">
         <div className="flex justify-around items-center h-16 px-2">
            {currentMobileLinks.map((link, index) => {
               const active = isActive(link.path);
               
               // Cas spécial : Bouton Menu
               if (link.action === 'menu') {
                 return (
                   <button 
                     key={index}
                     onClick={() => setShowMobileMenu(true)}
                     className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${showMobileMenu ? 'text-ucak-blue dark:text-white' : 'text-gray-400'}`}
                   >
                      <MoreHorizontal size={24} />
                      <span className="text-[10px] font-bold">Menu</span>
                   </button>
                 )
               }

               return (
                 <Link 
                   key={index} 
                   to={link.path}
                   className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all relative group`}
                 >
                    {active && <motion.div layoutId="mobileNavIndicator" className="absolute -top-[1px] w-8 h-1 bg-ucak-blue rounded-b-full" />}
                    
                    <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-blue-50 dark:bg-white/10 text-ucak-blue dark:text-white -translate-y-1' : 'text-gray-400'}`}>
                       <link.icon size={20} strokeWidth={active ? 2.5 : 2} />
                    </div>
                    <span className={`text-[10px] font-bold ${active ? 'text-ucak-blue dark:text-white' : 'text-gray-400'}`}>
                       {link.name}
                    </span>
                 </Link>
               );
            })}
         </div>
      </nav>

      {/* MOBILE MENU MODAL */}
      <AnimatePresence>
        {showMobileMenu && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end justify-center"
             onClick={() => setShowMobileMenu(false)}
           >
              <motion.div 
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                className="w-full bg-white dark:bg-ucak-dark-card rounded-t-[2rem] p-6 pb-10"
                onClick={e => e.stopPropagation()}
              >
                 <div className="w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mx-auto mb-6"></div>
                 
                 {user && (
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-white/5">
                       <div className="w-14 h-14 bg-ucak-blue text-white rounded-full flex items-center justify-center text-xl font-black">
                          {user.full_name.charAt(0)}
                       </div>
                       <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white">{user.full_name}</h4>
                          <p className="text-sm text-gray-500">{user.matricule}</p>
                       </div>
                    </div>
                 )}

                 <div className="grid grid-cols-2 gap-3 mb-6">
                    <MobileMenuButton icon={User} label="Mon Profil" to="/dashboard" />
                    <MobileMenuButton icon={Briefcase} label="Stages" to="/career" />
                    <MobileMenuButton icon={Newspaper} label="News" to="/news" />
                    <MobileMenuButton icon={ShieldAlert} label="Admin" to="/admin/courses" visible={isAdmin} />
                 </div>

                 {user ? (
                   <button 
                     onClick={handleLogout}
                     className="w-full py-4 bg-red-50 dark:bg-red-900/10 text-red-500 font-black rounded-2xl flex items-center justify-center gap-2"
                   >
                      <LogOut size={20} /> Se déconnecter
                   </button>
                 ) : (
                   <Link to="/login" onClick={() => setShowMobileMenu(false)} className="w-full py-4 bg-ucak-blue text-white font-black rounded-2xl flex items-center justify-center gap-2">
                      <LogIn size={20} /> Se connecter
                   </Link>
                 )}
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}