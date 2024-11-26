import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CodeBreaker from '../components/Game/CodeBreaker';
import AnimatedBackground from '../components/Background/AnimatedBackground';
import { ScrollAnimation } from '../components/Animation/ScrollAnimations';
import ProjectsSection from '../components/Projects/ProjectsSection';

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors"
              >
                Contact Me
              </motion.button>
            </div>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>

      {/* Interactive Code Challenge Section */}
      <ScrollAnimation variant="fadeIn" className="py-20 relative">
        <AnimatedBackground variant="dark" />
        <div className="container-custom relative z-10">
          <ScrollAnimation variant="slideUp">
            <h2 className="heading-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Code Challenge Arena
            </h2>
          </ScrollAnimation>
          <ScrollAnimation variant="slideIn" delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <CodeBreaker />
            </div>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>

      {/* Projects Section */}
      <ProjectsSection />

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
