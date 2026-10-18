import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

const PLAYCANVAS_URL = "https://playcanv.as/p/EZ7dJzfc/";

export default function SneakerLab() {
  return (
    <section id="sneaker-lab" className="w-full relative bg-slate-950 text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section Header */}
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase">
            Sneaker Lab
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-1">
            Interactive 3D Sneaker Preview
          </p>
        </div>

        {/* 3D Viewport Fallback / Launcher Card */}
        <div className="relative w-full h-[400px] md:h-[550px] bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-8 h-8" />
          </div>
          
          <div className="space-y-1 max-w-md">
            <h3 className="text-xl font-bold">Launch 3D Sneaker Lab</h3>
            <p className="text-sm text-slate-400">
              Explore the interactive 3D model in high fidelity with full orbit, pan, and zoom controls.
            </p>
          </div>

          <a
            href={PLAYCANVAS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20"
          >
            Open 3D Experience <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
