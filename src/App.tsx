import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import FooterSection from './components/sections/FooterSection/FooterSection';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import ResourcePreloader from './components/ResourcePreloader';

// Import des composants avec lazy loading
import {
  Home,
  About,
  Contact,
  Prestations,
  PrestationsMenu,
  MariagePage,
  ShootingPage,
  FamillePage,
  ProfessionnelPage,
  EvenementielPage,
  AutresPage,
  ShopPage,
  CGV,
  MentionsLegales,
  GiftCard,
  Collection,
  GalleryList
} from './components/LazyComponents';

const AnimatedRoutes = React.memo(() => {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        }>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/prestations" element={<PrestationsMenu />} />
            <Route path="/prestations/mariage" element={<MariagePage />} />
            <Route path="/prestations/shooting" element={<ShootingPage />} />
            <Route path="/prestations/famille" element={<FamillePage />} />
            <Route path="/prestations/professionnel" element={<ProfessionnelPage />} />
            <Route path="/prestations/evenementiel" element={<EvenementielPage />} />
            <Route path="/prestations/autres" element={<AutresPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<GalleryList />} />
            <Route path="/boutique" element={<ShopPage />} />
            <Route path="/boutique/carte-cadeau" element={<GiftCard />} />
            <Route path="/boutique/collection/:collectionId" element={<Collection />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/legal/mentions" element={<MentionsLegales />} />
            {/* Route catch-all pour rediriger vers la page d'accueil */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
});

AnimatedRoutes.displayName = 'AnimatedRoutes';

function App() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    // Vérifier si c'est la première visite de la session
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // Première visite - afficher le loading screen
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 2000); // Durée optimisée à 2 secondes
      
      return () => clearTimeout(timer);
    } else {
      // Visite suivante - pas de loading screen
      setShowLoadingScreen(false);
      setIsFirstLoad(false);
    }
  }, []);

  return (
    <Router>
      <ResourcePreloader />
      
      {/* LoadingScreen seulement au premier chargement */}
      <AnimatePresence>
        {isFirstLoad && showLoadingScreen && (
          <LoadingScreen isLoading={showLoadingScreen} />
        )}
      </AnimatePresence>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <FooterSection />
      </div>
    </Router>
  );
}

export default App;