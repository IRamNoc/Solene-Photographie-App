import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant pour la section de description des prestations famille
 * Respecte les principes SOLID :
 * - Single Responsibility: Gère uniquement l'affichage de la description famille
 * - Open/Closed: Extensible via props sans modification du code
 * - Interface Segregation: Interface simple et spécifique
 */

interface FamilleDescriptionSectionProps {
  className?: string;
}

const FamilleDescriptionSection: React.FC<FamilleDescriptionSectionProps> = ({ 
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
          MES PRESTATIONS FAMILLE
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
            Ça commence souvent par un jeu,<br />
            une course dans l'herbe, un éclat de rire.
          </p>
          
          <p>
            Puis vient un câlin. Un regard tendre.<br />
            Un geste simple entre frères, sœurs, grands-parents.<br />
            Bien d'extraordinaire. Mais tout ce qui compte est là.
          </p>
          
          <p>
            Je ne vous demanderai pas de poser, ni de sourire à tout prix.<br />
            Je vous inviterai juste à être ensemble,<br />
            dans ce que vous vivez au quotidien, ou dans l'exceptionnel.
          </p>
          
          <p>
            Un après-midi dans le salon,<br />
            un pique-nique en promenade,<br />
            ou les cousins dans les bras,<br />
            ou les cousins qui jouent dans la baignoire.<br />
            Là où l'amour circule, il y a des images à créer.
          </p>
          
          <p>
            Vous n'avez rien à prouver, rien à contrôler.<br />
            Les enfants peuvent crier, courir, bouger...<br />
            C'est la vie, et c'est elle que je viens photographier.
          </p>
          
          <p>
            Une petite main qui cherche la vôtre,<br />
            les joues encore rondes,<br />
            les liens discrets entre générations,<br />
            la tendresse qui circule entre vous.
          </p>
          
          <p>
            Autant d'images à révéler.<br />
            Et un jour, elles vous feront sourire quand le cœur le plus.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FamilleDescriptionSection;