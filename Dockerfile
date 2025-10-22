# Dockerfile pour Solene Photographie App
# Utilise une approche simple avec serve pour éviter les problèmes de build
FROM node:18-slim

# Installer serve globalement
RUN npm install -g serve

# Définir le répertoire de travail
WORKDIR /app

# Copier le dossier dist (doit être buildé localement)
COPY dist ./dist

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["serve", "-s", "dist", "-l", "3000"]