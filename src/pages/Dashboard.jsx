import { useUser } from '../context/UserContext';
import { ShieldCheck, GraduationCap, Award } from 'lucide-react';

export default function Dashboard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CARTE ÉTUDIANT DYNAMIQUE */}
          <div className="bg-gradient-to-br from-ucak-blue to-black p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
            <ShieldCheck className="absolute top-4 right-4 opacity-20" size={80} />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-6">E-Carte Club MET</p>
              <h2 className="text-2xl font-black mb-1">{user.full_name}</h2>
              <p className="text-xs font-mono opacity-80 mb-6">ID: {user.matricule}</p>
              
              <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/20">
                <GraduationCap size={14} className="text-ucak-green" />
                <span className="text-[10px] font-bold uppercase">{user.filiere} — {user.promo}</span>
              </div>
            </div>
          </div>

          {/* STATISTIQUES XP */}
          <div className="lg:col-span-2 bg-white dark:bg-ucak-dark-card p-8 rounded-3xl shadow-sm border dark:border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-ucak-gold/10 rounded-2xl text-ucak-gold">
                <Award size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black">Progression MET</h3>
                <p className="text-sm text-gray-500">{user.xp_points} Points d'expérience</p>
              </div>
            </div>
            {/* Barre de progression simple */}
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-4 rounded-full overflow-hidden">
              <div className="bg-ucak-green h-full transition-all" style={{ width: `${(user.xp_points / 2000) * 100}%` }}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}