"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Search,
  MapPin,
  Calendar,
  ShieldCheck,
  Bot,
  Wheat,
  Clock,
  ArrowRight,
  Phone,
  MessageSquare,
  Warehouse,
  Truck,
  Bell,
  CheckCircle2,
  BarChart3,
  DollarSign
} from "lucide-react";

interface MandiRate {
  id: string;
  crop: string;
  category: string;
  mandiName: string;
  district: string;
  state: string;
  distanceMiles: number;
  transportCostPerQtl: number;
  modalPrice: number; // ₹ per quintal
  minPrice: number;
  maxPrice: number;
  priceChange: number;
  trend: "up" | "down" | "stable";
  aiPrediction: string;
  aiRecommendation: "HOLD" | "SELL_NOW" | "WAIT_FESTIVAL";
  coldStorageRentPerMonth: number;
  buyerName: string;
  buyerType: string;
  buyerPhone: string;
  updatedDate: string;
  chartData: number[]; // 5-week price points
}

const MANDI_RATES: MandiRate[] = [
  {
    id: "m-1",
    crop: "Arecanut / Adike (Chali Variety)",
    category: "Commercial / Plantation",
    mandiName: "Chikkamagaluru APMC Yard",
    district: "Chikkamagaluru",
    state: "Karnataka",
    distanceMiles: 12,
    transportCostPerQtl: 150,
    modalPrice: 48500,
    minPrice: 46000,
    maxPrice: 51000,
    priceChange: 4.2,
    trend: "up",
    aiPrediction: "Prices projected to hit ₹50,500/qtl due to Gutkha mill & export stocking.",
    aiRecommendation: "HOLD",
    coldStorageRentPerMonth: 120,
    buyerName: "Malnad Arecanut Traders",
    buyerType: "Verified APMC Merchant & Exporter",
    buyerPhone: "+91 98450 11223",
    updatedDate: "Today, 11:30 AM",
    chartData: [45000, 46200, 47000, 47800, 48500]
  },
  {
    id: "m-2",
    crop: "GPU-28 Ragi / Finger Millet",
    category: "Cereals & Millets",
    mandiName: "Ajjampura APMC Sub-Market",
    district: "Chikkamagaluru",
    state: "Karnataka",
    distanceMiles: 4,
    transportCostPerQtl: 60,
    modalPrice: 3850,
    minPrice: 3600,
    maxPrice: 4100,
    priceChange: 3.8,
    trend: "up",
    aiPrediction: "Strong government procurement demand. Prices stable with positive outlook.",
    aiRecommendation: "WAIT_FESTIVAL",
    coldStorageRentPerMonth: 30,
    buyerName: "Ajjampura Kisan Bio Co-Op",
    buyerType: "State Grain Procurement Agent",
    buyerPhone: "+91 98455 33221",
    updatedDate: "Today, 10:45 AM",
    chartData: [3500, 3600, 3700, 3780, 3850]
  },
  {
    id: "m-3",
    crop: "Sona Masoori Paddy / Rice",
    category: "Cereals",
    mandiName: "Shivamogga APMC Market",
    district: "Shivamogga",
    state: "Karnataka",
    distanceMiles: 28,
    transportCostPerQtl: 220,
    modalPrice: 2650,
    minPrice: 2450,
    maxPrice: 2800,
    priceChange: 1.8,
    trend: "up",
    aiPrediction: "Rice millers active in buying premium Sona Masoori lots.",
    aiRecommendation: "SELL_NOW",
    coldStorageRentPerMonth: 25,
    buyerName: "Shivamogga Modern Rice Mill",
    buyerType: "Primary Rice Miller",
    buyerPhone: "+91 94480 66778",
    updatedDate: "Today, 09:15 AM",
    chartData: [2500, 2540, 2580, 2610, 2650]
  },
  {
    id: "m-4",
    crop: "Yellow Hybrid Maize / Corn",
    category: "Cereals",
    mandiName: "Davangere APMC Yard",
    district: "Davangere",
    state: "Karnataka",
    distanceMiles: 34,
    transportCostPerQtl: 240,
    modalPrice: 2280,
    minPrice: 2150,
    maxPrice: 2400,
    priceChange: -0.8,
    trend: "stable",
    aiPrediction: "Poultry feed industry procurement steady around ₹2,300/qtl.",
    aiRecommendation: "SELL_NOW",
    coldStorageRentPerMonth: 20,
    buyerName: "Karnataka Feed Industries",
    buyerType: "Poultry Feed Manufacturer",
    buyerPhone: "+91 98440 99887",
    updatedDate: "Today, 11:00 AM",
    chartData: [2300, 2290, 2285, 2280, 2280]
  },
  {
    id: "m-5",
    crop: "Arabica Parchment Coffee",
    category: "Commercial / Plantation",
    mandiName: "Chikkamagaluru Coffee Board Yard",
    district: "Chikkamagaluru",
    state: "Karnataka",
    distanceMiles: 15,
    transportCostPerQtl: 180,
    modalPrice: 16500,
    minPrice: 15500,
    maxPrice: 17800,
    priceChange: 5.1,
    trend: "up",
    aiPrediction: "Global ICE coffee futures rally pushing local bean demand to peak.",
    aiRecommendation: "HOLD",
    coldStorageRentPerMonth: 80,
    buyerName: "Malnad Coffee Exports",
    buyerType: "International Exporter",
    buyerPhone: "+91 98450 77889",
    updatedDate: "Today, 10:30 AM",
    chartData: [15000, 15400, 15800, 16100, 16500]
  },
  {
    id: "m-6",
    crop: "Bold Pod Groundnut",
    category: "Oilseeds",
    mandiName: "Tumakuru APMC Market",
    district: "Tumakuru",
    state: "Karnataka",
    distanceMiles: 65,
    transportCostPerQtl: 320,
    modalPrice: 6900,
    minPrice: 6600,
    maxPrice: 7200,
    priceChange: 3.1,
    trend: "up",
    aiPrediction: "High demand from oil expellers across Tumakuru & Chitradurga.",
    aiRecommendation: "HOLD",
    coldStorageRentPerMonth: 40,
    buyerName: "Karnataka Oilseeds Growers Co-Op",
    buyerType: "Co-Operative Oil Mill",
    buyerPhone: "+91 98800 44556",
    updatedDate: "Today, 08:45 AM",
    chartData: [6500, 6620, 6710, 6800, 6900]
  }
];

