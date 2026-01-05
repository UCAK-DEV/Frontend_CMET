import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, TrendingUp, PieChart, 
  CheckCircle2, ArrowRight, Download 
} from 'lucide-react';
import { generateSyllabusPDF } from '../utils/pdfGenerator';

const SemesterCard = ({ id, title, courses, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative overflow-hidden p-8 rounded-[2rem] transition-all duration-500 group
      bg-white border border-gray-100 shadow-xl shadow-gray-200/50
      dark:bg-white/5 dark:border-white/10 dark:shadow-none dark:backdrop-blur-xl hover:translate-y-[-5px]"
  >
    <div className={`absolute -top-10 -right-10 w-32 h-32 ${color} rounded-full blur-[80px] opacity-10 dark:opacity-20 group-hover:opacity-30 transition-opacity`}></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <span className="text-4xl font-black text-gray-100 dark:text-white/10 absolute -top-4 -left-2 select-none">{id}</span>
      <div className="ml-auto px-4 py-1 rounded-full border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-black/20 text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300">
        30 Crédits
      </div>
    </div>
    <h3 className="text-xl font-black text-gray-800 dark:text-white mb-6 mt-2 relative z-10">{title}</h3>
    <ul className="space-y-3 relative z-10">
      {courses.map((course, i) => (
        <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-gray-600 dark:text-gray-300 group-hover:text-ucak-blue dark:group-hover:text-ucak-gold transition-colors">
          <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${id.includes('1') || id.includes('3') || id.includes('5') ? 'text-ucak-blue' : 'text-ucak-gold'}`} />
          <span className="font-medium">{course}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function HECCurriculum() {
  const [l3Option, setL3Option] = useState('CCG'); 

  // Données officielles HEC
  const commonCurriculum = [
    {
      year: "Première Année (L1)",
      desc: "Tronc Commun - Fondamentaux",
      semesters: [
        { id: "S1", title: "Introduction & Droit", color: "bg-ucak-blue", courses: ["Introduction au Droit & Éco d'Entreprise", "Mathématiques & Statistiques", "Économie Générale & Comptabilité I", "Informatique, Comm. & Anglais"] },
        { id: "S2", title: "Outils de Gestion", color: "bg-ucak-gold", courses: ["Stratégie & Gouvernance, GRH", "Maths & Info Appliquées à la gestion", "Comptabilité Générale II & Marketing", "Anglais des Affaires & Culture Générale"] }
      ]
    },
    {
      year: "Deuxième Année (L2)",
      desc: "Approfondissement Gestion",
      semesters: [
        { id: "S3", title: "Comptabilité & Analyse", color: "bg-blue-600", courses: ["Comptabilité Analytique & Analyse Fin. I", "Gestion Prévisionnelle & Info Gestion I", "Économie Sénégalaise & Conjoncture", "Droit I & Fiscalité Entreprise I"] },
        { id: "S4", title: "Finance & Organisation", color: "bg-purple-600", courses: ["Analyse Fin. II & Finance d'entreprise", "Éco d'Entreprise & Fiscalité II", "Analyse de Données & Maths Fin.", "Info Gestion II & Logiciel SAARI", "Droit II & Management Stratégique"] }
      ]
    }
  ];

  const l3Specialities = {
    CCG: {
      year: "Troisième Année (L3) - Option CCG",
      semesters: [
        { id: "S5-CCG", title: "Audit & Comptabilité", color: "bg-red-500", courses: ["Compta Approfondie & des Sociétés", "Initiation Audit & Comm. Financière", "Compta Analytique I & Contrôle de Gestion I", "Compta sur Ordi & Projet Pro I"] },
        { id: "S6-CCG", title: "Expertise & Synthèse", color: "bg-indigo-500", courses: ["Compta Analytique II & Bancaire", "Contrôle de Gestion II & Audit", "Conférence & Éthique", "Méthodologie & Projet Fin de Cycle"] }
      ]
    },
    ECE: {
      year: "Troisième Année (L3) - Option ECE",
      semesters: [
        { id: "S5-ECE", title: "Culture Entrepreneuriale", color: "bg-green-500", courses: ["Entrepreneuriat & Incubateur", "Politique Générale d'Entreprise", "Sociologie Orga & Marketing Approfondi", "Pilotage de Projets & Projet Pro"] },
        { id: "S6-ECE", title: "Lancement & Stratégie", color: "bg-orange-500", courses: ["Levée de Fonds & Fiscalité", "Compta Sociétés & Gestion Entreprises", "Plaidoyer - Lobbying", "Projet de Fin de Cycle (Business Plan)"] }
      ]
    }
  };

  const handleDownloadPDF = () => {
    const fullData = [...commonCurriculum, l3Specialities[l3Option]];
    const title = `Licence HEC - Option ${l3Option === 'CCG' ? 'Comptabilité' : 'Entrepreneuriat'}`;
    generateSyllabusPDF(title, "Maquette Pédagogique Officielle", fullData);
  };

  const debouches = [
    { title: "Contrôleur de Gestion", icon: PieChart },
    { title: "Auditeur Comptable", icon: CheckCircle2 },
    { title: "Analyste Financier", icon: TrendingUp },
    { title: "Chef d'Entreprise", icon: Briefcase },
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#0b0f19] min-h-screen font-sans selection:bg-ucak-gold selection:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5 dark:opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ucak-gold/10 dark:bg-ucak-gold/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6">
            <span className="py-2 px-6 rounded-full border border-ucak-blue/30 bg-ucak-blue/10 text-ucak-blue dark:text-white text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md">
              École de Management
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-gray-900 dark:text-white">
            Hautes Études <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-gold via-yellow-500 to-ucak-gold">Commerciales</span>
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Formez-vous aux métiers de la décision. Une excellence académique alliant <span className="font-bold text-ucak-blue dark:text-white">Finance, Audit et Entrepreneuriat</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {debouches.map((job, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border transition-colors bg-white border-gray-200 shadow-sm dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-sm dark:shadow-none">
                <job.icon className="text-ucak-gold" size={24} />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">{job.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME ACADÉMIQUE */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-24">
            {commonCurriculum.map((year, idx) => (
              <div key={idx} className="relative">
                <div className="sticky top-24 z-20 mb-8 pl-4 border-l-4 border-ucak-blue backdrop-blur-md py-2">
                  <h3 className="text-4xl font-black text-gray-900 dark:text-white">{year.year}</h3>
                  <p className="text-ucak-gold font-bold uppercase tracking-widest text-sm mt-2">{year.desc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {year.semesters.map((sem) => <SemesterCard key={sem.id} {...sem} />)}
                </div>
              </div>
            ))}

            {/* L3 Spécialisation */}
            <div className="relative">
              <div className="sticky top-24 z-20 mb-8 pl-4 border-l-4 border-ucak-blue backdrop-blur-md py-2">
                <h3 className="text-4xl font-black text-gray-900 dark:text-white">Troisième Année (L3)</h3>
                <p className="text-ucak-gold font-bold uppercase tracking-widest text-sm mt-2">Spécialisation & Professionnalisation</p>
              </div>
              
              <div className="flex justify-center mb-10">
                <div className="bg-white dark:bg-white/5 p-1.5 rounded-xl border border-gray-200 dark:border-white/10 inline-flex shadow-sm">
                  <button onClick={() => setL3Option('CCG')} className={`px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${l3Option === 'CCG' ? 'bg-ucak-blue text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10'}`}>Comptabilité (CCG)</button>
                  <button onClick={() => setL3Option('ECE')} className={`px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${l3Option === 'ECE' ? 'bg-ucak-gold text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10'}`}>Entrepreneuriat (ECE)</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {l3Specialities[l3Option].semesters.map((sem) => <SemesterCard key={sem.id} {...sem} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION ADMISSION & PARTENAIRES (Ajoutée selon analyse) */}
      <section className="py-20 px-6 bg-white dark:bg-ucak-dark-card border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-ucak-blue text-white flex items-center justify-center text-sm">01</span>
              Conditions d'Admission
            </h3>
            <div className="prose text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              <p className="mb-4">La sélection se fait par une <strong>commission de recrutement</strong> rigoureuse. Nous acceptons les profils suivants :</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-ucak-gold"/> Bacheliers Séries L (Littéraires)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-ucak-gold"/> Bacheliers Séries S (Scientifiques)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-ucak-gold"/> Bacheliers Séries G (Techniques de Gestion)</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-ucak-gold text-white flex items-center justify-center text-sm">02</span>
              Partenaires Académiques
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Nos diplômes sont reconnus grâce à nos partenariats stratégiques :</p>
            <div className="grid grid-cols-2 gap-4">
              {['UCAD Dakar', 'UGB Saint-Louis', 'UIDT Thiès', 'UAS Ziguinchor'].map(partner => (
                <div key={partner} className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-xs font-bold text-center text-gray-600 dark:text-gray-300">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div whileHover={{ scale: 1.01 }} className="rounded-[3rem] p-12 text-center bg-white border border-gray-100 shadow-2xl dark:bg-ucak-blue/10 dark:backdrop-blur-2xl dark:border-ucak-blue/20">
            <div className="w-20 h-20 bg-ucak-gold text-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg">
               <Download size={40} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Syllabus HEC 2026</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10">Document officiel complet avec la maquette pédagogique.</p>
            <button onClick={handleDownloadPDF} className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg hover:-translate-y-1 bg-ucak-blue text-white hover:bg-ucak-gold">
              Générer le PDF <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}