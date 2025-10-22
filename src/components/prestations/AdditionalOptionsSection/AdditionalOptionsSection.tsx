import { motion } from 'framer-motion';
import { AdditionalOptionsSectionProps } from '../../../types/prestations';

const AdditionalOptionsSection = ({ options }: AdditionalOptionsSectionProps) => {
  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display text-black text-center mb-12">
              Options supplémentaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {options.map((option, index) => (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-medium text-black mb-2">{option.name}</h3>
                  <p className="text-lg font-semibold text-black">{option.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalOptionsSection;