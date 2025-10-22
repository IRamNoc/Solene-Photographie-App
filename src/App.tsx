import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Home from './pages/Home';
import Prestations from './pages/Prestations';
import PrestationsMenu from './pages/PrestationsMenu';
import MariagePage from './pages/prestations/MariagePage';
import ShootingPage from './pages/prestations/ShootingPage';
import FamillePage from './pages/prestations/FamillePage';
import ProfessionnelPage from './pages/prestations/ProfessionnelPage';
import EvenementielPage from './pages/prestations/EvenementielPage';
import AutresPage from './pages/prestations/AutresPage';
import Contact from './components/Contact';
import FooterSection from './components/sections/FooterSection/FooterSection';
import GalleryList from './components/gallery/GalleryList';
import About from './pages/About';
import CGV from './pages/CGV';
import MentionsLegales from './pages/MentionsLegales';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

const AnimatedRoutes = React.memo(() => {
  const location = useLocation();
  
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
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
          <Route path="/a-propos" element={<About />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/legal/mentions" element={<MentionsLegales />} />
          {/* Route catch-all pour rediriger vers la page d'accueil */}
          <Route path="*" element={<Home />} />
        </Routes>
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
      // Première visite - afficher le loading screen plus longtemps
      const timer = setTimeout(() => {
        setShowLoadingScreen(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 4000); // Durée prolongée à 4 secondes
      
      return () => clearTimeout(timer);
    } else {
      // Visite suivante - pas de loading screen
      setShowLoadingScreen(false);
      setIsFirstLoad(false);
    }
  }, []);

  return (
    <Router>
      <Toaster position="top-center" />
      
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