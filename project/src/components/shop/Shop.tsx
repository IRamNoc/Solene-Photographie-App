import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const collections = [
  {
    id: 'montagne',
    title: 'Collection Montagne',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1170&q=80',
    description: 'Découvrez la majesté des sommets enneigés'
  },
  {
    id: 'cieux',
    title: 'Collection Cieux',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1051&q=80',
    description: 'Contemplez la beauté infinie du ciel'
  },
  {
    id: 'french-riviera',
    title: 'Collection French Riviera',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1170&q=80',
    description: 'Laissez-vous transporter sur la côte méditerranéenne'
  }
];

const Shop = () => {
  return (
    <motion.div 
      className="min-h-screen pt-20 bg-white"
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1506259091721-347e791bab0f?auto=format&fit=crop&w=2070&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative text-center text-text">
          <h1 className="text-4xl md:text-5xl font-perandory mb-4">La Boutique</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
            Découvrez mes collections de tirages d'art
          </p>
        </div>
      </section>

      {/* Gift Card Banner */}
      <section className="py-10 bg-primary/30">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/boutique/carte-cadeau" className="block">
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <Heart className="w-8 h-8 text-red-500 mr-4" />
                <h2 className="text-2xl font-perandory text-accent">Carte Cadeau</h2>
              </div>
              <p className="text-text text-center md:text-right">
                Offrez une séance photo à vos proches, <br />
                un cadeau unique et personnalisé.
              </p>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-perandory text-accent mb-12 text-center">Nos Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <Link 
                key={collection.id}
                to={`/boutique/collection/${collection.id}`}
                className="group"
              >
                <motion.div 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={collection.image} 
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-perandory text-accent mb-2">{collection.title}</h3>
                    <p className="text-text">{collection.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Shop;