# Dockerfile simple et fiable pour Dokploy
FROM node:18-alpine

# Répertoire de travail
WORKDIR /app

# Copier package.json seulement
COPY project/package.json ./

# Installation propre des dépendances
RUN npm install

# Copier tout le code source
COPY project/ ./

# Build de l'application
RUN npm run build

# Installer serve globalement
RUN npm install -g serve

# Port d'exposition
EXPOSE 3000

# Commande de démarrage
CMD ["serve", "-s", "dist", "-l", "3000"]