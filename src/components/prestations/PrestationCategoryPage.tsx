import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ServicePackagesSection, { ServicePackagesData } from './ServicePackagesSection';
import FAQSection from './FAQSection';
import { FAQItem } from '../../data/faqData';

interface PrestationCategoryPageProps {
  title: string;
  color: string;
  textColor: string;
  data: ServicePackagesData;
  showDescription?: boolean;
  descriptionComponent?: React.ReactNode;
  hideStartingFrom?: boolean;
  faqData?: FAQItem[];
}

// Services pour le mini-menu
const services = [
  {
    id: 1,
    title: 'MARIAGE',
    color: 'bg-[#f86d6d]',
    textColor: 'text-[#fdd7e0]',
    route: '/prestations/mariage'
  },
  {
    id: 2,
    title: 'SHOOTING',
    color: 'bg-[#ffc3e2]',
    textColor: 'text-[#f86d6d]',
    route: '/prestations/shooting'
  },
  {
    id: 3,
    title: 'FAMILLE',
    color: 'bg-[#aad8e0]',
    textColor: 'text-[#ebf3f7]',
    route: '/prestations/famille'
  },
  {
    id: 4,
    title: 'PROFESSIONNEL',
    color: 'bg-[#fdf6b8]',
    textColor: 'text-[#f1bb45]',
    route: '/prestations/professionnel'
  },
  {
    id: 5,
    title: 'ÉVÉNEMENTIEL',
    color: 'bg-[#f1bb45]',
    textColor: 'text-[#fdf6b8]',
    route: '/prestations/evenementiel'
  },
  {
    id: 6,
    title: 'AUTRES',
    color: 'bg-[#ada133]',
    textColor: 'text-[#fdf6b8]',
    route: '/prestations/autres'
  }
];

const PrestationCategoryPage: React.FC<PrestationCategoryPageProps> = ({
  title,
  color,
  textColor,
  data,
  showDescription = false,
  descriptionComponent,
  hideStartingFrom = false,
  faqData
}) => {
  const navigate = useNavigate();

  const handleContactClick = (packageName: string) => {
    navigate('/contact');
  };

  const handleBackClick = () => {
    navigate('/prestations');
  };

  const handleServiceClick = (route: string, serviceTitle: string) => {
    // Si c'est la page actuelle, scroll vers le haut
    if (serviceTitle === title) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      navigate(route);
    }
  };

  // Fonction pour obtenir les couleurs des boutons selon le service
  const getButtonColors = () => {
    const service = services.find(s => s.title === title);
    if (!service) return { 
      buttonColor: 'bg-[#ada133]', 
      buttonHoverColor: 'hover:bg-[#9a9130]',
      highlightBarColor: 'bg-[#ada133]',
      buttonTextColor: 'text-[#fdf6b8]'
    };
    
    const colorMatch = service.color.match(/bg-\[#([a-fA-F0-9]{6})\]/);
    if (!colorMatch) return { 
      buttonColor: 'bg-[#ada133]', 
      buttonHoverColor: 'hover:bg-[#9a9130]',
      highlightBarColor: 'bg-[#ada133]',
      buttonTextColor: service.textColor
    };
    
    const baseColor = colorMatch[1];
    return {
      buttonColor: `bg-[#${baseColor}]`,
      buttonHoverColor: `hover:bg-[#${baseColor}dd]`,
      highlightBarColor: `bg-[#${baseColor}]`,
      buttonTextColor: service.textColor
    };
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Flèche de retour */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-48 left-4 z-50"
      >
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
        </button>
      </motion.div>



      {/* Section description si fournie */}
      {showDescription && descriptionComponent && (
        <div>
          {descriptionComponent}
        </div>
      )}

      {/* Section des formules */}
      <section className="pt-32 md:pt-40 pb-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <ServicePackagesSection 
            data={data}
            onContactClick={handleContactClick}
            hideStartingFrom={hideStartingFrom}
            {...getButtonColors()}
          />
        </div>
      </section>

      {/* Section FAQ */}
      <div>
        <FAQSection faqData={faqData} />
      </div>

      {/* Mini menu de navigation en bas de page */}
      <section className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 w-full">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.route, service.title)}
              className={`${service.color} ${service.textColor} h-20 flex items-center justify-center cursor-pointer group`}
            >
              <div className="text-center">
                <h4 className="text-base md:text-lg lg:text-xl font-perandory font-normal tracking-wider transition-transform duration-300 group-hover:scale-105">
                  {service.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PrestationCategoryPage;