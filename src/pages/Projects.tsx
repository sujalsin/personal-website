import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Personal Website",
      description: "A modern personal portfolio website built with React, TypeScript, and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      link: "https://github.com/yourusername/personal-website"
    },
    // Add more projects here
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          My Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 hover:bg-gray-700/50 transition-colors"
            >
              <h2 className="text-2xl font-semibold text-white mb-3">{project.title}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-indigo-400 mb-2">Technologies Used:</h3>
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
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View Project
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
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-400"
        >
          <p>More projects coming soon!</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
