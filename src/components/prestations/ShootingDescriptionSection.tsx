import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant pour la section de description des prestations shooting
 * Respecte les principes SOLID :
 * - Single Responsibility: Gère uniquement l'affichage de la description shooting
 * - Open/Closed: Extensible via props sans modification du code
 * - Interface Segregation: Interface simple et spécifique
 */

interface ShootingDescriptionSectionProps {
  className?: string;
}

const ShootingDescriptionSection: React.FC<ShootingDescriptionSectionProps> = ({ 
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
          MES PRESTATIONS SHOOTING
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
            Les années passent, les visages changent.<br />
            Les grands moments se mêlent aux plus simples.<br />
            Nos souvenirs s'estompent, s'emmêlent parfois...<br />
            Mais les images, elles, les ramènent à la surface.
          </p>
          
          <p>
            Photographier, pour moi,<br />
            c'est préserver une trace de ce que vous vivez aujourd'hui.
          </p>
          
          <p>
            Mes photos sont naturelles, lumineuses, fidèles à ce que vous ressentez.<br />
            Pas besoin d'un événement exceptionnel.<br />
            La vie est déjà pleine de moments qui méritent d'être célébrés :<br />
            des fiançailles, un mariage à célébrer,<br />
            un nouveau départ, un regard à apprivoiser,<br />
            un âge à célébrer,<br />
            ou simplement l'envie de marquer l'instant.
          </p>
          
          <p>
            Ce que vous vivez mérite d'être vu,<br />
            et plus tard, d'être revu.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ShootingDescriptionSection;