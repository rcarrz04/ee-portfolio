import { useEffect, useRef } from 'react';

const equationTexts = [
  // Basic EE equations
  'V = IR',
  'P = VI',
  'Z = R + jX',
  'Q = CV',
  'τ = RC',
  'ω = 2πf',
  'X_L = ωL',
  'X_C = 1/ωC',
  'I = C(dV/dt)',
  'V = L(dI/dt)',
  
  // Power equations
  'P = I²R',
  'P = V²/R',
  'S = VI*',
  'PF = cos(θ)',
  
  // Maxwell's equations
  '∇ × E = -∂B/∂t',
  '∇ × H = J + ∂D/∂t',
  '∇ · D = ρ',
  '∇ · B = 0',
  
  // Circuit analysis
  'V = V₁ + V₂ + ...',
  'I = I₁ + I₂ + ...',
  'Z = √(R² + X²)',
  'θ = tan⁻¹(X/R)',
  
  // Semiconductor
  'I = I₀(e^(qV/kT) - 1)',
  'β = I_C/I_B',
  'V_T = kT/q',
  
  // Digital
  'f = 1/T',
  't_pd = t_phl + t_plh',
  'P = CV²f',
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
      angle: number;
      radius: number;
      speed: number;

      constructor() {
        this.text = equationTexts[Math.floor(Math.random() * equationTexts.length)];
        this.alpha = 0;
        this.growing = true;
        this.angle = Math.random() * Math.PI * 2;
        this.radius = 150 + Math.random() * 100; // Distance from center
        this.speed = 0.001 + Math.random() * 0.002; // Rotation speed
      }

      update() {
        if (this.growing) {
          this.alpha += 0.01; // Faster fade in
          if (this.alpha >= 1) {
            this.growing = false;
          }
        } else {
          this.alpha -= 0.01; // Faster fade out
          if (this.alpha <= 0) {
            return false;
          }
        }

        // Update position in circular motion
        this.angle += this.speed;
        this.x = canvas.width / 2 + Math.cos(this.angle) * this.radius;
        this.y = canvas.height / 2 + Math.sin(this.angle) * this.radius;

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
      if (now - lastEquationTime > 2000) { // New equation every 2 seconds
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