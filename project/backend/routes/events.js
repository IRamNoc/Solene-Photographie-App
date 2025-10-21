const express = require('express');
const Event = require('../models/Event');
const Image = require('../models/Image');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

// Créer un nouvel événement
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      clientEmail,
      clientPassword,
      guestPassword,
      settings
    } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Le titre est requis' });
    }
    
    const event = new Event({
      title,
      description,
      date: date ? new Date(date) : undefined,
      clientEmail,
      clientPassword,
      guestPassword,
      settings
    });
    
    await event.save();
    
    // Créer le dossier pour les uploads
    const uploadPath = path.join(__dirname, '../uploads', event._id.toString());
    await fs.mkdir(uploadPath, { recursive: true });
    
    res.status(201).json(event);
    
  } catch (error) {
    console.error('Erreur création événement:', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'événement' });
  }
});

// Récupérer tous les événements
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const skip = (page - 1) * limit;
    
    const events = await Event.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Event.countDocuments(query);
    
    // Ajouter le nombre d'images pour chaque événement
    const eventsWithStats = await Promise.all(
      events.map(async (event) => {
        const imageCount = await Image.countDocuments({ eventId: event._id });
        return {
          ...event.toObject(),
          imageCount
        };
      })
    );
    
    res.json({
      events: eventsWithStats,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Erreur récupération événements:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
  }
});

// Récupérer un événement spécifique
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    
    // Ajouter les statistiques
    const imageCount = await Image.countDocuments({ eventId });
    const approvedCount = await Image.countDocuments({ eventId, approvedByClient: true });
    const totalDownloads = await Image.aggregate([
      { $match: { eventId: event._id } },
      { $group: { _id: null, total: { $sum: '$downloads' } } }
    ]);
    
    const eventWithStats = {
      ...event.toObject(),
      stats: {
        imageCount,
        approvedCount,
        totalDownloads: totalDownloads[0]?.total || 0
      }
    };
    
    res.json(eventWithStats);
    
  } catch (error) {
    console.error('Erreur récupération événement:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'événement' });
  }
});

// Mettre à jour un événement
router.put('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const updates = req.body;
    
    // Champs autorisés à la mise à jour
    const allowedUpdates = [
      'title', 'description', 'date', 'clientEmail', 
      'clientPassword', 'guestPassword', 'status', 'settings'
    ];
    
    const filteredUpdates = {};
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });
    
    if (filteredUpdates.date) {
      filteredUpdates.date = new Date(filteredUpdates.date);
    }
    
    const event = await Event.findByIdAndUpdate(
      eventId,
      filteredUpdates,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    
    res.json(event);
    
  } catch (error) {
    console.error('Erreur mise à jour événement:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'événement' });
  }
});

// Supprimer un événement
router.delete('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    
    // Supprimer toutes les images associées
    const images = await Image.find({ eventId });
    
    // Supprimer les fichiers physiques
    for (const image of images) {
      try {
        await fs.unlink(image.path);
        if (image.thumbnailPath) {
          await fs.unlink(image.thumbnailPath);
        }
      } catch (fileError) {
        console.error(`Erreur suppression fichier ${image.filename}:`, fileError);
      }
    }
    
    // Supprimer le dossier de l'événement
    const uploadPath = path.join(__dirname, '../uploads', eventId);
    try {
      await fs.rmdir(uploadPath, { recursive: true });
    } catch (dirError) {
      console.error('Erreur suppression dossier:', dirError);
    }
    
    // Supprimer les enregistrements de la base
    await Image.deleteMany({ eventId });
    await Event.findByIdAndDelete(eventId);
    
    res.json({ message: 'Événement et toutes ses images supprimés avec succès' });
    
  } catch (error) {
    console.error('Erreur suppression événement:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement' });
  }
});

// Authentification client/invité
router.post('/:eventId/auth', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { password, type } = req.body; // type: 'client' ou 'guest'
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }
    
    let isValid = false;
    let userType = null;
    
    if (type === 'client' && event.clientPassword === password) {
      isValid = true;
      userType = 'client';
    } else if (type === 'guest' && event.guestPassword === password) {
      isValid = true;
      userType = 'guest';
    }
    
    if (!isValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    
    res.json({
      success: true,
      userType,
      event: {
        id: event._id,
        title: event.title,
        description: event.description,
        settings: event.settings
      }
    });
    
  } catch (error) {
    console.error('Erreur authentification:', error);
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
});

// Récupérer les dossiers d'un événement
router.get('/:eventId/folders', async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const folders = await Image.distinct('folder', { eventId });
    
    // Compter les images par dossier
    const foldersWithCount = await Promise.all(
      folders.map(async (folder) => {
        const count = await Image.countDocuments({ eventId, folder });
        return { name: folder, count };
      })
    );
    
    res.json(foldersWithCount);
    
  } catch (error) {
    console.error('Erreur récupération dossiers:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des dossiers' });
  }
});

module.exports = router;