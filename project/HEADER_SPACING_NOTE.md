# NOTE IMPORTANTE - ESPACEMENT HEADER FIXE

## Problème identifié
Le header est en position fixe et cache le contenu en haut de toutes les pages.

## Solution appliquée 
Ajouter un `padding-top` de **192px** (pt-48 en Tailwind) à toutes les pages pour compenser :
- ~~Barre d'annonce : 40px~~ **SUPPRIMÉE**
- Logo + Navigation : ~120px
- **Espacement optimal cohérent avec accueil/à propos : ~192px**

## Pages à modifier
- ✅ **Prestations.tsx** - FAIT
- ❌ **Page d'accueil (Home/Index)**
- ❌ **À propos**
- ❌ **Galeries**
- ❌ **Boutique**
- ❌ **Contact**
- ❌ **Toute nouvelle page créée**

## Code à appliquer
```tsx
{/* IMPORTANT: pt-48 pour espacement cohérent avec les autres pages (accueil, à propos) */}
<section className="pt-48 pb-20 px-8 md:px-16 lg:px-24">
  {/* Contenu de la page */}
</section>
```

## Alternative responsive
Pour un espacement plus précis selon les écrans :
```tsx
className="pt-44 md:pt-48 lg:pt-52"
```

---
**Date de création :** $(date)
**Statut :** En cours d'application sur toutes les pages