import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Layout, Users, Award, MapPin, Building2, ExternalLink, 
  ChevronDown, Globe, Quote, Download, Lock, Microscope, Shield,
  Landmark, Briefcase, CheckCircle2, GraduationCap, Scale, FileText,
  Code, Wifi, Server, Cpu
} from 'lucide-react';

// --- 1. CONTENU IMMERSIF INFORMATIQUE (Refait style HEC) ---
const ITExpansion = () => {
  const [activeYear, setActiveYear] = useState('L1');
  const [optionL3, setOptionL3] = useState('DAR'); // DAR, ASR, RT

  // Données structurées comme HEC (Options en L3)
  const curriculum = {
    'L1': {
      title: "Tronc Commun Scientifique (L1)",
      semesters: [
        { id: 'S1', title: 'Bases Fondamentales', courses: ['Algorithmique & C', 'Architecture Ordinateurs', 'Maths Analyse', 'Électricité', 'Anglais Technique'] },
        { id: 'S2', title: 'Web & Physique', courses: ['Dév Web (HTML/CSS)', 'Systèmes Exploitation', 'Électronique Analog.', 'Physique Ondes', 'Bureautique'] }
      ]
    },
    'L2': {
      title: "Consolidation & Réseaux (L2)",
      semesters: [
        { id: 'S3', title: 'Infrastructures', courses: ['Archi Réseaux (TCP/IP)', 'Bases de Données (SQL)', 'Java (POO)', 'Électronique Num.', 'Marketing Digital'] },
        { id: 'S4', title: 'Systèmes Avancés', courses: ['Admin Linux', 'Théorie du Signal', 'Transmission Données', 'Web Dynamique (PHP)', 'Droit Informatique'] }
      ]
    },
    'L3': {
      title: "Spécialisation Métier (L3)",
      options: {
        'DAR': [
          { id: 'S5 (DAR)', title: 'Dév. Applications', courses: ['Génie Logiciel (UML)', 'Java EE & Frameworks', 'Dév Mobile (Android/iOS)', 'Cloud Computing', 'Anglais Pro'] },
          { id: 'S6 (DAR)', title: 'Intégration & Stage', courses: ['Projet Web Fullstack', 'Sécurité Applicative', 'Méthodes Agiles', 'Stage (3 mois)', 'Soutenance'] }
        ],
        'ASR': [
          { id: 'S5 (ASR)', title: 'Admin & Sécurité', courses: ['Admin Windows Server', 'Sécurité Réseaux', 'Cryptographie', 'Virtualisation', 'Audit SI'] },
          { id: 'S6 (ASR)', title: 'Cyber & Stage', courses: ['Ethical Hacking', 'Supervision Réseaux', 'Gouvernance SI', 'Stage (3 mois)', 'Soutenance'] }
        ],
        'RT': [
          { id: 'S5 (RT)', title: 'Réseaux Télécoms', courses: ['Réseaux Mobiles (4G/5G)', 'Fibre Optique', 'Antennes & Propagation', 'VoIP', 'Régulation Télécoms'] },
          { id: 'S6 (RT)', title: 'Transmission & Stage', courses: ['Ingénierie Radio', 'Réseaux Satellitaires', 'Internet des Objets (IoT)', 'Stage (3 mois)', 'Soutenance'] }
        ]
      }
    }
  };

  return (
    <div className="pt-8 text-white">
      {/* Header IT (Style HEC) */}
      <div className="mb-8 p-8 bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] rounded-[2rem] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <h4 className="text-2xl font-black text-white mb-3 relative z-10 flex items-center gap-3">
          <Cpu className="text-ucak-gold" /> Licence Informatique & Télécoms
        </h4>
        <p className="text-sm text-gray-300 italic leading-relaxed relative z-10 max-w-2xl">
          "Former des experts capables de concevoir, sécuriser et administrer les infrastructures numériques de demain."
        </p>
      </div>

      {/* Navigation Années & Options */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex gap-2 p-1 bg-white/5 rounded-full">
          {['L1', 'L2', 'L3'].map(year => (
            <button
              key={year}
              onClick={(e) => { e.stopPropagation(); setActiveYear(year); }}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeYear === year ? 'bg-ucak-gold text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              {year}
            </button>
          ))}
        </div>
        
        {/* OPTIONS L3 (Comme HEC) */}
        {activeYear === 'L3' && (
          <div className="flex bg-blue-900/30 p-1 rounded-xl border border-blue-500/20 overflow-x-auto">
            <button onClick={(e) => { e.stopPropagation(); setOptionL3('DAR'); }} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${optionL3 === 'DAR' ? 'bg-blue-500 text-white' : 'text-blue-300'}`}>Option Dév (DAR)</button>
            <button onClick={(e) => { e.stopPropagation(); setOptionL3('ASR'); }} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${optionL3 === 'ASR' ? 'bg-blue-500 text-white' : 'text-blue-300'}`}>Option Sécu (ASR)</button>
            <button onClick={(e) => { e.stopPropagation(); setOptionL3('RT'); }} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${optionL3 === 'RT' ? 'bg-blue-500 text-white' : 'text-blue-300'}`}>Option Télécoms (RT)</button>
          </div>
        )}
      </div>

      {/* Grille Cours */}
      <motion.div 
        key={activeYear + optionL3}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        {(activeYear === 'L3' ? curriculum['L3'].options[optionL3] : curriculum[activeYear].semesters).map(sem => (
          <div key={sem.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
            <div className="flex justify-between items-center mb-4">
               <span className="text-blue-400 font-black text-xs">{sem.id}</span>
               <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded text-[9px] text-blue-300 font-bold uppercase"><Scale size={10} /> 30 Crédits</div>
            </div>
            <h5 className="font-bold text-white mb-4">{sem.title}</h5>
            <ul className="space-y-2">
              {sem.courses.map(c => (
                <li key={c} className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
                  <div className="w-1 h-1 rounded-full bg-ucak-gold"></div> {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Admission & Partenaires (Bas de page) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        
        {/* Admission */}
        <div className="p-6 bg-[#0f172a] rounded-3xl border border-white/5">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-ucak-gold/10 rounded-lg text-ucak-gold"><GraduationCap size={20} /></div>
              <h5 className="font-black text-white text-sm uppercase">Admission</h5>
           </div>
           <ul className="space-y-3">
             <li className="flex gap-3 text-xs text-gray-400">
               <CheckCircle2 size={14} className="text-green-500 shrink-0" />
               <span>Baccalauréat Scientifique <strong className="text-white">(S1, S2, S3)</strong>.</span>
             </li>
             <li className="flex gap-3 text-xs text-gray-400">
               <CheckCircle2 size={14} className="text-green-500 shrink-0" />
               <span>Baccalauréat Technique <strong className="text-white">(T1, T2)</strong>.</span>
             </li>
             <li className="flex gap-3 text-xs text-gray-400">
               <CheckCircle2 size={14} className="text-green-500 shrink-0" />
               <span>Sélection sur dossier par commission.</span>
             </li>
           </ul>
        </div>

        {/* Partenaires */}
        <div className="p-6 bg-[#0f172a] rounded-3xl border border-white/5">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Briefcase size={20} /></div>
              <h5 className="font-black text-white text-sm uppercase">Partenaires Clés</h5>
           </div>
           <div className="flex flex-wrap gap-2">
             {['Orange Sénégal', 'Free', 'Huawei', 'Cisco', 'ESN / SSII', 'Startups Tech'].map(p => (
               <span key={p} className="bg-white/5 px-3 py-1 rounded-lg text-[10px] font-bold text-gray-300 border border-white/5">{p}</span>
             ))}
           </div>
           <p className="mt-4 text-[10px] text-gray-500 leading-relaxed">
             Nos étudiants réalisent leurs stages dans les plus grandes entreprises technologiques du pays.
           </p>
        </div>

      </div>

      <button className="w-full py-4 bg-ucak-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-ucak-green transition-colors shadow-lg shadow-ucak-blue/20">
        <Download size={16} /> Télécharger la Maquette Informatique (PDF)
      </button>
    </div>
  );
};

// --- 2. CONTENU IMMERSIF HEC (Mis à jour : SANS Mentions) ---
const HECExpansion = () => {
  const [activeYear, setActiveYear] = useState('L1');
  const [optionL3, setOptionL3] = useState('CCG'); 

  // Données extraites du document Word
  const curriculum = {
    'L1': {
      title: "Fondamentaux Gestion & Droit (L1)",
      semesters: [
        { id: 'S1', title: 'Droit & Économie', courses: ['Intro Droit & Éco Entreprise', 'Maths & Statistiques', 'Éco Générale & Compta I', 'Informatique & Anglais', 'Techniques Communication'] },
        { id: 'S2', title: 'Outils & Management', courses: ['Stratégie & GRH', 'Maths Fi & Info Appliquées', 'Compta II & Marketing', 'Anglais Affaires I', 'Culture Générale'] }
      ]
    },
    'L2': {
      title: "Approfondissement (L2)",
      semesters: [
        { id: 'S3', title: 'Comptabilité & Analyse', courses: ['Compta Analytique I', 'Analyse Financière I', 'Info de Gestion', 'Éco Sénégalaise', 'Fiscalité Entreprise I'] },
        { id: 'S4', title: 'Finance & Stratégie', courses: ['Analyse Financière II', 'Fiscalité II', 'Logiciel SAARI', 'Droit des Affaires II', 'Management Stratégique'] }
      ]
    },
    'L3': {
      title: "Spécialisation (L3)",
      options: {
        'CCG': [
          { id: 'S5 (CCG)', title: 'Comptabilité & Contrôle', courses: ['Compta Approfondie', 'Initiation Audit', 'Contrôle de Gestion', 'Compta Sociétés', 'Anglais Pro'] },
          { id: 'S6 (CCG)', title: 'Audit & Expertise', courses: ['Compta Bancaire', 'Audit de Gestion', 'Éthique & Déontologie', 'Stage (Mémoire)', 'Soutenance'] }
        ],
        'ECE': [
          { id: 'S5 (ECE)', title: 'Entrepreneuriat', courses: ['Création d\'Entreprise', 'Incubateur & Innovation', 'Marketing Approfondi', 'Sociologie Orga.', 'Gestion Projet'] },
          { id: 'S6 (ECE)', title: 'Gestion & Financement', courses: ['Levée de Fonds', 'Fiscalité Avancée', 'Business Plan', 'Plaidoyer', 'PFE'] }
        ]
      }
    }
  };

  return (
    <div className="pt-8 text-white">
      {/* Header HEC */}
      <div className="mb-8 p-8 bg-gradient-to-r from-[#2c1a4d] to-[#1e1b4b] rounded-[2rem] border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <h4 className="text-2xl font-black text-white mb-3 relative z-10 flex items-center gap-3">
           <Building2 className="text-ucak-gold" /> Hautes Études Commerciales (HEC)
        </h4>
        <p className="text-sm text-gray-300 italic leading-relaxed relative z-10 max-w-2xl">
          "Dans un souci de démocratisation de l'élite, HEC Touba forme des managers responsables. Notre modèle s'appuie sur l'excellence, la responsabilité et l'ouverture internationale."
        </p>
      </div>

      {/* Navigation Années */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex gap-2 p-1 bg-white/5 rounded-full">
          {['L1', 'L2', 'L3'].map(year => (
            <button
              key={year}
              onClick={(e) => { e.stopPropagation(); setActiveYear(year); }}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeYear === year ? 'bg-ucak-gold text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              {year}
            </button>
          ))}
        </div>
        {activeYear === 'L3' && (
          <div className="flex bg-purple-900/30 p-1 rounded-xl border border-purple-500/20 overflow-x-auto">
            <button onClick={(e) => { e.stopPropagation(); setOptionL3('CCG'); }} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${optionL3 === 'CCG' ? 'bg-purple-500 text-white' : 'text-purple-300'}`}>Option Compta</button>
            <button onClick={(e) => { e.stopPropagation(); setOptionL3('ECE'); }} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${optionL3 === 'ECE' ? 'bg-purple-500 text-white' : 'text-purple-300'}`}>Option Entrepreneuriat</button>
          </div>
        )}
      </div>

      {/* Grille Cours */}
      <motion.div 
        key={activeYear + optionL3}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        {(activeYear === 'L3' ? curriculum['L3'].options[optionL3] : curriculum[activeYear].semesters).map(sem => (
          <div key={sem.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors group">
            <div className="flex justify-between items-center mb-4">
               <span className="text-purple-400 font-black text-xs">{sem.id}</span>
               <div className="flex items-center gap-1 bg-purple-500/10 px-2 py-1 rounded text-[9px] text-purple-300 font-bold uppercase"><Scale size={10} /> 30 Crédits</div>
            </div>
            <h5 className="font-bold text-white mb-4">{sem.title}</h5>
            <ul className="space-y-2">
              {sem.courses.map(c => (
                <li key={c} className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
                  <div className="w-1 h-1 rounded-full bg-ucak-gold"></div> {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Admission & Partenaires (Bas de page HEC) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        
        {/* Admission */}
        <div className="p-6 bg-[#1a1625] rounded-3xl border border-white/5">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-ucak-gold/10 rounded-lg text-ucak-gold"><GraduationCap size={20} /></div>
              <h5 className="font-black text-white text-sm uppercase">Admission</h5>
           </div>
           <ul className="space-y-3">
             <li className="flex gap-3 text-xs text-gray-400">
               <CheckCircle2 size={14} className="text-green-500 shrink-0" />
               <span>Baccalauréat Séries <strong className="text-white">L2, S1, S2, G</strong> ou équivalent.</span>
             </li>
             <li className="flex gap-3 text-xs text-gray-400">
               <CheckCircle2 size={14} className="text-green-500 shrink-0" />
               <span>Validation par commission pédagogique.</span>
             </li>
           </ul>
        </div>

        {/* Partenaires */}
        <div className="p-6 bg-[#1a1625] rounded-3xl border border-white/5">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Landmark size={20} /></div>
              <h5 className="font-black text-white text-sm uppercase">Partenaires</h5>
           </div>
           <ul className="space-y-2 text-xs text-gray-400">
              <li>• Universités: UCAD, UGB, UIDT</li>
              <li>• Institutions: Chambre de Commerce, Banques</li>
           </ul>
        </div>

      </div>

      <button className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/20">
        <FileText size={16} /> Télécharger la Maquette HEC (PDF)
      </button>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL (Pas de changement ici, sauf l'appel des nouveaux composants) ---
const DepartmentDrawer = ({ dept, isOpen, onClick }) => {
  return (
    <motion.div 
      layout
      initial={false}
      className={`border-b border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500 ${isOpen ? 'bg-white dark:bg-ucak-dark-card shadow-2xl rounded-[2.5rem] my-8 border-none ring-1 ring-ucak-blue/20' : 'bg-transparent hover:bg-gray-50 dark:hover:bg-white/5'}`}
    >
      <button onClick={onClick} className="w-full flex items-center justify-between p-8 text-left focus:outline-none group">
        <div className="flex items-center gap-6">
          <div className={`relative p-5 rounded-2xl transition-all duration-500 ${isOpen ? 'bg-ucak-blue text-white scale-110 rotate-6 shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:text-ucak-blue'}`}>
            <dept.icon size={32} />
          </div>
          <div>
            <h3 className={`text-2xl font-black tracking-tight transition-colors ${isOpen ? 'text-ucak-blue dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{dept.title}</h3>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{dept.shortDesc}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!isOpen && <span className={`hidden md:block text-[10px] px-3 py-1 rounded-full font-black tracking-widest border ${dept.status === 'Ouvert' ? 'border-green-200 text-green-600 bg-green-50' : 'border-gray-200 text-gray-400'}`}>{dept.status === 'Ouvert' ? 'ADMISSION' : 'BIENTÔT'}</span>}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className={isOpen ? 'text-ucak-blue' : 'text-gray-300'}><ChevronDown size={24} /></motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="px-8 pb-10 md:pl-[8rem] md:pr-16">
              {dept.type === 'IT' ? <ITExpansion /> : dept.type === 'HEC' ? <HECExpansion /> : (
                <div className="py-4">
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">{dept.desc}</p>
                  <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 flex items-center gap-4 text-gray-500"><Lock size={20} /> <span className="text-sm font-bold">Programme bientôt disponible.</span></div>
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
  const [openIndex, setOpenIndex] = useState(0); 
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const departments = [
    { title: "Informatique & Télécoms", shortDesc: "Génie Logiciel, Réseaux & IA", status: "Ouvert", icon: Layout, type: "IT", desc: "Formation complète..." },
    { title: "Hautes Études Commerciales", shortDesc: "Management & Finance", status: "Ouvert", icon: Building2, type: "HEC", desc: "Formation d'excellence..." },
    { title: "Génie Électromécanique", shortDesc: "Robotique & Industrie", status: "Bientôt", icon: Award, type: "GEM", desc: "Maintenance industrielle..." },
    { title: "Génie Civil & BTP", shortDesc: "Construction & Architecture", status: "Bientôt", icon: MapPin, type: "GC", desc: "Construction durable..." },
    { title: "Artisanat & Industrie", shortDesc: "Métiers Manuels Modernisés", status: "Bientôt", icon: Users, type: "ART", desc: "Valorisation des métiers..." },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white dark:bg-ucak-dark overflow-hidden pt-20">
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
             <p className="text-xl md:text-3xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">L'excellence académique au service des valeurs.</p>
             <a href="https://ccak.edu.sn" target="_blank" className="group relative inline-flex items-center gap-4 bg-white text-ucak-blue px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-ucak-gold hover:text-ucak-dark transition-all shadow-2xl hover:-translate-y-2">Site Officiel CCAK <ExternalLink size={20} /></a>
        </motion.div>
      </section>

      <section className="py-24 px-6 relative z-20">
        <div className="container mx-auto max-w-5xl">
           <div className="text-center mb-16">
             <span className="text-ucak-green font-black text-xs uppercase tracking-[0.5em] block mb-6">Nos Programmes</span>
             <h2 className="text-5xl md:text-6xl font-black text-ucak-blue dark:text-white leading-none tracking-tighter mb-4">Filières d'Excellence</h2>
           </div>
           <div className="space-y-4">
              {departments.map((dept, idx) => (
                <DepartmentDrawer key={idx} dept={dept} isOpen={openIndex === idx} onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)} />
              ))}
           </div>
        </div>
      </section>

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
                 <h2 className="text-4xl md:text-6xl font-black text-ucak-blue dark:text-white mb-10 leading-none tracking-tighter">"L'Innovation au service de la <span className="text-ucak-green">Foi</span> et du <span className="text-ucak-gold">Développement</span>."</h2>
                 <div className="prose dark:prose-invert text-xl text-gray-600 dark:text-gray-300 space-y-8 leading-relaxed italic text-justify"><p>À l'UCAK, notre mission consiste à acquérir le <strong>Savoir Utile</strong> pour le mettre en pratique par l'<strong>Action Vertueuse</strong>.</p></div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}