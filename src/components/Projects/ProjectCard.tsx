import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
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

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 h-full"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col">
        {/* Category Tag */}
        <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-md w-fit ${getCategoryColor(project.category)}`}>
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors mt-4">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 line-clamp-3 mt-4 flex-grow">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-md">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* View More Indicator */}
        <div className="mt-4 flex justify-end">
          <motion.div
            className="text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-2"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
          >
            <svg
              className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
