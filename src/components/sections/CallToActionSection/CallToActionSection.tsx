import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToActionSection: React.FC = () => {
  return (
    <footer className="w-full bg-[#B8A55C] py-8">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="font-perandory text-2xl text-white tracking-wider">
            Prête à capturer vos moments précieux ?
          </h4>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-[#B8A55C] px-8 py-3 rounded-full font-perandory hover:bg-gray-100 transition-colors"
            >
              Contactez-moi
            </Link>
            <Link
              to="/prestations"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-perandory hover:bg-white hover:text-[#B8A55C] transition-colors"
            >
              Voir mes prestations
            </Link>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-white/20 text-sm">
            <p className="text-white/80">© 2024 Solène Termeau - Photographie de famille. Tous droits réservés.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default CallToActionSection;