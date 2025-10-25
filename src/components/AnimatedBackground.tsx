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

    // Draw subtle circuit board pattern
    const drawCircuitPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set subtle grid pattern
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'; // Very subtle blue
      ctx.lineWidth = 1;
      
      const gridSize = 40;
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Add some subtle connection points
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      for (let x = gridSize; x < canvas.width; x += gridSize * 3) {
        for (let y = gridSize; y < canvas.height; y += gridSize * 3) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    drawCircuitPattern();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 -z-10"
      />
    </div>
  );
};

export default AnimatedBackground; 