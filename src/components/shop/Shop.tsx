import React from 'react';
import { motion } from 'framer-motion';

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="text-center">
        {/* Barre de progression */}
        <motion.div
          className="w-56 sm:w-80 h-1.5 sm:h-3 bg-white rounded-full overflow-hidden shadow-sm mb-3 sm:mb-6 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#ada133' }}
            initial={{ width: '0%' }}
            animate={{ width: '35%' }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Texte "En construction" */}
        <motion.h1
          className="font-perandory text-black tracking-wide mb-2 sm:mb-4 text-lg sm:text-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          EN CONSTRUCTION
        </motion.h1>

        {/* Message descriptif */}
        <motion.p
          className="font-playfair text-black text-xs sm:text-lg max-w-xs sm:max-w-md mx-auto px-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          La boutique arrive bientôt avec une sélection exclusive de tirages d'art.
        </motion.p>
      </div>
    </div>
  );
};

export default Shop;