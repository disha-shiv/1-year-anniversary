import { useState, useEffect, useRef } from 'react';
import { finalData } from '../data/galleryData';
import './FinalGallery.css';

export default function FinalGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const hideTimer = useRef(null);

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

  const basePath = `${import.meta.env.BASE_URL}images/${finalData.folder}`;
  const videoSrc = `${basePath}/${encodeURIComponent(finalData.videos[0])}`;

  const handleToggle = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isPlaying) {
      vid.pause();
      setIsPlaying(false);
      setShowOverlay(true);
      clearTimeout(hideTimer.current);
    } else {
      vid.play();
      setIsPlaying(true);
      setShowOverlay(true);
      // Auto-hide overlay after 1.5s when playing
      hideTimer.current = setTimeout(() => setShowOverlay(false), 1500);
    }
  };

  const handleAreaClick = () => {
    if (isPlaying && !showOverlay) {
      // Show overlay briefly, then hide
      setShowOverlay(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setShowOverlay(false), 2500);
    } else {
      handleToggle();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  return (
    <section
      ref={sectionRef}
      className={`final-section ${isVisible ? 'final-section--visible' : ''}`}
      id="final"
    >
      <div className="final-header">
        <div className="final-badge">🎬 SPECIAL MOMENT</div>
        <h2 className="final-title">{finalData.title}</h2>
        <p className="final-subtitle">{finalData.subtitle}</p>
      </div>

      <div className="final-player-wrapper">
        <div className="final-glow" />

        <div className="final-player" onClick={handleAreaClick}>
          <video
            ref={videoRef}
            src={videoSrc}
            className="final-video"
            playsInline
            preload="metadata"
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            onEnded={handleVideoEnd}
          />

          {/* Play/Pause overlay */}
          <div className={`final-cover-overlay ${showOverlay ? '' : 'final-cover-overlay--hidden'}`}>
            <div className={`final-play-btn ${isPlaying ? 'final-play-btn--pause' : ''}`}>
              {!isPlaying && (
                <>
                  <div className="final-play-ripple" />
                  <div className="final-play-ripple final-play-ripple--2" />
                </>
              )}
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="white" className="final-play-icon">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="white" className="final-play-icon">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
            <p className="final-play-text">
              {isPlaying ? 'Tap to Pause' : 'Tap to Play'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
