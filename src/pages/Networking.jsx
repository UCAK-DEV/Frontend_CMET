import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, MapPin, Linkedin, Search, Globe, Building, ArrowRight, MessageCircle, Star, Clock } from 'lucide-react';

export default function Networking() {
  const [activeTab, setActiveTab] = useState('alumni');
  const [searchQuery, setSearchQuery] = useState('');

  // ACTION : Simulation de contact
  const handleContact = (name) => {
    alert(`Votre demande de mise en relation avec ${name} a été envoyée !`);
  };

  const alumni = [
    { 
      id: 1, 
      name: "Sokhna Diarra", 
      role: "DevOps Engineer", 
      company: "Orange", 
      location: "Dakar, SN", 
      promo: "Promo 2021",
      mentor: true,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 2, 
      name: "Mouhamed Ndiaye", 
      role: "CTO", 
      company: "Startup Touba", 
      location: "Touba, SN", 
      promo: "Promo 2019",
      mentor: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 3, 
      name: "Aïda Fall", 
      role: "Auditrice Senior", 
      company: "Deloitte", 
      location: "Paris, FR", 
      promo: "Promo 2020",
      mentor: true,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: 4, 
      name: "Ibrahima Sy", 
      role: "Data Scientist", 
      company: "Google", 
      location: "Londres, UK", 
      promo: "Promo 2018",
      mentor: true,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
  ];

  const jobs = [
    {
      id: 1,
      title: "Stage Développement Web (React/Node)",
      company: "Free Sénégal",
      location: "Dakar",
      type: "Stage",
      date: "Il y a 2 jours",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Free_Logo.svg/1200px-Free_Logo.svg.png"
    },
    {
      id: 2,
      title: "Assistant Comptable",
      company: "CBAO Groupe",
      location: "Touba",
      type: "CDD",
      date: "Aujourd'hui",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Logo_CBAO.jpg"
    },
    {
      id: 3,
      title: "Community Manager (Bénévolat)",
      company: "ONG Education",
      location: "Remote",
      type: "Bénévolat",
      date: "Il y a 1 semaine",
      logo: "https://cdn-icons-png.flaticon.com/512/3061/3061732.png"
    }
  ];

  const filteredAlumni = alumni.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ucak-blue/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ucak-gold font-bold tracking-widest text-xs uppercase mb-2 block">
            Réseau Professionnel
          </motion.span>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-6xl font-black text-ucak-blue dark:text-white mb-6">
            Connectez-vous à <span className="text-ucak-green">l'Avenir</span>
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Rejoignez une communauté de plus de <span className="font-bold text-ucak-blue dark:text-white">1200+ anciens</span> répartis dans <span className="font-bold text-ucak-blue dark:text-white">15 pays</span>.
            Trouvez un mentor, un stage ou un co-fondateur.
          </p>

          <div className="flex justify-center gap-8 mt-8 text-sm font-bold text-gray-500 dark:text-gray-400">
             <div className="flex items-center gap-2"><Globe className="text-ucak-gold"/> 15 Pays</div>
             <div className="flex items-center gap-2"><Building className="text-ucak-gold"/> 80+ Entreprises</div>
             <div className="flex items-center gap-2"><Users className="text-ucak-gold"/> 1200+ Membres</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 sticky top-24 z-20 bg-gray-50/90 dark:bg-ucak-dark/90 backdrop-blur-md py-4">
          <div className="bg-white dark:bg-ucak-dark-card p-1.5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 flex">
            <button onClick={() => setActiveTab('alumni')} className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'alumni' ? 'bg-ucak-blue text-white shadow-md' : 'text-gray-500 hover:text-ucak-blue dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'}`}>
              <Users size={18} /> Annuaire Alumni
            </button>
            <button onClick={() => setActiveTab('jobs')} className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'jobs' ? 'bg-ucak-green text-white shadow-md' : 'text-gray-500 hover:text-ucak-green dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'}`}>
              <Briefcase size={18} /> Offres & Stages
            </button>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input type="text" placeholder={activeTab === 'alumni' ? "Chercher un ancien..." : "Chercher un poste..."} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-blue outline-none dark:text-white text-sm" />
          </div>
        </div>

        {activeTab === 'alumni' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAlumni.map((person) => (
              <div key={person.id} className="group bg-white dark:bg-ucak-dark-card rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                {person.mentor && (
                  <div className="absolute top-0 right-0 bg-ucak-gold text-ucak-dark text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 z-10">
                    <Star size={10} fill="currentColor" /> Mentor
                  </div>
                )}
                <div className="text-center mb-6 relative z-10">
                  <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-br from-ucak-blue to-ucak-green mb-4">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover rounded-full border-4 border-white dark:border-ucak-dark-card" />
                  </div>
                  <h3 className="font-bold text-lg text-ucak-blue dark:text-white">{person.name}</h3>
                  <p className="text-sm text-ucak-green font-medium mb-1">{person.role}</p>
                  <p className="text-xs text-gray-400">{person.company}</p>
                </div>
                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400 mb-6 relative z-10 bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                   <div className="flex items-center gap-2"><MapPin size={14} className="text-ucak-gold"/> {person.location}</div>
                   <div className="flex items-center gap-2"><Building size={14} className="text-ucak-gold"/> {person.promo}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 relative z-10">
                   <button className="flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold transition-colors">
                      <Linkedin size={14} /> Profil
                   </button>
                   <button 
                      onClick={() => handleContact(person.name)}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-ucak-blue/10 text-ucak-blue dark:text-white dark:bg-ucak-blue hover:bg-ucak-blue hover:text-white text-xs font-bold transition-colors"
                   >
                      <MessageCircle size={14} /> Contacter
                   </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ucak-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'jobs' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:border-ucak-green/50 hover:shadow-lg transition-all flex flex-col md:flex-row items-center gap-6 group">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm p-2 flex items-center justify-center flex-shrink-0">
                   <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-grow text-center md:text-left">
                   <h3 className="font-bold text-lg text-ucak-blue dark:text-white group-hover:text-ucak-green transition-colors">{job.title}</h3>
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500 mt-1">
                      <span className="font-bold text-gray-700 dark:text-gray-300">{job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {job.date}</span>
                   </div>
                </div>
                <div className="flex flex-col items-end gap-3 min-w-[140px]">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.type === 'Stage' ? 'bg-purple-100 text-purple-700' : job.type === 'CDD' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{job.type}</span>
                   <button className="text-ucak-blue dark:text-white font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Voir l'offre <ArrowRight size={16}/>
                   </button>
                </div>
              </div>
            ))}
            <div className="mt-12 bg-gradient-to-r from-ucak-blue to-ucak-dark rounded-2xl p-8 text-center text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Vous recrutez ?</h3>
                  <p className="text-white/80 mb-6">Partagez vos offres de stage ou d'emploi directement avec les talents de l'UFR MET.</p>
                  <button className="bg-white text-ucak-blue px-8 py-3 rounded-full font-bold hover:bg-ucak-gold hover:text-ucak-dark transition-colors shadow-lg">Publier une offre</button>
               </div>
               <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}