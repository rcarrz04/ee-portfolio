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

    // Circle class
    class Circle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      fadeOut: boolean;
      maxLife: number;
      life: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 3 + 1;
        this.alpha = 0.3;
        this.fadeOut = Math.random() < 0.3; // 30% chance to fade out
        this.maxLife = Math.random() * 200 + 100;
        this.life = this.maxLife;
      }

      update() {
        // Bounce off edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vx *= -1;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.vy *= -1;
        }

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Update fade out
        if (this.fadeOut) {
          this.life--;
          this.alpha = (this.life / this.maxLife) * 0.3;
          return this.life > 0;
        }

        return true;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

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
          this.alpha += 0.005;
          if (this.alpha >= 1) {
            this.growing = false;
          }
        } else {
          this.alpha -= 0.005;
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
    const circles: Circle[] = [];
    let lastEquationTime = 0;
    let lastCircleTime = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw circles
      const now = Date.now();
      if (now - lastCircleTime > 100) { // Add new circle every 100ms
        circles.push(new Circle());
        lastCircleTime = now;
      }

      for (let i = circles.length - 1; i >= 0; i--) {
        if (!circles[i].update()) {
          circles.splice(i, 1);
        } else {
          circles[i].draw(ctx);
        }
      }

      // Update and draw equations
      if (now - lastEquationTime > 3000) {
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