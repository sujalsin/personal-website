import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../data/projects';

interface ProjectModalProps extends Project {
  isOpen: boolean;
  onClose: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Trading':
      return 'text-green-300 bg-green-900/30';
    case 'Systems':
      return 'text-blue-300 bg-blue-900/30';
    case 'Video':
      return 'text-red-300 bg-red-900/30';
    case 'ML':
      return 'text-purple-300 bg-purple-900/30';
    default:
      return 'text-gray-300 bg-gray-900/30';
  }
};

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  technologies,
  github,
  date,
  category,
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/40 hover:text-white transition-all z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="h-full overflow-y-auto">
                {/* Header */}
                <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600 relative">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff2e_1px,transparent_1px),linear-gradient(to_bottom,#ffffff2e_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex justify-between items-center">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-md w-fit ${getCategoryColor(category)}`}>
                        {category}
                      </span>
                      {github && (
                        <a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          View on GitHub
                        </a>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold text-white mt-2">{title}</h2>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">About the Project</h3>
                        <div className="space-y-2">
                          {description.map((desc, index) => (
                            <p key={index} className="text-gray-300 leading-relaxed">
                              {desc}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-md bg-gray-800 text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Date</h4>
                            <p className="text-gray-300">{date}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Category</h4>
                            <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md ${getCategoryColor(category)}`}>
                              {category}
                            </span>
                          </div>
                          {github && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400">Repository</h4>
                              <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300 transition-colors break-all"
                              >
                                {github.replace('https://github.com/', '')}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
