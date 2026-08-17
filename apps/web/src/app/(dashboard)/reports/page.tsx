"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Plus,
  Eye,
  CheckCircle2,
  Printer,
  Sparkles,
  ShieldCheck,
  Building2,
  Landmark,
  Layers,
  Calendar,
  Search,
  QrCode,
  X,
  Wheat,
  Activity,
  Droplets
} from "lucide-react";
import { downloadOfficialPdf } from "@/lib/pdfHelper";

interface ReportDoc {
  id: string;
  title: string;
  category: "Soil Health" | "Bank Loan (KCC)" | "Crop Insurance" | "Disease AI" | "Mandi Profit" | "Satellite";
  date: string;
  farmPlot: string;
  location: string;
  issuedBy: string;
  fileSize: string;
  status: "Lab Verified" | "Bank Ready" | "Official Record";
  summary: string;
}

const REPORT_DOCS: ReportDoc[] = [
  {
    id: "rep-101",
    title: "Gadihalli Soil Health Card Certificate (NPK Lab Audit)",
    category: "Soil Health",
    date: "Aug 08, 2026",
    farmPlot: "Paddy & Ragi Plot A1",
    location: "Gadihalli, Ajjampura Tq, Chikkamagaluru KA",
    issuedBy: "District Soil Testing Lab & AgriMind AI",
    fileSize: "2.4 MB PDF",
    status: "Lab Verified",
    summary: "Complete N-P-K soil analysis, pH 6.8 rating, organic carbon content (0.72%), and recommended micronutrient dosage."
  },
  {
    id: "rep-102",
    title: "Kisan Credit Card (KCC) Bank Loan Yield Potential Certificate",
    category: "Bank Loan (KCC)",
    date: "Aug 05, 2026",
    farmPlot: "All Active Plots (13.7 Acres)",
    location: "Chikkamagaluru District, KA",
    issuedBy: "Canara Bank / SBI Agri Loan Board",
    fileSize: "3.1 MB PDF",
    status: "Bank Ready",
    summary: "Certified crop yield forecast (24.5 qtl/acre) and land asset evaluation required for ₹1.6 Lakh collateral-free credit."
  },
  {
    id: "rep-103",
    title: "PM Fasal Bima Yojana Crop Insurance Claim Audit",
    category: "Crop Insurance",
    date: "Jul 28, 2026",
    farmPlot: "Groundnut Plot B2",
    location: "Ajjampura, Chikkamagaluru KA",
    issuedBy: "Agriculture Department, Govt of Karnataka",
    fileSize: "1.8 MB PDF",
    status: "Official Record",
    summary: "Sentinel-2 satellite NDWI moisture stress proof verifying drought impact for instant DBT insurance payout."
  },
  {
    id: "rep-104",
    title: "Paddy Leaf Blast YOLOv11 AI Diagnostic Certificate",
    category: "Disease AI",
    date: "Jul 20, 2026",
    farmPlot: "Paddy Plot A1",
    location: "Gadihalli Village, KA",
    issuedBy: "AgriMind Computer Vision Lab",
    fileSize: "1.2 MB PDF",
    status: "Lab Verified",
    summary: "Grad-CAM visual heatmap proof, 97.2% AI confidence diagnostic, and bio-pesticide spray prescription."
  },
  {
    id: "rep-105",
    title: "Chikkamagaluru Mandi Arecanut Profit & Loss Audit Statement",
    category: "Mandi Profit",
    date: "Jul 15, 2026",
    farmPlot: "Arecanut Plantation C3",
    location: "Tarikere, Chikkamagaluru KA",
    issuedBy: "APMC Commercial Trade Cell",
    fileSize: "1.5 MB PDF",
    status: "Official Record",
    summary: "30-day cold storage hold calculation proof showing net profit gain of +₹48,500."
  }
];

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportDoc[]>(REPORT_DOCS);
  const [selectedReport, setSelectedReport] = useState<ReportDoc | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  // Form for custom report builder
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<ReportDoc["category"]>("Soil Health");
  const [newPlot, setNewPlot] = useState("Gadihalli Plot A1");

  const filteredReports = reports.filter((rep) =>
    rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.farmPlot.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportPdf = (doc: ReportDoc) => {
    downloadOfficialPdf({
      title: doc.title,
      category: doc.category,
      date: doc.date,
      farmPlot: doc.farmPlot,
      location: doc.location,
      summary: doc.summary
    });
  };

  const handleGenerateCustom = () => {
    if (!newTitle) return;
    const newDoc: ReportDoc = {
      id: `rep-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      date: "Today, Aug 08, 2026",
      farmPlot: newPlot,
      location: "Gadihalli, Ajjampura Tq, Chikkamagaluru KA",
      issuedBy: "AgriMind Multi-Agent Certification Engine",
      fileSize: "2.1 MB PDF",
      status: "Lab Verified",
      summary: "Custom generated official agricultural performance report with live telemetry and satellite NDVI verification."
    };

    setReports([newDoc, ...reports]);
    handleExportPdf(newDoc);
    setIsBuilderOpen(false);
    setNewTitle("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <FileText className="h-3.5 w-3.5" /> Official Agricultural PDF Reports & Certificate Portal
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Official PDF Reports & Certificates</h1>
          <p className="text-muted-foreground text-sm">
            Generate, preview, and download official Soil Health Cards, KCC Bank Loan Certificates, and Insurance Audits.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={() => setIsBuilderOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 px-5 font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2 text-xs"
          >
            <Plus className="h-4 w-4" /> Generate New Official PDF
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search Soil Health Card, KCC Bank Loan, Insurance Claim, Gadihalli..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-900/80 border-white/10 h-11 text-xs text-white rounded-xl focus:border-emerald-500"
        />
      </div>

      {/* PDF Reports Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((doc) => (
          <Card
            key={doc.id}
            className="glass overflow-hidden p-5 flex flex-col justify-between space-y-4 border-white/10 hover:border-emerald-500/50 transition-all duration-300 shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-bold">
                  {doc.category}
                </Badge>

                <Badge className="bg-slate-950 text-slate-300 border-white/10 font-mono text-[10px]">
                  {doc.status}
                </Badge>
              </div>

              <div>
                <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors leading-snug">
                  {doc.title}
                </h3>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>{doc.farmPlot}</span>
                  <span className="font-mono text-emerald-400 font-bold">{doc.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-white/5 leading-relaxed">
                {doc.summary}
              </p>

              <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                <span>Issuer: {doc.issuedBy}</span>
                <span className="font-mono text-amber-400">{doc.fileSize}</span>
              </div>
            </div>

            {/* Action Buttons: Preview PDF & Download PDF */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <Button
                onClick={() => setSelectedReport(doc)}
                variant="outline"
                className="w-full border-white/10 hover:border-emerald-500/40 bg-slate-900 text-white font-bold text-xs h-10 rounded-xl flex items-center justify-center gap-1.5"
              >
                <Eye className="h-3.5 w-3.5 text-emerald-400" /> Preview PDF
              </Button>

              <Button
                onClick={() => handleExportPdf(doc)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Download className="h-3.5 w-3.5" /> Export PDF
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* REALISTIC OFFICIAL PDF CERTIFICATE PREVIEW MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-emerald-500/50 rounded-3xl w-full max-w-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-slate-200">
            {/* Modal Controls */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500 text-black font-bold text-xs">Official PDF Certificate Document</Badge>
                <span className="text-xs font-mono text-slate-400">{selectedReport.fileSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleExportPdf(selectedReport)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-9 px-3 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5" /> Export & Save PDF
                </Button>
                <button onClick={() => setSelectedReport(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* HIGH-RES OFFICIAL AGRICULTURAL CERTIFICATE TEMPLATE */}
            <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl space-y-6 border-4 border-emerald-700 relative overflow-hidden font-serif">
              {/* Header Seal & Watermark */}
              <div className="flex items-center justify-between border-b-2 border-emerald-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-2xl shadow-lg font-sans">
                    🌾
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-emerald-950 uppercase tracking-wide font-sans">
                      DEPARTMENT OF AGRICULTURE & SOIL HEALTH
                    </h2>
                    <p className="text-xs text-emerald-800 font-semibold font-sans">
                      GOVERNMENT OF KARNATAKA • AGRIMIND AI MULTI-AGENT LAB CERTIFICATION
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center rounded-lg font-mono text-[9px] p-1 text-center font-sans font-bold">
                    [ OFFICIAL QR STAMP ]
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono mt-1 font-sans">CERT-#88492-KA</div>
                </div>
              </div>

              {/* Document Title */}
              <div className="text-center space-y-1">
                <h1 className="text-xl font-bold text-slate-900 uppercase underline tracking-wider font-sans">
                  {selectedReport.title}
                </h1>
                <p className="text-xs text-slate-600 font-sans font-medium">
                  Issued on: <strong>{selectedReport.date}</strong> | Location: <strong>{selectedReport.location}</strong>
                </p>
              </div>

              {/* Farmer & Land Record Details */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Land Owner / Farmer</div>
                  <div className="font-bold text-slate-900 text-sm">SRUJAN M</div>
                  <div className="text-slate-600">Khata No. 421/B • Survey #88/A</div>
                </div>

                <div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold">Target Farm Plot</div>
                  <div className="font-bold text-slate-900 text-sm">{selectedReport.farmPlot}</div>
                  <div className="text-slate-600">Acreage: 6.2 Acres (Gadihalli, Ajjampura Tq)</div>
                </div>
              </div>

              {/* N-P-K Telemetry & Lab Results Table */}
              <div className="space-y-2 font-sans">
                <h3 className="font-bold text-xs text-emerald-950 uppercase tracking-wider">
                  Verified Soil Telemetry & Nutrient Metric Audit
                </h3>
                <table className="w-full text-xs text-left border border-slate-300 rounded-lg overflow-hidden">
                  <thead className="bg-emerald-800 text-white text-[11px]">
                    <tr>
                      <th className="p-2">Tested Parameter</th>
                      <th className="p-2">Measured Value</th>
                      <th className="p-2">Ideal Range</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="p-2 font-semibold">Nitrogen (N)</td>
                      <td className="p-2 font-mono">42 kg/ha</td>
                      <td className="p-2 font-mono">35 - 50 kg/ha</td>
                      <td className="p-2 text-emerald-700 font-bold">OPTIMAL</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Phosphorus (P)</td>
                      <td className="p-2 font-mono">18 kg/ha</td>
                      <td className="p-2 font-mono">15 - 25 kg/ha</td>
                      <td className="p-2 text-emerald-700 font-bold">OPTIMAL</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Potassium (K)</td>
                      <td className="p-2 font-mono">110 kg/ha</td>
                      <td className="p-2 font-mono">100 - 140 kg/ha</td>
                      <td className="p-2 text-emerald-700 font-bold">OPTIMAL</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Soil pH Level</td>
                      <td className="p-2 font-mono">6.8 pH</td>
                      <td className="p-2 font-mono">6.5 - 7.2 pH</td>
                      <td className="p-2 text-emerald-700 font-bold">IDEAL FOR PADDY</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Satellite NDVI Vigor</td>
                      <td className="p-2 font-mono">0.84 NDVI</td>
                      <td className="p-2 font-mono">&gt; 0.70 NDVI</td>
                      <td className="p-2 text-emerald-700 font-bold">HIGH CANOPY</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Digital Signatures & Seal */}
              <div className="pt-6 border-t border-slate-300 flex items-center justify-between font-sans text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono">DIGITAL SIGNATURE HASH</div>
                  <div className="font-mono text-[10px] text-slate-700">0x8F92A...49C1E8</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-950">Dr. K. M. Shivakumar</div>
                  <div className="text-[10px] text-slate-600">Senior Agronomist, KVK Chikkamagaluru</div>
                  <div className="text-[9px] text-emerald-800 font-bold mt-0.5">[ VERIFIED BY AGRIMIND AI ]</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generator Builder Modal */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-emerald-400" /> Generate Custom Official PDF Certificate
              </h3>
              <button onClick={() => setIsBuilderOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Certificate / Report Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Gadihalli Groundnut Yield Audit"
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Report Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white"
                >
                  <option value="Soil Health">Soil Health Card</option>
                  <option value="Bank Loan (KCC)">Bank Loan (KCC) Yield Certificate</option>
                  <option value="Crop Insurance">Crop Insurance Claim Audit</option>
                  <option value="Disease AI">Leaf Disease AI Certificate</option>
                  <option value="Mandi Profit">Mandi Profit Statement</option>
                  <option value="Satellite">Satellite NDVI Report</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Target Farm Plot</label>
                <select
                  value={newPlot}
                  onChange={(e) => setNewPlot(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white"
                >
                  <option value="Paddy Plot A1">Gadihalli Paddy Plot A1 (6.2 Acres)</option>
                  <option value="Groundnut Plot B2">Ajjampura Groundnut Plot B2 (3.0 Acres)</option>
                  <option value="Arecanut Estate C3">Tarikere Arecanut Estate C3 (4.5 Acres)</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleGenerateCustom}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40"
            >
              Compile & Export Official PDF Certificate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
