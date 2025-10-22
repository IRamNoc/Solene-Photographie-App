import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Nettoyer le timeout précédent s'il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Scroll vers le haut à chaque changement de route
    // Utilisation d'un timeout pour éviter les conflits avec les animations
    timeoutRef.current = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Changé de 'smooth' à 'auto' pour éviter les conflits
      });
      timeoutRef.current = null;
    }, 50); // Réduit de 100ms à 50ms pour une meilleure réactivité

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;