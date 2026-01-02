import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle, ChevronRight, Menu, X, Edit3, List, Save } from 'lucide-react';

export default function CoursePlayer() {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('playlist'); // 'playlist' ou 'notes'
  
  // Gestion des Notes
  const [note, setNote] = useState('');
  
  // Charger la note sauvegardée au chargement
  useEffect(() => {
    const savedNote = localStorage.getItem(`note_course_${id}`);
    if (savedNote) setNote(savedNote);
  }, [id]);

  const handleSaveNote = () => {
    localStorage.setItem(`note_course_${id}`, note);
    alert("Note sauvegardée !");
  };

  const course = {
    id: id,
    title: "Maîtriser React.js & Tailwind CSS",
    lessons: [
      { id: 1, title: "Introduction et Installation", duration: "10:05", url: "https://www.youtube.com/embed/SqcY0GlETPk?autoplay=1" },
      { id: 2, title: "Comprendre les Composants", duration: "15:30", url: "https://www.youtube.com/embed/Y2hgEGPzTZY" },
      { id: 3, title: "Le State et les Props", duration: "12:45", url: "https://www.youtube.com/embed/4ORZ1GmjaMc" },
    ]
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      
      {/* ZONE VIDÉO */}
      <div className={`flex-grow relative transition-all duration-300 ${isSidebarOpen ? 'mr-0 md:mr-96' : 'mr-0'}`}>
        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center gap-4">
           <Link to="/knowledge" className="text-white hover:text-ucak-gold flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md font-bold text-sm">
              <ChevronLeft size={16} /> Retour
           </Link>
           <h1 className="text-white font-bold text-lg hidden md:block">{course.title}</h1>
        </div>

        <div className="w-full h-full flex items-center justify-center bg-gray-900">
           <iframe 
             width="100%" height="100%" 
             src={course.lessons[activeLesson].url} 
             title="YouTube video"
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen
           ></iframe>
        </div>

        {/* Contrôles */}
        <div className="absolute bottom-8 left-0 w-full px-8 flex justify-between items-center pointer-events-none">
           <div className="pointer-events-auto flex gap-4">
              <button onClick={() => activeLesson > 0 && setActiveLesson(activeLesson - 1)} disabled={activeLesson === 0} className="bg-white/10 text-white p-3 rounded-full disabled:opacity-30">
                 <ChevronLeft size={24} />
              </button>
              <button onClick={() => activeLesson < course.lessons.length - 1 && setActiveLesson(activeLesson + 1)} disabled={activeLesson === course.lessons.length - 1} className="bg-ucak-green text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg">
                 Suivant <ChevronRight size={20} />
              </button>
           </div>
           <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="pointer-events-auto bg-white/10 text-white p-3 rounded-full md:hidden"><Menu size={24} /></button>
        </div>
      </div>

      {/* SIDEBAR (Playlist & Notes) */}
      <div className={`fixed right-0 top-0 h-full w-80 md:w-96 bg-ucak-dark-card border-l border-gray-800 transform transition-transform duration-300 z-20 flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         
         {/* Onglets */}
         <div className="flex border-b border-gray-800">
            <button 
              onClick={() => setSidebarTab('playlist')}
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${sidebarTab === 'playlist' ? 'text-ucak-gold border-b-2 border-ucak-gold bg-white/5' : 'text-gray-500 hover:text-white'}`}
            >
               <List size={16}/> Contenu
            </button>
            <button 
              onClick={() => setSidebarTab('notes')}
              className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 ${sidebarTab === 'notes' ? 'text-ucak-gold border-b-2 border-ucak-gold bg-white/5' : 'text-gray-500 hover:text-white'}`}
            >
               <Edit3 size={16}/> Mes Notes
            </button>
            <button onClick={() => setSidebarOpen(false)} className="px-4 text-gray-500 md:hidden"><X/></button>
         </div>

         <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
            
            {/* VUE PLAYLIST */}
            {sidebarTab === 'playlist' && (
               <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                     <button 
                       key={lesson.id}
                       onClick={() => setActiveLesson(index)}
                       className={`w-full text-left p-4 rounded-xl flex items-start gap-3 transition-all ${activeLesson === index ? 'bg-ucak-blue border-l-4 border-ucak-gold' : 'bg-white/5 hover:bg-white/10'}`}
                     >
                        <div className="mt-1">
                           {index < activeLesson ? <CheckCircle size={16} className="text-green-500" /> : activeLesson === index ? <Play size={16} className="text-ucak-gold animate-pulse" fill="currentColor" /> : <div className="w-4 h-4 rounded-full border border-gray-600"></div>}
                        </div>
                        <div>
                           <h3 className={`text-sm font-bold mb-1 ${activeLesson === index ? 'text-white' : 'text-gray-400'}`}>{index + 1}. {lesson.title}</h3>
                           <p className="text-xs text-gray-500">{lesson.duration}</p>
                        </div>
                     </button>
                  ))}
               </div>
            )}

            {/* VUE NOTES */}
            {sidebarTab === 'notes' && (
               <div className="h-full flex flex-col">
                  <p className="text-gray-400 text-xs mb-2">Prenez des notes pendant la vidéo. Elles sont sauvegardées automatiquement.</p>
                  <textarea 
                     className="flex-grow w-full bg-black/20 text-white p-4 rounded-xl border border-gray-700 focus:border-ucak-gold outline-none text-sm resize-none"
                     placeholder="Écrivez vos points clés ici..."
                     value={note}
                     onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                  <button onClick={handleSaveNote} className="mt-4 w-full bg-ucak-green text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                     <Save size={16}/> Sauvegarder
                  </button>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}