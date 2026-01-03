import { useUser } from '../context/UserContext';
import { QrCode, ShieldCheck, GraduationCap } from 'lucide-react';

export default function StudentCard() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-3xl overflow-hidden shadow-2xl group transition-transform hover:scale-[1.02]">
      {/* Fond avec dégradé et pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-ucak-blue via-blue-900 to-black"></div>
      <div className="absolute inset-0 ucak-pattern opacity-20"></div>
      
      {/* Éléments de décoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-ucak-green rounded-full blur-[60px] opacity-30"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-ucak-gold rounded-full blur-[60px] opacity-20"></div>

      <div className="relative h-full p-6 flex flex-col justify-between text-white">
        {/* Header de la carte */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <ShieldCheck size={24} className="text-ucak-green" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 leading-none mb-1">E-Carte Étudiant</p>
              <h4 className="font-black text-sm tracking-widest">CLUB MET</h4>
            </div>
          </div>
          <img src="/logo-ucak.png" alt="Logo" className="h-8 opacity-80" />
        </div>

        {/* Corps de la carte */}
        <div className="flex gap-6 items-center">
          {/* Avatar / Photo Placeholder */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-gray-700 to-gray-500 border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-inner">
             <span className="text-3xl font-bold opacity-50">{user.full_name?.charAt(0)}</span>
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-bold leading-tight uppercase">{user.full_name}</h3>
            <div className="flex items-center gap-2 text-ucak-green">
               <GraduationCap size={14} />
               <p className="text-xs font-medium uppercase tracking-wider">{user.filiere || 'Filière'} — {user.promo || 'Promo'}</p>
            </div>
            <p className="text-[13px] font-mono text-white/70 mt-2">ID: {user.matricule}</p>
          </div>
        </div>

        {/* Footer de la carte */}
        <div className="flex justify-between items-end border-t border-white/10 pt-4">
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-widest opacity-50">Statut Membre</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-ucak-green rounded-full animate-pulse"></div>
              <span className="text-[11px] font-bold text-ucak-green tracking-tighter uppercase">Vérifié / Actif</span>
            </div>
          </div>
          <div className="bg-white p-1 rounded-md">
             <QrCode size={32} className="text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}