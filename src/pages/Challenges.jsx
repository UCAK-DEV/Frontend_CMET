import { motion } from 'framer-motion';
import { Trophy, Clock, Target, Star, Play, Award, Zap } from 'lucide-react';

export default function Challenges() {
  const quizzes = [
    { id: 1, title: "Algorithmique & Python", level: "Débutant", points: 100, color: "text-blue-500" },
    { id: 2, title: "React.js & Hooks", level: "Intermédiaire", points: 250, color: "text-ucak-green" },
    { id: 3, title: "Cybersécurité Islamique", level: "Avancé", points: 300, color: "text-purple-500" },
  ];

  const leaderboard = [
    { rank: 1, name: "Moussa Diop", points: 1250, badge: "Génie" },
    { rank: 2, name: "Fatou Ndiaye", points: 980, badge: "Expert" },
    { rank: 3, name: "Amadou Ba", points: 850, badge: "Explorateur" },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-4">
            Challenge <span className="text-ucak-gold">Hub</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            "La compétition dans le bien est la meilleure des compétitions."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GAUCHE : QUIZZ */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-ucak-blue dark:text-white flex items-center gap-3 mb-6">
              <Zap className="text-ucak-gold fill-ucak-gold" /> Quizz Disponibles
            </h2>
            
            {quizzes.map((quiz, index) => (
              <motion.div 
                key={quiz.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                className="card-base p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-ucak-gold/50 transition-colors"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-black text-2xl ${quiz.color}`}>
                    {quiz.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-ucak-blue dark:text-white">{quiz.title}</h3>
                    <div className="flex gap-4 text-sm mt-2">
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium text-xs">{quiz.level}</span>
                      <span className="flex items-center gap-1 text-ucak-gold font-bold text-xs"><Trophy size={12}/> {quiz.points} pts</span>
                    </div>
                  </div>
                </div>
                <button className="whitespace-nowrap bg-ucak-blue dark:bg-white text-white dark:text-ucak-blue px-8 py-3 rounded-xl font-bold hover:bg-ucak-green dark:hover:bg-ucak-gold transition-all shadow-lg shadow-ucak-blue/20">
                  Commencer
                </button>
              </motion.div>
            ))}
          </div>

          {/* DROITE : LEADERBOARD (Style Podium) */}
          <div className="card-base p-8 rounded-3xl border-t-4 border-ucak-gold h-fit">
            <div className="flex items-center gap-2 mb-8">
              <Trophy className="text-ucak-gold w-6 h-6" />
              <h2 className="text-xl font-bold text-ucak-blue dark:text-white">Top Étudiants</h2>
            </div>

            <div className="space-y-6">
              {leaderboard.map((user, index) => (
                <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold ring-4 ring-opacity-20 ${
                      index === 0 ? 'bg-ucak-gold text-white ring-ucak-gold' : 
                      index === 1 ? 'bg-gray-300 text-white ring-gray-300' : 
                      index === 2 ? 'bg-orange-400 text-white ring-orange-400' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-ucak-blue dark:text-white">{user.name}</p>
                      <p className="text-xs text-ucak-green dark:text-ucak-gold font-medium">{user.badge}</p>
                    </div>
                  </div>
                  <span className="font-black text-gray-900 dark:text-white">{user.points}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Classement mis à jour chaque semaine</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}