import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../data/projects';

interface ProjectModalProps extends Project {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  technologies,
  githubUrl,
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

          {/* Modal Container - Added flex centering */}
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
                    <span className="px-4 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-4 inline-block">
                      {category}
                    </span>
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
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full bg-gray-800 text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Completion Date</h4>
                            <p className="text-gray-300">{date}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Category</h4>
                            <p className="text-gray-300">{category}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Links</h3>
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors bg-gray-800 p-3 rounded-lg group"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span>View on GitHub</span>
                          <svg
                            className="w-4 h-4 ml-auto transform transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                          </svg>
                        </a>
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
