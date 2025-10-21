# Dockerfile pour Dokploy - Application React/Vite
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances du projet
COPY project/package*.json ./

# Installer les dépendances
RUN npm ci --only=production --silent

# Copier le code source du projet
COPY project/ .

# Build de l'application
RUN npm run build

# Stage production avec Nginx
FROM nginx:alpine AS production

# Copier la configuration nginx
COPY project/nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]