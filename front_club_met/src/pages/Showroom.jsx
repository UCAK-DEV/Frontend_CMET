import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Github, ExternalLink, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Showroom() {
  const [activeTab, setActiveTab] = useState('talents');

  // Données Talents (Mixte Informatique & Gestion)
  const talents = [
    { id: 1, name: "Moussa Diop", role: "Dev Fullstack", skills: ["React", "Node.js"], promo: "L3 Informatique" },
    { id: 2, name: "Aïssatou Sow", role: "Marketer Digital", skills: ["SEO", "Stratégie", "Canva"], promo: "M1 Marketing (HEC)" },
    { id: 3, name: "Cheikh Lo", role: "Analyste Financier", skills: ["Audit", "Excel", "Finance"], promo: "L3 Gestion" },
    { id: 4, name: "Fatou Ndiaye", role: "Designer UX/UI", skills: ["Figma", "Tailwind"], promo: "M1 Multimédia" },
  ];

  // Données Projets (Avec Images)
  const projects = [
    { 
      id: 1, 
      title: "Smart Touba App", 
      category: "Mobile", 
      desc: "Application de guide pour le Grand Magal avec géolocalisation.", 
      author: "Team Tech",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      id: 2, 
      title: "Plan Stratégique", 
      category: "Consulting", 
      desc: "Audit organisationnel et optimisation des processus pour une PME.", 
      author: "Club HEC",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      id: 3, 
      title: "DaraaConnect", 
      category: "Social", 
      desc: "Plateforme de mise en relation des écoles coraniques modernes.", 
      author: "Fatou N.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
    },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* En-tête */}
        <div className="text-center mb-12">
            <span className="text-ucak-gold font-bold tracking-widest text-xs uppercase mb-2 block">Portfolis UCAK</span>
            <h1 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mb-4">
              Vitrine des <span className="text-ucak-green">Talents</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Ingénieurs, Managers et Créatifs de l'UCAK.</p>
        </div>

        {/* Contrôles */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
           {/* Barre de recherche */}
           <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Rechercher un profil ou un projet..." 
              className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-ucak-dark-card/80 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ucak-gold text-ucak-blue dark:text-white"
            />
          </div>

          {/* Onglets */}
          <div className="bg-gray-100 dark:bg-ucak-dark-card p-1 rounded-xl flex">
            {['talents', 'projects'].map((tab) => (
                <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === tab 
                    ? 'bg-white dark:bg-ucak-green text-ucak-blue dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                }`}
                >
                {tab === 'talents' ? 'Annuaire Talents' : 'Galerie Projets'}
                </button>
            ))}
          </div>
        </div>

        {/* --- LISTE DES PROJETS (AVEC PHOTOS) --- */}
        {activeTab === 'projects' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <div key={project.id} className="group rounded-2xl overflow-hidden bg-white dark:bg-ucak-dark-card border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                        {project.category}
                    </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-ucak-blue dark:text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.desc}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-ucak-green">Par {project.author}</span>
                    <Link to={`/project/${project.id}`} className="text-ucak-gold text-sm font-bold hover:underline">Voir Détails</Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* --- LISTE DES TALENTS --- */}
        {activeTab === 'talents' && (
             <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
             className="grid grid-cols-1 md:grid-cols-3 gap-6"
           >
             {talents.map((talent) => (
               <div key={talent.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 hover:border-ucak-gold transition-colors">
                 <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-bold text-ucak-blue dark:text-white">
                    {talent.name.charAt(0)}
                 </div>
                 <div>
                    <h3 className="font-bold text-ucak-blue dark:text-white">{talent.name}</h3>
                    <p className="text-sm text-ucak-green">{talent.role}</p>
                    <div className="text-xs text-gray-400 mt-1">{talent.promo}</div>
                 </div>
               </div>
             ))}
           </motion.div>
        )}

      </div>
    </div>
  );
}