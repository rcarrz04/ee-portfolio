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

    // Particle class for sparks
    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.maxLife = Math.random() * 50 + 50;
        this.life = this.maxLife;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.life / this.maxLife;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
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
          this.alpha += 0.02;
          if (this.alpha >= 1) {
            this.growing = false;
          }
        } else {
          this.alpha -= 0.02;
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

    const sparks: Spark[] = [];
    const equations: Equation[] = [];
    let lastSparkTime = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw sparks
      const now = Date.now();
      if (now - lastSparkTime > 100) {
        sparks.push(new Spark(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
        lastSparkTime = now;
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw(ctx);
        if (sparks[i].life <= 0) {
          sparks.splice(i, 1);
        }
      }

      // Update and draw equations
      if (Math.random() < 0.02) {
        equations.push(new Equation());
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