import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hook personnalisé pour gérer les animations d'apparition
 * Suit le principe de responsabilité unique (SRP)
 */
export const useAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: `-${threshold * 100}%` });

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8 }
  };

  return { ref, isInView, animationProps };
};

/**
 * Hook pour les animations avec délai
 */
export const useDelayedAnimation = (delay = 0, threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: `-${threshold * 100}%` });

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.8, delay }
  };

  return { ref, isInView, animationProps };
};