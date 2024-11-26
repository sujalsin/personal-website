import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername' }
  ];

  return (
    <footer className="relative z-10">
      <div className="bg-gray-900/80 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <motion.h3 
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
                whileHover={{ scale: 1.05 }}
              >
                Sujal
              </motion.h3>
              <p className="mt-2 text-gray-400 text-sm text-center md:text-left">
                Building innovative solutions with modern technologies
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                {['Home', 'Projects', 'About', 'Contact'].map((link) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <div className="flex flex-col space-y-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Sujal. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30" />
    </footer>
  );
};

export default Footer;
