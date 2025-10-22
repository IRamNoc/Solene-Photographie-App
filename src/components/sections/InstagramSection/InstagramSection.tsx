import { motion } from 'framer-motion';

const InstagramSection: React.FC = () => {
  return (
    <>
      {/* Section Instagram avec galerie */}
      <section className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h3
            className="font-perandory text-3xl text-[#998e79] mb-8 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Suivez-moi sur Instagram
          </motion.h3>
          
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Découvrez mes dernières créations et l'envers du décor
          </motion.p>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-pink-200 to-purple-300 rounded-lg">
                {/* Placeholder pour photos Instagram */}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Instagram avec lien */}
      <section className="w-full bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h3
            className="font-perandory text-2xl text-[#998e79] mb-12 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Retrouvez-moi sur Instagram @solene.photographie
          </motion.h3>
        </div>
      </section>
    </>
  );
};

export default InstagramSection;