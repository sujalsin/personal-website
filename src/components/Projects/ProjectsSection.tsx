import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '../../data/projects';
import { ScrollAnimation } from '../Animation/ScrollAnimations';
import { Project } from '../../data/projects';

type Category = 'All' | 'Trading' | 'Video' | 'Systems';

const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: Category[] = ['All', 'Trading', 'Video', 'Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const categoryIcons = {
    All: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    Trading: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    Video: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    Systems: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  const categoryDescriptions = {
    All: 'View all my projects',
    Trading: 'Algorithmic trading and financial systems',
    Video: 'Video processing and streaming applications',
    Systems: 'Low-level systems programming and optimization',
  };

  return (
    <section className="py-20 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <ScrollAnimation key="header" variant="slideUp">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A collection of my work in algorithmic trading, video processing, and systems programming
          </p>
        </ScrollAnimation>

        <ScrollAnimation key="categories" variant="fadeIn" delay={0.2}>
          <div className="flex flex-col items-center mb-16">
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  onHoverStart={() => setHoveredCategory(category)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {categoryIcons[category]}
                  {category}
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {hoveredCategory && (
                <motion.p
                  key={hoveredCategory}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-gray-400 text-center text-sm"
                >
                  {categoryDescriptions[hoveredCategory]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </ScrollAnimation>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ScrollAnimation
                key={project.id}
                variant="fadeIn"
                delay={index * 0.1}
              >
                <div className="h-[420px]">
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </div>
              </ScrollAnimation>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            key="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl text-gray-500">No projects found in this category yet.</p>
            <motion.button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View all projects instead
            </motion.button>
          </motion.div>
        )}

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
