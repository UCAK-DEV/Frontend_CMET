import { useState } from 'react';
import { Download, Printer, Plus, Trash2, ChevronDown, ChevronUp, Layout, CheckCircle } from 'lucide-react';

// --- COMPOSANT : TEMPLATE 1 (MODERNE - Colonne latérale) ---
const TemplateModern = ({ data }) => (
  <div className="w-full h-full bg-white flex text-gray-800">
    {/* Sidebar */}
    <div className="w-[35%] bg-ucak-blue text-white p-6 md:p-8 flex flex-col">
      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-ucak-gold mb-6">
        {data.personal.name.charAt(0)}
      </div>
      
      <div className="space-y-4 text-sm mb-8">
        <h3 className="text-ucak-gold font-bold uppercase tracking-widest border-b border-white/20 pb-1 mb-2">Contact</h3>
        <p className="opacity-90">{data.personal.email}</p>
        <p className="opacity-90">{data.personal.phone}</p>
        <p className="opacity-90">{data.personal.address}</p>
      </div>

      <div>
        <h3 className="text-ucak-gold font-bold uppercase tracking-widest border-b border-white/20 pb-1 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs">{skill}</span>
          ))}
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="w-[65%] p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-ucak-blue uppercase mb-1">{data.personal.name}</h1>
        <h2 className="text-lg font-bold text-ucak-green uppercase">{data.personal.title}</h2>
        <p className="mt-4 text-sm text-gray-600 italic border-l-4 border-gray-200 pl-3">{data.personal.summary}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-ucak-blue font-bold uppercase tracking-wider border-b-2 border-ucak-gold/30 pb-1 mb-4">Expériences</h3>
        <div className="space-y-4">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold">{exp.role}</h4>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded font-bold">{exp.date}</span>
              </div>
              <div className="text-ucak-green text-sm font-bold mb-1">{exp.company}</div>
              <p className="text-xs text-gray-600 text-justify">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-ucak-blue font-bold uppercase tracking-wider border-b-2 border-ucak-gold/30 pb-1 mb-4">Formation</h3>
        <div className="space-y-4">
          {data.education.map((edu, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold">{edu.degree}</h4>
                <span className="text-xs text-gray-500">{edu.date}</span>
              </div>
              <div className="text-sm text-gray-600">{edu.school}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- COMPOSANT : TEMPLATE 2 (CLASSIQUE - Centré) ---
const TemplateClassic = ({ data }) => (
  <div className="w-full h-full bg-white text-gray-800 p-8 md:p-12">
    <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
      <h1 className="text-4xl font-serif font-bold text-gray-900 uppercase mb-2">{data.personal.name}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{data.personal.title}</h2>
      <div className="flex justify-center gap-4 text-xs font-mono text-gray-500">
        <span>{data.personal.email}</span> | 
        <span>{data.personal.phone}</span> | 
        <span>{data.personal.address}</span>
      </div>
    </div>

    <div className="mb-8">
      <p className="text-sm text-gray-700 text-center italic max-w-lg mx-auto leading-relaxed">"{data.personal.summary}"</p>
    </div>

    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <h3 className="font-serif font-bold text-lg uppercase border-b border-gray-300 mb-4">Expérience Professionnelle</h3>
        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <h4 className="font-bold text-base">{exp.role}</h4>
              <div className="flex justify-between text-sm mb-2">
                <span className="italic text-gray-600">{exp.company}</span>
                <span className="font-mono text-xs">{exp.date}</span>
              </div>
              <p className="text-sm text-gray-700">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-1">
        <div className="mb-8">
          <h3 className="font-serif font-bold text-lg uppercase border-b border-gray-300 mb-4">Formation</h3>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i}>
                <h4 className="font-bold text-sm">{edu.degree}</h4>
                <div className="text-xs text-gray-600">{edu.school}</div>
                <div className="text-xs text-gray-400 font-mono mt-1">{edu.date}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-serif font-bold text-lg uppercase border-b border-gray-300 mb-4">Compétences</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// --- COMPOSANT : TEMPLATE 3 (MINIMALISTE - Clean) ---
const TemplateMinimal = ({ data }) => (
  <div className="w-full h-full bg-white text-gray-800 p-8 md:p-12 font-sans">
    <div className="flex justify-between items-start mb-12">
      <div>
        <h1 className="text-5xl font-thin tracking-tighter text-black mb-2">{data.personal.name}</h1>
        <p className="text-xl text-ucak-blue font-medium">{data.personal.title}</p>
      </div>
      <div className="text-right text-xs text-gray-500 space-y-1">
        <p>{data.personal.email}</p>
        <p>{data.personal.phone}</p>
        <p>{data.personal.address}</p>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-8">
      <div className="col-span-1">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">À Propos</h3>
      </div>
      <div className="col-span-3">
        <p className="text-sm text-gray-700 leading-relaxed mb-8">{data.personal.summary}</p>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-8 mb-8">
      <div className="col-span-1">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Expérience</h3>
      </div>
      <div className="col-span-3 space-y-8">
        {data.experience.map((exp, i) => (
          <div key={i} className="relative pl-6 border-l border-gray-200">
             <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-ucak-green rounded-full border-2 border-white"></div>
             <h4 className="font-bold">{exp.role}</h4>
             <p className="text-xs text-gray-500 mb-2">{exp.company} • {exp.date}</p>
             <p className="text-sm text-gray-600">{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-4 gap-8">
       <div className="col-span-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Expertise</h3>
       </div>
       <div className="col-span-3">
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
               <span key={i} className="border border-gray-300 px-3 py-1 rounded-full text-xs hover:bg-black hover:text-white transition-colors">{skill}</span>
            ))}
          </div>
       </div>
    </div>
  </div>
);

// --- COMPOSANT PRINCIPAL ---
export default function CareerCenter() {
  const [activeTab, setActiveTab] = useState('modern'); // 'modern', 'classic', 'minimal'
  const [activeSection, setActiveSection] = useState('personal'); // Pour l'accordéon du formulaire

  // État des données du CV
  const [cvData, setCvData] = useState({
    personal: {
      name: "Moussa Diop",
      title: "Développeur Fullstack",
      email: "moussa.diop@ucak.edu.sn",
      phone: "+221 77 000 00 00",
      address: "Touba, Sénégal",
      summary: "Étudiant passionné cherchant à appliquer ses compétences techniques pour résoudre des problèmes concrets."
    },
    skills: ["React", "Tailwind", "Node.js", "Python"],
    experience: [
      { role: "Stagiaire Dev", company: "Orange", date: "2024", desc: "Création d'une API REST." }
    ],
    education: [
      { degree: "Licence Info", school: "UCAK", date: "2025" }
    ]
  });

  // Gestionnaires de modifications
  const handlePersonalChange = (e) => {
    setCvData({ ...cvData, personal: { ...cvData.personal, [e.target.name]: e.target.value } });
  };

  const addExperience = () => {
    setCvData({ ...cvData, experience: [...cvData.experience, { role: "Nouveau poste", company: "Entreprise", date: "Date", desc: "Description..." }] });
  };

  const removeExperience = (index) => {
    const newExp = cvData.experience.filter((_, i) => i !== index);
    setCvData({ ...cvData, experience: newExp });
  };

  const handleExpChange = (index, field, value) => {
    const newExp = [...cvData.experience];
    newExp[index][field] = value;
    setCvData({ ...cvData, experience: newExp });
  };

  // Idem pour Education et Skills (simplifié pour l'exemple, mais même logique)
  const handleSkillChange = (e) => {
      const skillsArray = e.target.value.split(',').map(s => s.trim());
      setCvData({ ...cvData, skills: skillsArray });
  };

  const handlePrint = () => window.print();

  return (
    <div className="pt-28 pb-10 min-h-screen bg-gray-100 dark:bg-ucak-dark print:bg-white print:p-0">
      
      {/* HEADER PAGE (Non imprimé) */}
      <div className="container mx-auto px-6 mb-8 print:hidden">
        <h1 className="text-3xl font-black text-ucak-blue dark:text-white mb-2">Générateur de CV</h1>
        <p className="text-gray-500 mb-6">Remplissez le formulaire à gauche, visualisez à droite. Imprimez.</p>
        
        {/* BARRE D'ACTIONS */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-ucak-dark-card p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
           
           {/* Sélecteur Template */}
           <div className="flex gap-4 mb-4 md:mb-0">
              <button onClick={() => setActiveTab('modern')} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all ${activeTab === 'modern' ? 'border-ucak-green bg-ucak-green/10 text-ucak-green' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}>
                <Layout size={16} /> Moderne
              </button>
              <button onClick={() => setActiveTab('classic')} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all ${activeTab === 'classic' ? 'border-ucak-green bg-ucak-green/10 text-ucak-green' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}>
                <Layout size={16} /> Classique
              </button>
              <button onClick={() => setActiveTab('minimal')} className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-bold text-sm transition-all ${activeTab === 'minimal' ? 'border-ucak-green bg-ucak-green/10 text-ucak-green' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}>
                <Layout size={16} /> Minimal
              </button>
           </div>

           <button onClick={handlePrint} className="bg-ucak-blue text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-ucak-green transition-colors shadow-lg">
             <Printer size={18} /> Télécharger PDF
           </button>
        </div>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 print:block print:w-full print:max-w-none print:px-0">
        
        {/* --- COLONNE GAUCHE : FORMULAIRE (Non imprimé) --- */}
        <div className="lg:w-1/3 space-y-4 print:hidden h-fit">
          
          {/* Section Personnelle */}
          <div className="bg-white dark:bg-ucak-dark-card rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <button onClick={() => setActiveSection('personal')} className="flex justify-between items-center w-full font-bold text-ucak-blue dark:text-white mb-2">
              Informations Personnelles {activeSection === 'personal' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>
            
            {activeSection === 'personal' && (
              <div className="space-y-3 animate-fadeIn">
                <input type="text" name="name" value={cvData.personal.name} onChange={handlePersonalChange} placeholder="Nom Complet" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm" />
                <input type="text" name="title" value={cvData.personal.title} onChange={handlePersonalChange} placeholder="Titre du poste" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm" />
                <input type="email" name="email" value={cvData.personal.email} onChange={handlePersonalChange} placeholder="Email" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm" />
                <input type="text" name="phone" value={cvData.personal.phone} onChange={handlePersonalChange} placeholder="Téléphone" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm" />
                <textarea name="summary" value={cvData.personal.summary} onChange={handlePersonalChange} placeholder="Résumé / Profil" rows="3" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm"></textarea>
              </div>
            )}
          </div>

          {/* Section Expérience */}
          <div className="bg-white dark:bg-ucak-dark-card rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <button onClick={() => setActiveSection('experience')} className="flex justify-between items-center w-full font-bold text-ucak-blue dark:text-white mb-2">
              Expériences {activeSection === 'experience' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>
            
            {activeSection === 'experience' && (
              <div className="space-y-4">
                {cvData.experience.map((exp, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 relative">
                     <button onClick={() => removeExperience(i)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 size={14}/></button>
                     <div className="space-y-2 text-sm">
                        <input type="text" value={exp.role} onChange={(e) => handleExpChange(i, 'role', e.target.value)} placeholder="Poste" className="w-full p-1 border rounded" />
                        <input type="text" value={exp.company} onChange={(e) => handleExpChange(i, 'company', e.target.value)} placeholder="Entreprise" className="w-full p-1 border rounded" />
                        <input type="text" value={exp.date} onChange={(e) => handleExpChange(i, 'date', e.target.value)} placeholder="Date" className="w-full p-1 border rounded" />
                        <textarea value={exp.desc} onChange={(e) => handleExpChange(i, 'desc', e.target.value)} placeholder="Description" rows="2" className="w-full p-1 border rounded" />
                     </div>
                  </div>
                ))}
                <button onClick={addExperience} className="w-full py-2 bg-ucak-green/10 text-ucak-green font-bold rounded flex items-center justify-center gap-2 text-sm">
                  <Plus size={14} /> Ajouter une expérience
                </button>
              </div>
            )}
          </div>

          {/* Section Compétences (Simplifié) */}
           <div className="bg-white dark:bg-ucak-dark-card rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <button onClick={() => setActiveSection('skills')} className="flex justify-between items-center w-full font-bold text-ucak-blue dark:text-white mb-2">
              Compétences {activeSection === 'skills' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>
            {activeSection === 'skills' && (
               <div>
                  <label className="text-xs text-gray-500 mb-1 block">Séparer par des virgules</label>
                  <textarea 
                    value={cvData.skills.join(', ')} 
                    onChange={handleSkillChange} 
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm" 
                    rows="3"
                  />
               </div>
            )}
           </div>
        </div>

        {/* --- COLONNE DROITE : PREVIEW (WYSIWYG) --- */}
        <div className="lg:w-2/3 print:w-full print:absolute print:top-0 print:left-0 print:m-0">
          <div className="bg-gray-300 p-8 rounded-xl print:p-0 print:bg-white min-h-[800px] flex justify-center items-start overflow-auto">
             {/* FEUILLE A4 */}
             <div className="bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] relative overflow-hidden print:w-full">
                {activeTab === 'modern' && <TemplateModern data={cvData} />}
                {activeTab === 'classic' && <TemplateClassic data={cvData} />}
                {activeTab === 'minimal' && <TemplateMinimal data={cvData} />}
             </div>
          </div>
        </div>

      </div>

      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: white !important; }
          .print\\:hidden { display: none !important; }
          nav, footer { display: none !important; }
        }
      `}</style>
    </div>
  );
}