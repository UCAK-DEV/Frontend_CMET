import { useState, useEffect } from 'react';
import { useUser, api } from '../context/UserContext';
import { motion } from 'framer-motion';
import { 
  BookOpen, Rocket, Newspaper, ShieldCheck, 
  Clock, Zap, GraduationCap, ChevronRight, 
  FileText, Activity, Plus, Users, Vote,
  TrendingUp, AlertCircle, CheckCircle2, UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, isAdmin } = useUser();
  const [loading, setLoading] = useState(true);
  
  // États séparés pour une gestion fine
  const [stats, setStats] = useState({
    students: { total: 0, verified: 0, pending: 0 },
    courses: { total: 0, categories: {} },
    projects: { total: 0, recent: [] },
    news: { total: 0, recent: [] },
    elections: { active: null }
  });

  const [activityFeed, setActivityFeed] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Chargement parallèle de toutes les données
        const [usersRes, coursesRes, projectsRes, newsRes, electionsRes] = await Promise.all([
          isAdmin ? api.get('/api/v1/users/admin/all') : Promise.resolve({ data: [] }),
          api.get('/api/v1/courses'),
          api.get('/api/v1/projects'),
          api.get('/api/v1/news'),
          api.get('/api/v1/elections')
        ]);

        // 1. Calculs Statistiques (KPIs)
        const users = usersRes.data || [];
        const verifiedUsers = users.filter(u => u.is_ufr_verified).length;
        
        const activeElection = electionsRes.data.find(e => e.status === 'open');

        setStats({
          students: { 
            total: users.length, 
            verified: verifiedUsers,
            pending: users.length - verifiedUsers
          },
          courses: { total: coursesRes.data.length },
          projects: { total: projectsRes.data.length },
          news: { total: newsRes.data.length },
          elections: { active: activeElection }
        });

        // 2. Génération du Flux d'Activité Unifié (Timeline)
        const feed = [
          ...newsRes.data.map(i => ({ type: 'NEWS', data: i, date: new Date(i.createdAt) })),
          ...projectsRes.data.map(i => ({ type: 'PROJECT', data: i, date: new Date(i.created_at || Date.now()) })),
          ...coursesRes.data.map(i => ({ type: 'COURSE', data: i, date: new Date(i.created_at || Date.now()) }))
        ]
        .sort((a, b) => b.date - a.date)
        .slice(0, 5); // Les 5 derniers événements

        setActivityFeed(feed);

      } catch (err) { 
        console.error("Erreur Dashboard:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchDashboardData();
  }, [isAdmin]);

  // --- VUE ADMINISTRATEUR (COMMAND CENTER) ---
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] dark:bg-[#020408] pt-24 md:pt-32 pb-20 px-6 font-sans">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Pro */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Vue d'ensemble</p>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                Console <span className="text-ucak-blue">Admin</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Système Opérationnel</span>
            </div>
          </div>

          {/* 1. KPIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Étudiants */}
            <StatsCard 
              title="Base Étudiants" 
              value={loading ? '...' : stats.students.total} 
              icon={<Users size={20}/>} 
              trend={stats.students.pending > 0 ? `+${stats.students.pending} en attente` : "À jour"}
              trendColor={stats.students.pending > 0 ? "text-orange-500" : "text-green-500"}
              color="bg-blue-500"
            />
            {/* Ressources */}
            <StatsCard 
              title="Ressources Drive" 
              value={loading ? '...' : stats.courses.total} 
              icon={<BookOpen size={20}/>} 
              trend="Supports pédagogiques"
              trendColor="text-gray-400"
              color="bg-purple-500"
            />
            {/* Élections */}
            <StatsCard 
              title="Démocratie" 
              value={stats.elections.active ? "Ouvert" : "Aucun vote"} 
              icon={<Vote size={20}/>} 
              trend={stats.elections.active ? stats.elections.active.title : "En attente de session"}
              trendColor={stats.elections.active ? "text-green-500" : "text-gray-400"}
              color="bg-ucak-gold"
            />
            {/* Engagement (Projets) */}
            <StatsCard 
              title="Innovation" 
              value={loading ? '...' : stats.projects.total} 
              icon={<Rocket size={20}/>} 
              trend="Projets soumis"
              trendColor="text-ucak-blue"
              color="bg-ucak-green"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 2. Flux d'Activité Réel (2/3 largeur) */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                <Activity size={14} /> Activité Récente du Club
              </h3>
              
              <div className="bg-white dark:bg-[#0b101a] rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-white/5">
                {activityFeed.length > 0 ? (
                  <div className="relative border-l-2 border-gray-100 dark:border-white/10 ml-3 space-y-8 pl-8 py-2">
                    {activityFeed.map((item, idx) => (
                      <div key={idx} className="relative group">
                        <span className={`absolute -left-[41px] top-1 w-6 h-6 rounded-full border-4 border-white dark:border-[#0b101a] ${
                          item.type === 'NEWS' ? 'bg-orange-400' : item.type === 'PROJECT' ? 'bg-ucak-green' : 'bg-ucak-blue'
                        }`}></span>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg w-fit ${
                            item.type === 'NEWS' ? 'bg-orange-50 text-orange-500' : item.type === 'PROJECT' ? 'bg-green-50 text-ucak-green' : 'bg-blue-50 text-ucak-blue'
                          }`}>
                            {item.type === 'NEWS' ? 'Actualité' : item.type === 'PROJECT' ? 'Nouveau Projet' : 'Nouvelle Ressource'}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium mt-1 sm:mt-0">{item.date.toLocaleDateString()} à {item.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        
                        <h4 className="text-sm font-bold dark:text-white mt-2 group-hover:text-ucak-blue transition-colors">
                          {item.type === 'NEWS' ? item.data.title : item.type === 'PROJECT' ? `Projet "${item.data.name}" par ${item.data.user?.full_name}` : item.data.title}
                        </h4>
                        
                        {item.type === 'PROJECT' && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1 italic">"{item.data.description}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400 text-xs font-medium">Aucune activité récente.</div>
                )}
              </div>
            </div>

            {/* 3. Actions Rapides (1/3 largeur) */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                <Zap size={14} /> Actions Rapides
              </h3>
              
              <div className="bg-white dark:bg-[#0b101a] rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-white/5 space-y-3">
                <QuickAction to="/admin/news" icon={<Plus size={16}/>} label="Publier une News" color="bg-orange-500" />
                <QuickAction to="/admin/courses" icon={<FileText size={16}/>} label="Ajouter un Cours" color="bg-purple-500" />
                <QuickAction to="/admin/students" icon={<UserCheck size={16}/>} label="Vérifier Étudiants" color="bg-ucak-blue" />
                <QuickAction to="/admin/quizzes" icon={<Zap size={16}/>} label="Créer un Quiz" color="bg-ucak-gold" />
              </div>

              {/* Status Alert */}
              {stats.students.pending > 0 && (
                <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-[2rem] border border-orange-100 dark:border-orange-500/20">
                  <div className="flex items-center gap-3 mb-2 text-orange-600 dark:text-orange-400">
                    <AlertCircle size={20} />
                    <h4 className="font-bold text-sm">Action Requise</h4>
                  </div>
                  <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed mb-4">
                    {stats.students.pending} étudiants sont en attente de validation UFR pour accéder aux votes.
                  </p>
                  <Link to="/admin/students" className="text-[10px] font-black uppercase tracking-widest text-orange-600 underline">
                    Voir la liste &rarr;
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- VUE ÉTUDIANT (Simple & Directe) ---
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-24 md:pt-32 pb-20 px-6 transition-colors duration-500">
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Étudiant */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
              Espace <span className="text-ucak-blue">Personnel.</span>
            </h1>
            <span className="px-3 py-1 bg-ucak-blue/10 text-ucak-blue rounded-lg text-[10px] font-black uppercase tracking-widest border border-ucak-blue/20">
              {user?.full_name || 'Étudiant'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 bg-white dark:bg-white/5 p-2 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm backdrop-blur-md">
             <div className="w-12 h-12 bg-gradient-to-br from-ucak-blue to-blue-700 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-ucak-blue/20">
                {user?.full_name?.charAt(0) || 'U'}
             </div>
             <div className="pr-4 hidden sm:block">
                <p className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Status</p>
                <p className="text-xs font-bold dark:text-white flex items-center gap-2">
                   <span className="w-2 h-2 bg-ucak-green rounded-full animate-pulse"></span> Connecté
                </p>
             </div>
          </div>
        </header>

        {/* Stats Rapides Étudiant */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Ressources Drive', val: stats.courses.total, icon: <BookOpen />, color: 'text-ucak-blue' },
            { label: 'Projets Innovation', val: stats.projects.total, icon: <Rocket />, color: 'text-ucak-green' },
            { label: 'Actualités MET', val: stats.news.total, icon: <Newspaper />, color: 'text-ucak-gold' },
          ].map((stat, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#0b101a] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm group hover:border-ucak-blue/30 transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center ${stat.color} mb-6 shadow-inner`}>
                {stat.icon}
              </div>
              <p className="text-4xl font-black dark:text-white mb-1 tracking-tighter">{loading ? '...' : stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Grille Actions Étudiant */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-2 flex items-center gap-2">
              <Zap size={14} className="text-ucak-blue" /> Accès Rapides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionCard title="Mes Projets DAR" desc="Éditer mes publications Showroom" link="/showroom" icon={<Rocket />} />
              <ActionCard title="Générateur de CV" desc="Générer mon profil pro UCAK" link="/cv-generator" icon={<FileText />} />
              <ActionCard title="Réseau Alumni" desc="Mentorat & Connexions" link="/network" icon={<Users />} />
              <ActionCard title="Bibliothèques L1/L3" desc="Consulter mes supports de cours" link="/knowledge" icon={<BookOpen />} />
              <ActionCard title="Guide du Hub" desc="Consulter le manuel d'utilisation" link="/academy-guide" icon={<Zap />} />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-2 flex items-center gap-2">
                <Activity size={14} className="text-ucak-green" /> Dernières Mises à jour
             </h3>
             <div className="bg-white dark:bg-[#0b101a] p-8 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
                {activityFeed.length > 0 ? activityFeed.slice(0,3).map((item, idx) => (
                  <UpdateItem key={idx} 
                    user={item.type === 'NEWS' ? 'Info' : 'Admin'} 
                    text={item.type === 'NEWS' ? item.data.title : item.data.title || item.data.name} 
                    time={new Date(item.date).toLocaleDateString()} 
                  />
                )) : <p className="text-xs text-gray-400">Aucune activité.</p>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

function StatsCard({ title, value, icon, trend, trendColor, color }) {
  return (
    <div className="bg-white dark:bg-[#0b101a] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`}></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-black dark:text-white tracking-tighter">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 text-gray-800 dark:text-white`}>
          {icon}
        </div>
      </div>
      <div className={`flex items-center gap-1.5 text-[10px] font-bold ${trendColor}`}>
        <TrendingUp size={12} /> {trend}
      </div>
    </div>
  );
}

function QuickAction({ to, icon, label, color }) {
  return (
    <Link to={to} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-white/5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">{label}</span>
      <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-gray-500" />
    </Link>
  );
}

function ActionCard({ title, desc, link, icon }) {
  return (
    <Link to={link} className="flex items-center justify-between p-6 bg-white dark:bg-[#0b101a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-ucak-blue/30 hover:shadow-xl transition-all group shadow-sm">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 text-ucak-blue rounded-2xl flex items-center justify-center group-hover:bg-ucak-blue group-hover:text-white transition-all shadow-inner">
          {icon}
        </div>
        <div>
          <h4 className="font-black dark:text-white text-sm tracking-tight">{title}</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{desc}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-ucak-blue translate-x-0 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

function UpdateItem({ user, text, time }) {
  return (
    <div className="flex gap-4 items-start group cursor-pointer">
      <div className="w-8 h-8 rounded-full bg-ucak-blue/10 text-ucak-blue flex items-center justify-center text-[10px] font-black group-hover:bg-ucak-blue group-hover:text-white transition-colors shrink-0">
        {user.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold dark:text-white leading-tight truncate">
          <span className="text-ucak-blue mr-1">{user}</span> {text}
        </p>
        <p className="text-[9px] text-gray-400 font-black uppercase mt-1 flex items-center gap-1">
          <Clock size={10} /> {time}
        </p>
      </div>
    </div>
  );
}