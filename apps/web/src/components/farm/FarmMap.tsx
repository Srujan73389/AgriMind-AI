"use client";

import { useEffect, useRef } from "react";
// In a real app, this would import maplibre-gl and styling
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';

interface FarmMapProps {
  interactive?: boolean;
}

export function FarmMap({ interactive = false }: FarmMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Placeholder for map initialization
    // const map = new maplibregl.Map({
    //   container: mapContainer.current,
    //   style: '...',
    //   center: [-98.5795, 39.8283],
    //   zoom: 14,
    //   interactive
    // });
    // return () => map.remove();
  }, [interactive]);

  return (
    <div className="w-full h-full bg-slate-900 relative rounded-xl overflow-hidden group">
      {/* Fallback visual for demo purposes */}
      <div 
        ref={mapContainer} 
        className="w-full h-full bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60"
      />
      <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay" />
      
      {/* Mock polygon drawing */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon 
          points="20,20 80,30 70,80 30,70" 
          fill="rgba(16, 185, 129, 0.2)" 
          stroke="rgba(16, 185, 129, 0.8)" 
          strokeWidth="0.5" 
          strokeDasharray={interactive ? "1 1" : "none"}
        />
        {interactive && (
          <>
            <circle cx="20" cy="20" r="1.5" fill="white" stroke="#10b981" strokeWidth="0.5" />
            <circle cx="80" cy="30" r="1.5" fill="white" stroke="#10b981" strokeWidth="0.5" />
            <circle cx="70" cy="80" r="1.5" fill="white" stroke="#10b981" strokeWidth="0.5" />
            <circle cx="30" cy="70" r="1.5" fill="white" stroke="#10b981" strokeWidth="0.5" />
          </>
        )}
      </svg>
      
      {!interactive && (
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live View
        </div>
      )}
    </div>
  );
}
