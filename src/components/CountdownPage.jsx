import { useState, useEffect } from 'react';
import FloatingHearts from './FloatingHearts';
import Countdown from './Countdown';
import './CountdownPage.css';

export default function CountdownPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  return (
    <div className={`countdown-page ${visible ? 'countdown-page--visible' : ''}`}>
      <FloatingHearts />

      {/* Gradient orbs */}
      <div className="cp-orb cp-orb--1" />
      <div className="cp-orb cp-orb--2" />
      <div className="cp-orb cp-orb--3" />

      <div className="countdown-page-content">
        <div className="cp-heart">💕</div>
        <h1 className="cp-title">
          Happy 1-Year Anniversary
        </h1>
        <h2 className="cp-name">Disha ❤️</h2>
        <p className="cp-subtitle">
          We met on <span className="cp-date">May 14, 2025</span> — and every day since has been magic ✨
        </p>

        <Countdown />

        <div className="cp-teaser">
          <div className="cp-teaser-lock">🔒</div>
          <p>A special surprise awaits on our anniversary day...</p>
        </div>
      </div>
    </div>
  );
}
