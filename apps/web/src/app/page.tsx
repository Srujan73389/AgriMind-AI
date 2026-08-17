import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Cpu, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/30 to-transparent rounded-full blur-[100px]" />
      </div>

      <header className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">AgriMind<span className="text-emerald-500">AI</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">Platform</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-white hover:text-emerald-400 transition-colors hidden sm:block">
            Log in
          </Link>
          <Link href="/register">
            <Button className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg shadow-emerald-900/20">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 relative z-10 pt-20 pb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8 border border-emerald-500/20">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          AgriMind OS 2.0 is now live
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-8 text-white">
          The Intelligent Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Modern Agriculture</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
          Harness the power of AI, IoT sensors, and satellite imagery to optimize crop yields, detect diseases early, and manage your farm with unprecedented precision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full rounded-full bg-emerald-600 hover:bg-emerald-500 text-lg h-14 px-8 shadow-xl shadow-emerald-900/30">
              Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/demo" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full rounded-full border-white/10 hover:bg-white/5 text-lg h-14 px-8">
              Book a Demo
            </Button>
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full text-left">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">AI-Powered Insights</h3>
            <p className="text-muted-foreground">Advanced ML models analyze sensor data to predict crop yields and recommend optimal actions.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Satellite Monitoring</h3>
            <p className="text-muted-foreground">High-resolution NDVI imagery to track crop health across thousands of acres automatically.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Early Disease Detection</h3>
            <p className="text-muted-foreground">Computer vision instantly identifies crop diseases from photos and recommends treatments.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
