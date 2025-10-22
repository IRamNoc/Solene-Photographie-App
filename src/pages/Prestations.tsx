import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MariageDescriptionSection from '../components/prestations/MariageDescriptionSection';
import ServicePackagesSection from '../components/prestations/ServicePackagesSection';
import FAQSection from '../components/prestations/FAQSection';
import PrestationsBottomMenu from '../components/prestations/PrestationsBottomMenu';
import { mariagePackagesData, shootingPackagesData, famillePackagesData, professionnelPackagesData, evenementielPackagesData, autresPackagesData } from '../data/prestationsData';

// Services avec les nouvelles couleurs exactes fournies par l'utilisateur
const services = [
  {
    id: 1,
    title: 'MARIAGE',
    color: 'bg-[#f86d6d]', // Couleur de fond
    textColor: 'text-[#fdd7e0]' // Couleur du texte
  },
  {
    id: 2,
    title: 'SHOOTING',
    color: 'bg-[#ffc3e2]', // Couleur de fond
    textColor: 'text-[#f86d6d]' // Couleur du texte
  },
  {
    id: 3,
    title: 'FAMILLE',
    color: 'bg-[#aad8e0]', // Couleur de fond
    textColor: 'text-[#ebf3f7]' // Couleur du texte
  },
  {
    id: 4,
    title: 'PROFESSIONNEL',
    color: 'bg-[#fdf6b8]', // Couleur de fond
    textColor: 'text-[#f1bb45]' // Couleur du texte
  },
  {
    id: 5,
    title: 'ÉVÉNEMENTIEL',
    color: 'bg-[#f1bb45]', // Couleur de fond
    textColor: 'text-[#fdf6b8]' // Couleur du texte
  },
  {
    id: 6,
    title: 'AUTRES',
    color: 'bg-[#ada133]', // Couleur de fond
    textColor: 'text-[#fdf6b8]' // Couleur du texte
  }
];

