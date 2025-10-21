# Configuration Google Drive pour les Brochures

## 🎯 Objectif
Créer des liens de téléchargement direct pour vos brochures PDF.

## 📋 Étapes à suivre

### 1. Upload sur Google Drive
1. Aller sur [drive.google.com](https://drive.google.com)
2. Créer un dossier "Brochures Solène"
3. Uploader vos 6 PDFs :
   - brochure-mariage.pdf
   - brochure-famille.pdf
   - brochure-shooting.pdf
   - brochure-evenementiel.pdf
   - brochure-professionnel.pdf
   - brochure-autres.pdf

### 2. Obtenir les liens de partage
Pour chaque PDF :
1. Clic droit → "Obtenir le lien"
2. Changer "Accès restreint" → "Tous les utilisateurs ayant le lien"
3. Copier le lien

### 3. Transformer en lien de téléchargement
**Lien normal :**
```
https://drive.google.com/file/d/1ABC123XYZ/view?usp=sharing
```

**Lien de téléchargement direct :**
```
https://drive.google.com/uc?export=download&id=1ABC123XYZ
```

### 4. Mettre à jour le code
Remplacer dans `src/services/emailService.ts` :
```typescript
const BROCHURE_LINKS = {
  'mariage': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_MARIAGE',
  'famille': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_FAMILLE',
  'shooting': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_SHOOTING',
  'evenementiel': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_EVENEMENTIEL',
  'professionnel': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_PROFESSIONNEL',
  'autres': 'https://drive.google.com/uc?export=download&id=VOTRE_ID_AUTRES'
};
```

## ✅ Résultat
Les utilisateurs recevront des liens directs qui téléchargent automatiquement les PDFs !