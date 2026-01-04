import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { Plus, Calendar, CheckCircle, AlertTriangle, Trash2, StopCircle, Vote } from 'lucide-react';

export default function AdminElections() {
  const [elections, setElections] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', start_date: '', end_date: '' });
  const [status, setStatus] = useState(null);

  const fetchElections = async () => {
    try {
      const res = await api.get('/api/v1/elections');
      setElections(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchElections(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/api/v1/elections', formData);
      setStatus('success');
      setFormData({ title: '', description: '', start_date: '', end_date: '' });
      fetchElections();
    } catch (e) { setStatus('error'); }
  };

  const closeElection = async (id) => {
    if(!window.confirm("Voulez-vous vraiment clôturer cette élection ?")) return;
    try {
      await api.patch(`/api/v1/elections/${id}`, { is_active: false });
      fetchElections();
    } catch (e) { alert("Erreur"); }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0f172a] text-white px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
          <div className="p-3 bg-ucak-blue/20 rounded-xl text-ucak-blue"><Vote size={24} /></div>
          <div><h1 className="text-3xl font-black">Gestion des Élections</h1><p className="text-gray-400 text-sm">Organisez les votes du campus.</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire Création */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus size={20}/> Nouvelle Élection</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500">Titre</label>
                  <input required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none" placeholder="Ex: Bureau des Étudiants 2026" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-500">Description</label>
                  <textarea value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none h-24" placeholder="Détails du scrutin..." />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500">Début</label>
                    <input type="datetime-local" required value={formData.start_date} onChange={e=>setFormData({...formData, start_date: e.target.value})} className="w-full p-2 bg-black/20 rounded-xl border border-white/10 text-xs focus:border-ucak-blue outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500">Fin</label>
                    <input type="datetime-local" required value={formData.end_date} onChange={e=>setFormData({...formData, end_date: e.target.value})} className="w-full p-2 bg-black/20 rounded-xl border border-white/10 text-xs focus:border-ucak-blue outline-none" />
                  </div>
                </div>
                <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-ucak-blue hover:bg-ucak-green rounded-xl font-bold uppercase text-xs tracking-widest transition-all">
                  {status === 'loading' ? '...' : 'Lancer le Vote'}
                </button>
                {status === 'success' && <p className="text-green-400 text-xs font-bold text-center">Élection créée !</p>}
              </form>
            </div>
          </div>

          {/* Liste Élections */}
          <div className="lg:col-span-2 space-y-4">
            {elections.map(elec => (
              <div key={elec.id} className="bg-white/5 p-5 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-lg">{elec.title}</h4>
                    {elec.is_active ? 
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-black uppercase rounded">En cours</span> : 
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-black uppercase rounded">Clôturé</span>
                    }
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={12}/> Du {new Date(elec.start_date).toLocaleDateString()} au {new Date(elec.end_date).toLocaleDateString()}</span>
                  </div>
                </div>
                {elec.is_active && (
                  <button onClick={() => closeElection(elec.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="Arrêter le vote">
                    <StopCircle size={20} />
                  </button>
                )}
              </div>
            ))}
            {elections.length === 0 && <div className="text-center py-10 text-gray-500">Aucune élection enregistrée.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}