"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Bell, 
  Search, 
  SunMedium, 
  ChevronDown, 
  Menu,
  CheckCircle2,
  LogOut,
  Settings,
  User,
  Sparkles,
  MapPin,
  X,
  Wheat,
  Tractor,
  TrendingUp,
  Microscope,
  Satellite,
  ArrowRight,
  Bot
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const router = useRouter();
  const [unreadAlerts, setUnreadAlerts] = useState(3);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState("");

  const [farmLocation, setFarmLocation] = useState("Gadihalli, Chikkamagaluru, KA");
  const [userName, setUserName] = useState("SRUJAN M");
  const [userEmail, setUserEmail] = useState("srujan@agrimind.ai");
  const [initials, setInitials] = useState("SM");
  const [farmName, setFarmName] = useState("SRUJAN's Paddy Farm");
  const [farmSize, setFarmSize] = useState("2.5 ha");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const farmRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("agrimind_user");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.firstName || data.lastName) {
          const full = `${data.firstName || ""} ${data.lastName || ""}`.trim();
          setUserName(full || "SRUJAN M");
          const f = (data.firstName || "S")[0].toUpperCase();
          const l = (data.lastName || "M")[0].toUpperCase();
          setInitials(`${f}${l}`);
        }
        if (data.email) {
          setUserEmail(data.email);
        }
      }
    } catch (e) {}
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (farmRef.current && !farmRef.current.contains(event.target as Node)) {
        setFarmDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("agrimind_user");
    router.push("/login");
  };

  const handleSwitchFarm = (name: string, size: string, location: string) => {
    setFarmName(name);
    setFarmSize(size);
    setFarmLocation(location);
    setFarmDropdownOpen(false);
  };

  const SEARCH_ITEMS = [
    { title: "GPU-28 High Protein Ragi Seeds", category: "Seed Marketplace", link: "/marketplace", icon: Wheat },
    { title: "Shaktiman 7-ft Rotavator (45 HP)", category: "Implements Rental", link: "/marketplace", icon: Tractor },
    { title: "Chikkamagaluru Mandi Arecanut Rates (₹48,500/qtl)", category: "Mandi Bhav AI", link: "/mandi", icon: TrendingUp },
    { title: "Leaf Disease Diagnostic Scanner", category: "YOLOv11 Detector", link: "/disease", icon: Microscope },
    { title: "Gadihalli Plot A1 Satellite NDVI Map", category: "Satellite View", link: "/satellite", icon: Satellite },
  ];

  const filteredSearch = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(globalQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(globalQuery.toLowerCase())
  );

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur-2xl sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between gap-4 shadow-xl">
      {/* Left: Mobile Menu Toggle & Interactive Farm Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Farm Selector Dropdown */}
        <div className="relative" ref={farmRef}>
          <button
            onClick={() => setFarmDropdownOpen(!farmDropdownOpen)}
            className="flex items-center gap-2 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-xl px-3.5 py-1.5 cursor-pointer hover:border-emerald-400 transition-all shadow-md group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-[200px]">
              {farmName}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 hidden sm:inline font-bold">
              {farmSize}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </button>

          {/* Farm Switcher Dropdown Panel */}
          {farmDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
              <div className="px-3 py-2 border-b border-white/10 text-[11px] font-bold text-slate-400 uppercase">
                Select Active Farm Plot
              </div>

              <button
                onClick={() => handleSwitchFarm("SRUJAN's Paddy Farm", "2.5 ha", "Gadihalli, Ajjampura Tq, KA")}
                className="w-full text-left p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-white flex items-center justify-between"
              >
                <div>
                  <div className="text-white">🌾 SRUJAN's Paddy Plot A1</div>
                  <div className="text-[10px] text-slate-400 font-normal">Gadihalli, Ajjampura Tq, Chikkamagaluru • 2.5 Ha</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              </button>

              <button
                onClick={() => handleSwitchFarm("Groundnut Plot B2", "3.0 acres", "Ajjampura, Chikkamagaluru, KA")}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-white">🥜 Groundnut Plot B2</div>
                  <div className="text-[10px] text-slate-400 font-normal">Ajjampura Tq, Chikkamagaluru Dist • 3.0 Acres</div>
                </div>
              </button>

              <button
                onClick={() => handleSwitchFarm("Arecanut Estate C3", "4.5 acres", "Tarikere, Chikkamagaluru, KA")}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="text-white">☕ Arecanut Estate C3</div>
                  <div className="text-[10px] text-slate-400 font-normal">Tarikere, Chikkamagaluru Dist • 4.5 Acres</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center: Global Search Input Button (Triggers Command Palette) */}
      <div className="hidden lg:flex items-center relative w-96">
        <button
          onClick={() => setSearchModalOpen(true)}
          className="w-full bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-xl pl-10 pr-12 py-1.5 text-xs text-slate-400 hover:text-white text-left transition-all flex items-center shadow-inner"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <span>Ask AI or search crops, sensors, reports...</span>
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Weather & Notifications Drawer & User Profile */}
      <div className="flex items-center gap-3">
        {/* Live Weather Widget */}
        <div className="hidden sm:flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-medium shadow-sm">
          <SunMedium className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{farmLocation}</span>
          <span className="font-bold text-white font-mono">28°C</span>
        </div>

        {/* Notifications Bell Button & Drawer */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-emerald-500/40 text-white transition-all shadow-sm"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4 text-slate-300" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black shadow-lg shadow-emerald-500/50">
                {unreadAlerts}
              </span>
            )}
          </button>

          {/* Notifications Drawer */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Bell className="h-3.5 w-3.5 text-emerald-400" /> Notifications & AI Alerts
                </span>
                <button
                  onClick={() => setUnreadAlerts(0)}
                  className="text-[10px] text-emerald-400 hover:underline"
                >
                  Mark All Read
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" /> APMC Mandi Price Alert
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Arecanut (Adike) up +₹1,200/qtl at Chikkamagaluru APMC (₹48,500/qtl). AI advice: HOLD.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-sky-500/30 space-y-1">
                  <div className="font-bold text-sky-400 flex items-center gap-1">
                    <SunMedium className="h-3.5 w-3.5" /> Weather Forecast
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Light monsoon showers expected in {farmLocation} tomorrow.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1">
                    <Tractor className="h-3.5 w-3.5" /> Implement Rental Scheduled
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Shaktiman Rotavator arrives at Gadihalli Farm tomorrow at 8:00 AM.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Toggle */}
        <div className="relative pl-2 border-l border-slate-800" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-800/80 transition-all group focus:outline-none"
          >
            <Avatar className="h-9 w-9 border border-emerald-500/40 ring-2 ring-emerald-500/20 group-hover:border-emerald-400 transition-all">
              <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                {userName}
                <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-white transition-colors" />
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" /> Verified Farmer
              </span>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2.5 border-b border-slate-800 mb-1">
                <p className="text-xs font-bold text-white">{userName}</p>
                <p className="text-[11px] text-slate-400 truncate">{userEmail}</p>
              </div>

              <Link
                href="/settings"
                onClick={() => setProfileDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white rounded-xl transition-all"
              >
                <Settings className="h-4 w-4 text-emerald-400" />
                Account Settings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl transition-all text-left mt-1 border-t border-slate-800/60 pt-2"
              >
                <LogOut className="h-4 w-4 text-rose-400" />
                Sign Out / Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Global Command Palette Modal (Ctrl + K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 p-4">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl space-y-0 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center gap-3">
              <Search className="h-5 w-5 text-emerald-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Ask AI or search crops, seeds, mandis..."
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none font-medium"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3 max-h-80 overflow-y-auto space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1">
                AgriMind Global Search Results ({filteredSearch.length})
              </div>

              {filteredSearch.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.link}
                    onClick={() => setSearchModalOpen(false)}
                    className="p-3 rounded-xl hover:bg-slate-900 text-xs text-white flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{item.title}</div>
                        <div className="text-[10px] text-slate-400">{item.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
