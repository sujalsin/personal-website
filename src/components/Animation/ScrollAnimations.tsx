import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollAnimationProps {
  children: React.ReactNode;
  variant?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  variant = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    slideIn: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -180 },
      visible: { opacity: 1, rotate: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxScrollProps {
  speed?: number;
  className?: string;
  children: React.ReactNode;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  speed = 0.5,
  className = '',
  children,
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 500 * speed]);

  return (
    <motion.div
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};
