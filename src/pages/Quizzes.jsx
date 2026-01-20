// src/pages/Quizzes.jsx
import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Trophy, Timer, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get('/api/v1/quizzes').then(res => setQuizzes(res.data));
  }, []);

  const handleAnswer = (index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = index;
    setSelectedAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < activeQuiz.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    const res = await api.post(`/api/v1/quizzes/${activeQuiz.id}/submit`, {
      answers: selectedAnswers
    });
    setResult(res.data);
  };

  if (result) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-ucak-dark">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-2xl text-center max-w-md border border-white/5">
        <Trophy className={`mx-auto mb-6 ${result.passed ? 'text-ucak-gold' : 'text-gray-400'}`} size={80} />
        <h2 className="text-3xl font-black dark:text-white mb-2">{result.passed ? "Félicitations !" : "Presque !"}</h2>
        <p className="text-gray-500 mb-8">Score : {result.score} / {result.total}</p>
        <div className="bg-ucak-blue/10 p-6 rounded-3xl mb-8">
          <span className="text-4xl font-black text-ucak-blue">+{result.xpGained} XP</span>
        </div>
        <button onClick={() => window.location.reload()} className="w-full py-4 bg-ucak-blue text-white rounded-2xl font-bold">Retour aux Quiz</button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 px-4">
      <div className="max-w-6xl mx-auto">
        {!activeQuiz ? (
          <>
            <h1 className="text-4xl font-black dark:text-white mb-8">Académie <span className="text-ucak-blue">MET</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map(quiz => (
                <div key={quiz.id} className="bg-white dark:bg-ucak-dark-card p-8 rounded-[2.5rem] border border-white/5 shadow-xl hover:scale-105 transition-transform cursor-pointer" onClick={() => setActiveQuiz(quiz)}>
                  <Brain className="text-ucak-blue mb-4" size={32} />
                  <h3 className="text-xl font-bold dark:text-white mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-500 mb-6">{quiz.description}</p>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-ucak-blue">
                    <span>{quiz.difficulty}</span>
                    <span>{quiz.xp_reward} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <span className="text-xs font-black text-ucak-blue uppercase">Question {currentStep + 1} / {activeQuiz.questions.length}</span>
              <div className="h-2 w-32 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-ucak-blue" style={{ width: `${((currentStep + 1) / activeQuiz.questions.length) * 100}%` }}></div>
              </div>
            </div>
            <h2 className="text-2xl font-black dark:text-white mb-8">{activeQuiz.questions[currentStep].text}</h2>
            <div className="space-y-4">
              {activeQuiz.questions[currentStep].options.map((option, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-6 rounded-2xl text-left font-bold transition-all border ${selectedAnswers[currentStep] === idx ? 'bg-ucak-blue text-white border-ucak-blue shadow-lg' : 'bg-white dark:bg-white/5 dark:text-gray-300 border-transparent hover:border-ucak-blue/30'}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button 
              disabled={selectedAnswers[currentStep] === undefined}
              onClick={nextStep}
              className="mt-10 w-full py-5 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-ucak-green disabled:opacity-50"
            >
              {currentStep === activeQuiz.questions.length - 1 ? "Terminer" : "Suivant"} <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}