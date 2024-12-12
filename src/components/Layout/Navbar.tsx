import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToContact: true } });
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const yOffset = -80;
        const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleResumeClick = () => {
    window.open('/resume.pdf', '_blank');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { 
      name: 'Contact',
      path: '#contact',
      onClick: handleContactClick
    }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link 
                to="/" 
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                Sujal
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    whileHover={{ y: -2 }}
                  >
                    {link.onClick ? (
                      <a
                        href={link.path}
                        onClick={link.onClick}
                        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                          location.pathname === link.path
                            ? 'text-white'
                            : ''
                        }`}
                      >
                        {link.name}
                        <motion.div
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-opacity ${
                            location.pathname === link.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                          layoutId="underline"
                        />
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                          location.pathname === link.path
                            ? 'text-white'
                            : ''
                        }`}
                      >
                        {link.name}
                        <motion.div
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-opacity ${
                            location.pathname === link.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                          layoutId="underline"
                        />
                      </Link>
                    )}
                  </motion.div>
                ))}
                <button
                  onClick={handleResumeClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Resume
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.onClick ? (
                      <a
                        href={link.path}
                        onClick={link.onClick}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === link.path
                            ? 'text-white bg-gray-700'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === link.path
                            ? 'text-white bg-gray-700'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    handleResumeClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
