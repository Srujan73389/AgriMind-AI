"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Layers, 
  Download, 
  Satellite, 
  Sparkles, 
  Activity, 
  Droplets, 
  SunMedium, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Eye, 
  Maximize2,
  TrendingUp,
  FileText,
  Zap,
  Info
} from "lucide-react";
import { FarmMap } from "@/components/farm/FarmMap";

interface SatelliteScan {
  date: string;
  cloudCover: string;
  avgNdvi: number;
  healthLabel: string;
  status: "optimal" | "warning" | "critical";
}

const TIMELINE_SCANS: SatelliteScan[] = [
  { date: "Aug 08, 2026", cloudCover: "0%", avgNdvi: 0.84, healthLabel: "High Canopy Vigor", status: "optimal" },
  { date: "Aug 02, 2026", cloudCover: "12%", avgNdvi: 0.81, healthLabel: "Healthy Growth", status: "optimal" },
  { date: "Jul 25, 2026", cloudCover: "5%", avgNdvi: 0.74, healthLabel: "Tiller Formation", status: "optimal" },
  { date: "Jul 15, 2026", cloudCover: "18%", avgNdvi: 0.62, healthLabel: "Early Vegetative", status: "warning" },
  { date: "Jun 30, 2026", cloudCover: "2%", avgNdvi: 0.45, healthLabel: "Post-Sowing Emergence", status: "warning" },
];

