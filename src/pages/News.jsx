import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, Calendar, Tag, ArrowRight, 
  Search, Filter, Sparkles, Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tous');

  // --- DONNÉES MOCKÉES (S'afficheront si le backend est vide) ---
  const mockNews = [
    {
      id: 'mock-1',
      title: "Lancement du Hub Métiers & Tech : Une nouvelle ère pour l'UFR",
      content: "Le Club MET lance officiellement sa plateforme numérique pour centraliser les ressources pédagogiques et les opportunités de carrière...",
      type: "Événement",
      createdAt: new Date().toISOString(),
      image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 'mock-2',
      title: "Hackathon DAR 2026 : Inscrivez votre équipe !",
      content: "Étudiants en L3 DAR, préparez-vous pour 48h d'innovation intensive sur le thème de la Smart City à Touba...",
      type: "Hackathon",
      createdAt: new Date().toISOString(),
      image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 'mock-3',
      title: "Séminaire : L'Intelligence Artificielle au Sénégal",
      content: "Une conférence exclusive avec des experts du secteur pour discuter de l'impact de l'IA dans le développement local.",
      type: "Conférence",
      createdAt: new Date().toISOString(),
      image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/news');
        // Si le tableau est vide, on garde un état vide pour déclencher le mock
        setNewsList(res.data.length > 0 ? res.data : []);
      } catch (err) {
        console.error("Backend inaccessible, passage en mode démo.");
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Logique : Si newsList est vide, on utilise mockNews
  const displayData = newsList.length > 0 ? newsList : mockNews;
  const categories = ['Tous', 'Événement', 'Hackathon', 'Conférence', 'Pédagogie'];
  
  const filteredData = filter === 'Tous' 
    ? displayData 
    : displayData.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#05070a] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-ucak-blue mb-4"
          >
            <div className="h-[2px] w-12 bg-ucak-blue"></div>
            <span className="text-xs font-black uppercase tracking-[0.4em]">Le Journal du Hub</span>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h1 className="text-5xl md:text-7xl font-black dark:text-white tracking-tighter">
              Actualités <span className="text-ucak-blue">MET.</span>
            </h1>
            
            {/* Filtres Pro */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                    ${filter === cat 
                      ? 'bg-ucak-blue text-white shadow-lg shadow-ucak-blue/20' 
                      : 'bg-white dark:bg-white/5 text-gray-400 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* --- NEWS GRID --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="h-[450px] bg-gray-200 dark:bg-white/5 rounded-[3rem] animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredData.map((news, index) => (
                <motion.article
                  key={news.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white dark:bg-white/2 rounded-[3rem] border border-gray-100 dark:border-white/5 overflow-hidden hover:border-ucak-blue/30 transition-all duration-500 shadow-xl shadow-gray-200/50 dark:shadow-none"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={news.image_url} 
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-ucak-blue">
                        {news.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10">
                    <div className="flex items-center gap-4 text-gray-400 mb-6">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <Calendar size={14} /> {new Date(news.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold">
                        <Clock size={14} /> 5 min read
                      </div>
                    </div>

                    <h2 className="text-2xl font-black dark:text-white mb-4 leading-tight group-hover:text-ucak-blue transition-colors">
                      {news.title}
                    </h2>
                    
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                      {news.content}
                    </p>

                    <Link 
                      to={`/news/${news.id}`}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-ucak-blue group-hover:gap-4 transition-all"
                    >
                      Lire la suite <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* --- INFO BOX POUR L'ADMIN --- */}
        {!loading && newsList.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mt-20 p-8 rounded-[2rem] bg-ucak-blue/5 border border-dashed border-ucak-blue/30 text-center"
          >
            <Sparkles className="mx-auto text-ucak-blue mb-4" />
            <p className="text-sm font-bold text-ucak-blue uppercase tracking-widest">
              Mode Démo Activé
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Ces informations sont fictives. Connectez-vous en tant qu'admin pour publier vos premières actualités.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}