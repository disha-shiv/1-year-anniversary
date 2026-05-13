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
            <h2 className="letter-heading">My Dearest <span className="letter-name-gold">Disha</span>,</h2>
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
                Thank you for choosing me every single day, even on the days 
                I made it hard. You never gave up on us, and that means 
                everything to me. 🥺
              </p>
              <p>
                You don't know this, but you saved me in ways I can never explain. 
                You are my peace. In a world full of chaos, you are the calm 
                that keeps me grounded. My safe place. My home. 🏡
              </p>
              <p>
                I promise to be your safe place too, your biggest fan, and the 
                one who always makes you smile — even when you're mad at me 😜. 
                I promise to hold your hand through every storm and dance with 
                you in every sunshine.
              </p>
              <p>
                I can't wait to travel the world with you, grow old with you, 
                and still annoy you at 80. I want every adventure, every sunset, 
                every boring Tuesday — all of it, but only with you. 🌅
              </p>
              <p>
                You make my world brighter, my heart fuller, and my life infinitely 
                more beautiful. I love you more than words on this screen could 
                ever express.
              </p>
              <p className="letter-closing">
                Here's to us — today, tomorrow, and forever. 🥰<br />
                Here's to a lifetime of us. 💕
              </p>
              <p className="letter-signature">
                Forever & always yours,<br />
                <span className="signature-heart">❤️</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
