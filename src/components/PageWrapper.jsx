import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      // pt-20 : Pour ne pas être caché par le Header Desktop/Mobile
      // pb-24 md:pb-0 : Padding bas important UNIQUEMENT sur mobile pour la Bottom Nav
      className="w-full min-h-screen pt-20 pb-24 md:pb-0 px-4 md:px-0"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;