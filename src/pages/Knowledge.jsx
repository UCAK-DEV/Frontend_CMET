import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Play, Book, Download, ExternalLink, GraduationCap, 
  ChevronRight, ArrowLeft, Youtube, FileText, Link as LinkIcon,
  FolderOpen, Video, Zap, Code, Network, Database, Cpu, Globe, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

// --- MOCKS COMPLETS (BASÉS SUR LA MAQUETTE UCAK) ---
const DATABASE = {
  "L1": [
    {
      id: "ue3-algo-c",
      title: "Algorithmique & Langage C",
      category: "UE3-Informatique",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 14, pdf: 6 },
      description: "Bases de la programmation : variables, boucles, fonctions, pointeurs et gestion de la mémoire.",
      resources: {
        videos: [
          { id: "v1", title: "Introduction à l'Algorithmique", duration: "10:00", url: "https://www.youtube.com/embed/fPz40W9v_qg" },
          { id: "v2", title: "Les Variables et Types en C", duration: "15:30", url: "https://www.youtube.com/embed/vLq653o8QMQ" },
          { id: "v3", title: "Les Structures Conditionnelles (If/Else)", duration: "12:45", url: "https://www.youtube.com/embed/8_8g5z2z4y4" },
          { id: "v4", title: "Les Boucles (For, While, Do)", duration: "20:00", url: "https://www.youtube.com/embed/8_8g5z2z4y4" },
          { id: "v5", title: "Les Pointeurs : Concept Avancé", duration: "25:00", url: "https://www.youtube.com/embed/8_8g5z2z4y4" },
        ],
        pdfs: [
          { id: "p1", title: "Syllabus Algorithmique L1.pdf", size: "2.4 MB" },
          { id: "p2", title: "TD 1 - Variables & Conditions.pdf", size: "1.1 MB" },
          { id: "p3", title: "TP Langage C - Pointeurs.pdf", size: "3.5 MB" },
        ],
        links: [
          { title: "Documentation C (DevDocs)", url: "https://devdocs.io/c/" },
          { title: "PythonTutor (Visualiser le code C)", url: "https://pythontutor.com/c.html" }
        ]
      }
    },
    {
      id: "ue2-reseaux-base",
      title: "Architecture des Réseaux",
      category: "UE2-Télécoms",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 8, pdf: 4 },
      description: "Modèle OSI, TCP/IP, Adressage IP et fonctionnement physique des réseaux.",
      resources: {
        videos: [
          { id: "v1", title: "Introduction aux Réseaux", duration: "18:00", url: "https://www.youtube.com/embed/7_7_7_7_7_7" }, // Lien fictif
          { id: "v2", title: "Le Modèle OSI expliqué", duration: "22:00", url: "https://www.youtube.com/embed/7_7_7_7_7_7" },
          { id: "v3", title: "Adressage IPv4 et Masques", duration: "30:00", url: "https://www.youtube.com/embed/7_7_7_7_7_7" },
        ],
        pdfs: [
          { id: "p1", title: "Cours 1 - Modèle OSI.pdf", size: "5 MB" },
          { id: "p2", title: "Exercices Adressage IP.pdf", size: "1 MB" },
        ],
        links: [
          { title: "Cisco Networking Academy", url: "https://www.netacad.com/" },
          { title: "Calculatrice IP", url: "http://jodies.de/ipcalc" }
        ]
      }
    },
    {
      id: "ue1-maths",
      title: "Mathématiques Générales",
      category: "UE1-Sciences Fonda.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 10, pdf: 12 },
      description: "Analyse, Algèbre linéaire et Probabilités pour l'ingénieur.",
      resources: {
        videos: [
          { id: "v1", title: "Les Suites Numériques", duration: "45:00", url: "..." },
        ],
        pdfs: [
          { id: "p1", title: "Fascicule Math L1 - Analyse.pdf", size: "15 MB" }
        ],
        links: []
      }
    },
    {
      id: "ue3-web-base",
      title: "Techno Web (HTML/CSS)",
      category: "UE3-Informatique",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 15, pdf: 2 },
      description: "Création de pages web statiques et mise en forme responsive.",
      resources: {
        videos: [
          { id: "v1", title: "Structure HTML5", duration: "12:00", url: "..." },
          { id: "v2", title: "Flexbox & Grid CSS", duration: "20:00", url: "..." },
        ],
        pdfs: [],
        links: [
          { title: "MDN Web Docs", url: "https://developer.mozilla.org" }
        ]
      }
    }
  ],
  "L2": [
    {
      id: "ue4-sql",
      title: "Bases de Données (SQL)",
      category: "UE4-SI",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 12, pdf: 5 },
      description: "Modélisation Merise (MCD/MLD) et langage de requête SQL.",
      resources: {
        videos: [
          { id: "v1", title: "Introduction aux BDD", duration: "15:00", url: "..." },
          { id: "v2", title: "Le Modèle Entité-Association", duration: "25:00", url: "..." },
          { id: "v3", title: "Requêtes SELECT Simples", duration: "10:00", url: "..." },
        ],
        pdfs: [
          { id: "p1", title: "Cours SQL Complet.pdf", size: "8 MB" }
        ],
        links: [
          { title: "SQLZOO (Exercices)", url: "https://sqlzoo.net/" }
        ]
      }
    },
    {
      id: "ue2-linux",
      title: "Système Linux & Scripting",
      category: "UE2-Systèmes",
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 10, pdf: 3 },
      description: "Administration système, ligne de commande Bash et gestion des utilisateurs.",
      resources: {
        videos: [
          { id: "v1", title: "Installation Ubuntu Server", duration: "20:00", url: "..." },
          { id: "v2", title: "Commandes de base (ls, cd, cp)", duration: "15:00", url: "..." },
        ],
        pdfs: [
          { id: "p1", title: "Guide Commandes Linux.pdf", size: "2 MB" }
        ],
        links: []
      }
    },
    {
      id: "ue3-js-avancé",
      title: "JavaScript & DOM",
      category: "UE3-Dev",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 18, pdf: 4 },
      description: "Programmation événementielle et manipulation du DOM.",
      resources: { videos: [], pdfs: [], links: [] }
    }
  ],
  "L3": [
    {
      id: "ue-java-ee",
      title: "Java Entreprise (J2EE)",
      category: "Spécialité Dev",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 20, pdf: 8 },
      description: "Spring Boot, Hibernate, API REST et architectures microservices.",
      resources: { videos: [], pdfs: [], links: [] }
    },
    {
      id: "ue-cloud",
      title: "Cloud Computing & DevOps",
      category: "Spécialité Infra",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 15, pdf: 5 },
      description: "Docker, Kubernetes, AWS et CI/CD.",
      resources: { videos: [], pdfs: [], links: [] }
    },
    {
      id: "ue-cisco",
      title: "Réseaux Avancés (CCNA)",
      category: "Spécialité Télécom",
      image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8c?auto=format&fit=crop&w=600&q=80",
      stats: { videos: 25, pdf: 10 },
      description: "Routage dynamique (OSPF), VLANs, ACLs et NAT.",
      resources: { videos: [], pdfs: [], links: [] }
    }
  ]
};

