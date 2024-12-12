import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { allProjects } from '../data/allProjects';
import AnimatedBackground from '../components/Background/AnimatedBackground';

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
      return 'text-gray-300 bg-gray-800/30';
  }
};

const getFilterButtonStyle = (isSelected: boolean, category: string) => {
  if (category === 'All') {
    return isSelected
      ? 'bg-indigo-500 text-white'
      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50';
  }
  
  const baseColors = getCategoryColor(category);
  return isSelected
    ? `${baseColors} ring-2 ring-offset-2 ring-offset-gray-900 ring-${baseColors.split(' ')[0].replace('text-', '')}`
    : `${baseColors} hover:bg-opacity-40`;
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Trading', 'Systems', 'Video', 'ML'];
  
  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen relative">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground variant="gradient" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-white mb-8"
          >
            All Projects
          </motion.h1>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                  getFilterButtonStyle(selectedCategory === category, category)
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-md ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>
                <div className="text-gray-300 mb-4">
                  {project.description.map((desc, i) => (
                    <p key={i} className="mb-2">{desc}</p>
                  ))}
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-indigo-400 mb-2">Technologies:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-sm bg-indigo-500/20 text-indigo-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View on GitHub
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center text-gray-400"
            >
              <p>No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
