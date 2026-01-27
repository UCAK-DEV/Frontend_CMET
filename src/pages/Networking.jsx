import { useState, useEffect } from 'react';
import { api, useUser } from '../context/UserContext';
import { Linkedin, ExternalLink, Users, Briefcase, Globe, Search, Loader2 } from 'lucide-react';

export default function Networking() {
  const { user } = useUser();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await api.get('/api/v1/network/alumni');
        setAlumni(res.data);
      } catch (err) {
        console.error("Erreur chargement alumni:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  const filteredAlumni = alumni.filter(p => 
    p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const networkingTips = [
    { title: "Optimisez votre Profil", desc: "Assurez-vous que votre photo est professionnelle et que votre titre mentionne l'UFR MET." },
    { title: "Connectez-vous aux Alumni", desc: "Utilisez la liste ci-contre pour trouver des anciens étudiants déjà en poste." }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
             <h1 className="text-5xl font-black text-ucak-blue dark:text-white mb-6 tracking-tighter">
                Étendre mon <span className="text-ucak-green">Réseau</span>
             </h1>
             <p className="text-lg text-gray-500 mb-12">
                Le networking est la clé du succès. Retrouvez ici les anciens de l'UFR MET.
             </p>

             <div className="mb-8 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  placeholder="Rechercher un mentor, un ancien..." 
                  className="w-full pl-12 pr-6 py-4 bg-white dark:bg-ucak-dark-card rounded-2xl border border-gray-100 dark:border-white/10 outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white font-bold"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             {loading ? (
               <div className="text-center py-20"><Loader2 className="animate-spin text-ucak-blue mx-auto" /></div>
             ) : (
               <div className="grid gap-4">
                 {filteredAlumni.map((person) => (
                   <div key={person.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-ucak-blue/10 rounded-full flex items-center justify-center text-ucak-blue font-black text-lg">
                          {person.full_name?.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold dark:text-white">{person.full_name}</h4>
                          <p className="text-xs text-gray-500">{person.job_title || "Ancien Étudiant"} {person.company && `@ ${person.company}`}</p>
                        </div>
                      </div>
                      <a href={person.linkedin_url || "#"} target="_blank" rel="noreferrer" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Linkedin size={20} />
                      </a>
                   </div>
                 ))}
                 {filteredAlumni.length === 0 && (
                   <p className="text-center text-gray-400 py-10">Aucun résultat trouvé.</p>
                 )}
               </div>
             )}
          </div>

          <div className="space-y-6">
             <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Conseils Networking</h3>
             {networkingTips.map((tip, i) => (
               <div key={i} className="bg-white dark:bg-ucak-dark-card p-6 rounded-2xl border border-gray-50 dark:border-gray-800">
                  <h4 className="font-black text-ucak-blue dark:text-white mb-2">{tip.title}</h4>
                  <p className="text-sm text-gray-500">{tip.desc}</p>
               </div>
             ))}
          </div>

        </div>
      </div>
    </div>
  );
}