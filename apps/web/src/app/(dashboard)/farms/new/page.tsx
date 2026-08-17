"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Check, ChevronRight } from "lucide-react";
import { FarmMap } from "@/components/farm/FarmMap";
import { useRouter } from "next/navigation";

export default function NewFarmPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [farmName, setFarmName] = useState("");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Add New Farm</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className={step >= 1 ? "text-emerald-400 font-medium" : ""}>1. Details</span>
          <ChevronRight className="h-4 w-4" />
          <span className={step >= 2 ? "text-emerald-400 font-medium" : ""}>2. Boundaries</span>
          <ChevronRight className="h-4 w-4" />
          <span className={step >= 3 ? "text-emerald-400 font-medium" : ""}>3. Crops</span>
        </div>
      </div>

      <Card className="glass p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Farm Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Farm Name</label>
                  <Input 
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    placeholder="e.g. North Valley Estate" 
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search location..." className="pl-10 bg-white/5 border-white/10" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                Next Step
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Draw Farm Boundaries</h2>
                <Button variant="outline" size="sm" className="border-white/10 text-xs">Clear Map</Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Click on the map to draw the perimeter of your farm. Double-click to finish.
              </p>
              <div className="h-[400px] w-full rounded-xl overflow-hidden border border-white/10">
                <FarmMap interactive={true} />
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                Next Step
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Primary Crops</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Corn', 'Soybeans', 'Wheat', 'Cotton', 'Rice', 'Alfalfa', 'Vineyard', 'Other'].map((crop) => (
                  <div key={crop} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors">
                    <span className="font-medium text-sm text-white">{crop}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => router.push('/farms')} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                <Check className="mr-2 h-4 w-4" /> Save Farm
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
