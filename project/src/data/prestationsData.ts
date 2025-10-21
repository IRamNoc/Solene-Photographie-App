import { ServicePackagesData } from '../components/prestations/ServicePackagesSection';

/**
 * Données des formules de prestations
 * Organisées par service pour une réutilisation facile
 */

export const mariagePackagesData: ServicePackagesData = {
  serviceTitle: "FORMULES MARIAGE",
  packages: [
    {
      name: "Essentiel",
      price: "400€",
      features: [
        "3h de présence (parfait pour un mariage civil)",
        "Un rendez-vous en voie de 30 min en amont",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 100 photographies"
      ]
    },
    {
      name: "Classique",
      price: "1 250€",
      features: [
        "6h de présence",
        "Un rendez-vous d'1h en amont",
        "Un guide avec mes conseils",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 350 photographies"
      ]
    },
    {
      name: "Signature",
      price: "1 500€",
      features: [
        "12h de présence",
        "Un rendez-vous d'1h en amont",
        "Une séance couple de 30 min offerte",
        "Un guide avec mes conseils",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 600 photographies"
      ]
    },
    {
      name: "Prestige",
      price: "1 900€",
      features: [
        "1 journée complète de présence",
        "Un rendez-vous d'1h en amont",
        "Une séance couple d'1h offerte",
        "Un guide avec mes conseils",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 800 photographies",
        "Une clé USB sous 6 mois",
        "Un album photo"
      ]
    }
  ]
};

export const autresPackagesData: ServicePackagesData = {
  serviceTitle: "AUTRES SERVICES",
  packages: [
    {
      name: "Cartes cadeaux",
      price: "50€ - 70€ - 100€ - montant libre",
      features: [
        "Offrir une séance photo, c'est offrir du temps, une trace, un souvenir.",
        "Les cartes cadeaux sont valables pour toutes les prestations proposées",
        "(shooting, famille, nouveau-né, reportage, etc.).",
        "Elles sont personnalisées, envoyées sous 5 jours ouvrés ou",
        "instantanément en version dématérialisée."
      ]
    },
    {
      name: "Boutique",
      price: "Découvrez toutes mes photographies en vente sur mon site web dans l'espace \"Boutique\" dédiée.",
      features: []
    },
    {
      name: "Options supplémentaires",
      price: "Tarifs variables",
      features: [
        "Album photo : un bel objet imprimé, soigneusement mis en page par mes",
        "soins, livre directement dans votre boîte aux lettres. Vous pouvez",
        "sélectionner vos photos préférées ou me confier la composition.",
        "Clé USB : une copie complète de vos photos, à conserver précieusement",
        "pour l'éternité. Elle est envoyée par colis suivi dans un délai de 4",
        "semaines maximum.",
        "Tirage photo : vos images préférées, imprimées sur papier, pour",
        "prolonger l'émotion au-delà de l'écran. Vous pouvez sélectionner les",
        "photographies de votre séance, choisir un format, et je m'occupe du reste."
      ]
    },
    {
      name: "Formule sur mesure",
      price: "Sur devis",
      features: [
        "Si aucune formule ne correspond exactement à ce que vous avez en tête,",
        "je vous propose d'en construire une ensemble.",
        "Nous échangeons par mail autour de votre projet, via l'adresse d'un besoin",
        "particulier, d'un format spécifique, ou d'une vision créative et je",
        "vous accompagne pour la réaliser, je vous envoie un devis personnalisé."
      ]
    }
  ]
};

export const evenementielPackagesData: ServicePackagesData = {
  serviceTitle: "FORMULES ÉVÉNEMENTIEL",
  packages: [
    {
      name: "Instant",
      price: "200€",
      features: [
        "2h de présence",
        "Une galerie en ligne sécurisée par mot de passe",
        "Un minimum de 80 photographies",
        "Chaque heure additionnelle est à 50€"
      ]
    },
    {
      name: "Soirée",
      price: "350€",
      features: [
        "Jusqu'à 6h de présence",
        "Une galerie en ligne sécurisée par mot de passe",
        "Un minimum de 300 photographies",
        "Chaque heure additionnelle est à 50€"
      ]
    },
    {
      name: "Journée",
      price: "450€",
      features: [
        "Jusqu'à 10h de présence",
        "Une galerie en ligne sécurisée par mot de passe",
        "Un minimum de 500 photographies",
        "Chaque heure additionnelle est à 50€"
      ]
    }
  ]
};

