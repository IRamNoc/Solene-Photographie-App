# Configuration DNS pour Solene Photographie

## 📋 État Actuel du DNS

### ✅ Configuré
- `solenetrmphotographie.fr` → `157.173.118.1`
- `www.solenetrmphotographie.fr` → `157.173.118.1`

### ❌ À Configurer
- `api.solenetrmphotographie.fr` → `157.173.118.1`
- Wildcard `*.solenetrmphotographie.fr` → `157.173.118.1` (optionnel mais recommandé)

## 🔧 Configuration Requise chez Hostinger

### Accès au Panneau DNS
1. Connectez-vous à votre compte Hostinger
2. Allez dans **Domaines** > **solenetrmphotographie.fr**
3. Cliquez sur **Gérer** > **Zone DNS**

### Enregistrements DNS à Ajouter

#### 1. Sous-domaine API (Obligatoire)
```
Type: A
Nom: api
Valeur: 157.173.118.1
TTL: 300 (ou Auto)
```

#### 2. Wildcard (Recommandé)
```
Type: A
Nom: *
Valeur: 157.173.118.1
TTL: 300 (ou Auto)
```

### Configuration Complète Recommandée

| Type  | Nom | Valeur           | TTL | Description                    |
|-------|-----|------------------|-----|--------------------------------|
| A     | @   | 157.173.118.1    | 300 | Domaine principal              |
| A     | www | 157.173.118.1    | 300 | Sous-domaine www               |
| A     | api | 157.173.118.1    | 300 | API backend                    |
| A     | *   | 157.173.118.1    | 300 | Wildcard pour tous sous-domaines |

## 🕐 Propagation DNS

Après avoir ajouté les enregistrements :
- **Délai de propagation** : 5 minutes à 24 heures
- **Vérification** : Utilisez les commandes ci-dessous

### Commandes de Vérification

```bash
# Vérifier le domaine principal
nslookup solenetrmphotographie.fr

# Vérifier le sous-domaine API
nslookup api.solenetrmphotographie.fr

# Vérifier le wildcard
nslookup test.solenetrmphotographie.fr

# Vérification avancée avec dig
dig api.solenetrmphotographie.fr
```

## 🌐 Alternative : Configuration via Dokploy

Si vous préférez, Dokploy peut gérer les sous-domaines automatiquement :

### 1. Configuration dans Dokploy
1. Accédez à l'interface Dokploy (`http://157.173.118.1:3000`)
2. Allez dans **Settings** > **Domains**
3. Ajoutez les domaines :
   - `solenetrmphotographie.fr`
   - `api.solenetrmphotographie.fr`

### 2. Proxy Reverse Automatique
Dokploy configurera automatiquement :
- Le proxy reverse Nginx
- Les certificats SSL Let's Encrypt
- La redirection HTTP vers HTTPS

## 🔒 Configuration SSL

Une fois les DNS configurés, les certificats SSL seront automatiquement générés pour :
- `solenetrmphotographie.fr`
- `www.solenetrmphotographie.fr`
- `api.solenetrmphotographie.fr`

## 🚀 Après Configuration DNS

### 1. Attendre la Propagation
```bash
# Tester toutes les 5 minutes jusqu'à ce que ça fonctionne
while ! nslookup api.solenetrmphotographie.fr; do
    echo "En attente de la propagation DNS..."
    sleep 300
done
echo "DNS propagé avec succès !"
```

### 2. Déployer l'Application
```bash
# Une fois les DNS configurés, déployez
./deploy.sh deploy
```

### 3. Vérifier le Déploiement
```bash
# Tester les endpoints
curl -I https://solenetrmphotographie.fr
curl -I https://api.solenetrmphotographie.fr/health
```

## 🛠️ Dépannage DNS

### Problèmes Courants

#### 1. DNS ne se propage pas
```bash
# Vider le cache DNS local
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Utiliser un serveur DNS différent
nslookup api.solenetrmphotographie.fr 8.8.8.8
```

#### 2. Erreur NXDOMAIN
- Vérifiez l'orthographe des enregistrements
- Attendez plus longtemps (jusqu'à 24h)
- Contactez le support Hostinger

#### 3. Certificat SSL non généré
- Vérifiez que les DNS pointent vers le bon serveur
- Redémarrez Dokploy : `docker restart dokploy`
- Vérifiez les logs : `docker logs dokploy`

### Outils de Diagnostic

```bash
# Vérifier depuis différents serveurs DNS
dig @8.8.8.8 api.solenetrmphotographie.fr
dig @1.1.1.1 api.solenetrmphotographie.fr

# Tracer la propagation DNS
dig +trace api.solenetrmphotographie.fr

# Vérifier les certificats SSL
openssl s_client -connect api.solenetrmphotographie.fr:443 -servername api.solenetrmphotographie.fr
```

## 📞 Support

### Hostinger
- **Support** : Panel client Hostinger
- **Documentation** : [Hostinger DNS Guide](https://support.hostinger.com/en/articles/1583227-how-to-manage-dns-records)

### Dokploy
- **Documentation** : [Dokploy Docs](https://dokploy.com/docs)
- **Community** : Discord Dokploy

---

## ✅ Checklist DNS

- [ ] Accès au panneau DNS Hostinger
- [ ] Enregistrement A pour `api` ajouté
- [ ] Enregistrement A wildcard `*` ajouté (optionnel)
- [ ] Propagation DNS vérifiée
- [ ] Tests de résolution réussis
- [ ] Déploiement effectué
- [ ] Certificats SSL générés
- [ ] Application accessible

**Une fois cette configuration terminée, votre application sera entièrement fonctionnelle !** 🎉