import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, GraduationCap, Newspaper, LayoutDashboard, 
  BookOpen, Briefcase, FileText, Trophy, 
  Menu, X, ChevronDown, User, LogOut, Construction, Rocket,
  Sun, Moon, Settings, ShieldCheck, Users, Vote
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPOSANTS UI ---

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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const { user, logout, isAdmin } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => { 
    setIsMobileMenuOpen(false); 
    setActiveDropdown(null); 
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- CONFIGURATION ---
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
    { name: 'Showroom', path: '/showroom', icon: Construction },
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

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className={`hidden lg:flex fixed top-6 inset-x-0 mx-auto w-[95%] max-w-7xl z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/5 py-3 px-6'
            : 'bg-transparent py-4 px-0'
        }`}
      >
        <div className="w-full flex items-center justify-between">
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
                          {isAdmin ? <span className="text-red-500 flex items-center gap-1"><ShieldCheck size={12}/> Administrateur</span> : 'Mon Compte'}
                        </p>
                        <p className="text-sm font-black text-gray-900 dark:text-white truncate">{user.full_name}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-700 dark:text-gray-200">
                        <Settings size={18} className="text-ucak-blue" /> <span className="text-xs font-bold uppercase">Modifier le profil</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-red-500 mt-1">
                        <LogOut size={18} /> <span className="text-xs font-bold uppercase">Se déconnecter</span>
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

      {/* === HEADER MOBILE === */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUcak} alt="Logo" className="w-8 h-8" />
          <span className="font-black text-lg text-ucak-blue dark:text-white">CLUB MET</span>
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-yellow-400">{theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}</button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 bg-ucak-blue/10 dark:bg-white/10 text-ucak-blue dark:text-white rounded-xl active:scale-95 transition-transform"><Menu size={22} strokeWidth={2.5} /></button>
        </div>
      </div>

      {/* === MENU MOBILE OVERLAY === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="lg:hidden fixed inset-0 z-[60] bg-white dark:bg-[#0b0f19] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
              <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Navigation</p><h2 className="text-2xl font-black text-gray-900 dark:text-white">MENU</h2></div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-white active:rotate-90 transition-all"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              {navLinks.map((link, idx) => {
                if (link.type === 'dropdown') {
                  return (
                    <div key={idx} className={`p-4 rounded-3xl mb-2 ${link.style === 'admin' ? 'bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20' : 'bg-gray-50 dark:bg-white/5'}`}>
                      <p className={`flex items-center gap-3 text-sm font-black uppercase tracking-wider mb-4 px-2 ${link.style === 'admin' ? 'text-red-600' : 'text-gray-400'}`}><link.icon size={16} /> {link.name}</p>
                      <div className="space-y-1">
                        {link.items.map((sub, i) => (
                          <Link key={i} to={sub.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-4 p-3 rounded-2xl border ${link.style === 'admin' ? 'bg-white dark:bg-white/5 border-red-100 dark:border-red-900/20' : 'bg-white dark:bg-white/5 border-gray-100 dark:border-white/5'}`}>
                            <div className={`p-2 rounded-xl ${link.style === 'admin' ? 'bg-red-100 text-red-500' : 'bg-ucak-blue/10 text-ucak-blue'}`}><sub.icon size={18}/></div>
                            <span className="font-bold text-gray-800 dark:text-white">{sub.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link key={idx} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-4 p-4 rounded-3xl transition-all ${location.pathname === link.path ? 'bg-ucak-blue text-white shadow-lg' : 'bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-200'}`}>
                    <link.icon size={22} strokeWidth={2.5} /> <span className="text-lg font-bold">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5">
              {user ? (
                <div className="space-y-3">
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 bg-white dark:bg-white/10 text-gray-800 dark:text-white rounded-2xl font-bold flex items-center justify-center gap-2 border border-gray-100 dark:border-transparent"><Settings size={20} /> Modifier le profil</Link>
                  <button onClick={() => { logout(); navigate('/'); }} className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2"><LogOut size={20} /> Déconnexion</button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2"><User size={20} /> Se connecter</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}