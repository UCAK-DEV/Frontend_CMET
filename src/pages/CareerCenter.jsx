import { useState } from 'react';
import { 
  Briefcase, MapPin, Building2, Calendar, 
  Search, Filter, ArrowUpRight, CheckCircle,
  TrendingUp, Star, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CareerCenter() {
  const [filter, setFilter] = useState('Tous');

  const jobs = [
    {
      id: 1,
      title: "Stagiaire Développeur Web Fullstack",
      company: "Touba Tech Solutions",
      location: "Touba, Sénégal",
      type: "Stage (3-6 mois)",
      category: "Informatique",
      date: "Il y a 2 jours",
      desc: "Participez au développement de solutions numériques pour les entreprises locales."
    },
    {
      id: 2,
      title: "Assistant Analyste Financier",
      company: "Banque Islamique (Bdk)",
      location: "Dakar, Sénégal",
      type: "Stage de fin d'études",
      category: "HEC",
      date: "Il y a 5 jours",
      desc: "Support à l'analyse de dossiers de financement et gestion de portefeuille."
    },
    {
      id: 3,
      title: "Junior Data Scientist",
      company: "Orange Digital Center",
      location: "Dakar / Remote",
      type: "Stage rémunéré",
      category: "Informatique",
      date: "Aujourd'hui",
      desc: "Analyse de données massives et création de modèles prédictifs."
    }
  ];

  const filteredJobs = filter === 'Tous' ? jobs : jobs.filter(j => j.category === filter);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* HEADER SECTION */}
        <div className="mb-12">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="text-ucak-green font-black text-xs uppercase tracking-[0.3em] block mb-4">
              Career Center
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-ucak-blue dark:text-white mb-6 leading-none">
              Propulsez votre <br/><span className="text-ucak-gold">Carrière</span> Professionnelle.
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl">
              Accédez aux meilleures opportunités de stages et d'emplois sélectionnées spécifiquement pour les étudiants de l'UFR MET.
            </p>
          </motion.div>
        </div>

        {/* RECHERCHE ET FILTRES */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" placeholder="Rechercher un métier, une entreprise..." 
              className="w-full pl-12 p-4 bg-white dark:bg-ucak-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 outline-none focus:ring-2 focus:ring-ucak-blue transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
             {['Tous', 'Informatique', 'HEC'].map(f => (
               <button 
                key={f} onClick={() => setFilter(f)}
                className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-ucak-blue text-white' : 'bg-white dark:bg-ucak-dark-card text-gray-400 border border-gray-100 dark:border-gray-800'}`}
               >
                 {f}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LISTE DES OFFRES (2/3 de l'écran) */}
          <div className="lg:col-span-2 space-y-6">
            {filteredJobs.map((job) => (
              <motion.div 
                layout key={job.id}
                className="group bg-white dark:bg-ucak-dark-card p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-ucak-blue group-hover:bg-ucak-blue group-hover:text-white transition-colors duration-500">
                         <Building2 size={28} />
                      </div>
                      <div>
                         <h3 className="text-xl font-black text-gray-800 dark:text-white group-hover:text-ucak-blue transition-colors">
                            {job.title}
                         </h3>
                         <p className="text-sm font-bold text-gray-400">{job.company}</p>
                      </div>
                   </div>
                   <span className="text-[10px] font-black bg-ucak-gold/10 text-ucak-gold px-3 py-1 rounded-full uppercase">
                      {job.type}
                   </span>
                </div>

                <div className="flex flex-wrap gap-6 mb-6">
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={14} className="text-ucak-green" /> {job.location}
                   </div>
                   <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={14} className="text-ucak-green" /> {job.date}
                   </div>
                </div>

                <p className="text-gray-500 text-sm mb-8 leading-relaxed">{job.desc}</p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
                   <button className="text-sm font-black text-ucak-blue flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      Voir les détails <ArrowUpRight size={16} />
                   </button>
                   <button className="px-8 py-3 bg-ucak-green text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-green-500/20 hover:scale-105 transition-transform">
                      Postuler
                   </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BARRE LATÉRALE (1/3 de l'écran) */}
          <div className="space-y-6">
             <div className="bg-ucak-blue p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                <TrendingUp className="absolute bottom-0 right-0 opacity-10 w-32 h-32" />
                <h3 className="text-xl font-black mb-4 uppercase">Coaching MET</h3>
                <p className="text-sm opacity-80 mb-6 leading-relaxed italic">
                  "Un bon CV est votre premier pas vers la réussite. Utilisez notre générateur pour un rendu pro."
                </p>
                <button className="w-full py-4 bg-white text-ucak-blue rounded-xl font-black text-xs uppercase tracking-widest">
                   Prendre RDV
                </button>
             </div>

             <div className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2">
                   <Star className="text-ucak-gold" size={16} /> Top Compétences
                </h3>
                <div className="flex flex-wrap gap-2">
                   {['React', 'Excel Pro', 'Finances', 'IA', 'Cyber'].map(s => (
                     <span key={s} className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 rounded-lg text-[10px] font-bold text-gray-500">
                       {s}
                     </span>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}