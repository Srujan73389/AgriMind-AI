"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Bot,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  ArrowRight,
  Database,
  Globe,
  Radio,
  Share2,
  Code2,
  FileText,
  Sliders,
  CheckCircle2,
  Play,
  RefreshCw,
  MessageSquare
} from "lucide-react";
import { downloadOfficialPdf } from "@/lib/pdfHelper";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  enabled: boolean;
  icon: string;
  inputData: string;
  outputDecision: string;
  latencyMs: number;
}

const AGENTS: AgentNode[] = [
  {
    id: "ag-1",
    name: "Soil Telemetry Agent",
    role: "Monitors ESP32 N-P-K & Soil Moisture Sensor Data",
    enabled: true,
    icon: "🌱",
    inputData: "Moisture 68% • Soil Temp 27.5°C • pH 6.8 • Nitrogen 42kg/ha",
    outputDecision: "Soil moisture optimal. Nitrogen levels safe for top-dressing.",
    latencyMs: 42
  },
  {
    id: "ag-2",
    name: "Weather & Satellite Agent",
    role: "Sentinel-2 NDVI & Open-Meteo 48h Rain Forecast",
    enabled: true,
    icon: "🛰️",
    inputData: "Cloud 0% • NDVI 0.84 • Rain prob 65% in 48h (Ajjampura Tq)",
    outputDecision: "Pause irrigation today. Light monsoon showers expected.",
    latencyMs: 85
  },
  {
    id: "ag-3",
    name: "Crop Advisory Agent",
    role: "Reflects Soil + Weather to recommend Certified Seeds",
    enabled: true,
    icon: "🌾",
    inputData: "Red Soil • Rainfed • Land Area 3.0 Acres",
    outputDecision: "Recommend GPU-28 Finger Millet (Ragi) or Basmati Paddy.",
    latencyMs: 110
  },
  {
    id: "ag-4",
    name: "Market APMC Price Agent",
    role: "Scrapes Chikkamagaluru & Ajjampura Mandi Rates",
    enabled: true,
    icon: "📈",
    inputData: "Arecanut ₹48,500/qtl (+4.2%) • Ragi ₹3,850/qtl (+3.8%)",
    outputDecision: "Hold Arecanut produce for 7 days. Target: ₹50,500/qtl.",
    latencyMs: 95
  },
  {
    id: "ag-5",
    name: "Implement Matchmaker Agent",
    role: "Matches Tractor HP with Rotavators & Planters",
    enabled: true,
    icon: "🚜",
    inputData: "45 HP Mahindra Tractor • 3.0 Acres Red Soil",
    outputDecision: "Recommend Shaktiman 7-ft Multi-Speed Rotavator (₹1,200/day).",
    latencyMs: 65
  }
];

