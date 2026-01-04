import { useUser } from '../context/UserContext';
import { Linkedin, ExternalLink, Users, Briefcase, Globe } from 'lucide-react';

export default function Networking() {
  const { user } = useUser(); //

  // Construction d'une URL de recherche Alumni LinkedIn intelligente
  const alumniSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=UCAK%20${user?.filiere}`;

  const networkingTips = [
    { title: "Optimisez votre Profil", desc: "Assurez-vous que votre photo est professionnelle et que votre titre mentionne l'UFR MET." },
    { title: "Connectez-vous aux Alumni", desc: "Utilisez le bouton ci-dessous pour trouver des anciens étudiants déjà en poste." }
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
                Le networking est la clé du succès. Nous vous facilitons l'accès aux professionnels de votre secteur.
             </p>

             <div className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl relative overflow-hidden">
                <Linkedin size={120} className="absolute -right-10 -bottom-10 opacity-5 text-blue-600" />
                <h2 className="text-2xl font-black mb-4">Rechercher des Alumni sur LinkedIn</h2>
                <p className="text-gray-500 mb-8 max-w-md">
                   Nous avons préparé une recherche filtrée pour trouver des diplômés de l'UCAK spécialisés en <strong>{user?.filiere}</strong>.
                </p>
                <a 
                  href={alumniSearchUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#0077b5] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl transition-all"
                >
                   Ouvrir LinkedIn MET <ExternalLink size={18} />
                </a>
             </div>
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