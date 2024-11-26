import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
}

const PhysicsPuzzle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const ballRef = useRef<Matter.Body>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<Platform | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [canLaunch, setCanLaunch] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup Matter.js with stronger gravity
    const engine = Matter.Engine.create();
    engine.gravity.y = 0.8;
    engine.gravity.x = 0;

    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        wireframes: false,
        background: '#1a1a1a',
      },
    });

    engineRef.current = engine;

    // Create walls with bounce
    const walls = [
      Matter.Bodies.rectangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT + 30, CANVAS_WIDTH, 60, { 
        isStatic: true,
        restitution: 0.3,
        render: { fillStyle: '#4a5568' }
      }),
      Matter.Bodies.rectangle(-30, CANVAS_HEIGHT / 2, 60, CANVAS_HEIGHT, { 
        isStatic: true,
        restitution: 0.3,
        render: { fillStyle: '#4a5568' }
      }),
      Matter.Bodies.rectangle(CANVAS_WIDTH + 30, CANVAS_HEIGHT / 2, 60, CANVAS_HEIGHT, { 
        isStatic: true,
        restitution: 0.3,
        render: { fillStyle: '#4a5568' }
      }),
      Matter.Bodies.rectangle(CANVAS_WIDTH / 2, -30, CANVAS_WIDTH, 60, { 
        isStatic: true,
        restitution: 0.3,
        render: { fillStyle: '#4a5568' }
      }),
    ];

    // Create ball with updated physics properties
    const ball = Matter.Bodies.circle(50, CANVAS_HEIGHT - 50, 15, {
      restitution: 0.5,
      friction: 0.001,
      density: 0.001,
      render: {
        fillStyle: '#4f46e5',
      },
      label: 'ball',
    });

    Matter.Body.setInertia(ball, Infinity); // Prevents rotation
    ballRef.current = ball;

    // Create target
    const target = Matter.Bodies.rectangle(CANVAS_WIDTH - 100, 100, 40, 40, {
      isStatic: true,
      isSensor: true,
      render: {
        fillStyle: '#22c55e',
      },
      label: 'target',
    });

    // Add all bodies to the world
    Matter.World.add(engine.world, [...walls, ball, target]);

    // Start the engine and renderer
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // Collision detection
    Matter.Events.on(engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        
        if ((bodyA.label === 'target' && bodyB.label === 'ball') ||
            (bodyA.label === 'ball' && bodyB.label === 'target')) {
          setScore(prev => prev + 100);
          setLevel(prev => prev + 1);
          resetBall();
        }
      });
    });

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  const resetBall = () => {
    if (ballRef.current) {
      Matter.Body.setPosition(ballRef.current, { x: 50, y: CANVAS_HEIGHT - 50 });
      Matter.Body.setVelocity(ballRef.current, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(ballRef.current, 0);
      setCanLaunch(true);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!engineRef.current || !isPlaying) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add a new platform
    const platform = Matter.Bodies.rectangle(x, y, 120, 15, {
      isStatic: true,
      angle: Math.PI * 0.1,
      friction: 0.1,
      restitution: 0.2,
      render: {
        fillStyle: '#6366f1',
      },
    });

    Matter.World.add(engineRef.current.world, platform);
    setPlatforms([...platforms, { x, y, width: 120, height: 15, angle: Math.PI * 0.1 }]);
  };

  const launchBall = () => {
    if (!canLaunch || !ballRef.current) return;
    
    // Apply a stronger impulse instead of force
    Matter.Body.setVelocity(ballRef.current, {
      x: 5,
      y: -10
    });
    
    setCanLaunch(false);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLevel(1);
    resetBall();
    
    // Clear existing platforms
    if (engineRef.current) {
      const bodies = Matter.Composite.allBodies(engineRef.current.world);
      bodies.forEach(body => {
        if (body.label !== 'ball' && body.label !== 'target' && !body.isStatic) {
          Matter.World.remove(engineRef.current.world, body);
        }
      });
    }
    setPlatforms([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-4 items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-lg"
          onClick={startGame}
        >
          {isPlaying ? 'Reset Game' : 'Start Game'}
        </motion.button>
        {isPlaying && canLaunch && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg"
            onClick={launchBall}
          >
            Launch Ball
          </motion.button>
        )}
        <div className="text-white">
          <span className="mr-4">Level: {level}</span>
          <span>Score: {score}</span>
        </div>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={handleCanvasClick}
          className="border border-gray-700 rounded-lg shadow-xl"
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
            <div className="text-center text-white p-6">
              <h3 className="text-2xl font-bold mb-4">Physics Puzzle Challenge</h3>
              <p className="mb-4">Click to place platforms and use the Launch button to start the ball!</p>
              <p className="text-sm text-gray-300">Guide the blue ball to the green target using physics and strategy.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicsPuzzle;
