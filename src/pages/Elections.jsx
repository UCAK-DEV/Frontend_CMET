import { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle, AlertTriangle, FileText, Lock, Loader2 } from 'lucide-react';
import { api } from '../context/UserContext'; // Import de l'instance liée

export default function Elections() {
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showManifesto, setShowManifesto] = useState(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        // Récupère toutes les élections
        const response = await api.get('/api/v1/elections');
        // On sélectionne la première élection ouverte (OPEN)
        const active = response.data.find(e => e.status === 'open') || response.data[0];
        setElection(active);
      } catch (error) {
        console.error("Erreur de chargement des élections", error);
      } finally {
        setLoading(false);
      }
    };
    fetchElections();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) return;
    // Ici, vous pourrez ajouter l'appel API de vote quand il sera prêt sur le back
    setHasVoted(true);
    window.scrollTo(0, 0);
  };

  if (loading) return <div className="pt-40 text-center"><Loader2 className="animate-spin mx-auto" /></div>;
  if (!election) return <div className="pt-40 text-center">Aucune élection disponible.</div>;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-4">{election.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{election.description}</p>
        </div>

        {hasVoted ? (
          <div className="bg-green-50 dark:bg-green-900/20 p-12 rounded-3xl text-center border border-green-200">
            <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />
            <h2 className="text-2xl font-bold text-green-800">Vote enregistré !</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {election.candidates?.map((candidate) => (
              <div 
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate.id)}
                className={`bg-white dark:bg-ucak-dark-card rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedCandidate === candidate.id ? 'border-ucak-green scale-105' : 'border-transparent shadow-lg'
                }`}
              >
                <img src={candidate.photo_url || 'https://via.placeholder.com/400'} alt={candidate.full_name} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{candidate.full_name}</h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowManifesto(showManifesto === candidate.id ? null : candidate.id); }}
                    className="text-xs font-bold text-ucak-blue underline"
                  >
                    Voir le programme
                  </button>
                  {showManifesto === candidate.id && <p className="mt-4 text-xs text-gray-600 italic">{candidate.biography}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasVoted && (
          <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-ucak-dark-card border-t p-4 z-40 shadow-xl">
            <div className="container mx-auto flex justify-center max-w-4xl">
              <button 
                onClick={handleVote}
                disabled={!selectedCandidate}
                className="px-10 py-4 bg-ucak-green text-white rounded-xl font-bold disabled:bg-gray-300"
              >
                Confirmer mon vote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}