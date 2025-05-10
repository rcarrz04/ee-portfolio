import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circuit line properties
    const lines: {
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
      opacity: number;
      endX: number;
      endY: number;
    }[] = [];

    // Create initial circuit lines
    const createLines = () => {
      lines.length = 0;
      const numLines = 20;
      const gridSize = 100;

      for (let i = 0; i < numLines; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const angle = Math.floor(Math.random() * 4) * 45; // 0, 45, 90, or 135 degrees
        const length = Math.random() * 100 + 50;
        
        lines.push({
          x,
          y,
          length,
          angle,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          endX: x + Math.cos((angle * Math.PI) / 180) * length,
          endY: y + Math.sin((angle * Math.PI) / 180) * length,
        });
      }
    };
    createLines();

    // Check if two lines intersect
    const doLinesIntersect = (line1: typeof lines[0], line2: typeof lines[0]) => {
      const x1 = line1.x;
      const y1 = line1.y;
      const x2 = line1.endX;
      const y2 = line1.endY;
      const x3 = line2.x;
      const y3 = line2.y;
      const x4 = line2.endX;
      const y4 = line2.endY;

      const denominator = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
      if (denominator === 0) return false;

      const ua = (((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))) / denominator;
      const ub = (((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))) / denominator;

      return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;

      // Update line positions
      lines.forEach((line) => {
        // Update start position
        line.x += Math.cos((line.angle * Math.PI) / 180) * line.speed;
        line.y += Math.sin((line.angle * Math.PI) / 180) * line.speed;

        // Update end position to maintain length
        line.endX = line.x + Math.cos((line.angle * Math.PI) / 180) * line.length;
        line.endY = line.y + Math.sin((line.angle * Math.PI) / 180) * line.length;

        // Reset position if line goes off screen
        if (line.x < -line.length || line.x > canvas.width + line.length ||
            line.y < -line.length || line.y > canvas.height + line.length) {
          line.x = Math.random() * canvas.width;
          line.y = Math.random() * canvas.height;
          line.angle = Math.floor(Math.random() * 4) * 45;
          line.endX = line.x + Math.cos((line.angle * Math.PI) / 180) * line.length;
          line.endY = line.y + Math.sin((line.angle * Math.PI) / 180) * line.length;
        }
      });

      // Draw lines and connections
      lines.forEach((line, i) => {
        // Draw the main line
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.endX, line.endY);
        ctx.stroke();

        // Check for intersections with other lines
        lines.slice(i + 1).forEach((otherLine) => {
          if (doLinesIntersect(line, otherLine)) {
            // Draw a connection point
            ctx.beginPath();
            ctx.arc(
              (line.x + line.endX + otherLine.x + otherLine.endX) / 4,
              (line.y + line.endY + otherLine.y + otherLine.endY) / 4,
              3,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fill();
          }
        });
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-primary-dark"
    />
  );
};

export default AnimatedBackground; 