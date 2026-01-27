import { useState, useEffect } from 'react';
import { useUser, api } from '../context/UserContext';
import { motion } from 'framer-motion';
import { 
  BookOpen, Rocket, Newspaper, ShieldCheck, 
  Clock, Zap, GraduationCap, ChevronRight, 
  FileText, Settings, Activity, Plus, Users
} from 'lucide-react';

export default function Dashboard() {
  const { user, isAdmin } = useUser(); // Récupération du rôle via le contexte
  const [stats, setStats] = useState({ courses: 0, projects: 0, news: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Chargement des données réelles depuis ton backend
        const [c, p, n] = await Promise.all([
          api.get('/api/v1/courses'),
          api.get('/api/v1/projects'),
          api.get('/api/v1/news')
        ]);
        setStats({ courses: c.data.length, projects: p.data.length, news: n.data.length });
      } catch (err) { 
        console.error("Erreur de synchronisation:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-24 md:pt-32 pb-20 px-6 transition-colors duration-500">
      
      {/* --- GRILLE DE FOND (DISCRÈTE) --- */}
      <div className="fixed inset-0 ucak-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER DYNAMIQUE --- */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
              {isAdmin ? 'Console' : 'Espace'} <span className="text-ucak-blue">Personnel.</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-ucak-blue/10 text-ucak-blue rounded-lg text-[10px] font-black uppercase tracking-widest border border-ucak-blue/20">
                {user?.full_name || 'Étudiant'}
              </span>
              {isAdmin && (
                <span className="px-3 py-1 bg-ucak-gold/10 text-ucak-gold rounded-lg text-[10px] font-black uppercase tracking-widest border border-ucak-gold/20 flex items-center gap-1">
                  <ShieldCheck size={12} /> Responsable Pédagogique
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white dark:bg-white/5 p-2 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm backdrop-blur-md">
             <div className="w-12 h-12 bg-gradient-to-br from-ucak-blue to-blue-700 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-ucak-blue/20">
                {user?.full_name?.charAt(0) || 'U'}
             </div>
             <div className="pr-4 hidden sm:block">
                <p className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Status Système</p>
                <p className="text-xs font-bold dark:text-white flex items-center gap-2">
                   <span className="w-2 h-2 bg-ucak-green rounded-full animate-pulse"></span> Connecté
                </p>
             </div>
          </div>
        </header>

        {/* --- KPI STATISTIQUES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Ressources Drive', val: stats.courses, icon: <BookOpen />, color: 'text-ucak-blue' },
            { label: 'Projets Innovation', val: stats.projects, icon: <Rocket />, color: 'text-ucak-green' },
            { label: 'Actualités MET', val: stats.news, icon: <Newspaper />, color: 'text-ucak-gold' },
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

        {/* --- CENTRE DE PILOTAGE & FLUX --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLONNE GAUCHE : ACTIONS STRATÉGIQUES */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-2 flex items-center gap-2">
              <Zap size={14} className="text-ucak-blue" /> {isAdmin ? 'Actions de Gestion' : 'Accès Rapides'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isAdmin ? (
                /* --- VUE ADMINISTRATEUR --- */
                <>
                  <ActionCard title="Gérer le Flux News" desc="Publier des infos et vidéos YouTube" link="/admin/news" icon={<Newspaper />} />
                  <ActionCard title="Médiathèque Drive" desc="Mettre à jour les bibliothèques" link="/knowledge" icon={<Plus />} />
                  <ActionCard title="Gestion Étudiants" desc="Vérifier les comptes UFR" link="/admin/students" icon={<Users />} />
                  <ActionCard title="Centre d'Examen" desc="Gérer les Quiz et XP" link="/admin/quizzes" icon={<Zap />} />
                </>
              ) : (
                /* --- VUE ÉTUDIANT --- */
                <>
                  <ActionCard title="Mes Projets DAR" desc="Éditer mes publications Showroom" link="/showroom" icon={<Rocket />} />
                  <ActionCard title="Générateur de CV" desc="Générer mon profil pro UCAK" link="/cv-generator" icon={<FileText />} />
                  <ActionCard title="Réseau Alumni" desc="Mentorat & Connexions" link="/network" icon={<Users />} />
                  <ActionCard title="Bibliothèques L1/L3" desc="Consulter mes supports de cours" link="/knowledge" icon={<BookOpen />} />
                  <ActionCard title="Guide du Hub" desc="Consulter le manuel d'utilisation" link="/academy-guide" icon={<Zap />} />
                </>
              )}
            </div>
          </div>

          {/* COLONNE DROITE : ACTIVITÉ RÉELLE DU CLUB */}
          <div className="lg:col-span-4 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-2 flex items-center gap-2">
                <Activity size={14} className="text-ucak-green" /> Flux d'Activité
             </h3>
             <div className="bg-white dark:bg-[#0b101a] p-8 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm space-y-8">
                <UpdateItem user="Scolarité" text="Emploi du temps mis à jour" time="2h" />
                <UpdateItem user="Cellule" text="Nouveau dossier Drive : MLOps" time="5h" />
                <UpdateItem user="UCAK" text="Inauguration ODC Touba" time="1j" />
                
                <button className="w-full py-4 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-ucak-blue transition-all">
                  Voir l'historique complet
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

function ActionCard({ title, desc, link, icon }) {
  return (
    <a href={link} className="flex items-center justify-between p-6 bg-white dark:bg-[#0b101a] rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-ucak-blue/30 hover:shadow-xl transition-all group shadow-sm">
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
    </a>
  );
}

function UpdateItem({ user, text, time }) {
  return (
    <div className="flex gap-4 items-start group cursor-pointer">
      <div className="w-8 h-8 rounded-full bg-ucak-blue/10 text-ucak-blue flex items-center justify-center text-[10px] font-black group-hover:bg-ucak-blue group-hover:text-white transition-colors">
        {user.charAt(0)}
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold dark:text-white leading-tight">
          <span className="text-ucak-blue">{user}</span> {text}
        </p>
        <p className="text-[10px] text-gray-400 font-black uppercase mt-1 flex items-center gap-1">
          <Clock size={10} /> {time}
        </p>
      </div>
    </div>
  );
}