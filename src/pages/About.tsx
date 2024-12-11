import React from 'react';
import { motion } from 'framer-motion';
import GameOfLife from '../components/Background/GameOfLife';

const About = () => {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "S.S. Enterprises",
      period: "2024 - 2024",
      description: "Working on full-stack development using modern technologies."
    },
    {
      title: "Research Assistant",
      company: "Buffalo NeuroImaging Analysis Center",
      period: "2022 - 2023",
      description: "Working on full-stack development using modern technologies."
    },
    {
      title: "Research Assistant",
      company: "University at Buffalo - xLab",
      period: "2022 - 2022",
      description: "Working on full-stack development using modern technologies."
    },
    // Add more experiences as needed
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <GameOfLife />
      <div className="relative max-w-7xl mx-auto">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-white/70 mb-8"
        >
          About Me
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <motion.div 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white/60 mb-4">Personal Info</h2>
            <p className="text-gray-300/80 leading-relaxed">
              I am a passionate software developer with expertise in modern web technologies.
              I love creating elegant solutions to complex problems and am constantly learning
              new technologies to stay at the forefront of web development.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div 
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white/60 mb-4">Skills</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-indigo-400/80 mb-2">Development</h3>
                <ul className="text-gray-300/80 space-y-1">
                  <li>React, TypeScript, Next.js</li>
                  <li>Node.js, Python, FastAPI</li>
                  <li>PostgreSQL, MongoDB, Redis</li>
                  <li>Docker, AWS, CI/CD</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-green-400/80 mb-2">Trading & Finance</h3>
                <ul className="text-gray-300/80 space-y-1">
                  <li>Algorithmic Trading</li>
                  <li>Market Analysis</li>
                  <li>Trading Systems</li>
                  <li>Risk Management</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-purple-400/80 mb-2">Machine Learning & AI</h3>
                <ul className="text-gray-300/80 space-y-1">
                  <li>Computer Vision</li>
                  <li>Deep Learning</li>
                  <li>TensorFlow/PyTorch</li>
                  <li>Data Analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-blue-400/80 mb-2">Systems & Tools</h3>
                <ul className="text-gray-300/80 space-y-1">
                  <li>System Architecture</li>
                  <li>Distributed Systems</li>
                  <li>Performance Optimization</li>
                  <li>Linux/Unix</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Work Experience */}
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="mt-8 bg-gray-800/30 backdrop-blur-lg rounded-xl p-6"
        >
          <h2 className="text-2xl font-semibold text-white/60 mb-6">Work Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-indigo-500/60 pl-4">
                <h3 className="text-xl font-medium text-white/70">{exp.title}</h3>
                <p className="text-indigo-400/80">{exp.company}</p>
                <p className="text-gray-400/70 text-sm">{exp.period}</p>
                <p className="text-gray-300/80 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
