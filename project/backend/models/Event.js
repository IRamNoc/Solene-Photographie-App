const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  clientEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  clientPassword: {
    type: String
  },
  guestPassword: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'draft'],
    default: 'active'
  },
  settings: {
    allowDownload: {
      type: Boolean,
      default: true
    },
    allowSelection: {
      type: Boolean,
      default: true
    },
    maxSelections: {
      type: Number,
      default: 0 // 0 = illimité
    }
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
eventSchema.index({ title: 1 });
eventSchema.index({ clientEmail: 1 });
eventSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Event', eventSchema);