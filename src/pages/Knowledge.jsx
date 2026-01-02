import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Book, Download, Filter, Clock, Star, Zap, GraduationCap, Code, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Knowledge() {
  const [viewMode, setViewMode] = useState('courses'); // 'courses' | 'documents'
  const [activeFiliere, setActiveFiliere] = useState('Tout');
  const [activeLevel, setActiveLevel] = useState('Tout');
  const [searchQuery, setSearchQuery] = useState('');

  // --- DONNÉES OPTIMISÉES ---
  const courses = [
    { 
      id: 1, 
      title: "Algorithmique Avancée", 
      instructor: "Dr. Diop", 
      duration: "6h 45m", 
      level: "L1", 
      filiere: "Informatique", 
      rating: 4.8,
      progress: 35,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=600&q=80",
      tags: ["Python", "Logique"]
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
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
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
    { id: 101, title: "Support Cours : Python", type: "PDF", size: "4 MB", filiere: "Informatique", level: "L1" },
    { id: 102, title: "Plan Comptable SYSCOHADA", type: "PDF", size: "12 MB", filiere: "HEC", level: "Tout" },
    { id: 103, title: "Guide du Pèlerin Numérique", type: "EPUB", size: "2 MB", filiere: "Informatique", level: "Tout" },
  ];

  // --- FILTRAGE RAPIDE (MEMOIZED) ---
  const filteredContent = useMemo(() => {
    const data = viewMode === 'courses' ? courses : documents;
    return data.filter(item => {
      const matchFiliere = activeFiliere === 'Tout' || item.filiere === activeFiliere;
      const matchLevel = activeLevel === 'Tout' || item.level === activeLevel || item.level === 'Tout';
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFiliere && matchLevel && matchSearch;
    });
  }, [viewMode, activeFiliere, activeLevel, searchQuery]);

  // Options de filtres
  const filieres = [
    { name: "Tout", icon: Zap },
    { name: "Informatique", icon: Code },
    { name: "HEC", icon: Briefcase }
  ];
  
  const levels = ["Tout", "L1", "L2", "L3", "Master 1", "Master 2"];

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER GAMIFIÉ --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-ucak-gold font-bold tracking-widest text-xs uppercase mb-2 block flex items-center gap-2">
              <GraduationCap size={16}/> Académie Numérique
            </span>
            <h1 className="text-4xl font-black text-ucak-blue dark:text-white">
              Explorez, Apprenez, <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green to-ucak-gold">Brillez.</span>
            </h1>
            <p className="text-gray-500 mt-2">Accédez aux meilleures ressources pédagogiques de l'UFR MET.</p>
          </div>
          
          {/* Barre de Recherche Flottante */}
          <div className="relative group w-full md:w-96">
            <div className="absolute inset-0 bg-ucak-green/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-gray-700 rounded-full flex items-center px-4 py-3 shadow-sm">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Que voulez-vous apprendre ?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full dark:text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* --- ZONE DE CONTRÔLE (FILTRES & MODES) --- */}
        <div className="sticky top-20 z-30 bg-gray-50/95 dark:bg-ucak-dark/95 backdrop-blur-md py-4 mb-8 -mx-6 px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* 1. Switcher Mode (Vidéo vs Doc) */}
            <div className="bg-white dark:bg-ucak-dark-card p-1 rounded-xl border border-gray-200 dark:border-gray-700 flex shadow-sm">
              <button 
                onClick={() => setViewMode('courses')}
                className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                  viewMode === 'courses' ? 'bg-ucak-blue text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <Play size={16} /> Cours
              </button>
              <button 
                onClick={() => setViewMode('documents')}
                className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                  viewMode === 'documents' ? 'bg-ucak-blue text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <Book size={16} /> Docs
              </button>
            </div>

            {/* 2. Filtres Intelligents (Filière & Niveau) */}
            <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              
              {/* Filtre Filière (Pillules colorées) */}
              <div className="flex gap-2">
                {filieres.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setActiveFiliere(f.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                      activeFiliere === f.name 
                        ? 'bg-ucak-green text-white border-ucak-green' 
                        : 'bg-white dark:bg-ucak-dark-card text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-ucak-green'
                    }`}
                  >
                    <f.icon size={14} /> {f.name}
                  </button>
                ))}
              </div>

              <div className="w-px h-8 bg-gray-300 dark:bg-gray-700 mx-2 hidden md:block"></div>

              {/* Filtre Niveau (Texte simple) */}
              <div className="flex gap-2">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevel(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeLevel === lvl 
                        ? 'text-ucak-blue dark:text-ucak-gold bg-ucak-blue/10 dark:bg-ucak-gold/10 ring-1 ring-ucak-blue/20 dark:ring-ucak-gold/20' 
                        : 'text-gray-500 hover:text-ucak-blue dark:hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* --- CONTENU (GRILLE ANIMÉE) --- */}
        <AnimatePresence mode="wait">
          
          {/* VUE COURS (NETFLIX STYLE) */}
          {viewMode === 'courses' && (
            <motion.div 
              key="courses"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredContent.map((course) => (
                <Link to={`/course/${course.id}`} key={course.id} className="group">
                  <div className="bg-white dark:bg-ucak-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-100 dark:border-gray-800 h-full flex flex-col">
                    
                    {/* Image avec Overlay "Play" */}
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                          <Play fill="white" className="text-white ml-1" size={20} />
                        </div>
                      </div>
                      
                      {/* Badges sur l'image */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10">
                          {course.level}
                        </span>
                        {course.filiere === 'Informatique' && <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">DEV</span>}
                      </div>
                    </div>

                    {/* Infos du Cours */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-ucak-blue dark:group-hover:text-ucak-gold transition-colors">
                          {course.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="font-medium text-ucak-green">{course.instructor}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={10}/> {course.duration}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Barre de Progression Ludique */}
                      <div className="mt-auto">
                        <div className="flex justify-between text-[10px] font-bold mb-1">
                          <span className={course.progress > 0 ? "text-ucak-blue dark:text-ucak-gold" : "text-gray-400"}>
                            {course.progress > 0 ? `${course.progress}% Complété` : "Non commencé"}
                          </span>
                          <span className="flex items-center gap-1 text-yellow-500"><Star size={10} fill="currentColor"/> {course.rating}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${course.progress}%` }} 
                            className="h-full bg-gradient-to-r from-ucak-green to-ucak-blue"
                          ></motion.div>
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </motion.div>
          )}

          {/* VUE DOCUMENTS (LISTE ÉPURÉE) */}
          {viewMode === 'documents' && (
            <motion.div 
              key="docs"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredContent.map((doc) => (
                <div key={doc.id} className="bg-white dark:bg-ucak-dark-card p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:border-ucak-gold transition-colors group">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                    doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {doc.type}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-ucak-blue dark:group-hover:text-ucak-gold transition-colors">{doc.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {doc.filiere} • {doc.level} • {doc.size}
                    </p>
                  </div>
                  <button className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-ucak-green group-hover:text-white transition-all">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>

        {/* EMPTY STATE */}
        {filteredContent.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Filter size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-500">Aucun résultat trouvé</h3>
            <p className="text-sm text-gray-400">Essayez de modifier vos filtres.</p>
          </div>
        )}

      </div>
    </div>
  );
}