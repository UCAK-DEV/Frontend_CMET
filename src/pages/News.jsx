import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, ShieldCheck, Newspaper, Calendar, 
  X, ExternalLink, Activity, Youtube, ArrowRight,
  Bell, Zap, Filter
} from 'lucide-react';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    try {
      const res = await api.get('/api/v1/news');
      setNews(res.data);
    } catch (err) { console.error("Erreur API:", err); }
    finally { setLoading(false); }
  };

  const getYTId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const filteredNews = news.filter(n => 
    activeFilter === 'ALL' || (activeFilter === 'OFFICIAL' && n.isOfficial) || (activeFilter === 'VIDEO' && n.videoUrl)
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-32 pb-20 px-6 overflow-hidden">
      
      {/* --- BACKGROUND TECH LAYER --- */}
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-ucak-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER PROFESSIONNEL --- */}
        <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-ucak-blue dark:text-ucak-gold font-black text-[10px] uppercase tracking-[0.4em]"
            >
              <Activity size={14} className="animate-pulse" /> Centre d'Information Officiel
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Actualités <span className="text-ucak-blue">&</span> Médias
            </h1>
          </div>

          {/* Filtres High-Tech */}
          <div className="flex bg-white dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-md">
            {['ALL', 'OFFICIAL', 'VIDEO'].map((f) => (
              <button
                key={f} onClick={() => setActiveFilter(f)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${activeFilter === f 
                    ? 'bg-ucak-blue text-white shadow-lg shadow-ucak-blue/30' 
                    : 'text-gray-400 hover:text-ucak-blue dark:hover:text-white'}`}
              >
                {f === 'ALL' ? 'Flux Global' : f === 'OFFICIAL' ? 'Annonces UFR' : 'Vidéos UCAK'}
              </button>
            ))}
          </div>
        </header>

        {/* --- GRILLE DE NEWS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item, index) => {
              const isVideo = !!item.videoUrl;
              
              return (
                <motion.article
                  key={item.id} layout
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white dark:bg-[#0b101a] rounded-[2rem] border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Bordure lumineuse (Glow) sur la carte officielle */}
                  {item.isOfficial && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ucak-gold via-ucak-blue to-ucak-gold"></div>
                  )}

                  {/* Zone Média */}
                  <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-white/5">
                    <img 
                      src={isVideo ? `https://img.youtube.com/vi/${getYTId(item.videoUrl)}/maxresdefault.jpg` : item.imageUrl} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt=""
                    />
                    
                    {/* Overlay Vidéo */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                        <motion.button 
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedVideo(getYTId(item.videoUrl))}
                          className="w-16 h-16 bg-ucak-green text-white rounded-full flex items-center justify-center shadow-2xl"
                        >
                          <Play fill="white" size={24} className="ml-1" />
                        </motion.button>
                      </div>
                    )}

                    {/* Tag flottant */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                       {item.isOfficial ? (
                          <span className="px-3 py-1.5 bg-ucak-gold text-black rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                            <ShieldCheck size={12} /> Certifié
                          </span>
                       ) : (
                          <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md text-ucak-blue dark:text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
                            {item.type}
                          </span>
                       )}
                    </div>
                  </div>

                  {/* Zone Texte */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mb-4">
                      <Calendar size={12} className="text-ucak-blue" />
                      {new Date(item.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>

                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-ucak-blue transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                      {item.content}
                    </p>

                    <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                      <button 
                        onClick={() => isVideo ? setSelectedVideo(getYTId(item.videoUrl)) : null}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-ucak-blue hover:text-ucak-gold transition-colors"
                      >
                        {isVideo ? 'Visualiser' : 'Lire le rapport'} <ArrowRight size={14} />
                      </button>
                      
                      {isVideo && <Youtube size={16} className="text-red-500 opacity-50" />}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* === MODAL LECTEUR VIDÉO PRO === */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-[#020408]/95 backdrop-blur-xl"
          >
            <button 
              onClick={() => setSelectedVideo(null)} 
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              className="w-full max-w-6xl aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,123,255,0.15)] border border-white/10 bg-black"
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                className="w-full h-full" allowFullScreen allow="autoplay; encrypted-media"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}