import { useEffect, useRef } from 'react';
import './FloatingHearts.css';

const emojis = ['❤️', '💖', '💕', '✨', '🤍', '🥰', '💗', '💫', '🌸'];

export default function FloatingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement('span');
      heart.classList.add('floating-heart');
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = (Math.random() * 18 + 12) + 'px';
      const duration = Math.random() * 12 + 8;
      heart.style.animationDuration = duration + 's';
      heart.style.animationDelay = Math.random() * 2 + 's';
      heart.style.opacity = Math.random() * 0.4 + 0.15;

      container.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) heart.remove();
      }, (duration + 3) * 1000);
    };

    // Initial burst
    for (let i = 0; i < 8; i++) {
      setTimeout(createHeart, i * 200);
    }

    const interval = setInterval(createHeart, 600);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="floating-hearts-container" />;
}
