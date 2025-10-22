# Solene Photographie App

Application web moderne pour Solene Photographie, développée avec React, TypeScript et Vite.

## 🚀 Démarrage rapide

### Développement local
```bash
npm install
npm run dev
```

### Production avec Docker
```bash
docker build -t solene-app .
docker run -p 3000:3000 solene-app
```

## 📁 Structure du projet

```
├── src/                 # Code source React/TypeScript
├── public/             # Assets statiques
├── dist/               # Build de production (généré)
├── package.json        # Dépendances et scripts
├── Dockerfile          # Configuration Docker
└── vite.config.ts      # Configuration Vite
```

## 🛠 Technologies

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Déploiement**: Docker

## 📦 Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Aperçu du build
- `npm run lint` - Linting du code

## 🐳 Déploiement

L'application est containerisée avec Docker pour un déploiement simple sur n'importe quelle plateforme (Dokploy, Vercel, etc.).