import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  quality?: 'low' | 'medium' | 'high';
  lazy?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  placeholder,
  quality = 'medium',
  lazy = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px' // Commencer à charger 50px avant que l'image soit visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // Générer les URLs optimisées
  const getOptimizedSrc = (originalSrc: string, quality: string) => {
    // Pour les images locales, on peut ajouter des paramètres de qualité
    if (originalSrc.startsWith('/images/')) {
      return originalSrc;
    }
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Placeholder pendant le chargement */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover opacity-50 blur-sm"
            />
          ) : (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Image principale */}
      {isInView && (
        <img
          src={error ? placeholder || src : getOptimizedSrc(src, quality)}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedImage;