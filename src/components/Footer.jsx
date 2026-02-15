import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import logoUcak from '../assets/images/logo-ucak.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    // Simulation d'appel API
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <footer className="bg-white dark:bg-[#0b0f1a] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Colonne 1 : Identité Club (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoUcak} alt="Logo" className="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-500" />
              <div>
                <span className="block font-black text-lg text-gray-900 dark:text-white leading-none tracking-tight">CLUB MET</span>
                <span className="text-[10px] font-bold text-ucak-blue uppercase tracking-[0.2em]">Métiers & Technologies</span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium max-w-sm">
              L'association officielle des étudiants de l'UFR MET. Nous formons les leaders de demain par l'innovation, l'entrepreneuriat et l'excellence académique.
            </p>
            <div className="flex gap-3 pt-2">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:bg-ucak-blue hover:text-white transition-all duration-300 group">
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Navigation (2 cols) */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li><Link to="/knowledge" className="hover:text-ucak-blue transition-colors flex items-center gap-2">Bibliothèque</Link></li>
              <li><Link to="/showroom" className="hover:text-ucak-blue transition-colors flex items-center gap-2">Showroom</Link></li>
              <li><Link to="/career" className="hover:text-ucak-blue transition-colors flex items-center gap-2">Carrières</Link></li>
              <li><Link to="/login" className="hover:text-ucak-blue transition-colors flex items-center gap-2">Espace Membre</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Nous Joindre</h4>
            <ul className="space-y-5 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-4 group">
                <div className="p-2 bg-ucak-blue/10 text-ucak-blue rounded-lg group-hover:bg-ucak-blue group-hover:text-white transition-colors">
                  <MapPin size={16} />
                </div>
                <span>Université Cheikh Ahmadoul Khadim,<br/>Touba, Sénégal</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 bg-ucak-blue/10 text-ucak-blue rounded-lg group-hover:bg-ucak-blue group-hover:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <a href="mailto:club.ufr.met@gmail.com" className="hover:text-ucak-blue transition-colors">club.ufr.met@gmail.com</a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 bg-ucak-blue/10 text-ucak-blue rounded-lg group-hover:bg-ucak-blue group-hover:text-white transition-colors">
                  <Phone size={16} />
                </div>
                <span className="tabular-nums font-bold text-gray-700 dark:text-gray-300">+221 78 794 10 04</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter (3 cols) */}
          <div className="md:col-span-3 md:col-start-10 lg:col-span-3 lg:col-start-10 xl:col-span-3 xl:col-start-10"></div>
           {/* Correction grid layout pour newsletter */}
        </div>

        {/* SECTION NEWSLETTER FLOTTANTE (MODERNE) */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-ucak-blue to-ucak-green rounded-[2rem] blur-xl opacity-20 dark:opacity-10"></div>
          <div className="relative bg-gray-900 dark:bg-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
            {/* Décoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="max-w-md relative z-10">
              <h3 className="text-2xl font-black text-white mb-2">Restez informé 🚀</h3>
              <p className="text-gray-400 text-sm font-medium">
                Recevez les dernières news de l'UFR, les offres de stage et les événements à venir directement dans votre boîte mail.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex-1 w-full md:w-auto relative z-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="Votre adresse email..." 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 outline-none focus:ring-2 ring-ucak-blue/50 focus:bg-white/20 transition-all font-medium text-sm" 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0
                    ${status === 'success' ? 'bg-green-500 text-white' : 'bg-ucak-blue text-white hover:bg-white hover:text-ucak-blue'}`}
                >
                  {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : 
                   status === 'success' ? <><CheckCircle2 size={18} /> Inscrit</> : 
                   <><Send size={16} /> S'inscrire</>}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Club MET UCAK. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-ucak-blue transition-colors">À Propos</Link>
            <Link to="/privacy" className="hover:text-ucak-blue transition-colors">Confidentialité</Link>
            <span className="flex items-center gap-1 normal-case text-gray-300">
              Made with <span className="text-red-500 text-sm">♥</span> by DevUcak
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}