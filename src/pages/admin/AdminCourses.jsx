// src/pages/admin/AdminCourses.jsx
import { useState } from 'react';
import { api } from '../../context/UserContext';
import { motion } from 'framer-motion';
import { Plus, Save, Trash2, BookOpen } from 'lucide-react';

export default function AdminCourses() {
  const [form, setForm] = useState({ title: '', description: '', file_url: '', category: 'Informatique', level: 'L1' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/v1/courses', form);
      alert("Cours ajouté avec succès !");
      setForm({ title: '', description: '', file_url: '', category: 'Informatique', level: 'L1' });
    } catch (err) { alert("Erreur d'ajout"); }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-2xl border border-white/5">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-3 dark:text-white">
          <BookOpen className="text-ucak-blue" /> Publier une ressource
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-1">Titre du support</label>
            <input required className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none mt-2 dark:text-white" placeholder="Ex: Algorithmique Avancée" onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-black uppercase text-gray-400 ml-1">Catégorie</label>
            <select className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none mt-2 dark:text-white" onChange={e => setForm({...form, category: e.target.value})}>
              <option>Informatique</option>
              <option>Management</option>
              <option>Réseaux</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-black uppercase text-gray-400 ml-1">Niveau</label>
            <select className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none mt-2 dark:text-white" onChange={e => setForm({...form, level: e.target.value})}>
              <option>L1</option>
              <option>L2</option>
              <option>L3</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-black uppercase text-gray-400 ml-1">Lien du fichier (Drive/Dropbox)</label>
            <input required className="w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl outline-none mt-2 dark:text-white" placeholder="https://..." onChange={e => setForm({...form, file_url: e.target.value})} />
          </div>
          <button className="md:col-span-2 py-4 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest hover:bg-ucak-green transition-all shadow-xl">
            Sauvegarder la ressource
          </button>
        </form>
      </div>
    </div>
  );
}