export default function ArchitecturePage() {
  const [agents, setAgents] = useState<AgentNode[]>(AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<AgentNode>(AGENTS[0]);
  const [simulating, setSimulating] = useState(false);
  const [simLog, setSimLog] = useState<string[]>([
    "00.01s [Soil Agent] Published Soil Moisture 68% to LangGraph Shared Memory",
    "00.04s [Weather Agent] Detected 65% Monsoon Rain Probability in Ajjampura Tq",
    "00.08s [Consensus Engine] Conflict Resolved: Soil Agent wanted irrigation, Weather Agent warned of rain -> Decision: PAUSE PUMP",
    "00.11s [Crop Agent] Recommended GPU-28 Ragi Seed (Drought Resilient)",
    "00.15s [Market Agent] Evaluated Chikkamagaluru APMC Arecanut rate ₹48,500/qtl -> Decision: HOLD PRODUCE"
  ]);

  const handleToggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const handleRunSimulation = (scenarioName: string) => {
    setSimulating(true);
    setSimLog([`[Simulating Scenario]: ${scenarioName}...`]);

    setTimeout(() => {
      setSimLog([
        `00.01s [Scenario Init] Ingested Gadihalli Telemetry Stream`,
        `00.03s [Soil Agent] Sensor Readings: Moisture 68%, pH 6.8`,
        `00.07s [Weather Agent] Satellite Pass Verified: Cloud Cover 0%, Rain Risk High`,
        `00.10s [Consensus Engine] Multi-Agent Reflection Verified with 99.4% Agreement`,
        `00.14s [System Response] Generated Final Farming & Mandi Advisory`
      ]);
      setSimulating(false);
    }, 1500);
  };

  const handleExportPdf = () => {
    downloadOfficialPdf({
      title: "AgriMind AI Multi-Agent Architecture Specification",
      category: "System Architecture",
      date: "Aug 08, 2026",
      farmPlot: "System Design Spec Document",
      location: "AgriMind LangGraph Multi-Agent Engine",
      summary: "Technical architecture specification documenting the 5 autonomous AI agents (Soil, Weather, Crop, Market, Implement), Qdrant vector memory integration, and 79ms consensus reflection engine."
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <Cpu className="h-3.5 w-3.5" /> LangGraph Multi-Agent Architecture & Reflection Engine
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">AI Multi-Agent System Architecture</h1>
          <p className="text-muted-foreground text-sm">
            Interactive node graph showing how 5 autonomous AI agents exchange JSON telemetry and reach 99.4% consensus.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={handleExportPdf}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 px-5 font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2 text-xs"
          >
            <FileText className="h-4 w-4" /> Export System Architecture PDF
          </Button>
        </div>
      </div>

      {/* Interactive Scenario Simulator Bar */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-emerald-500/40 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500 text-black font-bold text-xs">Live Scenario Simulator</Badge>
            <span className="text-xs text-slate-300 font-medium">Test Multi-Agent Consensus Stream</span>
          </div>

          <span className="text-xs text-emerald-400 font-mono font-bold">5 Agents Synchronized</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <Button
            onClick={() => handleRunSimulation("🌧️ Monsoon Rain Forecast in Gadihalli")}
            disabled={simulating}
            className="bg-slate-950 hover:bg-slate-800 border border-white/10 text-white text-xs h-9 px-3 rounded-xl flex items-center gap-1.5"
          >
            <Play className="h-3.5 w-3.5 text-sky-400" /> Scenario 1: Monsoon Rain Forecast
          </Button>

          <Button
            onClick={() => handleRunSimulation("📈 Arecanut Price Surge (+4.2%) at Chikkamagaluru Mandi")}
            disabled={simulating}
            className="bg-slate-950 hover:bg-slate-800 border border-white/10 text-white text-xs h-9 px-3 rounded-xl flex items-center gap-1.5"
          >
            <Play className="h-3.5 w-3.5 text-amber-400" /> Scenario 2: Mandi Price Spike
          </Button>

          <Button
            onClick={() => handleRunSimulation("🚜 High Tillage Rotavator Matchmaking")}
            disabled={simulating}
            className="bg-slate-950 hover:bg-slate-800 border border-white/10 text-white text-xs h-9 px-3 rounded-xl flex items-center gap-1.5"
          >
            <Play className="h-3.5 w-3.5 text-emerald-400" /> Scenario 3: Implement Matchmaking
          </Button>
        </div>

        {/* Live Simulation Log Stream */}
        <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1 font-mono text-[11px]">
          <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
            <Activity className="h-3 w-3 text-emerald-400" /> Live Agent Reflection Stream ({simulating ? "Executing..." : "Idle"})
          </div>
          {simLog.map((line, idx) => (
            <div key={idx} className="text-emerald-300 leading-tight">
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Graph Node Visualizer & Selected Node Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Agent Graph Nodes */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass p-6 space-y-6 border-white/10 relative shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500 text-black font-bold text-xs">LangGraph DAG Visualizer</Badge>
                <span className="text-xs text-slate-400 font-mono">Qdrant Vector DB Connected</span>
              </div>

              <div className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                <Activity className="h-4 w-4" /> Avg System Latency: 79ms
              </div>
            </div>

            {/* Interactive Node Map Canvas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              {agents.map((agent) => {
                const isSelected = selectedAgent.id === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 border relative ${
                      isSelected
                        ? "bg-emerald-500/20 border-emerald-500/80 ring-2 ring-emerald-500/40 shadow-2xl scale-[1.02]"
                        : "bg-slate-900/80 border-white/10 hover:border-emerald-500/40 hover:bg-slate-800/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center text-lg">
                        {agent.icon}
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono text-[10px]">
                          {agent.latencyMs}ms
                        </Badge>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleAgent(agent.id);
                          }}
                          className={`w-8 h-4 rounded-full transition-colors p-0.5 ${
                            agent.enabled ? "bg-emerald-500" : "bg-slate-700"
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full bg-white transition-transform ${agent.enabled ? "translate-x-4" : ""}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-white text-sm">{agent.name}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{agent.role}</p>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Status: <strong className={agent.enabled ? "text-emerald-400" : "text-slate-500"}>{agent.enabled ? "ACTIVE ⚡" : "PAUSED"}</strong></span>
                      <span className="text-emerald-400 hover:underline flex items-center gap-0.5">
                        Inspect Node <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Selected Agent Telemetry & JSON Message Inspector */}
        <div className="space-y-4">
          <Card className="glass p-5 space-y-4 border-white/10 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedAgent.icon}</span>
                <h3 className="font-bold text-white text-sm">{selectedAgent.name}</h3>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                {selectedAgent.latencyMs}ms Latency
              </Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <Database className="h-3 w-3 text-sky-400" /> Ingested Telemetry Input:
                </div>
                <div className="font-mono text-[11px] text-sky-300 font-semibold leading-relaxed">
                  {selectedAgent.inputData}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-1">
                <div className="text-emerald-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-emerald-400" /> Agent Reflection Output:
                </div>
                <div className="font-mono text-[11px] text-emerald-300 font-bold leading-relaxed">
                  {selectedAgent.outputDecision}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1.5 text-[11px]">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-amber-400" /> LangGraph State Transmission:
              </div>
              <pre className="text-[10px] text-slate-400 font-mono bg-slate-950 p-2 rounded-lg overflow-x-auto">
{`{
  "agent_id": "${selectedAgent.id}",
  "node_status": "${selectedAgent.enabled ? "ACTIVE" : "PAUSED"}",
  "confidence_score": 0.994,
  "memory_ref": "qdrant_gadihalli_v1"
}`}
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
