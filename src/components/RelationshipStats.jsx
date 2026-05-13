import { useState, useEffect, useRef } from 'react';
import './RelationshipStats.css';

function useCountUp(target, duration, shouldStart) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, shouldStart]);
  return count;
}

export default function RelationshipStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate days since May 14, 2025
  const startDate = new Date('2025-05-14');
  const now = new Date();
  const totalDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  const stats = [
    { label: "Days Together", value: totalDays, icon: "📅", suffix: "" },
    { label: "Photos Shared", value: 1000, icon: "📸", suffix: "+" },
    { label: "Months of Love", value: 12, icon: "💕", suffix: "" },
    { label: "Smiles Caused", value: 9999, icon: "😊", suffix: "+" },
    { label: "Late Night Calls", value: 300, icon: "📞", suffix: "+" },
    { label: "Silly Fights", value: 100, icon: "😜", suffix: "+" },
    { label: "Times Said I Love You", value: 9999, icon: "❤️", suffix: "+" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`stats-section ${isVisible ? 'stats-section--visible' : ''}`}
    >
      <div className="stats-header">
        <div className="stats-badge">📊 BY THE NUMBERS</div>
        <h2 className="stats-title">Our Love in Numbers</h2>
        <p className="stats-subtitle">Some things can be counted, but love isn't one of them</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} started={isVisible} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, index, started }) {
  const count = useCountUp(stat.value, 2000, started);

  return (
    <div className="stat-card" style={{ '--delay': `${index * 0.1}s` }}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-value">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}
