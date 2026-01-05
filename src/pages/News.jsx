import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Newspaper, Info, Clock } from 'lucide-react';
import { api } from '../context/UserContext';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'ARTICLE', 'EVENT'

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/api/v1/news');
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

  const filteredNews = activeTab === 'ALL' ? news : news.filter(n => n.type === activeTab);

  if (loading) return (
    <div className="min-h-screen pt-32 flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ucak-blue"></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* En-tête avec Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-2">Club MET News</h1>
            <p className="text-lg text-gray-500">L'actualité officielle et l'agenda du campus.</p>
          </div>

          <div className="flex bg-white dark:bg-ucak-dark-card p-1 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
            {[
              { id: 'ALL', label: 'Tout' },
              { id: 'ARTICLE', label: 'Articles' },
              { id: 'EVENT', label: 'Agenda' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                  ? 'bg-ucak-blue text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white dark:bg-ucak-dark-card rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
            <Newspaper size={64} className="mb-4 opacity-20" />
            <h3 className="text-xl font-bold">Aucun contenu trouvé</h3>
            <p className="text-sm">Changez de filtre ou revenez plus tard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-ucak-dark-card rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 group hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
              >
                <div className="h-52 overflow-hidden relative bg-gray-100 dark:bg-black/20">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50 dark:bg-white/5">
                      {item.type === 'EVENT' ? <Calendar size={48} /> : <Newspaper size={48} />}
                    </div>
                  )}
                  
                  {/* Badge Type */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${item.type === 'EVENT' ? 'bg-purple-600' : 'bg-ucak-blue'}`}>
                      {item.type === 'EVENT' ? 'Événement' : 'Article'}
                    </span>
                  </div>

                  {/* Badge Date (Seulement Agenda) */}
                  {item.type === 'EVENT' && item.event_date && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-gray-900 shadow-sm flex items-center gap-2">
                       <Clock size={14} className="text-purple-600"/>
                       {new Date(item.event_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-ucak-blue transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {item.content}
                  </p>

                  {item.location && item.type === 'EVENT' && (
                     <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4">
                        <MapPin size={14} className="text-purple-500"/> {item.location}
                     </div>
                  )}

                  <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-xs text-gray-400 font-medium">
                    <span>Publié le {new Date(item.created_at).toLocaleDateString()}</span>
                    <button className="text-ucak-blue font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire <ArrowRight size={14}/>
                    </button>
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