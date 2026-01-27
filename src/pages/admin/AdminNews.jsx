import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Youtube, Newspaper, ShieldCheck, 
  Image as ImageIcon, Send, Sparkles, LayoutDashboard, 
  CheckCircle, AlertCircle, Loader2, Play
} from 'lucide-react';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  // Formulaire initial
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'ARTICLE',
    imageUrl: '',
    videoUrl: '',
    isOfficial: false
  });

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    try {
      const res = await api.get('/api/v1/news');
      setNews(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await api.post('/api/v1/news', formData);
      setStatus({ type: 'success', message: 'Actualité publiée avec succès !' });
      setFormData({ title: '', content: '', type: 'ARTICLE', imageUrl: '', videoUrl: '', isOfficial: false });
      fetchNews();
    } catch (err) {
      setStatus({ type: 'error', message: "Erreur lors de la publication." });
    } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette actualité ?")) return;
    try {
      await api.delete(`/api/v1/news/${id}`);
      fetchNews();
    } catch (err) { console.error(err); }
  };

  // Helper pour l'aperçu YouTube
  const getYTThumb = (url) => {
    const id = url?.split('v=')[1]?.split('&')[0] || url?.split('/').pop();
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#05070a] pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black dark:text-white tracking-tighter">Éditeur de <span className="text-ucak-blue">News & Médias</span></h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-2">Gestion du flux multimédia de l'UFR MET</p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-black uppercase text-gray-400">
            <LayoutDashboard size={16} /> Dashboard Admin
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- COLONNE GAUCHE : FORMULAIRE --- */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-xl">
              <div className="space-y-6">
                
                {/* Type & Officiel */}
                <div className="flex flex-wrap gap-4 items-center justify-between pb-6 border-b border-gray-50 dark:border-white/5">
                  <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
                    {['ARTICLE', 'VIDEO', 'EVENT'].map(t => (
                      <button 
                        key={t} type="button" onClick={() => setFormData({...formData, type: t})}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${formData.type === t ? 'bg-white dark:bg-white/10 text-ucak-blue shadow-sm' : 'text-gray-400'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-ucak-gold transition-colors">Information Officielle ?</span>
                    <input 
                      type="checkbox" checked={formData.isOfficial} 
                      onChange={(e) => setFormData({...formData, isOfficial: e.target.checked})}
                      className="w-5 h-5 rounded-lg border-gray-300 text-ucak-blue focus:ring-ucak-blue"
                    />
                  </label>
                </div>

                {/* Champs texte */}
                <div className="space-y-4">
                  <input 
                    placeholder="Titre de l'actualité..." required
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-lg font-bold outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white"
                    value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <textarea 
                    placeholder="Contenu de l'article ou description de la vidéo..." required rows={5}
                    className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-3xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white"
                    value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
                </div>

                {/* Médias */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      placeholder="URL de l'image (Optionnel)"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-xs outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white"
                      value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                    <input 
                      placeholder="Lien YouTube (Si type VIDEO)"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-xs outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white"
                      value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    />
                  </div>
                </div>

                {/* Bouton de validation */}
                <button 
                  disabled={submitting}
                  className="w-full py-5 bg-ucak-blue text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-ucak-blue/20"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Publier maintenant</>}
                </button>

                {status && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-2xl text-center text-xs font-bold ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {status.message}
                  </motion.div>
                )}
              </div>
            </form>
          </div>

          {/* --- COLONNE DROITE : APERÇU TEMPS RÉEL --- */}
          <div className="lg:col-span-5 sticky top-32 h-fit">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Sparkles size={14} className="text-ucak-gold" /> Aperçu du rendu
            </h3>
            
            <div className={`overflow-hidden rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl transition-all ${formData.isOfficial ? 'bg-ucak-blue text-white' : 'bg-white dark:bg-white/5'}`}>
               <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-white/10">
                  <img 
                    src={formData.type === 'VIDEO' ? getYTThumb(formData.videoUrl) : formData.imageUrl || 'https://via.placeholder.com/800x400'} 
                    className="w-full h-full object-cover" alt=""
                  />
                  {formData.type === 'VIDEO' && formData.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play fill="white" size={40} className="text-white" />
                    </div>
                  )}
                  {formData.isOfficial && (
                    <div className="absolute top-4 left-4 bg-ucak-gold text-black px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl">
                      <ShieldCheck size={12} /> Officiel
                    </div>
                  )}
               </div>
               <div className="p-8">
                  <h4 className={`text-xl font-black mb-3 ${formData.isOfficial ? 'text-white' : 'dark:text-white'}`}>
                    {formData.title || "Titre de votre actualité"}
                  </h4>
                  <p className={`text-xs line-clamp-2 ${formData.isOfficial ? 'text-white/70' : 'text-gray-500'}`}>
                    {formData.content || "Le contenu de votre article apparaîtra ici..."}
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* --- LISTE DES ACTUALITÉS EXISTANTES --- */}
        <div className="mt-24">
           <h3 className="text-2xl font-black dark:text-white mb-8">Articles publiés ({news.length})</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map(item => (
                <div key={item.id} className="bg-white dark:bg-white/2 p-6 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${item.type === 'VIDEO' ? 'bg-red-500/10 text-red-500' : 'bg-ucak-blue/10 text-ucak-blue'}`}>
                        {item.type === 'VIDEO' ? <Youtube size={20} /> : <Newspaper size={20} />}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold dark:text-white truncate max-w-[150px]">{item.title}</h5>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">{item.type}</p>
                      </div>
                   </div>
                   <button onClick={() => handleDelete(item.id)} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                   </button>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
