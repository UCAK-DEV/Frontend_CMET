import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0b0f19] border-t border-gray-100 dark:border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Identité */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logoUcak} alt="Logo" className="w-10 h-10" />
              <span className="text-2xl font-black text-ucak-blue dark:text-white tracking-tighter">CLUB MET</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mb-8">
              La plateforme numérique officielle des étudiants de l'UFR Métiers & Technologies de l'Université Cheikh Ahmadoul Khadim.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:bg-ucak-blue hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Rapide */}
          <div>
            <h4 className="font-black text-ucak-blue dark:text-white uppercase tracking-widest mb-6 text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-ucak-green transition-colors">L'Institution</Link></li>
              <li><Link to="/formation/informatique" className="hover:text-ucak-green transition-colors">Nos Formations</Link></li>
              <li><Link to="/showroom" className="hover:text-ucak-green transition-colors">Showroom Projets</Link></li>
              <li><Link to="/news" className="hover:text-ucak-green transition-colors">Actualités</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-ucak-blue dark:text-white uppercase tracking-widest mb-6 text-xs">Contact</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-ucak-gold shrink-0" />
                <span>Campus UCAK, Touba,<br/>Sénégal</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-ucak-gold shrink-0" />
                <a href="mailto:contact@clubmet.sn" className="hover:text-white transition-colors">contact@clubmet.sn</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-ucak-gold shrink-0" />
                <span>+221 33 976 00 00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 font-bold">
            © {currentYear} Club MET • UFR Sciences & Technologies.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 font-bold uppercase tracking-wider">
             <a href="#" className="hover:text-ucak-blue">Confidentialité</a>
             <a href="#" className="hover:text-ucak-blue">Mentions Légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}