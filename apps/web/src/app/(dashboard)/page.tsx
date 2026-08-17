"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Leaf, 
  Droplets, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Microscope, 
  Satellite, 
  CloudSun, 
  Activity,
  Zap,
  CheckCircle2,
  Tractor,
  Wheat,
  Bot,
  Bell,
  Scale,
  DollarSign,
  MapPin,
  Clock,
  ArrowRight,
  Gauge,
  Flame,
  Award
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [farmerName, setFarmerName] = useState("Srujan");
  const [selectedField, setSelectedField] = useState<"A1" | "B2" | "C3">("A1");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("agrimind_user");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.firstName) {
          setFarmerName(data.firstName);
        }
      }
    } catch (e) {}
  }, []);

  const fieldsData = {
    A1: {
      name: "Field A1 (Paddy Rice)",
      area: "2.5 Hectares",
      crop: "Pusa Basmati 1121 Paddy",
      ndvi: 0.82,
      moisture: "68%",
      nitrogen: "Optimal (42 kg/ha)",
      status: "Vegetative Phase • 45 Days",
      soilType: "Clay Loam",
      yieldEst: "42 Quintals / Ha",
      weatherAdvice: "No irrigation required for 48 hrs due to incoming rainfall."
    },
    B2: {
      name: "Field B2 (Groundnut)",
      area: "3.0 Acres",
      crop: "Kadiri-6 Bold Groundnut",
      ndvi: 0.76,
      moisture: "44%",
      nitrogen: "Needs Top Dressing",
      status: "Pegging Stage • 32 Days",
      soilType: "Red Loam Soil",
      yieldEst: "18 Quintals / Acre",
      weatherAdvice: "Soil moisture low. Recommended light drip irrigation this evening."
    },
    C3: {
      name: "Field C3 (Wheat)",
      area: "1.8 Hectares",
      crop: "Sharbati Wheat",
      ndvi: 0.88,
      moisture: "72%",
      nitrogen: "High Optimal",
      status: "Grain Filling • 85 Days",
      soilType: "Alluvial Soil",
      yieldEst: "52 Quintals / Ha",
      weatherAdvice: "Ideal weather window for harvesting in 12 days."
    }
  };

  const currentField = fieldsData[selectedField];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner with Live AI Agent Stream */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-950 shadow-2xl space-y-6">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Bot className="h-3.5 w-3.5 text-emerald-400" />
              <span>AgriMind Multi-Agent Command Center Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Good Day, <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">{farmerName}!</span> 🌾
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Your farm intelligence agent is monitoring <strong className="text-emerald-400">3 fields</strong> across Satellite NDVI, Mandi rates, and soil moisture sensors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/marketplace">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-950/50 border-none px-5 py-5 rounded-2xl flex items-center gap-2">
                <Tractor className="h-4 w-4" />
                <span>Marketplace & Rentals</span>
              </Button>
            </Link>

            <Link href="/mandi">
              <Button variant="outline" className="border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-2xl px-5 py-5 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>Live Mandi Bhav</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Multi-Agent Execution Stream Banner */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 text-xs">
          <div className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" /> Live Multi-Agent Intelligence Stream
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-white/5">
              <Leaf className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="truncate">🌾 <strong>Crop Agent:</strong> Field A1 Paddy NDVI 0.82 (Healthy)</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-white/5">
              <TrendingUp className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="truncate">📈 <strong>Mandi Agent:</strong> Groundnut up +4.8% @ Adoni Mandi</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-white/5">
              <CloudSun className="h-4 w-4 text-sky-400 shrink-0" />
              <span className="truncate">🌤️ <strong>Weather Agent:</strong> Rain in 48h (Hold irrigation)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ⚡ 1-Tap Quick Action AI Hub */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-400" /> Quick Launch Smart Features
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          <Link href="/marketplace">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-950/20 transition-all text-center space-y-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Wheat className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold text-white">Ask AI Which Seed to Buy</div>
              <div className="text-[10px] text-slate-400">Crop & Soil Advisor</div>
            </div>
          </Link>

          <Link href="/marketplace">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-950/20 transition-all text-center space-y-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Tractor className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold text-white">AI Implement Matchmaker</div>
              <div className="text-[10px] text-slate-400">Tractor HP Filter</div>
            </div>
          </Link>

          <Link href="/mandi">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-950/20 transition-all text-center space-y-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold text-white">Live Mandi Bhav & Sell Advice</div>
              <div className="text-[10px] text-slate-400">APMC Rate Predictor</div>
            </div>
          </Link>

          <Link href="/disease">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-950/20 transition-all text-center space-y-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Microscope className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold text-white">Scan Leaf Disease</div>
              <div className="text-[10px] text-slate-400">YOLOv11 Diagnostics</div>
            </div>
          </Link>

          <Link href="/satellite">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-950/20 transition-all text-center space-y-2 group cursor-pointer col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Satellite className="h-5 w-5" />
              </div>
              <div className="text-xs font-bold text-white">Satellite View</div>
              <div className="text-[10px] text-slate-400">NDVI Health Map</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Interactive Field Health Command Center */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500 text-black font-bold text-xs">Live Sentinel-2 Feed</Badge>
              <h3 className="text-xl font-bold text-white">Farm Plots & Soil Sensor Status</h3>
            </div>
            <p className="text-xs text-slate-400">Select a field to view soil moisture, nitrogen index, and AI irrigation advice.</p>
          </div>

          {/* Field Selection Tabs */}
          <div className="flex gap-2 bg-slate-950 p-1 rounded-xl border border-white/10">
            {(["A1", "B2", "C3"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedField(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedField === key
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Field Detail Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
            <div className="text-slate-400 font-medium">Selected Field</div>
            <div className="text-white font-bold text-sm">{currentField.name}</div>
            <div className="text-emerald-400 font-semibold">{currentField.crop}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
            <div className="text-slate-400 font-medium">NDVI Crop Health Score</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">{currentField.ndvi}</div>
            <div className="text-slate-400 text-[10px]">Target: &gt;0.75 (Optimal Vigor)</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
            <div className="text-slate-400 font-medium">Soil Moisture Level</div>
            <div className="text-2xl font-black text-sky-400 font-mono">{currentField.moisture}</div>
            <div className="text-slate-400 text-[10px]">Sensor: Depth 15cm</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
            <div className="text-slate-400 font-medium">Estimated Yield Potential</div>
            <div className="text-2xl font-black text-amber-400 font-mono">{currentField.yieldEst}</div>
            <div className="text-slate-400 text-[10px]">Harvesting in 45 Days</div>
          </div>
        </div>

        {/* Field Weather Advisory Bar */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <CloudSun className="h-5 w-5 text-sky-400 shrink-0" />
            <div>
              <span className="font-bold text-white">Field AI Advisory: </span>
              <span className="text-emerald-300">{currentField.weatherAdvice}</span>
            </div>
          </div>

          <Link href="/farms">
            <Button variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 text-xs h-8 rounded-xl">
              Manage Field Plots
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid: Mandi Rates + Active Machinery Rentals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Mandi Price Snapshot */}
        <Card className="glass p-5 space-y-4 border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Live APMC Mandi Price Snapshot</h3>
            </div>
            <Link href="/mandi" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
              View All Mandis <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Guntur Red Chilli (Teja)</div>
                <div className="text-slate-400 text-[11px]">Guntur Yard • AP</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold font-mono">₹19,500 / qtl</div>
                <div className="text-emerald-400 text-[10px] font-bold">+5.6% (HOLD)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Groundnut (Bold Kadiri-6)</div>
                <div className="text-slate-400 text-[11px]">Adoni APMC • AP</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold font-mono">₹6,850 / qtl</div>
                <div className="text-amber-400 text-[10px] font-bold">+4.8% (WAIT FESTIVAL)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Pusa Basmati 1121 Paddy</div>
                <div className="text-slate-400 text-[11px]">Khanna Mandi • Punjab</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold font-mono">₹4,350 / qtl</div>
                <div className="text-emerald-400 text-[10px] font-bold">+3.4% (HOLD)</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 2: Government Subsidy & PM-Kisan Alert */}
        <Card className="glass p-5 space-y-4 border-white/10 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">PM-Kisan & Govt Subsidy Intelligence</h3>
              </div>
              <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px]">
                2 Eligible
              </Badge>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                50% Rotavator & Solar Pump Subsidy (SMAM Scheme)
              </div>
              <p className="text-slate-300 text-[11px]">
                You qualify for 50% government capital subsidy on Shaktiman Rotavator & Solar Pumps. Application portal opens Aug 15.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                PM-Kisan 17th Installment Status: ₹2,000 Credited
              </div>
              <p className="text-slate-300 text-[11px]">
                Aadhaar e-KYC verified. Direct Benefit Transfer (DBT) credited to SBI A/c ****4321.
              </p>
            </div>
          </div>

          <Link href="/marketplace">
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs h-10 rounded-xl flex items-center justify-center gap-2">
              <span>Explore Subsidized Implements</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
