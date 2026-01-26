import { useState, useEffect } from 'react';
import { api, useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, FileText, Plus, Trash2, Award, 
  Sparkles, Target, Zap, Search, Clock, 
  AlertCircle, ArrowRight, Download
} from 'lucide-react';

export default function CareerCenter() {
  const { user, isAdmin } = useUser();
  const [cvs, setCvs] = useState([]);
  const [offers, setOffers] = useState([]); // État vide (pas de mocks)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chargement des CVs et tentative de récupération des stages
        const [cvRes] = await Promise.all([
          api.get('/api/v1/cvs'),
          // api.get('/api/v1/jobs') // À décommenter quand l'API sera prête
        ]);
        setCvs(cvRes.data);
        setOffers([]); // On force à vide pour l'instant
      } catch (err) {
        console.error("Erreur de synchronisation carrière:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteCv = async (id) => {
    if (!window.confirm("Supprimer ce CV définitivement ?")) return;
    try {
      await api.delete(`/api/v1/cvs/${id}`);
      setCvs(cvs.filter(c => c.id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-32 pb-20 px-6">
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER ÉDITORIAL --- */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-ucak-blue">
              <Zap size={16} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Propulsion Professionnelle</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Career <span className="text-ucak-blue">Center.</span>
            </h1>
          </div>

          <button 
            onClick={() => navigate('/cv-generator')}
            className="px-8 py-5 bg-ucak-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-ucak-blue/20 hover:scale-105 transition-all"
          >
            <Plus size={20} /> Nouveau CV Pro
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- SECTION 1 : OPPORTUNITÉS DE STAGES (GAUCHE) --- */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-2 flex items-center gap-2">
              <Briefcase size={14} className="text-ucak-blue" /> Offres de Stages & PFE
            </h3>

            {offers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {/* Les offres s'afficheront ici quand elles existeront */}
                </div>
            ) : (
                /* ÉTAT VIDE SANS MOCK */
                <div className="bg-white dark:bg-[#0b101a] border-2 border-dashed border-gray-100 dark:border-white/5 rounded-[3rem] p-20 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-3xl flex items-center justify-center text-gray-300 mb-6">
                        <Clock size={40} />
                    </div>
                    <h4 className="text-xl font-black dark:text-white mb-2 italic">Pas de stages disponibles pour l'instant.</h4>
                    <p className="text-sm text-gray-400 font-medium max-w-sm">
                        Revenez bientôt !
                    </p>
                </div>
            )}
          </div>

          {/* --- SECTION 2 : MES DOCUMENTS & PROFIL (DROITE) --- */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Mes CVs sauvegardés */}
            <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-2">Mes Documents</h3>
                <div className="space-y-4">
                    <AnimatePresence>
                        {cvs.length > 0 ? (
                            cvs.map((cv) => (
                                <motion.div 
                                    key={cv.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white dark:bg-[#0b101a] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm group flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-ucak-blue/10 text-ucak-blue rounded-xl flex items-center justify-center">
                                            <FileText size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black dark:text-white truncate max-w-[120px]">{cv.title || "CV MET"}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase">{new Date(cv.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => deleteCv(cv.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-2 text-ucak-blue hover:bg-ucak-blue/10 rounded-lg transition-all">
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-8 text-center bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-dashed border-gray-200 dark:border-white/10">
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-relaxed">
                                    Aucun CV généré.<br/>Utilisez l'Architecte de CV.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Carte de Certification UFR */}
            <div className="bg-white dark:bg-[#0b101a] p-8 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-ucak-blue/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                    <Award size={14} className="text-ucak-gold" /> Status Certifié
                </h4>
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-ucak-blue to-blue-700 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-4 shadow-lg">
                        {user?.full_name?.charAt(0)}
                    </div>
                    <p className="text-sm font-black dark:text-white">{user?.full_name}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{user?.filiere}</p>
                    
                    {user?.is_ufr_verified ? (
                        <div className="mt-6 px-4 py-2 bg-ucak-gold/10 text-ucak-gold rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border border-ucak-gold/20">
                            <Sparkles size={10} /> Membre Officiel MET
                        </div>
                    ) : (
                        <div className="mt-6 px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-400 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                            <AlertCircle size={10} /> En attente de validation
                        </div>
                    )}
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}