# Guide de Déploiement - Solene Photographie App

## 📋 Vue d'ensemble

Ce guide vous accompagne dans le déploiement de l'application Solene Photographie sur votre VPS Contabo en utilisant Dokploy pour simplifier le processus.

## 🏗️ Architecture de l'Application

- **Frontend**: React + Vite (port 3000)
- **Backend**: Node.js + Express (port 3001)
- **Reverse Proxy**: Nginx (port 80/443)
- **Déploiement**: Docker + Docker Compose via Dokploy

## 📋 Prérequis

### Sur votre machine locale
- Git installé
- Accès SSH à votre VPS Contabo
- Nom de domaine configuré (`solenetrmphotographie.fr`)

### Sur votre VPS Contabo
- Ubuntu 20.04+ ou Debian 11+
- Minimum 2GB RAM, 30GB espace disque
- Accès root ou utilisateur avec privilèges sudo
- Port 22 (SSH), 80 (HTTP), 443 (HTTPS), 3000 (Dokploy) ouverts

## 🚀 Étape 1: Préparation du VPS

### 1.1 Connexion au VPS
```bash
ssh root@VOTRE_IP_VPS
```

### 1.2 Mise à jour du système
```bash
apt update && apt upgrade -y
apt install -y curl wget git ufw
```

### 1.3 Configuration du firewall
```bash
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 3000
ufw --force enable
```

### 1.4 Installation de Docker
```bash
# Désinstaller les anciennes versions
apt remove -y docker docker-engine docker.io containerd runc

# Installer les dépendances
apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Ajouter la clé GPG officielle de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Ajouter le repository Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installer Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Démarrer et activer Docker
systemctl start docker
systemctl enable docker

# Vérifier l'installation
docker --version
docker compose version
```

## 🔧 Étape 2: Installation de Dokploy

### 2.1 Installation via script officiel
```bash
curl -sSL https://dokploy.com/install.sh | sh
```

### 2.2 Vérification de l'installation
```bash
# Vérifier que Dokploy fonctionne
docker ps | grep dokploy
```

### 2.3 Accès à l'interface Dokploy
1. Ouvrez votre navigateur
2. Allez à `http://VOTRE_IP_VPS:3000`
3. Créez votre compte administrateur
4. Connectez-vous à l'interface

## 🌐 Étape 3: Configuration du Domaine

### 3.1 Configuration DNS
Dans votre registrar de domaine, configurez les enregistrements DNS :

```
Type    Nom                     Valeur
A       @                       VOTRE_IP_VPS
A       www                     VOTRE_IP_VPS
CNAME   *.solenetrmphotographie.fr   solenetrmphotographie.fr
```

### 3.2 Vérification DNS
```bash
# Vérifier la propagation DNS
nslookup solenetrmphotographie.fr
dig solenetrmphotographie.fr
```

## 📦 Étape 4: Préparation du Code

### 4.1 Cloner le repository sur le VPS
```bash
cd /opt
git clone https://github.com/VOTRE_USERNAME/Solene-Photographie-App.git
cd Solene-Photographie-App
```

### 4.2 Configuration des variables d'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env
nano .env
```

Configurez les variables suivantes dans `.env` :
```env
# URLs et Domaine
FRONTEND_URL=https://solenetrmphotographie.fr
BACKEND_URL=https://api.solenetrmphotographie.fr
DOMAIN=solenetrmphotographie.fr
SSL_EMAIL=votre-email@example.com

# Configuration Node.js
NODE_ENV=production
BACKEND_PORT=3001
CORS_ORIGIN=https://solenetrmphotographie.fr

# Configuration Vite (Frontend)
VITE_API_URL=https://api.solenetrmphotographie.fr

# Configuration optionnelle
UPLOAD_DIR=/app/uploads
MAX_FILE_SIZE=10485760
```

## 🐳 Étape 5: Déploiement avec Dokploy

### 5.1 Création du projet dans Dokploy

1. **Accédez à l'interface Dokploy** (`http://VOTRE_IP_VPS:3000`)

2. **Créer un nouveau projet** :
   - Cliquez sur "Create Project"
   - Nom : `solene-photographie`
   - Description : `Application de photographie professionnelle`

3. **Configurer le repository** :
   - Type : Git Repository
   - URL : `https://github.com/VOTRE_USERNAME/Solene-Photographie-App.git`
   - Branch : `main`

### 5.2 Configuration de l'application

1. **Type d'application** : Docker Compose

2. **Fichier Docker Compose** : `docker-compose.yml`

3. **Variables d'environnement** :
   Ajoutez toutes les variables de votre fichier `.env`

4. **Configuration des domaines** :
   - Domaine principal : `solenetrmphotographie.fr`
   - Domaine API : `api.solenetrmphotographie.fr`

### 5.3 Configuration SSL

1. **Activer SSL automatique** :
   - Cochez "Enable SSL"
   - Email : votre-email@example.com
   - Dokploy configurera automatiquement Let's Encrypt

2. **Redirection HTTPS** :
   - Cochez "Force HTTPS"

