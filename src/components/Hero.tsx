import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', `${x}%`);
    el.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <header className="hero">
      <div className="hero-bg" id="hero-reveal-container" ref={ref} onMouseMove={handleMove}>
        <img
          src="https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Amarni hero footwear"
          className="hero-front"
        />
        <img
          src="https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Amarni hero footwear reveal"
          className="hero-reveal"
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">SILHOUETTE</h1>
        <a href="#collections" className="btn btn-primary">Discover the Form</a>
      </div>
      <div className="hero-widget">
        <span className="micro-label">Current Season</span>
        <span style={{ fontWeight: 500 }}>Automne / Hiver '26</span>
      </div>
    </header>
  );
}
