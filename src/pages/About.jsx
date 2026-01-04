import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Layout, Users, Award, MapPin, Building2, ExternalLink, 
  ChevronDown, GraduationCap, Globe, Quote, ArrowRight, Sparkles 
} from 'lucide-react';

// Composant de filière modernisé avec UX "Premium"
const FiliereCard = ({ dept, isOpen, onClick }) => {
  return (
    <motion.div 
      layout
      initial={false}
      className={`relative mb-4 rounded-[2rem] overflow-hidden transition-all duration-500 ${
        isOpen 
        ? 'bg-white dark:bg-ucak-dark-card shadow-[0_30px_60px_rgba(0,0,0,0.1)] ring-1 ring-ucak-blue/10' 
        : 'bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10'
      }`}
    >
      <button 
        onClick={onClick}
        className="w-full flex flex-col md:flex-row items-start md:items-center justify-between p-8 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-6">
          <div className={`relative p-5 rounded-2xl transition-all duration-700 ${
            isOpen ? 'bg-ucak-blue text-white scale-110 shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-400'
          }`}>
            <dept.icon size={32} />
            {isOpen && (
              <motion.div 
                layoutId="activeGlow"
                className="absolute inset-0 bg-ucak-blue blur-2xl opacity-40 -z-10"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
                <h3 className={`text-2xl font-black tracking-tighter transition-colors ${isOpen ? 'text-ucak-blue dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                {dept.title}
                </h3>
                {dept.status === 'Ouvert' && !isOpen && (
                    <span className="animate-pulse w-2 h-2 bg-ucak-green rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"/>
                )}
            </div>
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">{dept.shortDesc}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          {!isOpen && (
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 bg-gray-200/50 dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10">
               DÉCOUVRIR LE CURSUS <ArrowRight size={12} />
            </div>
          )}
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className={isOpen ? 'text-ucak-blue' : 'text-gray-300'}
          >
            <ChevronDown size={28} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-8 pb-12 md:pl-[7.5rem]">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2">
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dept.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {dept.jobs.split(', ').map((job, i) => (
                            <span key={i} className="text-[10px] font-bold bg-ucak-blue/5 dark:bg-white/5 text-ucak-blue dark:text-ucak-gold border border-ucak-blue/10 px-3 py-1.5 rounded-lg uppercase">
                                {job}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                      <GraduationCap size={80} />
                  </div>
                  <h4 className="font-black text-ucak-blue dark:text-white mb-6 flex items-center gap-2 text-xs uppercase tracking-widest">
                     <Sparkles size={16} className="text-ucak-gold"/> Informations Clés
                  </h4>
                  <div className="space-y-6">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Séries de Bac</p>
                        <p className="text-lg font-black text-gray-800 dark:text-gray-200">{dept.bac}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Statut</p>
                        <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black ${dept.status === 'Ouvert' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {dept.status === 'Ouvert' ? 'ADMISSIONS OUVERTES' : 'OUVERTURE PROCHAINE'}
                        </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function About() {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);
  
  // Effet Parallaxe
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const departments = [
    { 
      title: "Informatique & Télécoms", 
      shortDesc: "Génie Logiciel, Réseaux & IA",
      status: "Ouvert", 
      icon: Layout, 
      desc: "Le département phare de l'UFR MET. Nous formons des ingénieurs complets capables de concevoir des systèmes d'information complexes, de sécuriser des réseaux et de développer des solutions basées sur l'Intelligence Artificielle.",
      bac: "S1, S2, T1, T2",
      jobs: "Développeur Fullstack, Data Scientist, Ingénieur DevOps, Architecte Réseau"
    },
    { 
      title: "Hautes Études Commerciales (HEC)", 
      shortDesc: "Management & Finance",
      status: "Ouvert", 
      icon: Building2, 
      desc: "Une formation d'excellence en gestion, marketing digital et finance islamique. L'objectif est de former les managers qui piloteront les entreprises technologiques de demain.",
      bac: "L2, S1, S2, G",
      jobs: "Manager de projet, Auditeur, Responsable Marketing, Entrepreneur"
    },
    { 
      title: "Génie Électromécanique", 
      shortDesc: "Robotique & Industrie",
      status: "Bientôt", 
      icon: Award, 
      desc: "Maintenance industrielle, robotique et systèmes embarqués pour accompagner l'industrialisation de la ville sainte.",
      bac: "S1, S2, S3, T1",
      jobs: "Ingénieur Mécatronique, Chef de maintenance"
    },
    { 
      title: "Génie Civil & BTP", 
      shortDesc: "Construction & Architecture",
      status: "Bientôt", 
      icon: MapPin, 
      desc: "Construction durable, architecture islamique moderne et gestion des grands travaux publics.",
      bac: "S1, S2, T1",
      jobs: "Ingénieur BTP, Conducteur de travaux, Topographe"
    },
    { 
      title: "Artisanat & Industrie", 
      shortDesc: "Métiers Manuels Modernisés",
      status: "Bientôt", 
      icon: Users, 
      desc: "Valorisation des métiers manuels locaux par l'apport de nouvelles technologies et méthodes de production.",
      bac: "Tout Bac",
      jobs: "Designer Industriel, Chef d'atelier"
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-ucak-dark overflow-hidden pt-20">
      
      {/* 1. HERO SECTION CINÉMATIQUE AVEC PARALLAXE */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 bg-ucak-blue">
           <img 
            src="../src/assets/images/banner.svg" 
            alt="Campus UCAK" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-ucak-blue/20 via-ucak-blue to-white dark:to-ucak-dark"></div>
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl">
             <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black px-6 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-10 shadow-2xl"
             >
                <Globe size={14} className="text-ucak-gold" /> Institution de Touba
             </motion.div>
             
             <h1 className="text-6xl md:text-[7.5rem] font-black text-white mb-10 tracking-tighter leading-[0.85]">
               Université Cheikh <br/> 
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-gold via-white to-ucak-green">Ahmadoul Khadim</span>
             </h1>
             
             <p className="text-xl md:text-3xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
               Le savoir au service de l'humanité, l'excellence au cœur de la tradition.
             </p>
             
             <a 
               href="https://ccak.edu.sn" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="group relative inline-flex items-center gap-4 bg-white text-ucak-blue px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-ucak-gold hover:text-ucak-dark transition-all shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-2 active:scale-95"
             >
                Visiter le site officiel CCAK 
                <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
             </a>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">Explorez l'UFR MET</span>
            <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-12 bg-gradient-to-b from-ucak-gold to-transparent rounded-full"
            />
        </div>
      </section>

      {/* 2. SECTION FILIÈRES (LES CARTES ONT ÉTÉ SUPPRIMÉES ICI) */}
      <section className="py-32 px-6 relative z-20 bg-white dark:bg-ucak-dark">
        <div className="container mx-auto">
          
          <div className="max-w-5xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
               <div className="max-w-2xl">
                 <motion.span 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="text-ucak-blue font-black text-xs uppercase tracking-[0.5em] block mb-6"
                 >
                   Départements Académiques
                 </motion.span>
                 <h2 className="text-5xl md:text-8xl font-black text-ucak-blue dark:text-white leading-[0.9] tracking-tighter">
                   Nos <span className="text-ucak-gold">Filières</span> d'Excellence
                 </h2>
               </div>
               <div className="md:text-right">
                  <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-xs ml-auto">
                    Cinq pôles de formation conçus pour l'avenir industriel et numérique.
                  </p>
               </div>
             </div>

             {/* UX Filière Dynamique */}
             <motion.div 
              layout
              className="space-y-4"
             >
                {departments.map((dept, idx) => (
                  <FiliereCard 
                    key={idx} 
                    dept={dept} 
                    isOpen={openIndex === idx} 
                    onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)} 
                  />
                ))}
             </motion.div>
          </div>

        </div>
      </section>

      {/* 3. LE MOT DU PRÉSIDENT (CONTENU INCHANGÉ) */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-ucak-dark-card/30 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row items-center gap-16">
              
              {/* Photo Président */}
              <div className="w-full md:w-2/5">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] aspect-[4/5] group"
                 >
                    <img 
                       src="../src/assets/images/president.jpeg" 
                       alt="Président du Club" 
                       loading="lazy"
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ucak-blue/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                       <h3 className="text-4xl font-black mb-1 leading-none">Mame Bara Samb</h3>
                       <p className="opacity-90 text-sm font-bold tracking-widest uppercase text-ucak-gold mt-2">Président du Club MET</p>
                    </div>
                 </motion.div>
              </div>

              {/* Message */}
              <div className="w-full md:w-3/5">
                 <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
                    <Quote size={60} className="text-ucak-gold/20 mb-8" />
                    
                    <h2 className="text-4xl md:text-6xl font-black text-ucak-blue dark:text-white mb-10 leading-none tracking-tighter">
                       "L'Innovation au service de la <span className="text-ucak-green">Foi</span> et du <span className="text-ucak-gold underline decoration-[6px] underline-offset-[12px]">Développement</span>."
                    </h2>
                    
                    <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 space-y-8 text-xl leading-relaxed text-justify font-medium italic">
                       <p>
                          En fondant cette ville, Cheikh Ahmadou Bamba priait pour qu'elle soit un <strong>« Foyer d'Orientation et d'Enseignement »</strong>.
                       </p>
                       <p>
                          À l'UCAK, nous avons la responsabilité de matérialiser cette vision à travers les sciences modernes. Notre mission ne se limite pas à l'obtention de diplômes techniques. Elle consiste à acquérir le <strong>Savoir Utile</strong> <em>(Ilmu Nafi)</em> pour le mettre en pratique par l'<strong>Action Vertueuse</strong> <em>(Amalu Salih)</em>.
                       </p>
                       <p>
                          Le Club MET incarne cette ambition. Que ce soit par le code, l'ingénierie ou la gestion, chaque ligne de code que nous écrivons et chaque projet que nous lançons doit contribuer à <strong>éliminer l'ignorance et la peine</strong>, conformément au vœu du Fondateur.
                       </p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                       <div>
                          <p className="font-black text-2xl text-ucak-blue dark:text-white uppercase tracking-tighter">Le Bureau Exécutif</p>
                          <p className="text-[10px] font-black text-ucak-gold tracking-[0.3em] uppercase mt-1">Mandat 2025-2026</p>
                       </div>
                       <span className="text-sm font-serif italic text-gray-400">Khidma & Excellence</span>
                    </div>
                 </motion.div>
              </div>

           </div>
        </div>
      </section>

    </div>
  );
}