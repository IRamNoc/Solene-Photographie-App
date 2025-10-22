import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant pour la section de description des prestations mariage
 * Respecte les principes SOLID :
 * - Single Responsibility: Gère uniquement l'affichage de la description mariage
 * - Open/Closed: Extensible via props sans modification du code
 * - Interface Segregation: Interface simple et spécifique
 */

interface MariageDescriptionSectionProps {
  className?: string;
}

const MariageDescriptionSection: React.FC<MariageDescriptionSectionProps> = ({ 
  className = '' 
}) => {
  return (
    <motion.section 
      className={`pt-48 md:pt-56 pb-16 px-4 md:px-8 lg:px-12 bg-[#f6f6f6] ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Titre principal */}
        <motion.h2 
          className="font-perandory font-normal text-black text-3xl md:text-4xl lg:text-5xl tracking-wide mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          MES PRESTATIONS MARIAGE
        </motion.h2>

        {/* Texte descriptif */}
        <motion.div 
          className="space-y-6 font-playfair text-black text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>
            Si vous cherchez une photographe discrète et bienveillante,<br />
            qui saura se fondre dans l'instant pour en révéler la beauté,<br />
            alors peut-être que nos chemins sont faits pour se croiser.
          </p>
          
          <p>
            J'aime raconter des histoires vraies,<br />
            celles qui vibrent à travers les regards échangés,<br />
            les rires spontanés, les silences chargés d'émotion.
          </p>
          
          <p>
            Mes photos sont naturelles, lumineuses, fidèles à ce que vous avez ressenti.<br />
            Pas de mise en scène forcée :<br />
            juste la vérité de l'instant, sublimée avec douceur.
          </p>
          
          <p>
            Je prendrai soin de photographier chacun de vos invités,<br />
            chaque petit détail que vous aurez préparé avec soin,<br />
            pour immortaliser tout ce qui fait l'âme de votre journée.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MariageDescriptionSection;