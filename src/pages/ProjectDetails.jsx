import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../context/UserContext';
import { ArrowLeft, Github, Globe, Calendar, User, Loader2, AlertCircle } from 'lucide-react';

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

  if (loading) return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-ucak-blue">
      <Loader2 size={40} className="animate-spin mb-4" />
      <p className="text-xs font-black uppercase tracking-widest">Chargement des données...</p>
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-gray-400">
      <AlertCircle size={40} className="mb-4" />
      <p className="text-sm font-bold">{error || "Projet introuvable"}</p>
      <Link to="/showroom" className="mt-6 text-ucak-blue hover:underline">Retour au showroom</Link>
    </div>
  );

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-[#020408]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <Link to="/showroom" className="inline-flex items-center gap-2 text-gray-500 hover:text-ucak-blue mb-8 transition-colors group text-sm font-bold">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Retour au Showroom
        </Link>

        <div className="bg-white dark:bg-[#0b101a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5">
          {/* Image de couverture (Placeholder dynamique ou dégradé) */}
          <div className="h-64 bg-gradient-to-r from-ucak-blue to-ucak-green flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <h1 className="text-4xl md:text-6xl font-black text-white opacity-20 uppercase tracking-tighter">Projet #{project.id.toString().slice(-4)}</h1>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-3 dark:text-white">{project.name}</h1>
                <div className="flex gap-2">
                  <span className="bg-ucak-blue/10 text-ucak-blue px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Innovation</span>
                  <span className="bg-ucak-gold/10 text-ucak-gold px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Showroom</span>
                </div>
              </div>
              <div className="flex gap-3">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-900 dark:bg-white dark:text-black text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
                    <Github size={16} /> Code
                  </a>
                )}
                {/* Bouton Demo si disponible (à ajouter au modèle de données plus tard) */}
                <button disabled className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 text-gray-400 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest cursor-not-allowed">
                  <Globe size={16} /> Demo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              <div className="col-span-2 space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                <h3 className="text-sm font-black text-ucak-blue uppercase tracking-widest mb-2">Description du projet</h3>
                <p className="whitespace-pre-line">{project.description || "Aucune description détaillée fournie pour ce projet."}</p>
              </div>

              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] space-y-6 h-fit border border-gray-100 dark:border-white/5">
                <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Fiche Technique</h4>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-ucak-blue shadow-sm">
                     <User size={18} /> 
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase">Auteur</p>
                    <p className="text-sm font-bold dark:text-white">{project.user?.full_name || "Anonyme"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-ucak-gold shadow-sm">
                     <Calendar size={18} /> 
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase">Date de publication</p>
                    <p className="text-sm font-bold dark:text-white">{new Date(project.created_at || Date.now()).toLocaleDateString()}</p>
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-white/10"/>
                
                <div>
                  <h5 className="font-black text-[9px] uppercase text-gray-400 mb-3">Technologies (Estimées)</h5>
                  <div className="flex flex-wrap gap-2">
                    {/* Tags factices pour l'instant, à dynamiser si le backend le supporte */}
                    {['React', 'Node.js', 'PostgreSQL'].map(tech => (
                      <span key={tech} className="text-[9px] font-bold border border-gray-200 dark:border-white/20 px-2 py-1 rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-transparent">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}