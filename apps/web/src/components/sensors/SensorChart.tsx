"use client";

import { useEffect, useState } from "react";

export function SensorChart() {
  // In a real app, this would use Recharts or Chart.js
  const [dataPoints, setDataPoints] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate mock sine wave data
    const points = Array.from({ length: 24 }).map((_, i) => 
      Math.sin(i / 3) * 15 + 45 + (Math.random() * 5 - 2.5)
    );
    setDataPoints(points);
  }, []);

  return (
    <div className="w-full h-full relative flex items-end gap-1 overflow-hidden p-2">
      {/* Fake Y-axis */}
      <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] text-muted-foreground border-r border-white/10 pr-1">
        <span>60%</span>
        <span>45%</span>
        <span>30%</span>
      </div>
      
      {/* Fake Chart bars/line */}
      <div className="ml-8 flex-1 flex items-end justify-between h-[calc(100%-1.5rem)] gap-1">
        {dataPoints.map((val, i) => (
          <div key={i} className="w-full relative group">
            <div 
              className={`w-full rounded-t-sm transition-all duration-500 ${val > 55 ? 'bg-blue-400' : val < 35 ? 'bg-amber-400' : 'bg-emerald-500'} hover:opacity-80 cursor-pointer`}
              style={{ height: `${val}%` }}
            />
            {/* Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs text-white whitespace-nowrap z-10 pointer-events-none transition-opacity">
              {val.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
      
      {/* Fake X-axis */}
      <div className="absolute bottom-0 left-8 right-0 h-6 border-t border-white/10 flex justify-between text-[10px] text-muted-foreground pt-1">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>Now</span>
      </div>
    </div>
  );
}