## 🚀 Étape 6: Déploiement

### 6.1 Premier déploiement
1. Dans Dokploy, cliquez sur "Deploy"
2. Surveillez les logs de déploiement
3. Attendez que tous les services soient "Running"

### 6.2 Vérification du déploiement
```bash
# Vérifier les conteneurs
docker ps

# Vérifier les logs
docker-compose logs -f

# Tester les endpoints
curl -I https://solenetrmphotographie.fr
curl -I https://api.solenetrmphotographie.fr/health
```

## 🔧 Étape 7: Configuration Post-Déploiement

### 7.1 Vérification des services

1. **Frontend** : `https://solenetrmphotographie.fr`
2. **Backend API** : `https://api.solenetrmphotographie.fr/health`
3. **Dokploy Interface** : `http://VOTRE_IP_VPS:3000`

### 7.2 Configuration des sauvegardes

Dans Dokploy :
1. Allez dans "Settings" > "Backups"
2. Configurez les sauvegardes automatiques
3. Testez la restauration

### 7.3 Monitoring

1. **Logs en temps réel** :
   ```bash
   docker-compose logs -f
   ```

2. **Monitoring des ressources** :
   ```bash
   docker stats
   ```

## 🛠️ Utilisation du Script de Déploiement

Un script automatisé est fourni pour simplifier les opérations :

```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Déploiement complet
./deploy.sh deploy

# Autres commandes disponibles
./deploy.sh build    # Construire les images
./deploy.sh start    # Démarrer les services
./deploy.sh stop     # Arrêter les services
./deploy.sh logs     # Afficher les logs
./deploy.sh status   # Statut des services
./deploy.sh health   # Vérifier la santé
./deploy.sh clean    # Nettoyer les images inutilisées

# Mode interactif
./deploy.sh
```

## 🔄 Mise à Jour de l'Application

### Via Dokploy (Recommandé)
1. Connectez-vous à l'interface Dokploy
2. Allez dans votre projet
3. Cliquez sur "Redeploy"
4. Surveillez les logs

### Via ligne de commande
```bash
cd /opt/Solene-Photographie-App
git pull origin main
./deploy.sh deploy
```

## 🐛 Dépannage

### Problèmes courants

1. **Erreur de connexion à la base de données** :
   ```bash
   # Vérifier les logs du backend
   docker-compose logs backend
   ```

2. **Problème SSL** :
   ```bash
   # Vérifier les certificats
   docker-compose logs nginx
   ```

3. **Service non accessible** :
   ```bash
   # Vérifier le statut des conteneurs
   docker ps
   
   # Vérifier les ports
   netstat -tlnp | grep :80
   netstat -tlnp | grep :443
   ```

### Commandes de diagnostic

```bash
# Vérifier l'état de Docker
systemctl status docker

# Vérifier l'utilisation des ressources
df -h
free -h
top

# Vérifier les logs système
journalctl -u docker -f

# Tester la connectivité
ping solenetrmphotographie.fr
curl -I https://solenetrmphotographie.fr
```

## 🔒 Sécurité

### Bonnes pratiques appliquées

1. **Conteneurs non-root** : Tous les services s'exécutent avec des utilisateurs non-privilégiés
2. **Secrets** : Variables d'environnement sécurisées
3. **Firewall** : Ports strictement nécessaires ouverts
4. **SSL/TLS** : Chiffrement automatique avec Let's Encrypt
5. **Headers de sécurité** : Configuration Nginx sécurisée

### Maintenance de sécurité

```bash
# Mise à jour régulière du système
apt update && apt upgrade -y

# Mise à jour des images Docker
docker-compose pull
docker-compose up -d

# Nettoyage des images obsolètes
docker image prune -a
```

## 📊 Monitoring et Logs

### Accès aux logs
```bash
# Logs de tous les services
docker-compose logs -f

# Logs d'un service spécifique
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f nginx

# Logs avec horodatage
docker-compose logs -f -t
```

### Métriques de performance
```bash
# Utilisation des ressources par conteneur
docker stats

# Espace disque
docker system df

# Informations système
docker system info
```

## 🆘 Support

### Ressources utiles
- [Documentation Dokploy](https://dokploy.com/docs)
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Nginx](https://nginx.org/en/docs/)

### Contacts
- Support technique : [Créer une issue GitHub]
- Documentation : Ce fichier DEPLOYMENT.md

---

## ✅ Checklist de Déploiement

- [ ] VPS configuré avec Docker
- [ ] Dokploy installé et accessible
- [ ] DNS configuré pour le domaine
- [ ] Code cloné sur le VPS
- [ ] Variables d'environnement configurées
- [ ] Projet créé dans Dokploy
- [ ] SSL configuré
- [ ] Premier déploiement réussi
- [ ] Tests de fonctionnement
- [ ] Sauvegardes configurées
- [ ] Monitoring en place

**Félicitations ! Votre application Solene Photographie est maintenant déployée et accessible sur https://solenetrmphotographie.fr** 🎉