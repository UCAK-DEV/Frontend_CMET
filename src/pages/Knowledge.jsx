import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, PlayCircle, Clock, Star, Search, Filter, 
  Download, FileText, Video, Lock, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- DONNÉES DE DÉMONSTRATION (MOCKS) ---
const MOCK_COURSES = [
  { 
    id: 'react-mastery', 
    title: "Maîtriser React.js & Tailwind", 
    instructor: "Pr. Moussa Sene", 
    duration: "12h 30m", 
    rating: 4.9, 
    category: "Informatique", 
    level: "Intermédiaire",
    imageColor: "bg-blue-600"
  },
  { 
    id: 'finance-islamique', 
    title: "Introduction à la Finance Islamique", 
    instructor: "Dr. Aminata Diop", 
    duration: "8h 15m", 
    rating: 4.8, 
    category: "HEC", 
    level: "Débutant",
    imageColor: "bg-ucak-gold"
  },
  { 
    id: 'cyber-sec', 
    title: "Sécurité des Réseaux & Pentesting", 
    instructor: "Ing. Cheikh Fall", 
    duration: "15h 00m", 
    rating: 4.7, 
    category: "Informatique", 
    level: "Avancé",
    imageColor: "bg-red-600"
  },
  { 
    id: 'gestion-projet', 
    title: "Gestion de Projet Agile & Scrum", 
    instructor: "Mme. Fatou Ndiaye", 
    duration: "6h 45m", 
    rating: 4.6, 
    category: "HEC", 
    level: "Intermédiaire",
    imageColor: "bg-purple-600"
  },
  { 
    id: 'iot-arduino', 
    title: "IoT : Arduino & Capteurs", 
    instructor: "Dr. Oumar Diallo", 
    duration: "10h 20m", 
    rating: 4.9, 
    category: "Génie Élec.", 
    level: "Débutant",
    imageColor: "bg-ucak-green"
  }
];

const MOCK_DOCUMENTS = [
  { id: 1, title: "Guide de l'Étudiant 2026", type: "PDF", size: "2.4 MB" },
  { id: 2, title: "Calendrier Universitaire", type: "PDF", size: "1.1 MB" },
  { id: 3, title: "Règlement Intérieur UFR", type: "DOCX", size: "800 KB" },
];

export default function Knowledge() {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'documents'
  const [filter, setFilter] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage des cours
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesCategory = filter === 'Tous' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-24 bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* EN-TÊTE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mb-4 tracking-tight">
              Bibliothèque du <span className="text-ucak-gold">Savoir</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
              Accédez aux ressources pédagogiques exclusives, cours vidéos et documents officiels de l'UFR MET.
            </p>
          </div>
          
          {/* Barre de Recherche */}
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher un cours..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-12 pr-4 py-4 bg-white dark:bg-ucak-dark-card rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm focus:ring-2 focus:ring-ucak-blue outline-none transition-all"
            />
          </div>
        </div>

        {/* ONGLETS NAVIGATION */}
        <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800 mb-10">
          <button 
            onClick={() => setActiveTab('courses')}
            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'courses' ? 'text-ucak-blue dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Cours Vidéos
            {activeTab === 'courses' && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 w-full h-1 bg-ucak-blue dark:bg-ucak-gold rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'documents' ? 'text-ucak-blue dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Documents & PDF
            {activeTab === 'documents' && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 w-full h-1 bg-ucak-blue dark:bg-ucak-gold rounded-t-full" />}
          </button>
        </div>

        {/* CONTENU : COURS */}
        {activeTab === 'courses' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Filtres Catégories */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {['Tous', 'Informatique', 'HEC', 'Génie Élec.'].map(cat => (
                <button 
                  key={cat} onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    filter === cat 
                    ? 'bg-ucak-blue text-white shadow-lg shadow-ucak-blue/20' 
                    : 'bg-white dark:bg-ucak-dark-card text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grille des Cours */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <motion.div 
                  layout
                  key={course.id} 
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-ucak-dark-card rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group"
                >
                  {/* Miniature Cours */}
                  <div className={`h-48 ${course.imageColor} relative flex items-center justify-center overflow-hidden`}>
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                     <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                     <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider border border-white/10">
                        {course.level}
                     </span>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-ucak-blue dark:text-ucak-gold bg-ucak-blue/5 dark:bg-ucak-gold/10 px-3 py-1 rounded-lg uppercase tracking-wide">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" /> {course.rating}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2 leading-tight group-hover:text-ucak-blue transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-6 font-medium">Par {course.instructor}</p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                       <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                          <Clock size={16} /> {course.duration}
                       </div>
                       <Link to={`/course/${course.id}`}>
                         <button className="flex items-center gap-2 text-xs font-black uppercase text-ucak-blue dark:text-white hover:underline">
                            Commencer <ChevronRight size={14} />
                         </button>
                       </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p>Aucun cours trouvé pour cette recherche.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* CONTENU : DOCUMENTS */}
        {activeTab === 'documents' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {MOCK_DOCUMENTS.map((doc) => (
              <div key={doc.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-between hover:border-ucak-green/50 transition-colors group">
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-ucak-green group-hover:bg-ucak-green/10 transition-colors">
                      <FileText size={28} />
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-800 dark:text-white mb-1">{doc.title}</h4>
                      <p className="text-xs text-gray-400 font-medium">{doc.type} • {doc.size}</p>
                   </div>
                </div>
                <button className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:bg-ucak-green hover:text-white transition-all">
                   <Download size={20} />
                </button>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
}