import { useEffect } from 'react';

const ResourcePreloader = () => {
  useEffect(() => {
    // Précharger les images critiques
    const criticalImages = [
      '/images/profile/pp.png',
      '/images/SolenesansFond.png',
      '/images/about-gallery/1.png',
      '/images/about-gallery/2.png'
    ];

    const preloadImages = () => {
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Précharger les polices critiques
    const preloadFonts = () => {
      const fonts = [
        'https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap',
        'https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap'
      ];

      fonts.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    // Précharger les modules critiques
    const preloadModules = () => {
      const modules = [
        '/src/pages/About.tsx',
        '/src/components/Contact.tsx'
      ];

      modules.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = href;
        document.head.appendChild(link);
      });
    };

    // Exécuter le préchargement après un court délai
    const timer = setTimeout(() => {
      preloadImages();
      preloadFonts();
      preloadModules();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null; // Ce composant ne rend rien
};

export default ResourcePreloader;