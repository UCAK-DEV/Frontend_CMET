import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { Vote, CheckCircle2, User, Lock } from 'lucide-react';

export default function Elections() {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/v1/elections');
        // On ne garde que les élections ouvertes ou fermées (pas les brouillons si on veut)
        const publicElections = res.data.filter(e => e.status !== 'draft');
        setElections(publicElections);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen pt-32 text-center text-gray-500">Chargement des scrutins...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ucak-blue/10 text-ucak-blue rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Lock size={12} /> Zone Sécurisée Blockchain
          </div>
          <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-2">Espace Électoral</h1>
          <p className="text-gray-500">Participez à la vie démocratique de l'université.</p>
        </div>

        {elections.length === 0 ? (
          <div className="bg-white dark:bg-ucak-dark-card p-12 rounded-[2.5rem] text-center shadow-xl border border-gray-100 dark:border-white/5 max-w-2xl mx-auto">
            <Vote size={64} className="mx-auto mb-6 text-gray-300" />
            <h3 className="text-xl font-bold mb-2">Aucun vote en cours</h3>
            <p className="text-gray-500">Il n'y a pas d'élection active pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {elections.map(election => (
              <div key={election.id} className="bg-white dark:bg-ucak-dark-card rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5">
                {/* Header Élection */}
                <div className="bg-ucak-blue p-8 text-white flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black mb-1">{election.title}</h2>
                    <p className="opacity-80 text-sm max-w-xl">{election.description || "Faites entendre votre voix."}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${election.status === 'open' ? 'bg-white text-ucak-blue' : 'bg-red-500 text-white'}`}>
                    {election.status === 'open' ? 'Vote Ouvert' : 'Terminé'}
                  </div>
                </div>

                {/* Liste Candidats */}
                <div className="p-8">
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-6">Candidats en lice</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {election.candidates && election.candidates.length > 0 ? (
                      election.candidates.map(candidate => (
                        <div key={candidate.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-ucak-blue/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all group cursor-pointer">
                          <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-white/10 flex items-center justify-center text-2xl font-black text-gray-400 overflow-hidden">
                            {candidate.photo_url ? <img src={candidate.photo_url} alt="" className="w-full h-full object-cover"/> : candidate.full_name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-800 dark:text-white">{candidate.full_name}</h4>
                            <p className="text-xs text-gray-500 line-clamp-1">{candidate.biography}</p>
                          </div>
                          {election.status === 'open' && (
                            <button className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-white/20 flex items-center justify-center text-gray-300 group-hover:bg-ucak-blue group-hover:border-ucak-blue group-hover:text-white transition-all">
                              <CheckCircle2 size={20} />
                            </button>
                          )}
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
      </div>
    </div>
  );
}