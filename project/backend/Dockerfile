# Dockerfile optimisé pour la production
FROM node:18-alpine

# Installer les dépendances système nécessaires
RUN apk add --no-cache \
    libc6-compat \
    vips-dev \
    curl \
    && rm -rf /var/cache/apk/*

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances de production seulement
RUN npm ci --only=production && npm cache clean --force

# Copier le code source
COPY . .

# Créer le dossier uploads avec les bonnes permissions
RUN mkdir -p uploads && \
    chown -R nodejs:nodejs /app

# Changer vers l'utilisateur non-root
USER nodejs

# Exposer le port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Commande de démarrage pour la production
CMD ["npm", "start"]