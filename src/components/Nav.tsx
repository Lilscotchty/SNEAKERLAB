import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Collections', href: '#collections' },
  { label: 'Sneaker Lab', href: '#sneaker-lab' },
  { label: 'Store', href: '#store' },
  { label: 'Maison', href: '#about' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <nav>
      <a href="#" className="nav-logo">Amarni</a>

      <div className="nav-links" style={{ display: window.innerWidth > 900 ? 'flex' : 'none' }}>
        {LINKS.map((l) => (
          <a key={l.label} href={l.href}>{l.label}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="#store" className="btn btn-primary" style={{ padding: '10px 24px' }}>Boutique</a>
        <button
          className="btn btn-ghost"
          aria-label="Menu"
          onClick={() => setMobileOpen((v) => !v)}
          style={{ display: window.innerWidth > 900 ? 'none' : 'inline-flex', padding: '10px 14px' }}
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-h)',
            left: 0,
            width: '100%',
            background: 'rgba(250, 250, 250, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-soft)',
            padding: '2rem 4vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            zIndex: 99,
          }}
        >
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} style={{ fontSize: '1.1rem', textDecoration: 'none', color: 'var(--text-main)' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
