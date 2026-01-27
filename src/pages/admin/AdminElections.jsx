import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Vote, Plus, Trash2, Edit3, Calendar, 
  Users, CheckCircle2, X, Clock, ShieldAlert,
  BarChart, ArrowRight, Loader2, Sparkles
} from 'lucide-react';

export default function AdminElections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'draft'
  });

  useEffect(() => { fetchElections(); }, []);

  const fetchElections = async () => {
    try {
      // Récupération via ton endpoint réel
      const res = await api.get('/api/v1/elections');
      setElections(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Création d'une élection selon ton DTO
      await api.post('/api/v1/elections', formData);
      setIsModalOpen(false);
      setFormData({ title: '', description: '', start_date: '', end_date: '', status: 'draft' });
      fetchElections();
    } catch (err) { alert("Erreur lors de la création : vérifiez les dates."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette élection et tous ses candidats ?")) return;
    try {
      await api.delete(`/api/v1/elections/${id}`);
      fetchElections();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-24 md:pt-32 pb-20 px-6">
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER ÉDITORIAL --- */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-ucak-blue mb-4">
              <ShieldAlert size={16} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Système de Vote Sécurisé</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Élections<span className="text-ucak-blue">.</span>
            </h1>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-5 bg-ucak-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-ucak-blue/20"
          >
            <Plus size={20} /> Nouvelle Session
          </motion.button>
        </header>

        {/* --- GRILLE DES SESSIONS --- */}
        <div className="grid grid-cols-1 gap-8">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-ucak-blue" size={40} />
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Initialisation des urnes numériques...</p>
            </div>
          ) : (
            elections.map((election, idx) => (
              <motion.div 
                key={election.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-[#0b101a] rounded-[3rem] p-10 border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition-all group"
              >
                {/* Status Indicator */}
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-inner
                    ${election.status === 'open' ? 'bg-ucak-green/10 text-ucak-green' : 
                      election.status === 'closed' ? 'bg-red-500/10 text-red-500' : 'bg-gray-100 text-gray-400'}`}>
                    <Vote size={32} />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest">{election.status}</span>
                </div>

                {/* Main Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl font-black dark:text-white tracking-tight group-hover:text-ucak-blue transition-colors">
                      {election.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium max-w-2xl line-clamp-2">
                    {election.description || "Aucune description détaillée pour cette session."}
                  </p>
                  
                  <div className="flex flex-wrap gap-6 pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                       <Calendar size={14} className="text-ucak-blue" /> Du {new Date(election.start_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                       <Clock size={14} className="text-ucak-gold" /> Au {new Date(election.end_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-ucak-blue">
                       <Users size={14} /> {election.candidates?.length || 0} Candidats
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-3">
                   <button className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-ucak-blue hover:bg-ucak-blue hover:text-white transition-all shadow-sm">
                      <BarChart size={20} />
                   </button>
                   <button onClick={() => handleDelete(election.id)} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-300 hover:text-red-500 transition-all shadow-sm">
                      <Trash2 size={20} />
                   </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* --- MODAL CRÉATION --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#020408]/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-[#0b101a] w-full max-w-3xl rounded-[3rem] p-12 shadow-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl font-black dark:text-white tracking-tighter">Planifier <span className="text-ucak-blue">le Vote.</span></h2>
                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-red-500 transition-colors"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest">Détails de l'élection</label>
                  <input required placeholder="Titre (ex: Bureau Exécutif 2026)" className="w-full p-5 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  <textarea placeholder="Description des enjeux..." className="w-full p-5 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white h-24 resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest">Date de début</label>
                      <input type="datetime-local" required className="w-full p-5 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none dark:text-white font-bold" value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest">Date de clôture</label>
                      <input type="datetime-local" required className="w-full p-5 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none dark:text-white font-bold" value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} />
                   </div>
                </div>

                <button type="submit" className="w-full py-6 bg-ucak-blue text-white rounded-3xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-ucak-blue/30 flex items-center justify-center gap-3">
                  <CheckCircle2 size={18} /> Lancer la Session de Vote
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}