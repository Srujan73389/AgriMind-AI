"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Brain, CheckCircle2, Cpu, ShieldCheck } from "lucide-react";

export function ReasoningTrace() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-emerald-500/20 glass overflow-hidden max-w-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 text-xs text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 transition-colors font-medium"
      >
        <span className="flex items-center gap-2">
          <Brain className="h-3.5 w-3.5 text-emerald-400" />
          View Explainable Reasoning Chain
        </span>
        {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      
      {isOpen && (
        <div className="p-3.5 border-t border-emerald-500/20 space-y-3 text-xs bg-black/60">
          <div className="space-y-1">
            <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5" /> Step 1: Tool Execution Plan
            </p>
            <ul className="pl-5 text-gray-300 list-disc space-y-1 opacity-90">
              <li><strong className="text-white">Sensor Tool:</strong> Query IoT Node A1 telemetry (Moisture: 78%)</li>
              <li><strong className="text-white">Weather Tool:</strong> Open-Meteo 7-day forecast (Nellore 31°C, 10% Rain)</li>
              <li><strong className="text-white">Qdrant Vector DB:</strong> Retrieved seasonal memory for Paddy field A1</li>
            </ul>
          </div>

          <div className="space-y-1 border-t border-white/10 pt-2">
            <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5" /> Step 2: Agent Reflection & Critique
            </p>
            <p className="pl-5 text-gray-300 leading-relaxed opacity-90">
              Reflection agent confirmed: Current moisture (78%) is within optimal 60-80% threshold. Adding water risks root rot & oxygen depletion.
            </p>
          </div>

          <div className="space-y-1 border-t border-white/10 pt-2">
            <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Step 3: Verification Output
            </p>
            <p className="pl-5 text-emerald-300 font-medium">
              Zero hallucination detected. Fact-checked against physical sensor telemetry.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[11px]">
            <span className="text-muted-foreground">Verification Pass Rate</span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <CheckCircle2 className="h-3 w-3" /> 98.4%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
