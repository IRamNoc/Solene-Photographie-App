import { motion } from 'framer-motion';
import { ServicesNavigationProps } from '../../../types/prestations';

const ServicesNavigationMenu = ({ services, activeSection, onSectionClick }: ServicesNavigationProps) => {
  return (
    <div className="sticky top-32 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => onSectionClick(service.id)}
                className={`group relative py-6 px-4 transition-colors ${
                  activeSection === service.id
                    ? 'bg-primary text-black'
                    : 'hover:bg-primary/20'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <IconComponent className={`w-6 h-6 ${
                    activeSection === service.id
                      ? 'text-black'
                      : 'text-gray-600 group-hover:text-black'
                  }`} />
                  <span className={`text-sm font-medium ${
                    activeSection === service.id
                      ? 'text-black'
                      : 'text-gray-600 group-hover:text-black'
                  }`}>
                    {service.title}
                  </span>
                </div>
                {activeSection === service.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesNavigationMenu;