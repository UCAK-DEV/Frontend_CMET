import { useState, useEffect } from 'react';
import { api, useUser } from '../context/UserContext';
import { Vote, CheckCircle2, Lock, AlertTriangle, BarChart3, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Elections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // États pour le vote
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [results, setResults] = useState(null); // Pour stocker les résultats

  const { user } = useUser();

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      // Endpoint conforme aux specs: /api/v1/elections/current
      // Le backend peut renvoyer un objet unique ou une liste. On gère les deux cas.
      const res = await api.get('/api/v1/elections/current');
      const data = Array.isArray(res.data) ? res.data : [res.data];
      setElections(data.filter(e => e && e.status !== 'draft'));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async (electionId) => {
    try {
      const res = await api.get(`/api/v1/votes/results/${electionId}`);
      setResults(res.data);
    } catch (e) {
      console.error("Impossible de récupérer les résultats", e);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate || !elections[0]) return;

    try {
      await api.post('/api/v1/elections/vote', {
        electionId: elections[0].id, // On suppose ici qu'il n'y a qu'une élection active à la fois
        candidateId: selectedCandidate.id
      });
      
      setHasVoted(true);
      setShowConfirm(false);
      // Récupérer les résultats pour les afficher
      fetchResults(elections[0].id);
      
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors du vote");
      setShowConfirm(false);
    }
  };

  // Calcul du pourcentage pour les résultats
  const getPercentage = (candidateId) => {
    if (!results) return 0;
    const totalVotes = results.reduce((acc, curr) => acc + parseInt(curr.count), 0);
    if (totalVotes === 0) return 0;
    const candidateResult = results.find(r => r.candidateId === candidateId);
    return candidateResult ? Math.round((parseInt(candidateResult.count) / totalVotes) * 100) : 0;
  };

  if (loading) return <div className="min-h-screen pt-24 md:pt-32 text-center text-gray-500">Chargement des scrutins...</div>;

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ucak-blue/10 text-ucak-blue rounded-full text-xs font-black uppercase tracking-widest mb-4 border border-ucak-blue/20">
            <Lock size={12} /> Zone Sécurisée Blockchain
          </div>
          <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-2">Espace Électoral</h1>
          <p className="text-gray-500">Votre voix compte. Participez à la vie démocratique du campus.</p>
        </div>

        {elections.length === 0 ? (
          <div className="bg-white dark:bg-ucak-dark-card p-12 rounded-[2.5rem] text-center shadow-xl border border-gray-100 dark:border-white/5 max-w-2xl mx-auto">
            <Vote size={64} className="mx-auto mb-6 text-gray-300" />
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Aucun vote en cours</h3>
            <p className="text-gray-500">Il n'y a pas d'élection active pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {elections.map(election => (
              <div key={election.id} className="bg-white dark:bg-ucak-dark-card rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5">
                
                {/* Header Élection */}
                <div className="bg-ucak-blue p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-black mb-1">{election.title}</h2>
                    <p className="opacity-80 text-sm max-w-xl">{election.description || "Faites entendre votre voix."}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${election.status === 'open' ? 'bg-green-400 text-ucak-blue' : 'bg-red-500 text-white'}`}>
                    {election.status === 'open' ? 'Vote Ouvert' : 'Terminé'}
                  </div>
                </div>

                {/* Contenu (Liste ou Résultats) */}
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">
                      {hasVoted ? "Résultats en temps réel" : "Candidats en lice"}
                    </h3>
                    {hasVoted && <span className="text-xs font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={14}/> A Voté</span>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {election.candidates && election.candidates.length > 0 ? (
                      election.candidates.map(candidate => (
                        <div 
                          key={candidate.id} 
                          className={`relative overflow-hidden p-4 rounded-2xl border transition-all ${
                             hasVoted 
                             ? 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5' 
                             : 'border-gray-100 dark:border-white/5 hover:border-ucak-blue/50 hover:bg-blue-50/50 dark:hover:bg-white/10 cursor-pointer group'
                          }`}
                        >
                          {/* Barre de progression (Visible seulement si a voté) */}
                          {hasVoted && (
                            <div className="absolute left-0 top-0 bottom-0 bg-ucak-blue/10 dark:bg-ucak-blue/20 transition-all duration-1000" style={{ width: `${getPercentage(candidate.id)}%` }}></div>
                          )}

                          <div className="relative z-10 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-white/10 flex items-center justify-center text-2xl font-black text-gray-400 overflow-hidden shrink-0">
                              {candidate.photo_url ? <img src={candidate.photo_url} alt="" className="w-full h-full object-cover"/> : candidate.full_name.charAt(0)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-lg text-gray-800 dark:text-white truncate">{candidate.full_name}</h4>
                              <p className="text-xs text-gray-500 line-clamp-1">{candidate.biography}</p>
                              
                              {hasVoted && (
                                <p className="text-sm font-black text-ucak-blue mt-1">
                                  {getPercentage(candidate.id)}% <span className="text-[10px] text-gray-400 font-normal">des voix</span>
                                </p>
                              )}
                            </div>

                            {!hasVoted && election.status === 'open' && (
                              <button 
                                onClick={() => { setSelectedCandidate(candidate); setShowConfirm(true); }}
                                className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-white/20 flex items-center justify-center text-gray-300 group-hover:bg-ucak-blue group-hover:border-ucak-blue group-hover:text-white transition-all shadow-sm"
                              >
                                <Vote size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm italic col-span-2">Les candidats n'ont pas encore été annoncés.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Confirmation */}
        <AnimatePresence>
          {showConfirm && selectedCandidate && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2rem] max-w-md w-full shadow-2xl border border-white/20"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-ucak-blue/10 dark:bg-white/10 rounded-full flex items-center justify-center mb-6 text-ucak-blue dark:text-white">
                    <Vote size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-2">Confirmer votre vote</h3>
                  
                  <p className="text-gray-500 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                    Vous êtes sur le point de voter pour <br/>
                    <span className="font-black text-lg text-ucak-blue dark:text-ucak-gold">{selectedCandidate.full_name}</span>.
                  </p>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl flex gap-3 text-left mb-8">
                    <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
                    <p className="text-xs text-yellow-700 dark:text-yellow-500 font-medium">
                      Attention : Ce vote est définitif et sera enregistré dans la blockchain. Impossible de modifier votre choix après confirmation.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowConfirm(false)} 
                      className="flex-1 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition text-sm"
                    >
                      Annuler
                    </button>
                    <button 
                      onClick={handleVote} 
                      className="flex-1 py-3.5 rounded-xl font-black bg-ucak-blue text-white hover:bg-ucak-green transition shadow-lg text-sm flex items-center justify-center gap-2"
                    >
                      <Check size={16} /> JE VOTE
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}