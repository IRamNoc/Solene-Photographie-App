# Dockerfile simple et efficace pour application React/Vite

FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Supprimer node_modules et package-lock.json s'ils existent
RUN rm -rf node_modules package-lock.json

# Installation propre des dépendances
RUN npm install

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Installer serve pour servir l'application
RUN npm install -g serve

# Exposer le port 3000
EXPOSE 3000

# Servir l'application buildée
CMD ["serve", "-s", "dist", "-l", "3000"]