import { Terminal, Heart, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-ucak-blue dark:bg-ucak-dark text-white pt-20 pb-10 overflow-hidden border-t-4 border-ucak-gold">
      
      {/* Motif d'arrière-plan subtil (Nuur) */}
      <div className="absolute inset-0 ucak-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-ucak-green/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-ucak-gold/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* COLONNE 1 : Identité & Vision */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 group mb-6">
              <div className="bg-ucak-green p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-ucak-green/20 border border-white/10">
                <Terminal className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight leading-none">
                CLUB <span className="text-ucak-green dark:text-ucak-gold block text-sm font-bold">MET</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Le pôle d'excellence technologique de l'Université Cheikh Ahmadoul Khadim. 
              Cultiver le savoir numérique à la lumière des valeurs de Touba.
            </p>
            <div className="flex gap-4">
              {[Github, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-white/5 hover:bg-ucak-gold hover:text-ucak-dark rounded-lg transition-all border border-white/10">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COLONNE 2 : Navigation */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-ucak-gold rounded-full"></span> Navigation
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/showroom" className="hover:text-ucak-gold hover:translate-x-1 transition-all inline-block">Annuaire des Talents</Link></li>
              <li><Link to="/knowledge" className="hover:text-ucak-gold hover:translate-x-1 transition-all inline-block">Bibliothèque (Savoir)</Link></li>
              <li><Link to="/quizz" className="hover:text-ucak-gold hover:translate-x-1 transition-all inline-block">Compétitions</Link></li>
              <li><Link to="/network" className="hover:text-ucak-gold hover:translate-x-1 transition-all inline-block">Réseau & Emploi</Link></li>
            </ul>
          </div>

          {/* COLONNE 3 : Ressources */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-ucak-green rounded-full"></span> Liens Utiles
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-ucak-green transition-colors flex items-center gap-2"><ExternalLink size={14}/> Site Officiel UCAK</a></li>
              <li><a href="#" className="hover:text-ucak-green transition-colors flex items-center gap-2"><ExternalLink size={14}/> Portail Étudiant</a></li>
              <li><a href="#" className="hover:text-ucak-green transition-colors flex items-center gap-2"><ExternalLink size={14}/> Planning des Cours</a></li>
              <li><Link to="/login" className="text-ucak-gold font-bold hover:underline">Espace Membre</Link></li>
            </ul>
          </div>

          {/* COLONNE 4 : Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-white rounded-full"></span> Nous Trouver
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-ucak-gold/10 rounded-lg text-ucak-gold group-hover:bg-ucak-gold group-hover:text-ucak-dark transition-colors">
                  <MapPin size={18} />
                </div>
                <span>Campus UCAK, Complexe Cheikh Ahmadoul Khadim,<br/>Touba, Sénégal</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-ucak-gold/10 rounded-lg text-ucak-gold group-hover:bg-ucak-gold group-hover:text-ucak-dark transition-colors">
                  <Mail size={18} />
                </div>
                <span>club.met@ucak.edu.sn</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-ucak-gold/10 rounded-lg text-ucak-gold group-hover:bg-ucak-gold group-hover:text-ucak-dark transition-colors">
                  <Phone size={18} />
                </div>
                <span>+221 33 976 00 00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2025 Université Cheikh Ahmadoul Khadim. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              Fait avec <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> par la <span className="text-white font-bold">Team Tech UCAK</span>
            </span>
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}