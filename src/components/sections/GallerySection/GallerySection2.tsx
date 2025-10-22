import React from 'react';
import { motion } from 'framer-motion';

const GallerySection2: React.FC = () => {
  return (
    <>
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
                src={`/images/about-gallery-2/${imageNumber}.png`}
                alt={`Galerie photo ${imageNumber}`}
                className="w-full h-full object-cover m-0 p-0 border-0 block"
                onError={(e) => {
                  // Fallback vers JPEG si PNG n'existe pas
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('.png')) {
                    target.src = `/images/about-gallery-2/${imageNumber}.jpeg`;
                  } else if (target.src.includes('.jpeg')) {
                    target.src = `/images/about-gallery-2/${imageNumber}.jpg`;
                  } else {
                    // Placeholder si aucune image n'est trouvée
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgaW50cm91dmFibGU8L3RleHQ+PC9zdmc+';
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

export default GallerySection2;