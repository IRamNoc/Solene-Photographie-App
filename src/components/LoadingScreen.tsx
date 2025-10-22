import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Simulation du chargement progressif
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) {
            clearInterval(interval);
            // Complétion plus lente de la barre
            setTimeout(() => {
              setProgress(100);
              setShowComplete(true);
            }, 800);
            return prev;
          }
          return prev + Math.random() * 8;
        });
      }, 120);

      return () => clearInterval(interval);
    } else {
      // Reset pour la prochaine fois
      setProgress(0);
      setShowComplete(false);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#ada133' }} // Couleur verte demandée
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center justify-center">
            {/* Initiales S.T */}
            <motion.div
              className="flex items-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.h1 
                className="text-white font-perandory text-8xl md:text-9xl font-light tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                S.T
              </motion.h1>
              
              {/* Ligne animée / Barre de progression */}
              <div className="ml-8 relative">
                <div className="w-48 md:w-64 h-0.5 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: showComplete ? '100%' : `${progress}%`
                    }}
                    transition={{ 
                      duration: showComplete ? 0.2 : 0.1,
                      ease: showComplete ? 'easeOut' : 'linear'
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Texte subtil en dessous - SUPPRIMÉ */}
            {/* <motion.p
              className="text-white/80 font-['Pinyon_Script'] text-xl tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Photographie
            </motion.p> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;