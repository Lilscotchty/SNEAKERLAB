import React, { useEffect, useRef } from 'react';
import { Sparkles, Rotate3d, ExternalLink, Layers, Cpu } from 'lucide-react';

const SPLAT_MODEL_URL = "https://playcanv.as/p/EZ7dJzfc/"; // Or direct .ply / .splat file URL if hosted directly

export default function SneakerLab() {
  const containerRef = useRef(null);

  return (
    <section id="sneaker-lab" className="w-full relative bg-slate-950 text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> 3D Gaussian Splatting
            </div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase">
              Sneaker Lab
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            High-fidelity neural radiance field & Gaussian splat model inspection viewport.
          </p>
        </div>

        {/* Viewport Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[650px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl flex flex-col items-center justify-center"
        >
          {/* 
            If the external source restricts embedding, we provide an interactive fallback 
            that links directly to the full interactive workspace, or integrates a direct WebGL canvas.
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-950/80 to-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4 z-10">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10 animate-pulse">
              <Rotate3d className="w-8 h-8" />
            </div>

            <div className="space-y-1 max-w-md">
              <h3 className="text-xl font-bold tracking-wide">Gaussian Splat Environment Ready</h3>
              <p className="text-xs md:text-sm text-slate-400">
                The 3D model context is linked. Launch the high-resolution viewport to interact with the full 360° point cloud data.
              </p>
            </div>

            <a
              href={SPLAT_MODEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs md:text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              Open Interactive Viewport <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Background Ambient Grid Effect */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
