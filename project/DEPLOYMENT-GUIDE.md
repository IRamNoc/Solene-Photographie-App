# 🚀 Guide de Déploiement - VPS Contabo + Dokploy

## 📋 Prérequis
- VPS Contabo configuré
- Nom de domaine pointant vers votre VPS
- Repository GitHub avec votre code

## 🔧 Étape 1 : Configuration Initiale du VPS

### Connexion et Sécurisation
```bash
# Connexion SSH
ssh root@VOTRE_IP_VPS

# Mise à jour du système
apt update && apt upgrade -y

# Création d'un utilisateur non-root
adduser deploy
usermod -aG sudo deploy

# Configuration SSH pour l'utilisateur deploy
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Désactiver la connexion root SSH (optionnel mais recommandé)
# nano /etc/ssh/sshd_config
# PermitRootLogin no
# systemctl restart ssh
```

### Installation de Docker
```bash
# Installation de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Ajouter l'utilisateur au groupe docker
usermod -aG docker deploy

# Démarrer Docker
systemctl enable docker
systemctl start docker
```

### Configuration du Firewall
```bash
# Installation et configuration d'UFW
apt install ufw -y

# Règles de base
ufw default deny incoming
ufw default allow outgoing

# Autoriser SSH, HTTP et HTTPS
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp

# Activer le firewall
ufw enable
```

## 🚀 Étape 2 : Installation de Dokploy

### Installation Automatique
```bash
# Se connecter en tant qu'utilisateur deploy
su - deploy

# Installation de Dokploy
curl -sSL https://dokploy.com/install.sh | sh
```

### Configuration Initiale
1. Accéder à `http://VOTRE_IP:3000`
2. Créer un compte administrateur
3. Configurer votre domaine

## 📦 Étape 3 : Préparation du Repository GitHub

### Structure Requise
Votre projet est déjà prêt avec :
- ✅ `Dockerfile` optimisé
- ✅ `docker-compose.prod.yml` configuré
- ✅ `.env.prod` pour la production
- ✅ Configuration Nginx

### Variables d'Environnement à Configurer dans Dokploy
```
NODE_ENV=production
```

## 🌐 Étape 4 : Déploiement avec Dokploy

### Création de l'Application
1. **Nouvelle Application** → **GitHub**
2. **Repository** : `votre-username/solene-photographie-app`
3. **Branch** : `main`
4. **Build Path** : `/project`
5. **Docker Compose** : `docker-compose.prod.yml`

### Configuration du Domaine
1. **Domaines** → **Ajouter un domaine**
2. **Domaine** : `votre-domaine.com`
3. **SSL** : Activer Let's Encrypt
4. **Port** : `3000`

### Variables d'Environnement
Dans Dokploy, ajouter :
```
NODE_ENV=production
```

## 🔍 Étape 5 : Vérification et Tests

### Vérifications Post-Déploiement
- [ ] Site accessible via HTTPS
- [ ] Certificat SSL valide
- [ ] Formulaire de brochures fonctionnel
- [ ] EmailJS opérationnel
- [ ] Images et assets chargés

### Monitoring
- Logs disponibles dans Dokploy
- Métriques de performance
- Alertes en cas de problème

## 🛠️ Commandes Utiles

### Gestion des Containers
```bash
# Voir les containers actifs
docker ps

# Logs de l'application
docker logs solene-photo-app

# Redémarrer l'application
docker restart solene-photo-app
```

### Gestion Dokploy
```bash
# Redémarrer Dokploy
sudo systemctl restart dokploy

# Logs Dokploy
sudo journalctl -u dokploy -f
```

## 🚨 Dépannage

### Problèmes Courants
1. **Port 3000 occupé** : Vérifier les services actifs
2. **SSL non généré** : Vérifier la configuration DNS
3. **Build échoué** : Vérifier les logs dans Dokploy

### Support
- Documentation Dokploy : https://docs.dokploy.com
- Community Discord : https://discord.gg/dokploy

## 📈 Optimisations Post-Déploiement

### Performance
- Configuration CDN (Cloudflare)
- Compression Gzip (déjà configurée)
- Cache des assets statiques

### Sécurité
- Fail2ban pour SSH
- Monitoring des logs
- Sauvegardes automatiques

### Monitoring
- Uptime monitoring
- Performance monitoring
- Alertes email/SMS