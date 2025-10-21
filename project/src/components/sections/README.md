# Architecture des Sections - Principes SOLID

Cette refactorisation suit les principes SOLID pour une meilleure maintenabilité et évolutivité du code.

## 🏗️ Structure des Dossiers

```
src/
├── components/
│   ├── sections/           # Sections modulaires
│   │   ├── HeroSection/    # Section hero principale
│   │   ├── GallerySection/ # Section galerie
│   │   ├── AboutSection/   # Section à propos
│   │   └── index.ts        # Exports centralisés
│   └── [autres composants] # Composants existants
├── pages/
│   └── Home.tsx           # Page d'accueil refactorisée
├── hooks/
│   └── useAnimation.ts    # Hooks personnalisés
├── constants/
│   └── styles.ts          # Constantes de styles
└── [autres dossiers]
```

## 📋 Principes SOLID Appliqués

### 1. **S**ingle Responsibility Principle (SRP)
- Chaque composant a une responsabilité unique
- `PhotographyDefinitions` : Affiche uniquement les définitions
- `CaptureCallToAction` : Gère uniquement le CTA
- `GalleryGrid` : Affiche uniquement la grille d'images

### 2. **O**pen/Closed Principle (OCP)
- Les composants sont ouverts à l'extension, fermés à la modification
- Utilisation de props pour personnaliser le comportement
- Styles externalisés dans des constantes

### 3. **L**iskov Substitution Principle (LSP)
- Les composants peuvent être remplacés par leurs variantes
- Interface cohérente entre tous les composants de section

### 4. **I**nterface Segregation Principle (ISP)
- Interfaces spécifiques pour chaque type de composant
- Pas de dépendances inutiles

### 5. **D**ependency Inversion Principle (DIP)
- Dépendance sur des abstractions (hooks, constantes)
- Inversion de contrôle via les props

## 🔧 Utilisation

### Import des composants
```typescript
// Import individuel
import HeroSection from './sections/HeroSection/HeroSection';

// Import groupé
import { HeroSection, GallerySection, AboutSection } from './sections';
```

### Utilisation dans une page
```typescript
const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <GallerySection />
      <AboutSection />
    </div>
  );
};
```

## 🎨 Styles et Constantes

Les styles sont centralisés dans `constants/styles.ts` :
- `COLORS` : Palette de couleurs
- `SPACING` : Espacements responsifs
- `TYPOGRAPHY` : Tailles de police responsives
- `ANIMATIONS` : Configurations d'animations

## 🪝 Hooks Personnalisés

- `useAnimation` : Gestion des animations d'apparition
- `useDelayedAnimation` : Animations avec délai

## 📈 Avantages de cette Architecture

1. **Maintenabilité** : Code modulaire et organisé
2. **Réutilisabilité** : Composants indépendants
3. **Testabilité** : Composants isolés faciles à tester
4. **Évolutivité** : Ajout facile de nouvelles sections
5. **Performance** : Lazy loading possible par section
6. **Collaboration** : Équipes peuvent travailler sur différentes sections

## 🔄 Migration depuis l'Ancien Code

L'ancien composant `Hero.tsx` monolithique a été décomposé en :
- `HeroSection` : Container principal
- `PhotographyDefinitions` : Bloc des définitions
- `CaptureCallToAction` : Bloc citation + bouton
- `GallerySection` : Section galerie
- `AboutSection` : Section à propos

La page `Home.tsx` orchestre maintenant ces composants modulaires.