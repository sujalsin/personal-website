import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  spin: number;
  shape: 'circle' | 'square' | 'triangle';
  connected: boolean;
}

const AnimatedBackground: React.FC<{
  variant?: 'default' | 'dark' | 'gradient';
  interactive?: boolean;
}> = ({ variant = 'default', interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const gradientColorsRef = useRef<string[]>([
    '#4f46e5', // indigo
    '#7c3aed', // violet
    '#2563eb', // blue
    '#9333ea', // purple
    '#ec4899', // pink
    '#8b5cf6', // purple
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 8000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          color: gradientColorsRef.current[Math.floor(Math.random() * gradientColorsRef.current.length)],
          speed: Math.random() * 1 + 0.2,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
          shape: Math.random() < 0.6 ? 'circle' : Math.random() < 0.8 ? 'square' : 'triangle',
          connected: Math.random() > 0.5,
        });
      }

      particlesRef.current = particles;
    };

    const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, shape: Particle['shape']) => {
      switch (shape) {
        case 'square':
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size * Math.cos(Math.PI / 6), y + size * Math.sin(Math.PI / 6));
          ctx.lineTo(x - size * Math.cos(Math.PI / 6), y + size * Math.sin(Math.PI / 6));
          ctx.closePath();
          ctx.fill();
          break;
        default:
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (variant === 'dark') {
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e293b');
      } else if (variant === 'gradient') {
        gradient.addColorStop(0, '#1e1b4b');
        gradient.addColorStop(0.5, '#312e81');
        gradient.addColorStop(1, '#1e1b4b');
      } else {
        gradient.addColorStop(0, '#f8fafc');
        gradient.addColorStop(1, '#f1f5f9');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern with parallax effect
      ctx.strokeStyle = variant === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      const parallaxOffset = mouseRef.current.y * 0.02;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, parallaxOffset);
        ctx.lineTo(x, canvas.height + parallaxOffset);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + parallaxOffset);
        ctx.lineTo(canvas.width, y + parallaxOffset);
        ctx.stroke();
      }

      // Draw connections between particles
      ctx.strokeStyle = variant === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      particlesRef.current.forEach((particle, i) => {
        if (particle.connected) {
          const nearbyParticles = particlesRef.current.slice(i + 1).filter(p => {
            const dx = particle.x - p.x;
            const dy = particle.y - p.y;
            return Math.sqrt(dx * dx + dy * dy) < 100;
          });

          nearbyParticles.forEach(p => {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          });
        }
      });

      // Draw and update particles
      particlesRef.current.forEach((particle) => {
        ctx.fillStyle = particle.color + (variant === 'dark' ? '40' : '30');
        
        // Interactive behavior
        if (interactive && isHovering) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            particle.x += (dx / dist) * 2;
            particle.y += (dy / dist) * 2;
          }
        }

        // Rotate and draw shapes
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        drawShape(ctx, 0, 0, particle.size, particle.shape);
        ctx.restore();

        // Update particle position and rotation
        particle.y += particle.speed;
        particle.angle += particle.spin;
        
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = () => {
      drawParticles();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', () => setIsHovering(true));
    canvas.addEventListener('mouseleave', () => setIsHovering(false));

    resizeCanvas();
    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', () => setIsHovering(true));
      canvas.removeEventListener('mouseleave', () => setIsHovering(false));
    };
  }, [variant, interactive]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default AnimatedBackground;
