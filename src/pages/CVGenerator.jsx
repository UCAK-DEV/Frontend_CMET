import { useState, useEffect, useRef } from 'react';
import { api, useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { 
  Plus, Trash2, Save, ArrowLeft, PlusCircle, 
  Briefcase, Wrench, Download, Loader2, Sparkles 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CVEditor() {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const printRef = useRef(); // Ref pour capturer le CV

  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [cvName, setCvName] = useState('Mon Nouveau CV');
  const [content, setContent] = useState({
    personal: { full_name: user?.full_name || '', email: user?.email || '', phone: '', address: '' },
    experiences: [{ id: Date.now(), title: '', company: '', period: '', description: '' }],
    education: [{ id: Date.now(), school: '', degree: '', year: '' }],
    skills: ['React', 'Node.js']
  });

  // --- LOGIQUE D'EXPORTATION PDF ---
  const downloadPDF = async () => {
    setExporting(true);
    const element = printRef.current;
    
    // On optimise la capture pour la haute définition
    const canvas = await html2canvas(element, {
      scale: 2, 
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${cvName.replace(/\s+/g, '_')}.pdf`);
    setExporting(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { title: cvName, data: content };
      if (id) await api.patch(`/api/v1/cvs/${id}`, payload);
      else await api.post('/api/v1/cvs', payload);
      alert("CV enregistré avec succès !");
    } catch (err) {
      alert("Erreur de sauvegarde");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* COLONNE GAUCHE : FORMULAIRE D'ÉDITION */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2.5rem] shadow-xl border border-white/5">
            <header className="flex justify-between items-center mb-10">
              <input 
                value={cvName} 
                onChange={e => setCvName(e.target.value)}
                className="text-2xl font-black bg-transparent border-b-2 border-dashed border-gray-200 focus:border-ucak-blue outline-none dark:text-white"
              />
              <div className="flex gap-2">
                <button 
                  onClick={downloadPDF} 
                  disabled={exporting}
                  className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl text-ucak-blue hover:bg-ucak-blue hover:text-white transition-all shadow-sm"
                  title="Exporter en PDF"
                >
                  {exporting ? <Loader2 className="animate-spin" size={20}/> : <Download size={20}/>}
                </button>
                <button 
                  onClick={handleSave} 
                  className="p-3 bg-ucak-blue text-white rounded-2xl hover:bg-ucak-green transition-all shadow-lg"
                  title="Sauvegarder"
                >
                  {loading ? <Loader2 className="animate-spin" size={20}/> : <Save size={20}/>}
                </button>
              </div>
            </header>

            {/* Expériences */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Expériences</h3>
                <button onClick={() => setContent({...content, experiences: [...content.experiences, {id: Date.now(), title: '', company: '', period: ''}]})} className="text-ucak-blue"><PlusCircle size={18}/></button>
              </div>
              {content.experiences.map((exp, i) => (
                <div key={exp.id} className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                   <input placeholder="Poste" className="col-span-2 bg-transparent font-bold dark:text-white outline-none" value={exp.title} onChange={e => {
                     const exps = [...content.experiences]; exps[i].title = e.target.value; setContent({...content, experiences: exps});
                   }}/>
                   <input placeholder="Entreprise" className="bg-transparent text-sm dark:text-gray-400 outline-none" value={exp.company} onChange={e => {
                     const exps = [...content.experiences]; exps[i].company = e.target.value; setContent({...content, experiences: exps});
                   }}/>
                   <input placeholder="Période" className="bg-transparent text-sm text-right dark:text-gray-400 outline-none" value={exp.period} onChange={e => {
                     const exps = [...content.experiences]; exps[i].period = e.target.value; setContent({...content, experiences: exps});
                   }}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : PREVIEW (C'est cette zone qui est imprimée) */}
        <div className="flex-1">
          <div 
            ref={printRef} 
            className="bg-white shadow-2xl p-12 min-h-[842px] w-full max-w-[595px] mx-auto text-gray-800"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="border-b-8 border-ucak-blue pb-8 mb-10">
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">{user?.full_name}</h1>
              <p className="text-ucak-blue font-bold text-xl mt-2">{user?.filiere} • Promo {user?.promo}</p>
              <div className="flex gap-6 mt-6 text-xs font-medium text-gray-500">
                <span>{user?.email}</span>
                <span>Matricule: {user?.matricule}</span>
              </div>
            </div>

            <div className="space-y-10">
              <section>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-300 mb-6 border-b pb-2">Parcours Professionnel</h2>
                <div className="space-y-8">
                  {content.experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-gray-100">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-ucak-blue rounded-full border-4 border-white"></div>
                      <h3 className="font-black text-lg text-gray-900 leading-none">{exp.title || "Poste non défini"}</h3>
                      <p className="text-sm font-bold text-ucak-blue mt-1">{exp.company} <span className="text-gray-400 ml-2">| {exp.period}</span></p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-300 mb-6 border-b pb-2">Expertise Technique</h2>
                <div className="flex flex-wrap gap-2">
                  {content.skills.map((s, i) => (
                    <span key={i} className="px-4 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}