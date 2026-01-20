// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useUser, api } from '../context/UserContext';
import { motion } from 'framer-motion';
import { 
  User, Mail, GraduationCap, Award, Code, 
  Settings, Save, Loader2, Camera, Github
} from 'lucide-react';

export default function Profile() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // État du formulaire
  const [formData, setFormData] = useState({
    full_name: '',
    photo_url: ''
  });

  useEffect(() => {
    fetchFullProfile();
  }, []);

  const fetchFullProfile = async () => {
    try {
      const res = await api.get('/api/v1/users/me');
      setProfileData(res.data);
      setFormData({
        full_name: res.data.full_name,
        photo_url: res.data.photo_url || ''
      });
    } catch (err) {
      console.error("Erreur profil:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.patch('/api/v1/users/me', formData);
      setProfileData(res.data);
      setIsEditing(false);
      // Optionnel: Mettre à jour le contexte global ici si nécessaire
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-ucak-blue" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER DU PROFIL */}
        <div className="bg-white dark:bg-ucak-dark-card rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-white/5 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden bg-ucak-blue/10 border-4 border-ucak-blue/20">
                {profileData.photo_url ? (
                  <img src={profileData.photo_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ucak-blue text-4xl font-black">
                    {profileData.full_name.charAt(0)}
                  </div>
                )}
              </div>
              {isEditing && (
                <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} />
                </button>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{profileData.full_name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-full">
                  <GraduationCap size={16} className="text-ucak-blue" /> {profileData.filiere} • {profileData.promo}
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-full">
                  <Award size={16} className="text-ucak-gold" /> {profileData.xp_points} XP
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-400 hover:text-ucak-blue transition-colors"
            >
              <Settings size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLONNE GAUCHE: INFOS & BADGES */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-ucak-dark-card rounded-[2rem] p-6 shadow-lg border border-white/5">
              <h3 className="font-black mb-6 text-gray-900 dark:text-white uppercase tracking-widest text-xs">Informations</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-gray-400" size={18} />
                  <span className="text-sm dark:text-gray-300">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <User className="text-gray-400" size={18} />
                  <span className="text-sm dark:text-gray-300">{profileData.matricule}</span>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-ucak-dark-card rounded-[2rem] p-6 shadow-lg border border-white/5">
              <h3 className="font-black mb-6 text-gray-900 dark:text-white uppercase tracking-widest text-xs">Badges Débloqués</h3>
              <div className="flex flex-wrap gap-3">
                {profileData.badges.length > 0 ? profileData.badges.map((badge, i) => (
                  <div key={i} className="group relative">
                    <div className="w-12 h-12 bg-ucak-gold/10 rounded-xl flex items-center justify-center text-2xl" title={badge.name}>
                      {badge.icon}
                    </div>
                  </div>
                )) : (
                  <p className="text-xs text-gray-500">Aucun badge pour le moment.</p>
                )}
              </div>
            </section>
          </div>

          {/* COLONNE DROITE: PROJETS OU FORMULAIRE */}
          <div className="lg:col-span-2">
            {isEditing ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-ucak-dark-card rounded-[2rem] p-8 shadow-xl border border-ucak-blue/20"
              >
                <h2 className="text-xl font-black mb-8 dark:text-white">Modifier mon Profil</h2>
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nom Complet</label>
                    <input 
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl p-4 dark:text-white outline-none focus:ring-2 ring-ucak-blue"
                    />
                  </div>
                  <button 
                    disabled={saving}
                    className="w-full py-4 bg-ucak-blue text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-ucak-green transition-all"
                  >
                    {saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Sauvegarder</>}
                  </button>
                </form>
              </motion.div>
            ) : (
              <section className="space-y-6">
                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs ml-4">Mes Projets Showroom</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.projects.map((proj) => (
                    <div key={proj.id} className="bg-white dark:bg-ucak-dark-card p-6 rounded-[2rem] border border-white/5 hover:border-ucak-blue/30 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <Code className="text-ucak-blue" size={24} />
                        <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><Github size={20} /></a>
                      </div>
                      <h4 className="font-bold dark:text-white mb-2">{proj.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{proj.description}</p>
                    </div>
                  ))}
                  {profileData.projects.length === 0 && (
                    <div className="col-span-2 text-center py-12 bg-dashed border-2 border-dashed border-gray-100 dark:border-white/5 rounded-[2rem]">
                      <p className="text-gray-500 text-sm">Vous n'avez pas encore publié de projet.</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}