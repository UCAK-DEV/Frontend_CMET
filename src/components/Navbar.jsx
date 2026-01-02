import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Lock, LogIn, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useUser } from '../context/UserContext'; // <--- Connexion au Cerveau
import logoUcak from '../assets/logo-ucak.png'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  const { user, logout } = useUser(); // Récupérer l'utilisateur et la fonction logout
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

  const publicLinks = [
    { path: '/about', label: 'A Propos' },
    { path: '/news', label: 'Actualités' },
    { path: '/showroom', label: 'Showroom' },
  ];

  const memberLinks = [
    { path: '/dashboard', label: 'Mon Espace' },
    { path: '/knowledge', label: 'Savoir' },
    { path: '/network', label: 'Réseau' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-ucak-dark/90 backdrop-blur-md border-b border-ucak-green/10 dark:border-ucak-gold/10 transition-all duration-500">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoUcak} alt="UCAK Logo" className="w-10 h-10 object-contain bg-white rounded-lg p-0.5 shadow-md" />
          <span className="text-2xl font-extrabold text-ucak-blue dark:text-white tracking-tight flex flex-col leading-none">
            <span>CLUB</span>
            <span className="text-ucak-green dark:text-ucak-gold text-lg">MET</span>
          </span>
        </Link>
        
        {/* MENU BUREAU */}
        <div className="hidden md:flex items-center gap-6 font-bold text-sm uppercase tracking-wider">
          
          {/* Liens Publics */}
          <div className="flex gap-6 text-gray-500 dark:text-gray-400">
            {publicLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`transition-colors hover:text-ucak-blue dark:hover:text-white ${isActive(link.path) ? 'text-ucak-blue dark:text-white font-extrabold' : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-8 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

          {/* Zone Membre (Dynamique) */}
          {user ? (
            <div className="flex gap-5 items-center">
               <span className="text-[10px] text-ucak-gold flex items-center gap-1 border border-ucak-gold/30 px-2 py-0.5 rounded-full">
                  <Lock size={10} /> Private
               </span>
               {memberLinks.map((link) => (
                <Link key={link.path} to={link.path} className={`relative py-2 transition-colors hover:text-ucak-green dark:hover:text-ucak-gold ${isActive(link.path) ? 'text-ucak-green dark:text-ucak-gold' : 'text-ucak-blue dark:text-gray-300'}`}>
                  {link.label}
                  {isActive(link.path) && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-ucak-green dark:bg-ucak-gold rounded-full"></span>}
                </Link>
              ))}
              
              {/* Dropdown Profil */}
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 pl-2 pr-1 py-1 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-gray-200 transition-colors">
                   <img src={user.photo} alt="Profil" className="w-8 h-8 rounded-full object-cover border border-ucak-gold" />
                   <ChevronDown size={14} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}/>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-ucak-dark-card rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                     <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
                     </div>
                     <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-ucak-blue flex items-center gap-2">
                        <UserIcon size={14}/> Mon Profil
                     </Link>
                     <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                        <LogOut size={14}/> Déconnexion
                     </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="flex items-center gap-2 bg-ucak-blue text-white px-4 py-2 rounded-full text-xs font-bold hover:shadow-lg transition-all hover:scale-105">
                <LogIn size={14}/> Connexion
              </button>
            </Link>
          )}

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-ucak-dark-card text-ucak-blue dark:text-ucak-gold hover:bg-gray-200 transition-colors">
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
        <div className="md:hidden bg-white/95 dark:bg-ucak-dark/95 backdrop-blur-md border-t dark:border-gray-700 p-6 absolute w-full flex flex-col gap-6 shadow-xl h-screen overflow-y-auto pb-32">
           <div className="space-y-4">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Espace Public</p>
             {publicLinks.map((link) => (
                <Link key={link.path} to={link.path} className="block text-xl font-bold text-ucak-blue dark:text-white" onClick={() => setIsOpen(false)}>{link.label}</Link>
             ))}
           </div>
           <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-2"></div>
           {user ? (
             <div className="space-y-4">
               <div className="flex items-center gap-3 mb-4 bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                  <img src={user.photo} className="w-10 h-10 rounded-full object-cover"/>
                  <div>
                     <p className="font-bold text-sm dark:text-white">{user.name}</p>
                     <p className="text-xs text-ucak-green">Membre Connecté</p>
                  </div>
               </div>
               <p className="text-xs font-bold text-ucak-gold uppercase tracking-widest flex items-center gap-2"><Lock size={12}/> Espace Membre</p>
               {memberLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="block text-xl font-bold text-ucak-green dark:text-ucak-gold" onClick={() => setIsOpen(false)}>{link.label}</Link>
               ))}
               <button onClick={() => {handleLogout(); setIsOpen(false);}} className="w-full text-left text-red-500 font-bold mt-4 flex items-center gap-2"><LogOut size={18}/> Se déconnecter</button>
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