import React from 'react';
import { motion } from 'framer-motion';

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
              <img
                src="/images/profile/pp.png"
                alt="Portrait de Solène"
                className="w-64 h-80 object-cover rounded-lg shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='320' viewBox='0 0 256 320'%3E%3Crect width='256' height='320' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3EPhoto de profil%3C/text%3E%3C/svg%3E";
                }}
              />
            </motion.div>

            {/* Bloc About mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="font-perandory text-3xl font-bold text-black mb-6 tracking-wide text-center">
                À PROPOS
              </h2>
              
              <div className="space-y-4 font-playfair text-black text-sm leading-relaxed text-center">
                <p>
                  Je photographie comme on écrit dans un journal intime :<br />
                  pour garder une trace,<br />
                  pour sublimer le quotidien,<br />
                  pour dire à ceux qui voudront bien l'entendre :<br />
                  "regarde comme c'est beau, la vie".
                </p>
                
                <p>
                  Je suis fascinée par les images qui racontent des histoires.<br />
                  Celles qui émeuvent sans un mot,<br />
                  celles qui ouvrent une porte,<br />
                  vers un ailleurs, un avant,<br />
                  un souvenir que l'on croyait oublié.
                </p>
                
                <p>
                  J'aime aussi celles qui réconfortent, qui apaisent, qui éclairent.<br />
                  Celles qu'on accroche sur nos murs car elles nous font du bien.<br />
                  Celles qu'on transmet plus tard pour raconter d'où l'on vient.
                </p>
                
                <p>
                  Je ne crois pas qu'il faille chercher la perfection,<br />
                  mais le frisson.<br />
                  Le petit battement de cœur quand la lumière tombe juste,<br />
                  quand un regard dit tout,<br />
                  quand un instant devient éternité sans qu'on sache trop pourquoi.
                </p>
                
                <p>
                  Photographier pour moi, c'est surtout un acte d'amour.<br />
                  Pour les gens, pour leur histoires,<br />
                  pour le réel un peu bancal mais profondément beau.<br />
                  C'est une façon de dire :
                </p>
                
                <p className="italic text-center text-lg mt-6 text-black">
                  "Tu es là, tu comptes, et c'est précieux".
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
              <img
                src="/images/profile/pp.png"
                alt="Portrait de Solène"
                className="w-80 h-96 object-cover rounded-lg shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='384' viewBox='0 0 320 384'%3E%3Crect width='320' height='384' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3EPhoto de profil%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </motion.div>

          {/* Bloc About - décalé vers la droite avec padding à gauche */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 md:p-12 pl-24 md:pl-32 ml-64 relative z-0"
            style={{ marginLeft: '16rem' }}
          >
            <h2 className="font-perandory text-4xl md:text-5xl font-bold text-black mb-8 tracking-wide">
              À PROPOS
            </h2>
            
            <div className="space-y-4 font-playfair text-black text-base leading-relaxed">
              <p>
                Je photographie comme on écrit dans un journal intime :<br />
                pour garder une trace,<br />
                pour sublimer le quotidien,<br />
                pour dire à ceux qui voudront bien l'entendre :<br />
                "regarde comme c'est beau, la vie".
              </p>
              
              <p>
                Je suis fascinée par les images qui racontent des histoires.<br />
                Celles qui émeuvent sans un mot,<br />
                celles qui ouvrent une porte,<br />
                vers un ailleurs, un avant,<br />
                un souvenir que l'on croyait oublié.
              </p>
              
              <p>
                J'aime aussi celles qui réconfortent, qui apaisent, qui éclairent.<br />
                Celles qu'on accroche sur nos murs car elles nous font du bien.<br />
                Celles qu'on transmet plus tard pour raconter d'où l'on vient.
              </p>
              
              <p>
                Je ne crois pas qu'il faille chercher la perfection,<br />
                mais le frisson.<br />
                Le petit battement de cœur quand la lumière tombe juste,<br />
                quand un regard dit tout,<br />
                quand un instant devient éternité sans qu'on sache trop pourquoi.
              </p>
              
              <p>
                Photographier pour moi, c'est surtout un acte d'amour.<br />
                Pour les gens, pour leur histoires,<br />
                pour le réel un peu bancal mais profondément beau.<br />
                C'est une façon de dire :
              </p>
              
              <p className="italic text-center text-xl mt-8 text-black">
                "Tu es là, tu comptes, et c'est précieux".
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;