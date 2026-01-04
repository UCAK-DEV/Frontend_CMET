import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, Users, Award, MapPin, Building2, ExternalLink, 
  ChevronDown, GraduationCap, Globe, Lock, Quote, ArrowRight, Sparkles 
} from 'lucide-react';

// Composant "Tiroir" (Accordéon) - Design mis à jour pour être plus "Airy" et moderne
const DepartmentDrawer = ({ dept, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className={`border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-ucak-dark-card transition-all duration-500 ${isOpen ? 'ring-1 ring-ucak-blue/20 shadow-inner' : ''}`}
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-8 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-6">
          <div className={`relative p-4 rounded-2xl transition-all duration-500 ${isOpen ? 'bg-ucak-blue text-white rotate-6' : 'bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:text-ucak-blue'}`}>
            <dept.icon size={28} />
            {isOpen && (
              <motion.div 
                layoutId="glow"
                className="absolute inset-0 bg-ucak-blue blur-xl opacity-30 -z-10"
              />
            )}
          </div>
          <div>
            <h3 className={`text-xl font-black tracking-tight transition-colors ${isOpen ? 'text-ucak-blue dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              {dept.title}
            </h3>
            <p className="text-sm text-gray-400 font-medium">{dept.shortDesc}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {!isOpen && (
              <motion.span 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`hidden md:block text-[10px] px-3 py-1 rounded-full font-black tracking-widest border ${dept.status === 'Ouvert' ? 'border-green-200 text-green-600' : 'border-gray-200 text-gray-400'}`}
              >
                {dept.status === 'Ouvert' ? 'ADMISSION' : 'BIENTÔT'}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }}
            className={isOpen ? 'text-ucak-blue' : 'text-gray-300'}
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-8 pb-10 md:pl-[6.5rem]">
              <motion.p 
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl"
              >
                {dept.desc}
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10">
                  <h4 className="font-bold text-ucak-blue dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-tighter">
                     <GraduationCap size={18} className="text-ucak-gold"/> Accès & Diplômes
                  </h4>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-ucak-gold rounded-full"/> Bac : <span className="font-bold text-gray-700 dark:text-gray-200 ml-1">{dept.bac}</span></li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-ucak-gold rounded-full"/> Sélection : Dossier & Entretien</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10">
                  <h4 className="font-bold text-ucak-green mb-3 flex items-center gap-2 text-sm uppercase tracking-tighter">
                     <Sparkles size={18} /> Carrières
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic">
                    {dept.jobs}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function About() {
  const [openIndex, setOpenIndex] = useState(0);

  const departments = [
    { 
      title: "Informatique & Télécoms", 
      shortDesc: "Génie Logiciel, Réseaux & IA",
      status: "Ouvert", 
      icon: Layout, 
      desc: "Le département phare de l'UFR MET. Nous formons des ingénieurs complets capables de concevoir des systèmes d'information complexes, de sécuriser des réseaux et de développer des solutions basées sur l'Intelligence Artificielle.",
      bac: "S1, S2, T1, T2",
      jobs: "Développeur Fullstack, Data Scientist, Ingénieur DevOps, Architecte Réseau."
    },
    { 
      title: "Hautes Études Commerciales (HEC)", 
      shortDesc: "Management & Finance",
      status: "Ouvert", 
      icon: Building2, 
      desc: "Une formation d'excellence en gestion, marketing digital et finance islamique. L'objectif est de former les managers qui piloteront les entreprises technologiques de demain.",
      bac: "L2, S1, S2, G",
      jobs: "Manager de projet, Auditeur, Responsable Marketing, Entrepreneur."
    },
    { 
      title: "Génie Électromécanique", 
      shortDesc: "Robotique & Industrie",
      status: "Bientôt", 
      icon: Award, 
      desc: "Maintenance industrielle, robotique et systèmes embarqués pour accompagner l'industrialisation de la ville sainte.",
      bac: "S1, S2, S3, T1",
      jobs: "Ingénieur Mécatronique, Chef de maintenance."
    },
    { 
      title: "Génie Civil & BTP", 
      shortDesc: "Construction & Architecture",
      status: "Bientôt", 
      icon: MapPin, 
      desc: "Construction durable, architecture islamique moderne et gestion des grands travaux publics.",
      bac: "S1, S2, T1",
      jobs: "Ingénieur BTP, Conducteur de travaux, Topographe."
    },
    { 
      title: "Artisanat & Industrie", 
      shortDesc: "Métiers Manuels Modernisés",
      status: "Bientôt", 
      icon: Users, 
      desc: "Valorisation des métiers manuels locaux par l'apport de nouvelles technologies et méthodes de production.",
      bac: "Tout Bac",
      jobs: "Designer Industriel, Chef d'atelier."
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-ucak-dark overflow-hidden pt-20">
      
      {/* 1. NOUVEAU HERO SECTION : ÉPURÉ ET PUISSANT */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-ucak-blue">
        {/* Background avec animation subtile */}
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
        >
           <img 
            src="../src/assets/images/banner.svg" 
            alt="Campus UCAK" 
            className="w-full h-full object-cover mix-blend-overlay" 
           />
        </motion.div>
        
        {/* Overlays de design */}
        <div className="absolute inset-0 bg-gradient-to-b from-ucak-blue/50 via-ucak-blue to-white dark:to-ucak-dark"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-ucak-green/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-ucak-gold/10 rounded-full blur-[120px]"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-6 py-2 rounded-full text-[10px] tracking-[0.3em] uppercase mb-8 shadow-2xl">
                <Globe size={14} className="text-ucak-gold animate-pulse" /> Institution Académique de Touba
             </div>
             
             <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
               Université Cheikh <br/> 
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-gold via-white to-ucak-green">Ahmadoul Khadim</span>
             </h1>
             
             <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
               Fusionner la rigueur scientifique et l'excellence spirituelle pour bâtir l'avenir technologique.
             </p>
             
             <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a 
                  href="https://ccak.edu.sn" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative inline-flex items-center gap-3 bg-white text-ucak-blue px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-ucak-gold hover:text-ucak-dark transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2"
                >
                    Visiter le site officiel CCAK 
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </a>
             </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. SECTION DÉPARTEMENTS (PLUS DE CARTES) */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
          
          <div className="max-w-5xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
               <div className="max-w-2xl">
                 <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-ucak-green font-black text-xs uppercase tracking-[0.4em] block mb-4"
                 >
                   Composante Technologique
                 </motion.span>
                 <h2 className="text-4xl md:text-6xl font-black text-ucak-blue dark:text-white leading-none">
                   UFR Métiers & <br/><span className="text-ucak-gold">Technologies</span>
                 </h2>
               </div>
               <p className="text-lg text-gray-500 dark:text-gray-400 max-w-sm md:text-right font-medium">
                 Le moteur de l'industrialisation et de la transformation digitale de l'UCAK.
               </p>
             </div>

             <motion.div 
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-ucak-dark-card rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800 overflow-hidden"
             >
                {departments.map((dept, idx) => (
                  <DepartmentDrawer 
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
      <section className="py-24 px-6 bg-gray-50 dark:bg-ucak-dark-card/50 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row items-center gap-16">
              
              {/* Photo Président */}
              <div className="w-full md:w-2/5">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] aspect-[4/5] group"
                 >
                    <img 
                       src="../src/assets/images/president.jpeg" 
                       alt="Président du Club" 
                       loading="lazy"
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ucak-blue/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                       <h3 className="text-4xl font-black mb-1">Mame Bara Samb</h3>
                       <p className="opacity-90 text-sm font-bold tracking-widest uppercase text-ucak-gold">Président du Club MET</p>
                    </div>
                 </motion.div>
              </div>

              {/* Message */}
              <div className="w-full md:w-3/5">
                 <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <Quote size={60} className="text-ucak-gold/20 mb-8" />
                    
                    <h2 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mb-8 leading-tight">
                       "L'Innovation au service de la <span className="text-ucak-green italic">Foi</span> et du <span className="text-ucak-gold underline decoration-4 underline-offset-8">Développement</span>."
                    </h2>
                    
                    <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 space-y-6 text-xl leading-relaxed text-justify font-medium">
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

                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                       <div>
                          <p className="font-black text-2xl text-ucak-blue dark:text-white uppercase tracking-tighter">Le Bureau Exécutif</p>
                          <p className="text-xs font-bold text-ucak-gold tracking-widest uppercase mt-1">Mandat 2025-2026</p>
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