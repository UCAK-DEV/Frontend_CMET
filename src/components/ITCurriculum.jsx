import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Network, Shield, Cpu, Layers, Zap, 
  Database, Server, Wifi, Lock, Download, FileText, 
  CheckCircle2, ArrowRight, MousePointerClick 
} from 'lucide-react';

// Composant Carte Semestre (Design Glassmorphism)
const SemesterCard = ({ semester, title, courses, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
  >
    {/* Effet de lueur en arrière-plan */}
    <div className={`absolute -top-10 -right-10 w-32 h-32 ${color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`}></div>
    
    <div className="flex justify-between items-start mb-6 relative z-10">
      <span className="text-4xl font-black text-white/10 absolute -top-4 -left-2">{semester}</span>
      <div className="ml-auto px-4 py-1 rounded-full border border-white/10 bg-black/20 text-[10px] font-bold uppercase tracking-widest text-white">
        30 Crédits
      </div>
    </div>

    <h3 className="text-2xl font-black text-white mb-6 mt-2 relative z-10">{title}</h3>

    <ul className="space-y-3 relative z-10">
      {courses.map((course, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-300 group-hover:text-white transition-colors">
          <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${semester.includes('1') || semester.includes('3') ? 'text-ucak-blue' : 'text-ucak-green'}`} />
          <span className="font-medium">{course}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function ITCurriculum() {
  const [activeTab, setActiveTab] = useState('parcours'); // 'parcours' | 'labos'

  // --- DONNÉES COMPLÈTES (SANS SAN) ---
  const curriculum = [
    {
      year: "Première Année (L1)",
      desc: "Fondamentaux Scientifiques & Introduction Informatique",
      semesters: [
        {
          id: "S1",
          title: "Bases Scientifiques & Algo",
          color: "bg-ucak-blue",
          courses: [
            "Algorithmique & Langage C",
            "Architecture des Ordinateurs",
            "Mathématiques I (Analyse)",
            "Électricité Générale",
            "Techniques d'Expression",
            "Anglais Technique I"
          ]
        },
        {
          id: "S2",
          title: "Web & Physique Appliquée",
          color: "bg-ucak-green",
          courses: [
            "Programmation Web (HTML/CSS)",
            "Algorithmique Avancée",
            "Systèmes d'Exploitation 1",
            "Électronique Analogique",
            "Physique (Optique/Ondes)",
            "Bureautique Avancée"
          ]
        }
      ]
    },
    {
      year: "Deuxième Année (L2)",
      desc: "Approfondissement Réseaux & Développement",
      semesters: [
        {
          id: "S3",
          title: "Infrastructures & Données",
          color: "bg-ucak-gold",
          courses: [
            "Architecture Réseaux (OSI/TCP-IP)",
            "Bases de Données (SQL)",
            "Programmation Orientée Objet (Java)",
            "Électronique Numérique",
            "Probabilités & Statistiques",
            "Marketing Digital"
          ]
        },
        {
          id: "S4",
          title: "Systèmes & Télécoms",
          color: "bg-purple-500",
          courses: [
            "Administration Système Linux",
            "Théorie du Signal",
            "Transmission de Données",
            "Dév. Web Dynamique (PHP/JS)",
            "Réseaux Locaux & Commutation",
            "Droit de l'Informatique"
          ]
        }
      ]
    },
    {
      year: "Troisième Année (L3)",
      desc: "Spécialisation & Professionnalisation",
      semesters: [
        {
          id: "S5",
          title: "Technologies Avancées",
          color: "bg-red-500",
          courses: [
            "Sécurité Informatique",
            "Réseaux Sans Fil & Mobiles",
            "Administration Base de Données",
            "Virtualisation & Cloud",
            "Gestion de Projet (Agile/Scrum)",
            "Entrepreneuriat"
          ]
        },
        {
          id: "S6",
          title: "Stage & Projet de Fin d'Études",
          color: "bg-indigo-500",
          courses: [
            "Projet Intégrateur (PFE)",
            "Stage en Entreprise (3 mois min.)",
            "Rédaction de Mémoire",
            "Soutenance devant Jury"
          ]
        }
      ]
    }
  ];

  // Spécialités L3 (SANS SAN)
  const specialities = [
    { id: "DAR", title: "Dév. Applications", icon: Code, desc: "Génie Logiciel, Mobile, Web Fullstack, DevOps." },
    { id: "ASR", title: "Admin & Sécurité", icon: Lock, desc: "Cybersécurité, Pentesting, Audit, Cloud Sec." },
    { id: "RT", title: "Réseaux Télécoms", icon: Wifi, desc: "Fibre Optique, 4G/5G, VoIP, IoT." },
  ];

  return (
    <div className="bg-[#0b0f19] min-h-screen text-white font-sans selection:bg-ucak-green selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION IMMERSIVE */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ucak-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block mb-6">
            <span className="py-2 px-6 rounded-full border border-ucak-gold/30 bg-ucak-gold/10 text-ucak-gold text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md">
              Licence Professionnelle
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
          >
            Informatique & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green via-white to-ucak-blue animate-gradient-x">
              Télécommunications
            </span>
          </motion.h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Devenez l'architecte du numérique. Une formation complète de la <span className="text-white font-bold">L1 à la L3</span> alliant code, réseaux et infrastructures modernes.
          </p>

          <div className="flex justify-center gap-4">
            {specialities.map((spec) => (
              <div key={spec.id} className="hidden md:flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <spec.icon className="text-ucak-green" size={24} />
                <span className="text-xs font-bold uppercase tracking-wider">{spec.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PARCOURS ACADÉMIQUE COMPLET */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-white/20 flex-1"></div>
            <h2 className="text-3xl font-black uppercase tracking-widest text-center">Programme Détaillé</h2>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>

          <div className="space-y-24">
            {curriculum.map((year, idx) => (
              <div key={idx} className="relative">
                {/* Indicateur Année */}
                <div className="sticky top-24 z-20 mb-8 pl-4 border-l-4 border-ucak-gold">
                  <h3 className="text-4xl font-black text-white">{year.year}</h3>
                  <p className="text-ucak-green font-bold uppercase tracking-widest text-sm mt-2">{year.desc}</p>
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

      {/* 3. SECTION TÉLÉCHARGEMENT BROCHURE "COOL" */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Fond Cyberpunk */}
        <div className="absolute inset-0 bg-ucak-blue">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ucak-green rounded-full blur-[200px] opacity-30 animate-pulse"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-12 md:p-16 text-center shadow-[0_0_100px_rgba(0,0,0,0.5)] group cursor-pointer relative overflow-hidden"
          >
            {/* Animation de brillance au survol */}
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>

            <div className="w-24 h-24 bg-white text-black rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-transform duration-500">
               <Download size={48} strokeWidth={2.5} />
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none">
              Prêt à <span className="text-ucak-green">Rejoindre</span> <br/> l'Élite ?
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto font-medium">
              Téléchargez la brochure officielle 2026. Tout y est : détails des cours, grille des coefficients, conditions d'admission et témoignages Alumni.
            </p>

            <button className="relative inline-flex items-center gap-4 px-10 py-5 bg-ucak-green hover:bg-white text-white hover:text-black rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_40px_rgba(34,197,94,0.4)] hover:shadow-[0_10px_60px_rgba(255,255,255,0.4)] group-hover:-translate-y-2">
              <span className="relative z-10">Télécharger le PDF</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>

            <p className="mt-6 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
              Version 3.2 • PDF • 4.5 MB
            </p>
          </motion.div>
        </div>
      </section>
    {/* 4. PARTENARIATS & ÉVALUATIONS (CONTENU MANQUANT AJOUTÉ) */}
      <section className="py-24 px-6 bg-black/20 border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Colonne Partenariats */}
            <div>
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <span className="w-10 h-1 bg-ucak-blue"></span> Partenaires Stratégiques
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                L'insertion professionnelle est au cœur de notre modèle. Nous collaborons avec les leaders du marché pour vos stages et projets.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Orange Sénégal", type: "Opérateur Télécom" },
                  { name: "Free", type: "Opérateur" },
                  { name: "ESN / SSII", type: "Services Numériques" },
                  { name: "Startups", type: "Innovation Tech" }
                ].map((partner, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-ucak-green animate-pulse"></div>
                    <div>
                      <p className="font-bold text-white text-sm">{partner.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase">{partner.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Colonne Évaluations */}
            <div>
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <span className="w-10 h-1 bg-ucak-gold"></span> Système d'Évaluation
              </h3>
              <div className="space-y-6">
                
                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-black text-white/20">01</div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Contrôle Continu (CC)</h4>
                    <p className="text-sm text-gray-400">Comptes-rendus de TP, mini-projets et quiz réguliers.</p>
                    <div className="mt-2 text-xs font-bold text-ucak-gold border border-ucak-gold/20 px-2 py-1 inline-block rounded">
                      40% à 50% de la note finale
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-black text-white/20">02</div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Examens Terminaux (ET)</h4>
                    <p className="text-sm text-gray-400">Partiels écrits organisés à la fin de chaque semestre.</p>
                    <div className="mt-2 text-xs font-bold text-ucak-blue border border-ucak-blue/20 px-2 py-1 inline-block rounded">
                      50% à 60% de la note finale
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="text-4xl font-black text-white/20">03</div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Validation Finale (L3)</h4>
                    <p className="text-sm text-gray-400">Rédaction d'un mémoire technique + Démonstration logicielle/hardware devant jury.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>    
    </div>
  );
}