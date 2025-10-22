import { lazy } from 'react';

// Pages principales (chargées immédiatement)
export { default as Home } from '../pages/Home';
export { default as About } from '../pages/About';
export { default as Contact } from '../components/Contact';

// Pages secondaires (lazy loading)
export const Prestations = lazy(() => import('../pages/Prestations'));
export const PrestationsMenu = lazy(() => import('../pages/PrestationsMenu'));
export const MariagePage = lazy(() => import('../pages/prestations/MariagePage'));
export const ShootingPage = lazy(() => import('../pages/prestations/ShootingPage'));
export const FamillePage = lazy(() => import('../pages/prestations/FamillePage'));
export const ProfessionnelPage = lazy(() => import('../pages/prestations/ProfessionnelPage'));
export const EvenementielPage = lazy(() => import('../pages/prestations/EvenementielPage'));
export const AutresPage = lazy(() => import('../pages/prestations/AutresPage'));
export const ShopPage = lazy(() => import('../pages/Shop'));
export const CGV = lazy(() => import('../pages/CGV'));
export const MentionsLegales = lazy(() => import('../pages/MentionsLegales'));

// Composants shop (lazy loading)
export const GiftCard = lazy(() => import('../components/shop/GiftCard'));
export const Collection = lazy(() => import('../components/shop/Collection'));

// Composants galerie (lazy loading)
export const GalleryList = lazy(() => import('../components/gallery/GalleryList'));