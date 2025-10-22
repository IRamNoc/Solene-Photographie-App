import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant pour la section de description des prestations événementielles
 * Respecte les principes SOLID :
 * - Single Responsibility: Gère uniquement l'affichage de la description événementiel
 * - Open/Closed: Extensible via props sans modification du code
 * - Interface Segregation: Interface simple et spécifique
 */

interface EvenementielDescriptionSectionProps {
  className?: string;
}

const EvenementielDescriptionSection: React.FC<EvenementielDescriptionSectionProps> = ({ 
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
          MES PRESTATIONS ÉVÉNEMENTIEL
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
            Les conversations qui s'amiment,<br />
            la lumière qui tombe doucement sur les verres,<br />
            les rires étouffés, les regards complices,<br />
            un détail de décoration qui ne passe pas inaperçu...
          </p>
          
          <p>
            Je me glisse discrètement au cœur de vos événements<br />
            pour en saisir la beauté vivante :<br />
            les ambiances, les gestes, les présences,<br />
            les échanges furtifs comme les temps forts.
          </p>
          
          <p>
            Cocktail, conférence, lancement de produit ou soirée privée,<br />
            chaque moment a son rythme, son énergie, sa lumière.
          </p>
          
          <p>
            Mon rôle est de capter sans l'interrompre,<br />
            de révéler l'élégance d'un lieu,<br />
            la convivialité d'un instant,<br />
            et tout ce que vous avez imaginé<br />
            pour que cette soirée vous ressemble.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EvenementielDescriptionSection;