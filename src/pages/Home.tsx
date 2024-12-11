import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GameSelector from '../components/Game/GameSelector';
import AnimatedBackground from '../components/Background/AnimatedBackground';
import { ScrollAnimation } from '../components/Animation/ScrollAnimations';
import ProjectsSection from '../components/Projects/ProjectsSection';

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ScrollAnimation variant="fadeIn" className="relative h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
          <ScrollAnimation variant="slideUp" delay={0.2}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="heading-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              Hi, I'm Sujal
            </motion.h1>
          </ScrollAnimation>
          <ScrollAnimation variant="slideUp" delay={0.4}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="paragraph mt-6 text-gray-200"
            >
              A software engineer passionate about building innovative solutions
            </motion.p>
          </ScrollAnimation>
          <ScrollAnimation variant="slideUp" delay={0.6}>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-3 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors"
              >
                Contact Me
              </motion.button>
            </div>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>

      {/* Interactive Game Section */}
      <ScrollAnimation variant="fadeIn" className="py-20 relative">
        <AnimatedBackground variant="dark" />
        <div className="container-custom relative z-10">
          <ScrollAnimation variant="slideUp">
            <h2 className="heading-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Let's Play a Game!
            </h2>
            <p className="text-center text-white/60 mt-2">
              Refresh the page to try a different game!
            </p>
          </ScrollAnimation>
          <ScrollAnimation variant="slideIn" delay={0.2}>
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-lg p-8">
              <GameSelector />
            </div>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>

      {/* Projects Section */}
      <div ref={projectsRef}>
        <ProjectsSection />
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollAnimation variant="fadeIn">
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Get in Touch
            </h2>
            <div className="bg-gray-800 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <a
                      href="mailto:sujals2144@gmail.com"
                      className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/sujalsin"
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
      </div>

      {/* Back to Top Button */}
      <motion.button
        style={{ opacity }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full shadow-lg transition-opacity ${
          showBackToTop ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
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
