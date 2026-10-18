import { useEffect, useRef, useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { FRAME_COUNT, getCachedFrame } from '@/lib/frameCache';

const LOAD_WINDOW = 60;
const SMOOTHING = 0.12;

const frameUrlFor = (i: number) => {
  const base = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/scroll-frames/frames`;
  return `${base}/frame_${String(i).padStart(4, '0')}.webp`;
};

export default function ScrollScrub({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0);

  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const cache = useRef(new Set<number>());
  const urls = useRef(new Map<number, string>());
  const pending = useRef(new Set<number>());

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = -rect.top / total;
      targetRef.current = Math.max(0, Math.min(1, p));
      setProgress(targetRef.current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    const animate = () => {
      smoothRef.current += (targetRef.current - smoothRef.current) * SMOOTHING;
      if (Math.abs(targetRef.current - smoothRef.current) < 0.0005) {
        smoothRef.current = targetRef.current;
      }
      const el = sectionRef.current;
      if (el) {
        const bar = el.querySelector<HTMLElement>('.scrub-progress-fill');
        if (bar) bar.style.width = `${smoothRef.current * 100}%`;
      }
      setTick((t) => t + 1);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  const loadFrame = (n: number) => {
    if (n < 1 || n > FRAME_COUNT || cache.current.has(n) || pending.current.has(n)) return;
    pending.current.add(n);
    getCachedFrame(n)
      .then((blob) => {
        if (blob && !urls.current.has(n)) {
          urls.current.set(n, URL.createObjectURL(blob));
          cache.current.add(n);
          setTick((t) => t + 1);
        }
      })
      .catch(() => undefined)
      .finally(() => pending.current.delete(n));
  };

  const smooth = tick >= 0 ? smoothRef.current : 0;
  const target = Math.max(1, Math.min(FRAME_COUNT, Math.round(smooth * (FRAME_COUNT - 1)) + 1));

  useEffect(() => {
    if (!ready) return;
    for (let off = 0; off <= LOAD_WINDOW; off++) {
      loadFrame(target + off);
      loadFrame(target - off);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, tick, ready]);

  const display =
    Array.from({ length: LOAD_WINDOW * 4 + 1 }).reduce<number | null>((found, _, idx) => {
      if (found !== null) return found;
      if (cache.current.has(target + idx)) return target + idx;
      if (cache.current.has(target - idx)) return target - idx;
      return null;
    }, null) ?? 1;

  const showTitle = progress < 0.05 || progress > 0.95;

  return (
    <section className="video-scrub-section" id="scrub-section" ref={sectionRef}>
      <div className="video-sticky">
        <img
          src={urls.current.get(display) ?? frameUrlFor(display)}
          alt="Amarni film frame"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.9,
          }}
        />

        <div className="video-overlay" style={{ opacity: showTitle ? 1 : 0 }}>
          <span className="micro-label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeftRight size={14} /> Scroll to Explore
          </span>
          <h2>FLUIDITY IN STEP</h2>
        </div>

        <div className="scrub-progress-hint">
          <span className="micro-label" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {Math.round(smooth * 100)}%
          </span>
          <div className="scrub-progress-track">
            <div className="scrub-progress-fill" style={{ width: `${smooth * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
