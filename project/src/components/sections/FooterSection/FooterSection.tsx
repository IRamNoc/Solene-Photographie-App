import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BrochureModal from '../../modals/BrochureModal';

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  
  return (
    <>
      {/* Section Instagram en haut */}
      <motion.section 
        className="bg-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-perandory text-2xl md:text-3xl text-black mb-4 tracking-wider">
              RETROUVEZ MON TRAVAIL SUR INSTAGRAM
            </h2>
            <a 
              href="https://www.instagram.com/solenetrm_photographie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-playfair text-lg text-black/70 hover:text-black transition-colors"
            >
              @solenetrm_photographie
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer principal */}
      <motion.footer 
        className="bg-[#ada133] text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Section principale du footer */}
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            
            {/* Colonne gauche - Navigation */}
            <motion.div 
              className="flex flex-col justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <nav className="space-y-3 text-center">
                <Link 
                  to="/gallery" 
                  className="block font-perandory text-2xl lg:text-3xl hover:text-white/80 transition-colors tracking-wider"
                >
                  GALERIES
                </Link>
                <Link 
                  to="/contact" 
                  className="block font-perandory text-2xl lg:text-3xl hover:text-white/80 transition-colors tracking-wider"
                >
                  PREMIER CONTACT
                </Link>
              </nav>
            </motion.div>

            {/* Colonne centre - Logo */}
            <motion.div 
              className="flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <img 
                  src="/images/SolenesansFond.png" 
                  alt="Solène Termeau Photographie" 
                  className="w-96 h-72 object-contain"
                />
              </div>
            </motion.div>

            {/* Colonne droite - Call to Action */}
            <motion.div 
              className="flex flex-col justify-center items-center lg:items-end"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="space-y-3">
                <p className="font-perandory text-lg leading-relaxed tracking-wider text-center lg:text-left">
                  VOUS VOULEZ PARTAGER LES OFFRES<br />
                  AVEC VOS PROCHES?
                </p>
                <div className="flex justify-start">
                  <button 
                    onClick={() => setIsBrochureModalOpen(true)} 
                    className="inline-flex items-center gap-2 bg-white text-[#ada133] px-4 py-2 rounded-full font-perandory text-lg hover:bg-gray-100 transition-colors group tracking-wider"
                  >
                    RECEVOIR MA BROCHURE PAR MAIL
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section du bas - Copyright et liens légaux */}
        <div className="border-t border-white/20">
          <div className="container mx-auto px-4 py-2">
            <motion.div 
              className="flex flex-col md:flex-row justify-center items-center gap-3 text-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-white/80 font-playfair">
                © {currentYear} Solène Termeau
              </p>
              
              <div className="flex flex-wrap gap-3 text-white/80">
                <Link 
                  to="/cgv" 
                  className="font-playfair hover:text-white transition-colors"
                >
                  Conditions générales de vente
                </Link>
                <Link 
                  to="/legal/mentions" 
                  className="font-playfair hover:text-white transition-colors"
                >
                  Mentions légales
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.footer>

      {/* Popup Brochure */}
      <BrochureModal 
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />
    </>
  );
};

export default FooterSection;