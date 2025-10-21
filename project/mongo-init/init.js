// Script d'initialisation MongoDB pour Solene Photographie

// Connexion à la base de données
db = db.getSiblingDB('solene_photos');

// Créer un utilisateur pour l'application
db.createUser({
  user: 'solene_app',
  pwd: 'solene_password_2024',
  roles: [
    {
      role: 'readWrite',
      db: 'solene_photos'
    }
  ]
});

// Créer les collections avec validation
db.createCollection('events', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'Le titre de l\'événement est requis'
        },
        description: {
          bsonType: 'string'
        },
        date: {
          bsonType: 'date'
        },
        clientEmail: {
          bsonType: 'string'
        },
        clientPassword: {
          bsonType: 'string'
        },
        guestPassword: {
          bsonType: 'string'
        },
        status: {
          enum: ['active', 'archived', 'draft'],
          description: 'Le statut doit être active, archived ou draft'
        },
        settings: {
          bsonType: 'object',
          properties: {
            allowDownload: {
              bsonType: 'bool'
            },
            allowSelection: {
              bsonType: 'bool'
            },
            maxSelections: {
              bsonType: 'int'
            }
          }
        }
      }
    }
  }
});

db.createCollection('images', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['eventId', 'filename', 'originalName', 'path', 'url', 'size', 'mimetype'],
      properties: {
        eventId: {
          bsonType: 'objectId',
          description: 'L\'ID de l\'événement est requis'
        },
        filename: {
          bsonType: 'string',
          description: 'Le nom du fichier est requis'
        },
        originalName: {
          bsonType: 'string',
          description: 'Le nom original du fichier est requis'
        },
        path: {
          bsonType: 'string',
          description: 'Le chemin du fichier est requis'
        },
        url: {
          bsonType: 'string',
          description: 'L\'URL du fichier est requise'
        },
        size: {
          bsonType: 'int',
          description: 'La taille du fichier est requise'
        },
        mimetype: {
          bsonType: 'string',
          description: 'Le type MIME est requis'
        },
        visibility: {
          enum: ['private', 'client', 'guest'],
          description: 'La visibilité doit être private, client ou guest'
        },
        folder: {
          bsonType: 'string'
        },
        downloads: {
          bsonType: 'int',
          minimum: 0
        },
        approvedByClient: {
          bsonType: 'bool'
        }
      }
    }
  }
});

// Créer les index pour améliorer les performances

// Index pour les événements
db.events.createIndex({ 'title': 1 });
db.events.createIndex({ 'clientEmail': 1 });
db.events.createIndex({ 'createdAt': -1 });
db.events.createIndex({ 'status': 1 });

// Index pour les images
db.images.createIndex({ 'eventId': 1 });
db.images.createIndex({ 'visibility': 1 });
db.images.createIndex({ 'folder': 1 });
db.images.createIndex({ 'createdAt': -1 });
db.images.createIndex({ 'approvedByClient': 1 });
db.images.createIndex({ 'eventId': 1, 'visibility': 1 });
db.images.createIndex({ 'eventId': 1, 'folder': 1 });

// Insérer des données de test
const testEvent = db.events.insertOne({
  title: 'Séance Photo Test',
  description: 'Événement de test pour le développement',
  date: new Date(),
  clientEmail: 'client@test.com',
  clientPassword: 'client123',
  guestPassword: 'guest123',
  status: 'active',
  settings: {
    allowDownload: true,
    allowSelection: true,
    maxSelections: 0
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

print('Base de données initialisée avec succès!');
print('Événement de test créé avec l\'ID:', testEvent.insertedId);
print('Utilisateur créé: solene_app');
print('Collections créées: events, images');
print('Index créés pour optimiser les performances');