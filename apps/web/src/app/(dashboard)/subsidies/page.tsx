"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Landmark,
  FileText,
  CheckCircle2,
  Sparkles,
  Calculator,
  Download,
  ShieldCheck,
  Building2,
  DollarSign,
  Search,
  Plus,
  X,
  Tractor,
  SunMedium,
  Award,
  ArrowRight
} from "lucide-react";
import { downloadOfficialPdf } from "@/lib/pdfHelper";

interface Scheme {
  id: string;
  name: string;
  govtBody: string;
  subsidyPercent: string;
  maxBenefit: string;
  eligibility: string;
  category: "Machinery" | "Direct Cash" | "Bank Credit" | "Solar";
  appliedCount: number;
  status: "Eligible" | "Processing" | "Approved";
  description: string;
}

const SCHEMES: Scheme[] = [
  {
    id: "sch-1",
    name: "SMAM Agricultural Machinery 50% Subsidy Scheme",
    govtBody: "Ministry of Agriculture & Farmers Welfare / Karnataka Govt",
    subsidyPercent: "50% Discount",
    maxBenefit: "Up to ₹1,25,000",
    eligibility: "Farmers owning up to 5 Acres land (Gadihalli Plot A1 Eligible)",
    category: "Machinery",
    appliedCount: 1420,
    status: "Eligible",
    description: "50% government subsidy on Rotavators, Seed Drills, Laser Land Levelers, and 45 HP Tractors purchased through authorized dealers."
  },
  {
    id: "sch-2",
    name: "PM-Kisan Samman Nidhi (Direct DBT Transfer)",
    govtBody: "Government of India (Central Sector Scheme)",
    subsidyPercent: "100% Direct Cash",
    maxBenefit: "₹6,000 / year",
    eligibility: "Small & Marginal Farmer Families (3 installments of ₹2,000)",
    category: "Direct Cash",
    appliedCount: 8900,
    status: "Approved",
    description: "Income support of ₹6,000 per year in three equal installments directly transferred to farmer Aadhaar linked bank account."
  },
  {
    id: "sch-3",
    name: "Kisan Credit Card (KCC) Collateral-Free Bank Loan",
    govtBody: "Reserve Bank of India / NABARD & Canara Bank",
    subsidyPercent: "4% Interest Subvention",
    maxBenefit: "Up to ₹1,60,000",
    eligibility: "All Cultivators & Tenant Farmers in Chikkamagaluru Dist",
    category: "Bank Credit",
    appliedCount: 3200,
    status: "Eligible",
    description: "Collateral-free crop loan at 4% effective interest rate with 1-year repayment flexibility and free crop insurance coverage."
  },
  {
    id: "sch-4",
    name: "PM-KUSUM Solar Water Pump 60% Subsidy Scheme",
    govtBody: "Ministry of New & Renewable Energy (MNRE)",
    subsidyPercent: "60% Subsidy",
    maxBenefit: "Up to ₹1,80,000",
    eligibility: "Farmers with borewells/open wells in Ajjampura Tq",
    category: "Solar",
    appliedCount: 950,
    status: "Eligible",
    description: "60% government subsidy (30% Central + 30% State) for installing 7.5 HP Off-Grid Solar Irrigation Water Pumps."
  }
];

