import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../../OptimizedImage';

const AboutSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Layout mobile - version verticale */}
        <div className="block md:hidden">
          <div className="max-w-md mx-auto">
            {/* Photo de profil centrée sur mobile */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <OptimizedImage
                src="/images/profile/pp.png"
                alt="Portrait de Solène"
                className="w-64 h-80 shadow-2xl"
                quality="medium"
                lazy={true}
              />
            </motion.div>

            {/* Bloc About mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white shadow-lg p-6 mobile-about-container"
            >
              <h2 className="font-perandory text-3xl font-bold text-black mb-6 tracking-wide text-center mobile-about-title">
                À PROPOS
              </h2>
              
              <div className="space-y-4 font-playfair text-black text-sm leading-relaxed text-center mobile-about-text">
                <p>
                  Je photographie pour me souvenir.<br />
                  Des visages, des lumières, des saisons qui passent.<br />
                  De ce qu'on ne dit pas toujours, mais qu'on ressent fort.
                </p>
                
                <p>
                  J'aime les moments qui ne se tiennent pas droits,<br />
                  les âges qui se frôlent,<br />
                  les gestes pleins d'amour maladroit.
                </p>
                
                <p>
                  Il y a, dans la vie, des fragments de beauté qui se cachent dans les plis du quotidien.<br />
                  Un reflet sur une vitre, un rire un peu trop fort, un silence entre deux phrases.<br />
                  C'est là que je pose mon regard.
                </p>
                
                <p>
                  Photographier, pour moi, c'est un peu écrire sans mots.<br />
                  C'est garder une trace,<br />
                  dire merci,<br />
                  et apprendre à aimer ce qui passe.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Layout desktop - version originale avec chevauchement */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Photo de profil - positionnée pour chevaucher */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute left-0 top-0 z-10"
            style={{ transform: 'translate(-2rem, 2rem)' }}
          >
            <div className="relative">
              <OptimizedImage
                src="/images/profile/pp.png"
                alt="Portrait de Solène"
                className="w-80 h-96 shadow-2xl"
                quality="medium"
                lazy={true}
              />
            </div>
          </motion.div>

          {/* Bloc About - décalé vers la droite avec padding à gauche */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white shadow-lg p-8 md:p-12 pl-24 md:pl-32 ml-64 relative z-0"
            style={{ marginLeft: '16rem' }}
          >
            <h2 className="font-perandory text-4xl md:text-5xl font-bold text-black mb-8 tracking-wide mobile-about-title">
              À PROPOS
            </h2>
            
            <div className="space-y-4 font-playfair text-black text-base leading-relaxed mobile-about-text">
              <p>
                Je photographie pour me souvenir.<br />
                Des visages, des lumières, des saisons qui passent.<br />
                De ce qu'on ne dit pas toujours, mais qu'on ressent fort.
              </p>
              
              <p>
                J'aime les moments qui ne se tiennent pas droits,<br />
                les âges qui se frôlent,<br />
                les gestes pleins d'amour maladroit.
              </p>
              
              <p>
                Il y a, dans la vie, des fragments de beauté qui se cachent dans les plis du quotidien.<br />
                Un reflet sur une vitre, un rire un peu trop fort, un silence entre deux phrases.<br />
                C'est là que je pose mon regard.
              </p>
              
              <p>
                Photographier, pour moi, c'est un peu écrire sans mots.<br />
                C'est garder une trace,<br />
                dire merci,<br />
                et apprendre à aimer ce qui passe.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;