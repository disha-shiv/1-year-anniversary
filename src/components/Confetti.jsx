import { useEffect, useRef } from 'react';

export default function Confetti({ duration = 4000 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      '#ff6b9d', '#c084fc', '#fbbf24', '#f472b6',
      '#fb7185', '#e879f9', '#fda4af', '#fff',
      '#a78bfa', '#f9a8d4',
    ];

    const pieces = [];
    const count = 150;

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: Math.random() * 0.05 + 0.02,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      });
    }

    let animId;
    let startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade out near the end
      const alpha = progress > 0.7 ? 1 - ((progress - 0.7) / 0.3) : 1;
      ctx.globalAlpha = alpha;

      pieces.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.oscillation) * 0.5;
        p.rotation += p.rotationSpeed;
        p.oscillation += p.oscillationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
