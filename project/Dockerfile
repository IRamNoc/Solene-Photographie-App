# Dockerfile simple et fiable pour Dokploy
FROM node:18-alpine

# Répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installation des dépendances (toutes pour le build)
RUN npm install && npm cache clean --force

# Copier tout le code source
COPY . ./

# Build de l'application
RUN npm run build

# Installer serve globalement
RUN npm install -g serve

# Port d'exposition
EXPOSE 3000

# Commande de démarrage
CMD ["serve", "-s", "dist", "-l", "3000", "--host", "0.0.0.0"]