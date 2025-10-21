/**
 * Constantes de styles pour maintenir la cohérence
 * Suit le principe DRY (Don't Repeat Yourself)
 */

// Couleurs principales
export const COLORS = {
  primary: '#B8A55C',
  primaryHover: '#A69550',
  secondary: '#998e79',
  background: '#f5f3f0',
  white: '#ffffff',
  text: {
    primary: '#000000',
    secondary: '#374151',
    muted: '#6B7280'
  }
} as const;

// Espacements responsifs
export const SPACING = {
  hero: {
    paddingTop: 'clamp(220px, 25vw, 320px)',
    paddingBottom: 'clamp(40px, 8vw, 120px)',
    paddingX: 'clamp(20px, 4vw, 64px)',
    gap: 'clamp(32px, 6vw, 48px)'
  },
  section: {
    paddingY: 'clamp(60px, 10vw, 120px)',
    paddingX: 'clamp(20px, 4vw, 64px)'
  },
  component: {
    padding: 'clamp(20px, 5vw, 48px)',
    margin: 'clamp(16px, 3vw, 32px)',
    gap: 'clamp(12px, 3vw, 24px)'
  }
} as const;

// Typographie responsive
export const TYPOGRAPHY = {
  hero: {
    title: 'clamp(36px, 9vw, 55px)',
    subtitle: 'clamp(14px, 3vw, 16px)',
    citation: 'clamp(32px, 8vw, 55.8px)',
    definition: 'clamp(12px, 2.8vw, 13.1px)',
    quote: 'clamp(16px, 4vw, 18.6px)'
  },
  section: {
    title: 'clamp(32px, 6vw, 48px)',
    subtitle: 'clamp(20px, 4vw, 32px)',
    body: 'clamp(16px, 3vw, 18px)'
  },
  button: {
    text: 'clamp(20px, 5vw, 32px)',
    padding: {
      top: 'clamp(4px, 1vw, 5px)',
      bottom: 'clamp(2px, 0.5vw, 0px)',
      x: 'clamp(16px, 3vw, 24px)'
    }
  }
} as const;

// Animations
export const ANIMATIONS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  stagger: {
    container: {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }
  }
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;