# 🚀 Configuration Dokploy - Solène Photographie

## ✅ Prérequis
- Dockerfile à la racine du projet ✓
- .dockerignore configuré ✓
- Build local testé et fonctionnel ✓

## 📋 Étapes de configuration Dokploy

### 1. Créer une nouvelle application
- Aller dans Dokploy
- Cliquer sur "New Application"
- Choisir "Docker" comme type

### 2. Configuration Git
- **Repository URL**: `https://github.com/[votre-username]/Solene-Photographie-App`
- **Branch**: `main`
- **Build Path**: `/` (racine du projet)

### 3. Configuration Docker
- **Dockerfile Path**: `./Dockerfile` (à la racine)
- **Build Context**: `.` (racine du projet)
- **Port**: `3000`

### 4. Variables d'environnement
Aucune variable spéciale requise pour cette configuration simple.

### 5. Configuration réseau
- **Port interne**: `3000`
- **Port externe**: Laissez Dokploy assigner automatiquement
- **Protocole**: HTTP

### 6. Déploiement
- Cliquer sur "Deploy"
- Attendre la fin du build
- Vérifier les logs pour s'assurer qu'il n'y a pas d'erreurs

## 🔧 Structure finale du projet

```
Solene-Photographie-App/
├── Dockerfile              # ← Dockerfile principal pour Dokploy
├── .dockerignore           # ← Exclusions pour le build
├── project/                # ← Code source de l'application
│   ├── package.json
│   ├── src/
│   └── ...
└── DOKPLOY-SETUP.md       # ← Ce fichier
```

## ✨ Points clés de cette configuration

1. **Dockerfile ultra-simple** : Une seule étape, pas de multi-stage
2. **Installation complète** : `npm install` (pas `--only=production`)
3. **Serve simple** : Utilise `serve` au lieu de Nginx
4. **Port fixe** : 3000 pour éviter les conflits
5. **Build propre** : .dockerignore exclut tout ce qui n'est pas nécessaire

## 🚨 Troubleshooting

Si le déploiement échoue :
1. Vérifier les logs Dokploy
2. S'assurer que le Dockerfile est à la racine
3. Vérifier que le port 3000 est bien exposé
4. Redéployer si nécessaire

Cette configuration a été testée localement et fonctionne parfaitement ! 🎉