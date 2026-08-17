import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FarmCardProps {
  name: string;
  crop: string;
  health: number;
  alerts: number;
}

export function FarmCard({ name, crop, health, alerts }: FarmCardProps) {
  return (
    <Link href={`/farms/${name.toLowerCase().replace(' ', '-')}`}>
      <Card className="p-5 glass hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden">
        {/* Subtle background glow based on health */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20 rounded-full pointer-events-none ${health > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h3 className="font-semibold text-white text-lg mb-1">{name}</h3>
            <Badge variant="outline" className="bg-white/5 border-white/10 text-muted-foreground flex items-center gap-1.5 px-2 py-0.5">
              <Leaf className="h-3 w-3 text-emerald-400" /> {crop}
            </Badge>
          </div>
          <div className="flex gap-2">
            {alerts > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1 bg-red-500/20 text-red-400 border border-red-500/20 shadow-none">
                <AlertCircle className="h-3 w-3" /> {alerts}
              </Badge>
            )}
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={health > 80 ? "text-emerald-500" : "text-amber-500"}
                  strokeWidth="3"
                  strokeDasharray={`${health}, 100`}
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold text-white">{health}</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">NDVI Health</p>
              <p className="text-sm font-medium text-white">{health > 80 ? 'Excellent' : 'Fair'}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </div>
      </Card>
    </Link>
  );
}
