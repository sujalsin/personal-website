import React from 'react';
import { motion } from 'framer-motion';
import GameOfLife from '../components/Background/GameOfLife';
import AnimatedBackground from '../components/Background/AnimatedBackground';

const About = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Codeium",
      period: "2023 - Present",
      description: [
        "Building the world's best AI coding assistant",
        "Working on the core AI infrastructure",
        "Developing new features and improving user experience"
      ]
    },
    {
      title: "Software Engineer",
      company: "Previous Company",
      period: "2020 - 2023",
      description: [
        "Led development of distributed trading systems",
        "Implemented machine learning models for market analysis",
        "Optimized system performance and reduced latency",
        "Built full-stack web applications using modern technologies"
      ]
    },
    {
      title: "Software Developer Intern",
      company: "Previous Company",
      period: "2019",
      description: [
        "Developed full-stack web applications",
        "Collaborated with cross-functional teams",
        "Improved code quality and test coverage"
      ]
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Backgrounds */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 z-0">
          <AnimatedBackground variant="gradient" />
        </div>
        <div className="absolute inset-0 z-10 opacity-50">
          <GameOfLife />
        </div>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
      >
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
                  {Array.isArray(exp.description) ? (
                    <div className="text-gray-300/80 mt-2">
                      {exp.description.map((desc, descIndex) => (
                        <React.Fragment key={descIndex}>
                          {typeof desc === 'string' ? (
                            <p>{desc}</p>
                          ) : (
                            desc
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-300/80 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
