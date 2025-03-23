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
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'pb-2 bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
        }`}
    >
      {/* --- Barre d’annonce --- */}
      <div className="w-full bg-[#e6dcc7] overflow-hidden relative h-[48px]">
        <div className="absolute whitespace-nowrap animate-marquee-reverse text-[#998e79] text-lg md:text-xl lg:text-2xl py-3 px-4 font-perandory">
          -15% pour la formule Naissance et Maternité — Offre valable jusqu'au 30 avril — Réservez maintenant !
        </div>
      </div>
      <div className="container mx-auto px-4">

        {/* === Logo et Photographie === */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-40 opacity-100'
            }`}
        >
          <Link to="/" className="block text-center">
            <h1 className="font-perandory font-medium text-[#998e79] tracking-[0.05em] pt-7 text-4xl md:text-6xl">
              SOLENE TERMEAU
            </h1>
            <p className="font-['Pinyon_Script'] text-[#998e79] pb-3 text-2xl md:text-1.7xl">
              Photographie
            </p>
          </Link>
        </div>

        {/* === Navigation === */}
        <nav className="w-full mt-2">
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
                    className="font-perandory text-[#998e79] text-xl md:text-2xl tracking-[0.05em] transition-colors whitespace-nowrap"
                    onMouseEnter={() => setHoveredItem(path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {label}
                    {(location.pathname === path || hoveredItem === path) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-[#ff96bf]"
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
    </header>
  );
};

export default Header;