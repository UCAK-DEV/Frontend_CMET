import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, GraduationCap, Newspaper, LayoutDashboard, 
  BookOpen, Briefcase, FileText, Trophy, 
  Menu, X, ChevronDown, User, LogOut, Construction, Rocket
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import logoUcak from '../assets/logo-ucak.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Fermer le menu au changement de page
  useEffect(() => { 
    setIsMobileMenuOpen(false); 
    setActiveDropdown(null); 
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- CONFIGURATION DES MENUS ---

  // 1. MENU VISITEUR (Visible par TOUS)
  const visitorLinks = [
    { name: 'Accueil', path: '/', icon: Home },
    { 
      name: 'Formations', 
      type: 'dropdown', 
      id: 'formations',
      icon: GraduationCap,
      items: [
        { title: 'Informatique', path: '/formation/informatique', icon: GraduationCap },
        { title: 'HEC', path: '/formation/hec', icon: Briefcase }
      ]
    },
    { name: 'Actualités', path: '/news', icon: Newspaper },
    { name: 'Showroom', path: '/showroom', icon: Construction },
  ];

  // 2. MENU ÉTUDIANT (S'ajoute au menu visiteur)
  const studentLinks = [
    { name: 'Espace Étudiant', path: '/dashboard', icon: LayoutDashboard, style: 'btn-primary' },
    { name: 'Cours', path: '/knowledge', icon: BookOpen },
    { 
      name: 'Carrières', 
      type: 'dropdown', 
      id: 'carrieres',
      icon: Rocket,
      items: [
        { title: 'Générateur CV', path: '/cv-builder', icon: FileText },
        { title: 'Offres de Stage', path: '/career', icon: Briefcase },
        { title: 'Quizz & Défis', path: '/quizz', icon: Trophy }
      ]
    }
  ];

  // Fusion des menus si connecté
  const navLinks = user ? [...visitorLinks, ...studentLinks] : visitorLinks;

  return (
    <>
      {/* --- BARRE DE NAVIGATION DESKTOP --- */}
      <nav className="hidden lg:flex fixed top-0 w-full z-50 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 h-20 items-center justify-between px-8 transition-all">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logoUcak} alt="Logo" className="w-8 h-8" />
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-ucak-blue dark:text-white tracking-tight">CLUB MET</span>
            <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">UFR MET</span>
          </div>
        </Link>

        {/* LIENS */}
        <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-white/5 p-1.5 rounded-full border border-gray-200/50 dark:border-white/5">
          {navLinks.map((link, idx) => {
            
            // Gestion Dropdown
            if (link.type === 'dropdown') {
              return (
                <div key={idx} className="relative" onMouseEnter={() => setActiveDropdown(link.id)} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all ${activeDropdown === link.id ? 'bg-white dark:bg-white/10 text-ucak-blue dark:text-white shadow-sm' : 'text-gray-500 hover:text-ucak-blue dark:text-gray-400 dark:hover:text-white'}`}>
                    <link.icon size={16} /> {link.name} <ChevronDown size={12} className={`transition-transform ${activeDropdown === link.id ? 'rotate-180' : ''}`}/>
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === link.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden p-2 z-50"
                      >
                        {link.items.map((subItem, subIdx) => (
                          <Link key={subIdx} to={subItem.path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="p-2 bg-ucak-blue/10 rounded-lg text-ucak-blue group-hover:bg-ucak-blue group-hover:text-white transition-colors">
                              <subItem.icon size={16} />
                            </div>
                            <span className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase">{subItem.title}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // Lien Simple
            return (
              <Link 
                key={idx} 
                to={link.path} 
                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all 
                  ${link.style === 'btn-primary' 
                    ? 'bg-ucak-blue text-white shadow-md hover:bg-ucak-green hover:shadow-lg scale-105 mx-2' 
                    : location.pathname === link.path 
                      ? 'bg-white dark:bg-white/10 text-ucak-blue dark:text-white shadow-sm' 
                      : 'text-gray-500 hover:text-ucak-blue dark:text-gray-400 dark:hover:text-white'
                  }`}
              >
                <link.icon size={16} /> {link.name}
              </Link>
            );
          })}
        </div>

        {/* PROFIL / CONNEXION */}
        <div>
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10">
              <div className="text-right hidden xl:block">
                <p className="text-xs font-black text-gray-900 dark:text-white">{user.full_name}</p>
              </div>
              <button onClick={handleLogout} className="p-2.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors" title="Déconnexion">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-6 py-3 bg-ucak-blue text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-ucak-green transition-all shadow-lg">
              <User size={16} /> Connexion
            </Link>
          )}
        </div>
      </nav>

      {/* --- MENU MOBILE --- */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoUcak} alt="Logo" className="w-8 h-8" />
          <span className="font-black text-ucak-blue dark:text-white">CLUB MET</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600 dark:text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* OVERLAY MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 z-[60] bg-white dark:bg-[#0b0f19] flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5">
              <span className="text-lg font-black text-ucak-blue dark:text-white">MENU</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full"><X size={24} /></button>
            </div>
            
            <div className="flex-1 p-6 space-y-6">
              {navLinks.map((link, idx) => {
                if (link.type === 'dropdown') {
                  return (
                    <div key={idx} className="space-y-3 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><link.icon size={14}/> {link.name}</p>
                      <div className="grid gap-2 pl-4 border-l-2 border-gray-200 dark:border-white/10">
                        {link.items.map((subItem, subIdx) => (
                          <Link key={subIdx} to={subItem.path} className="block text-sm font-bold text-gray-700 dark:text-gray-300 py-1">
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link key={idx} to={link.path} className={`flex items-center gap-4 text-lg font-bold p-2 ${link.style === 'btn-primary' ? 'text-ucak-blue' : 'text-gray-800 dark:text-white'}`}>
                    <link.icon size={20} /> {link.name}
                  </Link>
                );
              })}

              <div className="h-px bg-gray-100 dark:bg-white/5 my-6"></div>

              {user ? (
                <button onClick={handleLogout} className="w-full py-4 bg-red-50 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2">
                  <LogOut size={20} /> Se déconnecter
                </button>
              ) : (
                <Link to="/login" className="w-full py-4 bg-ucak-blue text-white rounded-xl font-bold flex items-center justify-center gap-2">
                  <User size={20} /> Se connecter
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}