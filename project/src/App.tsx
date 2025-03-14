import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { GalleryLogin } from './components/gallery/GalleryLogin';
import AdminGallery from './components/gallery/AdminGallery';
import { AuthGuard } from './components/auth/AuthGuard';
import { GalleryList } from './components/gallery/GalleryList';
import { GalleryView } from './components/gallery/GalleryView';
import Shop from './components/shop/Shop';
import Collection from './components/shop/Collection';
import GiftCard from './components/shop/GiftCard';
import About from './components/About';
import LoadingScreen from './components/LoadingScreen';

function AnimatedRoutes() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Durée du chargement réduite à 800ms

    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Hero />} />
          <Route path="/prestations" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery/login" element={<GalleryLogin />} />
          <Route path="/gallery" element={<GalleryList />} />
          <Route path="/gallery/view/:id" element={<GalleryView />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/boutique" element={<Shop />} />
          <Route path="/boutique/collection/:id" element={<Collection />} />
          <Route path="/boutique/carte-cadeau" element={<GiftCard />} />
          <Route 
            path="/admin/gallery" 
            element={
              <AuthGuard>
                <AdminGallery />
              </AuthGuard>
            } 
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;