import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, ShieldCheck, Newspaper, Calendar, X, 
  ExternalLink, Activity, Youtube, ArrowRight,
  BookOpen, Share2, Bookmark, Sparkles, Loader2, Info
} from 'lucide-react';

export default function News() {
  const [adminNews, setAdminNews] = useState([]);
  const [rssNews, setRssNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        // 1. Charger les news de l'Admin (ton Backend)
        const adminRes = await api.get('/api/v1/news');
        
        // 2. Charger le flux RSS de l'UCAK via rss2json
        const rssUrl = encodeURIComponent('https://ucak.sn/feed/');
        const rssRes = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
        const rssData = await rssRes.json();

        setAdminNews(adminRes.data || []);
        if (rssData.status === 'ok') {
          // On marque les items RSS pour les différencier
          const formattedRss = rssData.items.map(item => ({
            ...item,
            id: `rss-${item.guid}`,
            isRSS: true,
            createdAt: item.pubDate,
            imageUrl: item.thumbnail || "https://ucak.sn/wp-content/uploads/2023/10/logo-ucak.png"
          }));
          setRssNews(formattedRss);
        }
      } catch (err) {
        console.error("Erreur de synchronisation news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  const getYTId = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Fusion et tri par date
  const allNews = [...adminNews, ...rssNews].sort((a, b) => 
    new Date(b.createdAt || b.pubDate) - new Date(a.createdAt || a.pubDate)
  );

  const filteredNews = allNews.filter(n => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'OFFICIAL') return n.isOfficial || n.isRSS;
    if (activeFilter === 'VIDEO') return !!n.videoUrl;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-32 pb-20 px-6 relative overflow-x-hidden">
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-ucak-blue font-black text-[10px] uppercase tracking-[0.4em]">
              <Activity size={14} className="animate-pulse" /> Flux d'information hybride
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Actualités <span className="text-ucak-blue">&</span> Rapports.
            </h1>
          </div>

          <div className="flex bg-white dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-md">
            {['ALL', 'OFFICIAL', 'VIDEO'].map((f) => (
              <button
                key={f} onClick={() => setActiveFilter(f)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${activeFilter === f ? 'bg-ucak-blue text-white shadow-lg' : 'text-gray-400 hover:text-ucak-blue'}`}
              >
                {f === 'ALL' ? 'Flux Global' : f === 'OFFICIAL' ? 'Officiel UCAK' : 'Vidéos'}
              </button>
            ))}
          </div>
        </header>

        {/* --- GRILLE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => {
              const isVideo = !!item.videoUrl;
              const isRSS = !!item.isRSS;

              return (
                <motion.article
                  key={item.id} layout
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white dark:bg-[#0b101a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-2xl transition-all flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-white/5">
                    <img 
                      src={isVideo ? `https://img.youtube.com/vi/${getYTId(item.videoUrl)}/maxresdefault.jpg` : item.imageUrl || item.thumbnail} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt=""
                    />
                    <div className="absolute top-4 left-4">
                        {isRSS ? (
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-ucak-blue rounded-lg text-[8px] font-black uppercase tracking-widest border border-ucak-blue/20">UCAK Officiel</span>
                        ) : item.isOfficial ? (
                          <span className="px-3 py-1 bg-ucak-gold text-black rounded-lg text-[8px] font-black uppercase tracking-widest">Annonce Club</span>
                        ) : null}
                    </div>
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                        <button onClick={() => setSelectedVideo(getYTId(item.videoUrl))} className="w-14 h-14 bg-ucak-green text-white rounded-full flex items-center justify-center shadow-xl"><Play fill="white" size={20} className="ml-1"/></button>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-tighter">
                      <Calendar size={12} className="text-ucak-blue" />
                      {new Date(item.createdAt || item.pubDate).toLocaleDateString()}
                    </div>
                    <h3 className="text-lg font-black dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-ucak-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mb-8 font-medium leading-relaxed">
                      {isRSS ? item.description.replace(/<[^>]*>?/gm, '') : item.content}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex justify-between items-center">
                      <button 
                        onClick={() => isRSS || !isVideo ? setSelectedReport(item) : setSelectedVideo(getYTId(item.videoUrl))}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-ucak-blue hover:text-ucak-gold transition-colors"
                      >
                        {isVideo ? 'Visualiser' : 'Lire le rapport'} <ArrowRight size={14} />
                      </button>
                      {isRSS && <ExternalLink size={14} className="text-gray-300" />}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* --- SIDE-PANEL : IMMERSIVE READER --- */}
      <AnimatePresence>
        {selectedReport && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReport(null)} className="fixed inset-0 bg-[#020408]/80 backdrop-blur-md z-[100]" />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-[#0b101a] z-[110] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                <button onClick={() => setSelectedReport(null)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-red-500"><X size={20}/> Fermer</button>
                <div className="flex gap-2">
                    <button className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl"><Share2 size={16}/></button>
                    <a href={selectedReport.link} target="_blank" rel="noreferrer" className="p-3 bg-ucak-blue text-white rounded-xl"><ExternalLink size={16}/></a>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <span className="text-ucak-blue font-black text-[9px] uppercase tracking-[0.4em] mb-4 block">Rapport Académique</span>
                <h2 className="text-3xl font-black dark:text-white tracking-tighter mb-8 leading-none">{selectedReport.title}</h2>
                <img src={selectedReport.imageUrl || selectedReport.thumbnail} className="w-full h-64 object-cover rounded-[2rem] mb-10 shadow-lg" />
                <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: selectedReport.content || selectedReport.description }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal Vidéo standard pour YouTube */}
      <AnimatePresence>
        {selectedVideo && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/95">
              <button onClick={() => setSelectedVideo(null)} className="absolute top-10 right-10 text-white"><X size={32}/></button>
              <iframe src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} className="w-full max-w-5xl aspect-video rounded-3xl shadow-2xl" allowFullScreen allow="autoplay" />
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}