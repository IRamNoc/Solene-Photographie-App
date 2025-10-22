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
  name?: string;
  phone?: string;
}

// Liens directs de téléchargement Google Drive (IDs réels)
const BROCHURE_LINKS = {
  'mariage': 'https://drive.google.com/uc?export=download&id=1bMxLZd2KbfQHEsRSsdlo753JdDDSW_Nb',
  'famille': 'https://drive.google.com/uc?export=download&id=1c77B_jtOULpp5W7gW8g_hfvlCOgORmob',
  'shooting': 'https://drive.google.com/uc?export=download&id=1SHYRDOMd83HNrIBqZN-h5EVG0QdgZDWF',
  'evenementiel': 'https://drive.google.com/uc?export=download&id=1XN3hnJqZv3o308H1GoE_1jxAlf1B4bZ1',
  'professionnel': 'https://drive.google.com/uc?export=download&id=1TYFI7Ajwh7l_Lm1lPndnWXZB6Rvp0i5E',
  'autres': 'https://drive.google.com/uc?export=download&id=1SBqVTqND4Qd_iZqgErFsTSE-PuH5MrRo'
};

export const sendBrochureRequest = async (data: BrochureRequest): Promise<boolean> => {
  try {
    // Créer les liens de téléchargement directs
    const brochureLinks = data.selectedCategories.map(category => {
      const link = BROCHURE_LINKS[category.toLowerCase() as keyof typeof BROCHURE_LINKS];
      return `📄 Brochure ${category}: ${link}`;
    });

    const templateParams = {
      to_email: data.email, // Email du client qui recevra la brochure
      to_name: data.name || 'Client', // Nom du destinataire
      from_name: 'Solène Photographie',
      categories: data.selectedCategories.join(', '),
      brochure_links: brochureLinks.join('\n'),
      message: data.message || 'Voici vos brochures demandées',
      reply_to: 'solenetrm.photographie@gmail.com' // Votre email pour les réponses
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

// Service pour envoyer le formulaire de contact (si nécessaire)
export const sendContactForm = async (formData: any): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_contact', // Vous devrez créer ce template si nécessaire
      {
        from_name: formData.from_name,
        from_email: formData.from_email,
        subject: formData.subject,
        message: formData.message,
        phone: formData.phone || '',
        to_email: 'solenetrm.photographie@gmail.com',
      }
    );

    console.log('Email de contact envoyé avec succès:', response);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire de contact:', error);
    return false;
  }
};