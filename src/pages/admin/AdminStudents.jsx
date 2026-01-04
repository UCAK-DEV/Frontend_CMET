import { useEffect, useState } from 'react';
import { api } from '../../context/UserContext';
import { Users, Search, ShieldCheck, GraduationCap, Clock } from 'lucide-react';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/api/v1/users');
        setStudents(res.data);
      } catch (e) { 
        console.error("Erreur chargement étudiants", e); 
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredStudents = students.filter(s => 
    s.full_name?.toLowerCase().includes(filter.toLowerCase()) || 
    s.matricule?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0f172a] text-white px-6">
      <div className="container mx-auto max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Base Étudiants</h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">{students.length} inscrits sur la plateforme</p>
          </div>
          <div className="relative w-full md:w-auto group">
            <Search className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-ucak-blue transition-colors" size={18} />
            <input 
              placeholder="Rechercher (Nom, Matricule)..." 
              className="w-full md:w-80 pl-10 p-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-ucak-blue outline-none transition-all focus:bg-black/20"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Chargement de la base de données...</div>
        ) : (
          <div className="grid gap-3">
            {filteredStudents.map(student => (
              <div key={student.id} className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between hover:bg-white/10 transition-colors group">
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shadow-inner ${student.role === 'ADMIN' ? 'bg-red-500 text-white' : 'bg-ucak-blue text-white'}`}>
                    {student.full_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-ucak-blue transition-colors">{student.full_name}</h4>
                    <p className="text-xs text-gray-400 font-mono flex items-center gap-2">
                      {student.matricule} 
                      {student.role === 'ADMIN' && <span className="text-[9px] bg-red-500 px-1.5 rounded text-white font-bold">ADMIN</span>}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-0.5">Filière</p>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-300">
                       <GraduationCap size={14} className="text-ucak-gold"/> {student.filiere || 'Non défini'}
                    </div>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-1">Statut</p>
                    {student.is_ufr_verified ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black uppercase rounded-lg flex items-center justify-end gap-1 border border-green-500/20">
                        <ShieldCheck size={12}/> Vérifié
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-[10px] font-black uppercase rounded-lg flex items-center justify-end gap-1 border border-white/5">
                        <Clock size={12}/> Standard
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}