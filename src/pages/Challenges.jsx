import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Timer, CheckCircle, XCircle, RefreshCw, Award, ArrowRight, 
  Zap, BrainCircuit, Code, Globe, Server, Database, Shield, Lock, Star, Flame 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

// --- MOCK DATA ENRICHI (BASÉ SUR MAQUETTE UCAK) ---
const QUIZ_DATA = [
  {
    id: 'web-mastery',
    category: 'Développement Web',
    level: 'Intermédiaire',
    xp: 500,
    icon: Globe,
    color: 'from-blue-500 to-cyan-400',
    questions: [
      { text: "Quel Hook React permet d'exécuter du code après le rendu ?", options: ["useState", "useEffect", "useContext", "useRender"], correct: 1 },
      { text: "Quelle unité CSS est relative à la taille de la police racine ?", options: ["em", "px", "rem", "%"], correct: 2 },
      { text: "Quel statut HTTP indique une ressource non trouvée ?", options: ["200", "500", "404", "403"], correct: 2 },
      { text: "En JS, quelle méthode transforme un tableau en string ?", options: ["join()", "concat()", "split()", "map()"], correct: 0 },
    ]
  },
  {
    id: 'network-ninja',
    category: 'Réseaux & Télécoms',
    level: 'Avancé',
    xp: 800,
    icon: Server,
    color: 'from-purple-500 to-indigo-500',
    questions: [
      { text: "À quelle couche du modèle OSI appartient l'adresse IP ?", options: ["Liaison (2)", "Réseau (3)", "Transport (4)", "Application (7)"], correct: 1 },
      { text: "Quel protocole est utilisé pour envoyer des emails ?", options: ["POP3", "IMAP", "SMTP", "HTTP"], correct: 2 },
      { text: "Quelle commande permet de tester la connectivité ?", options: ["ipconfig", "ping", "netstat", "traceroute"], correct: 1 },
      { text: "Combien de bits compose une adresse IPv4 ?", options: ["128", "64", "32", "16"], correct: 2 },
    ]
  },
  {
    id: 'algo-god',
    category: 'Algorithmique & C',
    level: 'Difficile',
    xp: 1000,
    icon: BrainCircuit,
    color: 'from-red-500 to-orange-500',
    questions: [
      { text: "Quelle est la complexité temporelle d'une recherche binaire ?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correct: 2 },
      { text: "En C, comment déclare-t-on un pointeur ?", options: ["int &x", "int *x", "ptr x", "pointer x"], correct: 1 },
      { text: "Quelle structure de données utilise le principe LIFO ?", options: ["File (Queue)", "Pile (Stack)", "Arbre", "Graphe"], correct: 1 },
    ]
  },
  {
    id: 'linux-cmd',
    category: 'Système Linux',
    level: 'Débutant',
    xp: 300,
    icon: Code,
    color: 'from-green-500 to-emerald-400',
    questions: [
      { text: "Quelle commande affiche le répertoire courant ?", options: ["ls", "cd", "pwd", "mkdir"], correct: 2 },
      { text: "Comment changer les permissions d'un fichier ?", options: ["chown", "chmod", "chperm", "sudo"], correct: 1 },
      { text: "Quel symbole redirige la sortie d'une commande ?", options: ["|", "<", ">", "&"], correct: 2 },
    ]
  },
  {
    id: 'cyber-sec',
    category: 'Cybersécurité',
    level: 'Expert',
    xp: 1200,
    icon: Shield,
    color: 'from-gray-700 to-gray-900',
    questions: [
      { text: "Quel type d'attaque sature un serveur de requêtes ?", options: ["Phishing", "DDoS", "SQL Injection", "XSS"], correct: 1 },
      { text: "Que signifie le 'S' dans HTTPS ?", options: ["Speed", "Secure", "Simple", "Standard"], correct: 1 },
    ]
  }
];

export default function Challenges() {
  const { user, updateUser } = useUser(); // Pour mettre à jour l'XP
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [streak, setStreak] = useState(3); // Mock de flamme

  // --- LOGIQUE DU JEU ---
  const handleStart = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    const isCorrect = index === activeQuiz.questions[currentQuestion].correct;
    
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQuestion < activeQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        finishGame(isCorrect);
      }
    }, 1200); // Temps pour voir la couleur
  };

  const finishGame = (lastAnswerCorrect) => {
    setShowResult(true);
    // Si score parfait, on ajoute des XP (Simulation)
    if (user) {
        // Logique fictive d'update XP
        // updateUser({ ...user, xp: user.xp + (activeQuiz.xp * (score / activeQuiz.questions.length)) });
    }
  };

  // --- VUE 1 : LE HUB DES DÉFIS ---
  if (!activeQuiz) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark transition-colors duration-300">
        <div className="container mx-auto px-6">
          
          {/* HEADER GAMIFIÉ */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-2">
                 <span className="bg-ucak-gold/10 text-ucak-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 border border-ucak-gold/20">
                    <Trophy size={12}/> Zone Arcade
                 </span>
                 <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 border border-red-500/20">
                    <Flame size={12}/> Série : {streak} jours
                 </span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white">
                Prêt à relever le <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green to-ucak-gold">Défi ?</span>
              </h1>
              <p className="text-gray-500 mt-2">Validez vos modules et grimpez dans le classement de l'UFR.</p>
            </div>

            {/* Carte de Profil Rapide */}
            {user && (
              <div className="bg-white dark:bg-ucak-dark-card p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-4 min-w-[250px]">
                 <div className="relative">
                    <img src={user.photo} className="w-12 h-12 rounded-full border-2 border-ucak-gold p-0.5" />
                    <div className="absolute -bottom-1 -right-1 bg-ucak-blue text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">Lvl 5</div>
                 </div>
                 <div>
                    <p className="font-bold text-sm dark:text-white">{user.name}</p>
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                       <div className="h-full bg-ucak-green w-[70%]"></div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">1250 / 2000 XP</p>
                 </div>
              </div>
            )}
          </div>

          {/* GRILLE DES QUIZ (STYLE CARTE "CLASH ROYALE") */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUIZ_DATA.map((quiz, index) => (
              <motion.div 
                key={quiz.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, rotate: 1 }}
                onClick={() => handleStart(quiz)}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${quiz.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                <div className="relative bg-white dark:bg-ucak-dark-card p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl overflow-hidden h-full flex flex-col">
                   
                   {/* Badge Niveau */}
                   <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${quiz.color} flex items-center justify-center text-white shadow-lg`}>
                         <quiz.icon size={28} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full text-gray-500 dark:text-gray-300">
                         {quiz.level}
                      </span>
                   </div>

                   <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">{quiz.category}</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{quiz.questions.length} questions pour tester votre expertise.</p>

                   <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-1 text-ucak-gold font-bold text-sm">
                         <Zap size={16} fill="currentColor"/> +{quiz.xp} XP
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-ucak-blue group-hover:text-white transition-colors">
                         <ArrowRight size={16}/>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
            
            {/* Carte "Bientôt" */}
            <div className="bg-gray-100 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-8 text-center opacity-70 hover:opacity-100 transition-opacity cursor-not-allowed">
               <Lock size={32} className="text-gray-400 mb-4"/>
               <h3 className="font-bold text-gray-500 dark:text-gray-400">Prochainement</h3>
               <p className="text-xs text-gray-400">Finance Islamique & Droit</p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- VUE 3 : RÉSULTATS (CONFETTI STYLE) ---
  if (showResult) {
    const percentage = Math.round((score / activeQuiz.questions.length) * 100);
    const isSuccess = percentage >= 50;

    return (
      <div className="min-h-screen bg-ucak-dark flex items-center justify-center p-6 relative overflow-hidden">
         {/* Background Effects */}
         <div className={`absolute inset-0 bg-gradient-to-br ${activeQuiz.color} opacity-20`}></div>
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

         <motion.div 
           initial={{ scale: 0.8, opacity: 0 }} 
           animate={{ scale: 1, opacity: 1 }}
           className="relative bg-white dark:bg-ucak-dark-card w-full max-w-md rounded-3xl p-8 text-center shadow-2xl border border-white/10 backdrop-blur-xl"
         >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
               <div className={`w-24 h-24 rounded-full border-8 border-ucak-dark bg-white flex items-center justify-center text-4xl shadow-xl ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
                  {isSuccess ? '🎉' : '💀'}
               </div>
            </div>

            <div className="mt-10">
               <h2 className="text-3xl font-black text-ucak-blue dark:text-white mb-2">
                  {isSuccess ? "Mission Accomplie !" : "Échec de la mission"}
               </h2>
               <p className="text-gray-500 mb-6">
                  Vous avez marqué <span className="font-bold text-ucak-gold text-lg">{score * 100} points</span> sur ce module.
               </p>

               {/* Jauge Circulaire Simple */}
               <div className="mb-8">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-ucak-green to-ucak-blue">
                     {percentage}%
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Précision</p>
               </div>

               <div className="grid gap-3">
                  <button onClick={() => setActiveQuiz(null)} className="w-full py-3.5 bg-ucak-blue hover:bg-ucak-green text-white rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                     <Award size={18}/> Réclamer mes récompenses
                  </button>
                  <button onClick={() => handleStart(activeQuiz)} className="w-full py-3.5 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                     <RefreshCw size={18}/> Recommencer
                  </button>
               </div>
            </div>
         </motion.div>
      </div>
    );
  }

  // --- VUE 2 : LE JEU EN COURS (IMMERSIVE) ---
  const question = activeQuiz.questions[currentQuestion];
  const progress = ((currentQuestion) / activeQuiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-ucak-dark text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
       
       {/* Background Ambiance */}
       <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${activeQuiz.color}`}></div>
       <div className="absolute top-10 right-10 opacity-20">
          <activeQuiz.icon size={200} />
       </div>

       <div className="w-full max-w-2xl relative z-10">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
             <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{activeQuiz.category}</p>
                <div className="flex items-center gap-2">
                   <span className="text-2xl font-black text-white">Question {currentQuestion + 1}</span>
                   <span className="text-xl text-gray-500">/ {activeQuiz.questions.length}</span>
                </div>
             </div>
             <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg font-mono font-bold text-ucak-gold border border-white/10 flex items-center gap-2">
                <Timer size={16}/> 00:30
             </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-800 rounded-full mb-12 overflow-hidden">
             <motion.div 
               className={`h-full bg-gradient-to-r ${activeQuiz.color}`}
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
             ></motion.div>
          </div>

          {/* La Question */}
          <motion.h2 
            key={question.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold mb-10 leading-relaxed"
          >
             {question.text}
          </motion.h2>

          {/* Les Options */}
          <div className="grid gap-4">
             {question.options.map((option, index) => {
               // États de couleur
               let stateClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30"; // Défaut
               
               if (selectedAnswer !== null) {
                  if (index === question.correct) stateClass = "bg-green-500/20 border-green-500 text-green-400"; // Bonne réponse
                  else if (selectedAnswer === index) stateClass = "bg-red-500/20 border-red-500 text-red-400"; // Mauvaise réponse sélectionnée
                  else stateClass = "opacity-30"; // Autres options
               }

               return (
                 <motion.button
                   key={index}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                   onClick={() => !selectedAnswer && handleAnswer(index)}
                   disabled={selectedAnswer !== null}
                   className={`w-full text-left p-6 rounded-2xl border-2 font-bold text-lg transition-all flex justify-between items-center group ${stateClass}`}
                 >
                   <span className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border ${selectedAnswer === null ? 'border-white/20 bg-white/5' : 'border-current'}`}>
                         {['A', 'B', 'C', 'D'][index]}
                      </span>
                      {option}
                   </span>
                   
                   {/* Icône de résultat */}
                   {selectedAnswer !== null && index === question.correct && <CheckCircle className="text-green-500" />}
                   {selectedAnswer === index && index !== question.correct && <XCircle className="text-red-500" />}
                 </motion.button>
               );
             })}
          </div>

          {/* Bouton Abandon */}
          <div className="mt-12 text-center">
             <button onClick={() => setActiveQuiz(null)} className="text-gray-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">
                Abandonner la mission
             </button>
          </div>

       </div>
    </div>
  );
}