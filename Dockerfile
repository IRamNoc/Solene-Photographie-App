# Dockerfile pour Solene Photographie App - Multi-stage build pour Dokploy
FROM --platform=linux/amd64 node:18-slim AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Installer toutes les dépendances (dev incluses pour le build)
# Note: On évite de copier package-lock.json pour contourner le bug npm/rollup
RUN npm install

# Copier le code source
COPY src ./src
COPY public ./public
COPY index.html ./

# Build l'application
RUN npm run build

# Stage de production
FROM --platform=linux/amd64 node:18-slim AS production

# Installer serve globalement
RUN npm install -g serve

# Définir le répertoire de travail
WORKDIR /app

# Copier le build depuis le stage builder
COPY --from=builder /app/dist ./dist

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["serve", "-s", "dist", "-l", "3000"]