"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Leaf, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    farmName: "",
    farmSize: "",
    cropType: "",
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem("agrimind_user", JSON.stringify(formData));
        router.push("/dashboard");
      }, 400);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 relative z-10">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
          <Leaf className="text-white h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
        <p className="text-slate-400">Join AgriMind OS and modernize your farm</p>
      </div>

      <div className="flex gap-2 mb-8">
        <div className={`h-1 flex-1 rounded-full transition-all ${step >= 1 ? "bg-blue-500" : "bg-slate-800"}`} />
        <div className={`h-1 flex-1 rounded-full transition-all ${step >= 2 ? "bg-blue-500" : "bg-slate-800"}`} />
      </div>

      <form onSubmit={handleNextStep} className="space-y-6">
        {step === 1 ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">First Name</label>
                <Input 
                  required
                  placeholder="First Name" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Last Name</label>
                <Input 
                  required
                  placeholder="Last Name" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <Input 
                  required
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Input 
                  required
                  type="password" 
                  placeholder="Create a password" 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Farm Name</label>
              <Input 
                required
                placeholder="Green Valley Farm" 
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Farm Size (Hectares)</label>
                <Input 
                  type="number"
                  placeholder="e.g. 2.5" 
                  value={formData.farmSize}
                  onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                  className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Primary Crop</label>
                <Input 
                  placeholder="e.g. Wheat, Paddy" 
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
                />
              </div>
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Opening Dashboard...</span>
          ) : step === 1 ? (
            <>Continue to Farm Details <ArrowRight className="h-4 w-4" /></>
          ) : (
            <>Complete & Open Dashboard <CheckCircle2 className="h-4 w-4" /></>
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
