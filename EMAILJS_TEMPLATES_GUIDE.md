# Guide de Configuration des Templates EmailJS

## 📧 Templates à créer dans votre Dashboard EmailJS

Vous devez créer **2 templates** dans votre dashboard EmailJS avec les IDs suivants :

### 1. Template pour les Brochures : `template_brochure`

**Configuration de l'email de destination :**
- Dans EmailJS Dashboard, configurez le champ "To Email" avec `{{user_email}}` pour que l'email soit envoyé dynamiquement au client

**Variables disponibles :**
- `{{to_name}}` : Nom de l'utilisateur (pour la salutation)
- `{{categories}}` : Liste des catégories sélectionnées (séparées par des virgules)
- `{{brochure_links}}` : Liens de téléchargement formatés en HTML
- `{{user_name}}` : Nom du client
- `{{user_email}}` : Email du client
- `{{user_phone}}` : Téléphone du client
- `{{user_message}}` : Message du client

**Template HTML (utilisez exactement ce code) :**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Téléchargez vos brochures</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #8B4513;">Découvrez mes prestations 📸</h2>
        
        <p>Bonjour {{to_name}},</p>
        <p>Merci pour votre demande de brochures !</p>
        <p>J'espère que mon travail vous plaira ✨</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Catégories demandées : {{categories}}</h3>
            
            <h3>Liens de téléchargement :</h3>
            <div style="white-space: pre-line;">{{brochure_links}}</div>
        </div>
        
        <p>N'hésitez pas à me contacter si vous avez des questions !</p>
        <p>Bien à vous,<br><strong>Solène</strong><br>Photographe Professionnelle</p>
        
        <p style="font-size: 12px; color: #666;"><em>📧 solenetrm.photographie@gmail.com</em></p>
    </div>
</body>
</html>
```

### 2. Template pour le Contact : `template_contact`

**Variables disponibles :**
- `{{user_name}}` : Nom de l'utilisateur
- `{{user_email}}` : Email de l'utilisateur
- `{{user_phone}}` : Téléphone de l'utilisateur (optionnel)
- `{{user_message}}` : Message de l'utilisateur
- `{{subject}}` : Sujet du message

**Template HTML suggéré :**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nouveau message de contact</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #8B4513;">Nouveau message de contact</h2>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p><strong>Nom :</strong> {{user_name}}</p>
            <p><strong>Email :</strong> {{user_email}}</p>
            {{#user_phone}}
            <p><strong>Téléphone :</strong> {{user_phone}}</p>
            {{/user_phone}}
            <p><strong>Sujet :</strong> {{subject}}</p>
        </div>
        
        <h3>Message :</h3>
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; white-space: pre-wrap;">{{user_message}}</div>
        
        <div style="margin-top: 20px; padding: 10px; background-color: #e8f4f8; border-radius: 5px;">
            <p><small>Ce message a été envoyé depuis le site web de Solène TRM Photographie.</small></p>
        </div>
    </div>
</body>
</html>
```

## 🔧 Étapes de Configuration

### 1. Accédez à votre Dashboard EmailJS
- Connectez-vous sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Allez dans la section "Email Templates"

### 2. Créez le Template Brochure
1. Cliquez sur "Create New Template"
2. **Template ID** : `template_brochure`
3. **Template Name** : "Envoi de Brochures"
4. Copiez-collez le HTML fourni ci-dessus
5. Configurez l'email de destination (votre email)
6. Testez le template

### 3. Créez le Template Contact
1. Cliquez sur "Create New Template"
2. **Template ID** : `template_contact`
3. **Template Name** : "Formulaire de Contact"
4. Copiez-collez le HTML fourni ci-dessus
5. Configurez l'email de destination (votre email)
6. Testez le template

### 4. Vérifiez votre Service
- Assurez-vous que votre service `service_8wu5o0w` est bien configuré
- Vérifiez que votre Public Key `7G8a_mkU2RFlnsv7O` est active

## ✅ Test de Fonctionnement

Une fois les templates créés, vous pourrez :

1. **Tester l'envoi de brochures** :
   - Ouvrir le modal de brochures sur votre site
   - Sélectionner des catégories
   - Remplir le formulaire
   - Vérifier la réception de l'email avec les liens Google Drive

2. **Tester le formulaire de contact** :
   - Utiliser le formulaire de contact du site
   - Vérifier la réception de l'email de contact

## 🚨 Points Importants

- Les **Template IDs** doivent correspondre exactement : `template_brochure` et `template_contact`
- Remplacez les informations de contact dans les templates par vos vraies coordonnées
- Testez toujours les templates avant la mise en production
- Les liens Google Drive sont déjà configurés et fonctionnels

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez que les Template IDs correspondent
2. Testez les templates dans le dashboard EmailJS
3. Vérifiez la console du navigateur pour les erreurs
4. Assurez-vous que votre quota EmailJS n'est pas dépassé