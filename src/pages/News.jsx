import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Newspaper, Info } from 'lucide-react';
import { api } from '../context/UserContext';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/api/v1/news');
        // On trie : Les plus récents en premier
        const sortedNews = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setNews(sortedNews);
      } catch (e) {
        console.error("Erreur news:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return (
    <div className="min-h-screen pt-32 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ucak-blue"></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-6xl">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mb-4">Actualités & Agenda</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Restez connecté avec la vie du campus UCAK. Événements, annonces officielles et vie étudiante.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white dark:bg-ucak-dark-card rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
            <Newspaper size={64} className="mb-4 opacity-20" />
            <h3 className="text-xl font-bold">Aucune actualité pour l'instant</h3>
            <p className="text-sm">Revenez plus tard pour les dernières infos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-ucak-dark-card rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden relative bg-gray-100 dark:bg-black/20">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Newspaper size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${item.type === 'EVENT' ? 'bg-purple-600' : 'bg-ucak-blue'}`}>
                      {item.type === 'EVENT' ? 'Événement' : 'Info'}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {item.type === 'EVENT' && item.event_date && (
                    <div className="flex items-center gap-4 text-xs font-bold text-purple-600 dark:text-purple-400 mb-3 bg-purple-50 dark:bg-purple-900/10 p-2 rounded-lg w-fit">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(item.event_date).toLocaleDateString()}
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1.5 pl-4 border-l border-purple-200 dark:border-purple-800">
                          <MapPin size={14} />
                          {item.location}
                        </div>
                      )}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-ucak-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                    {item.content}
                  </p>

                  <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-xs text-gray-400 font-medium">
                    <span>Publié le {new Date(item.created_at).toLocaleDateString()}</span>
                    {/* Lien "Lire plus" si besoin plus tard */}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}