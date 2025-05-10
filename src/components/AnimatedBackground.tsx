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
      branches: Spark[];
      isBranch: boolean;

      constructor(x: number, y: number, isBranch = false) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.maxLife = isBranch ? 15 : Math.random() * 20 + 10;
        this.life = this.maxLife;
        this.branches = [];
        this.isBranch = isBranch;

        // Create branches for main sparks
        if (!isBranch && Math.random() < 0.3) {
          const numBranches = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < numBranches; i++) {
            this.branches.push(new Spark(x, y, true));
          }
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        // Update branches
        for (let i = this.branches.length - 1; i >= 0; i--) {
          this.branches[i].update();
          if (this.branches[i].life <= 0) {
            this.branches.splice(i, 1);
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.life / this.maxLife;
        const length = this.isBranch ? 3 : 5;
        
        // Draw main spark
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * length, this.y - this.vy * length);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = this.isBranch ? 1 : 2;
        ctx.stroke();

        // Draw branches
        this.branches.forEach(branch => branch.draw(ctx));
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