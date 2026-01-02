import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Users, Award, MapPin, Building2, ExternalLink, ChevronDown, GraduationCap, Globe, Lock, Quote } from 'lucide-react';

// Composant "Tiroir" (Accordéon) pour chaque département
const DepartmentDrawer = ({ dept, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className={`border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-ucak-dark-card overflow-hidden transition-colors ${isOpen ? 'bg-gray-50 dark:bg-white/5' : ''}`}
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl transition-colors ${isOpen ? 'bg-ucak-blue text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-ucak-blue/10 group-hover:text-ucak-blue'}`}>
            <dept.icon size={24} />
          </div>
          <div>
            <h3 className={`text-lg font-bold transition-colors ${isOpen ? 'text-ucak-blue dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              {dept.title}
            </h3>
            <p className="text-xs text-gray-400">{dept.shortDesc}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {dept.status === 'Ouvert' ? (
            <span className="hidden md:block text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">ADMISSION OUVERTE</span>
          ) : (
             <span className="hidden md:block text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-bold">BIENTÔT</span>
          )}
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-400"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-8 pl-[5.5rem]">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {dept.desc}
              </p>
              
              <div className="bg-ucak-blue/5 dark:bg-white/5 p-4 rounded-xl border border-ucak-blue/10 dark:border-white/10">
                <h4 className="font-bold text-ucak-blue dark:text-white mb-2 flex items-center gap-2 text-sm">
                   <GraduationCap size={16} className="text-ucak-gold"/> Conditions d'accès
                </h4>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                   <li>• Baccalauréat requis : {dept.bac}</li>
                   <li>• Admission : Sur étude de dossier.</li>
                   <li>• Débouchés : {dept.jobs}</li>
                </ul>
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
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark overflow-hidden pt-20">
      
      {/* 1. HERO SECTION : IDENTITÉ UCAK */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-ucak-blue">
           <img 
            src="../src/assets/images/banner.svg" 
            alt="Campus UCAK" 
            loading="lazy"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-ucak-dark"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mt-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
             <span className="bg-ucak-gold text-ucak-dark font-bold px-4 py-1 rounded-full text-xs tracking-widest uppercase mb-4 inline-block shadow-lg">
                Institution Mère
             </span>
             <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
               Université Cheikh <br/> Ahmadoul Khadim
             </h1>
             <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
               Un pôle d'excellence académique alliant modernité scientifique et valeurs culturelles au cœur de Touba.
             </p>
             
             <a 
               href="https://ccak.edu.sn" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex items-center gap-2 bg-white text-ucak-blue px-8 py-3 rounded-full font-bold hover:bg-ucak-gold hover:text-ucak-dark transition-all shadow-xl hover:scale-105"
             >
                Visiter le site officiel CCAK <ExternalLink size={18} />
             </a>
          </motion.div>
        </div>
      </section>

      {/* 2. PRÉSENTATION UFR MET */}
      <section className="py-16 px-6 relative z-20 -mt-20">
        <div className="container mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-white dark:bg-ucak-dark-card p-8 rounded-3xl shadow-xl border-t-4 border-ucak-blue">
               <Globe className="text-ucak-blue mb-4" size={32} />
               <h3 className="text-xl font-bold text-ucak-blue dark:text-white mb-2">Le Rectorat (CCAK)</h3>
               <p className="text-sm text-gray-500 mb-4">Administration centrale, inscriptions globales et direction de l'université.</p>
               <a href="https://ccak.edu.sn" target="_blank" className="text-xs font-bold text-ucak-blue flex items-center gap-1 hover:underline">Accéder au portail <ExternalLink size={12}/></a>
            </motion.div>
            <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-ucak-dark text-white p-8 rounded-3xl shadow-xl border-t-4 border-ucak-green relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-ucak-green rounded-full blur-[60px] opacity-20"></div>
               <Lock className="text-ucak-green mb-4" size={32} />
               <h3 className="text-xl font-bold text-white mb-2">Le Club MET</h3>
               <p className="text-sm text-gray-300 mb-4">Plateforme des étudiants de l'UFR Métiers & Technologies. Vie associative, cours et réseau.</p>
               <span className="text-xs font-bold text-ucak-green">Vous êtes ici.</span>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
               <span className="text-ucak-green font-bold text-sm uppercase tracking-widest">Notre Composante</span>
               <h2 className="text-3xl md:text-5xl font-black text-ucak-blue dark:text-white mt-2 mb-6">UFR Métiers & Technologies</h2>
               <p className="text-lg text-gray-600 dark:text-gray-300">
                 L'UFR MET est le bras technologique de l'université. Notre mission est de former l'élite technique capable de relever les défis de l'industrialisation et de la digitalisation.
               </p>
             </div>

             <div className="bg-white dark:bg-ucak-dark-card rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
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

        </div>
      </section>

      {/* 3. LE MOT DU PRÉSIDENT */}
      <section className="py-20 px-6 bg-white dark:bg-ucak-dark-card border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
           <div className="flex flex-col md:flex-row items-center gap-12">
              
              {/* Photo Président */}
              <div className="w-full md:w-1/3">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] group"
                 >
                    {/* Image mise à jour selon votre demande */}
                    <img 
                       src="../src/assets/images/president.jpeg" 
                       alt="Président du Club" 
                       loading="lazy"
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ucak-blue/90 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                       <div className="flex items-center gap-2 mb-2">
                          <span className="bg-ucak-gold text-ucak-dark text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Leadership</span>
                       </div>
                       <h3 className="text-3xl font-black mb-1">Mame Bara Samb</h3>
                       <p className="opacity-90 text-sm font-medium">Président du Club MET • Promo 2025</p>
                    </div>
                 </motion.div>
              </div>

              {/* Message / Discours Institutionnel */}
              <div className="w-full md:w-2/3">
                 <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <Quote size={48} className="text-ucak-gold/20 mb-6" />
                    
                    <h2 className="text-3xl md:text-4xl font-black text-ucak-blue dark:text-white mb-6 leading-tight">
                       "L'Innovation au service de la <span className="text-ucak-green">Foi</span> et du <span className="text-ucak-gold">Développement</span>."
                    </h2>
                    
                    <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 space-y-6 text-lg leading-relaxed text-justify">
                       <p>
                          <span className="text-6xl float-left mr-3 mt-[-10px] text-ucak-gold font-serif">"</span>
                          En fondant cette ville, Cheikh Ahmadou Bamba priait pour qu'elle soit un <strong>« Foyer d'Orientation et d'Enseignement »</strong>.
                       </p>
                       <p>
                          À l'UCAK, nous avons la responsabilité de matérialiser cette vision à travers les sciences modernes. Notre mission ne se limite pas à l'obtention de diplômes techniques. Elle consiste à acquérir le <strong>Savoir Utile</strong> <em>(Ilmu Nafi)</em> pour le mettre en pratique par l'<strong>Action Vertueuse</strong> <em>(Amalu Salih)</em>.
                       </p>
                       <p>
                          Le Club MET incarne cette ambition. Que ce soit par le code, l'ingénierie ou la gestion, chaque ligne de code que nous écrivons et chaque projet que nous lançons doit contribuer à <strong>éliminer l'ignorance et la peine</strong>, conformément au vœu du Fondateur.
                       </p>
                       <p>
                          Soyons l'élite qui allie l'ancrage spirituel à l'excellence technologique.
                       </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex items-center gap-4">
                       <div className="flex-1">
                          <p className="font-bold text-ucak-blue dark:text-white">Le Bureau Exécutif</p>
                          <p className="text-xs text-gray-500">Mandat 2025-2026</p>
                       </div>
                       {/* Signature visuelle */}
                       <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                       <span className="text-xs font-serif italic text-gray-400">Khidma & Excellence</span>
                    </div>
                 </motion.div>
              </div>

           </div>
        </div>
      </section>

    </div>
  );
}