import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { Newspaper, Calendar, MapPin, Image as ImageIcon, Save, Trash2 } from 'lucide-react';

export default function AdminNews() {
  const [newsList, setNewsList] = useState([]);
  // type: 'INFO' ou 'EVENT'
  const [formData, setFormData] = useState({ title: '', content: '', type: 'INFO', event_date: '', location: '', image_url: '' });
  const [status, setStatus] = useState(null);

  const fetchNews = async () => {
    try {
      // CORRECTION : /news au lieu de /api/v1/news
      const res = await api.get('/news');
      setNewsList(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchNews(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // CORRECTION : /news au lieu de /api/v1/news
      await api.post('/news', formData);
      setStatus('success');
      setFormData({ title: '', content: '', type: 'INFO', event_date: '', location: '', image_url: '' });
      fetchNews();
    } catch (e) { setStatus('error'); }
  };

  const deleteNews = async (id) => {
    if(!confirm("Supprimer ?")) return;
    try { 
      // CORRECTION : /news au lieu de /api/v1/news
      await api.delete(`/news/${id}`); 
      fetchNews(); 
    } catch(e){}
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0f172a] text-white px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl"><Newspaper size={24} /></div>
          <div><h1 className="text-3xl font-black">Actualités & Agenda</h1><p className="text-gray-400 text-sm">Publiez les infos du campus.</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 sticky top-32">
              <h3 className="font-bold text-lg mb-4">Nouvelle Publication</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Sélecteur de Type */}
                <div className="flex p-1 bg-black/20 rounded-xl">
                  <button type="button" onClick={()=>setFormData({...formData, type:'INFO'})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type==='INFO' ? 'bg-ucak-blue text-white shadow' : 'text-gray-500'}`}>INFO</button>
                  <button type="button" onClick={()=>setFormData({...formData, type:'EVENT'})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type==='EVENT' ? 'bg-purple-600 text-white shadow' : 'text-gray-500'}`}>ÉVÉNEMENT</button>
                </div>

                <input required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-white/30 outline-none" placeholder="Titre..." />
                
                <textarea required value={formData.content} onChange={e=>setFormData({...formData, content: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-white/30 outline-none h-32" placeholder="Contenu..." />

                {/* Champs spécifiques Événements */}
                {formData.type === 'EVENT' && (
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 space-y-3">
                    <div className="flex items-center gap-2 border-b border-purple-500/10 pb-2 mb-2 text-purple-300 text-xs font-bold uppercase"><Calendar size={12}/> Détails Agenda</div>
                    <input type="datetime-local" required value={formData.event_date} onChange={e=>setFormData({...formData, event_date: e.target.value})} className="w-full p-2 bg-black/20 rounded-lg border border-white/10 text-xs focus:border-purple-500 outline-none" />
                    <div className="relative">
                      <MapPin size={14} className="absolute left-2.5 top-2.5 text-gray-500"/>
                      <input value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} className="w-full pl-8 p-2 bg-black/20 rounded-lg border border-white/10 text-xs focus:border-purple-500 outline-none" placeholder="Lieu (ex: Amphi A)" />
                    </div>
                  </div>
                )}

                <div className="relative">
                   <ImageIcon size={14} className="absolute left-3 top-3.5 text-gray-500"/>
                   <input value={formData.image_url} onChange={e=>setFormData({...formData, image_url: e.target.value})} className="w-full pl-9 p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-white/30 outline-none" placeholder="URL Image (Optionnel)" />
                </div>

                <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2">
                  {status === 'loading' ? '...' : <><Save size={16}/> Publier</>}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {newsList.map(item => (
              <div key={item.id} className="bg-white/5 p-5 rounded-2xl border border-white/10 flex gap-4 hover:bg-white/10 transition-colors">
                {item.image_url && <img src={item.image_url} alt="" className="w-20 h-20 object-cover rounded-xl bg-black/20" />}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg leading-tight mb-1">{item.title}</h4>
                    {item.type === 'EVENT' && <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase rounded">Agenda</span>}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-2">{item.content}</p>
                  
                  {item.type === 'EVENT' && item.event_date && (
                    <div className="flex gap-3 text-xs text-purple-300 font-medium">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(item.event_date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1"><MapPin size={12}/> {item.location}</span>
                    </div>
                  )}
                </div>
                <button onClick={() => deleteNews(item.id)} className="text-gray-600 hover:text-red-500 self-start"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}