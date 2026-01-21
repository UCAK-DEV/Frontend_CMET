import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Plus, Trash2, Brain, BarChart3, 
  X, CheckCircle2, ChevronRight, Layers,
  Trophy, Search, Loader2, Sparkles
} from 'lucide-react';

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    xp_reward: 100,
    questions: [{ text: '', options: ['', '', ''], correct_answer_index: 0 }]
  });

  useEffect(() => { fetchQuizzes(); }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await api.get('/api/v1/quizzes');
      setQuizzes(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { text: '', options: ['', '', ''], correct_answer_index: 0 }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/v1/quizzes', formData);
      setIsModalOpen(false);
      fetchQuizzes();
    } catch (err) { alert("Erreur lors de la création"); }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-32 pb-20 px-6 relative">
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-ucak-blue mb-4">
              <Sparkles size={16} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Innovation Lab - Gamification</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
              Quiz Hub<span className="text-ucak-blue">.</span>
            </h1>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-5 bg-ucak-blue text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-ucak-blue/20"
          >
            <Plus size={20} /> Créer un Quiz
          </motion.button>
        </header>

        {/* --- GRID DE QUIZ --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-ucak-blue" size={40} /></div>
          ) : (
            quizzes.map((quiz, idx) => (
              <motion.div 
                key={quiz.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-[#0b101a] rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/5 relative group hover:shadow-2xl transition-all"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-ucak-blue/10 text-ucak-blue rounded-2xl">
                    <Brain size={24} />
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest
                    ${quiz.difficulty === 'beginner' ? 'bg-ucak-green/10 text-ucak-green' : 'bg-ucak-gold/10 text-ucak-gold'}`}>
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-2xl font-black dark:text-white mb-4 leading-tight group-hover:text-ucak-blue transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium mb-10 line-clamp-2">
                  {quiz.description}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-2 text-ucak-gold">
                    <Trophy size={14} />
                    <span className="text-[10px] font-black">{quiz.xp_reward} XP</span>
                  </div>
                  <button onClick={async () => { await api.delete(`/api/v1/quizzes/${quiz.id}`); fetchQuizzes(); }} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* --- MODAL CRÉATION "QUIZ ARCHITECT" --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#020408]/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-[#0b101a] w-full max-w-4xl rounded-[3rem] p-12 shadow-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-black dark:text-white tracking-tighter">Nouvel <span className="text-ucak-blue">Examen.</span></h2>
                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-gray-100 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-red-500 transition-colors"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest">Configuration Générale</label>
                    <input required placeholder="Titre du Quiz" className="w-full p-5 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white font-bold" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    <textarea required placeholder="Description pédagogique..." className="w-full p-5 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none focus:ring-2 ring-ucak-blue/20 dark:text-white h-24 resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest">Récompense & Niveau</label>
                    <select className="w-full p-5 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none dark:text-white font-bold" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
                      <option value="beginner">Débutant (L1)</option>
                      <option value="intermediate">Intermédiaire (L2)</option>
                      <option value="expert">Expert (L3)</option>
                    </select>
                    <input type="number" placeholder="Points XP" className="w-full p-5 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none dark:text-white font-bold" value={formData.xp_reward} onChange={e => setFormData({...formData, xp_reward: Number(e.target.value)})} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Questions ({formData.questions.length})</label>
                    <button type="button" onClick={handleAddQuestion} className="text-xs font-black text-ucak-blue uppercase flex items-center gap-2"><Plus size={16} /> Ajouter une question</button>
                  </div>
                  
                  <div className="max-h-60 overflow-y-auto pr-4 space-y-6 custom-scrollbar">
                    {formData.questions.map((q, qIdx) => (
                      <div key={qIdx} className="p-8 bg-gray-50 dark:bg-white/5 rounded-[2rem] border border-gray-100 dark:border-white/5 space-y-4">
                        <input placeholder={`Question ${qIdx + 1}`} className="w-full bg-transparent border-b border-gray-200 dark:border-white/10 py-2 outline-none dark:text-white font-bold" value={q.text} onChange={e => {
                          const newQ = [...formData.questions];
                          newQ[qIdx].text = e.target.value;
                          setFormData({...formData, questions: newQ});
                        }} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {q.options.map((opt, oIdx) => (
                            <input key={oIdx} placeholder={`Option ${oIdx + 1}`} className={`p-3 rounded-xl text-xs outline-none transition-all ${q.correct_answer_index === oIdx ? 'bg-ucak-green/10 border-ucak-green text-ucak-green' : 'bg-white dark:bg-white/5 dark:text-white'}`} value={opt} onChange={e => {
                              const newQ = [...formData.questions];
                              newQ[qIdx].options[oIdx] = e.target.value;
                              setFormData({...formData, questions: newQ});
                            }} onClick={() => {
                              const newQ = [...formData.questions];
                              newQ[qIdx].correct_answer_index = oIdx;
                              setFormData({...formData, questions: newQ});
                            }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-6 bg-ucak-blue text-white rounded-3xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-ucak-blue/30 flex items-center justify-center gap-3">
                  <Zap size={18} /> Déployer le Quiz sur le Hub
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}