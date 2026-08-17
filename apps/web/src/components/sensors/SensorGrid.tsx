import { Card } from "@/components/ui/card";
import { Droplets, Thermometer, FlaskConical, Wind, Activity } from "lucide-react";

export function SensorGrid() {
  const sensors = [
    { name: "Soil Moisture", value: "42.5%", status: "optimal", icon: Droplets, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+1.2%" },
    { name: "Soil Temp", value: "18.2°C", status: "optimal", icon: Thermometer, color: "text-amber-400", bg: "bg-amber-500/10", trend: "-0.5°" },
    { name: "Soil pH", value: "6.8", status: "optimal", icon: FlaskConical, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "0.0" },
    { name: "Humidity", value: "65%", status: "warning", icon: Wind, color: "text-indigo-400", bg: "bg-indigo-500/10", trend: "+5%" },
    { name: "Nitrogen", value: "Medium", status: "optimal", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10", trend: "Stable" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {sensors.map((sensor, i) => (
        <Card key={i} className="glass p-4 border-white/5 hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <div className={`p-2 rounded-lg ${sensor.bg} ${sensor.color}`}>
              <sensor.icon className="h-4 w-4" />
            </div>
            <div className={`w-2 h-2 rounded-full ${sensor.status === 'optimal' ? 'bg-emerald-500' : sensor.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} />
          </div>
          <p className="text-sm text-muted-foreground mb-1">{sensor.name}</p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-xl font-bold text-white">{sensor.value}</h4>
            <span className="text-xs text-muted-foreground">{sensor.trend}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
