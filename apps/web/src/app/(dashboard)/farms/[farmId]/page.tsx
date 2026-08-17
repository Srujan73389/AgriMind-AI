import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, Cpu, Activity, Download } from "lucide-react";
import Link from "next/link";
import { FarmMap } from "@/components/farm/FarmMap";
import { SensorChart } from "@/components/sensors/SensorChart";

export default function FarmDetailPage({ params }: { params: { farmId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/farms">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">North Valley</h1>
            <p className="text-sm text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Healthy Status
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 bg-white/5">
            <Settings className="mr-2 h-4 w-4" /> Manage
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass overflow-hidden h-[400px]">
            <FarmMap interactive={false} />
          </Card>
          
          <Tabs defaultValue="sensors">
            <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start">
              <TabsTrigger value="sensors" className="data-[state=active]:bg-emerald-600">Sensors</TabsTrigger>
              <TabsTrigger value="predictions" className="data-[state=active]:bg-emerald-600">AI Predictions</TabsTrigger>
              <TabsTrigger value="devices" className="data-[state=active]:bg-emerald-600">IoT Devices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sensors" className="space-y-4 pt-4">
              <Card className="glass p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-white">Soil Moisture Trend</h3>
                  <Button variant="ghost" size="sm" className="h-8"><Download className="h-4 w-4" /></Button>
                </div>
                <div className="h-[250px] w-full">
                  <SensorChart />
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="predictions" className="pt-4">
              <Card className="glass p-5 text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>AI models are currently analyzing the latest satellite imagery.</p>
                <p className="text-sm mt-2">Predictions will be available shortly.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="glass p-5">
            <h3 className="font-semibold text-white mb-4">Farm Info</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Crop</span>
                <span className="font-medium text-white">Corn (Dekalb)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Area</span>
                <span className="font-medium text-white">142 Acres</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-muted-foreground">Planted</span>
                <span className="font-medium text-white">Apr 15, 2026</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Est. Yield</span>
                <span className="font-medium text-emerald-400">185 bu/ac</span>
              </div>
            </div>
          </Card>

          <Card className="glass p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Connected Devices</h3>
              <Cpu className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="text-sm font-medium text-white">Soil Probe 1</p>
                  <p className="text-xs text-muted-foreground">Sector A</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="text-sm font-medium text-white">Weather Station</p>
                  <p className="text-xs text-muted-foreground">Central</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <Button variant="outline" className="w-full mt-2 border-white/10 text-xs h-8">Add Device</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
