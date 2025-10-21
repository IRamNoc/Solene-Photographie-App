const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const Image = require('../models/Image');
const Event = require('../models/Event');

const router = express.Router();

// Configuration de Multer pour l'upload
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const eventId = req.body.eventId || req.params.eventId;
    const uploadPath = path.join(__dirname, '../uploads', eventId);
    
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// Upload d'images
router.post('/upload/:eventId', upload.array('images', 50), async (req, res) => {
  try {
    const { eventId } = req.params;
    const { visibility = 'private', folder = 'default' } = req.body;
    
    // Vérifier que l'événement existe
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'Aucune image fournie' });
    }
    
    const uploadedImages = [];
    
    for (const file of req.files) {
      try {
        // Créer le thumbnail
        const thumbnailPath = path.join(path.dirname(file.path), `thumb_${file.filename}`);
        await sharp(file.path)
          .resize(300, 300, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(thumbnailPath);
        
        // Obtenir les dimensions de l'image
        const metadata = await sharp(file.path).metadata();
        
        // Créer l'enregistrement en base
        const image = new Image({
          eventId,
          filename: file.filename,
          originalName: file.originalname,
          path: file.path,
          url: `/uploads/${eventId}/${file.filename}`,
          thumbnailPath,
          thumbnailUrl: `/uploads/${eventId}/thumb_${file.filename}`,
          size: file.size,
          mimetype: file.mimetype,
          dimensions: {
            width: metadata.width,
            height: metadata.height
          },
          visibility,
          folder
        });
        
        await image.save();
        uploadedImages.push(image);
        
      } catch (error) {
        console.error(`Erreur lors du traitement de ${file.filename}:`, error);
        // Continuer avec les autres fichiers
      }
    }
    
    res.json({
      message: `${uploadedImages.length} image(s) uploadée(s) avec succès`,
      images: uploadedImages
    });
    
  } catch (error) {
    console.error('Erreur upload:', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload' });
  }
});

// Récupérer les images d'un événement
router.get('/event/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { visibility, folder, page = 1, limit = 50 } = req.query;
    
    const query = { eventId };
    if (visibility) query.visibility = visibility;
    if (folder) query.folder = folder;
    
    const skip = (page - 1) * limit;
    
    const images = await Image.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('eventId', 'title');
    
    const total = await Image.countDocuments(query);
    
    // Ajouter l'URL complète
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imagesWithUrls = images.map(image => ({
      ...image.toObject(),
      fullUrl: image.getFullUrl(baseUrl),
      thumbnailFullUrl: image.getThumbnailUrl(baseUrl)
    }));
    
    res.json({
      images: imagesWithUrls,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Erreur récupération images:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des images' });
  }
});

// Récupérer une image spécifique
router.get('/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    
    const image = await Image.findById(imageId).populate('eventId', 'title');
    if (!image) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageWithUrls = {
      ...image.toObject(),
      fullUrl: image.getFullUrl(baseUrl),
      thumbnailFullUrl: image.getThumbnailUrl(baseUrl)
    };
    
    res.json(imageWithUrls);
    
  } catch (error) {
    console.error('Erreur récupération image:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'image' });
  }
});

// Mettre à jour une image
router.put('/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const updates = req.body;
    
    // Champs autorisés à la mise à jour
    const allowedUpdates = ['visibility', 'folder', 'approvedByClient', 'tags', 'metadata'];
    const filteredUpdates = {};
    
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });
    
    const image = await Image.findByIdAndUpdate(
      imageId,
      filteredUpdates,
      { new: true, runValidators: true }
    ).populate('eventId', 'title');
    
    if (!image) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    
    res.json(image);
    
  } catch (error) {
    console.error('Erreur mise à jour image:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image' });
  }
});

// Supprimer une image
router.delete('/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    
    // Supprimer les fichiers physiques
    try {
      await fs.unlink(image.path);
      if (image.thumbnailPath) {
        await fs.unlink(image.thumbnailPath);
      }
    } catch (fileError) {
      console.error('Erreur suppression fichier:', fileError);
      // Continuer même si la suppression du fichier échoue
    }
    
    // Supprimer l'enregistrement de la base
    await Image.findByIdAndDelete(imageId);
    
    res.json({ message: 'Image supprimée avec succès' });
    
  } catch (error) {
    console.error('Erreur suppression image:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
  }
});

// Incrémenter le compteur de téléchargements
router.post('/:imageId/download', async (req, res) => {
  try {
    const { imageId } = req.params;
    
    const image = await Image.findByIdAndUpdate(
      imageId,
      { $inc: { downloads: 1 } },
      { new: true }
    );
    
    if (!image) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    
    res.json({ message: 'Téléchargement enregistré', downloads: image.downloads });
    
  } catch (error) {
    console.error('Erreur enregistrement téléchargement:', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement du téléchargement' });
  }
});

module.exports = router;