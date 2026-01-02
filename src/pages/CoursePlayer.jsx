import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Play, CheckCircle, ChevronRight, Menu, X, 
  Edit3, List, Save, Sparkles, BrainCircuit, Share2, MoreVertical, FileText
} from 'lucide-react';

export default function CoursePlayer() {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('notes'); // Par défaut sur Notes pour encourager l'usage
  
  // Gestion des Notes
  const [note, setNote] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false); // Pour simuler l'IA
  
  // Charger la note sauvegardée au chargement
  useEffect(() => {
    const savedNote = localStorage.getItem(`note_course_${id}`);
    if (savedNote) setNote(savedNote);
  }, [id]);

  const handleSaveNote = () => {
    localStorage.setItem(`note_course_${id}`, note);
    // Petit feedback visuel ou toast ici
  };

  // Simulation fonction IA (Perspective)
  const handleAiAction = (action) => {
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      alert(`Fonctionnalité "${action}" bientôt disponible avec l'IA UCAK !`);
    }, 1000);
  };

  const course = {
    id: id,
    title: "Maîtriser React.js & Tailwind CSS",
    progress: 60,
    lessons: [
      { id: 1, title: "Introduction et Installation", duration: "10:05", url: "https://www.youtube.com/embed/SqcY0GlETPk?autoplay=1" },
      { id: 2, title: "Comprendre les Composants", duration: "15:30", url: "https://www.youtube.com/embed/Y2hgEGPzTZY" },
      { id: 3, title: "Le State et les Props", duration: "12:45", url: "https://www.youtube.com/embed/4ORZ1GmjaMc" },
      { id: 4, title: "Les Hooks (useEffect)", duration: "20:00", url: "https://www.youtube.com/embed/j1M6D22e_C0" },
    ]
  };

  return (
    <div className="h-screen bg-[#0f1117] text-gray-300 flex overflow-hidden font-sans">
      
      {/* ZONE GAUCHE : VIDÉO & NAVIGATION */}
      <div className={`flex-grow flex flex-col relative transition-all duration-300 ${isSidebarOpen ? 'mr-0 md:mr-[400px]' : 'mr-0'}`}>
        
        {/* Top Bar Flottante */}
        <div className="absolute top-0 left-0 w-full p-6 z-20 flex items-center justify-between pointer-events-none">
           <Link 
             to="/knowledge" 
             className="pointer-events-auto flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white font-medium text-sm transition-all border border-white/10"
           >
              <ChevronLeft size={16} /> <span className="hidden sm:inline">Retour aux cours</span>
           </Link>
           
           <div className="pointer-events-auto bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-xs font-bold text-ucak-gold hidden sm:block">
              Module 3 / 8
           </div>
        </div>

        {/* Le Lecteur Vidéo */}
        <div className="flex-grow bg-black relative flex items-center justify-center shadow-2xl">
           <iframe 
             width="100%" height="100%" 
             src={course.lessons[activeLesson].url} 
             title="Course Video"
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen
             className="w-full h-full object-contain"
           ></iframe>
        </div>

        {/* Barre de Contrôle Basse */}
        <div className="h-20 bg-[#0f1117] border-t border-gray-800 flex items-center justify-between px-6 md:px-10 z-10">
           <div className="flex flex-col">
              <h1 className="text-white font-bold text-lg leading-tight line-clamp-1">{course.lessons[activeLesson].title}</h1>
              <p className="text-xs text-gray-500 mt-1">Leçon {activeLesson + 1} sur {course.lessons.length}</p>
           </div>

           <div className="flex items-center gap-4">
              <button 
                onClick={() => activeLesson > 0 && setActiveLesson(activeLesson - 1)} 
                disabled={activeLesson === 0} 
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 transition-colors"
              >
                 <ChevronLeft size={24} />
              </button>
              
              <button 
                 onClick={() => activeLesson < course.lessons.length - 1 && setActiveLesson(activeLesson + 1)}
                 disabled={activeLesson === course.lessons.length - 1} 
                 className="bg-ucak-blue hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-ucak-blue/20"
              >
                 Suivant <ChevronRight size={16} />
              </button>

              <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)} 
                className={`p-2 rounded-lg transition-colors md:hidden ${isSidebarOpen ? 'bg-ucak-gold text-black' : 'bg-gray-800 text-white'}`}
              >
                 {isSidebarOpen ? <X size={20}/> : <Menu size={20}/>}
              </button>
           </div>
        </div>
      </div>

      {/* SIDEBAR INTELLIGENTE (DROITE) */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#161b22] border-l border-gray-800 shadow-2xl transform transition-transform duration-300 z-30 flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         
         {/* En-tête Sidebar */}
         <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-[#0f1117]">
            <span className="font-bold text-white tracking-wide text-sm uppercase">Espace de Travail</span>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400"><X size={20}/></button>
         </div>

         {/* Onglets Modernes */}
         <div className="flex p-2 gap-2 bg-[#0f1117]">
            <button 
              onClick={() => setSidebarTab('playlist')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${sidebarTab === 'playlist' ? 'bg-[#1f2937] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
               <List size={14}/> Programme
            </button>
            <button 
              onClick={() => setSidebarTab('notes')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${sidebarTab === 'notes' ? 'bg-[#1f2937] text-ucak-gold shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
               <Edit3 size={14}/> Notes & IA
            </button>
         </div>

         {/* CONTENU SIDEBAR */}
         <div className="flex-grow overflow-y-auto custom-scrollbar p-4">
            
            {/* VUE 1 : PLAYLIST */}
            {sidebarTab === 'playlist' && (
               <div className="space-y-1">
                  <div className="mb-6 px-2">
                     <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Progression Globale</span>
                        <span className="text-ucak-green">{course.progress}%</span>
                     </div>
                     <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-ucak-green to-emerald-400 w-[60%]"></div>
                     </div>
                  </div>

                  {course.lessons.map((lesson, index) => (
                     <button 
                       key={lesson.id}
                       onClick={() => setActiveLesson(index)}
                       className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-all group ${
                          activeLesson === index 
                          ? 'bg-ucak-blue/10 border border-ucak-blue/30' 
                          : 'hover:bg-white/5 border border-transparent'
                       }`}
                     >
                        <div className="mt-0.5">
                           {index < activeLesson ? (
                              <CheckCircle size={16} className="text-ucak-green" />
                           ) : activeLesson === index ? (
                              <div className="w-4 h-4 rounded-full border-2 border-ucak-gold border-t-transparent animate-spin"></div>
                           ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-gray-600 group-hover:border-gray-400"></div>
                           )}
                        </div>
                        <div>
                           <h3 className={`text-sm font-medium mb-0.5 ${activeLesson === index ? 'text-ucak-blue dark:text-blue-400' : 'text-gray-300'}`}>
                              {lesson.title}
                           </h3>
                           <p className="text-[10px] text-gray-500 font-mono">{lesson.duration}</p>
                        </div>
                     </button>
                  ))}
               </div>
            )}

            {/* VUE 2 : SMART NOTES (PRÊT POUR L'IA) */}
            {sidebarTab === 'notes' && (
               <div className="h-full flex flex-col relative">
                  
                  {/* Zone de Saisie Pro */}
                  <div className="flex-grow bg-[#0f1117] rounded-xl border border-gray-700 p-4 focus-within:border-ucak-gold/50 transition-colors flex flex-col">
                     <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-800">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                           <FileText size={12}/> Mes Notes
                        </span>
                        <span className="text-[10px] text-gray-600 italic">Sauvegarde auto</span>
                     </div>
                     <textarea 
                        className="flex-grow w-full bg-transparent text-gray-300 text-sm leading-relaxed outline-none resize-none placeholder-gray-700"
                        placeholder="Prenez des notes ici. Bientôt, notre IA pourra les analyser pour vous..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        onBlur={handleSaveNote}
                     ></textarea>
                  </div>

                  {/* BOUTONS IA (FUTURISTES) */}
                  <div className="mt-4 space-y-3">
                     <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center mb-1">
                        Assistant Intelligent (Bientôt)
                     </p>
                     
                     <div className="grid grid-cols-2 gap-2">
                        <button 
                           onClick={() => handleAiAction('Résumé')}
                           className="bg-[#1f2937] hover:bg-[#374151] border border-gray-700 hover:border-gray-500 text-gray-300 py-3 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all group"
                        >
                           <Sparkles size={16} className="text-purple-400 group-hover:scale-110 transition-transform"/>
                           <span>Résumer</span>
                        </button>
                        
                        <button 
                           onClick={() => handleAiAction('Quiz')}
                           className="bg-[#1f2937] hover:bg-[#374151] border border-gray-700 hover:border-gray-500 text-gray-300 py-3 rounded-lg text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all group"
                        >
                           <BrainCircuit size={16} className="text-ucak-green group-hover:scale-110 transition-transform"/>
                           <span>Générer Quiz</span>
                        </button>
                     </div>

                     <button 
                        onClick={() => handleAiAction('Partager')}
                        className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
                     >
                        <Share2 size={12}/> Exporter mes notes
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}