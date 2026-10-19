import { useState } from 'react';
import { RotateCw } from 'lucide-react';

export type FrameSet = {
  id: string;
  name: string;
  description: string;
  stats: { label: string; value: number; display: string }[];
};

const FEATURED: FrameSet[] = [
  {
    id: 'runner',
    name: 'Aero Runner',
    description:
      'Technical mesh upper with a recycled cushion core. Engineered for the city stride.',
    stats: [
      { label: 'Cushion', value: 86, display: '86' },
      { label: 'Breathability', value: 92, display: '92' },
      { label: 'Weight', value: 38, display: '240g' },
    ],
  },
  {
    id: 'court',
    name: 'Court Legacy 70',
    description:
      'Nubuck upper over a gum sole. A archival silhouette re-cut for the contemporary foot.',
    stats: [
      { label: 'Cushion', value: 64, display: '64' },
      { label: 'Breathability', value: 70, display: '70' },
      { label: 'Weight', value: 52, display: '310g' },
    ],
  },
  {
    id: 'trail',
    name: 'Terra Trail GTX',
    description:
      'Ripstop shell with a Vibram outsole. Built for off-grid distance and weather.',
    stats: [
      { label: 'Cushion', value: 78, display: '78' },
      { label: 'Breathability', value: 58, display: '58' },
      { label: 'Weight', value: 74, display: '340g' },
    ],
  },
];

type Props = {
  renderViewer: (
    activeFeature: FrameSet,
    interacted: boolean,
    onInteract: () => void
  ) => React.ReactNode;
};

export default function SneakerLab({ renderViewer }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);

  const activeFeature = FEATURED[activeIndex];

  return (
    <section id="sneaker-lab" className="sneaker-lab">
      <div className="lab-section-header">
        <div>
          <span className="micro-label" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Atelier
          </span>
          <h2>Sneaker Lab</h2>
        </div>
        <span className="micro-label" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Drag to orbit
        </span>
      </div>

      <div className="lab-grid">
        <div className="lab-viewer">
          <div className="lab-viewer-inner">
            {renderViewer(activeFeature, interacted, () => setInteracted(true))}
          </div>
          <div className={`lab-hint ${interacted ? 'is-hidden' : ''}`}>
            <RotateCw size={14} style={{ opacity: 0.7 }} />
            <span className="micro-label" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Drag to explore
            </span>
          </div>
        </div>

        <div className="lab-panel">
          {FEATURED.map((feature, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={feature.id}
                className={`lab-card ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveIndex(i);
                  setInteracted(false);
                }}
                aria-pressed={isActive}
              >
                <div className="lab-card-row">
                  <span className="lab-card-title">{feature.name}</span>
                  <span className="micro-label" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p>{feature.description}</p>
                {isActive && (
                  <div className="lab-stat-row">
                    {feature.stats.map((stat) => (
                      <div className="lab-stat" key={stat.label}>
                        <div className="lab-stat-val">{stat.display}</div>
                        <div className="micro-label" style={{ color: 'rgba(255,255,255,0.55)', marginTop: '0.4rem' }}>
                          {stat.label}
                        </div>
                        <div className="lab-stat-bar">
                          <div
                            className="lab-stat-fill"
                            style={{ width: `${stat.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
