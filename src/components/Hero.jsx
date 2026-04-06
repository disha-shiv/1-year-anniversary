import { useEffect, useState } from 'react';
import Countdown from './Countdown';
import './Hero.css';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (
    <section className={`hero ${visible ? 'hero--visible' : ''}`}>
      {/* Gradient orbs */}
      <div className="hero-orb hero-orb--1" />
      <div className="hero-orb hero-orb--2" />
      <div className="hero-orb hero-orb--3" />

      <div className="hero-content">
        <div className="hero-heart-icon">💕</div>
        <h1 className="hero-title">
          Happy 1-Year Anniversary
        </h1>
        <h2 className="hero-name">Disha ❤️</h2>
        <p className="hero-subtitle">
          We met on <span className="hero-date">May 14, 2025</span> — and every day since has been magic ✨
        </p>

        <Countdown />

        <div className="hero-scroll-indicator">
          <span>Scroll to explore our journey</span>
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
