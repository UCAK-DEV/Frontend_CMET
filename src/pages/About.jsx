import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Layout, Users, Award, MapPin, Building2, ExternalLink, 
  ChevronDown, Globe, Quote, ArrowRight, Sparkles, 
  CheckCircle2, Download, Lock, Zap, Database, Microscope, Shield
} from 'lucide-react';

// --- CONTENU IMMERSIF INFORMATIQUE (Intégré directement) ---
const ITExpansion = () => {
  const [activeYear, setActiveYear] = useState('L1');

  const curriculum = {
    'L1': {
      title: "Fondamentaux (L1)",
      semesters: [
        { id: 'S1', title: 'Bases Scientifiques', courses: ['Algorithmique & C', 'Archi Ordinateurs', 'Maths Analyse', 'Électricité', 'Anglais Technique'] },
        { id: 'S2', title: 'Web & Physique', courses: ['Dév Web (HTML/CSS)', 'Systèmes Exploitation', 'Électronique Analog.', 'Physique Ondes', 'Bureautique'] }
      ]
    },
    'L2': {
      title: "Approfondissement (L2)",
      semesters: [
        { id: 'S3', title: 'Infrastructures', courses: ['Archi Réseaux (TCP/IP)', 'Bases de Données', 'Java (POO)', 'Électronique Num.', 'Marketing Digital'] },
        { id: 'S4', title: 'Systèmes & Télécoms', courses: ['Admin Linux', 'Théorie du Signal', 'Transmission Données', 'Web Dynamique', 'Droit Informatique'] }
      ]
    },
    'L3': {
      title: "Spécialisation (L3)",
      semesters: [
        { id: 'S5', title: 'Expertise', courses: ['Sécurité Info', 'Réseaux Mobiles', 'Admin BD', 'Virtualisation/Cloud', 'Gestion Projet Agile'] },
        { id: 'S6', title: 'Professionnalisation', courses: ['Projet Fin d\'Études', 'Stage (3 mois)', 'Mémoire', 'Soutenance Jury'] }
      ]
    }
  };

  return (
    <div className="pt-8 text-white">
      {/* Introduction */}
      <div className="mb-8 p-6 bg-ucak-blue/10 rounded-3xl border border-ucak-blue/20">
        <h4 className="text-xl font-black text-ucak-blue dark:text-white mb-2">Licence Informatique & Télécoms</h4>
        <p className="text-sm text-gray-400">
          Une formation complète de 180 Crédits ECTS pour former les architectes du numérique de demain.
        </p>
      </div>

      {/* Navigation Années */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {Object.keys(curriculum).map(year => (
          <button
            key={year}
            onClick={(e) => { e.stopPropagation(); setActiveYear(year); }}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeYear === year ? 'bg-ucak-green text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Grille des Cours */}
      <motion.div 
        key={activeYear}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        {curriculum[activeYear].semesters.map(sem => (
          <div key={sem.id} className="bg-white dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-4">
               <span className="text-ucak-gold font-black text-xs">{sem.id}</span>
               <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-400">30 Crédits</span>
            </div>
            <h5 className="font-bold text-gray-800 dark:text-white mb-4">{sem.title}</h5>
            <ul className="space-y-2">
              {sem.courses.map(c => (
                <li key={c} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <CheckCircle2 size={12} className="text-ucak-blue shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Infrastructures & Partenaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 relative overflow-hidden">
           <Microscope className="absolute right-4 top-4 text-white/5" size={40} />
           <h5 className="font-black text-white mb-4 text-sm uppercase">Laboratoires</h5>
           <ul className="text-xs text-gray-400 space-y-2">
             <li>• Réseaux (Cisco, Fortinet)</li>
             <li>• Télécoms (Fibre, OTDR)</li>
             <li>• Info (Virtualisation, Serveurs)</li>
           </ul>
        </div>
        <div className="p-6 bg-ucak-blue rounded-3xl relative overflow-hidden text-white">
           <Shield className="absolute right-4 top-4 text-white/10" size={40} />
           <h5 className="font-black mb-4 text-sm uppercase">Partenaires</h5>
           <p className="text-xs text-white/80 leading-relaxed">
             Stages garantis avec Orange, Free, et les principales ESN du Sénégal.
           </p>
        </div>
      </div>

      {/* Bouton Téléchargement */}
      <button className="w-full py-4 bg-white text-ucak-blue rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-ucak-gold hover:text-ucak-dark transition-colors">
        <Download size={16} /> Télécharger la Brochure Complète
      </button>
    </div>
  );
};

// --- COMPOSANT CARTE PRINCIPAL ---
const DepartmentDrawer = ({ dept, isOpen, onClick }) => {
  return (
    <motion.div 
      layout
      initial={false}
      className={`border-b border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 ${isOpen ? 'bg-white dark:bg-ucak-dark-card shadow-2xl rounded-[2.5rem] my-8 border-none ring-1 ring-ucak-blue/20' : 'bg-transparent hover:bg-gray-50 dark:hover:bg-white/5'}`}
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-8 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-6">
          {/* L'ICÔNE RESTE INTACTE */}
          <div className={`relative p-5 rounded-2xl transition-all duration-500 ${isOpen ? 'bg-ucak-blue text-white scale-110 rotate-6 shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:text-ucak-blue'}`}>
            <dept.icon size={32} />
          </div>
          <div>
            {/* LE TITRE ET LA DESCRIPTION RESTENT INTACTS */}
            <h3 className={`text-2xl font-black tracking-tight transition-colors ${isOpen ? 'text-ucak-blue dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              {dept.title}
            </h3>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{dept.shortDesc}</p>
          </div>
        </div>
        
        {/* INDICATEUR D'ÉTAT */}
        <div className="flex items-center gap-4">
          {!isOpen && (
            <span className={`hidden md:block text-[10px] px-3 py-1 rounded-full font-black tracking-widest border ${dept.status === 'Ouvert' ? 'border-green-200 text-green-600 bg-green-50' : 'border-gray-200 text-gray-400'}`}>
              {dept.status === 'Ouvert' ? 'ADMISSION' : 'BIENTÔT'}
            </span>
          )}
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className={isOpen ? 'text-ucak-blue' : 'text-gray-300'}
          >
            <ChevronDown size={24} />
          </motion.div>
        </div>
      </button>

      {/* CONTENU IMMERSIF QUI S'OUVRE EN DESSOUS */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-8 pb-10 md:pl-[8rem] md:pr-16">
              {/* Si c'est informatique, on affiche le gros module, sinon description standard */}
              {dept.isImmersive ? (
                 <ITExpansion />
              ) : (
                <div className="py-4">
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">{dept.desc}</p>
                  <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex items-center gap-4 text-gray-500">
                     <Lock size={20} /> <span className="text-sm font-bold">Le programme détaillé sera bientôt disponible.</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function About() {
  const [openIndex, setOpenIndex] = useState(0); // Ouvre le premier par défaut (Info)
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // DONNÉES INTACTES + FLAG POUR IMMERSION
  const departments = [
    { 
      title: "Informatique & Télécoms", 
      shortDesc: "Génie Logiciel, Réseaux & IA",
      status: "Ouvert", 
      icon: Layout, 
      isImmersive: true, // Active le composant ITExpansion
      desc: "Formation complète...", // Sera remplacé par ITExpansion
    },
    { 
      title: "Hautes Études Commerciales", 
      shortDesc: "Management & Finance",
      status: "Bientôt", 
      icon: Building2, 
      desc: "Une formation d'excellence en gestion, marketing digital et finance islamique.",
    },
    { 
      title: "Génie Électromécanique", 
      shortDesc: "Robotique & Industrie",
      status: "Bientôt", 
      icon: Award, 
      desc: "Maintenance industrielle, robotique et systèmes embarqués.",
    },
    { 
      title: "Génie Civil & BTP", 
      shortDesc: "Construction & Architecture",
      status: "Bientôt", 
      icon: MapPin, 
      desc: "Construction durable et architecture moderne.",
    },
    { 
      title: "Artisanat & Industrie", 
      shortDesc: "Métiers Manuels Modernisés",
      status: "Bientôt", 
      icon: Users, 
      desc: "Valorisation des métiers manuels par la technologie.",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-ucak-dark overflow-hidden pt-20">
      
      {/* HERO SECTION (IDENTIQUE A AVANT) */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-ucak-blue">
        <motion.div style={{ y }} className="absolute inset-0">
           <img src="../src/assets/images/banner.svg" alt="Campus" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-b from-ucak-blue/20 via-ucak-blue to-white dark:to-ucak-dark"></div>
        </motion.div>

        <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl">
             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black px-6 py-2 rounded-full text-[10px] tracking-[0.4em] uppercase mb-10 shadow-2xl">
                <Globe size={14} className="text-ucak-gold" /> Institution Académique
             </div>
             
             <h1 className="text-6xl md:text-[8rem] font-black text-white mb-10 tracking-tighter leading-[0.85]">
               Université Cheikh <br/> 
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-gold via-white to-ucak-green">Ahmadoul Khadim</span>
             </h1>
             
             <p className="text-xl md:text-3xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
               L'excellence académique au service des valeurs.
             </p>
             
             <a href="https://ccak.edu.sn" target="_blank" className="group relative inline-flex items-center gap-4 bg-white text-ucak-blue px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-ucak-gold hover:text-ucak-dark transition-all shadow-2xl hover:-translate-y-2">
                Site Officiel CCAK <ExternalLink size={20} />
             </a>
        </motion.div>
      </section>

      {/* SECTION DÉPARTEMENTS (LISTE) */}
      <section className="py-24 px-6 relative z-20">
        <div className="container mx-auto max-w-5xl">
           <div className="text-center mb-16">
             <span className="text-ucak-green font-black text-xs uppercase tracking-[0.5em] block mb-6">Nos Programmes</span>
             <h2 className="text-5xl md:text-6xl font-black text-ucak-blue dark:text-white leading-none tracking-tighter mb-4">
               Filières d'Excellence
             </h2>
           </div>

           <div className="space-y-4">
              {departments.map((dept, idx) => (
                <DepartmentDrawer 
                  key={idx} 
                  dept={dept} 
                  isOpen={openIndex === idx} 
                  onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)} 
                />
              ))}
           </div>
        </div>
      </section>

      {/* MOT DU PRÉSIDENT */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-ucak-dark-card/30 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-2/5">
                 <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] group">
                    <img src="../src/assets/images/president.jpeg" alt="Président" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
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
                   "L'Innovation au service de la <span className="text-ucak-green">Foi</span> et du <span className="text-ucak-gold">Développement</span>."
                 </h2>
                 <div className="prose dark:prose-invert text-xl text-gray-600 dark:text-gray-300 space-y-8 leading-relaxed italic text-justify">
                    <p>À l'UCAK, notre mission consiste à acquérir le <strong>Savoir Utile</strong> pour le mettre en pratique par l'<strong>Action Vertueuse</strong>.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}