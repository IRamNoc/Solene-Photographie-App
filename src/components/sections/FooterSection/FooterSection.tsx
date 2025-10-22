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
      {/* Section Instagram en haut - Visible sur tous les écrans avec taille réduite sur mobile */}
      <motion.section 
        className="bg-white py-6 lg:py-12"
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
            <h2 className="font-perandory text-base lg:text-xl xl:text-2xl text-black mb-2 lg:mb-4 tracking-wider">
              RETROUVEZ MON TRAVAIL SUR INSTAGRAM
            </h2>
            <a 
              href="https://www.instagram.com/solenetrm_photographie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-playfair text-xs lg:text-base text-black/70 hover:text-black transition-colors"
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
        <div className="container mx-auto px-4 py-4 lg:py-2">
          
          {/* Layout MOBILE - Ordre spécifique avec espacements réduits */}
          <div className="block lg:hidden">
            {/* 1. Brochure EN HAUT sur mobile avec padding ajouté */}
            <motion.div 
              className="flex flex-col justify-center items-center mb-2 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="space-y-2 text-center">
                <p className="font-perandory text-sm leading-tight tracking-wider">
                  VOUS VOULEZ PARTAGER LES OFFRES<br />
                  AVEC VOS PROCHES?
                </p>
                <button 
                  onClick={() => setIsBrochureModalOpen(true)} 
                  className="inline-flex items-center gap-2 bg-white text-[#ada133] px-3 py-1.5 rounded-full font-perandory text-sm hover:bg-gray-100 transition-colors group tracking-wider"
                >
                  RECEVOIR MA BROCHURE PAR MAIL
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* 2. Logo AU CENTRE sur mobile avec espacement réduit */}
            <motion.div 
              className="flex justify-center items-center mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <img 
                  src="/images/SolenesansFond.png" 
                  alt="Solène Termeau Photographie" 
                  className="w-48 h-36 object-contain"
                />
              </div>
            </motion.div>

            {/* 3. Navigation EN BAS sur mobile avec espacement réduit */}
            <motion.div 
              className="flex flex-col justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <nav className="space-y-2 text-center">
                <Link 
                  to="/gallery" 
                  className="block font-perandory text-lg hover:text-white/80 transition-colors tracking-wider"
                >
                  GALERIES
                </Link>
                <Link 
                  to="/contact" 
                  className="block font-perandory text-lg hover:text-white/80 transition-colors tracking-wider"
                >
                  PREMIER CONTACT
                </Link>
              </nav>
            </motion.div>
          </div>

          {/* Layout DESKTOP - Grille originale */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            
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