export default function Knowledge() {
  const { user } = useUser();
  
  // États
  const [selectedLevel, setSelectedLevel] = useState('L1');
  const [activeModule, setActiveModule] = useState(null); 
  const [activeTab, setActiveTab] = useState('videos'); 
  const [searchQuery, setSearchQuery] = useState('');

  // Détection auto du niveau (avec fallback sur L1)
  useMemo(() => {
    if (user?.promo) {
      if (user.promo.includes("Licence 1")) setSelectedLevel("L1");
      else if (user.promo.includes("Licence 2")) setSelectedLevel("L2");
      else if (user.promo.includes("Licence 3")) setSelectedLevel("L3");
    }
  }, [user]);

  // Filtrage des modules
  const filteredModules = useMemo(() => {
    const modules = DATABASE[selectedLevel] || [];
    return modules.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [selectedLevel, searchQuery]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark transition-colors duration-300">
      <div className="container mx-auto px-6">

        {/* --- VUE 1 : LISTE DES MODULES (Si aucun module n'est ouvert) --- */}
        {!activeModule ? (
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-in fade-in slide-in-from-bottom-4">
              <div>
                <span className="text-ucak-gold font-bold tracking-widest text-xs uppercase mb-2 block flex items-center gap-2">
                  <GraduationCap size={16}/> Programme Officiel
                </span>
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl font-black text-ucak-blue dark:text-white">
                    Modules <span className="text-ucak-green">{selectedLevel}</span>
                  </h1>
                  
                  {/* Sélecteur de Niveau Rapide */}
                  <div className="flex bg-white dark:bg-ucak-dark-card rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                    {['L1', 'L2', 'L3'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                          selectedLevel === lvl 
                          ? 'bg-ucak-blue text-white shadow-sm' 
                          : 'text-gray-500 hover:text-ucak-blue dark:text-gray-400 dark:hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 mt-2">Sélectionnez un module pour accéder aux ressources (Vidéos, PDF, Liens).</p>
              </div>

              {/* Recherche */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Rechercher un module..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-gray-700 rounded-full text-sm outline-none focus:ring-2 focus:ring-ucak-green dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Grille des Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.length > 0 ? filteredModules.map((module) => (
                <motion.div 
                  key={module.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveModule(module)}
                  className="bg-white dark:bg-ucak-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 cursor-pointer group flex flex-col h-full"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img src={module.image} alt={module.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                       <span className="text-[10px] font-bold text-ucak-gold uppercase tracking-wider bg-black/50 px-2 py-1 rounded backdrop-blur-md">{module.category}</span>
                       <h3 className="text-xl font-bold text-white mt-1 group-hover:text-ucak-green transition-colors">{module.title}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{module.description}</p>
                     
                     <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-400">
                        <div className="flex gap-3">
                           <span className="flex items-center gap-1 hover:text-ucak-blue"><Video size={14}/> {module.stats.videos}</span>
                           <span className="flex items-center gap-1 hover:text-ucak-blue"><FileText size={14}/> {module.stats.pdf}</span>
                        </div>
                        <span className="flex items-center gap-1 text-ucak-blue dark:text-white group-hover:translate-x-1 transition-transform">Ouvrir <ChevronRight size={14}/></span>
                     </div>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-3 text-center py-20 bg-white dark:bg-ucak-dark-card rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                   <FolderOpen size={48} className="mx-auto mb-4 opacity-50 text-gray-400"/>
                   <h3 className="text-lg font-bold text-gray-500 dark:text-gray-300">Aucun module trouvé</h3>
                   <p className="text-sm text-gray-400">Essayez une autre recherche.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          
          /* --- VUE 2 : DÉTAIL DU MODULE --- */
          <div className="animate-in fade-in slide-in-from-right-8">
             
             {/* Barre de retour */}
             <button 
               onClick={() => setActiveModule(null)}
               className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-ucak-blue dark:hover:text-white mb-6 transition-colors"
             >
                <ArrowLeft size={16}/> Retour aux modules
             </button>

             {/* En-tête Module */}
             <div className="bg-white dark:bg-ucak-dark-card rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-xl mb-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                   <img src={activeModule.image} alt={activeModule.title} className="w-24 h-24 rounded-2xl object-cover shadow-lg hidden md:block" />
                   <div className="flex-grow w-full">
                      <div className="flex justify-between items-start">
                         <div>
                            <span className="text-ucak-green font-bold text-xs uppercase tracking-widest mb-1 block">{activeModule.category}</span>
                            <h1 className="text-3xl font-black text-ucak-blue dark:text-white mb-2">{activeModule.title}</h1>
                         </div>
                         <div className="hidden md:block text-right">
                            <p className="text-3xl font-black text-gray-200 dark:text-gray-700">{selectedLevel}</p>
                         </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 max-w-2xl">{activeModule.description}</p>
                      
                      {/* Onglets de Navigation */}
                      <div className="flex gap-2 mt-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                         <button 
                           onClick={() => setActiveTab('videos')}
                           className={`px-4 md:px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'videos' ? 'border-ucak-blue text-ucak-blue dark:text-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                         >
                            <Youtube size={18}/> Cours Vidéos <span className="bg-gray-100 dark:bg-white/10 px-2 rounded-full text-xs ml-1">{activeModule.resources.videos.length}</span>
                         </button>
                         <button 
                           onClick={() => setActiveTab('pdfs')}
                           className={`px-4 md:px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'pdfs' ? 'border-ucak-blue text-ucak-blue dark:text-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                         >
                            <FileText size={18}/> Supports PDF <span className="bg-gray-100 dark:bg-white/10 px-2 rounded-full text-xs ml-1">{activeModule.resources.pdfs.length}</span>
                         </button>
                         <button 
                           onClick={() => setActiveTab('links')}
                           className={`px-4 md:px-6 py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'links' ? 'border-ucak-blue text-ucak-blue dark:text-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                         >
                            <LinkIcon size={18}/> Liens Utiles <span className="bg-gray-100 dark:bg-white/10 px-2 rounded-full text-xs ml-1">{activeModule.resources.links.length}</span>
                         </button>
                      </div>
                   </div>
                </div>
             </div>

             {/* Contenu des Onglets */}
             <div className="min-h-[400px]">
                
                {/* 1. LISTE DES VIDÉOS */}
                {activeTab === 'videos' && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeModule.resources.videos.length > 0 ? activeModule.resources.videos.map((video) => (
                         <Link 
                           key={video.id}
                           to={`/course/${activeModule.id}`} // En production, passer l'ID vidéo
                           className="flex gap-4 p-4 bg-white dark:bg-ucak-dark-card rounded-xl border border-gray-100 dark:border-gray-800 hover:border-ucak-blue transition-all group hover:shadow-md"
                         >
                            <div className="w-16 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                               <Play fill="currentColor" size={20}/>
                            </div>
                            <div>
                               <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-ucak-blue transition-colors text-sm line-clamp-1">{video.title}</h3>
                               <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Video size={12}/> {video.duration} • Dr. Diop</p>
                            </div>
                         </Link>
                      )) : <EmptyState text="Aucune vidéo disponible pour ce module." />}
                   </div>
                )}

                {/* 2. LISTE DES PDF */}
                {activeTab === 'pdfs' && (
                   <div className="space-y-3">
                      {activeModule.resources.pdfs.length > 0 ? activeModule.resources.pdfs.map((pdf) => (
                         <div key={pdf.id} className="flex items-center justify-between p-4 bg-white dark:bg-ucak-dark-card rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow group">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0">PDF</div>
                               <div>
                                  <h3 className="font-bold text-gray-800 dark:text-white text-sm group-hover:text-ucak-blue transition-colors">{pdf.title}</h3>
                                  <p className="text-xs text-gray-500">{pdf.size} • Mis à jour hier</p>
                               </div>
                            </div>
                            <button className="text-gray-400 hover:text-ucak-green transition-colors p-2 hover:bg-ucak-green/10 rounded-full"><Download size={20}/></button>
                         </div>
                      )) : <EmptyState text="Aucun document PDF disponible." />}
                   </div>
                )}

                {/* 3. LIENS UTILES */}
                {activeTab === 'links' && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeModule.resources.links.length > 0 ? activeModule.resources.links.map((link, idx) => (
                         <a 
                           key={idx}
                           href={link.url}
                           target="_blank"
                           rel="noreferrer"
                           className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-ucak-dark-card border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 group"
                         >
                            <div className="w-10 h-10 bg-white dark:bg-black rounded-lg flex items-center justify-center shadow-sm">
                               <ExternalLink size={20} className="text-ucak-gold"/>
                            </div>
                            <div>
                               <h3 className="font-bold text-sm text-gray-800 dark:text-white group-hover:text-ucak-blue transition-colors">{link.title}</h3>
                               <p className="text-xs text-gray-500 truncate max-w-[200px]">{link.url}</p>
                            </div>
                         </a>
                      )) : <EmptyState text="Aucun lien référencé." />}
                   </div>
                )}

             </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Composant État Vide
const EmptyState = ({ text }) => (
  <div className="w-full py-12 text-center bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
     <Lock size={32} className="mx-auto mb-3 text-gray-300"/>
     <p className="text-gray-400 font-medium text-sm">{text}</p>
  </div>
);