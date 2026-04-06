import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import galleryData from '../data/galleryData';
import Lightbox from './Lightbox';
import FloatingHearts from './FloatingHearts';
import './Gallery.css';

export default function Gallery() {
  const { monthId } = useParams();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const monthData = galleryData.find((m) => m.id === parseInt(monthId));

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoaded(true), 100);
  }, [monthId]);

  if (!monthData) {
    return (
      <div className="gallery-error">
        <h2>Month not found 😢</h2>
        <button onClick={() => navigate('/')}>Go Back Home</button>
      </div>
    );
  }

  const basePath = `${import.meta.env.BASE_URL}images/${monthData.folder}`;
  const hasImages = monthData.images.length > 0;

  return (
    <div className={`gallery-page ${loaded ? 'gallery-page--loaded' : ''}`}>
      <FloatingHearts />

      {/* Header */}
      <header className="gallery-header">
        <button className="gallery-back" onClick={() => navigate('/')} aria-label="Back to home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <div className="gallery-header-info">
          <p className="gallery-month-label">{monthData.month}</p>
          <h1 className="gallery-title">{monthData.title}</h1>
          <p className="gallery-subtitle">{monthData.subtitle}</p>
        </div>
      </header>

      {/* Gallery Grid */}
      {hasImages ? (
        <div className="gallery-grid">
          {monthData.images.map((img, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{ '--delay': `${i * 0.08}s` }}
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={`${basePath}/${img}`}
                alt={`${monthData.month} photo ${i + 1}`}
                loading="lazy"
                className="gallery-item-img"
              />
              <div className="gallery-item-overlay">
                <span className="gallery-item-zoom">🔍</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="gallery-empty">
          <div className="gallery-empty-emoji">{monthData.coverEmoji}</div>
          <h3>No photos yet</h3>
          <p>
            Add photos to <code>public/images/{monthData.folder}/</code><br />
            Then update <code>src/data/galleryData.js</code>
          </p>
        </div>
      )}

      {/* Navigation between months */}
      <div className="gallery-nav-footer">
        {monthData.id > 1 && (
          <button
            className="gallery-nav-btn"
            onClick={() => {
              setLoaded(false);
              setTimeout(() => navigate(`/month/${monthData.id - 1}`), 200);
            }}
          >
            ← {galleryData[monthData.id - 2].month}
          </button>
        )}
        {monthData.id < 12 && (
          <button
            className="gallery-nav-btn"
            onClick={() => {
              setLoaded(false);
              setTimeout(() => navigate(`/month/${monthData.id + 1}`), 200);
            }}
          >
            {galleryData[monthData.id].month} →
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={monthData.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          basePath={basePath}
        />
      )}
    </div>
  );
}
