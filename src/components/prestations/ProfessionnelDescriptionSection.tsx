import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant pour la section de description des prestations professionnelles
 * Respecte les principes SOLID :
 * - Single Responsibility: Gère uniquement l'affichage de la description professionnel
 * - Open/Closed: Extensible via props sans modification du code
 * - Interface Segregation: Interface simple et spécifique
 */

interface ProfessionnelDescriptionSectionProps {
  className?: string;
}

const ProfessionnelDescriptionSection: React.FC<ProfessionnelDescriptionSectionProps> = ({ 
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
          MES PRESTATIONS PROFESSIONNEL
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
            Sur votre site, vos réseaux ou votre portfolio,<br />
            vos images parlent de vous,<br />
            bien avant que vous ayez le temps de le faire.
          </p>
          
          <p>
            Que vous soyez entrepreneur, artisan, freelance ou artiste,<br />
            je vous accompagne pour créer des images<br />
            qui vous ressemblent et qui mettent en valeur<br />
            votre travail, vos créations, vos savoir-faire.
          </p>
          
          <p>
            Ma formation artistique et philosophique<br />
            m'a transmis un regard singulier,<br />
            nourri d'esthétique, de culture, et de sens.<br />
            Elle nourrit aujourd'hui mon approche photographique :<br />
            donner du corps à une idée,<br />
            un geste,<br />
            une matière,<br />
            raconter un parcours,<br />
            révéler l'essence d'un lieu ou d'un objet façonné.
          </p>
          
          <p>
            Je joue avec la lumière, les textures, les ambiances.<br />
            Je cherche l'harmonie des lignes, le détail qui fait sens.<br />
            Ce petit rien qui donne tout son sens à l'image.<br />
            C'est un travail d'observation, de patience et de rigueur,<br />
            des qualités que je cultive chaque jour dans mon métier de joaillière.
          </p>
          
          <p>
            À travers mes images, je veux mettre en lumière<br />
            ce qui a été pensé, fabriqué, rêvé —<br />
            pour raconter non seulement ce que vous faites,<br />
            mais surtout ce que vous incarnez.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProfessionnelDescriptionSection;