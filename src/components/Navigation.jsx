import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi'; // Install react-icons

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const navItems = [
    { name: 'Our Story', href: '/#our-story' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo Section - Responsive scaling */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <img src={Logo} alt="Shanora Cakes Logo" className="h-10 w-auto sm:h-12 transition-transform group-hover:scale-110" />
          <span className="text-xl sm:text-2xl lg:text-3xl font-title italic text-shanora-pink drop-shadow-sm">
            Shanora <span className="text-shanora-dark">Cakes</span>
          </span>
        </Link>

        {/* Desktop Navigation (lg and xl) */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-sans font-semibold text-shanora-dark hover:text-shanora-purple transition-colors relative group"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-shanora-purple transition-all group-hover:w-full"></span>
            </a>
          ))}
          <Link to="/order">
            <button className="bg-shanora-purple text-white px-7 py-2.5 rounded-full font-semibold hover:bg-shanora-pink hover:shadow-lg hover:shadow-shanora-pink/30 transition-all active:scale-95">
              Order Now
            </button>
          </Link>
        </div>

        {/* Mobile/Tablet Toggle (xs, sm, md) */}
        <div className="flex lg:hidden items-center gap-4">
          <Link to="/order" className="sm:block hidden"> {/* Quick order button for tablets */}
            <button className="bg-shanora-purple text-white px-4 py-2 rounded-full text-sm font-semibold">
              Order
            </button>
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-shanora-dark p-2 hover:bg-shanora-pink/10 rounded-lg transition"
          >
            {isOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] lg:hidden"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-[75%] sm:w-[50%] bg-white shadow-2xl z-[101] p-8 lg:hidden flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsOpen(false)}><HiX size={32} className="text-shanora-dark" /></button>
              </div>

              <div className="flex flex-col gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-title text-shanora-dark hover:text-shanora-purple transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <Link to="/order" className="pt-4">
                  <button className="w-full bg-shanora-purple text-white py-4 rounded-2xl font-bold text-lg shadow-lg">
                    Order Now
                  </button>
                </Link>
              </div>

              <div className="mt-auto text-center text-gray-400 text-sm">
                <p>© Shanora Cakes</p>
                <p>Matale • Colombo</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;