export default function SubsidiesPage() {
  const [schemes, setSchemes] = useState<Scheme[]>(SCHEMES);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [landAcres, setLandAcres] = useState(3.0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchemes = schemes.filter((sch) =>
    sch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sch.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sch.govtBody.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // KCC Loan Credit Limit Calculator based on Acres
  const kccCreditLimit = Math.min(160000, Math.round(landAcres * 35000));
  const annualInterestSave = Math.round(kccCreditLimit * 0.03); // 3% subvention save

  const handleDownloadPdf = (scheme: Scheme) => {
    downloadOfficialPdf({
      title: scheme.name,
      category: scheme.category,
      date: "Aug 08, 2026",
      farmPlot: "Gadihalli Paddy Plot A1 (6.2 Acres)",
      location: "Gadihalli, Ajjampura Tq, Chikkamagaluru KA",
      summary: `Official Pre-Filled Application Form for ${scheme.name}. Verified subsidy benefit amount: ${scheme.maxBenefit}. Issued by ${scheme.govtBody}.`
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <Landmark className="h-3.5 w-3.5" /> Official PM-Kisan & Karnataka Govt Subsidy Portal
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Government Agri Subsidies & Loans</h1>
          <p className="text-muted-foreground text-sm">
            1-click eligibility check, 50% machinery subsidy applications, PM-Kisan DBT tracking, and KCC loan calculator.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={() => alert("Redirecting to PM-Kisan Official DBT Portal (pmkisan.gov.in)...")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 px-5 font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2 text-xs"
          >
            <ShieldCheck className="h-4 w-4" /> Check PM-Kisan DBT Status
          </Button>
        </div>
      </div>

      {/* KCC Loan Credit Limit Calculator Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/80 to-slate-900 border border-emerald-500/40 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Kisan Credit Card (KCC) Collateral-Free Loan Calculator</h2>
              <p className="text-xs text-slate-300">Calculate instant pre-approved credit limit based on your Gadihalli acreage</p>
            </div>
          </div>

          <Badge className="bg-emerald-500 text-black font-bold text-xs">Pre-Approved</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
            <div className="text-slate-400 text-[10px]">Your Land Area</div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={landAcres}
                onChange={(e) => setLandAcres(Math.max(0.5, Number(e.target.value)))}
                className="w-20 h-8 bg-slate-900 border-slate-800 text-white font-mono font-bold"
              />
              <span className="text-white font-bold">Acres</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
            <div className="text-slate-400 text-[10px]">Max Collateral-Free Loan</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">₹{kccCreditLimit.toLocaleString("en-IN")}</div>
            <div className="text-[10px] text-emerald-400">Zero Security Deposit</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
            <div className="text-slate-400 text-[10px]">Effective Interest Rate</div>
            <div className="text-2xl font-black text-amber-400 font-mono">4.0% / year</div>
            <div className="text-[10px] text-amber-400">3% Govt Subvention Savings</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-1 flex flex-col justify-between">
            <div className="text-slate-400 text-[10px]">Annual Interest Saved</div>
            <div className="text-xl font-bold text-white font-mono">₹{annualInterestSave.toLocaleString("en-IN")} / yr</div>
            <Button
              onClick={() => handleDownloadPdf(schemes[2])}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] h-8 rounded-xl"
            >
              Apply KCC Loan PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search SMAM 50% Subsidy, Rotavator, Solar Pump, PM-Kisan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-900/80 border-white/10 h-11 text-xs text-white rounded-xl focus:border-emerald-500"
        />
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <Card
            key={scheme.id}
            className="glass p-6 flex flex-col justify-between space-y-4 border-white/10 hover:border-emerald-500/50 transition-all duration-300 shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-bold">
                  {scheme.category}
                </Badge>

                <Badge
                  className={`font-bold text-[10px] ${
                    scheme.status === "Approved"
                      ? "bg-emerald-500 text-black"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  {scheme.status === "Approved" ? "✓ DBT Active" : "🟢 Pre-Verified Eligible"}
                </Badge>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg group-hover:text-emerald-400 transition-colors leading-snug">
                  {scheme.name}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">{scheme.govtBody}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-3 rounded-2xl bg-slate-950 border border-white/10">
                  <div className="text-slate-400 text-[10px]">Subsidy Rate</div>
                  <div className="text-lg font-black text-emerald-400 font-mono">{scheme.subsidyPercent}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-white/10">
                  <div className="text-slate-400 text-[10px]">Max Benefit Limit</div>
                  <div className="text-lg font-black text-amber-400 font-mono">{scheme.maxBenefit}</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-white/5 leading-relaxed">
                {scheme.description}
              </p>

              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                <span>Eligibility: <strong>{scheme.eligibility}</strong></span>
                <span className="text-emerald-400 font-mono">{scheme.appliedCount} Applied</span>
              </div>
            </div>

            <Button
              onClick={() => setSelectedScheme(scheme)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-2 mt-2 shadow-md"
            >
              <span>View Form & Download Application PDF</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Application PDF Generator Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedScheme(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <Badge className="bg-emerald-500 text-black font-bold text-xs">Official Application Form</Badge>
              <h3 className="text-xl font-bold text-white">{selectedScheme.name}</h3>
              <p className="text-xs text-slate-400">{selectedScheme.govtBody}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Pre-Filled Applicant Information:
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>Applicant Name: <strong>SRUJAN M</strong></div>
                <div>Land Record: <strong>Khata #421/B, Survey 88/A (Gadihalli, KA)</strong></div>
                <div>Aadhaar DBT Status: <strong>Linked & Verified</strong></div>
                <div>Calculated Subsidy Amount: <strong className="text-emerald-400 font-mono">{selectedScheme.maxBenefit}</strong></div>
              </div>
            </div>

            <Button
              onClick={() => {
                handleDownloadPdf(selectedScheme);
                setSelectedScheme(null);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 text-xs"
            >
              <Download className="h-4 w-4" /> Download Official Application PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
