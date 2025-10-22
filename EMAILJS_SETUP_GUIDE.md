# Guide de Configuration EmailJS

## 🚨 PROBLÈME ACTUEL
L'erreur "Account not found" indique que les identifiants EmailJS ne sont pas valides.

## 📋 ÉTAPES À SUIVRE

### 1. Créer un compte EmailJS
1. Allez sur https://www.emailjs.com/
2. Cliquez sur "Sign Up" 
3. Créez votre compte avec l'email : **solenetrm.photographie@gmail.com**

### 2. Configurer un service email
1. Dans le dashboard EmailJS, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez "Gmail" 
4. Connectez votre compte Gmail : **solenetrm.photographie@gmail.com**
5. **NOTEZ LE SERVICE ID** (ex: service_xxxxxxx)

### 3. Obtenir votre Public Key
1. Dans le dashboard, allez dans "Account" → "General"
2. **COPIEZ VOTRE PUBLIC KEY** (ex: user_xxxxxxxxx)

### 4. Créer les templates
#### Template pour les brochures (ID: template_brochure)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Téléchargez votre brochure</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #8B4513;">Découvrez mes prestations 📸</h2>
        
        <p>Merci pour votre demande de brochures !</p>
        <p>J'espère que mon travail vous plaira ✨</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Catégories demandées : {{categories}}</h3>
            
            <h3>Liens de téléchargement :</h3>
            <div style="white-space: pre-line;">{{brochure_links}}</div>
        </div>
        
        <p>Bien à vous,<br>Solène</p>
    </div>
</body>
</html>
```

#### Template pour le contact (ID: template_contact)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nouveau message de contact</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Nouveau message de contact</h2>
        
        <p><strong>Nom :</strong> {{from_name}}</p>
        <p><strong>Email :</strong> {{from_email}}</p>
        <p><strong>Téléphone :</strong> {{phone}}</p>
        <p><strong>Sujet :</strong> {{subject}}</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Message :</h3>
            <p>{{message}}</p>
        </div>
    </div>
</body>
</html>
```

### 5. Mettre à jour la configuration
Une fois que vous avez vos vrais identifiants, remplacez dans le fichier `src/config/emailjs.ts` :

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'VOTRE_VRAI_SERVICE_ID', // Remplacez par le vrai
  TEMPLATE_ID_CONTACT: 'template_contact',
  TEMPLATE_ID_BROCHURE: 'template_brochure', 
  PUBLIC_KEY: 'VOTRE_VRAIE_PUBLIC_KEY', // Remplacez par la vraie
  // ... reste de la config
};
```

## 🔧 CONFIGURATION DES EMAILS

### Pour recevoir les brochures sur votre email
Si vous voulez que les brochures soient envoyées à **solenetrm.photographie@gmail.com** au lieu de l'email du client, modifiez dans `emailService.ts` :

```typescript
to_email: 'solenetrm.photographie@gmail.com', // Au lieu de requestData.email
```

### Pour recevoir une copie des demandes
Ajoutez un champ BCC dans le template EmailJS pour recevoir une copie.

## ⚠️ IMPORTANT
- Les identifiants actuels (7G8a_mkU2RFlnsv7O et service_8wu5o0w) ne sont PAS valides
- Vous DEVEZ créer votre propre compte EmailJS
- Testez d'abord avec un template simple avant d'utiliser le HTML complexe

## 🧪 TEST
Une fois configuré, testez avec le formulaire de l'application pour vérifier que tout fonctionne.