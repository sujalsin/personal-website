import React, { useEffect, useRef, useState } from 'react';

interface GameOfLifeProps {
  className?: string;
}

const GameOfLife: React.FC<GameOfLifeProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<boolean[][]>([]);
  const animationFrameRef = useRef<number>();
  
  // Initialize grid with random cells
  const initializeGrid = (rows: number, cols: number) => {
    const newGrid: boolean[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: boolean[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.random() < 0.2); // 20% chance of being alive
      }
      newGrid.push(row);
    }
    return newGrid;
  };

  // Count live neighbors for a cell
  const countNeighbors = (grid: boolean[][], x: number, y: number) => {
    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = (x + i + rows) % rows;
        const newY = (y + j + cols) % cols;
        if (grid[newX][newY]) count++;
      }
    }
    return count;
  };

  // Update grid based on Game of Life rules
  const updateGrid = (currentGrid: boolean[][]) => {
    const rows = currentGrid.length;
    const cols = currentGrid[0].length;
    const newGrid = currentGrid.map((row, i) =>
      row.map((cell, j) => {
        const neighbors = countNeighbors(currentGrid, i, j);
        if (cell) {
          return neighbors === 2 || neighbors === 3;
        } else {
          return neighbors === 3;
        }
      })
    );
    return newGrid;
  };

  // Draw grid on canvas
  const drawGrid = (ctx: CanvasRenderingContext2D, grid: boolean[][], cellSize: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.2)'; // Indigo color with transparency

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell) {
          ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
        }
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Calculate grid dimensions based on cell size
    const cellSize = 10;
    const rows = Math.ceil(canvas.height / cellSize);
    const cols = Math.ceil(canvas.width / cellSize);

    // Initialize grid
    setGrid(initializeGrid(rows, cols));

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      setGrid(prevGrid => {
        const newGrid = updateGrid(prevGrid);
        drawGrid(ctx, newGrid, cellSize);
        return newGrid;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className || ''}`}
    />
  );
};

export default GameOfLife;
