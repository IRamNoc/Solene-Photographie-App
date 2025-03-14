import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, Hash } from 'lucide-react';

// Collection data
const collections = {
  'montagne': {
    title: 'Collection Montagne',
    description: 'Découvrez la majesté des sommets enneigés à travers cette collection de photographies capturant la beauté sauvage et intemporelle des montagnes.',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1170&q=80',
    photos: [
      {
        id: 'mont-1',
        title: 'Sommets Enneigés',
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1170&q=80',
        likes: 854,
        hashtags: ['#montagne', '#neige', '#alpes']
      },
      {
        id: 'mont-2',
        title: 'Chalet Isolé',
        image: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&w=1173&q=80',
        likes: 723,
        hashtags: ['#chalet', '#hiver', '#montagne']
      },
      {
        id: 'mont-3',
        title: 'Vallée Alpine',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1170&q=80',
        likes: 912,
        hashtags: ['#vallée', '#alpes', '#panorama']
      },
      {
        id: 'mont-4',
        title: 'Lac de Montagne',
        image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1176&q=80',
        likes: 645,
        hashtags: ['#lac', '#reflet', '#montagne']
      },
      {
        id: 'mont-5',
        title: 'Sentier Alpin',
        image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1174&q=80',
        likes: 578,
        hashtags: ['#sentier', '#randonnée', '#alpes']
      },
      {
        id: 'mont-6',
        title: 'Crépuscule sur les Cimes',
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1127&q=80',
        likes: 1024,
        hashtags: ['#crépuscule', '#cimes', '#montagne']
      }
    ]
  },
  'cieux': {
    title: 'Collection Cieux',
    description: 'Contemplez la beauté infinie du ciel à travers cette collection de photographies capturant les nuances et les humeurs changeantes de la voûte céleste.',
    coverImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1051&q=80',
    photos: [
      {
        id: 'ciel-1',
        title: 'Ciel Étoilé',
        image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1051&q=80',
        likes: 876,
        hashtags: ['#étoiles', '#nuit', '#ciel']
      },
      {
        id: 'ciel-2',
        title: 'Aurore Boréale',
        image: 'https://images.unsplash.com/photo-1483086431886-3590a88317fe?auto=format&fit=crop&w=1074&q=80',
        likes: 1245,
        hashtags: ['#aurore', '#boréale', '#nuit']
      },
      {
        id: 'ciel-3',
        title: 'Coucher de Soleil',
        image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1032&q=80',
        likes: 932,
        hashtags: ['#coucher', '#soleil', '#crépuscule']
      },
      {
        id: 'ciel-4',
        title: 'Nuages Dramatiques',
        image: 'https://images.unsplash.com/photo-1505533542167-8c89838bb19e?auto=format&fit=crop&w=1170&q=80',
        likes: 687,
        hashtags: ['#nuages', '#orage', '#ciel']
      },
      {
        id: 'ciel-5',
        title: 'Ciel d\'Été',
        image: 'https://images.unsplash.com/photo-1514454529242-9e4677563e7b?auto=format&fit=crop&w=1170&q=80',
        likes: 543,
        hashtags: ['#été', '#bleu', '#ciel']
      },
      {
        id: 'ciel-6',
        title: 'Lever de Soleil',
        image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1170&q=80',
        likes: 897,
        hashtags: ['#lever', '#soleil', '#aube']
      }
    ]
  },
  'french-riviera': {
    title: 'Collection French Riviera',
    description: 'Laissez-vous transporter sur la côte méditerranéenne à travers cette collection de photographies capturant la beauté et l\'élégance de la Riviera française.',
    coverImage: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1170&q=80',
    photos: [
      {
        id: 'riviera-1',
        title: 'Côte d\'Azur',
        image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1170&q=80',
        likes: 934,
        hashtags: ['#côtedazur', '#mer', '#méditerranée']
      },
      {
        id: 'riviera-2',
        title: 'Port de Saint-Tropez',
        image: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=1204&q=80',
        likes: 812,
        hashtags: ['#sainttropez', '#port', '#bateaux']
      },
      {
        id: 'riviera-3',
        title: 'Plage de Pampelonne',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1173&q=80',
        likes: 765,
        hashtags: ['#plage', '#sable', '#mer']
      },
      {
        id: 'riviera-4',
        title: 'Calanques de Marseille',
        image: 'https://images.unsplash.com/photo-1596393553462-d15c3d6ad093?auto=format&fit=crop&w=1170&q=80',
        likes: 1087,
        hashtags: ['#calanques', '#marseille', '#falaises']
      },
      {
        id: 'riviera-5',
        title: 'Promenade des Anglais',
        image: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?auto=format&fit=crop&w=1169&q=80',
        likes: 678,
        hashtags: ['#nice', '#promenade', '#palmiers']
      },
      {
        id: 'riviera-6',
        title: 'Coucher de Soleil à Cannes',
        image: 'https://images.unsplash.com/photo-1559628129-67cf63b72248?auto=format&fit=crop&w=1170&q=80',
        likes: 945,
        hashtags: ['#cannes', '#coucherdesoleil', '#mer']
      }
    ]
  }
};

const Collection = () => {
  const { id } = useParams<{ id: string }>();
  const collection = id ? collections[id as keyof typeof collections] : null;

  if (!collection) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-perandory text-accent mb-4">Collection non trouvée</h2>
          <Link to="/boutique" className="text-primary-dark hover:text-accent transition-colors">
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

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
            backgroundImage: `url(${collection.coverImage})`
          }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative text-center text-text">
          <h1 className="text-4xl md:text-5xl font-perandory mb-4">{collection.title}</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Collection Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/boutique" className="flex items-center text-primary-dark hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Retour à la boutique</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.photos.map((photo, index) => (
              <motion.div 
                key={photo.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={photo.image} 
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-perandory text-accent mb-2">{photo.title}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-text">
                      <Heart className="w-5 h-5 text-red-500 mr-1" />
                      <span>{photo.likes}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {photo.hashtags.map((tag, index) => (
                        <span key={index} className="text-sm text-primary-dark flex items-center">
                          <Hash className="w-3 h-3 mr-1" />
                          {tag.substring(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Collection;