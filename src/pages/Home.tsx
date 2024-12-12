import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectsSection from '../components/Projects/ProjectsSection';
import AnimatedBackground from '../components/Background/AnimatedBackground';
import { ScrollAnimation } from '../components/Animation/ScrollAnimations';

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const state = location.state as { scrollToContact?: boolean };
    if (state?.scrollToContact) {
      const element = document.getElementById('contact');
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black to-gray-900">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground variant="gradient" interactive={true} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="heading-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              Hi, I'm Sujal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="paragraph mt-6 text-gray-200"
            >
              A software engineer passionate about building innovative solutions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll('projects')}
                className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScroll('contact')}
                className="px-8 py-3 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="scroll-mt-20 relative">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" />
          <div className="relative z-10">
            <ProjectsSection />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="scroll-mt-20 py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <ScrollAnimation variant="fadeIn">
              <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Get in Touch
              </h2>
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <a
                        href="mailto:sujals2144@gmail.com"
                        className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span>sujals2144@gmail.com</span>
                      </a>
                      <a
                        href="https://github.com/sujalsin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" clipRule="evenodd" />
                      </svg>
                        <span>GitHub</span>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sujalsin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Let's Connect</h3>
                    <p className="text-gray-300 mb-4">
                      Feel free to reach out for collaborations, opportunities, or just to say hi!
                    </p>
                    <p className="text-gray-300">
                      Based in <span className="text-purple-400">San Jose</span>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      <motion.button
        style={{ opacity }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full shadow-lg transition-opacity z-50 ${
          showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Home;
