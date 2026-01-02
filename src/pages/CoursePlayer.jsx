import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Lock, ChevronLeft, Menu, FileText, ArrowRight } from 'lucide-react';

export default function CoursePlayer() {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Données simulées d'un cours complet (Soft Skills : Leadership Mouride)
  const course = {
    title: "Leadership & Soft Skills",
    instructor: "Dr. Fall (Dépt HEC)",
    progress: 35, // % complété
    modules: [
      {
        title: "Module 1 : Les Fondamentaux",
        lessons: [
          { id: 1, title: "Introduction au Leadership Serviteur", duration: "10:00", type: "video", completed: true },
          { id: 2, title: "La communication non-violente", duration: "15:30", type: "video", completed: true },
          { id: 3, title: "Quiz : Styles de Management", duration: "5 min", type: "quiz", completed: false },
        ]
      },
      {
        title: "Module 2 : Gestion de Projet",
        lessons: [
          { id: 4, title: "Définir des objectifs SMART", duration: "12:00", type: "video", completed: false },
          { id: 5, title: "La matrice d'Eisenhower", duration: "08:45", type: "video", completed: false },
        ]
      }
    ]
  };

  // Aplatir la liste des leçons pour la navigation précédente/suivante
  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLessonData = allLessons[activeLesson];

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden font-sans">
      
      {/* ZONE PRINCIPALE (VIDÉO) */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Header Minimaliste pour l'immersion */}
        <div className="h-16 bg-ucak-dark border-b border-white/10 flex items-center justify-between px-6 z-20">
          <Link to="/knowledge" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
            <ChevronLeft size={18} /> Retour au catalogue
          </Link>
          <h1 className="hidden md:block text-sm font-bold text-ucak-gold uppercase tracking-widest">{course.title}</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-full md:hidden">
            <Menu size={20} />
          </button>
        </div>

        {/* Le Player Vidéo */}
        <div className="flex-1 overflow-y-auto bg-black flex items-center justify-center relative">
          <div className="w-full max-w-5xl aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative group">
            {/* Simulation Vidéo (Image de fond) */}
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover opacity-50" 
              alt="Video thumbnail"
            />
            <button className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-20 h-20 bg-ucak-green/90 rounded-full flex items-center justify-center pl-1 shadow-lg shadow-ucak-green/40 backdrop-blur-sm">
                <Play fill="white" className="text-white w-8 h-8" />
              </div>
            </button>
            
            {/* Barre de contrôle factice */}
            <div className="absolute bottom-0 w-full h-1 bg-gray-700">
              <div className="w-1/3 h-full bg-ucak-gold"></div>
            </div>
          </div>
        </div>

        {/* Footer de Leçon */}
        <div className="h-20 bg-ucak-dark border-t border-white/10 flex items-center justify-between px-8">
          <div>
            <h2 className="text-lg font-bold text-white">{currentLessonData.title}</h2>
            <p className="text-xs text-gray-400">Leçon {activeLesson + 1} sur {allLessons.length}</p>
          </div>
          <div className="flex gap-4">
            <button 
              disabled={activeLesson === 0}
              onClick={() => setActiveLesson(l => l - 1)}
              className="px-6 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 disabled:opacity-50 text-sm font-bold"
            >
              Précédent
            </button>
            <button 
               onClick={() => setActiveLesson(l => Math.min(l + 1, allLessons.length - 1))}
               className="px-6 py-2 rounded-lg bg-ucak-green text-white hover:bg-green-600 flex items-center gap-2 text-sm font-bold shadow-lg shadow-ucak-green/20"
            >
              Suivant <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* SIDEBAR (Sommaire) */}
      <motion.div 
        initial={{ width: 350 }}
        animate={{ width: sidebarOpen ? 350 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="bg-ucak-dark-card border-l border-white/10 flex flex-col h-full overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h3 className="font-bold text-white mb-2">Contenu du cours</h3>
          {/* Barre de progression globale */}
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{course.progress}% Complété</span>
            <span>{course.modules.length} Modules</span>
          </div>
          <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div style={{ width: `${course.progress}%` }} className="h-full bg-ucak-gold"></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {course.modules.map((module, mIndex) => (
            <div key={mIndex}>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 ml-2">{module.title}</h4>
              <div className="space-y-1">
                {module.lessons.map((lesson, lIndex) => {
                  // Calculer l'index global pour savoir si c'est la leçon active
                  const globalIndex = course.modules.slice(0, mIndex).reduce((acc, m) => acc + m.lessons.length, 0) + lIndex;
                  const isActive = globalIndex === activeLesson;

                  return (
                    <button 
                      key={lesson.id}
                      onClick={() => setActiveLesson(globalIndex)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                        isActive 
                          ? 'bg-ucak-green/10 border border-ucak-green/30' 
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className={`mt-0.5 ${lesson.completed ? 'text-ucak-green' : isActive ? 'text-ucak-gold' : 'text-gray-600'}`}>
                        {lesson.completed ? <CheckCircle size={18} /> : (isActive ? <Play size={18} fill="currentColor" /> : <Lock size={18} />)}
                      </div>
                      <div>
                        <p className={`text-sm font-medium leading-tight ${isActive ? 'text-ucak-gold' : 'text-gray-300'}`}>
                          {lesson.title}
                        </p>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1 mt-1">
                          {lesson.type === 'video' ? <Play size={8}/> : <FileText size={8}/>} {lesson.duration}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}