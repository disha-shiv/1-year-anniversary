import { useState, useEffect, useRef } from 'react';
import { ghibliData } from '../data/galleryData';
import './GhibliGallery.css';

export default function GhibliGallery() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (selectedImg === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedImg]);

  const basePath = `${import.meta.env.BASE_URL}images/${ghibliData.folder}`;

  return (
    <section
      ref={sectionRef}
      className={`ghibli-section ${isVisible ? 'ghibli-section--visible' : ''}`}
      id="ghibli"
    >
      {/* Decorative elements */}
      <div className="ghibli-sparkle ghibli-sparkle--1">✨</div>
      <div className="ghibli-sparkle ghibli-sparkle--2">🌟</div>
      <div className="ghibli-sparkle ghibli-sparkle--3">⭐</div>

      <div className="ghibli-header">
        <div className="ghibli-badge">🏰 SPECIAL COLLECTION</div>
        <h2 className="ghibli-title">{ghibliData.title}</h2>
        <p className="ghibli-subtitle">{ghibliData.subtitle}</p>
      </div>

      <div className="ghibli-grid">
        {ghibliData.images.map((img, i) => (
          <div
            key={i}
            className="ghibli-card"
            style={{ '--delay': `${i * 0.15}s` }}
            onClick={() => setSelectedImg(img)}
          >
            <div className="ghibli-card-inner">
              <img
                src={`${basePath}/${img}`}
                alt={`Ghibli art ${i + 1}`}
                loading="lazy"
                className="ghibli-card-img"
              />
              <div className="ghibli-card-overlay">
                <span className="ghibli-card-icon">🔍</span>
                <span className="ghibli-card-text">View Full</span>
              </div>
              {/* Ghibli-style frame border */}
              <div className="ghibli-card-frame" />
            </div>
          </div>
        ))}
      </div>

      {/* Simple fullscreen popup — click outside to close */}
      {selectedImg && (
        <div className="ghibli-popup" onClick={() => setSelectedImg(null)}>
          <img
            src={`${basePath}/${selectedImg}`}
            alt="Ghibli art fullscreen"
            className="ghibli-popup-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
