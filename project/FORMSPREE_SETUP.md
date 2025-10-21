# 📧 Configuration Formspree pour le Formulaire de Contact

## 🚀 Guide Complet de Configuration

### 1. **Créer votre compte Formspree** (GRATUIT)
1. Allez sur [formspree.io](https://formspree.io)
2. Cliquez sur **"Sign Up"**
3. Créez un compte avec votre email professionnel
4. Confirmez votre email
5. Connectez-vous au dashboard

### 2. **Créer votre formulaire de contact**
1. Dans le dashboard, cliquez sur **"+ New Form"**
2. Nommez votre formulaire : **"Contact Solène Photographie"**
3. Dans **"Send emails to"**, entrez : **`solenetrm.photographie@gmail.com`**
4. Cliquez sur **"Create Form"**

### 3. **Récupérer votre endpoint unique**
1. Formspree vous donnera un endpoint unique comme : `https://formspree.io/f/VOTRE_ID_UNIQUE`
2. **Copiez cet ID** (ex: `xpwzgqpv`)

### 4. **Configurer votre application**
1. Ouvrez le fichier : `src/config/formspree.ts`
2. Remplacez `YOUR_FORMSPREE_ID` par votre vrai ID :
   ```typescript
   CONTACT_FORM_ENDPOINT: 'https://formspree.io/f/VOTRE_VRAI_ID',
   ```

### 5. **Configuration avancée (optionnel)**
Dans votre dashboard Formspree, vous pouvez :
- **Personnaliser l'email de notification**
- **Ajouter des redirections après envoi**
- **Configurer des réponses automatiques**
- **Voir les statistiques d'envoi**

### 6. **Fonctionnalités incluses**
Votre formulaire envoie automatiquement :
- ✅ Informations client (nom, email, téléphone, localisation)
- ✅ Services sélectionnés avec packages et prix
- ✅ Description du projet
- ✅ Questions spécifiques
- ✅ Images jointes (jusqu'à 10 images, 5MB max)
- ✅ Email formaté professionnellement
- ✅ Validation côté client
- ✅ Gestion d'erreurs améliorée

### 7. **Test du formulaire**
1. Sauvegardez vos modifications
2. Redémarrez votre serveur de développement
3. Allez sur la page Contact
4. Remplissez et soumettez le formulaire
5. Vérifiez votre boîte email

## Format de l'email reçu
L'email contiendra :
```
=== NOUVELLE DEMANDE DE DEVIS - SOLÈNE PHOTOGRAPHIE ===

INFORMATIONS CLIENT :
- Nom : [nom du client]
- Email : [email du client]
- Téléphone : [téléphone du client]

SERVICES DEMANDÉS :
[Liste des services et packages sélectionnés]

DÉTAILS DU PROJET :
- Date souhaitée : [date]
- Lieu : [lieu]
- Budget estimé : [budget]

QUESTIONS SPÉCIFIQUES :
[Questions du client]

FICHIERS JOINTS :
[Liste des images jointes]
```

## Note importante
L'endpoint actuel `xpwzgqpv` est un placeholder et doit être remplacé par votre vrai endpoint Formspree.