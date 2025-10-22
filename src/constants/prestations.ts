import { Camera, Heart, Users, Baby, Sparkles, Image } from 'lucide-react';
import { Service, AdditionalOption } from '../types/prestations';

export const SERVICES: Service[] = [
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

export const ADDITIONAL_OPTIONS: AdditionalOption[] = [
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