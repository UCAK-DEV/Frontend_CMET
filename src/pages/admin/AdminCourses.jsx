import { useState } from 'react';
import { api } from '../../context/UserContext';
import { Plus, AlertCircle, CheckCircle, Shield } from 'lucide-react';

export default function AdminCourses() {
  const [formData, setFormData] = useState({ title: '', instructor: '', duration: '', category: 'Informatique', level: 'Débutant', description: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // APPEL RÉEL AU BACKEND
      await api.post('/api/v1/courses', formData);
      
      setStatus('success');
      setFormData({ title: '', instructor: '', duration: '', category: 'Informatique', level: 'Débutant', description: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20 mb-4"><Shield size={12} /> Zone Webmaster</div>
          <h1 className="text-3xl font-black text-ucak-blue dark:text-white">Gestion des Cours</h1>
        </div>
        <div className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-white/5">
          {status === 'success' && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl flex gap-3"><CheckCircle size={20} /><span className="font-bold text-sm">Cours publié !</span></div>}
          {status === 'error' && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex gap-3"><AlertCircle size={20} /><span className="font-bold text-sm">Erreur serveur.</span></div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label className="text-xs font-black uppercase text-gray-400 ml-1">Titre</label><input name="title" value={formData.title} onChange={(e)=>setFormData({...formData, title:e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-bold" required /></div>
            <div className="grid grid-cols-2 gap-4">
               <div><label className="text-xs font-black uppercase text-gray-400 ml-1">Instructeur</label><input name="instructor" value={formData.instructor} onChange={(e)=>setFormData({...formData, instructor:e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-bold" required /></div>
               <div><label className="text-xs font-black uppercase text-gray-400 ml-1">Durée</label><input name="duration" value={formData.duration} onChange={(e)=>setFormData({...formData, duration:e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-bold" required /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs font-black uppercase text-gray-400 ml-1">Filière</label><select name="category" value={formData.category} onChange={(e)=>setFormData({...formData, category:e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-bold"><option>Informatique</option><option>HEC</option></select></div>
              <div><label className="text-xs font-black uppercase text-gray-400 ml-1">Niveau</label><select name="level" value={formData.level} onChange={(e)=>setFormData({...formData, level:e.target.value})} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 font-bold"><option>Débutant</option><option>Intermédiaire</option><option>Avancé</option></select></div>
            </div>
            <button type="submit" disabled={status === 'loading'} className="w-full py-4 bg-ucak-blue text-white rounded-xl font-black uppercase tracking-widest hover:bg-ucak-green shadow-xl flex justify-center gap-2">{status === 'loading' ? 'Envoi...' : <><Plus size={20} /> Publier</>}</button>
          </form>
        </div>
      </div>
    </div>
  );
}