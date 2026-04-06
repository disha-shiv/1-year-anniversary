import { useState, useEffect } from 'react';
import './Countdown.css';

const TARGET_DATE = new Date('2026-05-14T00:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    return null; // Anniversary has arrived!
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Anniversary has arrived!
  if (!timeLeft) {
    return (
      <div className="countdown-section">
        <div className="countdown-celebration">
          <span className="celebration-emoji">🎉</span>
          <h2 className="celebration-title">We Made It!</h2>
          <p className="celebration-subtitle">1 Year Together Forever 💕</p>
          <span className="celebration-emoji">🎉</span>
        </div>
      </div>
    );
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-section">
      <p className="countdown-label">Countdown to Our 1st Anniversary 💕</p>
      <p className="countdown-date">May 14, 2026</p>
      <div className="countdown-grid">
        {units.map((unit) => (
          <div key={unit.label} className="countdown-box">
            <span className="countdown-number">{String(unit.value).padStart(2, '0')}</span>
            <span className="countdown-unit">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
