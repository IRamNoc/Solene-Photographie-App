import React from 'react';
import { motion } from 'framer-motion';

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
              <img
                src={`/images/about-gallery/${imageNumber}.jpg`}
                alt={`Galerie photo ${imageNumber}`}
                className="w-full h-full object-cover m-0 p-0 border-0 block"
                onError={(e) => {
                  // Fallback vers PNG si JPG n'existe pas
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('.jpg')) {
                    target.src = `/images/about-gallery/${imageNumber}.png`;
                  } else {
                    // Placeholder si aucune image n'est trouvée
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlICcgKyBpbWFnZU51bWJlciArICc8L3RleHQ+PC9zdmc+';
                  }
                }}
              />
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default GallerySection;