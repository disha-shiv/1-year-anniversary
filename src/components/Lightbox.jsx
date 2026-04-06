import { useState } from 'react';
import './Lightbox.css';

export default function Lightbox({ images, currentIndex, onClose, basePath }) {
  const [idx, setIdx] = useState(currentIndex);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrev(e);
    if (e.key === 'ArrowRight') handleNext(e);
  };

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Image lightbox"
    >
      {/* Close button */}
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {/* Counter */}
      <div className="lightbox-counter">
        {idx + 1} / {images.length}
      </div>

      {/* Previous */}
      {images.length > 1 && (
        <button className="lightbox-nav lightbox-nav--prev" onClick={handlePrev} aria-label="Previous image">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="lightbox-image-wrapper" onClick={(e) => e.stopPropagation()}>
        <img
          src={`${basePath}/${images[idx]}`}
          alt={`Photo ${idx + 1}`}
          className="lightbox-image"
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button className="lightbox-nav lightbox-nav--next" onClick={handleNext} aria-label="Next image">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
