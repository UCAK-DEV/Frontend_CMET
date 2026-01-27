// src/pages/admin/AdminCourses.jsx
import { useState, useEffect } from 'react';
import { api } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Save, Trash2, BookOpen, FileText, Loader2 } from 'lucide-react';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', file_url: '', category: 'Informatique', level: 'L1' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/api/v1/courses');
      setCourses(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/v1/courses', form);
      alert("Cours ajouté avec succès !");
      setForm({ title: '', description: '', file_url: '', category: 'Informatique', level: 'L1' });
      fetchCourses();
    } catch (err) { alert("Erreur d'ajout"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce cours ?")) return;
    try {
      await api.delete(`/api/v1/courses/${id}`);
      fetchCourses();
    } catch (err) { alert("Impossible de supprimer"); }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Formulaire d'ajout */}
        <div className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-2xl border border-white/5">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-3 dark:text-white">
            <BookOpen className="text-ucak-blue" /> Publier une ressource
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-black uppercase text-gray-400 ml-1">Titre du support</label>
              <input required className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none mt-2 dark:text-white" placeholder="Ex: Algorithmique Avancée" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 ml-1">Catégorie</label>
              <select className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none mt-2 dark:text-white" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option>Informatique</option>
                <option>Management</option>
                <option>Réseaux</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase text-gray-400 ml-1">Niveau</label>
              <select className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none mt-2 dark:text-white" value={form.level} onChange={e => setForm({...form, level: e.target.value})}>
                <option>L1</option>
                <option>L2</option>
                <option>L3</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-black uppercase text-gray-400 ml-1">Lien du fichier (Drive/Dropbox)</label>
              <input required className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none mt-2 dark:text-white" placeholder="https://..." value={form.file_url} onChange={e => setForm({...form, file_url: e.target.value})} />
            </div>
            <button className="md:col-span-2 py-4 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest hover:bg-ucak-green transition-all shadow-xl">
              Sauvegarder la ressource
            </button>
          </form>
        </div>

        {/* Liste des cours existants */}
        <div className="space-y-6">
          <h3 className="text-xl font-black dark:text-white ml-4">Bibliothèque existante ({courses.length})</h3>
          
          {loading ? (
            <div className="text-center py-10"><Loader2 className="animate-spin text-ucak-blue mx-auto" /></div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {courses.map((course) => (
                  <motion.div 
                    key={course.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white dark:bg-ucak-dark-card p-6 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-ucak-blue/10 rounded-2xl flex items-center justify-center text-ucak-blue">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold dark:text-white text-lg">{course.title}</h4>
                        <div className="flex gap-3 mt-1">
                          <span className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-500 font-bold uppercase">{course.category}</span>
                          <span className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-500 font-bold uppercase">{course.level}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(course.id)}
                      className="p-3 bg-red-50 dark:bg-white/5 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {courses.length === 0 && <p className="text-gray-400 text-center italic">Aucun cours publié.</p>}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}