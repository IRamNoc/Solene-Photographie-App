# Solene Photographie App

Application web professionnelle de photographie avec galerie interactive, système de contact et interface d'administration.

## 🏗️ Architecture

- **Frontend**: React + Vite + TypeScript
- **Backend**: Node.js + Express
- **Base de données**: MongoDB (optionnel)
- **Déploiement**: Docker + Docker Compose + Dokploy

## 🚀 Démarrage Rapide

### Développement Local

1. **Cloner le repository**
   ```bash
   git clone https://github.com/VOTRE_USERNAME/Solene-Photographie-App.git
   cd Solene-Photographie-App
   ```

2. **Installer les dépendances**
   ```bash
   # Frontend
   cd project
   npm install
   
   # Backend
   cd backend
   npm install
   ```

3. **Configuration**
   ```bash
   # Copier les fichiers d'environnement
   cp .env.example .env
   cd project/backend
   cp .env.example .env
   ```

4. **Démarrer les services**
   ```bash
   # Backend (terminal 1)
   cd project/backend
   npm run dev
   
   # Frontend (terminal 2)
   cd project
   npm run dev
   ```

### Déploiement avec Docker

1. **Déploiement local avec Docker**
   ```bash
   # Utiliser le script automatisé
   ./deploy.sh deploy
   
   # Ou manuellement
   docker-compose up -d
   ```

2. **Déploiement sur VPS avec Dokploy**
   
   Suivez le guide complet dans [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Structure du Projet

```
Solene-Photographie-App/
├── project/                    # Frontend React
│   ├── src/                   # Code source React
│   ├── public/                # Assets statiques
│   ├── Dockerfile             # Dockerfile développement
│   ├── Dockerfile.prod        # Dockerfile production
│   ├── nginx-app.conf         # Configuration Nginx frontend
│   └── package.json
│   └── backend/               # Backend Node.js
│       ├── server.js          # Serveur Express
│       ├── Dockerfile         # Dockerfile backend
│       └── package.json
├── docker-compose.yml         # Configuration Docker Compose
├── nginx.conf                 # Configuration Nginx reverse proxy
├── deploy.sh                  # Script de déploiement automatisé
├── .env.example              # Variables d'environnement exemple
├── DEPLOYMENT.md             # Guide de déploiement complet
└── README.md                 # Ce fichier
```

## 🛠️ Scripts Disponibles

### Frontend (project/)
- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Aperçu du build
- `npm run lint` - Vérification du code

### Backend (project/backend/)
- `npm run dev` - Serveur de développement avec nodemon
- `npm start` - Serveur de production
- `npm test` - Tests unitaires

### Déploiement (racine)
- `./deploy.sh` - Menu interactif de déploiement
- `./deploy.sh deploy` - Déploiement complet
- `./deploy.sh build` - Construction des images
- `./deploy.sh start` - Démarrage des services
- `./deploy.sh stop` - Arrêt des services
- `./deploy.sh logs` - Affichage des logs
- `./deploy.sh status` - Statut des services

## 🌐 URLs de l'Application

### Développement
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

### Production
- Site web: https://solenetrmphotographie.fr
- API: https://api.solenetrmphotographie.fr
- Health Check: https://api.solenetrmphotographie.fr/health

## 🔧 Configuration

### Variables d'Environnement

Copiez `.env.example` vers `.env` et configurez :

```env
# URLs et Domaine
FRONTEND_URL=https://solenetrmphotographie.fr
BACKEND_URL=https://api.solenetrmphotographie.fr
DOMAIN=solenetrmphotographie.fr

# Configuration Node.js
NODE_ENV=production
BACKEND_PORT=3001
CORS_ORIGIN=https://solenetrmphotographie.fr

# Configuration Vite
VITE_API_URL=https://api.solenetrmphotographie.fr
```

## 🐳 Docker

### Images Docker

- **Frontend**: Multi-stage build avec Nginx
- **Backend**: Node.js optimisé avec utilisateur non-root
- **Reverse Proxy**: Nginx avec SSL automatique

### Commandes Docker Utiles

```bash
# Construire les images
docker-compose build

# Démarrer les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Nettoyer les images
docker image prune -a
```

## 📊 Monitoring

### Logs
```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f nginx
```

### Métriques
```bash
# Utilisation des ressources
docker stats

# Espace disque
docker system df
```

## 🔒 Sécurité

- Conteneurs non-root
- Headers de sécurité Nginx
- SSL/TLS automatique avec Let's Encrypt
- Variables d'environnement sécurisées
- Firewall configuré

## 🚀 Déploiement sur VPS

Pour déployer sur votre VPS Contabo avec Dokploy :

1. **Suivez le guide complet** : [DEPLOYMENT.md](./DEPLOYMENT.md)
2. **Prérequis** : VPS avec 2GB RAM, Docker installé
3. **Domaine** : DNS configuré pour pointer vers votre VPS
4. **SSL** : Certificat automatique avec Let's Encrypt

## 🆘 Support

- **Documentation** : [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues** : [GitHub Issues](https://github.com/VOTRE_USERNAME/Solene-Photographie-App/issues)
- **Logs** : Utilisez `./deploy.sh logs` pour diagnostiquer

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ pour Solene Photographie**