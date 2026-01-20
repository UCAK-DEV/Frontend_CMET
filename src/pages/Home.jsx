import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Zap, LayoutDashboard, Briefcase, 
  ExternalLink, Quote, Globe, ChevronRight, Newspaper, Calendar, ArrowRight, User
} from 'lucide-react';
import presidentImg from '../assets/images/president.jpeg';
import { useUser, api } from '../context/UserContext';

export default function Home() {
  const { user } = useUser();
  const [latestNews, setLatestNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // --- RÉCUPÉRATION DES NEWS ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/news');
        // Tri par date décroissante
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestNews(sorted.slice(0, 3));
      } catch (error) {
        console.error("Info: Pas de news ou backend éteint", error);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="overflow-hidden bg-gray-50 dark:bg-ucak-dark transition-colors duration-300">
      
      {/* === 1. HERO SECTION === */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 min-h-[90vh] flex items-center bg-white dark:bg-ucak-dark">
        <div className="absolute inset-0 ucak-pattern opacity-20 pointer-events-none"></div>
        {/* Glow effect ajusté pour mobile */}
        <div className="absolute top-20 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-ucak-green/10 rounded-full blur-[80px] md:blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          
          {/* Tagline modifiée */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 md:gap-3 py-2 px-4 md:px-6 rounded-full bg-white/40 dark:bg-ucak-dark-card/40 border border-ucak-gold/20 backdrop-blur-xl text-ucak-blue dark:text-ucak-gold font-black text-[10px] md:text-xs mb-8 md:mb-10 uppercase tracking-[0.15em] shadow-xl"
          >
            <Sparkles size={12} className="animate-pulse shrink-0" /> <span>L'EXCELLENCE AU CŒUR DES MÉTIERS</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[7rem] font-black text-ucak-blue dark:text-white mb-6 md:mb-8 leading-[0.95] md:leading-[0.9] tracking-tighter"
          >
            CLUB <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green via-ucak-gold to-ucak-green bg-[length:200%_auto] animate-gradient-x">
              MET
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-4xl mx-auto mb-10 md:mb-14">
            <h2 className="text-lg md:text-2xl font-bold text-ucak-blue dark:text-gray-200 uppercase tracking-widest mb-4">
              Métiers et Technologies
            </h2>
          </motion.div>

          {/* === BOUTONS OPTIMISÉS MOBILE (UX) === */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-sm mx-auto sm:max-w-none mb-16 md:mb-24">
            
            {/* Bouton Principal (Action) */}
            <Link to={user ? "/dashboard" : "/login"} className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 bg-ucak-blue dark:bg-ucak-green text-white font-black rounded-2xl shadow-lg shadow-ucak-blue/30 dark:shadow-ucak-green/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                {user ? (
                  <>Accéder au Club <LayoutDashboard size={18} /></>
                ) : (
                  <>Espace Membre <User size={18} /></>
                )}
              </button>
            </Link>
            
            {/* Bouton Secondaire (Info) */}
            <a href="#valeurs" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 bg-white/50 dark:bg-white/5 text-ucak-blue dark:text-white border border-gray-200 dark:border-white/10 font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 active:scale-95 transition-all backdrop-blur-md uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                Découvrir l'UFR <ChevronRight size={16} />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* === 2. PILIERS (DEVISE UCAK) === */}
      <section id="valeurs" className="py-20 bg-gray-50 dark:bg-ucak-dark-card/20 relative border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
             <span className="text-ucak-green font-black text-xs uppercase tracking-[0.5em] block mb-4">Notre Identité</span>
             <h2 className="text-3xl md:text-4xl font-black text-ucak-blue dark:text-white">La Devise de l'UCAK</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Pilier 1 : Savoir Utile */}
            <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="w-14 h-14 bg-ucak-blue/10 rounded-2xl flex items-center justify-center mb-6 text-ucak-blue"><Zap size={28} /></div>
              <h3 className="text-xl font-black text-ucak-blue dark:text-white mb-3">Savoir Utile</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
                Des connaissances concrètes et applicables qui servent directement le développement de la communauté et du pays.
              </p>
            </motion.div>

            {/* Pilier 2 : Action Vertueuse (Mis en avant) */}
            <motion.div whileHover={{ y: -10 }} className="bg-ucak-blue p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group text-white ring-4 ring-ucak-blue/10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white"><ShieldCheck size={28} /></div>
              <h3 className="text-xl font-black mb-3">Action Vertueuse</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Agir avec éthique, bienveillance et responsabilité. L'impact positif est notre boussole morale.
              </p>
            </motion.div>

            {/* Pilier 3 : Conduite Exemplaire */}
            <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="w-14 h-14 bg-ucak-gold/10 rounded-2xl flex items-center justify-center mb-6 text-ucak-gold"><Briefcase size={28} /></div>
              <h3 className="text-xl font-black text-ucak-blue dark:text-white mb-3">Conduite Exemplaire</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
                Incarner l'excellence et la discipline. Nous formons des leaders qui inspirent par leur comportement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === ACTUALITÉS DYNAMIQUES === */}
      {(latestNews.length > 0 || loadingNews) && (
        <section className="py-20 bg-white dark:bg-[#0b0f19] border-t border-gray-100 dark:border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-ucak-gold font-black text-xs uppercase tracking-[0.5em] block mb-2">En Direct</span>
                <h2 className="text-3xl md:text-4xl font-black text-ucak-blue dark:text-white">Dernières Actualités</h2>
              </div>
              <Link to="/news" className="hidden md:flex items-center gap-2 text-ucak-blue dark:text-ucak-gold font-bold hover:underline text-sm">
                Voir tout <ArrowRight size={16}/>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loadingNews ? (
                [1,2,3].map(i => <div key={i} className="h-64 bg-gray-100 dark:bg-white/5 rounded-3xl animate-pulse"/>)
              ) : (
                latestNews.map((news) => (
                  <Link to="/news" key={news.id} className="group block bg-gray-50 dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 hover:shadow-xl transition-all hover:-translate-y-1">
                     <div className="h-40 bg-gray-200 dark:bg-white/10 relative overflow-hidden">
                        {news.image_url ? (
                          <img src={news.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><Newspaper size={32}/></div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {news.type || 'INFO'}
                        </div>
                     </div>
                     <div className="p-6">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-3">
                           <Calendar size={12}/> {new Date(news.createdAt || Date.now()).toLocaleDateString()}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-ucak-blue transition-colors line-clamp-2">
                          {news.title}
                        </h3>
                     </div>
                  </Link>
                ))
              )}
            </div>
            
            {/* Bouton "Voir tout" Mobile */}
            <div className="mt-8 text-center md:hidden">
                <Link to="/news" className="w-full px-6 py-3 bg-gray-100 dark:bg-white/5 rounded-xl text-ucak-blue dark:text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                    Toute l'actualité <ArrowRight size={14}/>
                </Link>
            </div>
          </div>
        </section>
      )}

      {/* === MOT DU PRÉSIDENT === */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-ucak-dark border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              <div className="w-full md:w-2/5">
                 <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] group">
                    <img src={presidentImg} alt="Président" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ucak-blue/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                       <h3 className="text-3xl font-black mb-1">Mame Bara Samb</h3>
                       <p className="opacity-90 text-xs font-bold tracking-widest uppercase text-ucak-gold">Président du Club MET</p>
                    </div>
                 </div>
              </div>
              <div className="w-full md:w-3/5">
                 <Quote size={48} className="text-ucak-gold/20 mb-6" />
                 <h2 className="text-3xl md:text-5xl font-black text-ucak-blue dark:text-white mb-8 leading-none tracking-tighter">
                   "Le Club MET est l'âme de l'UFR."
                 </h2>
                 <div className="prose dark:prose-invert text-lg text-gray-600 dark:text-gray-300 space-y-6 leading-relaxed italic text-justify">
                   <p>Nous sommes nés de la volonté des étudiants de l'UFR Métiers et Technologies. Notre mission est simple : créer un pont entre la théorie académique et la réalité professionnelle.</p>
                   <p>À travers nos activités, nous cultivons l'excellence et la solidarité.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* === FOOTER LINKS === */}
      <section className="py-12 px-6 bg-gray-100 dark:bg-white/5">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-white dark:bg-white/10 rounded-xl text-gray-500 hidden md:block">
               <Globe size={24} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Portail Administratif Officiel</h3>
               <p className="text-xs text-gray-500 dark:text-gray-400">Pour les inscriptions et bourses, visitez le site du CCAK.</p>
             </div>
          </div>
          <a href="https://ccak.edu.sn" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center justify-center gap-2 shadow-lg">
             Site Officiel CCAK <ExternalLink size={14}/>
          </a>
        </div>
      </section>

    </div>
  );
}