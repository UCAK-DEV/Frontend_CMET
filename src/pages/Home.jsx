import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Zap, Briefcase, 
  Quote, Globe, ChevronRight, Newspaper, Calendar, User
} from 'lucide-react';
import presidentImg from '../assets/images/president.jpeg';
import { useUser, api } from '../context/UserContext';

// Nouveaux composants extraits
import VisionSection from '../components/VisionSection';
import DepartmentsList from '../components/DepartmentsList';

export default function Home() {
  const { user } = useUser();
  const [latestNews, setLatestNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get('/api/v1/news');
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestNews(sorted.slice(0, 3));
      } catch (error) {
        console.error("Info: Pas de news", error);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  // Variantes d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="bg-white dark:bg-[#05070a] text-gray-900 dark:text-gray-100 selection:bg-ucak-blue selection:text-white">
      
      {/* --- 1. HERO : ULTRA MODERN --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ucak-blue/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-ucak-green/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md mb-10 shadow-inner"
            >
              <Sparkles size={14} className="text-ucak-gold animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
                L'excellence au cœur des métiers
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.9] tracking-tighter mb-6 md:mb-10"
            >
              CLUB <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-ucak-blue via-ucak-green to-ucak-gold">
                MET
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-sm md:text-2xl font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-ucak-blue dark:text-ucak-gold mb-10 md:mb-16 opacity-80"
            >
              Métiers et Technologies
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
            >
              <Link to={user ? "/dashboard" : "/login"} className="group relative w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-ucak-blue to-ucak-green rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                <button className="relative w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-ucak-blue dark:bg-white text-white dark:text-black font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] md:text-xs transition-transform hover:scale-[1.02] active:scale-95">
                  {user ? "Accéder au Hub" : "Devenir Membre"} <User size={16} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 2. VISION & MISSION (INTEGRATION "ABOUT") --- */}
      <VisionSection />

      {/* --- 3. DÉPARTEMENTS & FORMATIONS (INTEGRATION "ABOUT") --- */}
      <DepartmentsList />

      {/* --- 4. VALEURS & DEVISE --- */}
      <section id="valeurs" className="py-16 md:py-24 px-6 bg-gray-50 dark:bg-[#080a0f]">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 md:mb-20 text-center md:text-left">
             <h2 className="text-3xl md:text-6xl font-black mb-4">La Devise <span className="text-ucak-blue">UCAK</span></h2>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs md:text-sm">L'ADN de notre université</p>
          </div>

          <motion.div 
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
          >
            {/* Savoir Utile */}
            <motion.div variants={itemVariants} className="md:col-span-8 bg-white dark:bg-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 dark:border-white/5 relative overflow-hidden group">
              <Zap className="absolute top-[-20px] right-[-20px] size-32 md:size-40 text-ucak-blue/5 group-hover:rotate-12 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-ucak-blue text-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-ucak-blue/20"><Zap size={20} /></div>
                <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4">Savoir Utile</h3>
                <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">Des connaissances concrètes et applicables qui servent directement le développement de la communauté et du pays.</p>
              </div>
            </motion.div>

            {/* Action Vertueuse */}
            <motion.div variants={itemVariants} className="md:col-span-4 bg-ucak-blue p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-white flex flex-col justify-between group shadow-2xl shadow-ucak-blue/20 min-h-[200px]">
              <ShieldCheck size={40} className="mb-6 opacity-50 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-2xl md:text-3xl font-black mb-2 md:mb-4 leading-none">Action <br/> Vertueuse</h3>
                <p className="text-white/70 font-medium text-xs md:text-base">L'impact positif est notre boussole morale.</p>
              </div>
            </motion.div>

            {/* Conduite Exemplaire */}
            <motion.div variants={itemVariants} className="md:col-span-12 bg-white dark:bg-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-6 md:gap-10 group text-center md:text-left">
               <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-ucak-gold/10 text-ucak-gold rounded-full flex items-center justify-center group-hover:bg-ucak-gold group-hover:text-white transition-all duration-500"><Briefcase size={24} /></div>
               <div>
                  <h3 className="text-2xl md:text-3xl font-black mb-2">Conduite Exemplaire</h3>
                  <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">Incarner l'excellence et la discipline. Nous formons des leaders qui inspirent par leur comportement exemplaire au quotidien.</p>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 5. ACTUALITÉS --- */}
      {(latestNews.length > 0 || loadingNews) && (
        <section className="py-16 md:py-32">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 px-2 md:px-4 gap-4">
               <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Journal du <span className="text-ucak-gold">Club</span></h2>
               <Link to="/news" className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400 hover:text-ucak-gold transition-colors flex items-center gap-2">
                 Archive complète <ChevronRight size={14} />
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {loadingNews ? [1,2,3].map(i => <div key={i} className="h-64 md:h-80 bg-gray-100 dark:bg-white/5 rounded-[2rem] md:rounded-[2.5rem] animate-pulse" />) :
                latestNews.map((news) => (
                  <Link to="/news" key={news.id} className="group bg-white dark:bg-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-ucak-gold/30 transition-all duration-500">
                    <div className="h-40 md:h-48 overflow-hidden bg-gray-100 dark:bg-white/10 relative">
                      {news.imageUrl || news.image_url ? (
                        <img 
                          src={news.imageUrl || news.image_url} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          alt="" 
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://ucak.sn/wp-content/uploads/2023/10/logo-ucak.png"; }} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-ucak-blue/5">
                          <Newspaper size={40} className="text-ucak-blue/20" />
                        </div>
                      )}
                      
                      {news.isExternal && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-ucak-blue px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm">
                          UCAK.sn
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">
                        <Calendar size={12} /> {new Date(news.createdAt).toLocaleDateString()}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold leading-tight group-hover:text-ucak-gold transition-colors line-clamp-2">{news.title}</h3>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </section>
      )}

      {/* --- 6. MOT DU PRÉSIDENT --- */}
      <section className="py-16 md:py-32 px-6 bg-ucak-blue/5 border-t border-ucak-blue/10">
        <div className="container mx-auto max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative order-2 lg:order-1">
                 <div className="absolute -inset-4 bg-ucak-gold/20 rounded-[3rem] blur-2xl"></div>
                 <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl">
                    <img src={presidentImg} alt="Président" className="w-full h-full object-cover" />
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
                       <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-ucak-gold mb-2">Direction du Club</p>
                       <h3 className="text-2xl md:text-4xl font-black">Mame Bara Samb</h3>
                    </div>
                 </div>
              </motion.div>
              
              <div className="space-y-6 md:space-y-10 order-1 lg:order-2">
                 <Quote size={40} className="md:w-[60px] md:h-[60px] text-ucak-blue opacity-20" />
                 <h2 className="text-3xl md:text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter">
                   "Transformer l'apprentissage <span className="text-ucak-blue">en expérience.</span>"
                 </h2>
                 <div className="space-y-4 md:space-y-6 text-base md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                   <p>Nous sommes nés de la volonté des étudiants de l'UFR Métiers et Technologies. Notre mission est simple : créer un pont entre la théorie académique et la réalité professionnelle.</p>
                   <p>À travers nos activités, nous cultivons l'excellence et la solidarité.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- 7. FOOTER PORTAIL --- */}
      <footer className="bg-gray-50 dark:bg-white/5 py-10 px-6 border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
              <Globe className="text-ucak-blue" size={32} />
              <div>
                 <p className="text-sm font-black dark:text-white uppercase tracking-widest">Portail Administratif</p>
                 <p className="text-xs text-gray-500">Visitez le site du CCAK pour les inscriptions.</p>
              </div>
           </div>
           <a href="https://ccak.edu.sn" target="_blank" className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">
             Site Officiel CCAK
           </a>
        </div>
      </footer>
    </div>
  );
}