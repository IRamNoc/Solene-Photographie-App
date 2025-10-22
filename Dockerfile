# Dockerfile simple pour Solene Photographie App
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Installer serve pour servir l'application
RUN npm install -g serve

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["serve", "-s", "dist", "-l", "3000"]