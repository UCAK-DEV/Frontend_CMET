import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Server, UserCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#05070a] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-ucak-blue/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-ucak-blue"
          >
            <ShieldCheck size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
            Politique de <span className="text-ucak-blue">Confidentialité</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Votre confiance est notre priorité. Voici comment le Club MET protège et utilise vos données académiques et personnelles.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          
          <Section 
            icon={<UserCheck />} 
            title="1. Collecte des Données"
            content="Nous collectons uniquement les informations nécessaires à votre identification en tant qu'étudiant de l'UFR MET : nom complet, adresse email institutionnelle ou personnelle, matricule étudiant, filière et niveau d'étude. Ces données nous permettent de vérifier votre éligibilité aux services du club."
          />

          <Section 
            icon={<Server />} 
            title="2. Utilisation des Informations"
            content="Vos données sont utilisées exclusivement pour : vous donner accès aux ressources pédagogiques (Drive, Cours), permettre votre participation aux élections du bureau (vérification d'identité), et vous communiquer les actualités importantes du club. Aucune donnée n'est vendue à des tiers."
          />

          <Section 
            icon={<Lock />} 
            title="3. Sécurité & Stockage"
            content="Toutes les informations sensibles, notamment les mots de passe, sont cryptées avant d'être stockées dans notre base de données sécurisée. L'accès aux données administratives est strictement limité aux membres habilités du bureau exécutif (Secrétaire Général, Président)."
          />

          <Section 
            icon={<Eye />} 
            title="4. Vos Droits"
            content="Conformément aux lois en vigueur sur la protection des données numériques au Sénégal, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ce droit à tout moment en contactant le secrétariat du club ou via votre espace profil."
          />

        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5 text-center text-sm text-gray-400">
          <p>Dernière mise à jour : {new Date().getFullYear()}</p>
          <p className="mt-2">Pour toute question : <a href="mailto:privacy@club-met.sn" className="text-ucak-blue hover:underline">privacy@club-met.sn</a></p>
        </div>

      </div>
    </div>
  );
}

const Section = ({ icon, title, content }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    className="flex gap-6 md:gap-8"
  >
    <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-ucak-blue shrink-0 mt-1">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
        {content}
      </p>
    </div>
  </motion.div>
);
