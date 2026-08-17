"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Bot, 
  Microscope, 
  Satellite, 
  Store, 
  Users, 
  FileText, 
  Settings,
  Sparkles,
  Zap,
  Cpu,
  TrendingUp,
  Landmark
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Farms & Fields", href: "/farms", icon: Map },
  { name: "AI Advisor", href: "/ai", icon: Bot, badge: "GPT-4o" },
  { name: "Disease Detector", href: "/disease", icon: Microscope, badge: "YOLOv11" },
  { name: "Satellite View", href: "/satellite", icon: Satellite },
  { name: "Agri Marketplace", href: "/marketplace", icon: Store },
  { name: "Mandi Bhav AI", href: "/mandi", icon: TrendingUp, badge: "Live APMC" },
  { name: "Govt Subsidies & KCC", href: "/subsidies", icon: Landmark, badge: "50% SMAM" },
  { name: "Agri-Drones & Services", href: "/services", icon: Zap, badge: "Drones" },
  { name: "Multi-Agent System", href: "/architecture", icon: Cpu, badge: "LangGraph" },
  { name: "Community Feed", href: "/community", icon: Users },
  { name: "PDF Reports", href: "/reports", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/90 backdrop-blur-xl hidden md:flex flex-col h-screen sticky top-0 z-40">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-all">
            <Cpu className="text-white h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              AgriMind<span className="text-emerald-400">AI</span>
            </span>
            <span className="text-[10px] text-slate-400 block -mt-1 font-mono">v1.0 • Smart Farming</span>
          </div>
        </Link>
      </div>

      {/* Quick AI Action CTA */}
      <div className="p-4">
        <Link 
          href="/ai" 
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>Ask AI Advisor</span>
        </Link>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                isActive
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-white")} />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-md font-mono font-bold",
                  isActive ? "bg-emerald-500/30 text-emerald-300" : "bg-slate-800 text-slate-400 border border-slate-700"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div className="p-3 border-t border-slate-800">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
            pathname === "/settings"
              ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          )}
        >
          <Settings className="h-4 w-4" />
          <span>System Settings</span>
        </Link>
      </div>
    </aside>
  );
}
