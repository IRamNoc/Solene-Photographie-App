// Configuration Basin - Alternative gratuite à Formspree avec support des fichiers
// Remplacez 'YOUR_BASIN_ID' par votre vrai ID Basin

export const FORMSPREE_CONFIG = {
  // Endpoint principal pour le formulaire de contact (Basin)
  CONTACT_FORM_ENDPOINT: 'https://usebasin.com/f/7728bb8d8cf2',
  
  // Endpoint pour la demande de brochure (Formspree - conservé)
  BROCHURE_FORM_ENDPOINT: 'https://formspree.io/f/xpwzgqpz',
  
  // Configuration par défaut
  DEFAULT_HEADERS: {
    'Accept': 'application/json'
  },
  
  // Fonctionnalités Basin (version gratuite)
  BASIN_FEATURES: {
    FILE_UPLOADS: true, // ✅ Basin supporte les uploads de fichiers GRATUITEMENT
    MAX_FILE_SIZE_MB: 100, // Jusqu'à 100MB par soumission
    SPAM_PROTECTION: true, // Protection anti-spam intégrée
    AJAX_SUPPORT: true, // Support AJAX natif
    VIRUS_SCANNING: false, // Disponible sur les plans payants
    UNLIMITED_FORMS: true, // Formulaires illimités
    WEBHOOK_SUPPORT: true // Support des webhooks
  },
  
  // Type de service utilisé
  SERVICE_TYPE: 'basin' // 'basin' ou 'formspree'
};

// Instructions pour configurer Basin :
// 1. Allez sur https://usebasin.com
// 2. Créez un compte gratuit
// 3. Créez un nouveau formulaire nommé "Contact Solène Photographie"
// 4. Configurez l'email de destination : solenetrm.photographie@gmail.com
// 5. Copiez l'ID de votre formulaire (ex: abc123def)
// 6. Remplacez 'YOUR_BASIN_ID' ci-dessus par votre vrai ID