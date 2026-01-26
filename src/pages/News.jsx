import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, ShieldCheck, Newspaper, Calendar, X, 
  ExternalLink, Activity, Youtube, ArrowRight,
  BookOpen, Share2, Bookmark, Sparkles, Loader2, 
  Clock, MapPin, Info, Search, Filter
} from 'lucide-react';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Appelle ton endpoint hybride (Admin + Scraping UCAK)
        const res = await api.get('/api/v1/news');
        setNews(res.data || []);
      } catch (err) {
        console.error("Erreur de synchronisation news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getYTId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Filtrage intelligent et recherche
  const filteredNews = news.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'OFFICIAL') return n.isOfficial || n.isExternal;
    if (activeFilter === 'VIDEO') return !!n.videoUrl;
    if (activeFilter === 'EVENT') return n.type === 'EVENT';
    return true;
  });

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#020408]">
      <Loader2 className="w-12 h-12 text-ucak-blue animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Initialisation du flux...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-24 md:pt-32 pb-20 px-4 md:px-10 relative overflow-x-hidden">
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER RESPONSIVE --- */}
        <header className="mb-12 md:mb-20 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
          <div className="space-y-4 w-full xl:w-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-ucak-blue font-black text-[10px] uppercase tracking-[0.4em]">
              <Activity size={14} className="animate-pulse" /> Academy Newsroom
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Actualités <span className="text-ucak-blue">&</span> Médias.
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
             {/* Barre de recherche discrète */}
             <div className="relative group flex-1 sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={16} />
                <input 
                  type="text" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white text-xs font-bold"
                />
             </div>

             {/* Filtres High-Tech */}
             <div className="flex bg-white dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-md overflow-x-auto">
                {['ALL', 'OFFICIAL', 'VIDEO', 'EVENT'].map((f) => (
                  <button
                    key={f} onClick={() => setActiveFilter(f)}
                    className={`px-4 md:px-6 py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                      ${activeFilter === f ? 'bg-ucak-blue text-white shadow-lg shadow-ucak-blue/30' : 'text-gray-400 hover:text-ucak-blue'}`}
                  >
                    {f === 'ALL' ? 'Flux' : f === 'OFFICIAL' ? 'Officiel' : f === 'VIDEO' ? 'Vidéos' : 'Agenda'}
                  </button>
                ))}
             </div>
          </div>
        </header>

        {/* --- GRILLE DE NEWS (1 col mobile, 2 col tablet, 3 col desktop) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => {
              const isVideo = !!item.videoUrl;
              const isEvent = item.type === 'EVENT';
              
              return (
                <motion.article
                  key={item.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white dark:bg-[#0b101a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100 dark:bg-white/5">
                    <img 
                      src={isVideo ? `https://img.youtube.com/vi/${getYTId(item.videoUrl)}/maxresdefault.jpg` : (item.imageUrl || "https://ucak.sn/wp-content/uploads/2023/10/logo-ucak.png")} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt=""
                    />
                    <div className="absolute top-6 left-6">
                        {item.isExternal ? (
                          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-ucak-blue rounded-lg text-[8px] font-black uppercase tracking-widest border border-ucak-blue/10">UCAK News</span>
                        ) : item.isOfficial && (
                          <span className="px-3 py-1.5 bg-ucak-gold text-black rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg"><ShieldCheck size={10} /> Certifié</span>
                        )}
                    </div>
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <button onClick={() => setSelectedVideo(getYTId(item.videoUrl))} className="w-14 h-14 bg-ucak-green text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"><Play fill="white" size={20} className="ml-1"/></button>
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-gray-400 mb-4 tracking-widest">
                      {isEvent ? <MapPin size={10} className="text-ucak-gold" /> : <Calendar size={10} className="text-ucak-blue" />}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-ucak-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mb-8 font-medium leading-relaxed">
                      {item.content || item.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex justify-between items-center">
                      <button 
                        onClick={() => setSelectedReport(item)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-ucak-blue hover:text-ucak-gold transition-colors"
                      >
                        {isVideo ? 'Détails' : 'Lire le rapport'} <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* === SIDE-PANEL : LECTEUR IMMERSIF (POPUP DYNAMIQUE) === */}
      <AnimatePresence>
        {selectedReport && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReport(null)} className="fixed inset-0 bg-[#020408]/90 backdrop-blur-xl z-[100]" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-3xl bg-white dark:bg-[#0b101a] z-[110] shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                <button onClick={() => setSelectedReport(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-colors">
                  <X size={20}/> Fermer
                </button>
                <div className="flex gap-2">
                    <button className="p-3 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-ucak-blue"><Share2 size={16}/></button>
                    <a href={selectedReport.link} target="_blank" rel="noreferrer" className="p-3 bg-ucak-blue text-white rounded-2xl"><ExternalLink size={16}/></a>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                <p className="text-ucak-blue font-black text-[9px] uppercase tracking-[0.4em] mb-4">Rapport Académique</p>
                <h2 className="text-3xl md:text-5xl font-black dark:text-white tracking-tighter mb-8 leading-none">{selectedReport.title}</h2>
                <img src={selectedReport.imageUrl || selectedReport.thumbnail} className="w-full h-64 md:h-96 object-cover rounded-[2.5rem] mb-12 shadow-2xl" alt="" />
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-medium"
                  dangerouslySetInnerHTML={{ __html: selectedReport.content || selectedReport.description }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL VIDÉO */}
      <AnimatePresence>
        {selectedVideo && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#020408]/98 backdrop-blur-3xl">
              <button onClick={() => setSelectedVideo(null)} className="absolute top-10 right-10 text-white hover:text-red-500"><X size={32}/></button>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                <iframe src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} className="w-full h-full" allowFullScreen allow="autoplay" />
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}