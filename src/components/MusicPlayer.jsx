import { useState } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(() => {
    const a = new Audio(`${import.meta.env.BASE_URL}music/song.mp3`);
    a.loop = true;
    a.volume = 0.4;
    return a;
  });

  const toggle = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      className={`music-btn ${playing ? 'music-btn--playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause music' : 'Play music'}
    >
      <span className="music-icon">{playing ? '🎵' : '🔇'}</span>
      {playing && (
        <div className="music-bars">
          <span className="music-bar" />
          <span className="music-bar" />
          <span className="music-bar" />
        </div>
      )}
    </button>
  );
}
