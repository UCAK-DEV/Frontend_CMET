import { useUser } from '../context/UserContext';
import StudentCard from '../components/StudentCard';
import { 
  Briefcase, Trophy, Users, Clock, Calendar, 
  ArrowUpRight, BookOpen, MoreHorizontal, Bell, Shield 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuickAction = ({ icon: Icon, label, path, color, delay }) => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay }}>
    <Link to={path} className="block h-full bg-white dark:bg-ucak-dark-card p-5 rounded-3xl border border-gray-100 dark:border-white/5 hover:border-ucak-blue/30 hover:shadow-xl transition-all group relative overflow-hidden">
       <div className={`absolute top-0 right-0 p-10 bg-gradient-to-br ${color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}></div>
       <Icon size={28} className="mb-4 text-gray-700 dark:text-gray-200 group-hover:scale-110 transition-transform" />
       <div className="flex justify-between items-end">
          <span className="font-bold text-xs uppercase tracking-wide text-gray-500 group-hover:text-ucak-blue transition-colors">{label}</span>
          <ArrowUpRight size={16} className="text-gray-300 group-hover:text-ucak-blue" />
       </div>
    </Link>
  </motion.div>
);

export default function Dashboard() {
  const { user, isAdmin } = useUser(); // On récupère isAdmin

  const nextClass = { title: "Architecture Réseaux", time: "14:00", room: "Amphi A", status: "Dans 30 min" };
  const notifications = [ { id: 1, text: "Note disponible : Algorithmique", time: "2 min" }, { id: 2, text: "Nouveau stage : Orange Sénégal", time: "1h" } ];

  return (
    <div className="min-h-screen pt-28 pb-10 bg-gray-50/50 dark:bg-ucak-dark px-6">
      <div className="container mx-auto max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
           <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                {isAdmin ? 'PANNEAU DE CONTRÔLE' : 'Espace Étudiant'}
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-ucak-blue dark:text-white">
                Bon retour, <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-blue via-ucak-green to-ucak-gold">{user?.full_name?.split(' ')[0]}</span>
              </h1>
           </div>
           <div className="flex gap-3">
              <button className="p-3 bg-white dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10 text-gray-500 hover:text-ucak-blue relative"><Bell size={20} /><span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-ucak-dark"></span></button>
              <div className="px-5 py-3 bg-white dark:bg-white/5 rounded-full border border-gray-100 dark:border-white/10 text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2"><Calendar size={14} /> 2025-2026</div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
           
           <div className="md:col-span-1 md:row-span-2"><StudentCard /></div>

           <div className="md:col-span-2 bg-ucak-blue text-white p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[200px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 flex justify-between items-start">
                 <div>
                    <h3 className="text-lg font-black opacity-80 mb-1">{isAdmin ? 'Mode Administrateur' : 'Niveau d\'Expérience'}</h3>
                    <p className="text-4xl font-black tracking-tighter">{isAdmin ? 'ACCÈS TOTAL' : `${user?.xp_points || 0} XP`}</p>
                 </div>
                 <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                    {isAdmin ? <Shield size={24} className="text-red-400" /> : <Trophy size={24} className="text-ucak-gold" />}
                 </div>
              </div>
              
              {!isAdmin && (
                <div className="relative z-10 mt-6">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60 mb-2"><span>Progression</span><span>Niveau Suivant: 2000 XP</span></div>
                   <div className="h-2 bg-black/20 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(((user?.xp_points || 0) / 2000) * 100, 100)}%` }} className="h-full bg-ucak-green" /></div>
                </div>
              )}
              {isAdmin && <p className="relative z-10 mt-6 text-sm opacity-70">Vous avez les droits pour gérer les cours, les utilisateurs et le contenu de la plateforme.</p>}
           </div>

           <div className="bg-white dark:bg-ucak-dark-card p-6 rounded-[2.5rem] border border-gray-100 dark:border-white/5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4 text-ucak-gold text-xs font-black uppercase tracking-widest"><Clock size={14} /> En direct</div>
              <h4 className="text-xl font-black text-gray-800 dark:text-white mb-1">{nextClass.title}</h4>
              <p className="text-sm text-gray-400 font-medium mb-4">{nextClass.room} • {nextClass.time}</p>
              <div className="mt-auto"><span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 text-[10px] font-black uppercase rounded-lg">{nextClass.status}</span></div>
           </div>

           {/* --- ACTIONS RAPIDES (AVEC ADMIN OPTION) --- */}
           {isAdmin ? (
             <QuickAction icon={Shield} label="Gérer les Cours" path="/admin/courses" color="from-red-500 to-orange-500" delay={0.1} />
           ) : (
             <QuickAction icon={BookOpen} label="Bibliothèque" path="/knowledge" color="from-blue-400 to-blue-600" delay={0.1} />
           )}
           <QuickAction icon={Briefcase} label="Offres Stages" path="/career" color="from-green-400 to-green-600" delay={0.2} />
           <QuickAction icon={Users} label="Réseau Alumni" path="/network" color="from-purple-400 to-purple-600" delay={0.3} />
           
           <div className="md:col-span-1 bg-white dark:bg-ucak-dark-card p-6 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
              <div className="flex justify-between items-center mb-6"><h4 className="font-black text-sm uppercase tracking-widest">Activité</h4><MoreHorizontal size={16} className="text-gray-400" /></div>
              <div className="space-y-4">
                 {notifications.map(notif => (
                   <div key={notif.id} className="flex gap-3 items-start"><div className="w-2 h-2 mt-1.5 rounded-full bg-ucak-blue shrink-0"></div><div><p className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-tight">{notif.text}</p><p className="text-[10px] text-gray-400 mt-1">{notif.time}</p></div></div>
                 ))}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}