import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GiftCardPreview from './GiftCardPreview';

const Hero = () => {
  const services = [
    {
      id: 'engagement',
      title: 'ENGAGEMENT',
      color: '#ff8c22',
      hoverColor: '#fff27e',
      link: '/prestations#engagement'
    },
    {
      id: 'mariage',
      title: 'MARIAGE',
      color: '#f15c5c',
      hoverColor: '#ffc3e2',
      link: '/prestations#mariage'
    },
    {
      id: 'famille',
      title: 'FAMILLE',
      color: '#fff27e',
      hoverColor: '#abcf5a',
      link: '/prestations#famille'
    },
    {
      id: 'maternite',
      title: 'MATERNITÉ',
      color: '#ffc3e2',
      hoverColor: '#f15c5c',
      link: '/prestations#maternite'
    },
    {
      id: 'naissance',
      title: 'NAISSANCE',
      color: '#97d5e6',
      hoverColor: '#ebf3f7',
      link: '/prestations#naissance'
    },
    {
      id: 'autres',
      title: 'AUTRES',
      color: '#abcf5a',
      hoverColor: '#fff27e',
      link: '/prestations#autres'
    }
  ];

  const galleryRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!galleryRef.current) return;
    const scrollAmount = galleryRef.current.clientWidth;
    galleryRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full font-perandory mt-[150px]">
        <div className="grid grid-cols-12 min-h-screen">
          {/* Colonne gauche */}
          <div className="col-span-5 flex flex-col">
            <div className="aspect-square bg-[#ff5f5f] flex items-center justify-center">
              <div className="w-[80%] aspect-square bg-[#ff96bf] rounded-full flex items-center justify-center">
                <h1 className="text-[#ff5f5f] text-2xl md:text-4xl lg:text-5xl text-center leading-tight tracking-wider">
                  "CAPTURER<br />VOS JOURS HEUREUX"
                </h1>
              </div>
            </div>

            <div className="bg-[#ff8c22] flex-1 flex items-center justify-center">
              <Link to="/prestations" className="text-[#fff27e] text-2xl md:text-3xl lg:text-4xl text-center leading-tight tracking-wider group">
                <div>
                  <p>DÉCOUVRIR</p>
                  <p>LES PRESTATIONS <span className="inline-block group-hover:translate-x-1 transition-transform">→</span></p>
                </div>
              </Link>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="col-span-7 flex flex-col">
            <div className="flex h-1/2 min-h-[50%]">
              <div className="w-1/2 relative">
                <img
                  src="/images/IMG_2111.JPG"
                  alt="Nuages"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="w-1/2 bg-[#fff27e] flex items-center justify-center">
                <span className="text-[#abcf5a] text-6xl md:text-8xl lg:text-9xl opacity-20">ST.</span>
              </div>
            </div>

            <div className="h-[60px] bg-[#abcf5a] w-full" />

            <div className="flex-1 bg-[#97d5e6] flex items-center justify-between px-6 py-8 gap-6">
              <Link to="/gallery" className="text-white text-2xl md:text-3xl lg:text-4xl text-left leading-tight tracking-wide group">
                <div>
                  <p>VISITER</p>
                  <p>LA GALERIE <span className="inline-block group-hover:translate-x-1 transition-transform">→</span></p>
                </div>
              </Link>

              <div className="relative w-28 h-44 md:w-32 md:h-48 rounded-md overflow-hidden shadow-lg">
                <img
                  src="/images/IMG_2111.JPG"
                  alt="Miniature"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                  <span className="text-[#ff96bf] text-sm">♥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">

            {/* Titre */}
            <motion.h2
              className="font-perandory text-5xl md:text-7xl text-[#998e79] mb-10 md:mb-14 tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              PHOTOGRAPHIE,
            </motion.h2>

            {/* Définition */}
            <div className="space-y-6 text-[#998e79] text-lg md:text-xl leading-relaxed">
              <motion.p
                className="font-perandory italic text-xl md:text-2xl tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                nom féminin
              </motion.p>
              <motion.p
                className="text-lg md:text-xl tracking-wide leading-snug"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="font-perandory uppercase">Photo</span> φωτός : lumière, clarté. « qui procède de la lumière »
              </motion.p>
              <motion.p
                className="text-lg md:text-xl tracking-wide leading-snug"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="font-perandory uppercase">Graphie</span> γραφειν : peindre, dessiner, écrire. « qui écrit », « qui aboutit à une image »
              </motion.p>
            </div>

            {/* Bloc Définition avec Numéros */}
            <div className="space-y-10 md:space-y-14 mt-16 md:mt-20">

              {/* Bloc 1 */}
              <motion.div
                className="flex items-center justify-center md:justify-start text-left"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#ff96bf] flex items-center justify-center text-white font-medium text-lg mr-6 md:mr-10">
                  1.
                </div>
                <p className="text-lg md:text-2xl text-[#998e79] tracking-widest leading-relaxed max-w-3xl">
                  L’art de suspendre le temps, de figer un <span className="text-[#ff96bf]">souvenir</span> dans l’éternité pour le chérir bien après qu’il ait disparu.
                </p>
              </motion.div>

              {/* Bloc 2 */}
              <motion.div
                className="flex items-center justify-center md:justify-start text-left"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#abcf5a] flex items-center justify-center text-white font-medium text-lg mr-6 md:mr-10">
                  2.
                </div>
                <p className="text-lg md:text-2xl text-[#998e79] tracking-widest leading-relaxed max-w-3xl">
                  L’acte de traduire en image non seulement ce que l’on voit, mais ce que l’on ressent : une <span className="text-[#97d5e6]">émotion</span>, une <span className="text-[#abcf5a]">atmosphère</span>, une <span className="text-[#fff27e]">lumière</span>.
                </p>
              </motion.div>

              {/* Bloc 3 */}
              <motion.div
                className="flex items-center justify-center md:justify-start text-left"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#ff5f5f] flex items-center justify-center text-white font-medium text-lg mr-6 md:mr-10">
                  3.
                </div>
                <p className="text-lg md:text-2xl text-[#998e79] tracking-widest leading-relaxed max-w-3xl">
                  L’écriture<span className="text-[#ff5f5f]"> de petites et grandes histoires de vie</span>, sans l’usage des mots, à partager et à transmettre.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="w-screen px-0 mx-0">
          <motion.h2
            className="text-center font-perandory text-4xl md:text-5xl text-[#998e79] mb-12 md:mb-16 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            LES PRESTATIONS
          </motion.h2>

          {/* Grid : Colle aux bords de l'écran mais garde un espacement interne */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full">
            {services.map((service, index) => (
              <Link
                key={service.id}
                to={service.link}
                className="block w-full group relative overflow-hidden"
              >
                <motion.div
                  className="w-full h-[350px] sm:h-[400px] lg:h-[450px] flex items-center justify-center relative transition-all duration-300"
                  style={{ backgroundColor: service.color }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Texte avec soulignement animé */}
                  <h3
                    className="font-perandory text-5xl md:text-6xl tracking-wider transition-colors relative inline-block"
                    style={{ color: service.hoverColor }}
                  >
                    {service.title}
                    {/* Barre animée sous le texte */}
                    <motion.div
                      className="absolute left-0 bottom-0 h-1 w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                      style={{ backgroundColor: service.hoverColor }}
                    />
                  </h3>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/prestations"
              className="inline-block bg-[#ffc3e2] text-white font-perandory text-2xl px-10 py-3 rounded-full hover:bg-[#ff5f5f] transition-colors"
            >
              EN VOIR PLUS
            </Link>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-perandory text-4xl text-[#998e79] mb-8">À PROPOS</h2>
              <div className="space-y-6 text-[#998e79] tracking-wider">
                <p>
                  LOREM IPSUM DOLOR SIT AMET, EST VITAE POSSIMUS UT VOLUPTATEM VOLUPTAS SIT DIGNISSIMOS LABORIOSAM QUI NULLA REPUDIANDAE NON IPSA QUAE ET PORRO FUGIT EUM NEMO PARIATUR.
                </p>
                <p>
                  ET LABORUM IMPEDIT SIT LAUDANTIUM MAXIME AUT DOLORIBUS FACILIS AUT POSSIMUS NIHIL ET CONSEQUATUR INTERNOS. AD DOLOR LABORUM ET CONSEQUATUR QUIA AUT QUAM MAGNAM REM ASPERNATUR DIGNISSIMOS UT NIHIL.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-[#97d5e6] rounded-full">
                  <div className="absolute w-24 h-16 bg-white rounded-[100%] top-1/4 left-1/4" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#abcf5a] rounded-b-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-[#97d5e6]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            className="text-center font-perandory text-4xl md:text-5xl text-white mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            VISITER LA GALERIE
          </motion.h2>

          <div className="relative">
            <div
              ref={galleryRef}
              className="flex gap-6 md:gap-8 overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory"
            >
              {['JUIN 2025', 'A&E - JUILLET 2025', 'T&J - JUIN 2025', 'ALMA - JUIN 2025'].map((date, index) => (
                <motion.div
                  key={date}
                  className="flex-none w-60 md:w-72 snap-center"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="aspect-square rounded-full bg-white/90 flex flex-col overflow-hidden">
                    <div className="h-2/3 bg-[#97d5e6] relative">
                      <div className="absolute w-12 md:w-16 h-8 md:h-10 bg-white rounded-[100%] top-1/4 left-1/4" />
                    </div>
                    <div className="h-1/3 bg-[#abcf5a]" />
                    <div className="absolute bottom-0 w-full text-center py-4 text-white text-sm md:text-base">
                      {date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 md:mt-12">
            <Link
              to="/gallery"
              className="bg-white text-[#97d5e6] px-12 md:px-16 py-3 md:py-4 rounded-full font-perandory text-lg md:text-xl hover:bg-opacity-90 transition-colors"
            >
              EN VOIR PLUS
            </Link>
          </div>
        </div>
      </section>

      {/* Gift Card Section */}
      <GiftCardPreview />

      {/* Shop Section */}
      <section className="py-16 md:py-24 bg-[#abcf5a]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            className="text-center font-perandory text-4xl md:text-5xl text-white mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            VISITER LA BOUTIQUE
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-full bg-white/90 flex flex-col overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="h-2/3 bg-[#97d5e6] relative">
                  <div className="absolute w-12 md:w-16 h-8 md:h-10 bg-white rounded-[100%] top-1/4 left-1/4" />
                </div>
                <div className="h-1/3 bg-[#abcf5a]" />
                <div className="absolute bottom-0 w-full text-center py-4 text-[#998e79] text-lg md:text-xl">
                  TITRE
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 md:mt-12">
            <Link
              to="/boutique"
              className="bg-[#ff8c22] text-white px-12 md:px-16 py-3 md:py-4 rounded-full font-perandory text-lg md:text-xl hover:bg-opacity-90 transition-colors"
            >
              EN VOIR PLUS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;