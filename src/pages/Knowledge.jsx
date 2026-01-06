import { useState, useEffect } from 'react';
import { Search, GraduationCap, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore'; 

export default function Knowledge() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState('Tous');
  const [activeFiliere, setActiveFiliere] = useState('Tous');
  const [search, setSearch] = useState('');

  // LECTURE DEPUIS FIREBASE
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesList);
      } catch (error) {
        console.error("Erreur lecture:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredItems = courses.filter(item => {
    const matchLevel = filterLevel === 'Tous' || item.level === filterLevel;
    const matchFiliere = activeFiliere === 'Tous' || item.filiere_tag === activeFiliere;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchFiliere && matchSearch;
  });

  if (loading) return <div className="min-h-screen pt-32 text-center text-gray-500">Chargement...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-2">Bibliothèque</h1>
            <p className="text-gray-500">Cours et ressources mis à jour en temps réel.</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input type="text" placeholder="Rechercher..." className="w-full md:w-80 pl-10 pr-4 py-3 bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-ucak-blue shadow-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex bg-white dark:bg-ucak-dark-card p-1 rounded-xl border border-gray-200 dark:border-white/10">
                {['Tous', 'Informatique', 'HEC'].map(fil => (
                    <button key={fil} onClick={() => setActiveFiliere(fil)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeFiliere === fil ? 'bg-ucak-blue text-white shadow' : 'text-gray-500 hover:text-ucak-blue'}`}>{fil}</button>
                ))}
            </div>
            <div className="flex gap-2">
                {['Tous', 'L1', 'L2', 'L3', 'M1'].map(lvl => (
                <button key={lvl} onClick={() => setFilterLevel(lvl)} className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${filterLevel === lvl ? 'bg-white dark:bg-white/10 border-ucak-blue text-ucak-blue' : 'border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}>{lvl}</button>
                ))}
            </div>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(course => (
            <Link to={`/course/${course.id}`} key={course.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-ucak-blue/30 hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${course.filiere_tag === 'Informatique' ? 'bg-blue-600' : 'bg-purple-600'}`}><GraduationCap size={24} /></div>
                <span className="px-3 py-1 bg-gray-50 dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">{course.level}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-ucak-blue transition-colors line-clamp-2">{course.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
                <span>{course.instructor_name}</span>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg"><Video size={14} className="text-ucak-blue"/>{course.modules?.length || 0} Modules</div>
                <div className="w-8 h-8 rounded-full bg-ucak-blue text-white flex items-center justify-center group-hover:scale-110 transition-transform"><ArrowRight size={14} /></div>
                </div>
            </Link>
            ))}
        </div>
      </div>
    </div>
  );
}