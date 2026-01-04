import { useUser } from '../context/UserContext';
import { ShieldCheck, Wifi, GraduationCap, CheckCircle2, Lock } from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png';

export default function StudentCard() {
  const { user } = useUser();

  // Données par défaut
  const studentName = user?.full_name || "Étudiant Invité";
  const studentFiliere = user?.filiere || "Visiteur";
  const studentMatricule = user?.matricule || "UCAK-GUEST";
  const currentYear = "2025-2026";

  // --- SÉCURISATION DU QR CODE ---
  // 1. On crée un "Token" crypté (encodé en Base64 pour l'exemple) qui masque le matricule
  const encryptedToken = btoa(`UCAK-SECURE-${studentMatricule}-${Date.now()}`);
  
  // 2. Le QR Code pointe vers une URL de vérification interne
  // Seul le personnel autorisé pourra voir les infos en ouvrant ce lien
  // Les étrangers tomberont sur une page de login/accès refusé
  const secureQrData = `${window.location.origin}/verify/student/${encryptedToken}`;

  // 3. Génération visuelle du QR
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(secureQrData)}&bgcolor=ffffff&color=000000&margin=2`;

  return (
    <div className="w-full relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#0f141e] to-[#1a2333] text-white shadow-2xl border border-gray-700/50 p-6 flex flex-col justify-between h-full min-h-[240px] group transition-transform hover:scale-[1.01]">
      
      {/* --- ÉLÉMENTS DE SÉCURITÉ VISUELS --- */}
      {/* Bande Holographique (Sécurité visuelle) */}
      <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-transparent via-white/30 to-transparent z-0"></div>
      
      {/* Motif Guilloché (Anti-copie) */}
      <div className="absolute inset-0 ucak-pattern opacity-10 pointer-events-none z-0"></div>
      
      {/* Filigrane Logo */}
      <img src={logoUcak} alt="" className="absolute -bottom-8 -right-8 w-56 h-56 opacity-[0.03] pointer-events-none grayscale rotate-12" />

      {/* --- EN-TÊTE --- */}
      <div className="relative z-10 flex justify-between items-start pl-6">
        <div className="flex items-center gap-3">
          {/* Badge Officiel UFR */}
          <div className="p-1.5 bg-gradient-to-br from-ucak-blue to-blue-900 rounded-lg border border-white/10 shadow-lg flex items-center gap-2">
            <ShieldCheck size={16} className="text-white" />
            <span className="text-[10px] font-black uppercase text-white tracking-wider">Officiel</span>
          </div>
        </div>
        {/* Puce NFC */}
        <Wifi size={24} className="text-white/20 rotate-90" />
      </div>

      {/* --- CORPS DE LA CARTE --- */}
      <div className="relative z-10 flex items-center gap-5 my-5 pl-6">
        {/* Photo Sécurisée */}
        <div className="relative group-hover:scale-105 transition-transform duration-500">
           <div className="w-16 h-16 rounded-xl bg-gray-800 border-[3px] border-white/10 flex items-center justify-center overflow-hidden shadow-inner relative">
              {/* Effet reflet sur la photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 z-10"></div>
              <span className="font-black text-2xl text-gray-600">{studentName.charAt(0)}</span>
           </div>
           {/* Indicateur de validité */}
           <div className="absolute -bottom-1 -right-1 bg-ucak-green border-2 border-[#0f141e] rounded-full p-0.5 z-20">
              <CheckCircle2 size={10} className="text-white" />
           </div>
        </div>
        
        <div className="flex-1 min-w-0">
           <h3 className="text-lg font-black uppercase tracking-tight truncate text-white leading-tight">
             {studentName}
           </h3>
           <div className="flex items-center gap-2 text-ucak-gold/90 mt-1.5">
              <GraduationCap size={14} />
              <p className="text-[10px] font-bold uppercase tracking-widest truncate">
                {studentFiliere}
              </p>
           </div>
           <p className="text-[9px] text-gray-500 font-mono mt-1">
             VALID: <span className="text-gray-300">{currentYear}</span>
           </p>
        </div>
      </div>

      {/* --- PIED DE PAGE & QR SÉCURISÉ --- */}
      <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-4 pl-6">
         <div>
            <div className="flex items-center gap-1.5 mb-1 opacity-50">
               <Lock size={8} />
               <p className="text-[8px] uppercase font-black tracking-widest">ID Crypté</p>
            </div>
            <p className="text-xs font-mono text-white tracking-[0.15em] tabular-nums text-shadow-sm">
              {studentMatricule}
            </p>
         </div>

         <div className="flex items-center gap-4">
            {/* Conteneur QR avec label sécurité */}
            <div className="bg-white p-1 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-ucak-blue"></div>
               <img 
                 src={qrCodeUrl} 
                 alt="QR Sécurisé" 
                 className="w-12 h-12 object-contain mix-blend-multiply"
               />
            </div>
         </div>
      </div>

    </div>
  );
}