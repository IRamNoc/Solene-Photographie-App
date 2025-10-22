/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
}

declare module 'lucide-react' {
  export const Instagram: any;
  export const Facebook: any;
  export const Mail: any;
  export const Phone: any;
  export const MapPin: any;
  export const Download: any;
  export const ExternalLink: any;
}

declare module 'react-router-dom' {
  export const Link: any;
  export const useNavigate: any;
  export const useLocation: any;
}