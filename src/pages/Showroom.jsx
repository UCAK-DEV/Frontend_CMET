import { useState, useEffect } from 'react';
import { api, useUser } from '../context/UserContext'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, ExternalLink, Plus, Code, Rocket, X, Edit2, Loader2, 
  Sparkles, Search, ArrowUpRight, Cpu, User, Terminal, Briefcase, 
  PenTool, HardHat, FileText, Filter
} from 'lucide-react';

// Configuration des catégories
const CATEGORIES = {
  ALL: { label: 'Tout voir', icon: Filter, color: 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300' },
  IT: { label: 'Tech & Dev', icon: Terminal, color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' },
  BUSINESS: { label: 'Business & HEC', icon: Briefcase, color: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400' },
  INDUSTRY: { label: 'Génie & Industrie', icon: HardHat, color: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' },
  ART: { label: 'Art & Création', icon: PenTool, color: 'bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400' },
};

export default function Showroom() {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    link_url: '', // Renommé pour être générique (GitHub ou Drive)
    description: '',
    category: 'IT' // Par défaut
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
      link_url: project.github_url || project.link_url, // Supporte l'ancien champ
      description: project.description || '',
      category: project.category || 'IT'
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Adaptation pour le backend : on map link_url vers github_url si c'est IT, sinon on garde link_url
    const payload = {
      ...formData,
      github_url: formData.category === 'IT' ? formData.link_url : undefined,
      link_url: formData.category !== 'IT' ? formData.link_url : undefined
    };

    try {
      if (isEditing) {
        await api.patch(`/api/v1/projects/${currentId}`, payload);
      } else {
        await api.post('/api/v1/projects', payload);
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
    setFormData({ name: '', link_url: '', description: '', category: 'IT' });
    setIsEditing(false);
    setCurrentId(null);
  };

  // Helper pour extraire le pseudo GitHub
  const getGithubUsername = (url) => {
    if (!url || !url.includes('github.com')) return null;
    const parts = url.split('github.com/');
    if (parts.length < 2) return null;
    return parts[1].split('/')[0];
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || (p.category || 'IT') === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-24 md:pt-32 pb-24 px-6 overflow-hidden relative">
      
      {/* --- BACKGROUND TECH DECOR --- */}
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.07] pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-ucak-blue/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER EDITORIAL --- */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-ucak-blue/5 border border-ucak-blue/10 text-ucak-blue text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <Sparkles size={12} /> Talent Showcase
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Projets <span className="text-ucak-blue">Étudiants.</span>
            </h1>
            <p className="text-gray-500 font-bold max-w-lg text-sm md:text-base">
              La vitrine de l'excellence UFR MET. Du code, des business plans, et de l'ingénierie.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-end">
            {user && (
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => { resetForm(); setIsFormOpen(true); }}
                className="px-8 py-4 bg-ucak-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-ucak-blue/20 w-full md:w-auto"
              >
                <Plus size={18} /> Soumettre un projet
              </motion.button>
            )}
          </div>
        </header>

        {/* --- BARRE DE FILTRES & RECHERCHE --- */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
          {/* Catégories */}
          <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-2xl border border-gray-100 dark:border-white/5 overflow-x-auto w-full md:w-auto no-scrollbar">
            {Object.entries(CATEGORIES).map(([key, conf]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap
                  ${activeCategory === key ? 'bg-ucak-blue text-white shadow-md' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
              >
                <conf.icon size={14} /> {conf.label}
              </button>
            ))}
          </div>

          {/* Recherche */}
          <div className="relative group flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
            <input 
              placeholder="Rechercher un projet, un auteur..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/20 text-sm w-full dark:text-white shadow-sm transition-all"
            />
          </div>
        </div>

        {/* --- GRID AVEC ANIMATION --- */}
        {loading && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-ucak-blue" size={48} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Chargement du Showroom...</span>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => {
                const catKey = project.category || 'IT';
                const catConfig = CATEGORIES[catKey] || CATEGORIES.IT;
                const githubUser = getGithubUsername(project.github_url || project.link_url);
                
                return (
                  <motion.article 
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-[#0b101a] rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 relative group transition-all duration-500 shadow-sm hover:shadow-2xl flex flex-col h-full"
                  >
                    {/* Header Carte : Icone Catégorie + Actions */}
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${catConfig.color}`}>
                        {githubUser && catKey === 'IT' ? (
                          <img src={`https://github.com/${githubUser}.png`} alt="GH" className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          <catConfig.icon size={20} />
                        )}
                      </div>
                      
                      {/* Badge Catégorie */}
                      <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-transparent ${catConfig.color.replace('text-', 'border-').replace('bg-', 'bg-opacity-10 ')}`}>
                        {catKey}
                      </span>

                      {/* Edit Button */}
                      {user && user.id === project.userId && (
                        <button 
                          onClick={() => handleOpenEdit(project)}
                          className="absolute top-8 right-20 p-2 text-gray-300 hover:text-ucak-blue transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                    </div>

                    <h3 className="text-xl font-black mb-3 dark:text-white tracking-tight leading-tight group-hover:text-ucak-blue transition-colors">
                      {project.name}
                    </h3>
                    
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium leading-relaxed mb-8 line-clamp-3">
                      {project.description || "Un projet innovant développé par les talents de l'UFR MET."}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-gray-500 dark:text-gray-300">
                              {project.user?.full_name?.charAt(0) || <User size={10} />}
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase truncate max-w-[100px]">
                              {project.user?.full_name?.split(' ')[0] || "Étudiant"}
                          </span>
                      </div>
                      
                      {/* Bouton Lien Dynamique */}
                      <a 
                        href={project.github_url || project.link_url} target="_blank" rel="noreferrer" 
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                          ${catKey === 'IT' 
                            ? 'bg-gray-900 text-white hover:bg-black' 
                            : 'bg-ucak-blue text-white hover:bg-ucak-green'}`}
                      >
                        {catKey === 'IT' ? 'GitHub' : catKey === 'BUSINESS' ? 'Plan' : 'Voir'} 
                        {catKey === 'IT' ? <Github size={12} /> : <ExternalLink size={12} />}
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* --- MODAL FORMULAIRE DYNAMIQUE --- */}
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
              className="relative bg-white dark:bg-[#0b101a] w-full max-w-2xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-white/10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black dark:text-white tracking-tighter flex items-center gap-3">
                  <Rocket className="text-ucak-blue" /> {isEditing ? "Modifier" : "Publier"}
                </h2>
                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Sélecteur de catégorie */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Type de projet</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.keys(CATEGORIES).filter(k => k !== 'ALL').map(cat => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFormData({...formData, category: cat})}
                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all
                          ${formData.category === cat 
                            ? 'bg-ucak-blue text-white border-ucak-blue' 
                            : 'bg-gray-50 dark:bg-white/5 text-gray-500 border-transparent hover:border-gray-200'}`}
                      >
                        {CATEGORIES[cat].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Nom du projet</label>
                    <input 
                      required placeholder="Ex: Smart Touba, Business Plan..." 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                      className="w-full p-5 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-ucak-blue/30 rounded-2xl outline-none dark:text-white transition-all font-bold" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">
                      {formData.category === 'IT' ? 'Lien GitHub Repository' : formData.category === 'BUSINESS' ? 'Lien Document (Drive/PDF)' : 'Lien de présentation'}
                    </label>
                    <input 
                      required type="url" 
                      placeholder={formData.category === 'IT' ? "https://github.com/mon-pseudo/mon-projet" : "https://docs.google.com/..."}
                      value={formData.link_url} onChange={e => setFormData({...formData, link_url: e.target.value})} 
                      className="w-full p-5 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-ucak-blue/30 rounded-2xl outline-none dark:text-white transition-all" 
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Description</label>
                    <textarea 
                      placeholder="Décrivez l'objectif et les outils utilisés..." 
                      value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} 
                      className="w-full p-5 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-ucak-blue/30 rounded-2xl outline-none dark:text-white h-32 resize-none transition-all" 
                    />
                </div>

                <button 
                  type="submit" disabled={loading} 
                  className="w-full py-5 bg-ucak-blue text-white font-black rounded-2xl hover:bg-ucak-green transition-all uppercase tracking-[0.3em] text-xs shadow-xl shadow-ucak-blue/20 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> Confirmer la publication</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
