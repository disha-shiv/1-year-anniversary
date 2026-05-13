import { useState, useEffect, useRef } from 'react';
import './WhyILoveYou.css';

const reasons = [
  { front: "Your Smile 😊", back: "The way your smile lights up a room and makes my heart skip every single time." },
  { front: "Your Laugh 😂", back: "That adorable laugh that I could listen to on repeat forever and never get tired of." },
  { front: "Your Eyes 👀", back: "When you look at me, everything else disappears. Your eyes are my favorite place to get lost in." },
  { front: "Your Care 🤗", back: "How you always check on me, worry about me, and make sure I'm okay — even when I say I'm fine." },
  { front: "Your Patience 🙏", back: "For putting up with my moods, my overthinking, and still loving me through it all." },
  { front: "Your Voice 🎤", back: "Hearing your voice is the best part of my day. It calms every storm inside me." },
  { front: "Your Hugs 🤍", back: "Your hugs feel like home. Nothing in this world compares to being held by you." },
  { front: "Your Love ❤️", back: "The way you love me — unconditionally, patiently, and endlessly. I don't deserve you but I'll keep trying." },
  { front: "Your Strength 💪", back: "How strong you are, even when the world gets heavy. You inspire me every day." },
  { front: "Your Silliness 🤪", back: "Those random silly moments that make me fall in love with you all over again." },
  { front: "Your Support 🌟", back: "For always believing in me, even when I don't believe in myself. My biggest cheerleader." },
  { front: "Just... YOU 💕", back: "I love YOU — all of you. The perfect, the imperfect, and everything in between. You're my everything." },
];

export default function WhyILoveYou() {
  const [isVisible, setIsVisible] = useState(false);
  const [flipped, setFlipped] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFlip = (idx) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`wily-section ${isVisible ? 'wily-section--visible' : ''}`}
    >
      <div className="wily-header">
        <div className="wily-badge">💗 TAP TO REVEAL</div>
        <h2 className="wily-title">Why I Love You</h2>
        <p className="wily-subtitle">Tap each card to read the reason behind it</p>
      </div>

      <div className="wily-grid">
        {reasons.map((r, i) => (
          <div
            key={i}
            className={`wily-card ${flipped.has(i) ? 'wily-card--flipped' : ''}`}
            style={{ '--delay': `${i * 0.06}s` }}
            onClick={() => toggleFlip(i)}
          >
            <div className="wily-card-inner">
              <div className="wily-front">
                <span className="wily-front-text">{r.front}</span>
              </div>
              <div className="wily-back">
                <p className="wily-back-text">{r.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