export default function SatellitePage() {
  const [selectedLayer, setSelectedLayer] = useState<"NDVI" | "NDWI" | "EVI" | "RGB">("NDVI");
  const [activeScan, setActiveScan] = useState<SatelliteScan>(TIMELINE_SCANS[0]);
  const [clickedSpot, setClickedSpot] = useState<{ x: number; y: number; ndvi: number; status: string } | null>({
    x: 45,
    y: 55,
    ndvi: 0.84,
    status: "Plot Center - Optimal Chlorophyll & Moisture"
  });

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Simulate varying NDVI based on click position
    const simulatedNdvi = Number((0.4 + Math.random() * 0.5).toFixed(2));
    const statusText =
      simulatedNdvi >= 0.7
        ? "Healthy Dense Crop (High Nitrogen)"
        : simulatedNdvi >= 0.5
        ? "Moderate Growth (Slight Moisture Deficit)"
        : "Water Stress Detected (Urgent Irrigation Needed)";

    setClickedSpot({ x, y, ndvi: simulatedNdvi, status: statusText });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <Satellite className="h-3.5 w-3.5" /> Sentinel-2 & Landsat-9 Satellite Crop Health Analytics
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Satellite Imagery & Crop Health</h1>
          <p className="text-muted-foreground text-sm">
            Monitor NDVI vegetation vigor, NDWI water stress, and crop canopy growth over Gadihalli farm plots.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={() => alert(`Exporting Satellite Land Inspection PDF for Gadihalli Farm Plot...`)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 px-5 font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2 text-xs"
          >
            <FileText className="h-4 w-4" /> Export Satellite Report PDF
          </Button>
        </div>
      </div>

      {/* Satellite Educational Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">What is NDVI Satellite Analysis?</div>
            <p className="text-slate-300 text-[11px]">
              Satellites calculate red vs near-infrared reflectance. <strong>Green (0.7 - 1.0)</strong> = Healthy Canopy, <strong>Yellow (0.4 - 0.6)</strong> = Mild Stress, <strong>Red (0.0 - 0.3)</strong> = Dry/Bare Soil.
            </p>
          </div>
        </div>

        {/* 4 Layer Switcher Buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/10 shrink-0">
          {[
            { key: "NDVI", label: "NDVI (Crop Health)" },
            { key: "NDWI", label: "NDWI (Water)" },
            { key: "EVI", label: "EVI (Canopy)" },
            { key: "RGB", label: "True RGB Photo" }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedLayer(item.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLayer === item.key
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Satellite Map & Analysis Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Satellite Map Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass overflow-hidden border-emerald-500/40 relative shadow-2xl">
            {/* Top Map Control Overlay */}
            <div className="p-4 bg-slate-950/90 border-b border-white/10 flex items-center justify-between z-10 relative">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500 text-black font-bold text-xs">
                  Active Layer: {selectedLayer}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Scan Date: {activeScan.date} (Cloud: {activeScan.cloudCover})
                </span>
              </div>

              <div className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                <Activity className="h-4 w-4" /> Avg NDVI: {activeScan.avgNdvi}
              </div>
            </div>

            {/* Interactive Map Surface Container */}
            <div
              onClick={handleMapClick}
              className="relative h-[440px] bg-slate-950 cursor-crosshair overflow-hidden group select-none"
            >
              <FarmMap interactive={true} />

              {/* Simulated Spectral Heatmap Filter Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
                  selectedLayer === "NDVI"
                    ? "mix-blend-color-dodge opacity-60 bg-gradient-to-tr from-red-600/40 via-yellow-500/30 to-emerald-500/60"
                    : selectedLayer === "NDWI"
                    ? "mix-blend-overlay opacity-70 bg-gradient-to-tr from-sky-600/50 via-blue-500/40 to-teal-400/60"
                    : selectedLayer === "EVI"
                    ? "mix-blend-hard-light opacity-50 bg-gradient-to-tr from-emerald-700/60 to-emerald-300/40"
                    : "opacity-0"
                }`}
              />

              {/* Pinpoint Click Inspector Marker */}
              {clickedSpot && (
                <div
                  style={{ left: `${clickedSpot.x}%`, top: `${clickedSpot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 pointer-events-none"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-75"></span>
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-2xl flex items-center justify-center text-[9px] font-bold text-black">
                      📍
                    </div>
                  </div>

                  {/* Inspector Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-7 w-48 p-2.5 rounded-xl bg-slate-950/95 border border-emerald-500/50 text-xs shadow-2xl backdrop-blur-md space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-white">Pinpoint Spot</span>
                      <span className="text-emerald-400 font-mono">NDVI {clickedSpot.ndvi}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-tight">{clickedSpot.status}</p>
                  </div>
                </div>
              )}

              {/* Click Map Hint Banner */}
              <div className="absolute top-4 left-4 bg-slate-950/80 border border-white/10 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 font-medium backdrop-blur-md pointer-events-none">
                💡 Click anywhere on the map to inspect pinpoint spot telemetry
              </div>

              {/* NDVI Color Scale Legend Bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-white/10 p-3 rounded-2xl backdrop-blur-md space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-white">
                  <span>NDVI Vigor Scale</span>
                  <span className="text-emerald-400 font-mono">0.0 (Bare Soil) $\rightarrow$ 1.0 (Dense Canopy)</span>
                </div>
                <div className="h-2.5 w-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-500 rounded-full" />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0.0 Bare Soil</span>
                  <span>0.3 Stress</span>
                  <span>0.6 Moderate</span>
                  <span>0.85 Peak Crop</span>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Satellite Problem Area Advisory */}
          <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                <AlertTriangle className="h-4 w-4 text-amber-400" /> AI Detected Problem Spot (South-West Corner)
              </div>
              <Badge className="bg-amber-400 text-black font-bold text-[10px]">Action Required</Badge>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Satellite NDWI index indicates a <strong>0.3-acre moisture deficit</strong> in the South-West corner of Gadihalli Plot A1.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <Button
                onClick={() => alert("Smart Drip Irrigation Zone 2 activated!")}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs h-9 px-4 rounded-xl shadow-lg shadow-amber-950/40 flex items-center gap-2"
              >
                <Zap className="h-3.5 w-3.5" /> Turn On Drip Irrigation Zone 2
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Historical 12-Month Satellite Timeline & Stats */}
        <div className="space-y-4">
          <Card className="glass p-5 space-y-4 border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-400" /> Satellite Pass Timeline
              </h3>
              <span className="text-[10px] text-slate-400">Sentinel-2 Pass</span>
            </div>

            <div className="space-y-2 text-xs">
              {TIMELINE_SCANS.map((scan, idx) => {
                const isSelected = activeScan.date === scan.date;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveScan(scan)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? "bg-emerald-500/20 border-emerald-500/60 shadow-lg"
                        : "bg-slate-900/60 border-white/10 hover:border-emerald-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{scan.date}</span>
                      <span className="text-emerald-400 font-mono font-bold">NDVI {scan.avgNdvi}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span>Cloud Cover: {scan.cloudCover}</span>
                      <span className="text-slate-300 font-medium">{scan.healthLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 12-Month Crop Vigor Trend Analysis */}
          <Card className="glass p-5 space-y-3 border-white/10">
            <div className="font-bold text-white text-sm flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-400" /> Season Growth Vigor Trend
              </span>
              <span className="text-emerald-400 font-mono text-xs font-bold">+18.4% YoY</span>
            </div>

            <p className="text-xs text-slate-300">
              Crop biomass density is <strong>18.4% higher</strong> than last season at the same growth stage in Gadihalli.
            </p>

            <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1 text-xs">
              <div className="text-slate-400 text-[10px]">Projected Yield Potential</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">24.5 Quintals / Acre</div>
              <div className="text-[10px] text-slate-400">Based on multi-spectral canopy density</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
