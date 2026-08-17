"use client";

import { useState } from "react";
import { Listing, AiMatchRequest } from "./types";
import { INITIAL_LISTINGS } from "./data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  X,
  Bot,
  Wheat,
  Tractor,
  Gauge,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame,
  Clock,
  Layers,
  Scale,
  Mic,
  Camera,
  CloudSun,
  TrendingUp,
  Users,
  Calendar,
  Volume2
} from "lucide-react";

interface AiImplementMatchmakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectListing: (listing: Listing) => void;
  onCompareListing: (listing: Listing) => void;
}

export function AiImplementMatchmakerModal({
  isOpen,
  onClose,
  onSelectListing,
  onCompareListing,
}: AiImplementMatchmakerModalProps) {
  const [form, setForm] = useState<AiMatchRequest>({
    crop: "Groundnut",
    acres: 3,
    soilType: "Red Soil",
    tractorHp: 45,
  });

  const [activeLanguage, setActiveLanguage] = useState<string>("Hindi");
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  // Soil Scanner state
  const [soilScanImage, setSoilScanImage] = useState<string | null>(null);
  const [isScanningSoil, setIsScanningSoil] = useState(false);
  const [soilScanResult, setSoilScanResult] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [result, setResult] = useState<Listing | null>(null);

  if (!isOpen) return null;

  const handleApplyPreset = (crop: string, acres: number, soilType: string, tractorHp: number) => {
    setForm({ crop, acres, soilType, tractorHp });
  };

  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setVoiceText("Listening in " + activeLanguage + "...");
      setTimeout(() => {
        if (activeLanguage === "Hindi") {
          setVoiceText('"Mujhe 5 acre Paddy ke liye rotavator aur 45 HP tractor chahiye"');
          setForm({ crop: "Paddy / Rice", acres: 5, soilType: "Clay / Wet Mud", tractorHp: 45 });
        } else if (activeLanguage === "Telugu") {
          setVoiceText('"3 acres Groundnut ki land prep implement kaavali 45 HP tractor ki"');
          setForm({ crop: "Groundnut", acres: 3, soilType: "Red Soil", tractorHp: 45 });
        } else {
          setVoiceText('"I need land preparation implement for 4 acres Cotton with 50 HP tractor"');
          setForm({ crop: "Cotton", acres: 4, soilType: "Black Cotton Soil", tractorHp: 50 });
        }
        setIsListening(false);
      }, 2000);
    }
  };

  const handleScanSoilPhoto = (type: "hard" | "mud" | "red") => {
    setIsScanningSoil(true);
    setSoilScanResult(null);
    setTimeout(() => {
      setIsScanningSoil(false);
      if (type === "hard") {
        setSoilScanImage("https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?w=800&auto=format&fit=crop&q=80");
        setSoilScanResult("Vision AI Detected: High Compaction Hard Soil → Recommended: Disc Plough for Primary Inversion.");
        setForm((prev) => ({ ...prev, soilType: "Hard Dry Soil" }));
      } else if (type === "mud") {
        setSoilScanImage("https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80");
        setSoilScanResult("Vision AI Detected: High Moisture Paddy Mud → Recommended: Kubota 4WD Waterproof Puddling Tractor.");
        setForm((prev) => ({ ...prev, soilType: "Clay / Wet Mud", crop: "Paddy / Rice" }));
      } else {
        setSoilScanImage("https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80");
        setSoilScanResult("Vision AI Detected: Loose Red Loam → Recommended: Shaktiman 7-ft Rotavator.");
        setForm((prev) => ({ ...prev, soilType: "Red Soil" }));
      }
    }, 1200);
  };

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setActiveStep(1);
    setResult(null);

    // Simulate Agentic Multi-Agent Pipeline steps
    setTimeout(() => setActiveStep(2), 600);
    setTimeout(() => setActiveStep(3), 1200);
    setTimeout(() => setActiveStep(4), 1800);
    setTimeout(() => {
      setIsAnalyzing(false);
      const matched = INITIAL_LISTINGS.find((item) => {
        if (item.category !== "equipment") return false;
        const minHp = item.minHpRequired || 35;
        const maxHp = item.maxHpRequired || 60;
        return form.tractorHp >= minHp && form.tractorHp <= maxHp + 10;
      }) || INITIAL_LISTINGS[0];

      setResult(matched);
    }, 2400);
  };

  // ROI Math
  const acresCount = form.acres || 3;
  const manualLaborCost = acresCount * 1600; // ₹1600 per acre manual wages
  const implementRentalCost = result ? result.price : 1200;
  const netSavings = Math.max(0, manualLaborCost - implementRentalCost);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950 border border-emerald-500/30 rounded-3xl w-full max-w-4xl overflow-hidden relative shadow-2xl space-y-0">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shadow-lg">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                <Sparkles className="h-3 w-3" /> Multi-Agent Voice & Vision Intelligence
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">AgriMind AI Implement & Crop Assistant</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-red-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Smart Alerts Bar (Weather & Seasonal Calendar) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex items-center gap-3 text-xs">
              <CloudSun className="h-6 w-6 text-sky-400 shrink-0" />
              <div>
                <div className="font-bold text-white flex items-center gap-1">
                  Weather Alert • Ludhiana Region
                </div>
                <div className="text-slate-300 text-[11px]">
                  Rain expected in 48h. Finish leveling & seedbed preparation today!
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-3 text-xs">
              <Calendar className="h-6 w-6 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Seasonal Sowing Reminder</div>
                <div className="text-slate-300 text-[11px]">
                  Rabi Sowing starting in 14 days. Pre-book Seed Drill & Rotavator now.
                </div>
              </div>
            </div>
          </div>

          {/* 🎙️ Vernacular Voice Input Bar */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-bold text-white">🎙️ Speak in Your Native Language (Voice Assistant)</span>
              </div>

              {/* Language Selector */}
              <div className="flex gap-1">
                {["Hindi", "Telugu", "Punjabi", "English"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLanguage(lang)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                      activeLanguage === lang
                        ? "bg-purple-500 text-white"
                        : "bg-slate-950 border border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleToggleVoice}
                className={`h-11 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isListening
                    ? "bg-red-600 animate-pulse text-white shadow-lg shadow-red-950/50"
                    : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-950/40"
                }`}
              >
                <Mic className="h-4 w-4" />
                {isListening ? "Listening..." : `Tap to Speak (${activeLanguage})`}
              </Button>

              <div className="flex-1 text-xs text-slate-300 italic truncate bg-slate-950 px-3 py-2.5 rounded-xl border border-white/10">
                {voiceText || `Say: "Mujhe 5 acre Paddy ke liye rotavator aur 45 HP tractor chahiye"`}
              </div>
            </div>
          </div>

          {/* 📸 Vision Soil Photo Scanner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">📸 Vision AI Soil Texture Scanner</span>
              </div>
              <span className="text-[11px] text-slate-400">Scan field soil photo for automatic implement selection</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleScanSoilPhoto("hard")}
                className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 hover:border-emerald-500 flex items-center justify-center gap-1.5"
              >
                <span>🪨 Hard Dry Soil</span>
              </button>

              <button
                type="button"
                onClick={() => handleScanSoilPhoto("mud")}
                className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 hover:border-emerald-500 flex items-center justify-center gap-1.5"
              >
                <span>🌊 Wet Paddy Mud</span>
              </button>

              <button
                type="button"
                onClick={() => handleScanSoilPhoto("red")}
                className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300 hover:border-emerald-500 flex items-center justify-center gap-1.5"
              >
                <span>🌱 Loose Red Soil</span>
              </button>
            </div>

            {isScanningSoil && (
              <div className="text-xs text-emerald-400 flex items-center gap-2 animate-pulse">
                <Sparkles className="h-4 w-4 animate-spin" /> Vision AI Analyzing Soil Compaction & Moisture...
              </div>
            )}

            {soilScanResult && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{soilScanResult}</span>
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400" /> One-Tap Preset Farm Scenarios
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset("Groundnut", 3, "Red Soil", 45)}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  form.crop === "Groundnut" && form.tractorHp === 45
                    ? "bg-emerald-500/20 border-emerald-500 text-white font-semibold"
                    : "bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <div className="font-bold text-white mb-0.5">🥜 Groundnut Prep</div>
                <div className="text-[11px] text-slate-400">3 Acres • Red Soil • 45 HP Tractor</div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset("Paddy / Rice", 10, "Clay / Wet Mud", 55)}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  form.crop === "Paddy / Rice" && form.tractorHp === 55
                    ? "bg-emerald-500/20 border-emerald-500 text-white font-semibold"
                    : "bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <div className="font-bold text-white mb-0.5">🌾 Paddy Wet Puddling</div>
                <div className="text-[11px] text-slate-400">10 Acres • Mud Clay • 55 HP 4WD</div>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset("Cotton", 5, "Black Cotton Soil", 40)}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  form.crop === "Cotton" && form.tractorHp === 40
                    ? "bg-emerald-500/20 border-emerald-500 text-white font-semibold"
                    : "bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <div className="font-bold text-white mb-0.5">☁️ Cotton Ridge Planting</div>
                <div className="text-[11px] text-slate-400">5 Acres • Black Soil • 40 HP Tractor</div>
              </button>
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/50 border border-white/10">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Wheat className="h-3.5 w-3.5 text-emerald-400" /> Target Crop Type
              </label>
              <select
                value={form.crop}
                onChange={(e) => setForm({ ...form, crop: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="Groundnut">Groundnut / Peanut</option>
                <option value="Paddy / Rice">Paddy / Rice</option>
                <option value="Cotton">Bt Cotton</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize / Corn</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Tomato">Tomato / Vegetables</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-emerald-400" /> Farm Land Size (Acres)
              </label>
              <Input
                type="number"
                min={1}
                max={100}
                value={form.acres}
                onChange={(e) => setForm({ ...form, acres: Math.max(1, Number(e.target.value)) })}
                className="bg-slate-950 border-slate-800 h-10 text-xs text-white focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Soil Condition
              </label>
              <select
                value={form.soilType}
                onChange={(e) => setForm({ ...form, soilType: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="Red Soil">Red Loam Soil</option>
                <option value="Black Cotton Soil">Black Cotton Heavy Soil</option>
                <option value="Clay / Wet Mud">Wet Clay Paddy Mud</option>
                <option value="Hard Dry Soil">Hard Dry Soil</option>
                <option value="Sandy Soil">Sandy Alluvial Soil</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5 text-amber-400" /> My Tractor Power (HP)
                </label>
                <span className="text-xs font-bold text-emerald-400 font-mono">{form.tractorHp} HP</span>
              </div>
              <input
                type="range"
                min={25}
                max={75}
                step={5}
                value={form.tractorHp}
                onChange={(e) => setForm({ ...form, tractorHp: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>25 HP (Mini)</span>
                <span>45 HP (Utility)</span>
                <span>75 HP (Heavy)</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold h-12 rounded-2xl shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin text-amber-300" />
                <span>Agents Synthesizing Multi-Agent Recommendations...</span>
              </>
            ) : (
              <>
                <Bot className="h-5 w-5" />
                <span>Run AI Agentic Matchmaker</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          {/* Live Agent Reasoning Pipeline View */}
          {(isAnalyzing || activeStep > 0) && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" /> Live Multi-Agent Reasoning Execution
              </h4>

              <div className="space-y-2 text-xs">
                <div className={`flex items-center gap-2 transition-all ${activeStep >= 1 ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2 className={`h-4 w-4 ${activeStep >= 1 ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>🌾 <strong>Crop Agent:</strong> Analyzed {form.crop} root depth & seedbed pulverization requirements.</span>
                </div>

                <div className={`flex items-center gap-2 transition-all ${activeStep >= 2 ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2 className={`h-4 w-4 ${activeStep >= 2 ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>📐 <strong>Farm Agent:</strong> Calculated 5-6 ft implement working width for optimal {form.acres} acre turnaround.</span>
                </div>

                <div className={`flex items-center gap-2 transition-all ${activeStep >= 3 ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2 className={`h-4 w-4 ${activeStep >= 3 ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>🚜 <strong>Tractor HP Agent:</strong> Matched {form.tractorHp} HP PTO output (filtered out incompatible 60-75 HP heavy harrows).</span>
                </div>

                <div className={`flex items-center gap-2 transition-all ${activeStep >= 4 ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2 className={`h-4 w-4 ${activeStep >= 4 ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>⚙️ <strong>Implement Agent:</strong> Recommendation ready!</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Recommendation Result Card */}
          {result && !isAnalyzing && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-500/20 pb-3">
                <div>
                  <Badge className="bg-emerald-500 text-black font-bold text-xs mb-1">
                    ⭐ AI Top Recommended Implement
                  </Badge>
                  <h3 className="text-xl font-bold text-white">{result.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    ₹{result.price.toLocaleString("en-IN")} <span className="text-xs font-normal text-slate-300">{result.priceUnit}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Specifications Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                  <div className="text-slate-400 font-medium">Recommended Width</div>
                  <div className="text-white font-bold">5 – 6 Feet (48 Blades)</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                  <div className="text-slate-400 font-medium">Suitable Tractor HP</div>
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <Tractor className="h-3.5 w-3.5" /> 35 – 50 HP (Perfect Match)
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 space-y-1">
                  <div className="text-slate-400 font-medium">Primary Application</div>
                  <div className="text-white font-bold">{form.crop} Seedbed Prep</div>
                </div>
              </div>

              {/* 💰 4. AI Labor Savings & Profit ROI Calculator */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span>💰 AI Labor Savings & Profit ROI Analysis ({form.acres} Acres)</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px]">
                    Net Savings: ₹{netSavings.toLocaleString("en-IN")}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-2 rounded-xl bg-slate-950/60 border border-white/10">
                    <div className="text-slate-400 text-[10px]">Manual Wages</div>
                    <div className="text-red-400 font-bold font-mono">₹{manualLaborCost.toLocaleString("en-IN")}</div>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950/60 border border-white/10">
                    <div className="text-slate-400 text-[10px]">Implement Rental</div>
                    <div className="text-amber-400 font-bold font-mono">₹{implementRentalCost.toLocaleString("en-IN")}</div>
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                    <div className="text-emerald-300 text-[10px]">Net Profit Kept</div>
                    <div className="text-emerald-400 font-bold font-mono">₹{netSavings.toLocaleString("en-IN")}</div>
                  </div>
                </div>
              </div>

              {/* 🤝 5. AI Share-a-Tractor Group Rental Feature */}
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-400 shrink-0" />
                  <span className="text-slate-200">
                    <strong>Farmer Ramesh (2.4 mi away)</strong> also requested a Rotavator this Friday. Split trailer transport cost & <strong>save ₹400!</strong>
                  </span>
                </div>
                <Button variant="outline" className="text-[10px] h-7 border-purple-500/40 text-purple-300 hover:bg-purple-500/20 shrink-0">
                  Join Group Rental
                </Button>
              </div>

              {/* Tractor Compatibility Pill */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Compatible with your {form.tractorHp} HP Tractor (Avoids heavy 60-75 HP gear overload)</span>
                </div>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 text-[10px]">
                  Verified Match
                </Badge>
              </div>

              {/* Fuel & Time Estimator */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-slate-400 text-[11px]">Est. Job Time ({form.acres} Acres)</div>
                    <div className="text-white font-bold">~3.5 Hours</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/10 flex items-center gap-2">
                  <Flame className="h-4 w-4 text-red-400 shrink-0" />
                  <div>
                    <div className="text-slate-400 text-[11px]">Est. Fuel Burn Rate</div>
                    <div className="text-white font-bold">~3.0 Liters Diesel / Hr</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  onClick={() => {
                    onClose();
                    onSelectListing(result);
                  }}
                  className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40"
                >
                  View Implement & Book Rental
                </Button>

                <Button
                  onClick={() => onCompareListing(result)}
                  variant="outline"
                  className="w-full sm:w-auto border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 h-11 rounded-xl flex items-center gap-2"
                >
                  <Scale className="h-4 w-4 text-emerald-400" /> Compare Implements
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
