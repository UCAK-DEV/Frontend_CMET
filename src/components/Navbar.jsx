import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, GraduationCap, Newspaper, LayoutDashboard, 
  BookOpen, Briefcase, FileText, Trophy, MonitorPlay,
  Menu, X, ChevronDown, User, LogOut, Rocket,
  Sun, Moon, ShieldCheck, Users, Vote, Settings, Sparkles, Globe
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/images/logo-ucak.png';
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
  
  // 1. Définition des liens de base
  const basePublicLinks = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Actualités', path: '/news', icon: Newspaper },
    { name: 'Showroom', path: '/showroom', icon: MonitorPlay },
  ];

  // 2. Logique d'affichage adaptative (RESPONSIVE FIX)
  // Si connecté : On regroupe "Accueil/News/Showroom" dans un menu "Exploration" pour gagner de la place
  const visiblePublicLinks = user ? [
    { 
      name: 'UFR Direct', type: 'dropdown', id: 'explore', icon: Globe,
      items: [
        { title: 'Accueil', desc: 'Retour page principale', path: '/', icon: Home },
        { title: 'Actualités', desc: 'Actualités & Événements', path: '/news', icon: Newspaper },
        { title: 'Showroom', desc: 'Vitrine projets', path: '/showroom', icon: MonitorPlay }
      ]
    }
  ] : basePublicLinks;

  // 3. Liens Membres (Visibles seulement si user connecté)
  const studentLinks = user ? [
    { name: 'Cours', path: '/knowledge', icon: BookOpen },
    { 
      name: 'Services Académiques', type: 'dropdown', id: 'tools', icon: Sparkles,
      items: [
        { title: 'Générateur CV', desc: 'Architecte Pro', path: '/cv-generator', icon: FileText },
        { title: 'Carrière', desc: 'Stages & Emplois', path: '/career', icon: Rocket },
        { title: 'Réseau Alumni', desc: 'Mentorat & Annuaire', path: '/network', icon: Users },
        { title: 'Élections', desc: 'Espace de vote', path: '/elections', icon: Vote }
      ]
    }
  ] : [];

  // 4. Liens Admin (Visibles seulement si isAdmin)
  const adminLinks = isAdmin ? [
    { 
      name: 'Admin', type: 'dropdown', id: 'admin', icon: ShieldCheck, style: 'admin',
      items: [
        { title: 'Cours', desc: 'Gestion du LMS', path: '/admin/courses', icon: BookOpen, admin: true },
        { title: 'Membres', desc: 'Gestion étudiants', path: '/admin/students', icon: Users, admin: true },
        { title: 'Annonces', desc: 'Gestion News', path: '/admin/news', icon: Newspaper, admin: true },
        { title: 'Examens', desc: 'Créateur de Quiz', path: '/admin/quizzes', icon: Trophy, admin: true },
        { title: 'Votes', desc: 'Pilotage Élections', path: '/admin/elections', icon: Vote, admin: true }
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
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logoUcak} alt="Logo" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col">
              <span className="text-xl font-black dark:text-white tracking-tighter uppercase">UFR MET</span>

            </div>
          </Link>

          {/* CONTAINER DES LIENS (Flexible) */}
          <div className="flex items-center gap-1 xl:gap-2 bg-gray-50/50 dark:bg-white/5 p-1.5 rounded-full border border-gray-100 dark:border-white/5 mx-4">
            {visiblePublicLinks.map((link, idx) => (
              link.type === 'dropdown' ? (
                <div key={idx} className="relative shrink-0" onMouseEnter={() => setActiveDropdown(link.id)} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeDropdown === link.id ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-gray-400 hover:text-ucak-blue'}`}>
                    <link.icon size={14} /> {link.name} <ChevronDown size={10} className={activeDropdown === link.id ? 'rotate-180' : ''}/>
                  </button>
                  <DropdownMenu items={link.items} parentId={link.id} activeDropdown={activeDropdown} />
                </div>
              ) : <NavItem key={idx} to={link.path} icon={link.icon} isActive={location.pathname === link.path}>{link.name}</NavItem>
            ))}

            {/* SEPARATION VISUELLE POUR LES MEMBRES */}
            {user && <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-1 shrink-0" />}

            {studentLinks.map((link, idx) => (
              link.type === 'dropdown' ? (
                <div key={idx} className="relative shrink-0" onMouseEnter={() => setActiveDropdown(link.id)} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${activeDropdown === link.id ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-gray-400 hover:text-ucak-blue'}`}>
                    <link.icon size={14} /> {link.name} <ChevronDown size={10}/>
                  </button>
                  <DropdownMenu items={link.items} parentId={link.id} activeDropdown={activeDropdown} />
                </div>
              ) : <NavItem key={idx} to={link.path} icon={link.icon} isActive={location.pathname === link.path}>{link.name}</NavItem>
            ))}

            {adminLinks.map((link, idx) => (
              <div key={idx} className="relative shrink-0" onMouseEnter={() => setActiveDropdown(link.id)} onMouseLeave={() => setActiveDropdown(null)}>
                <button className="flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                  <ShieldCheck size={14} /> Admin
                </button>
                <DropdownMenu items={link.items} parentId={link.id} activeDropdown={activeDropdown} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 shrink-0">
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

            {/* 📱 MOBILE : HEADER (LOGO + THEME + MENU TRIGGER) */}

            <div className="lg:hidden fixed top-0 w-full z-50 px-6 py-4 bg-white/90 dark:bg-[#020408]/90 backdrop-blur-md border-b border-gray-100 dark:border-white/5 flex justify-between items-center transition-all duration-300">

              <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>

                <img src={logoUcak} alt="Logo" className="w-8 h-8 rounded-full" />

                <span className="font-black text-lg dark:text-white uppercase tracking-tighter">UFR MET</span>

              </Link>

              <div className="flex items-center gap-4">

                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-ucak-gold">

                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}

                </button>

                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2.5 rounded-xl bg-ucak-blue text-white shadow-lg shadow-ucak-blue/30">

                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}

                </button>

              </div>

            </div>

      

            {/* 📱 MOBILE : FULL SCREEN MENU (MODERNE) */}

            <AnimatePresence>

              {mobileMenuOpen && (

                <motion.div 

                  initial={{ opacity: 0, y: -20 }} 

                  animate={{ opacity: 1, y: 0 }} 

                  exit={{ opacity: 0, y: -20 }} 

                  className="fixed inset-0 z-40 bg-white dark:bg-[#020408] pt-24 pb-10 px-6 overflow-y-auto lg:hidden flex flex-col"

                >

                  {/* Liens Principaux */}

                  <nav className="flex-1 space-y-2">

                    <MobileLink to="/" icon={<Home size={20} />} label="Accueil" onClick={() => setMobileMenuOpen(false)} />

                    <MobileLink to="/news" icon={<Newspaper size={20} />} label="Actualités" onClick={() => setMobileMenuOpen(false)} />

                    <MobileLink to="/showroom" icon={<MonitorPlay size={20} />} label="Showroom" onClick={() => setMobileMenuOpen(false)} />

                    

                    {/* Séparateur */}

                    <div className="my-6 border-t border-gray-100 dark:border-white/5"></div>

      

                    {/* Outils Membres */}

                    {user && (

                      <div className="space-y-4">

                        <p className="text-xs font-black uppercase tracking-widest text-gray-400 pl-2">Espace Étudiant</p>

                        <div className="grid grid-cols-2 gap-3">

                          <MobileGridItem to="/knowledge" icon={<BookOpen size={18} />} label="Cours" color="bg-blue-50 text-blue-600" onClick={() => setMobileMenuOpen(false)} />

                          <MobileGridItem to="/cv-generator" icon={<FileText size={18} />} label="CV Pro" color="bg-purple-50 text-purple-600" onClick={() => setMobileMenuOpen(false)} />

                          <MobileGridItem to="/career" icon={<Rocket size={18} />} label="Carrières" color="bg-orange-50 text-orange-600" onClick={() => setMobileMenuOpen(false)} />

                          <MobileGridItem to="/network" icon={<Users size={18} />} label="Réseau" color="bg-green-50 text-green-600" onClick={() => setMobileMenuOpen(false)} />

                          <MobileGridItem to="/elections" icon={<Vote size={18} />} label="Votes" color="bg-gray-50 text-gray-600" onClick={() => setMobileMenuOpen(false)} />

                        </div>

                      </div>

                    )}

      

                    {/* Outils Admin */}

                    {isAdmin && (

                      <div className="mt-8 space-y-4">

                        <p className="text-xs font-black uppercase tracking-widest text-red-400 pl-2">Administration</p>

                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">

                          <div className="p-2 bg-red-500 text-white rounded-lg"><ShieldCheck size={18} /></div>

                          <span className="font-bold text-red-600 dark:text-red-400">Accéder à la console</span>

                        </Link>

                      </div>

                    )}

                  </nav>

      

                  {/* Footer Menu */}

                  <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5">

                    {user ? (

                      <div className="flex flex-col gap-4">

                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-ucak-blue/20">

                          <LayoutDashboard size={18} /> Mon Tableau de bord

                        </Link>

                        <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full py-4 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-colors">

                          Déconnexion

                        </button>

                      </div>

                    ) : (

                      <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg">

                        <User size={18} /> Se Connecter

                      </Link>

                    )}

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </>

        );

      }

      

      // Composants Mobile Helper

      const MobileLink = ({ to, icon, label, onClick }) => (

        <Link to={to} onClick={onClick} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95 group">

          <div className="text-gray-400 group-hover:text-ucak-blue transition-colors">{icon}</div>

          <span className="font-bold text-xl text-gray-800 dark:text-white group-hover:text-ucak-blue transition-colors">{label}</span>

          <ChevronDown className="-rotate-90 ml-auto text-gray-300" size={16} />

        </Link>

      );

      

      const MobileGridItem = ({ to, icon, label, color, onClick }) => (

        <Link to={to} onClick={onClick} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-ucak-blue/20 transition-all active:scale-95">

          <div className={`p-2 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>{icon}</div>

          <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">{label}</span>

        </Link>

      );

      