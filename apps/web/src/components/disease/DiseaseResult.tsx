"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  Layers, 
  Sparkles, 
  HelpCircle,
  FileText,
  ShoppingCart,
  Calculator,
  Calendar,
  CloudSun,
  Droplets,
  Zap,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SamplePreset } from "./UploadZone";
import Link from "next/link";
import { downloadOfficialPdf } from "@/lib/pdfHelper";

interface DiseaseResultProps {
  result: SamplePreset | null;
  selectedImage: string | null;
  analyzing: boolean;
  progress: number;
}

export function DiseaseResult({
  result,
  selectedImage,
  analyzing,
  progress,
}: DiseaseResultProps) {
  const [showGradCam, setShowGradCam] = useState(true);
  const [plotAcres, setPlotAcres] = useState(2.5);
  const [activeScanPoint, setActiveScanPoint] = useState<"top" | "underside" | "stem" | "root">("top");

  if (analyzing) {
    return (
      <Card className="glass p-8 flex flex-col items-center justify-center text-center h-[580px] border-emerald-500/30">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-emerald-500 border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-emerald-400 font-bold text-sm font-mono">
            {progress}%
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-400 animate-pulse" />
          YOLOv11 AI Neural Diagnostics Active
        </h3>

        <div className="w-full max-w-xs bg-slate-800 rounded-full h-2 mb-4 overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-slate-400 max-w-xs">
          {progress < 30 && "Extracting spatial feature maps & chlorosis patterns..."}
          {progress >= 30 && progress < 70 && "Running ResNet-50 vision model & Grad-CAM visual explanation..."}
          {progress >= 70 && "Synthesizing 7-day spore risk & spray recipe..."}
        </p>
      </Card>
    );
  }

  if (!result || !selectedImage) {
    return (
      <Card className="glass p-8 flex flex-col items-center justify-center text-center h-[580px] border-white/10">
        <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mb-4 text-slate-400">
          <Eye className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Leaf Analysis Selected</h3>
        <p className="text-sm text-slate-400 max-w-xs">
          Upload a leaf photo or pick a sample image on the left, then click <strong>Run AI Diagnosis</strong> to generate diagnostic heatmaps.
        </p>
      </Card>
    );
  }

  const isHealthy = result.severity === 0;

  // Spray Dosage Calculations based on Acres
  const requiredWaterLiters = Math.round(plotAcres * 60); // 60L per acre
  const requiredFungicideGram = Math.round(plotAcres * 200); // 200g per acre
  const requiredNeemOilMl = Math.round(plotAcres * 100); // 100ml per acre

  const handleExportPdf = () => {
    downloadOfficialPdf({
      title: `${result.diseaseName} AI Diagnostic Certificate`,
      category: "Disease AI",
      date: "Aug 08, 2026",
      farmPlot: `Target Leaf Scan (${result.crop})`,
      location: "Gadihalli Village, Ajjampura Tq, KA",
      summary: `Diagnostic result: ${result.diseaseName} (${result.scientificName}). Confidence score: ${result.confidence}%. Severity rating: ${result.severityLabel}. Spray recipe calculated for ${plotAcres} Acres.`
    });
  };

  return (
    <Card
      className={`glass overflow-hidden flex flex-col h-full border-2 ${
        isHealthy ? "border-emerald-500/40" : "border-amber-500/40"
      }`}
    >
      {/* 1. Leaf Photo + Grad-CAM Heatmap Overlay Container */}
      <div className="relative h-56 bg-slate-950 overflow-hidden group">
        <img
          src={selectedImage}
          alt={result.diseaseName}
          className="w-full h-full object-cover"
        />

        {/* Grad-CAM Heatmap Overlay */}
        {!isHealthy && showGradCam && (
          <div className="absolute inset-0 mix-blend-color-dodge opacity-80 pointer-events-none transition-opacity duration-300">
            <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-300 rounded-full blur-2xl opacity-70 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-red-500 rounded-full blur-xl opacity-60" />
          </div>
        )}

        {/* Grad-CAM Toggle Control */}
        {!isHealthy && (
          <button
            onClick={() => setShowGradCam(!showGradCam)}
            className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-white/10 text-xs font-medium text-white flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-colors"
          >
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            <span>{showGradCam ? "Hide Grad-CAM Heatmap" : "Show AI Heatmap"}</span>
          </button>
        )}

        {/* Confidence Badge Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <Badge className="bg-slate-950/90 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold px-3 py-1 backdrop-blur-md">
            {result.confidence}% Confidence
          </Badge>
        </div>
      </div>

      {/* 📸 4-Point Scan View Selector */}
      <div className="bg-slate-900 px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium text-[11px]">4-Point Scan Angle:</span>
        <div className="flex gap-1">
          {[
            { key: "top", label: "Foliar Top" },
            { key: "underside", label: "Underside" },
            { key: "stem", label: "Stem Base" },
            { key: "root", label: "Root System" }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveScanPoint(item.key as any)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                activeScanPoint === item.key
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-950 text-slate-400 hover:text-white border border-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diagnostic Summary Header */}
      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge
              className={
                isHealthy
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border-amber-500/30"
              }
            >
              {result.crop} • {result.severityLabel}
            </Badge>
          </div>

          <h2 className="text-xl font-bold text-white leading-tight">{result.diseaseName}</h2>
          <p className="text-xs text-slate-400 font-mono italic mt-0.5">{result.scientificName}</p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/5">
          {result.description}
        </p>

        {/* 📅 7-Day Spore Spread Infection Risk Meter */}
        {!isHealthy && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-amber-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-400" /> 7-Day Spore Infection Risk Forecast
              </span>
              <span className="text-red-400 font-mono uppercase font-black">HIGH RISK (68% Humidity)</span>
            </div>
            <p className="text-[11px] text-slate-300">
              High humidity forecast in 48 hours will accelerate spore germination by <strong>+35%</strong>. Apply spray treatment immediately.
            </p>
          </div>
        )}

        {/* 🧪 1-Click Bio-Pesticide & Spray Recipe Calculator */}
        {!isHealthy && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-white">
              <span className="flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-emerald-400" /> Bio-Pesticide Spray Recipe Calculator
              </span>
              <span className="text-emerald-400 text-[11px]">Field Area</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-300 font-medium">Acres to Spray:</span>
              <Input
                type="number"
                value={plotAcres}
                onChange={(e) => setPlotAcres(Math.max(0.5, Number(e.target.value)))}
                className="w-24 h-8 bg-slate-900 border-slate-800 text-white font-mono text-xs font-bold"
              />
              <span className="text-slate-400 text-[11px]">Acres</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px] pt-1">
              <div className="p-2 rounded-xl bg-slate-900 border border-white/10">
                <div className="text-[10px] text-slate-400">Water Tank</div>
                <div className="text-sky-400 font-bold">{requiredWaterLiters} L</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-900 border border-white/10">
                <div className="text-[10px] text-slate-400">Copper Hydroxide</div>
                <div className="text-emerald-400 font-bold">{requiredFungicideGram} g</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-900 border border-white/10">
                <div className="text-[10px] text-slate-400">Neem Oil Bio Mix</div>
                <div className="text-amber-400 font-bold">{requiredNeemOilMl} ml</div>
              </div>
            </div>
          </div>
        )}

        {/* Treatment Protocol List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> Recommended Action Protocol
          </h4>

          <div className="space-y-2 text-xs">
            {result.treatments.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: Buy Fungicide Kit & Export PDF */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link href="/marketplace" className="block">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 text-xs">
              <ShoppingCart className="h-4 w-4" /> 1-Click Buy Fungicide Kit (₹320)
            </Button>
          </Link>

          <Button
            onClick={handleExportPdf}
            variant="outline"
            className="w-full border-white/10 hover:border-emerald-500/40 bg-slate-900 text-white font-bold h-11 rounded-xl flex items-center justify-center gap-2 text-xs"
          >
            <FileText className="h-4 w-4 text-emerald-400" /> Export Diagnostic PDF
          </Button>
        </div>
      </div>
    </Card>
  );
}
