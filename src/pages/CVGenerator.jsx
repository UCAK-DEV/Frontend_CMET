import { useState, useRef } from 'react';
import { api, useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Save, Download, Loader2, Sparkles, 
  MapPin, Mail, Phone, Globe, GraduationCap, Briefcase, 
  Award, CheckCircle, PlusCircle, X
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CVGenerator() {
  const { user } = useUser();
  const printRef = useRef();

  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  const [content, setContent] = useState({
    personal: { 
      phone: '+221 77 000 00 00', 
      address: 'Touba, Sénégal',
      summary: 'Étudiant passionné par le développement d\'applications réparties et l\'innovation technologique.'
    },
    experiences: [{ id: Date.now(), title: 'Développeur Fullstack', company: 'Club MET Lab', period: '2025 - Présent', desc: 'Conception d\'interfaces réactives.' }],
    education: [{ id: Date.now(), school: 'Université Cheikh Ahmadoul Khadim', degree: 'Licence en Informatique (DAR)', year: '2026' }],
    skills: ['React', 'NestJS', 'PostgreSQL', 'Tailwind CSS']
  });

  // --- EXPORTATION HAUTE DÉFINITION ---
  const downloadPDF = async () => {
    setExporting(true);
    const canvas = await html2canvas(printRef.current, {
      scale: 3, // Qualité maximale
      useCORS: true,
      backgroundColor: "#ffffff"
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`CV_${user?.full_name?.replace(/\s+/g, '_')}.pdf`);
    setExporting(false);
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      setContent({...content, skills: [...content.skills, newSkill.trim()]});
      setNewSkill('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#05070a] pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-12">
        
        {/* --- ÉDITEUR (GAUCHE) --- */}
        <div className="w-full xl:w-2/5 space-y-8">
          <header>
            <h1 className="text-4xl font-black dark:text-white tracking-tighter">CV <span className="text-ucak-blue">Architect.</span></h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-2">Éditeur professionnel UFR MET</p>
          </header>

          <div className="space-y-6 bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
            {/* Infos Personnelles */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b pb-2">Contact & Bio</h3>
              <input className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl text-xs outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white" 
                placeholder="Téléphone" value={content.personal.phone} onChange={e => setContent({...content, personal: {...content.personal, phone: e.target.value}})} />
              <textarea className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl text-xs outline-none h-24 dark:text-white" 
                placeholder="Résumé professionnel..." value={content.personal.summary} onChange={e => setContent({...content, personal: {...content.personal, summary: e.target.value}})} />
            </div>

            {/* Skills Dynamiques */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b pb-2">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {content.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-ucak-blue/10 text-ucak-blue rounded-lg text-[10px] font-bold flex items-center gap-2">
                    {s} <X size={12} className="cursor-pointer" onClick={() => setContent({...content, skills: content.skills.filter((_, idx) => idx !== i)})} />
                  </span>
                ))}
              </div>
              <input 
                value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={addSkill}
                placeholder="Ajouter une compétence + Entrée" 
                className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl text-xs outline-none border border-dashed border-gray-200 dark:border-white/10 dark:text-white" />
            </div>

            <button onClick={downloadPDF} disabled={exporting} className="w-full py-5 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-ucak-blue/20">
              {exporting ? <Loader2 className="animate-spin" /> : <><Download size={18} /> Générer le PDF HD</>}
            </button>
          </div>
        </div>

        {/* --- PREVIEW (DROITE) --- */}
        <div className="flex-1 bg-gray-200 dark:bg-white/5 p-8 md:p-12 rounded-[3rem] overflow-x-auto">
          <div 
            ref={printRef}
            className="bg-white w-[210mm] min-h-[297mm] mx-auto p-[20mm] shadow-2xl text-slate-800"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Header CV */}
            <header className="flex justify-between items-start border-b-4 border-ucak-blue pb-10">
              <div>
                <h2 className="text-5xl font-black tracking-tighter text-slate-900 uppercase leading-none">{user?.full_name}</h2>
                <p className="text-ucak-blue font-bold text-xl mt-2">{user?.filiere} — Promo {user?.promo}</p>
                <div className="flex gap-6 mt-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Mail size={12} className="text-ucak-blue" /> {user?.email}</span>
                  <span className="flex items-center gap-1.5"><Phone size={12} className="text-ucak-blue" /> {content.personal.phone}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} className="text-ucak-blue" /> {content.personal.address}</span>
                </div>
              </div>
              {/* INNOVATION : Badge Officiel UFR */}
              {user?.is_ufr_verified && (
                <div className="flex flex-col items-center gap-1 text-ucak-gold">
                  <Award size={48} strokeWidth={1.5} />
                  <span className="text-[7px] font-black uppercase tracking-tighter text-center">UFR MET<br/>Certified Member</span>
                </div>
              )}
            </header>

            <div className="grid grid-cols-3 gap-12 mt-12">
              {/* Sidebar Preview */}
              <div className="col-span-1 space-y-10 border-r pr-8 border-slate-100">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4">Profil</h4>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-medium">{content.personal.summary}</p>
                </section>
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {content.skills.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-900 text-white text-[8px] font-black uppercase rounded-sm">{s}</span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Main Content Preview */}
              <div className="col-span-2 space-y-12">
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase size={18} className="text-ucak-blue" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Expériences</h4>
                  </div>
                  <div className="space-y-8">
                    {content.experiences.map((exp) => (
                      <div key={exp.id}>
                        <h5 className="font-black text-slate-900 text-base">{exp.title}</h5>
                        <p className="text-ucak-blue text-[10px] font-bold uppercase tracking-widest mb-2">{exp.company} <span className="text-slate-400 ml-2">| {exp.period}</span></p>
                        <p className="text-xs text-slate-500 font-medium">{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <GraduationCap size={18} className="text-ucak-blue" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Formation Académique</h4>
                  </div>
                  <div className="space-y-6">
                    {content.education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-ucak-blue/20 pl-4">
                        <h5 className="font-black text-slate-900 text-sm">{edu.degree}</h5>
                        <p className="text-xs text-slate-500 font-bold">{edu.school} — {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Footer de certification */}
            <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center opacity-40 italic text-[8px]">
               <p>Généré officiellement via le portail numérique Club MET - UCAK</p>
               <p>Vérifier l'authenticité : ucak-met-hub.vercel.app/verify/{user?.matricule}</p>
            </footer>
          </div>
        </div>

      </div>
    </div>
  );
}