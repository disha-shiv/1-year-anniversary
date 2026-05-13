import { useState } from 'react';
import './Lightbox.css';

export default function Lightbox({ images, media, currentIndex, onClose, basePath }) {
  const [idx, setIdx] = useState(currentIndex);

  // Support both old `images` prop and new `media` prop
  const items = media || (images || []).map((f) => ({ type: 'image', file: f }));

  if (!items || items.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setIdx((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') handlePrev(e);
    if (e.key === 'ArrowRight') handleNext(e);
  };

  const current = items[idx];
  const isVideo = current.type === 'video';
  // Use encodeURI for filenames with spaces, but don't double-encode
  const filename = current.file.includes(' ') ? encodeURIComponent(current.file) : current.file;
  const src = `${basePath}/${filename}`;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Media lightbox"
    >
      {/* Close button */}
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      {/* Counter */}
      <div className="lightbox-counter">
        {idx + 1} / {items.length}
      </div>

      {/* Previous */}
      {items.length > 1 && (
        <button className="lightbox-nav lightbox-nav--prev" onClick={handlePrev} aria-label="Previous">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Image or Video */}
      <div className="lightbox-image-wrapper" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video
            key={src}
            src={src}
            className="lightbox-video"
            controls
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            autoPlay
            playsInline
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <img
            src={src}
            alt={`Photo ${idx + 1}`}
            className="lightbox-image"
          />
        )}
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button className="lightbox-nav lightbox-nav--next" onClick={handleNext} aria-label="Next">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
