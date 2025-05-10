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
    }[] = [];

    // Create initial circuit lines
    const createLines = () => {
      lines.length = 0;
      const numLines = 20;
      const gridSize = 100;

      for (let i = 0; i < numLines; i++) {
        lines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 100 + 50,
          angle: Math.floor(Math.random() * 4) * 45, // 0, 45, 90, or 135 degrees
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };
    createLines();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;

      lines.forEach((line) => {
        // Calculate end point based on angle and length
        const endX = line.x + Math.cos((line.angle * Math.PI) / 180) * line.length;
        const endY = line.y + Math.sin((line.angle * Math.PI) / 180) * line.length;

        // Draw the line
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Update position
        line.x += Math.cos((line.angle * Math.PI) / 180) * line.speed;
        line.y += Math.sin((line.angle * Math.PI) / 180) * line.speed;

        // Reset position if line goes off screen
        if (line.x < -line.length || line.x > canvas.width + line.length ||
            line.y < -line.length || line.y > canvas.height + line.length) {
          line.x = Math.random() * canvas.width;
          line.y = Math.random() * canvas.height;
          line.angle = Math.floor(Math.random() * 4) * 45;
        }
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