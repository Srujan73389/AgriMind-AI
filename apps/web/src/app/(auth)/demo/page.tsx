"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Sparkles, Calendar, User, Mail, Building } from "lucide-react";

export default function DemoPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    farmSize: "10-50 hectares",
    preferredTime: "Morning",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 relative z-10">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-2">
          <Sparkles className="text-white h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Book a Demo</h1>
        <p className="text-slate-400 text-sm">Experience AgriMind AI OS personalized for your farm</p>
      </div>

      {submitted ? (
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-white">Demo Requested!</h2>
          <p className="text-slate-300 text-sm">
            Thank you, <span className="text-emerald-400 font-medium">{formData.name || "Agri Partner"}</span>. Our agronomic specialist will reach out to <span className="text-emerald-400 font-medium">{formData.email}</span> shortly.
          </p>
          <div className="pt-2 flex flex-col gap-3">
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" /> Explore Interactive Platform Demo
            </Button>
            <Link href="/" className="text-xs text-slate-400 hover:text-slate-200">
              Return to Home
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-emerald-400" /> Full Name
            </label>
            <Input
              required
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-900/80 border-slate-800 focus:border-emerald-500 h-11 text-white text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-emerald-400" /> Work Email
            </label>
            <Input
              required
              type="email"
              placeholder="alex@farmcorp.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-900/80 border-slate-800 focus:border-emerald-500 h-11 text-white text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5 text-emerald-400" /> Farm / Organization Name
            </label>
            <Input
              required
              placeholder="GreenValley Agri Farms"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="bg-slate-900/80 border-slate-800 focus:border-emerald-500 h-11 text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Farm Scale</label>
              <select
                value={formData.farmSize}
                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-md px-3 h-11 text-white text-sm focus:border-emerald-500 outline-none"
              >
                <option value="< 10 hectares">&lt; 10 hectares</option>
                <option value="10-50 hectares">10 - 50 hectares</option>
                <option value="50-200 hectares">50 - 200 hectares</option>
                <option value="200+ hectares">200+ hectares</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-emerald-400" /> Slot Time
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-md px-3 h-11 text-white text-sm focus:border-emerald-500 outline-none"
              >
                <option value="Morning">Morning (AM)</option>
                <option value="Afternoon">Afternoon (PM)</option>
                <option value="Evening">Evening (PM)</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <span>Scheduling Demo...</span>
            ) : (
              <>
                Confirm Demo Request <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}

      <div className="pt-2 text-center border-t border-slate-800">
        <p className="text-xs text-slate-400">
          Want immediate access?{" "}
          <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium">
            Start Free Trial
          </Link>{" "}
          or{" "}
          <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300 font-medium">
            Launch Sandbox
          </Link>
        </p>
      </div>
    </div>
  );
}
