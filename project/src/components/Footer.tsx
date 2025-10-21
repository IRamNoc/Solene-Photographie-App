import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-4 bg-primary text-text">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-perandory text-accent text-2xl">ST</span>
              <span className="text-primary-dark">•</span>
            </Link>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://www.instagram.com/solenetrm_photographie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a 
              href="mailto:contact@solenetrm.com" 
              className="text-text hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-text/80">
              © {currentYear} SoleneTrm_Photographie. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/prestations" className="text-text/80 hover:text-accent transition-colors">
              Prestations
            </Link>
            <Link to="/boutique" className="text-text/80 hover:text-accent transition-colors">
              Boutique
            </Link>
            <Link to="/gallery" className="text-text/80 hover:text-accent transition-colors">
              Galeries
            </Link>
            <Link to="/contact" className="text-text/80 hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;