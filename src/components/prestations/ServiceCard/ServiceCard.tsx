import { motion } from 'framer-motion';
import { ServiceCardProps } from '../../../types/prestations';
import PackageCard from '../PackageCard';

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <section id={service.id} className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image with Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[21/9] rounded-lg overflow-hidden shadow-lg mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-4xl font-display font-bold mb-2">{service.title}</h2>
              <p className="text-lg opacity-90 max-w-2xl">{service.description}</p>
            </div>
          </motion.div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {service.packages.map((pkg, index) => (
              <PackageCard
                key={pkg.name}
                packageData={pkg}
                isHighlighted={index === Math.floor(service.packages.length / 2)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;