const Prestations: React.FC = () => {
  const navigate = useNavigate();

  // Fonction de scroll vers les sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // Hauteur approximative du header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactClick = (packageName: string) => {
    // Redirection vers la page contact
    navigate('/contact');
  };

  // Fonction pour obtenir les couleurs des boutons et de la barre selon la section
  const getButtonColors = (serviceTitle: string) => {
    const service = services.find(s => s.title === serviceTitle);
    if (!service) return { 
      buttonColor: 'bg-[#ada133]', 
      buttonHoverColor: 'hover:bg-[#9a9130]',
      buttonTextColor: 'text-white',
      highlightBarColor: 'bg-[#ada133]'
    };
    
    // Extraction de la couleur hex du bg-[#color]
    const colorMatch = service.color.match(/bg-\[#([a-fA-F0-9]{6})\]/);
    if (!colorMatch) return { 
      buttonColor: 'bg-[#ada133]', 
      buttonHoverColor: 'hover:bg-[#9a9130]',
      buttonTextColor: 'text-white',
      highlightBarColor: 'bg-[#ada133]'
    };
    
    const baseColor = colorMatch[1];
    return {
      buttonColor: `bg-[#${baseColor}]`,
      buttonHoverColor: `hover:bg-[#${baseColor}dd]`, // Ajout d'une légère transparence pour l'effet hover
      buttonTextColor: service.textColor, // Utilisation de la couleur de texte du service
      highlightBarColor: `bg-[#${baseColor}]`
    };
  };

  // Mapping des services vers les IDs des sections
  const getSectionId = (serviceTitle: string) => {
    switch (serviceTitle) {
      case 'MARIAGE':
        return 'mariage-description';
      case 'SHOOTING':
        return 'shooting-section';
      case 'FAMILLE':
        return 'famille-section';
      case 'PROFESSIONNEL':
        return 'professionnel-section';
      case 'ÉVÉNEMENTIEL':
        return 'evenementiel-section';
      case 'AUTRES':
        return 'autres-section';
      default:
        return 'prestations-grid';
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Section Prestations avec espacement optimal */}
      <section 
        id="prestations-grid"
        className="pt-20 md:pt-40 pb-8 px-2 md:px-4 lg:px-6"
      >

        {/* Grille des services - 3 colonnes sur mobile, 2 lignes de 3 colonnes */}
        <div className="w-full mt-16">
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-3 lg:gap-4 max-w-none mx-auto">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => scrollToSection(getSectionId(service.title))}
                className={`${service.color} ${service.textColor} h-28 w-full md:h-72 lg:h-80 flex items-center justify-center cursor-pointer transition-all duration-300 group relative overflow-hidden rounded-none`}
              >
                <div className="text-center z-10 relative">
                  <h3 className="text-sm md:text-4xl lg:text-5xl xl:text-6xl font-perandory font-normal tracking-wider transition-transform duration-300 group-hover:scale-105">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton supprimé car nous sommes déjà sur la page des prestations */}
      </section>

      {/* Section description des prestations mariage */}
      <div id="mariage-description">
        <MariageDescriptionSection />
      </div>
      
      {/* Section des formules mariage */}
      <div id="service-packages">
        <ServicePackagesSection 
          data={mariagePackagesData}
          onContactClick={handleContactClick}
          {...getButtonColors('MARIAGE')}
        />
      </div>
      
      {/* Section SHOOTING */}
      <section id="shooting-section" className="py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <ServicePackagesSection 
            data={shootingPackagesData} 
            onContactClick={handleContactClick}
            {...getButtonColors('SHOOTING')}
          />
        </div>
      </section>

      {/* Section FAMILLE */}
      <section id="famille-section" className="py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <ServicePackagesSection 
            data={famillePackagesData} 
            onContactClick={handleContactClick}
            {...getButtonColors('FAMILLE')}
          />
        </div>
      </section>

      {/* Section PROFESSIONNEL */}
      <section id="professionnel-section" className="py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <ServicePackagesSection 
            data={professionnelPackagesData} 
            onContactClick={handleContactClick}
            {...getButtonColors('PROFESSIONNEL')}
          />
        </div>
      </section>

      {/* Section ÉVÉNEMENTIEL */}
      <section id="evenementiel-section" className="py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <ServicePackagesSection 
            data={evenementielPackagesData} 
            onContactClick={handleContactClick}
            {...getButtonColors('ÉVÉNEMENTIEL')}
          />
        </div>
      </section>

      {/* Section AUTRES */}
      <section id="autres-section" className="py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <ServicePackagesSection 
            data={autresPackagesData} 
            onContactClick={handleContactClick}
            hideStartingFrom={true}
            {...getButtonColors('AUTRES')}
          />
        </div>
      </section>

      {/* Section FAQ */}
      <div id="faq-section">
        <FAQSection />
      </div>
      
      {/* Mini menu de navigation en bas de page */}
      <PrestationsBottomMenu services={services} />
    </div>
  );
};

export default Prestations;

/* 
 * GUIDE DE MODIFICATION DES COULEURS ET STYLES :
 * 
 * 1. COULEURS DES CARTES : Modifiez les valeurs 'color' dans le tableau 'services' (lignes 6-31)
 *    Exemple : bg-[#FF5757] pour changer la couleur de fond
 * 
 * 2. COULEURS DU TEXTE : Modifiez les valeurs 'textColor' dans le tableau 'services'
 *    Exemple : text-white ou text-gray-800
 * 
 * 3. MARGES LATÉRALES : Ligne 44 - px-8 md:px-16 lg:px-24
 *    Augmentez les valeurs pour plus de marge (px-12, px-20, px-32, etc.)
 * 
 * 4. ESPACEMENT ENTRE CARTES : Ligne 58 - gap-4
 *    Changez pour gap-2, gap-6, gap-8 selon vos préférences
 * 
 * 5. HAUTEUR DES CARTES : Ligne 62 - h-48 md:h-56 lg:h-64
 *    Modifiez pour h-40, h-52, h-72, etc.
 * 
 * 6. TAILLE DU TEXTE : Ligne 70 - text-xl md:text-2xl lg:text-3xl
 *    Ajustez selon vos besoins (text-lg, text-4xl, etc.)
 * 
 * 7. STYLE DU BOUTON : Ligne 85 - Modifiez les classes CSS du bouton
 */