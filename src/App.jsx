import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAnniversaryStatus } from './hooks/useAnniversaryStatus';
import FloatingHearts from './components/FloatingHearts';
import Hero from './components/Hero';
import LoveLetter from './components/LoveLetter';
import MonthCard from './components/MonthCard';
import Gallery from './components/Gallery';
import GhibliGallery from './components/GhibliGallery';
import CountdownPage from './components/CountdownPage';
import galleryData from './data/galleryData';
import './App.css';

function HomePage() {
  return (
    <div className="home-page">
      <FloatingHearts />
      <Hero />

      {/* Month Gallery Grid */}
      <section className="months-section" id="months">
        <h2 className="section-title">Our 1 Year Together 💕</h2>
        <div className="months-grid">
          {galleryData.map((month, i) => (
            <MonthCard key={month.id} data={month} index={i} />
          ))}
        </div>
      </section>

      {/* Ghibli Gallery */}
      <GhibliGallery />

      {/* Love Letter */}
      <LoveLetter />

      {/* Footer */}
      <footer className="app-footer">
        <p className="footer-text">
          Made with ❤️ for Disha
        </p>
        <p className="footer-date">Since May 14, 2025 — Forever & Always</p>
      </footer>
    </div>
  );
}

function AppContent() {
  const hasArrived = useAnniversaryStatus();

  // Before May 14, 2026: Show only the countdown page
  // On/After May 14, 2026: Show the full website
  if (!hasArrived) {
    return <CountdownPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/month/:monthId" element={<Gallery />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
