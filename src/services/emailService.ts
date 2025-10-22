import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_SERVICE_ID = 'service_8wu5o0w';
const EMAILJS_TEMPLATE_ID = 'template_92vuo0j';  
const EMAILJS_PUBLIC_KEY = '7Gga_mkU2RFInsv7O';

// Initialiser EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface BrochureRequest {
  email: string;
  selectedCategories: string[];
  message?: string;
}

export const sendBrochureRequest = async (data: BrochureRequest): Promise<boolean> => {
  try {
    // Préparer les données pour EmailJS
    const templateParams = {
      to_email: data.email,
      from_name: 'Solène Photographie',
      categories: data.selectedCategories.join(', '),
      message: data.message || '',
      reply_to: 'solene@photographie.com'
    };

    // Envoyer l'email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email envoyé avec succès:', response);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return false;
  }
};

// Liens directs de téléchargement Google Drive
const BROCHURE_LINKS = {
  'mariage': 'https://drive.google.com/uc?export=download&id=11W53_rYsoVb5-wSArSHa8BwRlHHv2iy-',
  'famille': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_FAMILLE',
  'shooting': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_SHOOTING',
  'evenementiel': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_EVENEMENTIEL',
  'professionnel': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_PROFESSIONNEL',
  'autres': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_AUTRES'
};

// Alternative : Envoi direct avec liens de téléchargement
export const sendBrochureLinks = async (data: BrochureRequest): Promise<boolean> => {
  try {
    // Créer les liens de téléchargement directs
    const brochureLinks = data.selectedCategories.map(category => {
      const link = BROCHURE_LINKS[category.toLowerCase() as keyof typeof BROCHURE_LINKS];
      return `📄 Brochure ${category}: ${link}`;
    });

    const templateParams = {
      to_email: data.email, // Email du client qui recevra la brochure
      to_name: 'Client', // Nom du destinataire
      from_name: 'Solène Photographie',
      categories: data.selectedCategories.join(', '),
      brochure_links: brochureLinks.join('\n'),
      message: data.message || 'Voici vos brochures demandées',
      reply_to: 'solene.photographie@gmail.com' // Votre email pour les réponses
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email avec liens envoyé:', response);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return false;
  }
};