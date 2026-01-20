// src/pages/CareerCenter.jsx
import { useState, useEffect } from 'react';
import { api, useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, FileText, Plus, Download, 
  Trash2, Award, Sparkles, Target 
} from 'lucide-react';

export default function CareerCenter() {
  const { user } = useUser();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCvs();
  }, []);

  const fetchCvs = async () => {
    try {
      const res = await api.get('/api/v1/cvs');
      setCvs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCv = async (id) => {
    if (!window.confirm("Supprimer ce CV ?")) return;
    await api.delete(`/api/v1/cvs/${id}`);
    fetchCvs();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ucak-blue/10 text-ucak-blue text-[10px] font-black uppercase tracking-widest mb-3">
              <Target size={12} /> Objectif Emploi
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Career <span className="text-ucak-blue">Center</span></h1>
            <p className="text-gray-500 text-sm">Transformez vos réussites académiques en opportunités professionnelles.</p>
          </div>
          <button 
            onClick={() => navigate('/cv-generator')}
            className="px-8 py-4 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-ucak-green transition-all shadow-xl shadow-ucak-blue/20"
          >
            <Plus size={20} /> Nouveau CV
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section Mes CVs */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 ml-4">Mes documents sauvegardés</h3>
            {cvs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvs.map((cv) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={cv.id} 
                    className="bg-white dark:bg-ucak-dark-card p-6 rounded-[2rem] border border-white/5 shadow-lg group relative"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-gray-50 dark:bg-white/5 text-ucak-blue rounded-xl">
                        <FileText size={20} />
                      </div>
                      <button onClick={() => deleteCv(cv.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <h4 className="font-bold dark:text-white mb-1">{cv.name || "CV sans titre"}</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-black mb-4">Créé le {new Date(cv.createdAt).toLocaleDateString()}</p>
                    <button className="w-full py-3 bg-ucak-blue/5 text-ucak-blue rounded-xl text-sm font-black hover:bg-ucak-blue hover:text-white transition-all">
                      Télécharger PDF
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-dashed border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[2.5rem] p-12 text-center">
                <p className="text-gray-400 text-sm">Vous n'avez pas encore généré de CV.</p>
              </div>
            )}
          </div>

          {/* Section Statistiques de carrière */}
          <div className="space-y-6">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400 ml-4">Profil Professionnel</h3>
            <div className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2rem] border border-white/5 shadow-lg">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 bg-ucak-blue/10 rounded-3xl flex items-center justify-center text-ucak-blue mb-4">
                  <Award size={40} />
                </div>
                <h4 className="text-xl font-black dark:text-white">{user?.full_name}</h4>
                <p className="text-xs text-gray-500 font-bold uppercase">{user?.filiere}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <span className="text-xs font-bold text-gray-400 uppercase">Points XP</span>
                  <span className="font-black text-ucak-blue">{user?.xp_points || 0}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <span className="text-xs font-bold text-gray-400 uppercase">Badges Tech</span>
                  <span className="font-black text-ucak-gold">{user?.badges?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}