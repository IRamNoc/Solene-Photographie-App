// Configuration EmailJS pour l'envoi d'emails
export const EMAILJS_CONFIG = {
  // Votre Service ID EmailJS
  SERVICE_ID: 'service_8wu5o0w',
  
  // Template IDs (configurés dans EmailJS)
  TEMPLATE_ID_CONTACT: 'template_contact', // Template pour le formulaire de contact
  TEMPLATE_ID_BROCHURE: 'template_92vuo0j', // Template pour l'envoi de brochures
  
  // Votre Public Key (User ID) - CONFIGURÉ
  PUBLIC_KEY: '7Gga_mkU2RFInsv7O',
  
  // Configuration par défaut
  DEFAULT_OPTIONS: {
    limitRate: {
      id: 'app',
      throttle: 10000, // Limite à 1 email toutes les 10 secondes
    },
  },
};

// Types pour les données d'email
export interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface BrochureRequestData {
  email: string;
  name: string;
  phone?: string;
  message?: string;
  categories: string[];
}

// Instructions de configuration :
// 1. Connectez-vous à https://emailjs.com
// 2. Allez dans "Email Services" et vérifiez que service_8wu5o0w est configuré
// 3. Créez les templates nécessaires :
//    - template_contact : pour le formulaire de contact
//    - template_brochure : pour l'envoi de brochures
// 4. Récupérez votre Public Key dans "Account" > "API Keys"
// 5. Remplacez 'YOUR_PUBLIC_KEY' ci-dessus par votre vraie clé