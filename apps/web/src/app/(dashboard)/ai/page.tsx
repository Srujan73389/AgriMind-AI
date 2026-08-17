import { ChatInterface } from "@/components/ai/ChatInterface";
import { Bot, Sparkles, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AIChatPage() {
  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col space-y-4 max-w-7xl mx-auto pb-4">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-1">
            <Bot className="h-3.5 w-3.5" /> AgriMind LangGraph Multi-Agent Engine
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">AI Multi-Agent Farming Assistant</h1>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono">
            Gadihalli, KA Live Sensors Connected
          </Badge>
        </div>
      </div>
      
      <div className="flex-1 rounded-3xl overflow-hidden shadow-2xl">
        <ChatInterface />
      </div>
    </div>
  );
}
