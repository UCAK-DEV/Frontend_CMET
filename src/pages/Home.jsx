import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Zap, LayoutDashboard, Briefcase, 
  ExternalLink, Quote, Globe, ChevronRight
} from 'lucide-react';
import banner from '../assets/images/banner.svg';
import presidentImg from '../assets/images/president.jpeg';
import { useUser } from '../context/UserContext';

export default function Home() {
  const { user } = useUser();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Effet parallaxe

  return (
    <div className="overflow-hidden bg-gray-50 dark:bg-ucak-dark">
      
      {/* === 1. HERO SECTION AVEC BANNIÈRE PRO === */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        
        {/* IMAGE BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ucak-dark/80 via-ucak-dark/60 to-ucak-dark z-10"></div>
          <img src={banner} alt="Campus UFR" className="w-full h-full object-cover scale-105" />
        </div>

        {/* CONTENU */}
        <div className="container mx-auto px-6 text-center relative z-20 pt-20">
          <motion.div style={{ y }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            <div className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-xs mb-10 uppercase tracking-[0.2em] shadow-2xl">
              <Sparkles size={14} className="text-ucak-gold animate-pulse" /> <span>Excellence • Innovation • Leadership</span>
            </div>

            <h1 className="text-6xl md:text-[7rem] font-black text-white mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">
              UFR <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-gold via-white to-ucak-gold">
                MET
              </span>
            </h1>

            <div className="max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl font-bold text-gray-200 uppercase tracking-widest mb-4">Métiers, Économie et Technologies</h2>
              <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed italic drop-shadow-lg">
                "De l'Ingénierie Informatique aux Hautes Études Commerciales, nous formons l'élite technique de demain."
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6">
              {user ? (
                <Link to="/dashboard">
                  <button className="px-10 py-5 bg-ucak-blue text-white font-black rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:bg-ucak-green hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                    Accéder au Club MET <LayoutDashboard size={18} />
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="px-10 py-5 bg-ucak-blue text-white font-black rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:bg-ucak-green hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                    Rejoindre le Club MET <ChevronRight size={18} />
                  </button>
                </Link>
              )}
              
              <a href="#ufr-met">
                <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black rounded-2xl hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
                  Découvrir l'UFR
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === 2. PILIERS (Valeurs) === */}
      <section id="ufr-met" className="py-24 bg-gray-50 dark:bg-ucak-dark-card/20 relative border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <span className="text-ucak-green font-black text-xs uppercase tracking-[0.5em] block mb-4">Nos Valeurs</span>
             <h2 className="text-4xl font-black text-ucak-blue dark:text-white">L'Esprit UFR MET</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -15 }} className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="w-16 h-16 bg-ucak-blue/10 rounded-2xl flex items-center justify-center mb-8 text-ucak-blue"><Zap size={32} /></div>
              <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-4">Savoir Utile</h3>
              <p className="text-gray-500 dark:text-gray-300 leading-relaxed mb-6">Des enseignements concrets en Sciences, Technologie et Gestion pour servir directement le développement économique.</p>
            </motion.div>
            <motion.div whileHover={{ y: -15 }} className="bg-ucak-blue p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-white"><ShieldCheck size={32} /></div>
              <h3 className="text-2xl font-black mb-4">Action Vertueuse</h3>
              <p className="text-white/80 leading-relaxed mb-6">L'éthique et la rigueur morale sont au cœur de notre pédagogie. Nous formons des cadres intègres.</p>
            </motion.div>
            <motion.div whileHover={{ y: -15 }} className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="w-16 h-16 bg-ucak-gold/10 rounded-2xl flex items-center justify-center mb-8 text-ucak-gold"><Briefcase size={32} /></div>
              <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-4">Leadership</h3>
              <p className="text-gray-500 dark:text-gray-300 leading-relaxed mb-6">Entrepreneuriat, innovation et prise de responsabilité. Le Club MET est l'incubateur de vos talents.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === 3. MOT DU PRÉSIDENT === */}
      <section className="py-24 px-6 bg-white dark:bg-ucak-dark border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-2/5">
                 <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] group">
                    <img src={presidentImg} alt="Président" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ucak-blue/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                       <h3 className="text-4xl font-black mb-1">Mame Bara Samb</h3>
                       <p className="opacity-90 text-sm font-bold tracking-widest uppercase text-ucak-gold">Président du Club MET</p>
                    </div>
                 </div>
              </div>
              <div className="w-full md:w-3/5">
                 <Quote size={60} className="text-ucak-gold/20 mb-8" />
                 <h2 className="text-4xl md:text-6xl font-black text-ucak-blue dark:text-white mb-10 leading-none tracking-tighter">
                   "Le Club MET est l'âme de l'UFR."
                 </h2>
                 <div className="prose dark:prose-invert text-xl text-gray-600 dark:text-gray-300 space-y-8 leading-relaxed italic text-justify">
                   <p>Nous sommes nés de la volonté des étudiants de l'UFR Métiers et Technologies. Notre mission est simple : créer un pont entre la théorie académique et la réalité professionnelle.</p>
                   <p>À travers nos activités, nous cultivons l'excellence et la solidarité.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* === 4. REDIRECTION OFFICIELLE === */}
      <section className="py-12 px-6 bg-gray-100 dark:bg-white/5">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
             <div className="p-3 bg-white dark:bg-white/10 rounded-xl text-gray-500 hidden md:block">
               <Globe size={24} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Portail Administratif Officiel</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400">Pour les inscriptions, les bourses, et les détails administratifs, visitez le site du CCAK.</p>
             </div>
          </div>
          <a href="https://ccak.edu.sn" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-opacity flex items-center gap-2 shrink-0 shadow-lg">
             Site Officiel CCAK <ExternalLink size={14}/>
          </a>
        </div>
      </section>

    </div>
  );
}