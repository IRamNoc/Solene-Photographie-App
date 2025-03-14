import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'ACCUEIL' },
    { path: '/prestations', label: 'PRESTATIONS' },
    { path: '/a-propos', label: 'À PROPOS' },
    { path: '/gallery', label: 'GALERIES' },
    { path: '/boutique', label: 'BOUTIQUE' },
    { path: '/contact', label: 'CONTACT' }
  ];

  const handleWheel = (e: React.WheelEvent) => {
    if (menuRef.current) {
      e.preventDefault();
      menuRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-white/95 backdrop-blur-sm shadow-sm' : 'py-4 bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Link 
            to="/" 
            className={`transition-all duration-300 ${isScrolled ? 'mb-2' : 'mb-4'}`}
          >
            <h1 className={`font-perandory text-[#998e79] tracking-[0.3em] text-center transition-all duration-300 ${
              isScrolled ? 'text-2xl' : 'text-3xl md:text-4xl'
            }`}>
              SOLENE TERMEAU
            </h1>
            <p className={`text-center font-['Great_Vibes'] text-[#998e79] mt-1 transition-all duration-300 ${
              isScrolled ? 'text-xl' : 'text-2xl md:text-3xl'
            }`}>
              Photographie
            </p>
          </Link>

          {/* Navigation */}
          <nav className="w-full">
            <div 
              ref={menuRef}
              onWheel={handleWheel}
              className="overflow-x-auto hide-scrollbar scroll-smooth"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <ul className="flex justify-center space-x-8 md:space-x-16 min-w-max px-4 py-2">
                {menuItems.map(({ path, label }) => (
                  <li key={path} className="relative">
                    <Link
                      to={path}
                      className="text-[#998e79] text-sm tracking-[0.3em] transition-colors"
                      onMouseEnter={() => setHoveredItem(path)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {label}
                      {(location.pathname === path || hoveredItem === path) && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff96bf]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;