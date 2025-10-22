import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="flex flex-col">
      {/* 
        ========================================
        SECTION HERO - CONFIGURATION RESPONSIVE INTELLIGENTE
        ========================================
        
        🎯 ZONES DE PADDING FACILEMENT MODIFIABLES :
        
        ZONE 1 - PADDING SECTION GÉNÉRALE :
        - paddingTop: Espace du haut (ligne 21)
        - paddingBottom: Espace du bas (ligne 21) 
        - paddingX: Marges latérales container (ligne 25)
        
        ZONE 2 - PADDING BLOC BLANC (PHOTOGRAPHIE) :
        - padding: Espace interne du cadre blanc (ligne 40)
        
        ZONE 3 - GAP ENTRE LES BLOCS :
        - gap: Espacement entre bloc gauche et droite (ligne 28)
      */}
      <section 
         className="w-full" 
         style={{ 
           backgroundColor: '#f5f3f0', /* FOND BEIGE */
           paddingTop: 'clamp(220px, 25vw, 320px)', /* 🎯 ZONE 1 - PADDING TOP CORRIGÉ DESKTOP (évite masquage menu) */
           paddingBottom: 'clamp(40px, 8vw, 120px)' /* 🎯 ZONE 1 - PADDING BOTTOM RESPONSIVE (réduit mobile) */
         }}
       >
         <div 
           className="max-w-8xl mx-auto"
           style={{
             paddingLeft: 'clamp(20px, 4vw, 64px)', /* 🎯 ZONE 1 - PADDING LATERAL GAUCHE (augmenté mobile) */
             paddingRight: 'clamp(20px, 4vw, 64px)' /* 🎯 ZONE 1 - PADDING LATERAL DROITE (augmenté mobile) */
           }}
         >
           <div 
             className="flex flex-col md:flex-row items-start" 
             style={{
               gap: 'clamp(32px, 6vw, 48px)' /* 🎯 ZONE 3 - GAP RESPONSIVE ENTRE BLOCS (augmenté mobile) */
             }}
           >
             
             {/* 
                ==========================================
                BLOC GAUCHE - DÉFINITIONS (RESPONSIVE)
                ==========================================
              */}
              <div 
                className="flex-shrink-0 bg-white rounded-lg shadow-sm w-full md:w-[65%]"
                style={{
                  padding: 'clamp(20px, 5vw, 48px)' /* 🎯 ZONE 2 - PADDING INTERNE BLOC BLANC RESPONSIVE (optimisé mobile) */
                }}
              >
              {/* TITRE PRINCIPAL */}
               <div style={{ marginBottom: 'clamp(16px, 3vw, 20px)' /* ESPACE APRÈS TITRE - RESPONSIVE */ }}>
                 <h1 
                   className="font-perandory-normal font-normal text-black tracking-wide mobile-hero-title"
                   style={{
                     fontSize: 'clamp(36px, 9vw, 55px)', /* TAILLE TITRE RESPONSIVE - 36px mobile, 55px desktop (augmenté) */
                     lineHeight: '1.1', /* INTERLIGNE TITRE - Modifiable (1.1=serré, 1.2=normal, 1.3=aéré) */
                     marginBottom: '8px', /* ESPACE SOUS TITRE - Réduit */
                     textAlign: 'left' /* ALIGNEMENT TITRE - Modifiable (left/center/right) */
                   }}
                 >
                   PHOTOGRAPHIE,
                 </h1>
                 <p 
                   className="font-perandory-normal italic text-black uppercase mobile-hero-subtitle"
                   style={{
                     fontSize: 'clamp(14px, 3vw, 16px)', /* TAILLE SOUS-TITRE - RESPONSIVE */
                     marginBottom: 'clamp(12px, 2.5vw, 16px)', /* ESPACE SOUS SOUS-TITRE - RESPONSIVE */
                     textAlign: 'left' /* ALIGNEMENT SOUS-TITRE */
                   }}
                 >
                   nom féminin
                 </p>
               </div>

              {/* DÉFINITIONS ÉTYMOLOGIQUES */}
               <div style={{ marginBottom: 'clamp(24px, 5vw, 32px)' /* ESPACE APRÈS DÉFINITIONS - RESPONSIVE */ }}>
                 <p 
                   className="font-playfair text-black"
                   style={{
                     fontSize: 'clamp(12px, 2.8vw, 13.1px)', /* TAILLE DÉFINITIONS - RESPONSIVE */
                     lineHeight: '1.6', /* INTERLIGNE DÉFINITIONS - Modifiable */
                     marginBottom: 'clamp(10px, 2vw, 12px)', /* ESPACE ENTRE DÉFINITIONS - RESPONSIVE */
                     textAlign: 'left' /* ALIGNEMENT DÉFINITIONS */
                   }}
                 >
                   <span className="font-perandory-normal font-medium uppercase">Photo</span>, <span className="italic">φωτός</span> : lumière, clarté. « qui procède de la lumière »
                 </p>
                 <p 
                   className="font-playfair text-black"
                   style={{
                     fontSize: 'clamp(12px, 2.8vw, 13.1px)', /* TAILLE DÉFINITIONS - RESPONSIVE */
                     lineHeight: '1.6', /* INTERLIGNE DÉFINITIONS */
                     textAlign: 'left' /* ALIGNEMENT DÉFINITIONS */
                   }}
                 >
                   <span className="font-perandory-normal font-medium uppercase">graphie</span>, <span className="italic">γραφειν</span> : peindre, dessiner, écrire « qui écrit », « qui aboutit à une image ».
                 </p>
               </div>

              {/* CITATIONS NUMÉROTÉES */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 3vw, 16px)' /* ESPACE ENTRE CITATIONS - RESPONSIVE */ }}>
                 {/* Citation I - Alignée à droite */}
                 <div>
                   <p 
                     className="font-playfair text-black italic mobile-hero-citations"
                     style={{
                       fontSize: 'clamp(16px, 4vw, 18.6px)', /* TAILLE CITATIONS - RESPONSIVE */
                       lineHeight: '1.5', /* INTERLIGNE CITATIONS - Modifiable */
                       textAlign: 'right' /* ALIGNEMENT CITATION I - Toutes à droite comme demandé */
                     }}
                   >
                     <span className="font-medium not-italic">I.</span> L'art de suspendre le temps, de figer un souvenir<br />
                     dans l'éternité pour le chérir après qu'il ait disparu.
                   </p>
                 </div>
                 
                 {/* Citation II - Alignée à droite */}
                 <div>
                   <p 
                     className="font-playfair text-black italic mobile-hero-citations"
                     style={{
                       fontSize: 'clamp(16px, 4vw, 18.6px)', /* TAILLE CITATIONS - RESPONSIVE */
                       lineHeight: '1.5', /* INTERLIGNE CITATIONS */
                       textAlign: 'right' /* ALIGNEMENT CITATION II - Changé à droite comme demandé */
                     }}
                   >
                     <span className="font-medium not-italic">II.</span> L'acte de traduire en image ce que l'on voit,<br />
                     mais aussi ce que l'on ressent : émotion, atmosphère, lumière
                   </p>
                 </div>
                 
                 {/* Citation III - Alignée à droite */}
                 <div>
                   <p 
                     className="font-playfair text-black italic mobile-hero-citations"
                     style={{
                       fontSize: 'clamp(16px, 4vw, 18.6px)', /* TAILLE CITATIONS - RESPONSIVE */
                       lineHeight: '1.5', /* INTERLIGNE CITATIONS */
                       textAlign: 'right' /* ALIGNEMENT CITATION III - Reste à droite */
                     }}
                   >
                     <span className="font-medium not-italic">III.</span> L'écriture d'histoires de vie sans mots,<br />
                     à partager et à transmettre
                   </p>
                 </div>
               </div>
            </div>

            {/* 
                ==========================================
                BLOC DROITE - CITATION ET BOUTON (RESPONSIVE)
                ==========================================
              */}
              <div 
                className="flex flex-col justify-end w-full md:w-[35%] mt-8 md:mt-0 pb-10 md:pb-0"
                style={{
                  minHeight: 'clamp(150px, 20vh, 250px)', /* HAUTEUR MINIMALE TRÈS RÉDUITE (zone violette minimale) */
                  paddingTop: 'clamp(5px, 8vw, 80px)' /* 🎯 ZONE 1 - POSITION CORRIGÉE (légèrement au-dessus ligne basse bloc blanc) */
                }}
              >
               <div style={{ 
                 display: 'flex', 
                 flexDirection: 'column', 
                 gap: 'clamp(20px, 4vw, 32px)' /* 🎯 ZONE 3 - ESPACE ENTRE CITATION ET BOUTON RESPONSIVE */
               }}>
                 
                 {/* CITATION PRINCIPALE */}
                 <motion.h2
                   className="font-perandory font-normal text-black"
                   style={{
                     fontSize: 'clamp(32px, 8vw, 55.8px)', /* TAILLE CITATION RESPONSIVE - 32px mobile, 55.8px desktop (augmenté) */
                     lineHeight: '1.2', /* INTERLIGNE CITATION PRINCIPALE - Légèrement aéré pour mobile */
                     textAlign: 'left' /* ALIGNEMENT CITATION PRINCIPALE - Modifiable (left/center/right) */
                   }}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8 }}
                 >
                   "CAPTURER<br />VOS JOURS HEUREUX"
                 </motion.h2>
                 
                 {/* BOUTON CTA */}
                 <motion.div
                   style={{
                     display: 'flex',
                     justifyContent: 'center' /* ALIGNEMENT BOUTON - Modifiable (flex-start=gauche, center=centré, flex-end=droite) */
                   }}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                 >
                   <Link
                     to="/prestations"
                     className="font-perandory text-white rounded-full hover:bg-[#A69550] transition-colors tracking-wide"
                     style={{
                       backgroundColor: '#ada133', /* COULEUR BOUTON - Modifiable */
                       fontSize: 'clamp(20px, 5vw, 32px)', /* TAILLE TEXTE BOUTON RESPONSIVE - 20px mobile, 32px desktop (augmenté) */
                       paddingTop: 'clamp(4px, 1vw, 5px)',
                       paddingBottom: 'clamp(2px, 0.5vw, 0px)',
                       paddingLeft: 'clamp(16px, 3vw, 24px)',
                       paddingRight: 'clamp(16px, 3vw, 24px)' /* PADDING BOUTON ULTRA-FIN - Réduit surtout vertical */
                     }}
                   >
                     DÉCOUVRIR MES PRESTATIONS
                   </Link>
                 </motion.div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 🔴 LIGNE ROUGE DE DÉLIMITATION - FIN DU FOND BEIGE */}
      <div className="w-full h-1 bg-[#ada133] opacity-20"></div>
      
      {/* 🎯 NOUVELLE SECTION - FOND BLANC */}
      <section className="w-full bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Cadre blanc avec contenu */}
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            
            {/* Galerie d'images placeholder */}
            <div className="space-y-6">
              {/* Première ligne - 5 images */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg relative overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-1/3 h-1/4 bg-white rounded-full opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-400 to-green-300 rounded-b-lg"></div>
                  </div>
                ))}
              </motion.div>
              
              {/* Deuxième ligne - 6 images plus petites */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/3] bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg relative overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-1/3 h-1/4 bg-white rounded-full opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-green-400 to-green-300 rounded-b-lg"></div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section À PROPOS */}
      <section className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-perandory text-4xl md:text-5xl text-center text-[#998e79] mb-16 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            À PROPOS
          </motion.h2>
          
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Photographe passionnée basée en région parisienne, je me spécialise dans la photographie de famille, 
              de maternité et de nouveau-nés. Mon approche se concentre sur la capture d'émotions authentiques 
              et de moments précieux qui racontent votre histoire unique.
            </motion.p>
            
            <motion.p
              className="text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Chaque séance est une aventure, une rencontre, un moment suspendu où la magie opère. 
              Je crois profondément que les plus beaux souvenirs naissent dans la spontanéité et la complicité.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section Instagram */}
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

      {/* Section Instagram */}
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

      {/* Footer doré */}
      <footer className="w-full bg-[#B8A55C] py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="space-y-8"
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
            
            <div className="text-center mt-12 pt-8 border-t border-white/20 text-sm">
              <p className="text-white/80">© 2024 Solène Termeau - Photographie de famille. Tous droits réservés.</p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;