import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, GraduationCap, Newspaper, LayoutDashboard, 
  BookOpen, Briefcase, FileText, Trophy, MonitorPlay,
  Menu, X, ChevronDown, User, LogOut, Construction, Rocket,
  Sun, Moon, Settings, ShieldCheck, Users, Vote, Layers
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPOSANTS UI DESKTOP ---
const NavItem = ({ to, icon: Icon, children, isActive, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group ${
      isActive 
        ? 'text-white' 
        : 'text-gray-600 dark:text-gray-300 hover:text-ucak-blue dark:hover:text-white'
    }`}
  >
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-ucak-blue rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className="relative z-10 flex items-center gap-2 text-sm font-bold tracking-wide">
      <Icon size={16} strokeWidth={2.5} />
      {children}
    </span>
  </Link>
);

const DropdownMenu = ({ items, parentId, activeDropdown }) => (
  <AnimatePresence>
    {activeDropdown === parentId && (
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 mt-4 w-64 bg-white/80 dark:bg-[#1a1f2e]/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/5 overflow-hidden p-2 z-50 ring-1 ring-black/5"
      >
        {items.map((item, idx) => (
          <Link 
            key={idx} 
            to={item.path} 
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-ucak-blue/5 dark:hover:bg-white/5 transition-all group"
          >
            <div className={`p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform ${item.admin ? 'bg-red-50 text-red-500' : 'bg-white dark:bg-white/5 text-ucak-blue dark:text-ucak-gold'}`}>
              <item.icon size={18} />
            </div>
            <div>
              <p className={`text-xs font-black uppercase tracking-wider ${item.admin ? 'text-red-600' : 'text-gray-800 dark:text-white'}`}>{item.title}</p>
              {item.desc && <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">{item.desc}</p>}
            </div>
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

// --- COMPOSANT MOBILE LINK ---
const MobileNavLink = ({ to, icon: Icon, label, isActive, onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-all ${isActive ? 'text-ucak-blue' : 'text-gray-400 dark:text-gray-500'}`}
  >
    <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-ucak-blue/10 dark:bg-ucak-blue/20 -translate-y-1' : ''}`}>
      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
    </div>
    <span className="text-[9px] font-bold tracking-wide">{label}</span>
  </Link>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const { user, logout, isAdmin } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme management
  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Reset au changement de page
  useEffect(() => { 
    setMobileMenuOpen(false); 
    setActiveDropdown(null); 
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- LOGIQUE DE NAVIGATION (IDENTIQUE) ---
  const commonLinks = [
    { name: 'Accueil', path: '/', icon: Home },
    { 
      name: 'Formations', type: 'dropdown', id: 'formations', icon: GraduationCap,
      items: [
        { title: 'Informatique', desc: 'Dev, Réseaux & IA', path: '/formation/informatique', icon: GraduationCap },
        { title: 'HEC', desc: 'Finance & Management', path: '/formation/hec', icon: Briefcase }
      ]
    },
    { name: 'Actualités', path: '/news', icon: Newspaper },
   { name: 'Showroom', path: '/showroom', icon: MonitorPlay },
  ];

  const studentLinks = [
    { name: 'Cours', path: '/knowledge', icon: BookOpen },
    { 
      name: 'Carrières', type: 'dropdown', id: 'carrieres', icon: Rocket,
      items: [
        { title: 'Mon CV', desc: 'Générateur Pro', path: '/cv-builder', icon: FileText },
        { title: 'Stages', desc: 'Offres exclusives', path: '/career', icon: Briefcase },
        { title: 'Challenges', desc: 'Quizz & Tests', path: '/quizz', icon: Trophy }
      ]
    },
    { name: 'Espace Étudiant', path: '/dashboard', icon: LayoutDashboard, isButton: true }
  ];

  const adminLinksSection = {
    name: 'Admin', type: 'dropdown', id: 'admin', icon: ShieldCheck, style: 'admin',
    items: [
      { title: 'Gestion Cours', desc: 'Ajouter/Modifier', path: '/admin/courses', icon: BookOpen, admin: true },
      { title: 'Étudiants', desc: 'Base de données', path: '/admin/students', icon: Users, admin: true },
      { title: 'Élections', desc: 'Créer un vote', path: '/admin/elections', icon: Vote, admin: true },
      { title: 'Actualités', desc: 'Publier des news', path: '/admin/news', icon: Newspaper, admin: true }
    ]
  };

  let navLinks = [...commonLinks];
  if (user) navLinks = [...navLinks, ...studentLinks];
  if (isAdmin) navLinks.push(adminLinksSection);

  // Filtres pour le menu mobile "Plus" (tout ce qui n'est pas dans la barre du bas)
  const bottomBarPaths = ['/', '/knowledge', '/dashboard', '/career']; // Paths principaux
  const moreLinks = navLinks.flatMap(link => {
    if (link.type === 'dropdown') return link.items;
    return link;
  }).filter(link => !bottomBarPaths.includes(link.path));

  return (
    <>
      {/* ============================================================
          🖥️ DESKTOP NAVBAR (Large Screens > 1024px)
          Style: Island Floating
      ============================================================ */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} 
        className={`hidden lg:flex fixed top-6 inset-x-0 mx-auto w-[95%] max-w-7xl z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/5 py-3 px-6'
            : 'bg-transparent py-4 px-0'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-ucak-blue blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <img src={logoUcak} alt="Logo" className="w-10 h-10 relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">CLUB MET</span>
              <span className="text-[9px] font-bold text-ucak-blue dark:text-ucak-gold tracking-[0.3em] uppercase">UFR MET</span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-1 bg-white/50 dark:bg-white/5 p-1.5 rounded-full border border-white/20 dark:border-white/5 shadow-inner">
            {navLinks.map((link, idx) => {
              if (link.isButton) return null;
              const isAdminMenu = link.style === 'admin';
              if (link.type === 'dropdown') {
                return (
                  <div key={idx} className="relative" onMouseEnter={() => setActiveDropdown(link.id)} onMouseLeave={() => setActiveDropdown(null)}>
                    <button className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold tracking-wide ${
                      activeDropdown === link.id ? 'bg-white dark:bg-white/10 shadow-sm' : 'hover:bg-white/50 dark:hover:bg-white/5'
                    } ${isAdminMenu ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400 hover:text-ucak-blue dark:hover:text-white'}`}>
                      <link.icon size={16} /> {link.name} <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.id ? 'rotate-180' : ''}`}/>
                    </button>
                    <DropdownMenu items={link.items} parentId={link.id} activeDropdown={activeDropdown} />
                  </div>
                );
              }
              return <NavItem key={idx} to={link.path} icon={link.icon} isActive={location.pathname === link.path}>{link.name}</NavItem>;
            })}
          </div>

          {/* Actions Droite */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-ucak-gold hover:bg-ucak-blue/10 hover:text-ucak-blue transition-all active:scale-90">
              <motion.div initial={false} animate={{ rotate: theme === 'dark' ? 180 : 0 }}>{theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}</motion.div>
            </button>

            {user ? (
              <div className="relative pl-4 border-l border-gray-200 dark:border-white/10" onMouseEnter={() => setActiveDropdown('user')} onMouseLeave={() => setActiveDropdown(null)}>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <Link to="/dashboard" className="hidden xl:flex items-center gap-2 px-4 py-2 bg-ucak-blue/10 text-ucak-blue dark:text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-ucak-blue hover:text-white transition-all">
                    <LayoutDashboard size={14} /> Espace
                  </Link>
                  <div className={`w-10 h-10 rounded-full p-[2px] shadow-lg transition-shadow ${isAdmin ? 'bg-red-500' : 'bg-gradient-to-tr from-ucak-blue to-ucak-green'}`}>
                    <div className="w-full h-full rounded-full bg-white dark:bg-[#0b0f19] flex items-center justify-center overflow-hidden">
                       <span className={`text-sm font-black ${isAdmin ? 'text-red-500' : 'text-ucak-blue'}`}>{user.full_name?.charAt(0)}</span>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-full right-0 mt-4 w-64 bg-white/90 dark:bg-[#1a1f2e]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden p-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 mb-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          {isAdmin ? <span className="text-red-500 flex items-center gap-1"><ShieldCheck size={12}/> Admin</span> : 'Mon Compte'}
                        </p>
                        <p className="text-sm font-black text-gray-900 dark:text-white truncate">{user.full_name}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-200">
                        <Settings size={18} className="text-ucak-blue" /> <span className="text-xs font-bold uppercase">Profil</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-red-500 mt-1">
                        <LogOut size={18} /> <span className="text-xs font-bold uppercase">Déconnexion</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 hover:shadow-xl transition-all">
                <User size={16} /> Connexion
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ============================================================
          📱 MOBILE HEADER (Juste le Logo en haut)
      ============================================================ */}
      <div className="lg:hidden fixed top-0 w-full z-40 px-4 py-3 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5 flex justify-between items-center transition-all">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUcak} alt="Logo" className="w-8 h-8" />
          <span className="font-black text-lg text-ucak-blue dark:text-white">CLUB MET</span>
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-yellow-400">
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {user && (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${isAdmin ? 'bg-red-500' : 'bg-ucak-blue'}`}>
              {user.full_name?.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          📱 MOBILE BOTTOM NAVIGATION (Le Dock)
      ============================================================ */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-white/10 z-50 pb-[env(safe-area-inset-bottom)] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-end h-16 w-full">
          
          <MobileNavLink to="/" icon={Home} label="Accueil" isActive={location.pathname === '/'} />
          <MobileNavLink to="/knowledge" icon={BookOpen} label="Cours" isActive={location.pathname === '/knowledge'} />
          
          {/* Bouton Central (Espace) */}
          <Link to={user ? "/dashboard" : "/login"} className="relative -top-5 group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-ucak-blue to-ucak-green text-white flex items-center justify-center shadow-lg shadow-ucak-blue/40 border-4 border-gray-50 dark:border-[#0f172a] group-active:scale-95 transition-transform">
              {user ? <LayoutDashboard size={24} /> : <User size={24} />}
            </div>
          </Link>

          <MobileNavLink to="/career" icon={Briefcase} label="Stages" isActive={location.pathname === '/career'} />
          
          {/* Bouton Menu (Trigger Overlay) */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className={`flex flex-col items-center justify-center w-16 h-full gap-1 ${mobileMenuOpen ? 'text-ucak-blue' : 'text-gray-400 dark:text-gray-500'}`}
          >
            <div className={`p-1 rounded-xl transition-all ${mobileMenuOpen ? 'bg-ucak-blue/10 dark:bg-ucak-blue/20 -translate-y-1' : ''}`}>
              <Menu size={22} strokeWidth={mobileMenuOpen ? 2.5 : 2} />
            </div>
            <span className="text-[9px] font-bold tracking-wide">Menu</span>
          </button>
        </div>
      </nav>

      {/* ============================================================
          📱 MOBILE MENU OVERLAY (Le Panneau Glissant)
      ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
            />
            
            {/* Panneau */}
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#161b22] rounded-t-[2rem] z-[70] lg:hidden p-6 pb-24 border-t border-white/10 max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-8"></div>
              
              <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-8">
                {/* Liens générés dynamiquement depuis navLinks pour ne rien oublier */}
                {moreLinks.map((link, idx) => (
                  <Link key={idx} to={link.path} onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-2 text-center group">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${link.admin ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-gray-50 dark:bg-white/5 text-ucak-blue group-active:scale-95'}`}>
                      <link.icon size={24} />
                    </div>
                    <span className={`text-[10px] font-bold leading-tight ${link.admin ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}>{link.title || link.name}</span>
                  </Link>
                ))}
              </div>

              {/* Footer Menu */}
              {user ? (
                <div className="space-y-3 pt-6 border-t border-gray-100 dark:border-white/5">
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-200">
                    <div className="p-2 bg-white dark:bg-white/10 rounded-full"><Settings size={18}/></div>
                    Paramètres du compte
                  </Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl font-bold text-sm text-red-500">
                    <div className="p-2 bg-white/50 dark:bg-white/10 rounded-full"><LogOut size={18}/></div>
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 p-4 bg-ucak-blue text-white rounded-2xl font-black text-sm shadow-xl uppercase tracking-widest">
                  <User size={18} /> Se connecter
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}