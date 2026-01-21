import { useState, useEffect } from 'react';
import { useUser, api } from '../context/UserContext';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Rocket, Newspaper, 
  Bell, Plus, ShieldCheck, Clock, Zap, GraduationCap, 
  ChevronRight, User as UserIcon, FileText, Settings, Activity
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState({ courses: 0, projects: 0, news: 0 });
  const [loading, setLoading] = useState(true);

  // Vérification du rôle (Adaptation selon ta logique backend)
  const isAdmin = user?.role === 'ADMIN' || user?.is_staff === true; 

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [c, p, n] = await Promise.all([
          api.get('/api/v1/courses'),
          api.get('/api/v1/projects'),
          api.get('/api/v1/news')
        ]);
        setStats({ courses: c.data.length, projects: p.data.length, news: n.data.length });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#020408] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- SECTION 1 : ENTÊTE IDENTITÉ --- */}
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
          
          <div className="flex items-center gap-4 bg-white dark:bg-white/5 p-2 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
             <div className="w-12 h-12 bg-ucak-blue text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-ucak-blue/20">
                {user?.full_name?.charAt(0) || 'U'}
             </div>
             <div className="pr-4 hidden sm:block">
                <p className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Dernière connexion</p>
                <p className="text-xs font-bold dark:text-white">Aujourd'hui, 10:45</p>
             </div>
          </div>
        </header>

        {/* --- SECTION 2 : KPI STATISTIQUES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Ressources', val: stats.courses, icon: <BookOpen />, color: 'text-ucak-blue' },
            { label: 'Projets Lab', val: stats.projects, icon: <Rocket />, color: 'text-ucak-green' },
            { label: 'Actualités', val: stats.news, icon: <Newspaper />, color: 'text-ucak-gold' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-[#0b101a] p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm">
              <div className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center ${stat.color} mb-6`}>
                {stat.icon}
              </div>
              <p className="text-4xl font-black dark:text-white mb-1">{loading ? '...' : stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label} disponibles</p>
            </div>
          ))}
        </div>

        {/* --- SECTION 3 : ACTIONS & FLUX (BENTO) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLONNE GAUCHE : ACTIONS PRIORITAIRES */}
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-2 flex items-center gap-2">
              <Zap size={14} className="text-ucak-blue" /> Actions Rapides
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isAdmin ? (
                // --- VUE ADMIN ---
                <>
                  <ActionCard title="Gérer les News" desc="Publier des infos officielles" link="/admin/news" icon={<Newspaper />} />
                  <ActionCard title="Médiathèque" desc="Mettre à jour les dossiers Drive" link="/knowledge" icon={<Plus />} />
                  <ActionCard title="Showroom" desc="Modérer les projets étudiants" link="/showroom" icon={<Rocket />} />
                  <ActionCard title="Paramètres" desc="Configuration du Hub MET" link="/settings" icon={<Settings />} />
                </>
              ) : (
                // --- VUE ÉTUDIANT ---
                <>
                  <ActionCard title="Mes Projets" desc="Gérer mes publications Showroom" link="/showroom" icon={<Rocket />} />
                  <ActionCard title="Mon CV MET" desc="Mettre à jour mon profil pro" link="/cv-builder" icon={<FileText />} />
                  <ActionCard title="Cours & TD" desc="Accéder aux bibliothèques" link="/knowledge" icon={<BookOpen />} />
                  <ActionCard title="Guide Aide" desc="Comment utiliser le Hub" link="/academy-guide" icon={<Zap />} />
                </>
              )}
            </div>
          </div>

          {/* COLONNE DROITE : ACTIVITÉ ET ALERTES */}
          <div className="lg:col-span-4 space-y-8">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 px-2 flex items-center gap-2">
                <Activity size={14} className="text-ucak-green" /> Mises à jour Club
             </h3>
             <div className="bg-white dark:bg-[#0b101a] p-8 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm space-y-8">
                <UpdateItem user="Scolarité" text="Nouvel emploi du temps L3" time="2h" />
                <UpdateItem user="Cellule" text="Mise à jour Dossier Drive IR" time="5h" />
                <UpdateItem user="Admin" text="Maintenance système prévue" time="1j" />
                
                <button className="w-full py-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-ucak-blue transition-colors">
                  Voir tout l'historique
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Sous-composant pour les cartes d'action
function ActionCard({ title, desc, link, icon }) {
  return (
    <a href={link} className="flex items-center justify-between p-6 bg-white dark:bg-[#0b101a] rounded-[2rem] border border-gray-100 dark:border-white/5 hover:border-ucak-blue/30 hover:shadow-xl transition-all group">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 text-ucak-blue rounded-2xl flex items-center justify-center group-hover:bg-ucak-blue group-hover:text-white transition-all shadow-inner">
          {icon}
        </div>
        <div>
          <h4 className="font-black dark:text-white text-sm tracking-tight">{title}</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{desc}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-ucak-blue transition-colors" />
    </a>
  );
}

// Sous-composant pour le flux d'activité
function UpdateItem({ user, text, time }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 rounded-full bg-ucak-blue/10 text-ucak-blue flex items-center justify-center text-[10px] font-black">
        {user.charAt(0)}
      </div>
      <div>
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