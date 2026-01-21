import { useState, useEffect } from 'react';
import { api, useUser } from '../context/UserContext'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, Plus, Code, Rocket, X, Edit2, Loader2, 
  Sparkles, Search, ArrowUpRight, Cpu, User, Terminal
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-32 pb-24 px-6 overflow-hidden relative">
      
      {/* --- BACKGROUND TECH DECOR --- */}
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.07] pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-ucak-blue/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER EDITORIAL --- */}
        <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-ucak-blue/5 border border-ucak-blue/10 text-ucak-blue text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <Terminal size={12} /> Innovation Hub
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Showroom<span className="text-ucak-blue">.</span>
            </h1>
            <p className="text-gray-500 font-bold max-w-lg text-lg">
              La vitrine technologique des ingénieurs et créateurs de l'UFR MET.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
              <input 
                placeholder="Filtrer les projets..."
                onChange={(e) => setFilter(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/20 text-sm w-full md:w-72 dark:text-white shadow-sm transition-all"
              />
            </div>
            {user && (
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => { resetForm(); setIsFormOpen(true); }}
                className="px-8 py-4 bg-ucak-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-ucak-blue/20"
              >
                <Plus size={18} /> Nouveau Projet
              </motion.button>
            )}
          </div>
        </header>

        {/* --- GRID AVEC ANIMATION DE LAYOUT --- */}
        {loading && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-ucak-blue" size={48} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Initialisation du Lab...</span>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.article 
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-[#0b101a] rounded-[2.5rem] p-10 border border-gray-200 dark:border-white/5 relative group transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full"
                >
                  {/* Action : Édition */}
                  {user && user.id === project.userId && (
                    <button 
                      onClick={() => handleOpenEdit(project)}
                      className="absolute top-6 right-6 p-3 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-ucak-blue rounded-xl opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-ucak-blue/20"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}

                  {/* Icon / Avatar */}
                  <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-[1.5rem] flex items-center justify-center text-ucak-blue mb-8 group-hover:bg-ucak-blue group-hover:text-white transition-all duration-500 shadow-inner">
                    <Cpu size={32} />
                  </div>

                  <h3 className="text-3xl font-black mb-4 dark:text-white tracking-tighter leading-tight group-hover:text-ucak-blue transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-10 line-clamp-4 italic">
                    {project.description || "Aucune documentation détaillée n'a été fournie pour ce projet d'innovation."}
                  </p>

                  <div className="mt-auto pt-8 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-ucak-gold/10 text-ucak-gold rounded-full flex items-center justify-center">
                            <User size={14} />
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest truncate max-w-[100px]">
                            {project.user?.full_name?.split(' ')[0] || "Étudiant"}
                        </span>
                    </div>
                    
                    <a 
                      href={project.github_url} target="_blank" rel="noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 text-ucak-blue dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-ucak-blue hover:text-white transition-all"
                    >
                      Source <Github size={14} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* --- MODAL : DESIGN "COMMAND CENTER" --- */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#020408]/90 backdrop-blur-xl" 
              onClick={() => setIsFormOpen(false)} 
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-[#0b101a] w-full max-w-2xl rounded-[3rem] p-12 shadow-2xl border border-gray-100 dark:border-white/10"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl font-black dark:text-white tracking-tighter flex items-center gap-4">
                  <Rocket className="text-ucak-blue" /> {isEditing ? "Optimiser" : "Lancer"}
                </h2>
                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={32} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Identification du projet</label>
                    <input 
                      required placeholder="Nom du système / application" 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                      className="w-full p-5 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-ucak-blue/30 rounded-[1.5rem] outline-none dark:text-white transition-all font-bold" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Référentiel Source (GitHub)</label>
                    <input 
                      required type="url" placeholder="https://github.com/votre-repo" 
                      value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} 
                      className="w-full p-5 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-ucak-blue/30 rounded-[1.5rem] outline-none dark:text-white transition-all" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Spécifications & Vision</label>
                    <textarea 
                      placeholder="Décrivez brièvement la stack technique et l'objectif..." 
                      value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} 
                      className="w-full p-5 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-ucak-blue/30 rounded-[1.5rem] outline-none dark:text-white h-32 resize-none transition-all" 
                    />
                </div>

                <button 
                  type="submit" disabled={loading} 
                  className="w-full py-6 bg-ucak-blue text-white font-black rounded-3xl hover:bg-ucak-green transition-all uppercase tracking-[0.3em] text-xs shadow-2xl shadow-ucak-blue/20 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> Déployer sur le Showroom</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}