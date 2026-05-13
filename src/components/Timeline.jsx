import { useState, useEffect, useRef } from 'react';
import './Timeline.css';

const timelineEvents = [
  { date: "May 14, 2025", title: "The Day We Met 💫", text: "The universe brought us together. One look and everything changed forever.", emoji: "🌸", side: "left" },
  { date: "June 2025", title: "First Full Month 🌞", text: "Getting to know each other, endless conversations, butterflies every time you texted.", emoji: "☀️", side: "right" },
  { date: "July 2025", title: "Growing Closer 🌻", text: "Every day felt brighter. You became my favorite person to talk to.", emoji: "🌻", side: "left" },
  { date: "August 2025", title: "Monsoon Together 🌧️", text: "Rainy days became our thing. Warm hearts in cold weather.", emoji: "🌧️", side: "right" },
  { date: "September 2025", title: "Falling Deeper 🍂", text: "Every moment became a memory worth keeping. So many photos, so much love.", emoji: "🍂", side: "left" },
  { date: "October 2025", title: "Festival of Us 🪔", text: "Celebrating Diwali together — lights, laughter, and love everywhere.", emoji: "🪔", side: "right" },
  { date: "November 2025", title: "Cozy & Comfortable 🧣", text: "We found our rhythm. Comfortable silences, inside jokes, pure love.", emoji: "🧣", side: "left" },
  { date: "December 2025", title: "Year End Magic 🎄", text: "Our first December. Christmas vibes and New Year dreams — together.", emoji: "🎄", side: "right" },
  { date: "January 2026", title: "New Year, Same Love 🎆", text: "A fresh start but the same butterflies. Loving deeper with every day.", emoji: "🎆", side: "left" },
  { date: "February 2026", title: "Our Valentine's 💝", text: "Our first Valentine's Day! Every day with you feels like Valentine's anyway.", emoji: "💝", side: "right" },
  { date: "March 2026", title: "Spring of Love 🌷", text: "Blooming together beautifully, just like the flowers around us.", emoji: "🌷", side: "left" },
  { date: "April 2026", title: "Almost One Year! 🎉", text: "Can you believe it? 12 months of pure magic. The countdown to forever began.", emoji: "🎉", side: "right" },
  { date: "May 14, 2026", title: "1 Year Together! 💕", text: "We made it, baby. One year of love, laughter, and a million memories. Here's to forever.", emoji: "❤️", side: "center" },
];

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.dataset.idx]));
          }
        });
      },
      { threshold: 0.15 }
    );

    const items = sectionRef.current?.querySelectorAll('.tl-item');
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline-section" ref={sectionRef}>
      <div className="tl-header">
        <div className="tl-badge">📖 OUR JOURNEY</div>
        <h2 className="tl-title">Our Love Story Timeline 💕</h2>
        <p className="tl-subtitle">Every chapter of our journey, month by month</p>
      </div>

      <div className="tl-container">
        {/* Center line */}
        <div className="tl-line" />

        {timelineEvents.map((event, i) => (
          <div
            key={i}
            className={`tl-item tl-item--${event.side} ${visibleItems.has(String(i)) ? 'tl-item--visible' : ''}`}
            data-idx={i}
          >
            {/* Dot on timeline */}
            <div className="tl-dot">
              <span className="tl-dot-emoji">{event.emoji}</span>
            </div>

            {/* Card */}
            <div className="tl-card">
              <span className="tl-date">{event.date}</span>
              <h3 className="tl-card-title">{event.title}</h3>
              <p className="tl-card-text">{event.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
