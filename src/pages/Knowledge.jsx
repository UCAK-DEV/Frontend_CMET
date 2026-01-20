import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Search, BookOpen, GraduationCap, 
  ChevronRight, PlayCircle, Clock, Layout
} from 'lucide-react';

export default function Knowledge() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = ['Tous', 'Informatique', 'Management', 'Réseaux', 'Mathématiques'];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/api/v1/courses');
        setCourses(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des cours:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'Tous' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête avec Recherche */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <Layout className="text-ucak-blue" size={32} /> Académie <span className="text-ucak-blue">MET</span>
            </h1>
            <p className="text-gray-500 text-sm">Accédez aux ressources pédagogiques partagées par la communauté.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              placeholder="Rechercher un module..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-ucak-dark-card border border-gray-100 dark:border-white/5 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/30 dark:text-white shadow-sm"
            />
          </div>
        </div>

        {/* Filtres par catégories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                ${activeCategory === cat 
                  ? 'bg-ucak-blue text-white shadow-lg' 
                  : 'bg-white dark:bg-white/5 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille des modules */}
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-ucak-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-bold animate-pulse">Chargement des modules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="bg-white dark:bg-ucak-dark-card rounded-[2.5rem] p-6 border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-ucak-blue/10 text-ucak-blue rounded-2xl group-hover:bg-ucak-blue group-hover:text-white transition-colors">
                      <BookOpen size={24} />
                    </div>
                    <span className="text-[10px] font-black bg-gray-100 dark:bg-white/10 text-gray-400 px-3 py-1 rounded-full uppercase">
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-8 line-clamp-2">{course.description}</p>

                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-ucak-blue" />
                      <span className="text-xs font-bold text-gray-400">{course.category}</span>
                    </div>
                    <div className="text-ucak-blue flex items-center gap-1 text-sm font-black group-hover:translate-x-1 transition-transform">
                      Étudier <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}