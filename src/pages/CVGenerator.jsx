import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  Download, Plus, Trash2, Briefcase, GraduationCap, 
  Code, User, Palette, ArrowLeft, Award, Globe, Mail, Phone, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CVGenerator() {
  const { user } = useUser(); // Récupération auto
  const [theme, setTheme] = useState('modern');

  // --- ÉTATS DYNAMIQUES POUR LE CONTENU ---
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.full_name || '',
    title: `${user?.filiere || 'Étudiant'} — ${user?.promo || 'Promotion'}`,
    email: user?.email || '',
    phone: '',
    location: 'Touba, Sénégal',
    summary: "Étudiant rigoureux de l'UFR MET, je recherche une opportunité pour mettre mes compétences techniques au service de projets innovants."
  });

  const [experiences, setExperiences] = useState([
    { id: 1, role: "Projet de Fin d'Études", company: "UCAK", period: "2025", desc: "Développement d'une application de gestion..." }
  ]);

  const [education, setEducation] = useState([
    { id: 1, degree: `Licence en ${user?.filiere}`, school: "Université Cheikh Ahmadoul Khadim", year: "2023 - Présent" }
  ]);

  const [skills, setSkills] = useState(["React.js", "Analyse Financière", "Gestion de Projet"]);

  // --- FONCTIONS DE GESTION DES SECTIONS ---
  const addItem = (list, setList, template) => setList([...list, { ...template, id: Date.now() }]);
  const removeItem = (id, list, setList) => setList(list.filter(item => item.id !== id));
  const updateItem = (id, field, value, list, setList) => {
    setList(list.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handlePrint = () => window.print();

  const themes = {
    modern: "bg-white border-t-[20px] border-ucak-blue text-gray-800",
    tech: "bg-[#0d1117] text-gray-100 border-l-[20px] border-ucak-green",
    minimal: "bg-white text-black font-light border border-gray-100 shadow-none"
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50 dark:bg-ucak-dark flex flex-col lg:flex-row gap-8 px-6 container mx-auto">
      
      {/* 1. ÉDITEUR DE CONTENU (À GAUCHE - CACHÉ À L'IMPRESSION) */}
      <div className="w-full lg:w-[450px] space-y-6 no-print max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
        <div className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
            <Palette className="text-ucak-gold" /> Éditeur de CV
          </h2>

          {/* SÉLECTION DU THÈME */}
          <div className="flex gap-2 mb-10">
            {['modern', 'tech', 'minimal'].map(t => (
              <button key={t} onClick={() => setTheme(t)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase border-2 transition-all ${theme === t ? 'border-ucak-blue bg-ucak-blue/5 text-ucak-blue' : 'border-transparent bg-gray-50 dark:bg-white/5'}`}>{t}</button>
            ))}
          </div>

          {/* SECTION : INFOS PERSONNELLES */}
          <div className="space-y-4 mb-10">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Informations Générales</h3>
            <input type="text" value={personalInfo.fullName} placeholder="Nom Complet" className="cv-input" onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})} />
            <input type="text" value={personalInfo.title} placeholder="Titre du profil" className="cv-input" onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})} />
            <textarea value={personalInfo.summary} placeholder="Résumé / Accroche" className="cv-input" rows="3" onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})} />
          </div>

          {/* SECTION : EXPÉRIENCES (DYNAMIQUE) */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest">Expériences</h3>
               <button onClick={() => addItem(experiences, setExperiences, { role: '', company: '', period: '', desc: '' })} className="p-2 bg-ucak-blue text-white rounded-lg"><Plus size={16}/></button>
            </div>
            {experiences.map((exp) => (
              <div key={exp.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-4 relative group border border-transparent hover:border-ucak-blue/30 transition-all">
                <button onClick={() => removeItem(exp.id, experiences, setExperiences)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                <input type="text" placeholder="Poste" className="bg-transparent w-full font-bold text-sm mb-2 outline-none" onChange={(e) => updateItem(exp.id, 'role', e.target.value, experiences, setExperiences)} />
                <input type="text" placeholder="Entreprise" className="bg-transparent w-full text-xs mb-2 outline-none text-ucak-blue" onChange={(e) => updateItem(exp.id, 'company', e.target.value, experiences, setExperiences)} />
                <textarea placeholder="Description des tâches" className="bg-transparent w-full text-xs outline-none opacity-70" rows="2" onChange={(e) => updateItem(exp.id, 'desc', e.target.value, experiences, setExperiences)} />
              </div>
            ))}
          </div>

          {/* BOUTON GÉNÉRER */}
          <button onClick={handlePrint} className="w-full py-5 bg-ucak-green text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-transform">
            <Download size={20} /> GÉNÉRER LE PDF PRÊT À L'EMPLOI
          </button>
        </div>
      </div>

      {/* 2. PRÉVISUALISATION DU CV (À DROITE - DESIGN RÉEL) */}
      <div className="flex-1 flex justify-center items-start">
        <div id="cv-render" className={`w-full max-w-[800px] aspect-[1/1.414] shadow-2xl p-16 transition-all duration-700 ${themes[theme]}`}>
          
          {/* HEADER DU CV */}
          <div className="flex justify-between items-start mb-16 border-b pb-10 border-gray-100">
             <div className="max-w-[70%]">
                <h1 className={`text-5xl font-black uppercase tracking-tighter mb-2 ${theme === 'tech' ? 'text-ucak-green' : 'text-ucak-blue'}`}>
                   {personalInfo.fullName}
                </h1>
                <p className="text-sm font-black tracking-[0.3em] uppercase opacity-60 italic">{personalInfo.title}</p>
             </div>
             <div className="text-right space-y-1.5 text-[10px] font-bold opacity-70">
                <p className="flex items-center justify-end gap-2">{personalInfo.email} <Mail size={10}/></p>
                <p className="flex items-center justify-end gap-2">{personalInfo.location} <MapPin size={10}/></p>
             </div>
          </div>

          <div className="grid grid-cols-3 gap-16">
             {/* Colonne Gauche : Skills & Education */}
             <div className="col-span-1 space-y-12">
                <section>
                   <h4 className="cv-section-title"><Code size={12}/> Compétences</h4>
                   <div className="space-y-3">
                      {skills.map(s => <div key={s} className="text-xs font-bold border-l-2 border-ucak-gold pl-3">{s}</div>)}
                   </div>
                </section>
                <section>
                   <h4 className="cv-section-title"><GraduationCap size={12}/> Formation</h4>
                   {education.map(edu => (
                      <div key={edu.id} className="mb-4">
                         <p className="text-xs font-black">{edu.degree}</p>
                         <p className="text-[10px] opacity-60 font-bold">{edu.school}</p>
                         <p className="text-[9px] text-ucak-gold">{edu.year}</p>
                      </div>
                   ))}
                </section>
             </div>

             {/* Colonne Droite : Profil & Expériences */}
             <div className="col-span-2 space-y-12">
                <section>
                   <h4 className="cv-section-title"><User size={12}/> Profil Professionnel</h4>
                   <p className="text-sm leading-relaxed opacity-80 font-medium">{personalInfo.summary}</p>
                </section>
                <section>
                   <h4 className="cv-section-title"><Briefcase size={12}/> Parcours</h4>
                   {experiences.map(exp => (
                      <div key={exp.id} className="relative pl-6 border-l border-gray-100 mb-8">
                         <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full ${theme === 'tech' ? 'bg-ucak-green' : 'bg-ucak-blue'}`} />
                         <div className="flex justify-between items-start mb-1">
                            <h5 className="font-black text-sm uppercase">{exp.role}</h5>
                            <span className="text-[10px] opacity-40 italic font-bold">{exp.period}</span>
                         </div>
                         <p className="text-xs font-bold text-ucak-gold mb-2">{exp.company}</p>
                         <p className="text-xs leading-relaxed opacity-70">{exp.desc}</p>
                      </div>
                   ))}
                </section>
             </div>
          </div>

          {/* Footer Institutionnel */}
          <div className="mt-auto pt-16 border-t border-gray-50 flex justify-between opacity-30 text-[8px] font-bold uppercase tracking-widest">
             <p>Certifié par l'UFR Métiers & Technologies</p>
             <p>© 2026 Portfolio Académique - Club MET</p>
          </div>
        </div>
      </div>

      <style>{`
        .cv-input { @apply w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-ucak-blue transition-all dark:text-white border-transparent border; }
        .cv-section-title { @apply text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 border-b pb-2 opacity-50; }
        @media print {
          .no-print, nav, footer { display: none !important; }
          body { background: white !important; margin: 0; padding: 0; }
          .min-h-screen { padding: 0 !important; }
          #cv-render { box-shadow: none !important; width: 100% !important; max-width: none !important; }
        }
      `}</style>
    </div>
  );
}