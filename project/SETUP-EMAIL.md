# 📧 Configuration Email - Solution Simple

## 🎯 Solution Choisie : EmailJS (Frontend uniquement)

### ✅ Avantages
- ✅ **Aucun serveur backend nécessaire**
- ✅ **Fonctionne en développement ET production**
- ✅ **Configuration simple en 5 minutes**
- ✅ **Gratuit jusqu'à 200 emails/mois**
- ✅ **Pas de MongoDB ou base de données**

---

## 🚀 Configuration en 3 étapes

### **Étape 1 : Créer un compte EmailJS**
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Confirmez votre email

### **Étape 2 : Configurer le service email**
1. Dans le dashboard EmailJS, cliquez sur **"Add New Service"**
2. Choisissez votre fournisseur email :
   - **Gmail** (recommandé pour débuter)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Ou votre serveur SMTP personnalisé**

3. Suivez les instructions pour connecter votre email
4. **Notez le SERVICE_ID** (ex: `service_abc123`)

### **Étape 3 : Créer un template d'email**
1. Cliquez sur **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ce contenu :

**Sujet :**
```
Demande de brochures - Solène Photographie
```

**Contenu :**
```
Bonjour,

Vous avez demandé les brochures pour les catégories suivantes :
{{categories}}

Voici les liens de téléchargement :
{{brochure_links}}

Cordialement,
Solène Photographie

---
Email envoyé à : {{to_email}}
```

4. **Notez le TEMPLATE_ID** (ex: `template_xyz789`)

---

## ⚙️ Configuration du code

### **Modifier le fichier de service**
Ouvrez `src/services/emailService.ts` et remplacez :

```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Remplacez par votre SERVICE_ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Remplacez par votre TEMPLATE_ID  
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Trouvez dans Account > API Keys
```

### **Où trouver la PUBLIC_KEY**
1. Dans EmailJS, allez dans **Account > API Keys**
2. Copiez la **Public Key**

---

## 🧪 Test

1. Démarrez votre application : `npm run dev`
2. Ouvrez le modal de brochures
3. Entrez votre email
4. Sélectionnez des catégories
5. Cliquez sur "Envoyer"

---

## 🌐 Déploiement en Production

### **Aucune configuration supplémentaire !**
- ✅ Les mêmes identifiants fonctionnent en production
- ✅ Pas de variables d'environnement serveur
- ✅ Pas de configuration SMTP complexe

### **Pour votre serveur de production :**
1. Buildez l'application : `npm run build`
2. Déployez le dossier `dist/`
3. **C'est tout !**

---

## 🔧 Alternative : Configuration SMTP personnalisée

Si vous préférez utiliser votre propre serveur email :

1. Dans EmailJS, choisissez **"Custom SMTP"**
2. Configurez avec vos paramètres :
   - **Host :** `mail.votre-domaine.com`
   - **Port :** `587` (ou 465 pour SSL)
   - **Username :** `votre-email@domaine.com`
   - **Password :** `votre-mot-de-passe`

---

## 📊 Limites et Tarifs

### **Plan Gratuit :**
- ✅ 200 emails/mois
- ✅ Parfait pour débuter

### **Plan Payant (à partir de 15$/mois) :**
- ✅ 50,000 emails/mois
- ✅ Support prioritaire
- ✅ Statistiques avancées

---

## 🆘 Dépannage

### **Email non reçu ?**
1. Vérifiez les spams
2. Vérifiez la configuration du template
3. Testez avec un autre email

### **Erreur de configuration ?**
1. Vérifiez les IDs dans `emailService.ts`
2. Vérifiez que le service email est actif
3. Consultez les logs dans la console du navigateur

---

## 📞 Support

- **Documentation EmailJS :** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **Support EmailJS :** [https://www.emailjs.com/support/](https://www.emailjs.com/support/)