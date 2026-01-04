import { useUser } from '../context/UserContext';
import StudentCard from '../components/StudentCard';
import { FileUser, Briefcase, Users, Zap, ArrowUpRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useUser();

  const actions = [
    { title: "Générer mon CV", icon: FileUser, path: "/cv-builder", color: "bg-ucak-blue", desc: "Modèles pro & PDF" },
    { title: "Challenges & Quizz", icon: Trophy, path: "/quizz", color: "bg-purple-600", desc: "Gagnez des points XP" },
    { title: "Offres de Stages", icon: Briefcase, path: "/career", color: "bg-ucak-green", desc: "Opportunités réelles" },
    { title: "Réseau Alumni", icon: Users, path: "/network", color: "bg-ucak-gold", desc: "LinkedIn & Mentorat" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
          <div className="w-full md:w-2/5">
             <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">E-Carte Étudiant</h2>
             <StudentCard />
          </div>
          <div className="flex-1">
             <h1 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mb-2 leading-none">Bonjour, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-blue via-ucak-green to-ucak-gold">{user?.full_name?.split(' ')[0]} !</span></h1>
             <p className="text-gray-500 font-medium mb-8">Votre centre de commande académique et professionnel.</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {actions.map((act, i) => (
                 <Link key={i} to={act.path} className="group p-6 bg-white dark:bg-ucak-dark-card rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                       <div className={`p-3 rounded-2xl text-white ${act.color}`}><act.icon size={24} /></div>
                       <ArrowUpRight size={20} className="text-gray-300 group-hover:text-ucak-blue transition-colors" />
                    </div>
                    <h3 className="font-black text-gray-800 dark:text-white mb-1 uppercase tracking-tighter">{act.title}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{act.desc}</p>
                 </Link>
               ))}
             </div>
          </div>
        </div>

        <div className="bg-ucak-blue rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
           <Zap className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 w-64 h-64" />
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                 <h2 className="text-3xl font-black mb-2">Progression : {user?.xp_points || 0} XP</h2>
                 <p className="opacity-70 max-w-md">Réussissez les Quizz pour booster votre profil et débloquer de nouvelles compétences.</p>
              </div>
              <Link to="/quizz" className="px-10 py-4 bg-white text-ucak-blue rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-ucak-gold transition-colors">Lancer un Challenge</Link>
           </div>
        </div>
      </div>
    </div>
  );
}