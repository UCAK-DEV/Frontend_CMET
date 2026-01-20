// src/pages/admin/AdminQuizzes.jsx
import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Brain, Save, X, PlusCircle, CheckCircle } from 'lucide-react';

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '', description: '', difficulty: 'beginner', xp_reward: 100,
    questions: [{ text: '', options: ['', '', '', ''], correct_answer_index: 0 }]
  });

  useEffect(() => { fetchQuizzes(); }, []);

  const fetchQuizzes = async () => {
    const res = await api.get('/api/v1/quizzes');
    setQuizzes(res.data);
  };

  const addQuestion = () => {
    setNewQuiz({ ...newQuiz, questions: [...newQuiz.questions, { text: '', options: ['', '', '', ''], correct_answer_index: 0 }] });
  };

  const removeQuestion = (qIdx) => {
    const filtered = newQuiz.questions.filter((_, i) => i !== qIdx);
    setNewQuiz({ ...newQuiz, questions: filtered });
  };

  const updateQuestion = (qIdx, field, value) => {
    const updated = [...newQuiz.questions];
    updated[qIdx][field] = value;
    setNewQuiz({ ...newQuiz, questions: updated });
  };

  const updateOption = (qIdx, oIdx, value) => {
    const updated = [...newQuiz.questions];
    updated[qIdx].options[oIdx] = value;
    setNewQuiz({ ...newQuiz, questions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/v1/quizzes', newQuiz);
      setShowModal(false);
      fetchQuizzes();
    } catch (err) { alert("Erreur lors de la création"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce quiz ?")) {
      await api.delete(`/api/v1/quizzes/${id}`);
      fetchQuizzes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black dark:text-white">Gestion des <span className="text-ucak-blue">Quiz</span></h1>
          <button onClick={() => setShowModal(true)} className="bg-ucak-blue text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
            <Plus size={20} /> Créer un Quiz
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-[2rem] border border-white/5 shadow-xl flex justify-between items-center group">
              <div>
                <h3 className="text-lg font-bold dark:text-white">{quiz.title}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{quiz.questions.length} Questions • {quiz.xp_reward} XP</p>
              </div>
              <button onClick={() => handleDelete(quiz.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL CRÉATION --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-ucak-dark-card w-full max-w-4xl h-[85vh] rounded-[2.5rem] p-10 shadow-2xl overflow-y-auto border border-white/10 scrollbar-hide">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black dark:text-white flex items-center gap-3"><Brain className="text-ucak-blue" /> Nouveau Défi Tech</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X size={30} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required placeholder="Titre du Quiz" className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none dark:text-white border border-transparent focus:border-ucak-blue" value={newQuiz.title} onChange={e => setNewQuiz({...newQuiz, title: e.target.value})} />
                  <select className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none dark:text-white border border-transparent focus:border-ucak-blue" value={newQuiz.difficulty} onChange={e => setNewQuiz({...newQuiz, difficulty: e.target.value})}>
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Expert</option>
                  </select>
                </div>
                <textarea placeholder="Description pédagogique" className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none dark:text-white min-h-[100px]" value={newQuiz.description} onChange={e => setNewQuiz({...newQuiz, description: e.target.value})} />

                <div className="space-y-10">
                  {newQuiz.questions.map((q, qIdx) => (
                    <div key={qIdx} className="bg-gray-50 dark:bg-white/5 p-8 rounded-3xl relative border-l-4 border-ucak-blue">
                      <button type="button" onClick={() => removeQuestion(qIdx)} className="absolute top-4 right-4 text-red-400"><Trash2 size={18} /></button>
                      <input required placeholder={`Question ${qIdx + 1}`} className="w-full bg-transparent text-xl font-bold dark:text-white mb-6 outline-none border-b border-white/10 pb-2" value={q.text} onChange={e => updateQuestion(qIdx, 'text', e.target.value)} />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name={`correct-${qIdx}`} 
                              checked={q.correct_answer_index === oIdx} 
                              onChange={() => updateQuestion(qIdx, 'correct_answer_index', oIdx)}
                              className="accent-ucak-blue w-5 h-5"
                            />
                            <input required placeholder={`Option ${oIdx + 1}`} className="flex-1 bg-white/5 p-3 rounded-lg outline-none text-sm dark:text-gray-300" value={opt} onChange={e => updateOption(qIdx, oIdx, e.target.value)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={addQuestion} className="flex-1 py-4 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl text-gray-500 font-bold flex items-center justify-center gap-2 hover:border-ucak-blue hover:text-ucak-blue transition-all">
                    <PlusCircle size={20} /> Ajouter une question
                  </button>
                  <button type="submit" disabled={loading} className="flex-1 py-4 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-ucak-green transition-all">
                    {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle size={20} /> Publier le Quiz</>}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}