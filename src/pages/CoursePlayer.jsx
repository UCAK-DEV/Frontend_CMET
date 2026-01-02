import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle, ChevronRight, Menu, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoursePlayer() {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Simulation des données du cours
  const course = {
    id: id,
    title: "Maîtriser React.js & Tailwind CSS",
    instructor: "Club Tech UCAK",
    lessons: [
      { id: 1, title: "Introduction et Installation", duration: "10:05", url: "https://www.youtube.com/embed/SqcY0GlETPk?autoplay=1" },
      { id: 2, title: "Comprendre les Composants", duration: "15:30", url: "https://www.youtube.com/embed/Y2hgEGPzTZY" },
      { id: 3, title: "Le State et les Props", duration: "12:45", url: "https://www.youtube.com/embed/4ORZ1GmjaMc" },
      { id: 4, title: "Utiliser Tailwind CSS", duration: "20:00", url: "https://www.youtube.com/embed/ft30zcMlFao" },
      { id: 5, title: "Projet Final : Portfolio", duration: "45:00", url: "https://www.youtube.com/embed/bMknfKXIFA8" },
    ]
  };

  const handleNext = () => {
    if (activeLesson < course.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
    }
  };

  const handlePrev = () => {
    if (activeLesson > 0) {
      setActiveLesson(activeLesson - 1);
    }
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      
      {/* ZONE VIDÉO PRINCIPALE */}
      <div className={`flex-grow relative transition-all duration-300 ${isSidebarOpen ? 'mr-0 md:mr-96' : 'mr-0'}`}>
        {/* Barre de retour */}
        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center gap-4">
           <Link to="/knowledge" className="text-white hover:text-ucak-gold flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md transition-colors font-bold text-sm">
              <ChevronLeft size={16} /> Retour aux cours
           </Link>
           <h1 className="text-white font-bold text-lg drop-shadow-md hidden md:block">{course.title}</h1>
        </div>

        {/* Le Lecteur (Iframe YouTube responsive) */}
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
           <iframe 
             width="100%" 
             height="100%" 
             src={course.lessons[activeLesson].url} 
             title={course.lessons[activeLesson].title}
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen
             className="w-full h-full object-contain"
           ></iframe>
        </div>

        {/* Contrôles bas */}
        <div className="absolute bottom-8 left-0 w-full px-8 flex justify-between items-center pointer-events-none">
           <div className="pointer-events-auto flex gap-4">
              <button 
                 onClick={handlePrev}
                 disabled={activeLesson === 0}
                 className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                 <ChevronLeft size={24} />
              </button>
              <button 
                 onClick={handleNext}
                 disabled={activeLesson === course.lessons.length - 1}
                 className="bg-ucak-green hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                 {activeLesson === course.lessons.length - 1 ? 'Terminer' : 'Leçon Suivante'} <ChevronRight size={20} />
              </button>
           </div>
           
           <button 
             onClick={() => setSidebarOpen(!isSidebarOpen)}
             className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full md:hidden"
           >
              <Menu size={24} />
           </button>
        </div>
      </div>

      {/* SIDEBAR PLAYLIST (Liste des chapitres) */}
      <div className={`fixed right-0 top-0 h-full w-80 md:w-96 bg-ucak-dark-card border-l border-gray-800 transform transition-transform duration-300 z-20 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-white font-bold text-lg">Au programme</h2>
               <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white md:hidden"><X /></button>
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-2 pr-2 custom-scrollbar">
               {course.lessons.map((lesson, index) => (
                  <button 
                    key={lesson.id}
                    onClick={() => setActiveLesson(index)}
                    className={`w-full text-left p-4 rounded-xl flex items-start gap-3 transition-all ${
                       activeLesson === index 
                       ? 'bg-ucak-blue border-l-4 border-ucak-gold' 
                       : 'bg-white/5 hover:bg-white/10 border-l-4 border-transparent'
                    }`}
                  >
                     <div className="mt-1">
                        {index < activeLesson ? (
                           <CheckCircle size={16} className="text-green-500" />
                        ) : activeLesson === index ? (
                           <Play size={16} className="text-ucak-gold animate-pulse" fill="currentColor" />
                        ) : (
                           <Lock size={16} className="text-gray-600" />
                        )}
                     </div>
                     <div>
                        <h3 className={`text-sm font-bold mb-1 ${activeLesson === index ? 'text-white' : 'text-gray-400'}`}>
                           {index + 1}. {lesson.title}
                        </h3>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                     </div>
                  </button>
               ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
               <div className="bg-ucak-green/10 p-4 rounded-xl">
                  <p className="text-ucak-green text-xs font-bold uppercase mb-2">Progression</p>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                     <div className="bg-ucak-green h-full transition-all duration-500" style={{ width: `${((activeLesson) / course.lessons.length) * 100}%` }}></div>
                  </div>
                  <p className="text-gray-400 text-xs">{Math.round(((activeLesson) / course.lessons.length) * 100)}% complété</p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}