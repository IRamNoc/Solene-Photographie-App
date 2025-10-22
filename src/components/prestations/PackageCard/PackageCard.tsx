import { motion } from 'framer-motion';
import { PackageCardProps } from '../../../types/prestations';

const PackageCard = ({ packageData: pkg, isHighlighted = false }: PackageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 ${
        isHighlighted ? 'ring-2 ring-accent border-accent' : 'border border-gray-200'
      }`}
    >
      <div className="text-center mb-4">
        <h3 className={`text-xl font-semibold mb-2 ${
          isHighlighted ? 'text-black' : 'text-black'
        }`}>
          {pkg.name}
        </h3>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-2xl font-bold text-black">{pkg.price}</span>
          {pkg.duration && (
            <span className="text-sm text-gray-600">({pkg.duration})</span>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {pkg.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
            <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
      
      {isHighlighted && (
        <div className="mt-4 text-center">
          <span className="inline-block bg-accent text-white text-xs px-3 py-1 rounded-full font-medium">
            Recommandé
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default PackageCard;