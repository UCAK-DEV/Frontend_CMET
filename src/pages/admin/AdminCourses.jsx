import { useState } from 'react';
import { api } from '../../context/UserContext';
import { Plus, AlertCircle, CheckCircle, Shield } from 'lucide-react';

export default function AdminCourses() {
  // CORRECTION ICI : Les clés correspondent désormais au DTO du Backend
  const [formData, setFormData] = useState({
    title: '',
    instructor_name: '', // Backend attend 'instructor_name', pas 'instructor'
    duration: '',        // Ce champ n'est pas sauvegardé pour l'instant (absent de l'entité Course)
    filiere_tag: 'Informatique', // Backend attend 'filiere_tag', pas 'category'
    level: 'Débutant',
    description: ''
  });
  
  const [status, setStatus] = useState(null); // 'success', 'error', 'loading'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // APPEL API RÉEL VERS LE BACKEND
      await api.post('/api/v1/courses', formData); 
      
      setStatus('success');
      // Réinitialisation avec les bonnes clés
      setFormData({ 
        title: '', 
        instructor_name: '', 
        duration: '', 
        filiere_tag: 'Informatique', 
        level: 'Débutant', 
        description: '' 
      });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20 mb-4">
            <Shield size={12} /> Zone Webmaster
          </div>
          <h1 className="text-3xl font-black text-ucak-blue dark:text-white">Gestion des Cours</h1>
          <p className="text-gray-500 mt-2">Ajoutez de nouvelles ressources pédagogiques à la bibliothèque.</p>
        </div>

        <div className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-green-200 dark:border-green-900/30">
              <CheckCircle size={20} />
              <div><span className="font-bold text-sm block">Cours publié !</span><span className="text-xs opacity-80">Visible par tous les étudiants.</span></div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-red-200 dark:border-red-900/30">
              <AlertCircle size={20} />
              <span className="font-bold text-sm">Erreur lors de la publication. Vérifiez les champs.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Titre du Module</label>
              <input name="title" value={formData.title} onChange={handleChange} required placeholder="Ex: Architecture TCP/IP" className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold text-gray-700 dark:text-white" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Instructeur</label>
                {/* CORRECTION : name="instructor_name" */}
                <input name="instructor_name" value={formData.instructor_name} onChange={handleChange} required placeholder="Ex: Dr. Sene" className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Durée</label>
                <input name="duration" value={formData.duration} onChange={handleChange} required placeholder="Ex: 12h 30m" className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Filière</label>
                {/* CORRECTION : name="filiere_tag" */}
                <select name="filiere_tag" value={formData.filiere_tag} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold">
                  <option value="Informatique">Informatique & Télécoms</option>
                  <option value="HEC">Gestion & HEC</option>
                  <option value="Génie Civil">Génie Civil</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Niveau</label>
                <select name="level" value={formData.level} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold">
                  <option value="Débutant">Débutant (L1)</option>
                  <option value="Intermédiaire">Intermédiaire (L2)</option>
                  <option value="Avancé">Avancé (L3)</option>
                </select>
              </div>
            </div>

            {/* Description (Optionnel mais recommandé pour éviter les chaines vides si le back le demande) */}
            <div>
               <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Description courte</label>
               <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Objectifs du cours..." className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold min-h-[100px]" />
            </div>

            <button type="submit" disabled={status === 'loading'} className="w-full py-4 bg-ucak-blue text-white rounded-xl font-black uppercase tracking-widest hover:bg-ucak-green transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 mt-4">
              {status === 'loading' ? 'Publication...' : <><Plus size={20} /> Publier le Cours</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}