"use client";

import { useState } from "react";
import { Listing } from "./types";
import { INITIAL_LISTINGS } from "./data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  X,
  Bot,
  Wheat,
  Droplets,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Scale,
  CloudSun,
  Tractor,
  TrendingUp
} from "lucide-react";

interface AiSeedAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectListing: (listing: Listing) => void;
  onAddToCart: (listing: Listing) => void;
}

export function AiSeedAdvisorModal({
  isOpen,
  onClose,
  onSelectListing,
  onAddToCart,
}: AiSeedAdvisorModalProps) {
  const [promptText, setPromptText] = useState(
    "I have 2 acres of red soil and limited water. What should I grow?"
  );

  const [acres, setAcres] = useState(2);
  const [soilType, setSoilType] = useState("Red Soil");
  const [waterAvailability, setWaterAvailability] = useState("Limited Water");

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [recommendedCrop, setRecommendedCrop] = useState<string | null>(null);
  const [matchingSeeds, setMatchingSeeds] = useState<Listing[]>([]);
  const [matchingImplement, setMatchingImplement] = useState<Listing | null>(null);

  if (!isOpen) return null;

  const handleApplyPreset = (prompt: string, landAcres: number, soil: string, water: string) => {
    setPromptText(prompt);
    setAcres(landAcres);
    setSoilType(soil);
    setWaterAvailability(water);
  };

  const handleRunSeedAdvisor = () => {
    setIsAnalyzing(true);
    setActiveStep(1);
    setRecommendedCrop(null);
    setMatchingSeeds([]);

    // Live Multi-Agent Pipeline simulation
    setTimeout(() => setActiveStep(2), 600);
    setTimeout(() => setActiveStep(3), 1200);
    setTimeout(() => setActiveStep(4), 1800);
    setTimeout(() => {
      setIsAnalyzing(false);

      let cropName = "Groundnut";
      if (promptText.toLowerCase().includes("paddy") || waterAvailability === "Abundant Water") {
        cropName = "Paddy / Rice";
      } else if (promptText.toLowerCase().includes("cotton") || soilType === "Black Cotton Soil") {
        cropName = "Cotton";
      } else if (promptText.toLowerCase().includes("maize")) {
        cropName = "Maize";
      } else if (promptText.toLowerCase().includes("chilli") || promptText.toLowerCase().includes("tomato")) {
        cropName = "Chilli";
      }

      setRecommendedCrop(cropName);

      // Find matching seed listings from Marketplace dataset
      const seeds = INITIAL_LISTINGS.filter(
        (item) => item.category === "supplies" && item.seedSubCategory
      ).slice(0, 3);
      setMatchingSeeds(seeds);

      // Find matching implement
      const impl = INITIAL_LISTINGS.find((item) => item.id === "imp-1") || INITIAL_LISTINGS[0];
      setMatchingImplement(impl);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl w-full max-w-4xl overflow-hidden relative shadow-2xl space-y-0">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shadow-lg">
              <Wheat className="h-6 w-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                <Sparkles className="h-3 w-3" /> Multi-Agent Crop & Seed Intelligence
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">AI Seed Advisor ("Which Seed to Buy?")</h2>
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
          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-400" /> One-Tap Farmer Query Presets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(
                    "I have 2 acres of red soil and limited water. What should I grow?",
                    2,
                    "Red Soil",
                    "Limited Water"
                  )
                }
                className="p-3 rounded-2xl border text-left text-xs bg-slate-900/60 border-white/10 text-slate-300 hover:border-emerald-500/50 hover:text-white transition-all"
              >
                <div className="font-bold text-emerald-400 mb-0.5">🥜 Red Soil + Limited Water</div>
                <div className="text-[11px] text-slate-400">2 Acres • Drought Tolerant Crop</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(
                    "I have 10 acres of wet clay soil with abundant canal water. What should I plant?",
                    10,
                    "Clay / Wet Mud",
                    "Abundant Water"
                  )
                }
                className="p-3 rounded-2xl border text-left text-xs bg-slate-900/60 border-white/10 text-slate-300 hover:border-emerald-500/50 hover:text-white transition-all"
              >
                <div className="font-bold text-sky-400 mb-0.5">🌾 Wet Clay + Abundant Water</div>
                <div className="text-[11px] text-slate-400">10 Acres • High Yield Paddy Rice</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(
                    "I have 5 acres of black cotton soil with medium rain. What is best?",
                    5,
                    "Black Cotton Soil",
                    "Medium Rainfall"
                  )
                }
                className="p-3 rounded-2xl border text-left text-xs bg-slate-900/60 border-white/10 text-slate-300 hover:border-emerald-500/50 hover:text-white transition-all"
              >
                <div className="font-bold text-amber-400 mb-0.5">☁️ Black Soil + Medium Rain</div>
                <div className="text-[11px] text-slate-400">5 Acres • Bt Cotton / Soybean</div>
              </button>
            </div>
          </div>

          {/* User Prompt Input */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
            <label className="text-xs font-semibold text-slate-300 block">
              Describe your farm land & water conditions:
            </label>
            <div className="flex gap-2">
              <Input
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="e.g. I have 2 acres of red soil and limited water. What should I grow?"
                className="bg-slate-950 border-slate-800 h-11 text-xs text-white focus:border-emerald-500 flex-1"
              />
              <Button
                onClick={handleRunSeedAdvisor}
                disabled={isAnalyzing}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 px-5 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center gap-2 shrink-0"
              >
                {isAnalyzing ? (
                  <Sparkles className="h-4 w-4 animate-spin text-amber-300" />
                ) : (
                  <>
                    <Bot className="h-4 w-4" /> Ask AI
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Layers className="h-3.5 w-3.5 text-emerald-400" /> Land: <span className="text-white font-semibold">{acres} Acres</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Soil: <span className="text-white font-semibold">{soilType}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Droplets className="h-3.5 w-3.5 text-sky-400" /> Water: <span className="text-white font-semibold">{waterAvailability}</span>
              </div>
            </div>
          </div>

          {/* Live Agent Execution Pipeline View */}
          {(isAnalyzing || activeStep > 0) && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" /> Live Multi-Agent Reasoning Execution
              </h4>

              <div className="space-y-2 text-xs">
                <div className={`flex items-center gap-2 transition-all ${activeStep >= 1 ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2 className={`h-4 w-4 ${activeStep >= 1 ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>🪨 <strong>Soil Agent:</strong> Analyzed {soilType} drainage, pH level, and root aeration capacity.</span>
                </div>

                <div className={`flex items-center gap-2 transition-all ${activeStep >= 2 ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2 className={`h-4 w-4 ${activeStep >= 2 ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>🌤️ <strong>Weather Agent:</strong> Checked regional temperature forecast & seasonal {waterAvailability} index.</span>
                </div>

                <div className={`flex items-center gap-2 transition-all ${activeStep >= 3 ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2 className={`h-4 w-4 ${activeStep >= 3 ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>🌾 <strong>Crop Agent:</strong> Selected drought-resilient <strong>Groundnut (Kadiri-6)</strong> as optimal high-yield crop.</span>
                </div>

                <div className={`flex items-center gap-2 transition-all ${activeStep >= 4 ? "text-emerald-400" : "text-slate-500"}`}>
                  <CheckCircle2 className={`h-4 w-4 ${activeStep >= 4 ? "text-emerald-400" : "text-slate-600"}`} />
                  <span>🛒 <strong>Market Agent:</strong> Retrieved certified seed varieties & matching land prep implements from AgriMind Marketplace.</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Recommendation Results Panel */}
          {recommendedCrop && !isAnalyzing && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-500/20 pb-4">
                <div>
                  <Badge className="bg-emerald-500 text-black font-bold text-xs mb-1">
                    🌱 AI Recommended Crop Choice
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">Recommended Crop: {recommendedCrop}</h3>
                  <p className="text-xs text-slate-300">
                    Perfect match for {soilType} and {waterAvailability}. Excellent yield potential with minimal irrigation requirement.
                  </p>
                </div>
              </div>

              {/* Recommended Certified Seeds Grid */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Wheat className="h-4 w-4 text-emerald-400" /> Recommended Certified Seeds Available in Marketplace:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {matchingSeeds.map((seed) => (
                    <div
                      key={seed.id}
                      className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex flex-col justify-between space-y-3 hover:border-emerald-500/50 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="h-24 rounded-xl overflow-hidden bg-slate-900">
                          <img src={seed.imageUrl} alt={seed.title} className="w-full h-full object-cover" />
                        </div>
                        <h5 className="font-bold text-white text-xs line-clamp-2">{seed.title}</h5>
                        <div className="text-emerald-400 font-bold text-sm font-mono">
                          ₹{seed.price.toLocaleString("en-IN")}{" "}
                          <span className="text-[10px] font-normal text-slate-400">{seed.priceUnit}</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          onAddToCart(seed);
                          onClose();
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs h-8 rounded-xl flex items-center justify-center gap-1"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" /> Buy Seeds
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Tillage & Implement Suggestion */}
              {matchingImplement && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                      <Tractor className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Matching Tillage Implement</div>
                      <div className="font-bold text-white">{matchingImplement.title}</div>
                      <div className="text-emerald-400 font-mono">₹{matchingImplement.price.toLocaleString("en-IN")} {matchingImplement.priceUnit}</div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      onClose();
                      onSelectListing(matchingImplement);
                    }}
                    variant="outline"
                    className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 text-xs h-9 rounded-xl shrink-0"
                  >
                    Rent Matching Implement
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
