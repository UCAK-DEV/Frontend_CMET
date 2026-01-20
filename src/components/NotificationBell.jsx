// src/components/NotificationBell.jsx
import { useState, useEffect } from 'react';
import { api } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Circle, CheckCheck } from 'lucide-react';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Polling chaque minute
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    const res = await api.get('/api/v1/notifications');
    setNotifications(res.data);
  };

  const markRead = async (id) => {
    await api.patch(`/api/v1/notifications/${id}/read`);
    fetchNotifications();
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white dark:bg-white/5 rounded-2xl relative hover:scale-110 transition-transform shadow-sm"
      >
        <Bell size={20} className="dark:text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-ucak-blue border-2 border-white dark:border-ucak-dark rounded-full flex items-center justify-center text-[8px] font-black text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-80 bg-white dark:bg-ucak-dark-card rounded-[2rem] shadow-2xl border border-white/10 z-50 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="font-black text-xs uppercase tracking-widest dark:text-white">Notifications</h3>
              <span className="text-[10px] font-bold text-ucak-blue">{unreadCount} nouvelles</span>
            </div>

            <div className="max-h-96 overflow-y-auto scrollbar-hide">
              {notifications.length === 0 ? (
                <div className="p-10 text-center text-gray-400 text-sm italic">Aucune notification</div>
              ) : (
                notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    onClick={() => markRead(notif.id)}
                    className={`p-5 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative group`}
                  >
                    {!notif.is_read && <Circle className="absolute top-6 right-6 text-ucak-blue fill-ucak-blue" size={8} />}
                    <h4 className={`text-sm font-bold mb-1 ${notif.is_read ? 'text-gray-400' : 'dark:text-white'}`}>{notif.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{notif.message}</p>
                    <p className="text-[8px] font-black text-gray-400 uppercase mt-2 tracking-tighter">
                      {new Date(notif.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                ))
              )}
            </div>
            
            <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-ucak-blue transition-colors bg-gray-50 dark:bg-white/5">
              Voir tout l'historique
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}