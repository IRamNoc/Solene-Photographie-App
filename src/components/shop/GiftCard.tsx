import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react';

const GiftCard = () => {
  const [amount, setAmount] = useState<number>(100);
  const [isAdding, setIsAdding] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 100 && value <= 150) {
      setAmount(value);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      // Simulation d'ajout au panier
      setIsAdding(false);
    }, 1000);
  };

  return (
    <motion.div 
      className="min-h-screen pt-20 bg-primary/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="relative h-[30vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=2070&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative text-center text-text">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-500 mr-2" />
            <h1 className="text-4xl md:text-5xl font-perandory">La Carte Cadeau</h1>
          </div>
          <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
            Offrez une expérience photographique unique
          </p>
        </div>
      </section>

      {/* Gift Card Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/boutique" className="flex items-center text-primary-dark hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Retour à la boutique</span>
            </Link>
          </div>

          <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="relative aspect-square md:aspect-auto md:h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=2070&q=80" 
                    alt="Carte Cadeau"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="bg-white/90 p-6 rounded-lg text-center"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <Heart className="w-6 h-6 text-red-500 mr-2" />
                        <h2 className="text-2xl font-perandory text-accent">CARTE CADEAU</h2>
                      </div>
                      <p className="text-text font-perandory">SOLENE.TRM</p>
                      <p className="text-gray-600 italic text-sm">Photographie</p>
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-perandory text-accent mb-6">CARTE CADEAU</h2>
                <p className="text-text mb-6">
                  Offrez à vos proches une expérience photographique unique avec notre carte cadeau. 
                  Idéale pour un anniversaire, un mariage ou simplement pour faire plaisir.
                </p>
                <div className="mb-6">
                  <h3 className="text-xl font-perandory text-accent mb-2">D'UNE VALEUR DE 100€ À 150€</h3>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="100"
                      max="150"
                      step="5"
                      value={amount}
                      onChange={handleAmountChange}
                      className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="ml-4 text-lg font-medium text-text">{amount}€</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-text">
                    La carte cadeau est valable un an à partir de la date d'achat et peut être utilisée pour toutes nos prestations photographiques.
                  </p>
                  <p className="text-text">
                    Après votre achat, vous recevrez un email avec votre carte cadeau à imprimer ou à transférer par email.
                  </p>
                </div>
                <motion.button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`mt-8 w-full flex items-center justify-center py-3 px-6 rounded-lg text-white font-medium transition-colors ${
                    isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-primary-dark'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAdding ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Ajout en cours...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Ajouter au panier
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default GiftCard;