import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Heart, Mail, MapPin, Phone } from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png';

export default function Footer() {
  return (
    // pb-24 lg:pb-0 : Laisse de l'espace pour la barre mobile en bas
    <footer className="bg-white dark:bg-[#161b22] border-t border-gray-200 dark:border-white/5 pt-16 pb-24 lg:pb-10 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Colonne 1 : Info Club */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src={logoUcak} alt="Logo" className="w-8 h-8 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" />
              <span className="font-black text-lg text-gray-900 dark:text-white">CLUB MET</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              L'association officielle des étudiants de l'UFR Métiers, Économie et Technologies. Excellence et Innovation depuis 2023.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:bg-ucak-blue hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Accès Rapide</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/knowledge" className="hover:text-ucak-blue transition-colors">Bibliothèque de Cours</Link></li>
              <li><Link to="/career" className="hover:text-ucak-blue transition-colors">Espace Carrières</Link></li>
              <li><Link to="/showroom" className="hover:text-ucak-blue transition-colors">Projets Étudiants</Link></li>
              <li><Link to="/login" className="hover:text-ucak-blue transition-colors">Connexion Membre</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Nous Contacter</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-ucak-blue shrink-0 mt-0.5" />
                <span>Université Cheikh Ahmadoul Khadim,<br/>Touba, Sénégal</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-ucak-blue shrink-0" />
                <a href="mailto:contact@club-met.sn" className="hover:underline">contact@club-met.sn</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-ucak-blue shrink-0" />
                <span>+221 77 000 00 00</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter (Optionnel) */}
          <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Restez informé</h4>
            <p className="text-xs text-gray-500 mb-4">Recevez les dernières news de l'UFR.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email..." className="w-full bg-white dark:bg-black/20 border-none rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 ring-ucak-blue/50" />
              <button className="bg-ucak-blue text-white px-3 rounded-lg font-bold text-xs">→</button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2025 Club MET UCAK. Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            Développé avec <Heart size={12} className="text-red-500 fill-red-500" /> par le Pôle Tech
          </div>
        </div>
      </div>
    </footer>
  );
}