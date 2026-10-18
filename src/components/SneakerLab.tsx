import { useEffect, useState } from 'react';
import { ArrowLeftRight, MousePointer2 } from 'lucide-react';

type PexelsPhoto = {
  url: string;
  alt: string;
};

export type FrameSet = {
  id: string;
  name: string;
  photos: PexelsPhoto[];
};

export type InteractionMode = 'scroll' | 'drag';

const PHOTO_SETS: Record<string, PexelsPhoto[]> = {
  runner: [
    { url: 'https://images.pexels.com/photos/9853346/pexels-photo-9853346.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Studio white sneaker' },
    { url: 'https://images.pexels.com/photos/18202585/pexels-photo-18202585.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'White sneaker close up' },
    { url: 'https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Sneaker in dark studio' },
    { url: 'https://images.pexels.com/photos/18202568/pexels-photo-18202568.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'White sneakers pair' },
  ],
  court: [
    { url: 'https://images.pexels.com/photos/12740481/pexels-photo-12740481.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Suede court sneaker' },
    { url: 'https://images.pexels.com/photos/12601012/pexels-photo-12601012.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Court sneaker detail' },
    { url: 'https://images.pexels.com/photos/18188520/pexels-photo-18188520.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Checkerboard sneaker' },
    { url: 'https://images.pexels.com/photos/7238943/pexels-photo-7238943.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Court style sneaker' },
  ],
  trail: [
    { url: 'https://images.pexels.com/photos/31650329/pexels-photo-31650329.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Trail shoes on rocks' },
    { url: 'https://images.pexels.com/photos/9654862/pexels-photo-9654862.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Trail boots in mud' },
    { url: 'https://images.pexels.com/photos/31721677/pexels-photo-31721677.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Green trail boot' },
    { url: 'https://images.pexels.com/photos/8729056/pexels-photo-8729056.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Boots on rocky trail' },
  ],
};

const FRAME_SETS: FrameSet[] = [
  { id: 'runner', name: 'Aero Runner', photos: PHOTO_SETS.runner },
  { id: 'court', name: 'Court Legacy', photos: PHOTO_SETS.court },
  { id: 'trail', name: 'Terra Trail', photos: PHOTO_SETS.trail },
];

export default function SneakerLab({
  renderViewer,
}: {
  renderViewer: (active: FrameSet, interacted: boolean, onInteract: () => void) => React.ReactNode;
}) {
  const [active, setActive] = useState<FrameSet>(FRAME_SETS[0]);
  const [interacted, setInteracted] = useState(false);

  return (
    <section className="sneaker-lab" id="sneaker-lab">
      <div className="lab-section-header">
        <div>
          <span className="micro-label" style={{ color: 'rgba(255,255,255,0.45)' }}>New Category — Studio 03</span>
          <h2>The Sneaker Lab</h2>
        </div>
        <span className="micro-label" style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MousePointer2 size={14} /> Interactive 3D
        </span>
      </div>

      <div className="lab-grid">
        <div className="lab-viewer" onPointerDown={() => setInteracted(true)}>
          <div className="lab-viewer-inner">
            {renderViewer(active, interacted, () => setInteracted(true))}
          </div>
          <div className={`lab-hint ${interacted ? 'is-hidden' : ''}`}>
            <ArrowLeftRight size={14} style={{ color: 'rgba(255,255,255,0.6)' }} />
            <span className="micro-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Drag to rotate</span>
          </div>
        </div>

        <div className="lab-panel">
          {FRAME_SETS.map((fs) => (
            <button
              key={fs.id}
              className={`lab-card ${active.id === fs.id ? 'is-active' : ''}`}
              onClick={() => setActive(fs)}
            >
              <div className="lab-card-row">
                <span className="lab-card-title">{fs.name}</span>
                <span className="micro-label" style={{ color: 'rgba(255,255,255,0.4)' }}>{fs.id}</span>
              </div>
              <p>
                {fs.id === 'runner' && 'Precision-engineered for daily rotation — featherweight mesh over a nitrogen-charged midsole.'}
                {fs.id === 'court' && 'Heritage court lines, rebuilt on a sculpted gum sole. The quiet flex of the season.'}
                {fs.id === 'trail' && 'All-terrain aggression with a rocker geometry and lugged outsole built to bite loose ground.'}
              </p>
            </button>
          ))}

          <div className="lab-card" style={{ cursor: 'default', padding: 0, overflow: 'hidden' }}>
            <div className="lab-stat-row" style={{ borderTop: 'none' }}>
              <div className="lab-stat">
                <span className="micro-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Cushioning</span>
                <div className="lab-stat-val">{active.id === 'trail' ? '78%' : '92%'}</div>
                <div className="lab-stat-bar">
                  <div className="lab-stat-fill" style={{ width: active.id === 'trail' ? '78%' : '92%' }} />
                </div>
              </div>
              <div className="lab-stat">
                <span className="micro-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Grip</span>
                <div className="lab-stat-val">{active.id === 'trail' ? '96%' : '71%'}</div>
                <div className="lab-stat-bar">
                  <div className="lab-stat-fill" style={{ width: active.id === 'trail' ? '96%' : '71%' }} />
                </div>
              </div>
              <div className="lab-stat">
                <span className="micro-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Weight</span>
                <div className="lab-stat-val">{active.id === 'trail' ? '310g' : '240g'}</div>
                <div className="lab-stat-bar">
                  <div className="lab-stat-fill" style={{ width: active.id === 'trail' ? '62%' : '40%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
