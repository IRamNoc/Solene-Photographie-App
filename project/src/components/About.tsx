import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      className="min-h-screen pt-48 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=2070&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative text-center text-text">
          <h1 className="text-4xl md:text-5xl font-perandory mb-4">À Propos</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
            Découvrez mon univers photographique
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" 
                alt="Photographe" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-perandory text-accent mb-6">Solène TRM</h2>
              <p className="text-text mb-4">
                Passionnée par la photographie depuis mon plus jeune âge, j'ai développé un style unique qui capture l'authenticité des moments et la beauté naturelle des personnes.
              </p>
              <p className="text-text mb-4">
                Mon approche se concentre sur la lumière naturelle et les émotions sincères, créant ainsi des images intemporelles qui racontent votre histoire.
              </p>
              <p className="text-text">
                Basée en France, je me déplace partout pour immortaliser vos moments les plus précieux, qu'il s'agisse d'un mariage, d'une naissance ou d'un simple instant de bonheur en famille.
              </p>
            </div>
          </div>

          <div className="bg-primary/20 p-8 rounded-lg">
            <h3 className="text-2xl font-perandory text-accent mb-6 text-center">Ma philosophie</h3>
            <div className="space-y-4 text-text">
              <p>
                Je crois que chaque personne, chaque famille et chaque histoire mérite d'être racontée avec authenticité et élégance. Ma mission est de créer des images qui vous ressemblent et qui vous émeuvent, aujourd'hui comme dans 50 ans.
              </p>
              <p>
                La photographie est pour moi bien plus qu'un simple métier, c'est une vocation qui me permet de connecter avec les gens et de préserver leurs souvenirs les plus précieux.
              </p>
              <p>
                Chaque séance est une nouvelle aventure, une nouvelle histoire à raconter. Je m'adapte à votre personnalité et à vos envies pour créer des images uniques qui vous ressemblent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;