export const professionnelPackagesData: ServicePackagesData = {
  serviceTitle: "FORMULES PROFESSIONNEL",
  packages: [
    {
      name: "Professionnel",
      price: "150€",
      features: [
        "Pour les prestations professionnelles, chaque projet étant unique,",
        "nous échangeons par mail autour de vos besoins.",
        "Après réception de votre demande et analyse de votre projet,",
        "je vous envoie un devis personnalisé."
      ]
    }
  ]
};

export const grossessePackagesData: ServicePackagesData = {
  serviceTitle: "FORMULES GROSSESSE",
  packages: [
    {
      name: "Douceur",
      price: "250€",
      features: [
        "Séance photo en studio ou extérieur (1h)",
        "2-3 tenues possibles",
        "15 photos retouchées en haute définition",
        "Galerie en ligne privée pour 3 mois",
        "Livraison numérique des photos"
      ]
    },
    {
      name: "Tendresse",
      price: "350€",
      features: [
        "Séance photo en studio et extérieur (1h30)",
        "3-4 tenues possibles",
        "Accessoires et voiles fournis",
        "25 photos retouchées en haute définition",
        "Galerie en ligne privée pour 6 mois",
        "Livraison sur clé USB",
        "5 tirages 13x18cm offerts"
      ]
    }
  ]
};

export const nouveauNePackagesData: ServicePackagesData = {
  serviceTitle: "FORMULES NOUVEAU-NÉ",
  packages: [
    {
      name: "Première Rencontre",
      price: "300€",
      features: [
        "Séance à domicile ou en studio (2h)",
        "Photos lifestyle et posées",
        "Accessoires et décors fournis",
        "20 photos retouchées en haute définition",
        "Galerie en ligne privée pour 6 mois",
        "Livraison numérique des photos"
      ]
    },
    {
      name: "Premiers Moments",
      price: "450€",
      features: [
        "Séance à domicile et en studio (3h)",
        "Photos lifestyle, posées et famille",
        "Large choix d'accessoires et décors",
        "35 photos retouchées en haute définition",
        "Galerie en ligne privée pour 1 an",
        "Livraison sur clé USB personnalisée",
        "10 tirages 10x15cm offerts"
      ]
    }
  ]
};

export const famillePackagesData: ServicePackagesData = {
  serviceTitle: "FORMULES FAMILLE",
  packages: [
    {
      name: "Photo de famille",
      price: "70€",
      features: [
        "30 min de shooting photo",
        "Pour une famille, petite ou grande (maximum 15 membres)",
        "1 seul lieu",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 25 photographies (choisir une photo de la famille au complet, une photo des parents, une photo des enfants, une photo individuelle de chacun)"
      ]
    },
    {
      name: "Nouveau né",
      price: "100€",
      features: [
        "Entre 30min et 1h de shooting photo (suivant l'éveil de votre enfant)",
        "Parents, nouveau né et frères et sœurs",
        "1 seul lieu",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 30 photographies"
      ]
    },
    {
      name: "Reportage",
      price: "150€",
      features: [
        "Entre 1h et 2h de shooting photo",
        "Plusieurs lieux",
        "Pour une famille petite ou grande (maximum 15 membres)",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 60 photographies"
      ]
    }
  ]
};

export const shootingPackagesData: ServicePackagesData = {
  serviceTitle: "FORMULES SHOOTING",
  packages: [
    {
      name: "Flash",
      price: "70€",
      features: [
        "30min de shooting photo",
        "1 seul lieu",
        "Pour une ou deux personnes",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 20 photographies"
      ]
    },
    {
      name: "Classique",
      price: "90€",
      features: [
        "45min de shooting photo",
        "Jusqu'à deux lieux (proches les uns des autres)",
        "Pour une ou deux personnes",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 50 photographies"
      ]
    },
    {
      name: "Reportage",
      price: "150€",
      features: [
        "Entre 1h et 2h de shooting photo",
        "Plusieurs lieux",
        "Pour une ou plusieurs personnes",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 60 photographies"
      ]
    },
    {
      name: "Éditorial",
      price: "150€",
      features: [
        "Entre 1h et 2h de shooting photo",
        "Un rendez-vous de 30 min minimum en amont",
        "Une recherche cinématographique",
        "Plusieurs lieux",
        "Pour une ou plusieurs personnes",
        "Une galerie en ligne sécurisée par un mot de passe",
        "Un minimum de 90 photographies"
      ]
    }
  ]
};