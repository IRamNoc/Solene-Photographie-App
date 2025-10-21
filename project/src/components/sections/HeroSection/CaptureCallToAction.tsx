import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CaptureCallToAction: React.FC = () => {
  return (
    <div 
      className="flex flex-col justify-center md:justify-end mt-8 md:mt-0"
      style={{
        minHeight: 'clamp(120px, 15vh, 420px)', /* HAUTEUR RÉDUITE POUR MOBILE */
        paddingTop: 'clamp(0px, 1vw, 40px)' /* PADDING TOP ENCORE PLUS RÉDUIT */
      }}
    >
      <div 
        className="flex flex-col items-center md:items-start text-center md:text-left"
        style={{ 
          gap: 'clamp(16px, 4vw, 32px)' /* GAP LÉGÈREMENT AUGMENTÉ POUR MOBILE */
        }}
      >
        
        {/* CITATION PRINCIPALE */}
        <motion.h2
          className="font-perandory font-normal text-black text-center md:text-left"
          style={{
            fontSize: 'clamp(28px, 7vw, 55.8px)', /* TAILLE LÉGÈREMENT AUGMENTÉE MOBILE - 28px pour plus d'impact */
            lineHeight: '1.1', /* INTERLIGNE PLUS SERRÉ POUR MOBILE */
            maxWidth: '100%' /* LARGEUR MAXIMALE POUR ÉVITER LE DÉBORDEMENT */
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          "CAPTURER<br />VOS JOURS HEUREUX"
        </motion.h2>
        
        {/* BOUTON CTA */}
        <motion.div
          className="flex justify-center md:justify-start w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link
            to="/prestations"
            className="font-perandory text-white rounded-full hover:bg-[#A69550] transition-colors tracking-wide"
            style={{
              backgroundColor: '#ada133',
              fontSize: 'clamp(16px, 4vw, 32px)', /* TAILLE BOUTON LÉGÈREMENT AUGMENTÉE MOBILE - 16px pour meilleure lisibilité */
              paddingTop: 'clamp(8px, 2vw, 5px)', /* PADDING VERTICAL AUGMENTÉ MOBILE */
              paddingBottom: 'clamp(8px, 2vw, 0px)', /* PADDING VERTICAL AUGMENTÉ MOBILE */
              paddingLeft: 'clamp(20px, 5vw, 24px)', /* PADDING HORIZONTAL AUGMENTÉ MOBILE */
              paddingRight: 'clamp(20px, 5vw, 24px)', /* PADDING HORIZONTAL AUGMENTÉ MOBILE */
              display: 'inline-block',
              textAlign: 'center'
            }}
          >
            DÉCOUVRIR MES PRESTATIONS
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CaptureCallToAction;