import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MonthCard.css';

export default function MonthCard({ data, index }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('month-card--visible');
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const photoCount = data.images.length;
  const hasCover = photoCount > 0;

  return (
    <div
      ref={cardRef}
      className="month-card"
      style={{ '--delay': `${index * 0.1}s` }}
      onClick={() => navigate(`/month/${data.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`View ${data.month} gallery`}
    >
      {/* Card glow effect */}
      <div className="month-card-glow" />

      {/* Cover area */}
      <div className="month-card-cover">
        {hasCover ? (
          <img
            src={`${import.meta.env.BASE_URL}images/${data.folder}/${data.images[0]}`}
            alt={data.month}
            className="month-card-cover-img"
            loading="lazy"
          />
        ) : (
          <div className="month-card-cover-placeholder">
            <span className="cover-emoji">{data.coverEmoji}</span>
          </div>
        )}

        {/* Month number badge */}
        <div className="month-card-badge">
          Month {data.id}
        </div>

        {/* Photo count */}
        {photoCount > 0 && (
          <div className="month-card-photo-count">
            📷 {photoCount} {photoCount === 1 ? 'photo' : 'photos'}
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="month-card-info">
        <h3 className="month-card-month">{data.month}</h3>
        <p className="month-card-title">{data.title}</p>
        <p className="month-card-subtitle">{data.subtitle}</p>
      </div>

      {/* Hover arrow */}
      <div className="month-card-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
