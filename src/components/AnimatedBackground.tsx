import { useEffect, useRef } from 'react';

const equationTexts = [
  'V = IR',
  'P = VI',
  'F = ma',
  'E = mc²',
  '∇ × E = -∂B/∂t',
  '∇ × H = J + ∂D/∂t',
  'Z = R + jX',
  'ω = 2πf',
  'Q = CV',
  'τ = RC',
];

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Equation class
    class Equation {
      x: number;
      y: number;
      text: string;
      alpha: number;
      growing: boolean;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = equationTexts[Math.floor(Math.random() * equationTexts.length)];
        this.alpha = 0;
        this.growing = true;
      }

      update() {
        if (this.growing) {
          this.alpha += 0.005; // Slower fade in
          if (this.alpha >= 1) {
            this.growing = false;
          }
        } else {
          this.alpha -= 0.005; // Slower fade out
          if (this.alpha <= 0) {
            return false;
          }
        }
        return true;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.font = '20px monospace';
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.5})`;
        ctx.fillText(this.text, this.x, this.y);
      }
    }

    const equations: Equation[] = [];
    let lastEquationTime = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw equations
      const now = Date.now();
      if (now - lastEquationTime > 3000) { // Add new equation every 3 seconds
        equations.push(new Equation());
        lastEquationTime = now;
      }

      for (let i = equations.length - 1; i >= 0; i--) {
        if (!equations[i].update()) {
          equations.splice(i, 1);
        } else {
          equations[i].draw(ctx);
        }
      }

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
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom, #1a1a1a, #000000)' }}
    />
  );
};

export default AnimatedBackground; 