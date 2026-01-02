import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Clock, Tag, ChevronRight, Bell } from 'lucide-react';

export default function News() {
  const [activeTab, setActiveTab] = useState('tous'); // 'tous', 'tech', 'hec', 'social'

  // --- DONNÉES SIMULÉES ---

  // 1. Événement Principal (Hero)
  const featuredEvent = {
    id: 1,
    title: "Grand Magal Tech 2025 : Bilan et Perspectives",
    date: "15 Octobre 2025",
    category: "Événement Majeur",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    desc: "Retour sur 48h d'innovation au service de la ville sainte. Plus de 50 projets présentés devant le jury, alliant technologie et valeurs mourides."
  };

  // 2. Agenda (Prochains événements)
  const upcomingEvents = [
    { id: 1, title: "Conférence : Finance Islamique & Fintech", date: "22 Jan", time: "15:00", location: "Amphi A", type: "HEC" },
    { id: 2, title: "Workshop : Introduction à Docker", date: "25 Jan", time: "09:00", location: "Salle Info 2", type: "Tech" },
    { id: 3, title: "Journée d'Intégration UFR MET", date: "01 Fév", time: "08:00", location: "Campus Social", type: "Social" },
  ];

  // 3. Articles Récents
  const articles = [
    {
      id: 1,
      title: "Visite de l'entreprise Orange Sénégal",
      date: "10 Janvier 2026",
      category: "HEC",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
      excerpt: "Les étudiants de Licence 3 Gestion ont pu découvrir les infrastructures et la stratégie commerciale de l'opérateur."
    },
    {
      id: 2,
      title: "Lancement du Club Cyber-Sécurité",
      date: "05 Janvier 2026",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      excerpt: "Un nouveau pôle dédié à la sécurité offensive et défensive voit le jour au sein du département informatique."
    },
    {
      id: 3,
      title: "Distribution de Ndogou Solidaire",
      date: "Ramadan 2025",
      category: "Social",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
      excerpt: "Retour en images sur l'action sociale menée par le bureau des étudiants durant le mois béni."
    }
  ];

  // Filtrage des articles
  const filteredArticles = activeTab === 'tous' 
    ? articles 
    : articles.filter(a => a.category.toLowerCase().includes(activeTab));

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6">
        
        {/* EN-TÊTE */}
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ucak-gold font-bold tracking-widest text-xs uppercase mb-2 block">
            Actualités & Agenda
          </motion.span>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mb-4">
            La Vie du <span className="text-ucak-green">Club</span>
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Restez informés des événements, des opportunités et des actions menées par le bureau.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* --- GAUCHE : À LA UNE (Featured) --- */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-ucak-blue dark:text-white mb-6 flex items-center gap-2">
               <Tag className="text-ucak-gold"/> À la Une
            </h2>
            <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
              <img 
                src={featuredEvent.image} 
                alt={featuredEvent.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ucak-blue via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="bg-ucak-green text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                  {featuredEvent.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                  {featuredEvent.title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base max-w-lg mb-4 line-clamp-2">
                  {featuredEvent.desc}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-ucak-gold">
                   <span className="flex items-center gap-1"><Calendar size={16}/> {featuredEvent.date}</span>
                   <button className="flex items-center gap-1 hover:underline ml-auto text-white">Lire l'article <ArrowRight size={16}/></button>
                </div>
              </div>
            </div>
          </div>

          {/* --- DROITE : AGENDA (Upcoming) --- */}
          <div className="lg:col-span-1">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-ucak-blue dark:text-white flex items-center gap-2">
                   <Calendar className="text-ucak-green"/> Agenda
                </h2>
                <button className="text-xs font-bold text-ucak-green hover:underline">Voir tout</button>
             </div>

             <div className="space-y-4">
                {upcomingEvents.map((evt) => (
                  <div key={evt.id} className="bg-white dark:bg-ucak-dark-card p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                    <div className="flex gap-4">
                       {/* Date Box */}
                       <div className="flex-shrink-0 w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center border border-gray-200 dark:border-gray-600 group-hover:border-ucak-gold transition-colors">
                          <span className="text-xl font-black text-ucak-blue dark:text-white">{evt.date.split(' ')[0]}</span>
                          <span className="text-[10px] font-bold uppercase text-gray-500">{evt.date.split(' ')[1]}</span>
                       </div>
                       
                       {/* Infos */}
                       <div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                             evt.type === 'HEC' ? 'bg-purple-100 text-purple-700' :
                             evt.type === 'Tech' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                             {evt.type}
                          </span>
                          <h3 className="font-bold text-gray-800 dark:text-white mt-1 leading-tight group-hover:text-ucak-green transition-colors">{evt.title}</h3>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                             <span className="flex items-center gap-1"><Clock size={12}/> {evt.time}</span>
                             <span className="flex items-center gap-1"><MapPin size={12}/> {evt.location}</span>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}

                {/* Newsletter Box */}
                <div className="bg-gradient-to-br from-ucak-blue to-ucak-dark rounded-2xl p-6 text-center border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-ucak-gold rounded-full blur-2xl opacity-20"></div>
                   <Bell className="w-8 h-8 text-ucak-gold mx-auto mb-2" />
                   <p className="text-sm font-bold text-white mb-2">Ne manquez rien !</p>
                   <p className="text-xs text-gray-300 mb-4">Recevez les notifications des prochains événements directement par mail.</p>
                   <button className="bg-white text-ucak-blue px-6 py-2 rounded-lg text-xs font-bold hover:bg-ucak-gold hover:text-ucak-dark transition-colors w-full">
                      M'abonner
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* --- SECTION ARTICLES --- */}
        <div className="mb-8">
           <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-2xl font-bold text-ucak-blue dark:text-white mb-4 md:mb-0">Derniers Articles</h2>
              
              {/* Filtres simples */}
              <div className="flex gap-2">
                 {['tous', 'tech', 'hec', 'social'].map(filter => (
                    <button 
                      key={filter}
                      onClick={() => setActiveTab(filter)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                         activeTab === filter 
                         ? 'bg-ucak-blue text-white' 
                         : 'bg-white dark:bg-ucak-dark-card text-gray-500 border border-gray-200 dark:border-gray-700 hover:bg-gray-100'
                      }`}
                    >
                       {filter}
                    </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                 <motion.div 
                   key={article.id}
                   initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                   className="bg-white dark:bg-ucak-dark-card rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all group cursor-pointer"
                 >
                    <div className="h-48 overflow-hidden relative">
                       <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-ucak-blue text-xs font-bold px-3 py-1 rounded-full">
                          {article.category}
                       </div>
                    </div>
                    <div className="p-6">
                       <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                          <Calendar size={12}/> {article.date}
                       </div>
                       <h3 className="font-bold text-lg text-ucak-blue dark:text-white mb-3 line-clamp-2 group-hover:text-ucak-green transition-colors">
                          {article.title}
                       </h3>
                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                          {article.excerpt}
                       </p>
                       <button className="text-ucak-gold font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                          Lire la suite <ChevronRight size={16}/>
                       </button>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}