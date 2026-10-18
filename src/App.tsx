import { useEffect, useRef, useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ScrollScrub from '@/components/ScrollScrub';
import Categories from '@/components/Categories';
import SneakerLab from '@/components/SneakerLab';
import SneakerCanvas from '@/components/SneakerCanvas';
import Listings from '@/components/Listings';
import About from '@/components/About';
import FinaleFooter from '@/components/FinaleFooter';
import { preloadAllFrames } from '@/lib/frameCache';
import type { FrameSet } from '@/components/SneakerLab';

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    preloadAllFrames(
      (done, total) => {
        const progress = document.getElementById('progress');
        if (progress) {
          const pct = Math.round((done / total) * 100);
          progress.textContent = pct >= 100 ? 'Opening' : `Preparing the Film: ${pct}%`;
        }
      },
      controller.signal
    )
      .catch(() => undefined)
      .finally(() => {
        const progress = document.getElementById('progress');
        if (progress) progress.textContent = 'Curating the Form: 100%';
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
        setReady(true);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer.finale-footer');
    const main = mainRef.current;
    const update = () => {
      if (footer && main) {
        main.style.setProperty('--footer-height', `${(footer as HTMLElement).offsetHeight}px`);
      }
    };
    window.addEventListener('resize', update);
    const t = window.setTimeout(update, 50);
    return () => {
      window.removeEventListener('resize', update);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <>
      <Nav />
      <main id="main-content" ref={mainRef}>
        <Hero />
        <ScrollScrub ready={ready} />
        <Categories />
        <SneakerLab
          renderViewer={(activeFeature: FrameSet, interacted: boolean, onInteract: () => void) => (
            <SneakerCanvas activeFeature={activeFeature} interacted={interacted} onInteract={onInteract} />
          )}
        />
        <Listings />
        <About />
      </main>
      <FinaleFooter />
    </>
  );
}
