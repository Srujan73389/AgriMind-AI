"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Globe, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Save, 
  Settings as SettingsIcon,
  Wifi,
  Smartphone,
  MessageSquare,
  Zap,
  MapPin,
  RefreshCw,
  Sliders,
  Cpu,
  Layers,
  Database,
  CloudSun
} from "lucide-react";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("SRUJAN M");
  const [email, setEmail] = useState("srujan@agrimind.ai");
  const [phone, setPhone] = useState("+91 98450 11223");
  const [village, setVillage] = useState("Gadihalli, Ajjampura Tq, Chikkamagaluru Dist, KA");
  const [khataNo, setKhataNo] = useState("Khata No. 421/B (Survey #88/A)");
  const [language, setLanguage] = useState("en");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // AI Auto-Pilot System Toggles
  const [toggles, setToggles] = useState({
    autoPumpCutoff: true,
    whatsappAlerts: true,
    rainWarningPause: true,
    autoDiseaseScan: true,
    smsAlerts: true
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("agrimind_user");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.firstName || data.lastName) {
          setFullName(`${data.firstName || ""} ${data.lastName || ""}`.trim());
        }
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.language) setLanguage(data.language);
      }
    } catch (e) {}
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const saved = localStorage.getItem("agrimind_user");
      const data = saved ? JSON.parse(saved) : {};
      const parts = fullName.trim().split(" ");
      data.firstName = parts[0] || "";
      data.lastName = parts.slice(1).join(" ") || "";
      data.email = email;
      data.phone = phone;
      data.language = language;

      localStorage.setItem("agrimind_user", JSON.stringify(data));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {}
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetCache = () => {
    if (confirm("Reset local AgriMind AI state and clear cached data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <SettingsIcon className="h-3.5 w-3.5" /> AgriMind System Control & Farmer Preferences
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">System Settings & Profile</h1>
          <p className="text-muted-foreground text-sm">
            Manage your Karnataka farmer profile, IoT auto-pilot irrigation switches, WhatsApp alerts, and hardware telemetry.
          </p>
        </div>

        {savedSuccess && (
          <Badge className="bg-emerald-500 text-black font-bold text-xs px-3.5 py-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> System Preferences Saved!
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Information & Land Identity */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile}>
            <Card className="glass p-6 space-y-5 border-white/10 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Farmer Identity & Land Records</h2>
                    <p className="text-xs text-slate-400">Used for official Soil Health Cards & KCC Bank Loans</p>
                  </div>
                </div>

                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                  Verified KA Farmer
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Full Farmer Name</label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white h-11"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">WhatsApp Mobile Number</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white h-11"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Email Address</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white h-11"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Land Record Khata / Survey #</label>
                  <Input
                    value={khataNo}
                    onChange={(e) => setKhataNo(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white h-11 font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-300 font-semibold mb-1 block">Primary Village & District Location</label>
                  <Input
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="bg-slate-900 border-slate-800 text-white h-11"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 text-xs"
                >
                  <Save className="h-4 w-4" /> Save Profile & Land Identity Settings
                </Button>
              </div>
            </Card>
          </form>

          {/* 🤖 AI Multi-Agent & Telemetry Auto-Pilot Controls */}
          <Card className="glass p-6 space-y-5 border-white/10 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <Sliders className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">AI Multi-Agent Auto-Pilot Controls</h2>
                <p className="text-xs text-slate-400">Configure automated IoT pump switches & Mandi notifications</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-emerald-400" /> Smart IoT Pump Auto-Cutoff
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Automatically shut off irrigation pumps when soil moisture reaches 75% to prevent waterlogging.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("autoPumpCutoff")}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    toggles.autoPumpCutoff ? "bg-emerald-500" : "bg-slate-800"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.autoPumpCutoff ? "translate-x-6" : ""}`} />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-sky-400" /> WhatsApp Daily Morning Mandi Alerts
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Send Chikkamagaluru & Ajjampura APMC price updates every morning at 7:00 AM to {phone}.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("whatsappAlerts")}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    toggles.whatsappAlerts ? "bg-emerald-500" : "bg-slate-800"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.whatsappAlerts ? "translate-x-6" : ""}`} />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CloudSun className="h-4 w-4 text-amber-400" /> Pre-Monsoon Rain Irrigation Pause
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Pause scheduled pump runs 24h prior to forecasted monsoon showers in Ajjampura Tq.
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("rainWarningPause")}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    toggles.rainWarningPause ? "bg-emerald-500" : "bg-slate-800"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${toggles.rainWarningPause ? "translate-x-6" : ""}`} />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Platform Language & IoT Hardware Telemetry Status */}
        <div className="space-y-6">
          {/* Preferred Platform Language */}
          <Card className="glass p-5 space-y-4 border-white/10">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Globe className="h-4 w-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Preferred Language</h3>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { key: "en", name: "English (Default)", sub: "Full AI Multi-Agent Support" },
                { key: "kn", name: "ಕನ್ನಡ (Kannada)", sub: "ಕರ್ನಾಟಕ ಕೃಷಿ ಸಹಾಯ" },
                { key: "hi", name: "हिंदी (Hindi)", sub: "भारतीय कृषि सहायक" },
                { key: "te", name: "తెలుగు (Telugu)", sub: "తెలుగు వ్యవసాయ సహాయకుడు" }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setLanguage(item.key)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    language === item.key
                      ? "bg-emerald-500/20 border-emerald-500/60 shadow-lg text-white font-bold"
                      : "bg-slate-900/60 border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  <div>
                    <div>{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{item.sub}</div>
                  </div>
                  {language === item.key && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                </button>
              ))}
            </div>
          </Card>

          {/* IoT Sensor & Hardware Status */}
          <Card className="glass p-5 space-y-4 border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Cpu className="h-4 w-4 text-emerald-400" /> Connected IoT Sensors & API Sync
              </h3>
              <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">All Live ⚡</Badge>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold font-sans">ESP32 Soil Node #1</div>
                  <div className="text-[10px] text-slate-400">Gadihalli Plot A1 • Battery 94%</div>
                </div>
                <span className="text-emerald-400 font-bold">Connected</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold font-sans">Sentinel-2 Orbit Sync</div>
                  <div className="text-[10px] text-slate-400">Pass Frequency: 3 Days</div>
                </div>
                <span className="text-emerald-400 font-bold">Live Sync</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold font-sans">APMC Mandi Price API</div>
                  <div className="text-[10px] text-slate-400">Chikkamagaluru & Ajjampura</div>
                </div>
                <span className="text-emerald-400 font-bold">Updated Today</span>
              </div>
            </div>
          </Card>

          {/* Cache Reset Button */}
          <Card className="glass p-5 space-y-3 border-rose-500/30">
            <div className="font-bold text-white text-xs flex items-center gap-2">
              <Database className="h-4 w-4 text-rose-400" /> Reset Local Application Cache
            </div>
            <p className="text-[11px] text-slate-400">
              Clear saved offline sensor telemetry and local storage preferences.
            </p>
            <Button
              onClick={handleResetCache}
              variant="outline"
              className="w-full border-rose-500/30 hover:bg-rose-500/10 text-rose-400 font-bold text-xs h-10 rounded-xl flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset Local App Cache
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
