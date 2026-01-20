// src/pages/admin/AdminStudents.jsx
import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, CheckCircle2, XCircle, Search, 
  ShieldCheck, Award, MoreVertical, Mail 
} from 'lucide-react';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/api/v1/admin/users');
      setStudents(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const toggleVerify = async (id) => {
    await api.patch(`/api/v1/admin/users/${id}/verify`);
    fetchStudents();
  };

  const filtered = students.filter(s => 
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.matricule.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black dark:text-white flex items-center gap-3">
              <Users className="text-ucak-blue" /> Gestion des <span className="text-ucak-blue">Membres</span>
            </h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">
              {students.length} Étudiants inscrits au club
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              placeholder="Rechercher par nom ou matricule..."
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-white/5 border border-white/5 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/30 dark:text-white"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        <div className="bg-white dark:bg-ucak-dark-card rounded-[2.5rem] shadow-xl border border-white/5 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                <th className="p-6 text-[10px] font-black uppercase text-gray-400">Étudiant</th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-400">Filière / Promo</th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-400 text-center">Score XP</th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-400">Statut UFR</th>
                <th className="p-6 text-[10px] font-black uppercase text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-ucak-blue/10 rounded-xl flex items-center justify-center font-black text-ucak-blue">
                        {s.full_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold dark:text-white leading-none">{s.full_name}</p>
                        <p className="text-xs text-gray-500 mt-1">{s.matricule}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-bold dark:text-gray-300">{s.filiere}</p>
                    <p className="text-[10px] text-gray-500 font-black uppercase">{s.promo}</p>
                  </td>
                  <td className="p-6 text-center">
                    <span className="px-3 py-1 bg-ucak-blue/5 text-ucak-blue rounded-full text-xs font-black">
                      {s.xp_points} XP
                    </span>
                  </td>
                  <td className="p-6">
                    {s.is_ufr_verified ? (
                      <span className="flex items-center gap-1.5 text-ucak-green text-xs font-black uppercase">
                        <ShieldCheck size={14} /> Vérifié
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-gray-400 text-xs font-black uppercase">
                        <XCircle size={14} /> En attente
                      </span>
                    )}
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => toggleVerify(s.id)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                        ${s.is_ufr_verified 
                          ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' 
                          : 'bg-ucak-blue text-white hover:bg-ucak-green shadow-lg shadow-ucak-blue/20'}`}
                    >
                      {s.is_ufr_verified ? 'Révoquer' : 'Valider UFR'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-bold italic">
              Aucun étudiant ne correspond à cette recherche.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}