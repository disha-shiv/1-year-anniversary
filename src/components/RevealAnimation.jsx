import { useState, useEffect } from 'react';
import './RevealAnimation.css';

export default function RevealAnimation({ onComplete }) {
  const [phase, setPhase] = useState('envelope'); // envelope → opening → done

  useEffect(() => {
    // Phase 1: Show envelope for 1.5s
    const t1 = setTimeout(() => setPhase('opening'), 1500);
    // Phase 2: Envelope opens for 2s, then complete
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`reveal-overlay ${phase === 'opening' ? 'reveal-overlay--opening' : ''}`}>
      <div className="reveal-content">
        <div className={`reveal-envelope ${phase === 'opening' ? 'reveal-envelope--open' : ''}`}>
          {/* Envelope flap */}
          <div className="reveal-flap" />
          {/* Envelope body */}
          <div className="reveal-body">
            <div className="reveal-heart">💌</div>
          </div>
          {/* Letter coming out */}
          <div className="reveal-letter">
            <p className="reveal-letter-text">For you, Disha...</p>
          </div>
        </div>
        <p className={`reveal-tagline ${phase === 'opening' ? 'reveal-tagline--show' : ''}`}>
          Happy 1-Year Anniversary ❤️
        </p>
      </div>
    </div>
  );
}
