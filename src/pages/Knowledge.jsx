import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Search, Cpu, BarChart3, ExternalLink, GraduationCap, LayoutGrid } from 'lucide-react';

export default function Knowledge() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFiliere, setActiveFiliere] = useState('Tous');

  useEffect(() => {
    fetchFolders();
  }, [activeFiliere]);

  const fetchFolders = async () => {
    try {
      const res = await api.get(`/api/v1/courses?category=${activeFiliere}`);
      setFolders(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#05070a] pt-24 md:pt-32 pb-20 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="mb-20">
          <div className="flex items-center gap-3 text-ucak-blue mb-6">
            <GraduationCap size={24} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Bibliothèques Numériques</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black dark:text-white tracking-tighter mb-12 leading-none">
            Accédez à vos <br /> <span className="text-ucak-blue text-transparent bg-clip-text bg-gradient-to-r from-ucak-blue to-ucak-green">Ressources.</span>
          </h1>

          {/* Sélecteur de filière Bento */}
          <div className="flex flex-wrap gap-4">
            {['Tous', 'IR', 'HEC'].map((f) => (
              <button 
                key={f}
                onClick={() => setActiveFiliere(f)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
                  ${activeFiliere === f 
                    ? 'bg-ucak-blue text-white shadow-xl shadow-ucak-blue/20' 
                    : 'bg-white dark:bg-white/5 text-gray-400 hover:bg-gray-100'}`}
              >
                {f === 'Tous' ? 'Toutes les filières' : f === 'IR' ? 'Informatique & Réseaux' : 'Haute Étude Commerciale'}
              </button>
            ))}
          </div>
        </header>

        {/* --- GRILLE DE DOSSIERS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {folders.map((folder, index) => (
              <motion.div
                key={folder.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white dark:bg-white/2 rounded-[3rem] border border-gray-100 dark:border-white/5 p-10 hover:border-ucak-blue/30 transition-all shadow-sm hover:shadow-2xl"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className={`p-4 rounded-2xl ${folder.category === 'IR' ? 'bg-ucak-blue text-white shadow-lg shadow-ucak-blue/20' : 'bg-ucak-gold text-white shadow-lg shadow-ucak-gold/20'}`}>
                    <Folder size={24} />
                  </div>
                  <span className="px-4 py-2 bg-gray-50 dark:bg-white/10 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Niveau {folder.level}
                  </span>
                </div>

                <h3 className="text-2xl font-black dark:text-white mb-3 group-hover:text-ucak-blue transition-colors">
                  {folder.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10 line-clamp-2">
                  {folder.description}
                </p>

                <a 
                  href={folder.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-ucak-blue group-hover:bg-ucak-blue group-hover:text-white transition-all shadow-inner"
                >
                  Ouvrir le Dossier <ExternalLink size={16} />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}