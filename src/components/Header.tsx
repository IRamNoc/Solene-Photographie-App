import React, { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const menuItems = useMemo(() => [
    { path: '/', label: 'À PROPOS' },
    { path: '/prestations', label: 'PRESTATIONS' },
    { path: '/gallery', label: 'GALERIES' },
    { path: '/boutique', label: 'BOUTIQUE' },
    { path: '/contact', label: 'CONTACT' }
  ], []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (menuRef.current) {
      e.preventDefault();
      menuRef.current.scrollLeft += e.deltaY;
    }
  }, []);

  const handleMouseEnter = useCallback((path: string) => {
    setHoveredItem(path);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}
    >
      <div className="w-full">
        <div className="container mx-auto px-4">
          {/* === Logo et Photographie === */}
          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isScrolled ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'
            }`}
          >
            <Link to="/" className="block text-center">
              <h1 className="font-perandory font-medium text-black tracking-[0.05em] pt-6 mb-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mobile-header-title">
                SOLENE TERMEAU
              </h1>
              <p className="font-['Pinyon_Script'] text-black pb-2 -mt-1 text-base sm:text-lg md:text-xl mobile-header-subtitle">
                Photographie de famille
              </p>
            </Link>
          </div>

          {/* === Navigation === */}
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
              <ul className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-12 min-w-max px-2 py-4">
                {menuItems.map(({ path, label }) => {
                  const isActive = location.pathname === path;
                  const isHovered = hoveredItem === path;

                  return (
                    <li key={path} className="relative flex-shrink-0">
                      <Link
                        to={path}
                        className="font-perandory text-black tracking-[0.05em] transition-colors whitespace-nowrap py-2 px-1 block text-sm sm:text-base md:text-lg lg:text-xl hover:text-[#ada133] mobile-nav-link"
                        onMouseEnter={() => handleMouseEnter(path)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {label}
                        {(isHovered || (!hoveredItem && isActive)) && (
                          <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#ada133]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
 };

export default Header;