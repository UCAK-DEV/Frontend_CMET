import { useState, useEffect } from 'react';
import { Search, BookOpen, GraduationCap, Video, FileText, DownloadCloud, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../context/UserContext';
import { motion } from 'framer-motion';

export default function Knowledge() {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'documents'
  const [courses, setCourses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState('Tous');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCourses, resDocs] = await Promise.all([
          api.get('/api/v1/courses'),
          api.get('/api/v1/documents')
        ]);
        setCourses(resCourses.data);
        setDocuments(resDocs.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrage combiné
  const filteredItems = (activeTab === 'courses' ? courses : documents).filter(item => {
    // Note : Pour les documents, on n'a pas forcément 'level', donc on ignore ce filtre ou on filtre par category
    const matchLevel = activeTab === 'courses' ? (filterLevel === 'Tous' || item.level === filterLevel) : true;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                        (item.filiere_tag || item.category || '').toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  if (loading) return <div className="min-h-screen pt-32 text-center text-gray-500">Chargement de la bibliothèque...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-2">Centre de Savoir</h1>
            <p className="text-gray-500">Accédez aux cours, annales et ressources pédagogiques.</p>
          </div>
          
          <div className="relative group w-full md:w-auto">
            <Search className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
            <input 
              type="text" 
              placeholder={activeTab === 'courses' ? "Rechercher un cours..." : "Rechercher un document..."}
              className="w-full md:w-80 pl-10 pr-4 py-3 bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-ucak-blue transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-8 border-b border-gray-200 dark:border-white/10 mb-8">
          <button 
            onClick={() => setActiveTab('courses')}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'courses' ? 'text-ucak-blue dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Cours & Modules
            {activeTab === 'courses' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-ucak-blue rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'documents' ? 'text-ucak-blue dark:text-white' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Annales & PDF
            {activeTab === 'documents' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-ucak-blue rounded-t-full" />}
          </button>
        </div>

        {/* Filtres secondaires (Seulement pour cours) */}
        {activeTab === 'courses' && (
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {['Tous', 'L1', 'L2', 'L3', 'M1', 'M2'].map(level => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filterLevel === level ? 'bg-ucak-blue text-white shadow' : 'bg-white dark:bg-white/5 text-gray-500 hover:bg-gray-100'}`}
              >
                {level}
              </button>
            ))}
          </div>
        )}

        {/* Contenu Grille */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-ucak-dark-card rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">Aucune ressource trouvée.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'courses' ? (
              // === VUE COURS ===
              filteredItems.map(course => (
                <Link to={`/course/${course.id}`} key={course.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-ucak-blue/30 hover:shadow-xl transition-all group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                      course.filiere_tag?.includes('Info') ? 'bg-blue-500' : 
                      course.filiere_tag?.includes('HEC') ? 'bg-purple-500' : 'bg-orange-500'
                    }`}>
                      <GraduationCap size={24} />
                    </div>
                    <span className="px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-ucak-blue transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
                    <span>{course.instructor_name}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{course.filiere_tag}</span>
                  </div>
                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg">
                      <Video size={14} className="text-ucak-blue"/>
                      {course.modules?.length || 0} Chapitres
                    </div>
                    <div className="w-8 h-8 rounded-full bg-ucak-blue text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // === VUE DOCUMENTS ===
              filteredItems.map(doc => (
                <div key={doc.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-ucak-blue/30 transition-all flex flex-col h-full relative group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center">
                      <FileText size={28} />
                    </div>
                    <span className="px-2 py-1 rounded-md bg-gray-50 dark:bg-white/5 text-[10px] font-bold text-gray-400">
                      {doc.type}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2" title={doc.title}>
                    {doc.title}
                  </h4>
                  <p className="text-xs text-gray-400 mb-6">{doc.category}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400">{doc.download_count} Téléchargements</span>
                    <button 
                      onClick={() => window.open(doc.file_url, '_blank')}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-ucak-blue text-white text-xs font-bold hover:bg-ucak-green transition-colors shadow-lg shadow-ucak-blue/20"
                    >
                      <DownloadCloud size={14} /> Télécharger
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}