// Service email temporaire pour tester sans EmailJS
import { ContactFormData, BrochureRequestData } from '../config/emailjs';

// Mock pour tester l'interface sans EmailJS
export const initEmailJS = () => {
  console.log('🔧 Mode test - EmailJS non configuré');
};

export const sendContactForm = async (formData: ContactFormData): Promise<boolean> => {
  console.log('📧 [TEST] Envoi formulaire de contact:', {
    nom: formData.from_name,
    email: formData.from_email,
    sujet: formData.subject,
    message: formData.message,
    telephone: formData.phone
  });
  
  // Simuler un délai d'envoi
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  alert(`✅ [MODE TEST] Formulaire de contact reçu !
  
Nom: ${formData.from_name}
Email: ${formData.from_email}
Sujet: ${formData.subject}

⚠️ Pour activer l'envoi réel, configurez EmailJS selon le guide EMAILJS_SETUP_GUIDE.md`);
  
  return true;
};

export const sendBrochureRequest = async (requestData: BrochureRequestData): Promise<boolean> => {
  console.log('📧 [TEST] Demande de brochures:', {
    nom: requestData.name,
    email: requestData.email,
    telephone: requestData.phone,
    message: requestData.message,
    categories: requestData.categories
  });
  
  // Simuler un délai d'envoi
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const categoriesText = requestData.categories.join(', ');
  
  alert(`✅ [MODE TEST] Demande de brochures reçue !

👤 Client: ${requestData.name}
📧 Email: ${requestData.email}
📱 Téléphone: ${requestData.phone || 'Non renseigné'}
📝 Message: ${requestData.message || 'Aucun message'}

📋 Catégories demandées: ${categoriesText}

📧 Email qui serait envoyé à: solenetrm.photographie@gmail.com

⚠️ Pour activer l'envoi réel, configurez EmailJS selon le guide EMAILJS_SETUP_GUIDE.md`);
  
  return true;
};

export const isEmailJSConfigured = (): boolean => {
  return false; // Mode test
};