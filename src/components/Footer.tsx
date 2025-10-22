import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';
import BrochureModal from './modals/BrochureModal';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  
  return (
    <>
      <footer className="py-8 md:py-4 bg-[#ada133] text-white">
        <div className="container mx-auto px-4">
          {/* Layout MOBILE UNIQUEMENT */}
          <div className="block md:hidden">
            {/* 1. Section brochure EN HAUT sur mobile */}
            <div className="text-center mb-8">
              <h3 className="font-perandory text-lg mb-4 leading-tight">
                VOUS VOULEZ PARTAGER MES OFFRES<br />
                AVEC VOS PROCHES ?
              </h3>
              <button
                onClick={() => setIsBrochureModalOpen(true)}
                className="bg-white text-[#ada133] px-6 py-2 rounded-full font-perandory text-sm hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                RECEVOIR LA BROCHURE PAR MAIL →
              </button>
            </div>

            {/* 2. Logo AU CENTRE sur mobile */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <div className="w-20 h-32 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="font-perandory text-white text-3xl">S.T</span>
                </div>
              </Link>
            </div>

            {/* 3. Navigation EN BAS sur mobile */}
            <div className="text-center mb-8">
              <nav className="space-y-2">
                <div>
                  <Link to="/galeries" className="block font-perandory text-white hover:text-gray-200 transition-colors text-sm">
                    GALERIES
                  </Link>
                </div>
                <div>
                  <Link to="/contact" className="block font-perandory text-white hover:text-gray-200 transition-colors text-sm">
                    PREMIER CONTACT
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Layout DESKTOP UNIQUEMENT */}
          <div className="hidden md:flex md:justify-between md:items-center">
            {/* Section brochure à gauche sur desktop */}
            <div className="text-left mb-4">
              <h3 className="font-perandory text-xl mb-2 leading-tight">
                VOUS VOULEZ PARTAGER MES OFFRES<br />
                AVEC VOS PROCHES ?
              </h3>
              <button
                onClick={() => setIsBrochureModalOpen(true)}
                className="bg-white text-[#ada133] px-6 py-2 rounded-full font-perandory text-base hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                RECEVOIR LA BROCHURE PAR MAIL →
              </button>
            </div>

            {/* Logo au centre sur desktop */}
            <div className="text-center mb-4">
              <Link to="/" className="inline-block">
                <div className="w-16 h-28 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="font-perandory text-white text-2xl">S.T</span>
                </div>
              </Link>
            </div>

            {/* Navigation à droite sur desktop */}
            <div className="text-right mb-4">
              <nav className="space-y-1">
                <div>
                  <Link to="/galeries" className="block font-perandory text-white hover:text-gray-200 transition-colors text-base">
                    GALERIES
                  </Link>
                </div>
                <div>
                  <Link to="/contact" className="block font-perandory text-white hover:text-gray-200 transition-colors text-base">
                    PREMIER CONTACT
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Réseaux sociaux - Cachés sur mobile, visibles sur desktop */}
          <div className="hidden md:flex justify-center space-x-6 mt-6">
            <a 
              href="https://www.instagram.com/solenetrm_photographie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="mailto:solenetrm.photographie@gmail.com" 
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center mt-8 md:mt-6 pt-4 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm space-y-2 md:space-y-0">
              <p className="text-white/80">
                © {currentYear} Solène Termeau
              </p>
              <div className="flex space-x-4">
                <Link to="/mentions-legales" className="text-white/80 hover:text-white transition-colors">
                  Conditions générales de vente
                </Link>
                <Link to="/mentions-legales" className="text-white/80 hover:text-white transition-colors">
                  Statut
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de brochure */}
      <BrochureModal 
        isOpen={isBrochureModalOpen} 
        onClose={() => setIsBrochureModalOpen(false)} 
      />
    </>
  );
};

export default Footer;