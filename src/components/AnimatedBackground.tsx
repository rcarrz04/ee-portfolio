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

    // Oscilloscope wave properties
    let time = 0;
    const waveAmplitude = canvas.height * 0.3;
    const waveFrequency = 0.02;
    const waveSpeed = 0.05;

    // Draw oscilloscope background
    const drawOscilloscope = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines (oscilloscope style)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw center line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
      
      // Draw animated sine wave
      ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)'; // Yellow wave
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x * waveFrequency) + time) * waveAmplitude;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Add some oscilloscope-style dots/points
      ctx.fillStyle = 'rgba(255, 255, 0, 0.6)';
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1);
        const y = canvas.height / 2 + Math.sin((x * waveFrequency) + time) * waveAmplitude;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      time += waveSpeed;
    };

    // Animation loop
    const animate = () => {
      drawOscilloscope();
      requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-900 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 z-0"
      />
    </div>
  );
};

export default AnimatedBackground; 