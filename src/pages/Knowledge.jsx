import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Book, Download, Clock, Star, Zap, GraduationCap, Code, Briefcase, ExternalLink, Link as LinkIcon, FileText, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // <--- IMPORT DU CONTEXTE

export default function Knowledge() {
  const { user } = useUser(); // Récupérer l'utilisateur connecté
  const [viewMode, setViewMode] = useState('courses');
  const [activeFiliere, setActiveFiliere] = useState('Tout');
  const [activeLevel, setActiveLevel] = useState('Tout'); // Par défaut 'Tout', mais changera si connecté
  const [searchQuery, setSearchQuery] = useState('');

  // --- FILTRAGE AUTOMATIQUE A LA CONNEXION ---
  useEffect(() => {
    if (user && user.promo) {
      // Mapping intelligent : "Licence 3" -> "L3"
      if (user.promo.includes("Licence 1")) setActiveLevel("L1");
      else if (user.promo.includes("Licence 2")) setActiveLevel("L2");
      else if (user.promo.includes("Licence 3")) setActiveLevel("L3");
      else if (user.promo.includes("Master 1")) setActiveLevel("Master 1");
      else if (user.promo.includes("Master 2")) setActiveLevel("Master 2");
      // Sinon on laisse 'Tout' ou le niveau brut
    }
  }, [user]);

  // --- DONNÉES (Vidéos YouTube intégrées) ---
  const courses = [
    { 
      id: 1, 
      title: "Algorithmique & Python", 
      instructor: "Dr. Diop", 
      duration: "6h 45m", 
      level: "L1", 
      filiere: "Informatique", 
      rating: 4.8,
      progress: 35,
      // Miniature YouTube
      image: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
      tags: ["Logique", "Base"]
    },
    { 
      id: 2, 
      title: "Comptabilité Générale", 
      instructor: "Mme. Fall", 
      duration: "8h 30m", 
      level: "L2", 
      filiere: "HEC", 
      rating: 4.5,
      progress: 0,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      tags: ["Finance", "Gestion"]
    },
    { 
      id: 3, 
      title: "React.js & Modern UI", 
      instructor: "Club Tech", 
      duration: "12h 15m", 
      level: "L3", 
      filiere: "Informatique", 
      rating: 5.0,
      progress: 10,
      image: "https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg",
      tags: ["Frontend", "Web"]
    },
    { 
      id: 4, 
      title: "Marketing Digital & SEO", 
      instructor: "M. Ndiaye", 
      duration: "5h 20m", 
      level: "Master 1", 
      filiere: "HEC", 
      rating: 4.7,
      progress: 80,
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
      tags: ["Business", "Vente"]
    }
  ];

  const documents = [
    { id: 101, title: "Support Cours : Python", type: "PDF", size: "4 MB", filiere: "Informatique", level: "L1", module: "Algorithmique" },
    { id: 102, title: "Plan Comptable SYSCOHADA", type: "PDF", size: "12 MB", filiere: "HEC", level: "L2", module: "Comptabilité" },
    { id: 103, title: "Architecture des Ordinateurs", type: "PDF", size: "8 MB", filiere: "Informatique", level: "L1", module: "Hardware" },
  ];

  const usefulLinks = [
    { title: "Documentation React", url: "https://react.dev", category: "Dev" },
    { title: "MDN Web Docs", url: "https://developer.mozilla.org", category: "Dev" },
    { title: "Bibliothèque Khadim Rassoul", url: "#", category: "Spiritualité" },
  ];

  const filteredContent = useMemo(() => {
    const data = viewMode === 'courses' ? courses : documents;
    return data.filter(item => {
      const matchFiliere = activeFiliere === 'Tout' || item.filiere === activeFiliere;
      const matchLevel = activeLevel === 'Tout' || item.level === activeLevel;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFiliere && matchLevel && matchSearch;
    });
  }, [viewMode, activeFiliere, activeLevel, searchQuery]);

  const filieres = [
    { name: "Tout", icon: Zap },
    { name: "Informatique", icon: Code },
    { name: "HEC", icon: Briefcase }
  ];
  
  const levels = ["Tout", "L1", "L2", "L3", "Master 1", "Master 2"];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-ucak-gold font-bold tracking-widest text-xs uppercase mb-2 block flex items-center gap-2">
              <GraduationCap size={16}/> Académie Numérique
            </span>
            <h1 className="text-4xl font-black text-ucak-blue dark:text-white">
              Espace <span className="text-ucak-green">Savoir</span>
            </h1>
            <p className="text-gray-500 mt-2">
              {user ? `Bienvenue dans votre espace pédagogique, ${user.name.split(' ')[0]}.` : "Connectez-vous pour voir vos cours."}
            </p>
          </div>
          
          <div className="relative group w-full md:w-96">
            <div className="relative bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-gray-700 rounded-full flex items-center px-4 py-3 shadow-sm">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Rechercher un cours..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full dark:text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* GAUCHE : CONTENU */}
          <div className="lg:w-3/4">
            
            {/* BARRE D'OUTILS */}
            <div className="sticky top-20 z-30 bg-gray-50/95 dark:bg-ucak-dark/95 backdrop-blur-md py-4 mb-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="bg-white dark:bg-ucak-dark-card p-1 rounded-xl border border-gray-200 dark:border-gray-700 flex shadow-sm">
                  <button onClick={() => setViewMode('courses')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'courses' ? 'bg-ucak-blue text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                    <Play size={16} /> Vidéos
                  </button>
                  <button onClick={() => setViewMode('documents')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'documents' ? 'bg-ucak-blue text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                    <Book size={16} /> PDFs
                  </button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                  {filieres.map((f) => (
                    <button key={f.name} onClick={() => setActiveFiliere(f.name)} className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold border transition-all whitespace-nowrap ${activeFiliere === f.name ? 'bg-ucak-green text-white border-ucak-green' : 'bg-white dark:bg-ucak-dark-card text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-ucak-green'}`}>
                      <f.icon size={14} /> {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* MESSAGE SI FILTRE ACTIF */}
            {activeLevel !== 'Tout' && (
              <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                 <Filter size={16} />
                 <span>Filtre appliqué : <strong>Niveau {activeLevel}</strong></span>
                 <button onClick={() => setActiveLevel('Tout')} className="underline ml-2 hover:text-blue-900">Voir tout</button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {viewMode === 'courses' && (
                <motion.div 
                  key="courses"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredContent.length > 0 ? filteredContent.map((course) => (
                    <Link to={`/course/${course.id}`} key={course.id} className="group">
                      <div className="bg-white dark:bg-ucak-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-gray-800 h-full flex flex-col">
                        <div className="relative h-44 overflow-hidden bg-black">
                          <img 
                            src={course.image} 
                            alt={course.title} 
                            loading="lazy" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                              <Play fill="white" className="text-white ml-1" size={20} />
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 flex gap-1">
                            <span className="bg-ucak-blue text-white text-[10px] font-bold px-2 py-1 rounded-md">{course.level}</span>
                          </div>
                        </div>

                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-ucak-blue dark:group-hover:text-ucak-gold transition-colors mb-2">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                            <span className="font-medium text-ucak-green">{course.instructor}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={10}/> {course.duration}</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-auto">
                             <div className="h-full bg-ucak-green" style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )) : (
                    <div className="col-span-2 text-center py-10 text-gray-500">Aucun cours trouvé pour ce niveau.</div>
                  )}
                </motion.div>
              )}

              {/* SECTION PDF PAR MODULE */}
              {viewMode === 'documents' && (
                <motion.div 
                  key="docs"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {filteredContent.map((doc) => (
                    <div key={doc.id} className="bg-white dark:bg-ucak-dark-card p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:border-ucak-gold transition-colors group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gray-100 dark:bg-gray-800 text-[10px] px-2 py-1 rounded-bl-lg text-gray-500 font-bold">
                         {doc.module}
                      </div>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        {doc.type}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-ucak-blue dark:group-hover:text-ucak-gold transition-colors">{doc.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{doc.filiere} • {doc.level} • {doc.size}</p>
                      </div>
                      <button className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-ucak-green group-hover:text-white transition-all"><Download size={18} /></button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DROITE : WIDGETS */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-white dark:bg-ucak-dark-card p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
               <h3 className="font-bold text-ucak-blue dark:text-white mb-3 text-sm flex items-center gap-2"><Filter size={16}/> Changer Niveau</h3>
               <div className="flex flex-wrap gap-2">
                {levels.map((lvl) => (
                  <button key={lvl} onClick={() => setActiveLevel(lvl)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeLevel === lvl ? 'text-ucak-blue dark:text-ucak-gold bg-ucak-blue/10 dark:bg-ucak-gold/10 ring-1 ring-ucak-blue/20 dark:ring-ucak-gold/20' : 'text-gray-500 bg-gray-50 dark:bg-white/5 hover:bg-gray-100'}`}>
                    {lvl}
                  </button>
                ))}
               </div>
            </div>

            <div className="bg-gradient-to-b from-ucak-blue to-ucak-dark text-white p-5 rounded-2xl shadow-lg">
               <h3 className="font-bold mb-4 text-sm flex items-center gap-2 border-b border-white/20 pb-2">
                  <LinkIcon size={16} className="text-ucak-gold"/> Liens Utiles
               </h3>
               <div className="space-y-3">
                  {usefulLinks.map((link, idx) => (
                     <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="flex items-start justify-between group hover:bg-white/10 p-2 rounded-lg transition-colors">
                        <div>
                           <p className="font-bold text-xs text-white group-hover:text-ucak-gold">{link.title}</p>
                           <p className="text-[10px] text-gray-400">{link.category}</p>
                        </div>
                        <ExternalLink size={12} className="text-gray-500 group-hover:text-white mt-1"/>
                     </a>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}