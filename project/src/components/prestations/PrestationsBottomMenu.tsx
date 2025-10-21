import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  color: string;
  textColor: string;
}

interface PrestationsBottomMenuProps {
  services: Service[];
}

const PrestationsBottomMenu: React.FC<PrestationsBottomMenuProps> = ({ services }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuState, setMenuState] = useState<'hidden' | 'floating' | 'docked'>('hidden');

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          // Afficher le menu quand on a scrollé assez pour ne plus voir le grand menu (environ 400px)
          const shouldShowMenu = scrollY > 400;
          setIsVisible(shouldShowMenu);
          
          if (!shouldShowMenu) {
            setMenuState('hidden');
            ticking = false;
            return;
          }
          
          // Chercher la section Instagram par son texte caractéristique
          const instagramSection = Array.from(document.querySelectorAll('h2, h3')).find(
            el => el.textContent?.includes('RETROUVEZ MON TRAVAIL SUR INSTAGRAM')
          )?.closest('section');
          
          if (instagramSection) {
            const instagramRect = instagramSection.getBoundingClientRect();
            // Seuil de 100px pour éviter les tremblements
            const threshold = 100;
            
            if (instagramRect.top <= windowHeight - threshold) {
              setMenuState('docked');
            } else {
              setMenuState('floating');
            }
          } else {
            // Fallback: détecter le footer principal
            const footerElement = document.querySelector('footer');
            if (footerElement) {
              const footerRect = footerElement.getBoundingClientRect();
              const threshold = 100;
              
              if (footerRect.top <= windowHeight - threshold) {
                setMenuState('docked');
              } else {
                setMenuState('floating');
              }
            } else {
              setMenuState('floating');
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  const MenuComponent = ({ state }: { state: 'floating' | 'docked' }) => (
    <motion.div
      className="w-full"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="shadow-2xl">
        <div className="w-full">
          <div className="flex overflow-x-auto">
            {services.map((service, index) => (
              <motion.button
                 key={service.id}
                 onClick={() => scrollToSection(getSectionId(service.title))}
                 className={`${service.color} ${service.textColor} h-20 flex-1 min-w-0 flex items-center justify-center group relative overflow-hidden`}
               >
                 <div className="text-center z-10 relative px-3">
                   <span className="text-lg md:text-xl lg:text-2xl font-perandory font-normal tracking-wide whitespace-nowrap group-hover:text-xl group-hover:md:text-2xl group-hover:lg:text-3xl transition-all duration-200">
                     {service.title}
                   </span>
                 </div>
               </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isVisible && menuState !== 'hidden' && (
        <motion.div
          className={`fixed left-0 right-0 z-50 ${
            menuState === 'floating' ? 'bottom-0' : ''
          }`}
          style={{
            bottom: menuState === 'docked' ? '100px' : '0px'
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            duration: 0.4, 
            ease: 'easeOut',
            bottom: { duration: 0.6, ease: 'easeInOut' }
          }}
        >
          <MenuComponent state={menuState} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrestationsBottomMenu;