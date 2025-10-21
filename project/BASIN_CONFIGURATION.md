# Configuration Basin - Guide d'installation

## 🎯 Qu'est-ce que Basin ?

Basin est un service de formulaires qui remplace Formspree et offre des fonctionnalités supérieures :
- ✅ **Upload de fichiers gratuit** (jusqu'à 100MB par fichier)
- ✅ **Protection anti-spam intégrée**
- ✅ **Formulaires illimités**
- ✅ **Notifications email automatiques**
- ✅ **Dashboard pour gérer les soumissions**

## 📋 Étapes de configuration

### 1. Créer un compte Basin

1. Rendez-vous sur [usebasin.com](https://usebasin.com)
2. Cliquez sur "Sign Up" pour créer un compte gratuit
3. Confirmez votre email

### 2. Créer un nouveau formulaire

1. Dans votre dashboard Basin, cliquez sur "Create Form"
2. Donnez un nom à votre formulaire : `Solène Photographie - Contact`
3. Copiez l'URL du formulaire qui ressemble à :
   ```
   https://usebasin.com/f/VOTRE_FORM_ID
   ```

### 3. Configurer l'application

1. Ouvrez le fichier `src/config/formspree.ts`
2. Remplacez `YOUR_BASIN_FORM_ID` par votre véritable ID de formulaire :
   ```typescript
   CONTACT_FORM_ENDPOINT: 'https://usebasin.com/f/VOTRE_FORM_ID',
   ```

### 4. Configuration des notifications email

Dans votre dashboard Basin :

1. Allez dans les paramètres de votre formulaire
2. Section "Email Notifications" :
   - **To Email** : `solene@votre-domaine.com` (votre email professionnel)
   - **From Email** : `noreply@usebasin.com`
   - **Subject** : `Nouvelle demande de devis - {{firstName}} {{lastName}}`

3. Section "Email Template" - Utilisez ce template :
   ```
   Nouvelle demande de devis reçue !

   👤 INFORMATIONS CLIENT
   ═══════════════════════════════════════════════════════════════
   Nom : {{firstName}} {{lastName}}
   Email : {{email}}
   Téléphone : {{phone}}
   Lieu : {{location}}

   📸 SERVICES DEMANDÉS
   ═══════════════════════════════════════════════════════════════
   Services : {{services}}
   Formules : {{packages}}

   📝 DÉTAILS DU PROJET
   ═══════════════════════════════════════════════════════════════
   Description : {{description}}

   ❓ QUESTIONS SPÉCIFIQUES
   ═══════════════════════════════════════════════════════════════
   {{questions}}

   🖼️ IMAGES D'INSPIRATION
   ═══════════════════════════════════════════════════════════════
   Les images d'inspiration sont jointes à cette demande.

   ═══════════════════════════════════════════════════════════════
   Demande reçue le {{_date}} à {{_time}}
   ```

### 5. Configuration anti-spam

Dans les paramètres de votre formulaire Basin :

1. **Spam Protection** : Activé
2. **reCAPTCHA** : Optionnel (recommandé pour plus de sécurité)
3. **Honeypot** : Activé (protection invisible)

### 6. Test du formulaire

1. Allez sur votre site : `http://localhost:3003/contact`
2. Remplissez le formulaire avec des données de test
3. Ajoutez quelques images d'inspiration
4. Soumettez le formulaire
5. Vérifiez que vous recevez l'email et que les images sont jointes

## 🔧 Fonctionnalités activées

### Upload d'images
- ✅ **Limite** : 10 images maximum
- ✅ **Taille** : 100MB par fichier
- ✅ **Formats** : JPG, PNG, GIF, WebP
- ✅ **Sécurité** : Scan antivirus automatique

### Gestion des données
- ✅ **Dashboard** : Toutes les soumissions dans votre compte Basin
- ✅ **Export** : Possibilité d'exporter en CSV
- ✅ **API** : Accès programmatique aux données

## 🚀 Avantages par rapport à Formspree

| Fonctionnalité | Formspree Gratuit | Basin Gratuit |
|---|---|---|
| Upload de fichiers | ❌ | ✅ |
| Taille max fichier | - | 100MB |
| Formulaires | 1 | Illimités |
| Soumissions/mois | 50 | 100 |
| Anti-spam | Basique | Avancé |
| Dashboard | Limité | Complet |

## 🆘 Support et dépannage

### Problèmes courants

1. **Formulaire ne s'envoie pas** :
   - Vérifiez l'URL du formulaire dans `formspree.ts`
   - Assurez-vous que votre compte Basin est activé

2. **Images ne s'envoient pas** :
   - Vérifiez la taille des fichiers (max 100MB)
   - Vérifiez le format (JPG, PNG, GIF, WebP uniquement)

3. **Pas d'email reçu** :
   - Vérifiez les paramètres de notification dans Basin
   - Regardez dans vos spams

### Contact Basin
- **Documentation** : [docs.usebasin.com](https://docs.usebasin.com)
- **Support** : support@usebasin.com

## 📊 Monitoring

Dans votre dashboard Basin, vous pouvez :
- Voir toutes les soumissions en temps réel
- Télécharger les fichiers joints
- Exporter les données
- Configurer des webhooks pour l'intégration avec d'autres outils

---

**Note** : Cette configuration est déjà prête dans votre application. Il vous suffit de créer votre compte Basin et de remplacer l'ID du formulaire dans le fichier de configuration.