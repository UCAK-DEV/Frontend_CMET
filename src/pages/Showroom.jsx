// src/pages/Showroom.jsx
import { useState, useEffect } from 'react';
import { api, useUser } from '../context/UserContext'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, Plus, Code, Rocket, X, Edit2, Loader2, Sparkles, Search
} from 'lucide-react';

export default function Showroom() {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [filter, setFilter] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    github_url: '',
    description: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/api/v1/projects');
      setProjects(res.data);
    } catch (error) {
      console.error("Erreur chargement projets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEdit = (project) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setFormData({
      name: project.name,
      github_url: project.github_url,
      description: project.description || ''
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await api.patch(`/api/v1/projects/${currentId}`, formData);
      } else {
        await api.post('/api/v1/projects', formData);
      }
      setIsFormOpen(false);
      resetForm();
      fetchProjects();
    } catch (error) {
      alert("Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', github_url: '', description: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3">
              <Sparkles size={12} /> Innovation Étudiante
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">Showroom</h1>
            <p className="text-gray-500 text-sm">Explorez les créations de la communauté DAR.</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <input 
              placeholder="Rechercher..."
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-ucak-blue text-sm w-full md:w-64"
            />
            {user && (
              <button 
                onClick={() => { resetForm(); setIsFormOpen(true); }}
                className="px-6 py-3 bg-ucak-blue text-white rounded-xl font-bold flex items-center gap-2 whitespace-nowrap"
              >
                <Plus size={20} /> Nouveau
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- GRID --- */}
      {loading && projects.length === 0 ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-ucak-blue" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-[#161b22] rounded-[2rem] p-6 border border-gray-100 dark:border-white/5 relative group shadow-lg">
              {user && user.id === project.userId && (
                <button 
                  onClick={() => handleOpenEdit(project)}
                  className="absolute top-4 right-4 p-2 bg-ucak-blue/10 text-ucak-blue rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 size={16} />
                </button>
              )}
              <div className="w-12 h-12 bg-ucak-blue/10 rounded-2xl flex items-center justify-center text-ucak-blue mb-4">
                <Code size={24} />
              </div>
              <h3 className="text-xl font-black mb-2 dark:text-white">{project.name}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-3">{project.description || "Pas de description."}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{project.user?.full_name}</span>
                <a href={project.github_url} target="_blank" rel="noreferrer" className="text-ucak-blue hover:underline flex items-center gap-1 text-xs font-bold">
                  <Github size={14} /> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative bg-white dark:bg-[#161b22] w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-white/10">
              <h2 className="text-2xl font-black mb-6 dark:text-white flex items-center gap-2">
                <Rocket className="text-ucak-blue" /> {isEditing ? "Modifier" : "Publier"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required placeholder="Nom du projet" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl outline-none focus:ring-2 ring-ucak-blue/50 dark:text-white" />
                <input required type="url" placeholder="Lien GitHub" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl outline-none focus:ring-2 ring-ucak-blue/50 dark:text-white" />
                <textarea placeholder="Description (optionnel)" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-black/20 rounded-xl outline-none focus:ring-2 ring-ucak-blue/50 dark:text-white h-28 resize-none" />
                <button type="submit" disabled={loading} className="w-full py-4 bg-ucak-blue text-white font-black rounded-xl hover:bg-ucak-green transition-all uppercase tracking-widest shadow-lg">
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "Sauvegarder"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}