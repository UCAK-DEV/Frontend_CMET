import { useState } from 'react';
import { api } from '../../context/UserContext';
import { Plus, Trash2, Video, FileText, Save, LayoutList, ShieldAlert, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminCourses() {
  const [courseData, setCourseData] = useState({
    title: '', instructor_name: '', description: '',
    filiere_tag: 'Informatique', level: 'Débutant',
    modules: [] 
  });

  const [newModule, setNewModule] = useState({ title: '', video_url: '', pdf_url: '' });
  const [status, setStatus] = useState(null);

  const addModule = () => {
    if (!newModule.title || !newModule.video_url) return alert("Titre et lien vidéo requis");
    setCourseData({ ...courseData, modules: [...courseData.modules, newModule] });
    setNewModule({ title: '', video_url: '', pdf_url: '' });
  };

  const removeModule = (index) => {
    setCourseData({ ...courseData, modules: courseData.modules.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/api/v1/courses', courseData);
      setStatus('success');
      setCourseData({ title: '', instructor_name: '', description: '', filiere_tag: 'Informatique', level: 'Débutant', modules: [] });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0f172a] text-white px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/30 mb-2">
              <ShieldAlert size={12} /> Zone Webmaster
            </div>
            <h1 className="text-3xl font-black text-white">Gestion des Cours</h1>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm text-gray-400">Modules</p>
            <p className="text-3xl font-black text-ucak-blue">{courseData.modules.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-ucak-blue"><LayoutList size={20}/> Général</h3>
              <div className="space-y-4">
                <input placeholder="Titre du Cours" value={courseData.title} onChange={(e) => setCourseData({...courseData, title: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none" />
                <input placeholder="Instructeur (ex: Dr. Sene)" value={courseData.instructor_name} onChange={(e) => setCourseData({...courseData, instructor_name: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none" />
                <select value={courseData.filiere_tag} onChange={(e) => setCourseData({...courseData, filiere_tag: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none">
                  <option value="Informatique">Informatique</option>
                  <option value="HEC">HEC</option>
                  <option value="Génie Civil">Génie Civil</option>
                </select>
                <select value={courseData.level} onChange={(e) => setCourseData({...courseData, level: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none">
                  <option value="Débutant">Débutant (L1)</option>
                  <option value="Intermédiaire">Intermédiaire (L2)</option>
                  <option value="Avancé">Avancé (L3)</option>
                </select>
                <textarea placeholder="Description..." value={courseData.description} onChange={(e) => setCourseData({...courseData, description: e.target.value})} className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none min-h-[100px]" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 bg-ucak-blue/5 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10 text-white"><Plus size={20} className="text-ucak-blue"/> Ajouter un Chapitre</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative z-10">
                <input placeholder="Titre du Chapitre" value={newModule.title} onChange={(e) => setNewModule({...newModule, title: e.target.value})} className="md:col-span-2 w-full p-3 bg-black/40 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none font-bold" />
                <div className="relative"><Video size={16} className="absolute left-3 top-3.5 text-red-400" /><input placeholder="Lien YouTube" value={newModule.video_url} onChange={(e) => setNewModule({...newModule, video_url: e.target.value})} className="w-full pl-10 p-3 bg-black/40 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none" /></div>
                <div className="relative"><FileText size={16} className="absolute left-3 top-3.5 text-blue-400" /><input placeholder="Lien PDF (Optionnel)" value={newModule.pdf_url} onChange={(e) => setNewModule({...newModule, pdf_url: e.target.value})} className="w-full pl-10 p-3 bg-black/40 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none" /></div>
              </div>
              <button onClick={addModule} className="w-full py-3 bg-ucak-blue hover:bg-ucak-green text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-lg">+ Ajouter ce module</button>
            </div>

            <div className="space-y-3">
              {courseData.modules.map((mod, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-black text-gray-400">{idx + 1}</span>
                    <div>
                      <p className="font-bold text-sm text-white">{mod.title}</p>
                      <div className="flex gap-4 text-[10px] text-gray-400 mt-1">
                        <span className="flex items-center gap-1 text-red-400"><Video size={12}/> Vidéo</span>
                        {mod.pdf_url && <span className="flex items-center gap-1 text-blue-400"><FileText size={12}/> PDF</span>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeModule(idx)} className="p-2 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
               {status === 'success' && <span className="text-green-400 text-xs font-bold animate-pulse">Cours publié !</span>}
               {status === 'error' && <span className="text-red-400 text-xs font-bold">Erreur technique.</span>}
               <button onClick={handleSubmit} disabled={status === 'loading' || courseData.modules.length === 0} className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-black uppercase tracking-widest shadow-xl disabled:opacity-50 flex items-center gap-3 transition-all ml-auto">
                 {status === 'loading' ? '...' : <><Save size={18}/> Publier</>}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}