import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../context/UserContext';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, FileText, Download, Share2, 
  ExternalLink, GraduationCap, Clock, Calendar
} from 'lucide-react';

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/api/v1/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-ucak-dark text-ucak-blue animate-pulse font-black">Chargement du module...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center dark:bg-ucak-dark dark:text-white">Module introuvable.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Barre de retour */}
        <button 
          onClick={() => navigate('/knowledge')}
          className="flex items-center gap-2 text-gray-500 hover:text-ucak-blue font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Retour à la bibliothèque
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contenu Principal */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2.5rem] shadow-xl border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-ucak-blue/10 text-ucak-blue text-[10px] font-black uppercase rounded-full">
                  {course.category}
                </span>
                <span className="text-gray-400 text-sm font-bold">• {course.level}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                {course.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-10 whitespace-pre-line">
                {course.description}
              </p>

              {/* Aperçu / Lien vers le fichier */}
              <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-10 border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mb-6">
                  <FileText size={40} />
                </div>
                <h3 className="text-lg font-bold dark:text-white mb-2">Support de Cours Disponible</h3>
                <p className="text-sm text-gray-500 mb-8">Consultez ou téléchargez le document PDF complet pour ce module.</p>
                <a 
                  href={course.file_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-10 py-4 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-ucak-green transition-all shadow-lg shadow-ucak-blue/20"
                >
                  <ExternalLink size={20} /> Ouvrir le document
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <section className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2rem] shadow-lg border border-white/5">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">À propos du cours</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-ucak-blue">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black">Niveau requis</p>
                    <p className="text-sm font-bold dark:text-white">{course.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-ucak-blue">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black">Publié le</p>
                    <p className="text-sm font-bold dark:text-white">{new Date(course.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </section>

            <button 
              onClick={() => { /* Logique de partage */ }}
              className="w-full py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-300 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
            >
              <Share2 size={18} /> Partager la ressource
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}