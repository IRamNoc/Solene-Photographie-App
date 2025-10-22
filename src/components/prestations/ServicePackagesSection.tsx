import React from 'react';
import { motion } from 'framer-motion';
import PackageCard, { PackageData } from './PackageCard';

/**
 * Composant pour afficher les formules d'un service spécifique
 * Respecte les principes SOLID :
 * - Single Responsibility: Gère uniquement l'affichage des formules d'un service
 * - Open/Closed: Extensible via props sans modification
 * - Interface Segregation: Interface simple et focalisée
 */

export interface ServicePackagesData {
  serviceTitle: string;
  packages: PackageData[];
}

interface ServicePackagesSectionProps {
  data: ServicePackagesData;
  className?: string;
  onContactClick?: (packageName: string) => void;
  hideStartingFrom?: boolean;
  buttonColor?: string;
  buttonHoverColor?: string;
  buttonTextColor?: string;
  highlightBarColor?: string;
}

const ServicePackagesSection: React.FC<ServicePackagesSectionProps> = ({ 
  data,
  className = '',
  onContactClick,
  hideStartingFrom = false,
  buttonColor,
  buttonHoverColor,
  buttonTextColor,
  highlightBarColor = 'bg-[#ada133]'
}) => {
  const handleContactClick = (packageName: string) => {
    if (onContactClick) {
      onContactClick(packageName);
    } else {
      // Comportement par défaut : scroll vers le formulaire de contact ou ouvrir modal
      console.log(`Contact demandé pour la formule: ${packageName}`);
    }
  };

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Titre de la section */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-perandory font-normal text-3xl md:text-4xl lg:text-5xl text-black mb-4">
            {data.serviceTitle}
          </h2>
          <div className={`w-24 h-0.5 ${highlightBarColor} mx-auto`}></div>
        </motion.div>

        {/* Liste des formules */}
        <div className="space-y-8 md:space-y-12 max-w-5xl mx-auto">
          {data.packages.map((pkg, index) => (
            <motion.div
              key={`${pkg.name}-${index}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full"
            >
              <PackageCard 
                package={pkg}
                onContactClick={() => handleContactClick(pkg.name)}
                hideStartingFrom={hideStartingFrom}
                buttonColor={buttonColor}
                buttonHoverColor={buttonHoverColor}
                buttonTextColor={buttonTextColor}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePackagesSection;