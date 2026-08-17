"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Plus,
  Layers,
  Activity,
  Droplets,
  Thermometer,
  Sparkles,
  ShieldCheck,
  Wheat,
  Tractor,
  Download,
  Power,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  FileText,
  X,
  Gauge
} from "lucide-react";

interface FarmPlot {
  id: string;
  name: string;
  khataNo: string;
  surveyNo: string;
  crop: string;
  variety: string;
  areaAcres: number;
  sowingDate: string;
  harvestTargetDate: string;
  healthNdvi: number; // 0.0 to 1.0
  soilMoisture: number; // percentage
  soilTemp: number; // °C
  soilPh: number;
  npk: { n: number; p: number; k: number };
  pumpStatus: boolean;
  location: string;
  nextActivity: string;
  alerts: string[];
}

const INITIAL_FARMS: FarmPlot[] = [
  {
    id: "f-1",
    name: "Paddy & Ragi Plot A1",
    khataNo: "Khata No. 421/B",
    surveyNo: "Survey #88/A",
    crop: "Pusa Basmati & Ragi Inter-Crop",
    variety: "GPU-28 Finger Millet & Basmati",
    areaAcres: 6.2,
    sowingDate: "2026-06-20",
    harvestTargetDate: "2026-10-25",
    healthNdvi: 0.84,
    soilMoisture: 68,
    soilTemp: 27.5,
    soilPh: 6.8,
    npk: { n: 42, p: 18, k: 110 },
    pumpStatus: false,
    location: "Gadihalli Village, Ajjampura Tq, Chikkamagaluru Dist, KA",
    nextActivity: "Urea Top Dressing at Ajjampura Plot",
    alerts: ["Monsoon showers expected in Ajjampura Tq - Pause auto-irrigation"]
  },
  {
    id: "f-2",
    name: "Maize & Groundnut Plot B2",
    khataNo: "Khata No. 115/C",
    surveyNo: "Survey #42/2",
    crop: "Bold Kadiri-6 Groundnut",
    variety: "K-6 High Oil Variety",
    areaAcres: 3.0,
    sowingDate: "2026-07-05",
    harvestTargetDate: "2026-10-30",
    healthNdvi: 0.76,
    soilMoisture: 44,
    soilTemp: 29.2,
    soilPh: 7.2,
    npk: { n: 28, p: 24, k: 85 },
    pumpStatus: true,
    location: "Ajjampura Town, Chikkamagaluru Dist, KA",
    nextActivity: "Gypsum Application at Pegging Stage",
    alerts: ["Low soil moisture (44%) - Drip irrigation ACTIVE"]
  },
  {
    id: "f-3",
    name: "Arecanut & Coffee Plantation C3",
    khataNo: "Khata No. 809/A",
    surveyNo: "Survey #104/B",
    crop: "Arecanut (Adike) & Arabica Coffee",
    variety: "Shivamogga High Yield Arecanut",
    areaAcres: 4.5,
    sowingDate: "2026-05-15",
    harvestTargetDate: "2026-11-10",
    healthNdvi: 0.89,
    soilMoisture: 72,
    soilTemp: 24.8,
    soilPh: 6.5,
    npk: { n: 55, p: 22, k: 130 },
    pumpStatus: false,
    location: "Tarikere, Chikkamagaluru Dist, KA",
    nextActivity: "Pre-Harvest Arecanut Nut Inspection",
    alerts: ["Optimal plantation health (NDVI 0.89)"]
  }
];

export default function FarmsPage() {
  const [farms, setFarms] = useState<FarmPlot[]>(INITIAL_FARMS);
  const [selectedFarm, setSelectedFarm] = useState<FarmPlot>(INITIAL_FARMS[0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form for adding new farm plot
  const [newPlotName, setNewPlotName] = useState("");
  const [newCrop, setNewCrop] = useState("Ragi");
  const [newAcres, setNewAcres] = useState(2.5);
  const [newLocation, setNewLocation] = useState("Gadihalli Village, Ajjampura Tq, Chikkamagaluru Dist, KA");

  const handleTogglePump = (id: string) => {
    setFarms((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const updated = { ...f, pumpStatus: !f.pumpStatus };
          if (selectedFarm.id === id) setSelectedFarm(updated);
          return updated;
        }
        return f;
      })
    );
  };

  const handleAddPlot = () => {
    if (!newPlotName) return;
    const newPlot: FarmPlot = {
      id: `f-${Date.now()}`,
      name: newPlotName,
      khataNo: "Khata No. " + Math.floor(100 + Math.random() * 800),
      surveyNo: "Survey #" + Math.floor(10 + Math.random() * 90),
      crop: newCrop,
      variety: "State Certified Variety",
      areaAcres: newAcres,
      sowingDate: "2026-08-01",
      harvestTargetDate: "2026-11-15",
      healthNdvi: 0.80,
      soilMoisture: 65,
      soilTemp: 27.0,
      soilPh: 6.8,
      npk: { n: 40, p: 20, k: 100 },
      pumpStatus: false,
      location: newLocation,
      nextActivity: "Initial Soil Testing & Basal Fertilizer",
      alerts: ["Plot added - IoT Soil Sensor synchronizing"]
    };

    setFarms([newPlot, ...farms]);
    setSelectedFarm(newPlot);
    setIsAddModalOpen(false);
    setNewPlotName("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <Layers className="h-3.5 w-3.5" /> IoT Soil Telemetry & GPS Boundary Manager
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Farm Plot & Sensor Management</h1>
          <p className="text-muted-foreground text-sm">
            Monitor real-time soil moisture %, N-P-K nutrient health, automated IoT pump controls, and crop growth logs.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 px-5 font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add New Farm Plot
          </Button>
        </div>
      </div>

      {/* Main Grid: Farm Cards & Selected Plot Telemetry Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Farm List Cards */}
        <div className="space-y-4 lg:col-span-1">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Wheat className="h-4 w-4 text-emerald-400" /> Active Farm Plots ({farms.length})
          </div>

          {farms.map((farm) => {
            const isSelected = selectedFarm.id === farm.id;
            return (
              <Card
                key={farm.id}
                onClick={() => setSelectedFarm(farm)}
                className={`glass p-4 rounded-2xl cursor-pointer transition-all duration-300 border-white/10 space-y-3 ${
                  isSelected
                    ? "border-emerald-500/80 bg-emerald-950/30 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/40"
                    : "hover:border-white/20 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-bold">
                    {farm.crop}
                  </Badge>
                  <span className="text-[11px] font-mono font-bold text-amber-400">
                    {farm.areaAcres} Acres
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base">{farm.name}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{farm.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-white/10">
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/10">
                    <div className="text-slate-400 text-[10px]">NDVI</div>
                    <div className="text-emerald-400 font-bold font-mono">{farm.healthNdvi}</div>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/10">
                    <div className="text-slate-400 text-[10px]">Moisture</div>
                    <div className="text-sky-400 font-bold font-mono">{farm.soilMoisture}%</div>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/10">
                    <div className="text-slate-400 text-[10px]">IoT Pump</div>
                    <div className={farm.pumpStatus ? "text-emerald-400 font-bold" : "text-slate-500"}>
                      {farm.pumpStatus ? "ON ⚡" : "OFF"}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Column: Selected Farm Telemetry & IoT Control Center */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-emerald-500/40 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500 text-black font-bold text-xs">Active Plot Telemetry</Badge>
                  <span className="text-xs text-slate-400 font-mono">{selectedFarm.khataNo} • {selectedFarm.surveyNo}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedFarm.name}</h2>
                <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{selectedFarm.location}</span>
                </p>
              </div>

              {/* Pump Control Button */}
              <Button
                onClick={() => handleTogglePump(selectedFarm.id)}
                className={`h-11 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                  selectedFarm.pumpStatus
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/50 animate-pulse"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10"
                }`}
              >
                <Power className="h-4 w-4" />
                {selectedFarm.pumpStatus ? "Smart Auto-Pump: ACTIVE (ON)" : "Turn On IoT Irrigation Pump"}
              </Button>
            </div>

            {/* IoT Sensor Gauges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Soil Moisture</span>
                  <Droplets className="h-4 w-4 text-sky-400" />
                </div>
                <div className="text-2xl font-black text-sky-400 font-mono">{selectedFarm.soilMoisture}%</div>
                <div className="text-[10px] text-slate-400">Sensor Depth 15cm</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Soil Temp</span>
                  <Thermometer className="h-4 w-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">{selectedFarm.soilTemp} °C</div>
                <div className="text-[10px] text-slate-400">Optimal Range</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Soil pH Level</span>
                  <Gauge className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">{selectedFarm.soilPh}</div>
                <div className="text-[10px] text-slate-400">Ideal for {selectedFarm.crop.split(" ")[0]}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Satellite NDVI</span>
                  <Activity className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">{selectedFarm.healthNdvi}</div>
                <div className="text-[10px] text-emerald-400 font-semibold">High Crop Vigor</div>
              </div>
            </div>

            {/* N-P-K Nutrient Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3 text-xs">
              <div className="font-bold text-white flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-400" /> N-P-K Soil Nutrient Levels
                </span>
                <span className="text-emerald-400 font-mono font-bold">Lab Verified</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                  <div className="text-slate-400 text-[10px]">Nitrogen (N)</div>
                  <div className="text-white font-bold text-sm font-mono">{selectedFarm.npk.n} kg/ha</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[70%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                  <div className="text-slate-400 text-[10px]">Phosphorus (P)</div>
                  <div className="text-white font-bold text-sm font-mono">{selectedFarm.npk.p} kg/ha</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[55%]" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                  <div className="text-slate-400 text-[10px]">Potassium (K)</div>
                  <div className="text-white font-bold text-sm font-mono">{selectedFarm.npk.k} kg/ha</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full w-[85%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Schedule & Alerts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-emerald-400" /> Sowing & Harvest Timeline
                </div>
                <div className="space-y-1 text-slate-300 text-[11px]">
                  <div>Sowing Date: <strong>{selectedFarm.sowingDate}</strong></div>
                  <div>Expected Harvest: <strong>{selectedFarm.harvestTargetDate}</strong></div>
                  <div className="text-emerald-400 font-semibold pt-1">Next: {selectedFarm.nextActivity}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-400" /> Plot Smart Advisories
                </div>
                <div className="space-y-1">
                  {selectedFarm.alerts.map((alertText, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{alertText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button
                onClick={() => alert(`Exporting Soil Health Card PDF for ${selectedFarm.name}...`)}
                className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" /> Download Soil Health Card PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Farm Plot Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-emerald-400" /> Add New Farm Plot
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Farm Plot Name</label>
                <Input
                  value={newPlotName}
                  onChange={(e) => setNewPlotName(e.target.value)}
                  placeholder="e.g. Ragi Plot D4"
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Target Crop</label>
                <select
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white"
                >
                  <option value="Ragi">Ragi / Finger Millet</option>
                  <option value="Paddy / Rice">Paddy / Rice</option>
                  <option value="Maize">Maize / Corn</option>
                  <option value="Arecanut">Arecanut / Adike</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Cotton">Cotton</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Land Area (Acres)</label>
                <Input
                  type="number"
                  value={newAcres}
                  onChange={(e) => setNewAcres(Number(e.target.value))}
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Location / Address</label>
                <Input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>
            </div>

            <Button
              onClick={handleAddPlot}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40"
            >
              Save Farm Plot & Connect Sensors
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
