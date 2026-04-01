import { useEffect, useRef } from "react";

const PARTICLES = 60;

function randomBetween(a, b) { return a + Math.random() * (b - a); }

export default function AnimatedBg({ darkMode }) {
  const canvasRef = useRef();
  const mouse = useRef({ x: -999, y: -999 });
  const particles = useRef([]);
  const animRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    particles.current = Array.from({ length: PARTICLES }, () => ({
      x:    randomBetween(0, window.innerWidth),
      y:    randomBetween(0, window.innerHeight),
      r:    randomBetween(2, 6),
      vx:   randomBetween(-0.3, 0.3),
      vy:   randomBetween(-0.5, -0.1),
      alpha:randomBetween(0.2, 0.7),
      type: Math.random() > 0.5 ? "circle" : "leaf",
      rot:  randomBetween(0, Math.PI * 2),
      rotV: randomBetween(-0.01, 0.01),
    }));

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        // Mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        // Base upward drift
        p.vy -= 0.005;

        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotV;

        // Wrap around
        if (p.y < -20) { p.y = canvas.height + 20; p.x = randomBetween(0, canvas.width); }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        const color = darkMode ? `rgba(74,222,128,${p.alpha})` : `rgba(34,197,94,${p.alpha})`;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;

        if (p.type === "leaf") {
          // Draw a simple leaf shape
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(0, -p.r * 2);
          ctx.bezierCurveTo(p.r * 1.5, -p.r, p.r * 1.5, p.r, 0, p.r * 2);
          ctx.bezierCurveTo(-p.r * 1.5, p.r, -p.r * 1.5, -p.r, 0, -p.r * 2);
          ctx.fill();
          // Vein
          ctx.strokeStyle = darkMode ? `rgba(21,128,61,${p.alpha})` : `rgba(21,128,61,${p.alpha * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -p.r * 2);
          ctx.lineTo(0, p.r * 2);
          ctx.stroke();
        } else {
          // Glowing dot
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r);
          grad.addColorStop(0, color);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: darkMode ? 0.4 : 0.25 }}
    />
  );
}
