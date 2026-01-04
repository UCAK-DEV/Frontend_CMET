import { useState } from 'react';
import { api } from '../../context/UserContext'; // Assurez-vous que le chemin est bon selon votre structure
import { Plus, AlertCircle, CheckCircle, BookOpen, Shield } from 'lucide-react';

export default function AdminCourses() {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    duration: '',
    category: 'Informatique', // Valeur par défaut
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
      // Simulation ou appel réel API
      // await api.post('/api/v1/courses', formData); 
      
      // Simulation pour l'UX (à retirer quand le backend est prêt)
      await new Promise(r => setTimeout(r, 1500)); 
      
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
        
        {/* En-tête Admin */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20 mb-4">
            <Shield size={12} /> Zone Webmaster
          </div>
          <h1 className="text-3xl font-black text-ucak-blue dark:text-white">Gestion des Cours</h1>
          <p className="text-gray-500 mt-2">Ajoutez de nouvelles ressources pédagogiques à la bibliothèque numérique.</p>
        </div>

        <div className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
          
          {/* Notifications */}
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-green-200 dark:border-green-900/30">
              <CheckCircle size={20} />
              <div>
                <span className="font-bold text-sm block">Cours publié avec succès !</span>
                <span className="text-xs opacity-80">Il est maintenant visible par tous les étudiants.</span>
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 border border-red-200 dark:border-red-900/30">
              <AlertCircle size={20} />
              <span className="font-bold text-sm">Erreur serveur. Vérifiez votre connexion ou vos droits.</span>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Titre du Module</label>
              <input 
                name="title" value={formData.title} onChange={handleChange} required
                placeholder="Ex: Architecture des Réseaux TCP/IP"
                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue focus:ring-2 focus:ring-ucak-blue/20 font-bold text-gray-700 dark:text-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Instructeur</label>
                <input 
                  name="instructor" value={formData.instructor} onChange={handleChange} required
                  placeholder="Ex: Dr. Sene"
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Durée Est.</label>
                <input 
                  name="duration" value={formData.duration} onChange={handleChange} required
                  placeholder="Ex: 12h 30m"
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Filière</label>
                <select 
                  name="category" value={formData.category} onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold transition-all appearance-none"
                >
                  <option value="Informatique">Informatique & Télécoms</option>
                  <option value="HEC">Gestion & HEC</option>
                  <option value="Génie Civil">Génie Civil</option>
                  <option value="Génie Élec">Génie Électrique</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Niveau Cible</label>
                <select 
                  name="level" value={formData.level} onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 outline-none focus:border-ucak-blue font-bold transition-all appearance-none"
                >
                  <option value="Débutant">Débutant (L1)</option>
                  <option value="Intermédiaire">Intermédiaire (L2)</option>
                  <option value="Avancé">Avancé (L3)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full py-4 bg-ucak-blue text-white rounded-xl font-black uppercase tracking-widest hover:bg-ucak-green transition-all shadow-xl shadow-ucak-blue/20 hover:shadow-ucak-green/30 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {status === 'loading' ? (
                'Publication en cours...'
              ) : (
                <>
                  <Plus size={20} strokeWidth={3} /> Publier le Cours
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}