import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Users, Baby, Sparkles, Image } from 'lucide-react';

const services = [
  {
    id: 'mariage',
    title: 'Mariage',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2070&q=80',
    description: "Immortalisez les moments magiques de votre union avec un reportage complet.",
    packages: [
      {
        name: 'Classique',
        price: '900€',
        features: [
          'Préparatifs',
          'Cérémonie religieuse ou laïque',
          'Séance couple',
          'Photos de groupes'
        ]
      },
      {
        name: 'Signature',
        price: '1200€',
        features: [
          'Préparatifs',
          'Cérémonie religieuse ou laïque',
          'Séance couple',
          'Photos de groupes',
          'Cocktail',
          'Discours des pères'
        ]
      },
      {
        name: 'HÉRITAGE',
        price: '1500€',
        features: [
          'Préparatifs',
          'Cérémonie religieuse ou laïque',
          'Séance couple',
          'Photos de groupes',
          'Cocktail',
          'Discours des pères',
          'Dîner',
          'Photos des tables',
          'Début de soirée'
        ]
      },
      {
        name: 'Formule étendue',
        price: '1700€',
        features: [
          'Tous les éléments de la formule "HÉRITAGE"',
          'Couverture plus longue de la soirée'
        ]
      }
    ]
  },
  {
    id: 'engagement',
    title: 'Engagement',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1583939411023-14783179e581?auto=format&fit=crop&w=2070&q=80',
    description: "Une séance photo en couple pour célébrer votre amour.",
    packages: [
      {
        name: 'EXPECTING',
        price: '130€',
        duration: '1h30',
        features: [
          'Environ 100 photos',
          'Idéal pour les jeunes couples',
          'Parfait pour célébrer votre engagement',
          'Photos naturelles et spontanées'
        ]
      }
    ]
  },
  {
    id: 'maternite',
    title: 'Maternité',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=2070&q=80',
    description: "Sublimez votre grossesse avec une séance photo élégante.",
    packages: [
      {
        name: 'EXPECTING',
        price: '130€',
        duration: '1h30',
        features: [
          'Environ 100 photos',
          'Photos artistiques de la future maman',
          'Possibilité de photos en couple',
          'Idéal pour annoncer la grande nouvelle'
        ]
      }
    ]
  },
  {
    id: 'naissance',
    title: 'Naissance',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=2070&q=80',
    description: "Immortalisez les premiers jours de votre nouveau-né.",
    packages: [
      {
        name: 'Bienvenue au monde',
        price: '75€',
        duration: '30 min à 1h',
        features: [
          '25-30 photos',
          'Séance adaptée au rythme du bébé',
          'Photos naturelles à domicile'
        ]
      },
      {
        name: 'Jolis souvenirs',
        price: '130€',
        duration: '1h à 2h',
        features: [
          'Environ 100 photos',
          'Séance complète avec la famille',
          'Photos spontanées à domicile',
          'Plusieurs tenues possibles'
        ]
      }
    ]
  },
  {
    id: 'famille',
    title: 'Famille',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2070&q=80',
    description: "Capturez les moments précieux en famille.",
    packages: [
      {
        name: 'Photo de famille',
        price: '75€',
        duration: '30 min',
        features: [
          '25-30 photos',
          'Photos de groupe',
          'Idéal pour une séance rapide'
        ]
      },
      {
        name: 'Jolis souvenirs',
        price: '130€',
        duration: '1h30',
        features: [
          'Environ 100 photos',
          'Photos naturelles en extérieur',
          'Photos de groupe et individuelles',
          'Ambiance décontractée'
        ]
      },
      {
        name: 'Reportage',
        price: '300€',
        duration: '3h',
        features: [
          'Environ 250 photos',
          'Immersion dans votre quotidien',
          'Moments authentiques',
          'Idéal pour les réunions de famille'
        ]
      }
    ]
  },
  {
    id: 'autres',
    title: 'Autres services',
    icon: Image,
    image: 'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?auto=format&fit=crop&w=2070&q=80',
    description: "Des séances photos sur mesure pour tous vos besoins.",
    packages: [
      {
        name: 'Promesse',
        price: '75€',
        duration: '30 min à 1h',
        features: [
          '25-30 photos',
          'Séance personnalisée',
          'Adaptée à vos besoins'
        ]
      },
      {
        name: 'Blooming',
        price: '75€',
        duration: '30 min à 1h',
        features: [
          '25-30 photos',
          'Moments de tendresse',
          'Photos naturelles et spontanées'
        ]
      }
    ]
  }
];

const additionalOptions = [
  {
    name: 'Album photo',
    price: '75€'
  },
  {
    name: '15 photos livrées sous 2 jours',
    price: '75€'
  },
  {
    name: 'Retouches artistiques',
    price: '25€'
  },
  {
    name: '50 photos supplémentaires',
    price: '25€'
  }
];

const Services = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = services.map(s => s.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen pt-48 bg-white">
      {/* Navigation */}
      <div className="sticky top-32 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => scrollToSection(service.id)}
                className={`group relative py-6 px-4 transition-colors ${
                  activeSection === service.id
                    ? 'bg-primary text-black'
                    : 'hover:bg-primary/20'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <service.icon className={`w-6 h-6 ${
                    activeSection === service.id
                      ? 'text-black'
                      : 'text-gray-600 group-hover:text-black'
                  }`} />
                  <span className={`text-sm font-medium ${
                    activeSection === service.id
                      ? 'text-black'
                      : 'text-gray-600 group-hover:text-black'
                  }`}>
                    {service.title}
                  </span>
                </div>
                {activeSection === service.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Sections */}
      {services.map((service) => (
        <section
          key={service.id}
          id={service.id}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Hero Image with Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[21/9] rounded-lg overflow-hidden shadow-lg mb-12"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-4xl font-display mb-4">{service.title}</h2>
                    <p className="text-lg max-w-xl">{service.description}</p>
                  </div>
                </div>
              </motion.div>

              {/* Packages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.packages.map((pkg, idx) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-white rounded-lg shadow-md p-6 border border-primary/20 hover:shadow-lg hover:border-primary transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-display text-black mb-1">{pkg.name}</h3>
                        {pkg.duration && (
                          <p className="text-gray-500 text-sm">{pkg.duration}</p>
                        )}
                      </div>
                      <span className="text-xl font-semibold text-black">{pkg.price}</span>
                    </div>
                    <ul className="space-y-2 ml-4">
                      {pkg.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center text-black">
                          <span className="w-1.5 h-1.5 bg-primary-dark rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Additional Options */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-display text-black text-center mb-12">Options supplémentaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {additionalOptions.map((option, index) => (
                  <motion.div
                    key={option.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-medium text-black mb-2">{option.name}</h3>
                    <p className="text-lg font-semibold text-black">{option.price}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;