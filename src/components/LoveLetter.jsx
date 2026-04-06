import { useEffect, useState } from 'react';
import './LoveLetter.css';

export default function LoveLetter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const el = document.getElementById('love-letter');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="love-letter" className={`love-letter ${isVisible ? 'love-letter--visible' : ''}`}>
      <div className="letter-wrapper">
        <div className="letter-envelope">
          <div className="letter-seal">💌</div>
          <div className="letter-paper-inner">
            <h2 className="letter-heading">My Dearest Disha,</h2>
            <div className="letter-body">
              <p>
                Happy 1-Year Anniversary, my love! ❤️ One whole year of us — 
                and honestly, it still feels like that first magical day on May 14th.
              </p>
              <p>
                These 12 months have been the most beautiful chapter of my life.
                Every laugh we've shared, every silly fight, every late-night call,
                every quiet moment together — it's all been pure magic. ✨
              </p>
              <p>
                You make my world brighter, my heart fuller, and my life infinitely 
                more beautiful. I promise to always cherish you, always annoy you 
                (just a little 😜), and love you more with every passing second.
              </p>
              <p className="letter-closing">
                Here's to us — today, tomorrow, and forever. 🥰
              </p>
              <p className="letter-signature">
                Yours forever,<br />
                <span className="signature-heart">❤️</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
