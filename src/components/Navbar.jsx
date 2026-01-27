import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, GraduationCap, Newspaper, LayoutDashboard, 
  BookOpen, Briefcase, FileText, Trophy, MonitorPlay,
  Menu, X, ChevronDown, User, LogOut, Rocket,
  Sun, Moon, ShieldCheck, Users, Vote, Settings, Sparkles
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';
import { motion, AnimatePresence } from 'framer-motion';

// --- UI COMPONENTS ---
const NavItem = ({ to, icon: Icon, children, isActive }) => (
  <Link 
    to={to} 
    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 group ${
      isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 hover:text-ucak-blue dark:hover:text-white'
    }`}
  >
    {isActive && (
      <motion.div layoutId="activeTab" className="absolute inset-0 bg-ucak-blue rounded-full shadow-lg shadow-ucak-blue/20" />
    )}
    <span className="relative z-10 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
      <Icon size={14} strokeWidth={2.5} />
      {children}
    </span>
  </Link>
);

const DropdownMenu = ({ items, parentId, activeDropdown }) => (
  <AnimatePresence>
    {activeDropdown === parentId && (
      <motion.div
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
        className="absolute top-full left-0 mt-4 w-72 bg-white dark:bg-[#0b0f1a] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5 p-3 z-50 backdrop-blur-xl"
      >
        {items.map((item, idx) => (
          <Link key={idx} to={item.path} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
            <div className={`p-2.5 rounded-xl ${item.admin ? 'bg-red-50 text-red-500' : 'bg-ucak-blue/5 text-ucak-blue dark:text-ucak-gold'}`}>
              <item.icon size={18} />
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-wider ${item.admin ? 'text-red-600' : 'dark:text-white'}`}>{item.title}</p>
              <p className="text-[9px] text-gray-400 font-bold leading-tight mt-0.5">{item.desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // --- REORGANISATION : ESSENTIEL EN PREMIER ---
  
  // 1. Liens Publics (Toujours visibles)
  const publicLinks = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Actualités', path: '/news', icon: Newspaper },
    { name: 'Showroom', path: '/showroom', icon: MonitorPlay },
    { 
      name: 'Formations', type: 'dropdown', id: 'formations', icon: GraduationCap,
      items: [
        { title: 'Informatique', desc: 'Génie Logiciel & IA', path: '/formation/informatique', icon: GraduationCap },
        { title: 'HEC', desc: 'Gestion & Management', path: '/formation/hec', icon: Briefcase }
      ]
    }
  ];

  // 2. Liens Membres (Visibles seulement si user connecté)
  const studentLinks = user ? [
    { name: 'Cours', path: '/knowledge', icon: BookOpen },
    { 
      name: 'Outils MET', type: 'dropdown', id: 'tools', icon: Sparkles,
      items: [
        { title: 'Générateur CV', desc: 'Architecte Pro', path: '/cv-generator', icon: FileText },
        { title: 'Carrière', desc: 'Stages & Emplois', path: '/career', icon: Rocket },
        { title: 'Réseau Alumni', desc: 'Mentorat & Annuaire', path: '/network', icon: Users },
        { title: 'Élections', desc: 'Espace de vote', path: '/elections', icon: Vote }
      ]
    }
  ] : [];

  // 3. Liens Admin (Visibles seulement si isAdmin)
  const adminLinks = isAdmin ? [
    { 
      name: 'Admin', type: 'dropdown', id: 'admin', icon: ShieldCheck, style: 'admin',
      items: [
        { title: 'Cours', desc: 'Gestion du LMS', path: '/admin/courses', icon: BookOpen, admin: true },
        { title: 'Membres', desc: 'Gestion étudiants', path: '/admin/students', icon: Users, admin: true },
        { title: 'Annonces', desc: 'Gestion News', path: '/admin/news', icon: Newspaper, admin: true }
      ]
    }
  ] : [];

  return (
    <>
      {/* 🖥️ DESKTOP : ISLAND STYLE */}
      <motion.nav 
        className={`hidden lg:flex fixed top-6 inset-x-0 mx-auto w-[95%] max-w-7xl z-50 transition-all duration-500 rounded-full border ${
          scrolled 
            ? 'bg-white/80 dark:bg-[#020408]/80 backdrop-blur-xl border-white/20 dark:border-white/5 py-3 px-8 shadow-2xl'
            : 'bg-transparent border-transparent py-5 px-0'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoUcak} alt="Logo" className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="text-xl font-black dark:text-white tracking-tighter uppercase">Club MET</span>
              <span className="text-[8px] font-black text-ucak-blue dark:text-ucak-gold uppercase tracking-[0.3em]">Excellence UCAK</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 bg-gray-50/50 dark:bg-white/5 p-1.5 rounded-full border border-gray-100 dark:border-white/5">
            {publicLinks.map((link, idx) => (
              link.type === 'dropdown' ? (
                <div key={idx} className="relative" onMouseEnter={() => setActiveDropdown(link.id)} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeDropdown === link.id ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-gray-400 hover:text-ucak-blue'}`}>
                    <link.icon size={14} /> {link.name} <ChevronDown size={10} className={activeDropdown === link.id ? 'rotate-180' : ''}/>
                  </button>
                  <DropdownMenu items={link.items} parentId={link.id} activeDropdown={activeDropdown} />
                </div>
              ) : <NavItem key={idx} to={link.path} icon={link.icon} isActive={location.pathname === link.path}>{link.name}</NavItem>
            ))}

            {/* SEPARATION VISUELLE POUR LES MEMBRES */}
            {user && <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-2" />}

            {studentLinks.map((link, idx) => (
              link.type === 'dropdown' ? (
                <div key={idx} className="relative" onMouseEnter={() => setActiveDropdown(link.id)} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeDropdown === link.id ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-gray-400 hover:text-ucak-blue'}`}>
                    <link.icon size={14} /> {link.name} <ChevronDown size={10}/>
                  </button>
                  <DropdownMenu items={link.items} parentId={link.id} activeDropdown={activeDropdown} />
                </div>
              ) : <NavItem key={idx} to={link.path} icon={link.icon} isActive={location.pathname === link.path}>{link.name}</NavItem>
            ))}

            {adminLinks.map((link, idx) => (
              <div key={idx} className="relative" onMouseEnter={() => setActiveDropdown(link.id)} onMouseLeave={() => setActiveDropdown(null)}>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                  <ShieldCheck size={14} /> Admin
                </button>
                <DropdownMenu items={link.items} parentId={link.id} activeDropdown={activeDropdown} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-3 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-ucak-gold">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                 <Link to="/dashboard" className="px-6 py-3 bg-ucak-blue text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-ucak-blue/20">Dashboard</Link>
                 <button onClick={logout} className="p-3 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-full"><LogOut size={18}/></button>
              </div>
            ) : (
              <Link to="/login" className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-widest">Connexion</Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* 📱 MOBILE : HEADER (LOGO + THEME) */}
      <div className="lg:hidden fixed top-0 w-full z-40 px-6 py-4 bg-white/90 dark:bg-[#020408]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoUcak} alt="Logo" className="w-8 h-8" />
          <span className="font-black text-lg dark:text-white uppercase tracking-tighter">Club MET</span>
        </Link>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-ucak-gold">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* 📱 MOBILE : DOCK BAS (ESSENTIEL) */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50 bg-white/95 dark:bg-[#0b0f1a]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl p-2 flex justify-around items-center">
        <Link to="/" className={`p-4 rounded-2xl ${location.pathname === '/' ? 'bg-ucak-blue text-white shadow-lg shadow-ucak-blue/20' : 'text-gray-400'}`}><Home size={22}/></Link>
        <Link to="/news" className={`p-4 rounded-2xl ${location.pathname === '/news' ? 'bg-ucak-blue text-white shadow-lg' : 'text-gray-400'}`}><Newspaper size={22}/></Link>
        
        {/* BOUTON CENTRAL : ESPACE PERSONNEL */}
        <Link to={user ? "/dashboard" : "/login"} className="relative -top-8 w-16 h-16 rounded-full bg-gradient-to-tr from-ucak-blue to-ucak-green text-white flex items-center justify-center shadow-2xl border-4 border-[#fafafa] dark:border-[#020408]">
          {user ? <LayoutDashboard size={28} /> : <User size={28} />}
        </Link>

        <Link to="/showroom" className={`p-4 rounded-2xl ${location.pathname === '/showroom' ? 'bg-ucak-blue text-white shadow-lg' : 'text-gray-400'}`}><MonitorPlay size={22}/></Link>
        <button onClick={() => setMobileMenuOpen(true)} className={`p-4 rounded-2xl ${mobileMenuOpen ? 'bg-ucak-blue text-white shadow-lg' : 'text-gray-400'}`}><Menu size={22}/></button>
      </nav>

      {/* 📱 MOBILE : MENU OVERLAY (OUTILS MEMBRES) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#0b0f1a] rounded-t-[3rem] z-[70] lg:hidden p-8 pb-24 border-t border-white/10">
              <div className="w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mx-auto mb-10" />
              
              <div className="space-y-8">
                {/* SECTION FORMATIONS (PUBLIC) */}
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 ml-2">Formations UFR</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/formation/informatique" className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex flex-col gap-2">
                       <GraduationCap size={20} className="text-ucak-blue" />
                       <span className="text-xs font-bold dark:text-white">Informatique</span>
                    </Link>
                    <Link to="/formation/hec" className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex flex-col gap-2">
                       <Briefcase size={20} className="text-ucak-blue" />
                       <span className="text-xs font-bold dark:text-white">HEC</span>
                    </Link>
                  </div>
                </div>

                {/* SECTION MEMBRES (PROTEGEE) */}
                {user && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4 ml-2">Mes Outils MET</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/knowledge" className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center gap-3">
                        <BookOpen size={18} className="text-ucak-blue" />
                        <span className="text-xs font-bold dark:text-white">Cours</span>
                      </Link>
                      <Link to="/cv-generator" className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center gap-3">
                        <FileText size={18} className="text-ucak-blue" />
                        <span className="text-xs font-bold dark:text-white">CV Pro</span>
                      </Link>
                      <Link to="/career" className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center gap-3">
                        <Rocket size={18} className="text-ucak-blue" />
                        <span className="text-xs font-bold dark:text-white">Stages</span>
                      </Link>
                      <Link to="/elections" className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center gap-3">
                        <Vote size={18} className="text-ucak-blue" />
                        <span className="text-xs font-bold dark:text-white">Voter</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* SECTION ADMIN (PROTEGEE) */}
                {isAdmin && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/50 mb-4 ml-2">Administration</h4>
                    <Link to="/admin" className="p-5 bg-red-50 dark:bg-red-900/10 rounded-2xl flex items-center justify-between">
                       <div className="flex items-center gap-4 text-red-600">
                          <ShieldCheck size={20} />
                          <span className="text-sm font-black uppercase tracking-widest">Panneau de contrôle</span>
                       </div>
                       <ChevronDown size={18} className="-rotate-90 text-red-500" />
                    </Link>
                  </div>
                )}

                {user ? (
                   <button onClick={logout} className="w-full py-5 bg-red-50 dark:bg-red-500/5 text-red-500 rounded-3xl font-black uppercase text-[10px] tracking-[0.3em]">Déconnexion</button>
                ) : (
                  <Link to="/login" className="w-full py-5 bg-ucak-blue text-white rounded-3xl font-black uppercase text-[10px] tracking-[0.3em] text-center block">Connexion</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}