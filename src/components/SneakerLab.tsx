import React from 'react';

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

        {/* 3D Viewport Container */}
        <div className="relative w-full h-[500px] md:h-[650px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl">
          <iframe
            src="https://playcanv.as/p/EZ7dJzfc/"
            title="Sneaker Lab 3D Viewport"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; vr; xr; xr-spatial-tracking"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
