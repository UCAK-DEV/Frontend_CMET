import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckCircle2, XCircle, Search, 
  ShieldCheck, Award, Mail, Filter, 
  Activity, ArrowUpRight, Loader2, Sparkles
} from 'lucide-react';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      // Synchronisation avec ton endpoint admin réel
      const res = await api.get('/api/v1/users/admin/all'); 
      setStudents(res.data);
    } catch (err) { 
      console.error("Erreur de chargement:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  const toggleVerify = async (id) => {
    try {
      // Appel à ton service de vérification UFR
      await api.patch(`/api/v1/users/admin/${id}/verify`);
      fetchStudents();
    } catch (err) { console.error(err); }
  };

  const filtered = students.filter(s => 
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.matricule.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: students.length,
    verified: students.filter(s => s.is_ufr_verified).length,
    pending: students.filter(s => !s.is_ufr_verified).length
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER ÉDITORIAL --- */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-ucak-blue mb-4"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Administration des Membres</span>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Étudiants<span className="text-ucak-blue">.</span>
            </h1>
            
            {/* Search Bar Pro */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
              <input 
                placeholder="Nom ou matricule..."
                className="w-full pl-14 pr-6 py-5 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[2rem] outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white shadow-sm transition-all"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* --- STATS CARDS (QUICK VIEW) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <QuickStat label="Total Inscrits" val={stats.total} icon={<Users />} color="text-ucak-blue" />
          <QuickStat label="Membres Vérifiés" val={stats.verified} icon={<ShieldCheck />} color="text-ucak-gold" />
          <QuickStat label="En attente" val={stats.pending} icon={<Activity />} color="text-gray-400" />
        </div>

        {/* --- VUE MOBILE : CARTES --- */}
        <div className="md:hidden space-y-4">
          <AnimatePresence>
            {filtered.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white dark:bg-[#0b101a] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-ucak-blue/10 text-ucak-blue rounded-xl flex items-center justify-center font-black text-lg">
                    {s.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white">{s.full_name}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase">{s.matricule}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                    <p className="text-gray-400 font-bold uppercase text-[9px]">Filière</p>
                    <p className="font-bold dark:text-white">{s.filiere}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                    <p className="text-gray-400 font-bold uppercase text-[9px]">XP</p>
                    <p className="font-bold text-ucak-blue">{s.xp_points} pts</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-white/5 pt-4">
                   {s.is_ufr_verified ? (
                      <span className="text-ucak-gold text-[10px] font-black uppercase flex items-center gap-1"><ShieldCheck size={14}/> Vérifié</span>
                   ) : (
                      <span className="text-gray-400 text-[10px] font-black uppercase flex items-center gap-1"><XCircle size={14}/> En attente</span>
                   )}
                   <button 
                      onClick={() => toggleVerify(s.id)}
                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${s.is_ufr_verified ? 'bg-red-50 text-red-500' : 'bg-ucak-blue text-white'}`}
                   >
                      {s.is_ufr_verified ? 'Révoquer' : 'Valider'}
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- VUE DESKTOP : TABLEAU --- */}
        <div className="hidden md:block bg-white dark:bg-[#0b101a] rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-white/2 border-b border-gray-100 dark:border-white/5">
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Identité</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Parcours Académique</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Score XP</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Statut Officiel</th>
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Pilotage</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((s, idx) => (
                    <motion.tr 
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-ucak-blue/10 text-ucak-blue rounded-2xl flex items-center justify-center font-black text-lg shadow-inner">
                            {s.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-gray-900 dark:text-white leading-tight">{s.full_name}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{s.matricule}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <p className="text-sm font-black dark:text-gray-300">{s.filiere}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Award size={12} className="text-ucak-blue" />
                          <p className="text-[10px] text-gray-500 font-black uppercase">Promotion {s.promo}</p>
                        </div>
                      </td>
                      <td className="p-8 text-center">
                        <span className="px-4 py-1.5 bg-ucak-blue/5 text-ucak-blue rounded-full text-[10px] font-black">
                          {s.xp_points} XP
                        </span>
                      </td>
                      <td className="p-8">
                        {s.is_ufr_verified ? (
                          <div className="flex items-center gap-2 text-ucak-gold">
                            <ShieldCheck size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Membre Certifié</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-400">
                            <XCircle size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">En attente</span>
                          </div>
                        )}
                      </td>
                      <td className="p-8 text-right">
                        <button 
                          onClick={() => toggleVerify(s.id)}
                          className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all
                            ${s.is_ufr_verified 
                              ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20' 
                              : 'bg-ucak-blue text-white hover:bg-ucak-green shadow-xl shadow-ucak-blue/20'}`}
                        >
                          {s.is_ufr_verified ? 'Révoquer' : 'Valider UFR'}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {loading && (
            <div className="p-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-ucak-blue" size={40} />
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Synchronisation des membres...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-gray-400 font-black uppercase tracking-widest text-xs italic">Aucun résultat pour cette recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANT STATS ---
function QuickStat({ label, val, icon, color }) {
  return (
    <div className="bg-white dark:bg-[#0b101a] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm flex items-center justify-between group hover:border-ucak-blue/30 transition-all">
      <div>
        <p className="text-3xl font-black dark:text-white mb-1 tracking-tighter">{val}</p>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</p>
      </div>
      <div className={`p-4 rounded-2xl bg-gray-50 dark:bg-white/5 ${color} shadow-inner group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
    </div>
  );
}