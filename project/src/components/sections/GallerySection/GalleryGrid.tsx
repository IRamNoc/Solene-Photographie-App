import React from 'react';
import { motion } from 'framer-motion';

const GalleryGrid: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Première ligne - 5 images */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1/3 h-1/4 bg-white rounded-full opacity-80"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-400 to-green-300 rounded-b-lg"></div>
          </div>
        ))}
      </motion.div>
      
      {/* Deuxième ligne - 6 images plus petites */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1/3 h-1/4 bg-white rounded-full opacity-80"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-400 to-green-300 rounded-b-lg"></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default GalleryGrid;