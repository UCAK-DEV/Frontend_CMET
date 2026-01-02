import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, CheckCircle, XCircle, RefreshCw, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Challenges() {
  const [activeQuiz, setActiveQuiz] = useState(null); // null = Liste, objet = Quiz en cours
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // DONNÉES DES QUIZ
  const quizzes = [
    {
      id: 1,
      title: "Culture Générale Tech",
      desc: "Testez vos connaissances sur l'histoire de l'informatique et les nouvelles technos.",
      questions: [
        { text: "Quel langage est utilisé pour le style des pages web ?", options: ["HTML", "CSS", "Python", "Java"], correct: 1 },
        { text: "Que signifie 'CPU' ?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit"], correct: 0 },
        { text: "Qui a fondé Microsoft ?", options: ["Steve Jobs", "Bill Gates", "Elon Musk"], correct: 1 },
      ]
    },
    {
      id: 2,
      title: "Finance Islamique",
      desc: "Les principes fondamentaux de la finance éthique selon le Mouridisme.",
      questions: [
        { text: "L'intérêt (Riba) est-il permis ?", options: ["Oui", "Non", "Parfois"], correct: 1 },
        { text: "Qu'est-ce que la Zakat ?", options: ["Une taxe", "L'aumône légale", "Un investissement"], correct: 1 },
      ]
    }
  ];

  // LOGIQUE DU JEU
  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    
    // Délai pour montrer la couleur (Vert/Rouge)
    setTimeout(() => {
      if (optionIndex === activeQuiz.questions[currentQuestion].correct) {
        setScore(score + 1);
      }

      if (currentQuestion < activeQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setActiveQuiz(null);
  };

  // --- ÉCRAN 1 : LISTE DES QUIZ ---
  if (!activeQuiz) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-ucak-gold font-bold tracking-widest text-xs uppercase mb-2 block">Zone de Test</span>
            <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-4">Challenges & <span className="text-ucak-green">Quiz</span></h1>
            <p className="text-gray-600 dark:text-gray-400">Gagnez des points XP en validant vos acquis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {quizzes.map((quiz) => (
              <motion.div 
                key={quiz.id} 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-ucak-dark-card p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-ucak-blue/5 rounded-full -mr-10 -mt-10 group-hover:bg-ucak-blue/10 transition-colors"></div>
                <Trophy className="text-ucak-gold mb-6" size={40} />
                <h3 className="text-xl font-bold text-ucak-blue dark:text-white mb-2">{quiz.title}</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">{quiz.desc}</p>
                <button 
                  onClick={() => startQuiz(quiz)}
                  className="w-full py-3 bg-ucak-blue text-white rounded-xl font-bold hover:bg-ucak-green transition-colors flex items-center justify-center gap-2"
                >
                  Commencer <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- ÉCRAN 3 : RÉSULTATS ---
  if (showResult) {
    const percentage = (score / activeQuiz.questions.length) * 100;
    const isSuccess = percentage >= 50;

    return (
      <div className="min-h-screen bg-ucak-blue flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-ucak-dark-card w-full max-w-lg rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden"
        >
          {isSuccess && <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>}
          
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
             {isSuccess ? <Award size={48} /> : <XCircle size={48} />}
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
            {isSuccess ? "Félicitations !" : "Dommage..."}
          </h2>
          <p className="text-gray-500 mb-8">
            Vous avez obtenu <span className="font-bold text-ucak-blue dark:text-white text-xl">{score} / {activeQuiz.questions.length}</span> bonnes réponses.
          </p>

          <div className="flex flex-col gap-3">
             <button onClick={resetGame} className="w-full py-3 bg-ucak-blue text-white rounded-xl font-bold hover:bg-ucak-green transition-colors flex items-center justify-center gap-2">
                <RefreshCw size={18} /> Revenir aux Quiz
             </button>
             {isSuccess && (
               <Link to="/dashboard" className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                  Voir mes Badges
               </Link>
             )}
          </div>
        </motion.div>
      </div>
    );
  }

  // --- ÉCRAN 2 : QUESTION EN COURS ---
  const question = activeQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        
        {/* Barre de progression */}
        <div className="flex justify-between items-center mb-6 text-sm font-bold text-gray-500">
           <span>Question {currentQuestion + 1} / {activeQuiz.questions.length}</span>
           <span className="flex items-center gap-1 text-ucak-gold"><Timer size={16} /> Temps libre</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-10 overflow-hidden">
           <motion.div 
             className="h-full bg-ucak-green"
             initial={{ width: 0 }}
             animate={{ width: `${((currentQuestion + 1) / activeQuiz.questions.length) * 100}%` }}
           ></motion.div>
        </div>

        {/* Carte Question */}
        <div className="bg-white dark:bg-ucak-dark-card rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
           <h2 className="text-2xl font-bold text-ucak-blue dark:text-white mb-8 leading-relaxed">
             {question.text}
           </h2>

           <div className="space-y-4">
             {question.options.map((option, index) => {
               const isSelected = selectedAnswer === index;
               const isCorrect = index === question.correct;
               // Couleur si sélectionné : Vert si juste, Rouge si faux (après réponse)
               let btnClass = "bg-gray-50 dark:bg-white/5 border-transparent hover:border-ucak-blue hover:bg-blue-50 dark:hover:bg-white/10";
               
               if (selectedAnswer !== null) {
                  if (isCorrect) btnClass = "bg-green-100 border-green-500 text-green-800";
                  else if (isSelected) btnClass = "bg-red-100 border-red-500 text-red-800";
                  else btnClass = "opacity-50"; // Griser les autres
               }

               return (
                 <button
                   key={index}
                   onClick={() => handleAnswer(index)}
                   disabled={selectedAnswer !== null}
                   className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all flex justify-between items-center ${btnClass}`}
                 >
                   {option}
                   {selectedAnswer !== null && isCorrect && <CheckCircle className="text-green-600" size={20} />}
                 </button>
               );
             })}
           </div>
        </div>
        
        <div className="text-center mt-8">
           <button onClick={() => setActiveQuiz(null)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">Annuler le quiz</button>
        </div>

      </div>
    </div>
  );
}