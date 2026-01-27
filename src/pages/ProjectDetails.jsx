import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../context/UserContext';
import { ArrowLeft, Github, Globe, Calendar, User, Loader2, AlertCircle, Sparkles, Share2, Layers } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/api/v1/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Erreur chargement projet:", err);
        setError("Impossible de charger les détails du projet.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Helper pour l'avatar GitHub
  const getGithubAvatar = (url) => {
    if (!url || !url.includes('github.com')) return null;
    const username = url.split('github.com/')[1]?.split('/')[0];
    return username ? `https://github.com/${username}.png` : null;
  };

  if (loading) return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#020408]">
      <Loader2 size={40} className="animate-spin text-ucak-blue mb-4" />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Chargement de l'étude de cas...</p>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-[#020408]">
      <AlertCircle size={40} className="mb-4" />
      <p className="text-sm font-bold">{error || "Projet introuvable"}</p>
      <Link to="/showroom" className="mt-6 text-ucak-blue hover:underline text-xs font-black uppercase tracking-widest">Retour au showroom</Link>
    </div>
  );

  const avatarUrl = getGithubAvatar(project.github_url || project.link_url);
  const isTech = project.category === 'IT' || !project.category; // Par défaut IT

  return (
    <div className="min-h-screen bg-white dark:bg-[#020408] font-sans selection:bg-ucak-blue selection:text-white pb-20">
      
      {/* --- HERO HEADER --- */}
      <div className="relative pt-32 pb-20 px-6 bg-gray-50 dark:bg-[#0b101a] border-b border-gray-100 dark:border-white/5">
        <div className="absolute inset-0 ucak-grid-pattern opacity-[0.05] pointer-events-none"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link to="/showroom" className="inline-flex items-center gap-2 text-gray-400 hover:text-ucak-blue mb-8 transition-colors group text-[10px] font-black uppercase tracking-widest">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Retour au Showroom
          </Link>
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border ${isTech ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
                  {project.category || 'Tech & Dev'}
                </span>
                <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                  <Calendar size={12} /> {new Date(project.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1] mb-6">
                {project.name}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                Une solution innovante conçue par les talents de l'UFR MET.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              {(project.github_url || (project.link_url && isTech)) && (
                <a href={project.github_url || project.link_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
                  <Github size={18} /> Voir le Code
                </a>
              )}
              {project.link_url && !isTech && (
                <a href={project.link_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-ucak-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-ucak-green transition-all shadow-xl">
                  <Globe size={18} /> Consulter le Projet
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto max-w-5xl px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Story) */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#0e121e] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-white/5">
              <h3 className="text-sm font-black text-ucak-blue uppercase tracking-widest mb-8 flex items-center gap-2">
                <Sparkles size={16} /> À propos du projet
              </h3>
              <div className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                <p className="whitespace-pre-line">
                  {project.description || "L'auteur n'a pas encore fourni de description détaillée pour ce projet. Cependant, l'excellence technique et la créativité sont au cœur de toutes les initiatives du Club MET."}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar (Metadata) */}
          <div className="space-y-6">
            
            {/* Author Card */}
            <div className="bg-white dark:bg-[#0e121e] rounded-[2rem] p-6 shadow-lg border border-gray-100 dark:border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Créateur</h4>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 flex items-center justify-center text-ucak-blue shadow-inner border border-gray-200 dark:border-white/10">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={24} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{project.user?.full_name || "Membre MET"}</p>
                  <p className="text-xs text-gray-500 font-medium">{project.user?.filiere || "Étudiant"}</p>
                </div>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="bg-white dark:bg-[#0e121e] rounded-[2rem] p-6 shadow-lg border border-gray-100 dark:border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Layers size={14} /> Stack Technique
              </h4>
              <div className="flex flex-wrap gap-2">
                {/* Simulation de tags basés sur la catégorie, à rendre dynamique plus tard */}
                {isTech ? (
                  ['React', 'Node.js', 'GitHub'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))
                ) : (
                  ['Business Plan', 'Finance', 'Strategy'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))
                )}
              </div>
            </div>

            <button className="w-full py-4 rounded-2xl border border-dashed border-gray-300 dark:border-white/20 text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-ucak-blue hover:text-ucak-blue transition-colors flex items-center justify-center gap-2">
              <Share2 size={16} /> Partager la fiche
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}