import React, { useState, useRef } from 'react';
import { 
  Maximize2, 
  RotateCcw, 
  Rotate3d, 
  Sparkles, 
  Layers, 
  Cpu, 
  Eye, 
  ZoomIn, 
  ZoomOut,
  Sliders,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

const PLAYCANVAS_URL = "https://playcanv.as/p/EZ7dJzfc/";

export default function SneakerLab() {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('3d-lab');
  const [selectedPreset, setSelectedPreset] = useState('default');
  const [wireframeMode, setWireframeMode] = useState(false);
  const [lighting, setLighting] = useState('studio');

  // Specs overlay panel
  const sneakerSpecs = [
    { label: "Mesh Resolution", value: "142,500 Polys", icon: Layers },
    { label: "Texture Engine", value: "4K PBR Materials", icon: Sparkles },
    { label: "Render Engine", value: "PlayCanvas WebGL 2.0", icon: Cpu },
    { label: "Interactive Rig", value: "360° Orbit & Zoom", icon: Rotate3d },
  ];

  // Reload/Reset 3D Canvas
  const handleResetView = () => {
    if (iframeRef.current) {
      iframeRef.current.src = PLAYCANVAS_URL;
    }
  };

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => console.error(err));
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <section id="sneaker-lab" className="w-full bg-slate-950 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background Subtle Glow Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Interactive 3D Experience
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              Sneaker <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Lab</span>
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm md:text-base">
              Inspect footwear concepts in real-time high-fidelity 3D. Rotate, zoom, and test material textures directly inside the lab viewport.
            </p>
          </div>

          {/* Navigation / Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('3d-lab')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === '3d-lab'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              3D Viewport
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'specs'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Material Specs
            </button>
          </div>
        </div>

        {/* MAIN LAB DISPLAY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 3D PLAYCANVAS VIEWER CONTAINER (Takes 8 of 12 columns on large screens) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div 
              ref={containerRef}
              className="relative w-full h-[500px] md:h-[620px] bg-slate-900/90 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl group transition-all"
            >
              {/* PlayCanvas Embed Frame */}
              <iframe
                ref={iframeRef}
                src={PLAYCANVAS_URL}
                title="SneakerLab 3D Model"
                className="w-full h-full border-0 rounded-2xl"
                allow="autoplay; fullscreen; vr; xr; xr-spatial-tracking"
                loading="lazy"
              />

              {/* Floating Glassmorphism Toolbar (Top Right) */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20 bg-slate-950/70 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/50 shadow-lg">
                <button
                  onClick={handleResetView}
                  title="Reset 3D View"
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  title="Toggle Fullscreen"
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <a
                  href={PLAYCANVAS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open External Viewer"
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Interactive Help Hint Overlay (Bottom Left) */}
              <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-3 bg-slate-950/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                <Rotate3d className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                <span>Drag to Rotate • Scroll to Zoom • Right-Click Drag to Pan</span>
              </div>
            </div>

            {/* Quick Preset Buttons Below Canvas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'default', name: 'Studio Standard' },
                { id: 'neon', name: 'Cyber Neon' },
                { id: 'clay', name: 'Clay Render' },
                { id: 'xray', name: 'Blueprint X-Ray' }
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                    selectedPreset === preset.id
                      ? 'bg-slate-800 border-cyan-500/50 text-cyan-400 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* SIDE CONTROLS & SPECIFICATION PANEL (Takes 4 of 12 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Model Info Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Lab Prototype 01</h3>
                  <p className="text-xs text-cyan-400 font-mono">MODEL ID: #SL-3D-2026</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" title="System Active" />
              </div>

              {/* Specs Grid */}
              <div className="space-y-3.5">
                {sneakerSpecs.map((spec, i) => {
                  const Icon = spec.icon;
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
                      <div className="flex items-center gap-2.5 text-slate-300 text-xs">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <span>{spec.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">{spec.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Interactive Lab Controls */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" /> Viewport Adjustments
              </h4>

              {/* Lighting Switcher */}
              <div className="space-y-2">
                <label className="text-xs text-slate-300">Environment Lighting</label>
                <div className="grid grid-cols-3 gap-2">
                  {['studio', 'outdoor', 'dark'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLighting(mode)}
                      className={`py-1.5 rounded-lg text-xs font-medium capitalize border transition-all ${
                        lighting === mode
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wireframe Toggle */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-300">Show Geometry Wireframe</span>
                <button
                  onClick={() => setWireframeMode(!wireframeMode)}
                  className={`w-11 h-6 rounded-full transition-colors p-1 relative flex items-center ${
                    wireframeMode ? 'bg-cyan-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      wireframeMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Quality Status Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900/40 border border-cyan-500/20 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-slate-200">Real-time WebGL active</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  PlayCanvas WebGL engine rendering high-detail textures directly in browser without plug-ins.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
