import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../../OptimizedImage';

const GallerySection: React.FC = () => {
  return (
    <>
      {/* 🔴 LIGNE ROUGE DE DÉLIMITATION - FIN DU FOND BEIGE */}
      <div className="w-full h-1 bg-[#ada133] opacity-20"></div>
      
      {/* 🎯 GALERIE DE 6 PHOTOS - FOND BLANC */}
      <section className="w-full bg-white">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full gap-0"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[1, 2, 3, 4, 5, 6].map((imageNumber) => (
            <div
              key={imageNumber}
              className="aspect-[3/4] overflow-hidden m-0 p-0 border-0"
            >
              <OptimizedImage
                src={`/images/about-gallery/${imageNumber}.png`}
                alt={`Galerie photo ${imageNumber}`}
                className="w-full h-full"
                quality="medium"
                lazy={true}
              />
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default GallerySection;