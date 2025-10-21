const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configuration du transporteur email (à adapter selon votre fournisseur)
const createTransporter = () => {
  // Pour Gmail (exemple)
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // votre email
      pass: process.env.EMAIL_PASS  // mot de passe d'application
    }
  });

  // Pour un serveur SMTP personnalisé
  /*
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  */
};

// Mapping des catégories vers les fichiers PDF
const brochureFiles = {
  'MARIAGE': 'brochure-mariage.pdf',
  'SHOOTING': 'brochure-shooting.pdf',
  'FAMILLE': 'brochure-famille.pdf',
  'PROFESSIONNEL': 'brochure-professionnel.pdf',
  'EVENEMENTIEL': 'brochure-evenementiel.pdf',
  'AUTRES': 'brochure-autres.pdf'
};

// Route pour envoyer les brochures
router.post('/send', async (req, res) => {
  try {
    const { email, selectedCategories, message } = req.body;

    // Validation des données
    if (!email || !selectedCategories || selectedCategories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Email et catégories sont requis'
      });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format d\'email invalide'
      });
    }

    // Préparer les pièces jointes
    const attachments = [];
    const brochuresPath = path.join(__dirname, '../../public/brochures');

    for (const category of selectedCategories) {
      const fileName = brochureFiles[category.toUpperCase()];
      if (fileName) {
        const filePath = path.join(brochuresPath, fileName);
        
        // Vérifier que le fichier existe
        if (fs.existsSync(filePath)) {
          attachments.push({
            filename: fileName,
            path: filePath,
            contentType: 'application/pdf'
          });
        } else {
          console.warn(`Fichier brochure non trouvé: ${filePath}`);
        }
      }
    }

    if (attachments.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Aucune brochure trouvée pour les catégories sélectionnées'
      });
    }

    // Créer le transporteur
    const transporter = createTransporter();

    // Préparer le contenu de l'email
    const categoriesText = selectedCategories.join(', ');
    const emailContent = `
Bonjour,

Merci pour votre intérêt pour nos services de photographie !

Vous trouverez en pièce jointe les brochures pour les prestations suivantes :
${categoriesText}

${message ? `Message personnalisé :\n${message}\n\n` : ''}

N'hésitez pas à nous contacter pour toute question ou pour planifier une séance.

Cordialement,
Solène Photographie

---
Email: solene@photographie.com
Téléphone: 06 XX XX XX XX
Site web: www.solene-photographie.com
    `.trim();

    // Configuration de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER || 'solene@photographie.com',
      to: email,
      subject: `Brochures Solène Photographie - ${categoriesText}`,
      text: emailContent,
      attachments: attachments
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email envoyé:', info.messageId);

    res.json({
      success: true,
      message: 'Brochures envoyées avec succès',
      categories: selectedCategories,
      attachments: attachments.length
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi des brochures:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi des brochures',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Route de test pour vérifier la configuration email
router.get('/test-config', async (req, res) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    
    res.json({
      success: true,
      message: 'Configuration email valide'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur de configuration email',
      error: error.message
    });
  }
});

// Route pour lister les brochures disponibles
router.get('/available', (req, res) => {
  const brochuresPath = path.join(__dirname, '../../public/brochures');
  const availableBrochures = [];

  Object.entries(brochureFiles).forEach(([category, fileName]) => {
    const filePath = path.join(brochuresPath, fileName);
    if (fs.existsSync(filePath)) {
      availableBrochures.push({
        category,
        fileName,
        available: true
      });
    } else {
      availableBrochures.push({
        category,
        fileName,
        available: false
      });
    }
  });

  res.json({
    success: true,
    brochures: availableBrochures
  });
});

module.exports = router;