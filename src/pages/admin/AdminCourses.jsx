import { useState } from 'react';
import { api } from '../../context/UserContext';
import { Plus, Trash2, Video, FileText, Save, LayoutList, ShieldAlert, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminCourses() {
  // État global du cours
  const [courseData, setCourseData] = useState({
    title: '', instructor_name: '', description: '',
    filiere_tag: 'Informatique', level: 'Débutant',
    modules: [] // Liste des chapitres
  });

  // État temporaire pour le module en cours d'ajout
  const [newModule, setNewModule] = useState({ title: '', video_url: '', pdf_url: '' });
  const [status, setStatus] = useState(null);

  // Ajout d'un module à la liste
  const addModule = () => {
    if (!newModule.title || !newModule.video_url) return alert("Titre et lien vidéo obligatoires");
    setCourseData({ ...courseData, modules: [...courseData.modules, newModule] });
    setNewModule({ title: '', video_url: '', pdf_url: '' }); // Reset des champs
  };

  // Suppression d'un module
  const removeModule = (index) => {
    const updated = courseData.modules.filter((_, i) => i !== index);
    setCourseData({ ...courseData, modules: updated });
  };

  // Envoi au Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/api/v1/courses', courseData);
      setStatus('success');
      // Reset complet du formulaire
      setCourseData({ title: '', instructor_name: '', description: '', filiere_tag: 'Informatique', level: 'Débutant', modules: [] });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0f172a] text-white px-6">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Admin */}
        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/30 mb-2">
              <ShieldAlert size={12} /> Zone Webmaster
            </div>
            <h1 className="text-3xl font-black text-white">Gestion des Cours</h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-gray-400">Total Modules</p>
            <p className="text-3xl font-black text-ucak-blue">{courseData.modules.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLONNE GAUCHE : INFOS GÉNÉRALES */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-ucak-blue"><LayoutList size={20}/> Informations</h3>
              <div className="space-y-4">
                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Titre du Cours</label>
                    <input 
                    placeholder="Ex: Réseaux TCP/IP" 
                    value={courseData.title}
                    onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                    className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Instructeur</label>
                    <input 
                    placeholder="Ex: Dr. Sene" 
                    value={courseData.instructor_name}
                    onChange={(e) => setCourseData({...courseData, instructor_name: e.target.value})}
                    className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Filière</label>
                    <select 
                    value={courseData.filiere_tag}
                    onChange={(e) => setCourseData({...courseData, filiere_tag: e.target.value})}
                    className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none transition-colors"
                    >
                    <option value="Informatique">Informatique</option>
                    <option value="HEC">HEC / Gestion</option>
                    <option value="Génie Civil">Génie Civil</option>
                    </select>
                </div>
                <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">Niveau</label>
                    <select 
                    value={courseData.level}
                    onChange={(e) => setCourseData({...courseData, level: e.target.value})}
                    className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none transition-colors"
                    >
                    <option value="Débutant">Débutant (L1)</option>
                    <option value="Intermédiaire">Intermédiaire (L2)</option>
                    <option value="Avancé">Avancé (L3)</option>
                    </select>
                </div>
                <textarea 
                  placeholder="Description du cours..." 
                  value={courseData.description}
                  onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                  className="w-full p-3 bg-black/20 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : GESTION DES MODULES */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Ajout Module */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-ucak-blue/30 transition-colors">
              <div className="absolute top-0 right-0 p-20 bg-ucak-blue/5 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10 text-white"><Plus size={20} className="text-ucak-blue"/> Ajouter un Chapitre</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 relative z-10">
                <div className="md:col-span-2">
                    <input 
                    placeholder="Titre du Chapitre (ex: Introduction aux SGBD)" 
                    value={newModule.title}
                    onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                    className="w-full p-3 bg-black/40 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none font-bold"
                    />
                </div>
                <div className="relative">
                  <Video size={16} className="absolute left-3 top-3.5 text-red-400" />
                  <input 
                    placeholder="Lien YouTube" 
                    value={newModule.video_url}
                    onChange={(e) => setNewModule({...newModule, video_url: e.target.value})}
                    className="w-full pl-10 p-3 bg-black/40 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none"
                  />
                </div>
                <div className="relative">
                  <FileText size={16} className="absolute left-3 top-3.5 text-blue-400" />
                  <input 
                    placeholder="Lien PDF (Drive/Dropbox)" 
                    value={newModule.pdf_url}
                    onChange={(e) => setNewModule({...newModule, pdf_url: e.target.value})}
                    className="w-full pl-10 p-3 bg-black/40 rounded-xl border border-white/10 text-sm focus:border-ucak-blue outline-none"
                  />
                </div>
              </div>
              <button 
                onClick={addModule}
                className="w-full py-3 bg-ucak-blue hover:bg-ucak-green text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all relative z-10 shadow-lg"
              >
                + Ajouter ce module à la liste
              </button>
            </div>

            {/* Liste des Modules Ajoutés */}
            <div className="space-y-3">
              {courseData.modules.length > 0 && <p className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Chapitres prêts à publier</p>}
              
              {courseData.modules.map((mod, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-black text-gray-400">{idx + 1}</span>
                    <div>
                      <p className="font-bold text-sm text-white">{mod.title}</p>
                      <div className="flex gap-4 text-[10px] text-gray-400 mt-1">
                        <a href={mod.video_url} target="_blank" className="flex items-center gap-1 hover:text-red-400 transition-colors"><Video size={12}/> Lien Vidéo</a>
                        {mod.pdf_url && <a href={mod.pdf_url} target="_blank" className="flex items-center gap-1 hover:text-blue-400 transition-colors"><FileText size={12}/> Lien PDF</a>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeModule(idx)} className="p-2 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              
              {courseData.modules.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-xl text-gray-500 text-sm">
                  <LayoutList className="mx-auto mb-2 opacity-20" size={32} />
                  Commencez par ajouter des chapitres ci-dessus.
                </div>
              )}
            </div>

            {/* Actions Finales */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
               <div className="flex-1">
                 {status === 'success' && <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20"><CheckCircle size={14}/> Cours publié avec succès !</div>}
                 {status === 'error' && <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20"><AlertCircle size={14}/> Erreur technique. Vérifiez la console.</div>}
               </div>
               
               <button 
                 onClick={handleSubmit}
                 disabled={status === 'loading' || courseData.modules.length === 0}
                 className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-xl font-black uppercase tracking-widest shadow-xl shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transition-all transform active:scale-95"
               >
                 {status === 'loading' ? 'Publication...' : <><Save size={18}/> Publier le Cours</>}
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}