export default function MandiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "HOLD" | "SELL_NOW">("all");
  const [selectedMandi, setSelectedMandi] = useState<MandiRate | null>(null);

  const filteredRates = MANDI_RATES.filter((rate) => {
    const matchesSearch =
      !searchQuery ||
      rate.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rate.mandiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rate.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDistrict = selectedDistrict === "all" || rate.district === selectedDistrict;
    const matchesTab = activeTab === "all" || rate.aiRecommendation === activeTab;

    return matchesSearch && matchesDistrict && matchesTab;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <TrendingUp className="h-3.5 w-3.5" /> Mandi Bhav AI & Price Prediction Agent
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Live Mandi Bhav & AI Sell Advisor</h1>
          <p className="text-muted-foreground text-sm">
            Real-time APMC Mandi rates, 14-day price trend charts, buyer directory & warehouse estimator.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={() => {
              const phone = prompt("Enter mobile number for WhatsApp daily APMC alerts:");
              if (phone) {
                alert("Subscribed! Morning Mandi rates will be sent to WhatsApp (" + phone + ")");
              }
            }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs h-11 px-4 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950/40"
          >
            <Bell className="h-4 w-4" /> Subscribe WhatsApp Mandi Alerts
          </Button>
        </div>
      </div>

      {/* AI Sell Advisory Highlight Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">AI Market Price Predictor & Mandi Advisor</h3>
              <Badge className="bg-amber-400 text-black text-[10px] font-bold">Live AI Stream</Badge>
            </div>
            <p className="text-xs text-slate-300">
              Analyzes arrival volumes, festival demand, and export orders to tell you whether to hold your produce or sell now for maximum profit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Top Gainer Today</div>
              <div className="text-white font-bold">Arabica Coffee (+5.1%)</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Best Commodity to Hold</div>
              <div className="text-amber-400 font-bold">Arecanut / Adike (₹50,500/qtl target)</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">Nearest Mandi to Gadihalli</div>
              <div className="text-white font-bold">Ajjampura Sub-Market (4 mi)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search Arecanut, Ragi, Coffee, Ajjampura, Chikkamagaluru, Shivamogga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900/80 border-white/10 h-11 text-xs text-white rounded-xl focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 rounded-xl px-3 h-11">
          <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-transparent text-xs font-semibold text-white outline-none w-full cursor-pointer"
          >
            <option value="all" className="bg-slate-950">All Districts</option>
            <option value="Chikkamagaluru" className="bg-slate-950">Chikkamagaluru</option>
            <option value="Shivamogga" className="bg-slate-950">Shivamogga</option>
            <option value="Davangere" className="bg-slate-950">Davangere</option>
            <option value="Tumakuru" className="bg-slate-950">Tumakuru</option>
          </select>
        </div>
      </div>

      {/* Mandi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRates.map((rate) => (
          <Card
            key={rate.id}
            className="glass overflow-hidden flex flex-col justify-between p-5 space-y-4 border-white/10 hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-white/10 bg-white/5 text-slate-300 text-[10px]">
                  {rate.category}
                </Badge>

                <Badge
                  className={`font-bold text-[10px] ${
                    rate.aiRecommendation === "HOLD" || rate.aiRecommendation === "WAIT_FESTIVAL"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  }`}
                >
                  {rate.aiRecommendation === "HOLD"
                    ? "✋ AI Advice: HOLD PRODUCE"
                    : rate.aiRecommendation === "WAIT_FESTIVAL"
                    ? "⏳ Wait 7 Days for Festival Rise"
                    : "⚡ AI Advice: SELL NOW"}
                </Badge>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg leading-snug">{rate.crop}</h3>
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{rate.mandiName}, {rate.district} ({rate.state})</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px]">Modal APMC Price</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ₹{rate.modalPrice.toLocaleString("en-IN")}{" "}
                    <span className="text-xs text-slate-400 font-normal">/ quintal</span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-xl ${
                    rate.trend === "up" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {rate.trend === "up" ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  <span>{rate.priceChange > 0 ? `+${rate.priceChange}%` : `${rate.priceChange}%`}</span>
                </div>
              </div>

              {/* 📊 5-Week Interactive Trend Bar Graph */}
              <div className="space-y-1 bg-slate-950/70 p-3 rounded-xl border border-white/10">
                <div className="flex justify-between text-[10px] text-slate-400 font-medium mb-1">
                  <span>5-Week Price Trend</span>
                  <span className="text-emerald-400 font-mono">Current: ₹{rate.modalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-end gap-1.5 h-12 pt-2">
                  {rate.chartData.map((val, idx) => {
                    const min = Math.min(...rate.chartData);
                    const max = Math.max(...rate.chartData);
                    const heightPercent = Math.max(25, ((val - min) / (max - min || 1)) * 100);
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-md transition-all ${
                            idx === rate.chartData.length - 1
                              ? "bg-emerald-400 shadow-md shadow-emerald-500/50"
                              : "bg-slate-700 hover:bg-slate-500"
                          }`}
                        />
                        <span className="text-[9px] text-slate-500 font-mono">W{idx + 1}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 🚛 Transport & Warehouse Rent Calculator */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                  <div className="text-slate-400 flex items-center gap-1">
                    <Truck className="h-3 w-3 text-sky-400" /> Distance from Gadihalli
                  </div>
                  <div className="text-white font-bold font-mono">{rate.distanceMiles} mi (Transport ₹{rate.transportCostPerQtl}/qtl)</div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                  <div className="text-slate-400 flex items-center gap-1">
                    <Warehouse className="h-3 w-3 text-amber-400" /> Cold Storage Rent
                  </div>
                  <div className="text-white font-bold font-mono">₹{rate.coldStorageRentPerMonth} / qtl / month</div>
                </div>
              </div>

              {/* Verified Wholesale Buyer Info */}
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-1.5 text-xs">
                <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" /> Direct Verified Buyer
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">{rate.buyerName}</div>
                    <div className="text-[11px] text-slate-400">{rate.buyerType}</div>
                  </div>
                  <a
                    href={`tel:${rate.buyerPhone}`}
                    className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-1 font-bold text-xs"
                  >
                    <Phone className="h-3.5 w-3.5" /> Call Buyer
                  </a>
                </div>
              </div>

              {/* Range & AI Prediction */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-white">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" /> AI Price Trend Prediction:
                  </div>
                  <div className="text-[11px] leading-relaxed">{rate.aiPrediction}</div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setSelectedMandi(rate)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs h-10 rounded-xl flex items-center justify-center gap-2 mt-3"
            >
              <span>View Buyer Offer & Hold Calculator</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Modal for Mandi Buyer & Hold Profit Calculator */}
      {selectedMandi && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl w-full max-w-xl p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedMandi(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <Badge className="bg-emerald-500 text-black font-bold text-xs">
                APMC Buyer & Storage Calculator
              </Badge>
              <h3 className="text-xl font-bold text-white">{selectedMandi.crop}</h3>
              <p className="text-xs text-slate-400">{selectedMandi.mandiName}, {selectedMandi.state}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-3 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Warehouse className="h-4 w-4 text-amber-400" /> 30-Day Hold Profit Calculator (10 Quintals)
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2 rounded-xl bg-slate-950 border border-white/10">
                  <div className="text-[10px] text-slate-400">Current Sale</div>
                  <div className="text-white font-bold">₹{(selectedMandi.modalPrice * 10).toLocaleString("en-IN")}</div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950 border border-white/10">
                  <div className="text-[10px] text-slate-400">Cold Storage Rent</div>
                  <div className="text-red-400 font-bold">₹{(selectedMandi.coldStorageRentPerMonth * 10).toLocaleString("en-IN")}</div>
                </div>

                <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                  <div className="text-[10px] text-emerald-300">Projected 30-Day Value</div>
                  <div className="text-emerald-400 font-bold">₹{((selectedMandi.modalPrice + 2000) * 10).toLocaleString("en-IN")}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white">{selectedMandi.buyerName}</div>
                <div className="text-slate-400">{selectedMandi.buyerType}</div>
              </div>

              <a
                href={`tel:${selectedMandi.buyerPhone}`}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2"
              >
                <Phone className="h-4 w-4" /> Call Direct Buyer
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
