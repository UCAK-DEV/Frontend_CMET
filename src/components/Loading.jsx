import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-ucak-blue border-t-ucak-gold rounded-full"
      />
      <p className="mt-4 text-sm font-bold text-ucak-blue dark:text-white animate-pulse">
        Chargement...
      </p>
    </div>
  );
}