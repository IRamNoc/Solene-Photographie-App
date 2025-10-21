import React from 'react';
import { motion } from 'framer-motion';

/**
 * Composant réutilisable pour afficher une formule de prestation
 * Respecte les principes SOLID :
 * - Single Responsibility: Affiche uniquement une formule de prestation
 * - Open/Closed: Extensible via props sans modification du code
 * - Dependency Inversion: Dépend d'abstractions (props) pas d'implémentations
 */

export interface PackageData {
  name: string;
  price: string;
  features: string[];
}

interface PackageCardProps {
  package: PackageData;
  className?: string;
  imageClassName?: string;
  onContactClick?: () => void;
  hideStartingFrom?: boolean;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonTextColor?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  package: pkg,
  className = '',
  imageClassName = '',
  onContactClick,
  hideStartingFrom = false,
  buttonColor = 'bg-[#ada133]',
  buttonHoverColor = 'hover:bg-[#9a9130]',
  buttonTextColor = 'text-white'
}) => {
  return (
    <motion.div
      className="bg-white p-8 md:p-12 max-w-4xl mx-auto"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="ml-4 md:ml-6">
        {/* En-tête avec titre et prix */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="font-perandory font-normal text-2xl md:text-3xl text-black mb-2 md:mb-0">
            Formule "{pkg.name}"
          </h3>
          <p className="text-xl md:text-2xl font-medium text-black">
            {hideStartingFrom ? pkg.price : `à partir de ${pkg.price}`}
          </p>
        </div>

        {/* Liste des prestations */}
        {pkg.features.length > 0 && (
          <div className="mb-8">
            <p className="font-playfair text-black mb-4 font-medium">
              Cette prestation comprend :
            </p>
            <ul className="space-y-2 ml-4">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start font-playfair text-black">
                  <span className="text-black mr-3 mt-1 flex-shrink-0">•</span>
                  <span className="text-sm md:text-base leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bouton de contact */}
      <div className="flex justify-center">
        <motion.button
          onClick={onContactClick}
          className={`${buttonColor} font-perandory font-normal px-10 py-4 rounded-full ${buttonHoverColor} transition-colors duration-300 text-base md:text-lg tracking-wide ${buttonTextColor}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          PRENDRE CONTACT
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PackageCard;