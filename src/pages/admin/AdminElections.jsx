import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { 
  Plus, Calendar, Trash2, StopCircle, Vote, UserPlus, 
  Users, ChevronRight, AlertCircle, CheckCircle 
} from 'lucide-react';

export default function AdminElections() {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  
  // États des formulaires
  const [electionForm, setElectionForm] = useState({ title: '', description: '', start_date: '', end_date: '' });
  const [candidateForm, setCandidateForm] = useState({ full_name: '', biography: '', photo_url: '' });
  
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

  // Charger les élections au démarrage
  useEffect(() => { fetchElections(); }, []);

  // Charger les candidats quand une élection est sélectionnée
  useEffect(() => {
    if (selectedElection) {
      fetchCandidates(selectedElection.id);
    }
  }, [selectedElection]);

  const fetchElections = async () => {
    try {
      const res = await api.get('/api/v1/elections');
      setElections(res.data);
    } catch (e) { console.error("Erreur chargement élections", e); }
  };

  const fetchCandidates = async (electionId) => {
    try {
      const res = await api.get(`/api/v1/candidates?electionId=${electionId}`);
      setCandidates(res.data);
    } catch (e) { console.error("Erreur chargement candidats", e); }
  };

  // --- ACTIONS ÉLECTIONS ---

  const handleCreateElection = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await api.post('/api/v1/elections', electionForm);
      setElections([res.data, ...elections]);
      setElectionForm({ title: '', description: '', start_date: '', end_date: '' });
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    } catch (e) { setStatus('error'); }
  };

  const handleDeleteElection = async (id) => {
    if (!window.confirm("Supprimer cette élection et tous ses candidats ?")) return;
    try {
      await api.delete(`/api/v1/elections/${id}`);
      setElections(elections.filter(e => e.id !== id));
      if (selectedElection?.id === id) setSelectedElection(null);
    } catch (e) { alert("Erreur suppression"); }
  };

  const handleCloseElection = async (id) => {
    try {
      await api.patch(`/api/v1/elections/${id}`, { status: 'closed' }); // Ou is_active: false selon votre DTO
      fetchElections();
    } catch (e) { alert("Impossible de clôturer"); }
  };

  // --- ACTIONS CANDIDATS ---

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (!selectedElection) return;
    
    try {
      const payload = { ...candidateForm, electionId: selectedElection.id };
      const res = await api.post('/api/v1/candidates', payload);
      setCandidates([...candidates, res.data]);
      setCandidateForm({ full_name: '', biography: '', photo_url: '' });
    } catch (e) { alert("Erreur ajout candidat"); }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (!window.confirm("Retirer ce candidat ?")) return;
    try {
      await api.delete(`/api/v1/candidates/${candidateId}`);
      setCandidates(candidates.filter(c => c.id !== candidateId));
    } catch (e) { alert("Erreur suppression"); }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0f172a] text-white px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* En-tête */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
          <div className="p-3 bg-ucak-blue/20 rounded-xl text-ucak-blue"><Vote size={24} /></div>
          <div>
            <h1 className="text-3xl font-black">Gestion des Votes</h1>
            <p className="text-gray-400 text-sm">Créez des scrutins et gérez les listes électorales.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLONNE GAUCHE : LISTE & CRÉATION ÉLECTIONS (40%) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Formulaire Création Élection */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Plus size={18}/> Nouvelle Élection</h3>
              <form onSubmit={handleCreateElection} className="space-y-3">
                <input required value={electionForm.title} onChange={e=>setElectionForm({...electionForm, title: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none" placeholder="Titre (ex: BDE 2026)" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="datetime-local" required value={electionForm.start_date} onChange={e=>setElectionForm({...electionForm, start_date: e.target.value})} className="w-full p-2 bg-black/20 rounded-xl border border-white/10 text-xs focus:border-ucak-blue outline-none text-gray-400" />
                  <input type="datetime-local" required value={electionForm.end_date} onChange={e=>setElectionForm({...electionForm, end_date: e.target.value})} className="w-full p-2 bg-black/20 rounded-xl border border-white/10 text-xs focus:border-ucak-blue outline-none text-gray-400" />
                </div>
                <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-ucak-blue hover:bg-ucak-green rounded-xl font-bold uppercase text-xs tracking-widest transition-all">
                  {status === 'loading' ? 'Création...' : 'Créer le Scrutin'}
                </button>
              </form>
            </div>

            {/* Liste des Élections */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Élections enregistrées</p>
              {elections.map(elec => (
                <div 
                  key={elec.id} 
                  onClick={() => setSelectedElection(elec)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center group ${selectedElection?.id === elec.id ? 'bg-ucak-blue/20 border-ucak-blue' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-white">{elec.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                      <span className={`w-2 h-2 rounded-full ${elec.status === 'open' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                      {elec.status === 'open' ? 'OUVERT' : 'FERMÉ/DRAFT'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {elec.status === 'open' && (
                      <button onClick={(e) => { e.stopPropagation(); handleCloseElection(elec.id); }} className="p-2 text-gray-500 hover:text-orange-400 transition-colors" title="Clôturer">
                        <StopCircle size={16} />
                      </button>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteElection(elec.id); }} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    <ChevronRight size={16} className={`text-gray-600 ${selectedElection?.id === elec.id ? 'text-ucak-blue' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLONNE DROITE : GESTION DES CANDIDATS (60%) */}
          <div className="lg:col-span-7">
            {selectedElection ? (
              <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden min-h-[600px] flex flex-col">
                
                {/* Header Sélection */}
                <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-ucak-blue uppercase tracking-widest mb-1 block">Élection Sélectionnée</span>
                    <h2 className="text-2xl font-black">{selectedElection.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">Gérez les candidats pour ce scrutin.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white">{candidates.length}</span>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Candidats</p>
                  </div>
                </div>

                {/* Formulaire Ajout Candidat */}
                <div className="p-6 bg-ucak-blue/5 border-b border-white/10">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2"><UserPlus size={16}/> Ajouter un Candidat</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input value={candidateForm.full_name} onChange={e=>setCandidateForm({...candidateForm, full_name: e.target.value})} className="p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none" placeholder="Nom Prénom" />
                    <input value={candidateForm.photo_url} onChange={e=>setCandidateForm({...candidateForm, photo_url: e.target.value})} className="p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none" placeholder="URL Photo (Optionnel)" />
                    <textarea value={candidateForm.biography} onChange={e=>setCandidateForm({...candidateForm, biography: e.target.value})} className="md:col-span-2 p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none h-20" placeholder="Programme / Biographie..." />
                  </div>
                  <button onClick={handleAddCandidate} disabled={!candidateForm.full_name} className="mt-3 w-full py-2 bg-white text-black hover:bg-gray-200 rounded-lg font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50">
                    Enregistrer le Candidat
                  </button>
                </div>

                {/* Liste des Candidats */}
                <div className="p-6 flex-1 overflow-y-auto space-y-3">
                  {candidates.map(cand => (
                    <div key={cand.id} className="flex items-center gap-4 p-4 bg-black/20 rounded-xl border border-white/5 hover:border-ucak-blue/30 transition-colors group">
                      <div className="w-12 h-12 rounded-full bg-ucak-blue flex items-center justify-center font-black text-lg overflow-hidden">
                        {cand.photo_url ? <img src={cand.photo_url} alt="" className="w-full h-full object-cover" /> : cand.full_name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-white">{cand.full_name}</h5>
                        <p className="text-xs text-gray-400 line-clamp-1">{cand.biography}</p>
                      </div>
                      <button onClick={() => handleDeleteCandidate(cand.id)} className="text-gray-600 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {candidates.length === 0 && (
                    <div className="text-center py-10 text-gray-500 flex flex-col items-center">
                      <Users size={32} className="mb-2 opacity-20"/>
                      <p>Aucun candidat pour le moment.</p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-white/10 rounded-3xl p-10">
                <Vote size={48} className="mb-4 opacity-20" />
                <p className="font-bold">Sélectionnez une élection à gauche</p>
                <p className="text-sm">pour gérer ses candidats et paramètres.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}