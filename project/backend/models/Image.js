const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnailPath: {
    type: String
  },
  thumbnailUrl: {
    type: String
  },
  size: {
    type: Number,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  dimensions: {
    width: Number,
    height: Number
  },
  visibility: {
    type: String,
    enum: ['private', 'client', 'guest'],
    default: 'private'
  },
  folder: {
    type: String,
    default: 'default'
  },
  downloads: {
    type: Number,
    default: 0
  },
  approvedByClient: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  metadata: {
    camera: String,
    lens: String,
    settings: {
      iso: Number,
      aperture: String,
      shutterSpeed: String,
      focalLength: String
    },
    location: {
      name: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    }
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
imageSchema.index({ eventId: 1 });
imageSchema.index({ visibility: 1 });
imageSchema.index({ folder: 1 });
imageSchema.index({ createdAt: -1 });
imageSchema.index({ approvedByClient: 1 });

// Méthode pour obtenir l'URL complète
imageSchema.methods.getFullUrl = function(baseUrl) {
  return `${baseUrl}${this.url}`;
};

// Méthode pour obtenir l'URL du thumbnail
imageSchema.methods.getThumbnailUrl = function(baseUrl) {
  return this.thumbnailUrl ? `${baseUrl}${this.thumbnailUrl}` : this.getFullUrl(baseUrl);
};

module.exports = mongoose.model('Image', imageSchema);