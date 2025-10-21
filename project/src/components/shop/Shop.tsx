import React from 'react';
import { motion } from 'framer-motion';

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f3f0' }}>
      <div className="text-center">
        {/* Barre de progression */}
        <motion.div
          className="w-80 h-3 bg-white rounded-full overflow-hidden shadow-sm mb-6 mx-auto"
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
          className="font-perandory text-black tracking-wide mb-4"
          style={{ fontSize: '2.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          EN CONSTRUCTION
        </motion.h1>

        {/* Message descriptif */}
        <motion.p
          className="font-playfair text-black text-lg max-w-md mx-auto"
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