import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Wifi, Lock, Download, CheckCircle2, ArrowRight 
} from 'lucide-react';
// IMPORT CORRIGÉ
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
        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 group-hover:text-ucak-blue dark:group-hover:text-white transition-colors">
          <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${id.includes('1') || id.includes('3') || id.includes('5') ? 'text-ucak-blue' : 'text-ucak-green'}`} />
          <span className="font-medium">{course}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function ITCurriculum() {
  const curriculum = [
    {
      year: "Première Année (L1)",
      desc: "Fondamentaux Scientifiques",
      semesters: [
        {
          id: "S1", title: "Bases Scientifiques & Algo", color: "bg-ucak-blue",
          courses: ["Algorithmique & Langage C", "Architecture des Ordinateurs", "Mathématiques I", "Électricité Générale", "Techniques d'Expression", "Anglais Technique I"]
        },
        {
          id: "S2", title: "Web & Physique", color: "bg-ucak-green",
          courses: ["Programmation Web (HTML/CSS)", "Algorithmique Avancée", "Systèmes d'Exploitation 1", "Électronique Analogique", "Physique", "Bureautique Avancée"]
        }
      ]
    },
    {
      year: "Deuxième Année (L2)",
      desc: "Réseaux & Dév",
      semesters: [
        {
          id: "S3", title: "Infrastructures & Données", color: "bg-ucak-gold",
          courses: ["Architecture Réseaux", "Bases de Données (SQL)", "Java / POO", "Électronique Numérique", "Probabilités & Stats", "Marketing Digital"]
        },
        {
          id: "S4", title: "Systèmes & Télécoms", color: "bg-purple-500",
          courses: ["Admin. Système Linux", "Théorie du Signal", "Transmission de Données", "Web Dynamique (PHP/JS)", "Réseaux Locaux", "Droit Informatique"]
        }
      ]
    },
    {
      year: "Troisième Année (L3)",
      desc: "Spécialisation",
      semesters: [
        {
          id: "S5", title: "Technologies Avancées", color: "bg-red-500",
          courses: ["Sécurité Informatique", "Réseaux Mobiles", "Admin BDD", "Virtualisation Cloud", "Gestion de Projet", "Entrepreneuriat"]
        },
        {
          id: "S6", title: "Stage & Mémoire", color: "bg-indigo-500",
          courses: ["Projet Intégrateur (PFE)", "Stage (3 mois)", "Rédaction Mémoire", "Soutenance"]
        }
      ]
    }
  ];

  const specialities = [
    { id: "DAR", title: "Dév. Applications", icon: Code },
    { id: "ASR", title: "Admin & Sécurité", icon: Lock },
    { id: "RT", title: "Réseaux Télécoms", icon: Wifi },
  ];

  const handleDownloadPDF = () => {
    generateSyllabusPDF("Licence Informatique & Télécoms", "Maquette Pédagogique Officielle", curriculum);
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0b0f19] min-h-screen font-sans selection:bg-ucak-green selection:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ucak-blue/10 dark:bg-ucak-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6">
            <span className="py-2 px-6 rounded-full border border-ucak-gold/30 bg-ucak-gold/10 text-ucak-gold text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md">
              Licence Professionnelle
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-gray-900 dark:text-white"
          >
            Informatique & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green via-ucak-blue to-ucak-blue dark:via-white dark:to-ucak-blue">
              Télécommunications
            </span>
          </motion.h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Devenez l'architecte du numérique. Une formation complète de la <span className="font-bold text-ucak-blue dark:text-white">L1 à la L3</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {specialities.map((spec) => (
              <div key={spec.id} className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border transition-colors 
                bg-white border-gray-200 shadow-sm
                dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-sm dark:shadow-none">
                <spec.icon className="text-ucak-blue dark:text-ucak-green" size={24} />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">{spec.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-24">
            {curriculum.map((year, idx) => (
              <div key={idx} className="relative">
                <div className="sticky top-24 z-20 mb-8 pl-4 border-l-4 border-ucak-gold backdrop-blur-md py-2">
                  <h3 className="text-4xl font-black text-gray-900 dark:text-white">{year.year}</h3>
                  <p className="text-ucak-blue dark:text-ucak-green font-bold uppercase tracking-widest text-sm mt-2">{year.desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {year.semesters.map((sem) => (
                    <SemesterCard key={sem.id} {...sem} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div whileHover={{ scale: 1.01 }} className="rounded-[3rem] p-12 text-center bg-white border border-gray-100 shadow-2xl dark:bg-ucak-blue/10 dark:backdrop-blur-2xl dark:border-ucak-blue/20 dark:shadow-none">
            <div className="w-20 h-20 bg-ucak-blue dark:bg-ucak-green text-white dark:text-black rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-lg">
               <Download size={40} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Syllabus Informatique 2026</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10">Retrouvez le détail complet des modules et coefficients.</p>
            <button 
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg hover:-translate-y-1 bg-ucak-blue text-white hover:bg-ucak-green dark:bg-white dark:text-black dark:hover:bg-ucak-green dark:hover:text-white"
            >
              Générer le PDF <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}