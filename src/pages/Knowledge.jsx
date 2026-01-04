import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, GraduationCap, Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../context/UserContext';

export default function Knowledge() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState('Tous');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/api/v1/courses');
        setCourses(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchLevel = filterLevel === 'Tous' || course.level === filterLevel;
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                        course.filiere_tag.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  if (loading) return <div className="min-h-screen pt-32 text-center text-gray-500">Chargement de la bibliothèque...</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header & Filtres */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-ucak-blue dark:text-white mb-2">Bibliothèque</h1>
            <p className="text-gray-500">Accédez aux ressources pédagogiques officielles.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group">
              <Search className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un cours..." 
                className="w-full sm:w-64 pl-10 pr-4 py-3 bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-ucak-blue transition-all shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex bg-white dark:bg-ucak-dark-card p-1 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
              {['Tous', 'Débutant', 'Intermédiaire', 'Avancé'].map(level => (
                <button
                  key={level}
                  onClick={() => setFilterLevel(level)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filterLevel === level ? 'bg-ucak-blue text-white shadow' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille Cours */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-ucak-dark-card rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">Aucun cours trouvé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Link to={`/course/${course.id}`} key={course.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-ucak-blue/30 hover:shadow-xl transition-all group flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                    course.filiere_tag === 'Informatique' ? 'bg-blue-500' : 
                    course.filiere_tag === 'HEC' ? 'bg-purple-500' : 'bg-orange-500'
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
                  <div className="flex gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg">
                      <Video size={14} className="text-ucak-blue"/>
                      {/* Compte le nombre de modules qui ont une video */}
                      {course.modules?.length || 0}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-ucak-blue text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen size={14} />
                  </div>
                </div>

              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}