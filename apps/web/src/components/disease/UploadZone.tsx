"use client";

import { useState, useRef } from "react";
import { UploadCloud, Camera, Image as ImageIcon, RefreshCw, X, Sparkles, Check, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface SamplePreset {
  id: string;
  name: string;
  crop: string;
  imageUrl: string;
  diseaseName: string;
  scientificName: string;
  confidence: number;
  severity: number;
  severityLabel: string;
  description: string;
  treatments: string[];
  recommendedPesticideId?: string;
  recommendedPesticideName?: string;
  recommendedPesticidePrice?: number;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: "paddy-blast",
    name: "Paddy Leaf Blast",
    crop: "Rice/Paddy",
    imageUrl: "/images/leaf_blast.jpg",
    diseaseName: "Paddy Blast Disease (Foliar)",
    scientificName: "Magnaporthe oryzae",
    confidence: 97,
    severity: 78,
    severityLabel: "Severe (78%)",
    description: "Spindle-shaped lesions with gray centers and reddish-brown borders. Severe foliar necrosis causing leaf drying in humid conditions.",
    treatments: [
      "Foliar spray of Tricyclazole 75 WP (0.6g/L) or Copper Oxychloride 50 WP (3g/L).",
      "Avoid excess nitrogen fertilizer application during peak leaf blast stage.",
      "Maintain 5cm standing water layer in paddy field to reduce spore propagation."
    ],
    recommendedPesticideId: "pest-2",
    recommendedPesticideName: "Copper Oxychloride 50% WP Broad Spectrum Fungicide",
    recommendedPesticidePrice: 450
  },
  {
    id: "ragi-spot",
    name: "Ragi Leaf Spot",
    crop: "Ragi / Finger Millet",
    imageUrl: "/images/leaf_spot.jpg",
    diseaseName: "Finger Millet Leaf Spot & Blast",
    scientificName: "Pyricularia grisea",
    confidence: 94,
    severity: 52,
    severityLabel: "Moderate (52%)",
    description: "Small brown oval spots expanding into diamond-shaped lesions across finger millet leaves. Reduces grain spikelet formation.",
    treatments: [
      "Spray Mancozeb 75 WP (2.5g/L) or Bio-Fungicide Trichoderma Viride (5g/L).",
      "Apply Soluble N-P-K 19-19-19 + Zinc EDTA to strengthen cell walls.",
      "Destroy infected crop residue post harvest."
    ],
    recommendedPesticideId: "pest-1",
    recommendedPesticideName: "Trichoderma Viride Bio-Fungicide Powder",
    recommendedPesticidePrice: 320
  },
  {
    id: "corn-blight",
    name: "Corn Leaf Blight",
    crop: "Maize / Corn",
    imageUrl: "/images/leaf_blight.jpg",
    diseaseName: "Northern Corn Leaf Blight",
    scientificName: "Exserohilum turcicum",
    confidence: 95,
    severity: 65,
    severityLabel: "Moderate (65%)",
    description: "Characterized by long, elliptical, grayish-green to tan lesions on leaves. Can cause severe leaf necrosis if uncontrolled.",
    treatments: [
      "Apply Mancozeb 75 WP or Emamectin Benzoate for combined caterpillar & fungal control.",
      "Scout downwind adjacent field zones for spore propagation.",
      "Rotate with non-host crops (e.g., groundnut) for the next season."
    ],
    recommendedPesticideId: "pest-4",
    recommendedPesticideName: "Mancozeb 75% WP Contact Fungicide",
    recommendedPesticidePrice: 490
  },
  {
    id: "healthy-crop",
    name: "Healthy Paddy Leaf",
    crop: "Rice/Paddy",
    imageUrl: "/images/healthy_leaf.jpg",
    diseaseName: "Healthy Crop - No Disease Detected",
    scientificName: "Oryza sativa (Optimal Health)",
    confidence: 99,
    severity: 0,
    severityLabel: "Healthy (0%)",
    description: "Vibrant green chlorosis pattern, uniform cell structure, and robust chlorophyll levels. No pathogenic lesions detected.",
    treatments: [
      "Maintain current fertilization and watering schedule.",
      "Apply Soluble N-P-K 19-19-19 for booster tiller growth."
    ],
    recommendedPesticideId: "fert-1",
    recommendedPesticideName: "Water Soluble N-P-K 19:19:19 Fertilizer",
    recommendedPesticidePrice: 240
  }
];

interface UploadZoneProps {
  selectedImage: string | null;
  analyzing: boolean;
  onImageSelect: (imageUrl: string, preset?: SamplePreset) => void;
  onClearImage: () => void;
  onAnalyze: () => void;
}

export function UploadZone({
  selectedImage,
  analyzing,
  onImageSelect,
  onClearImage,
  onAnalyze,
}: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden File & Camera Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Main Upload / Camera Action Box */}
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass p-6 text-center border-2 border-dashed transition-all duration-300 ${
          dragActive
            ? "border-emerald-400 bg-emerald-500/10"
            : selectedImage
            ? "border-emerald-500/40 bg-slate-900/60"
            : "border-white/10 hover:border-emerald-500/50 hover:bg-white/5"
        }`}
      >
        {selectedImage ? (
          <div className="space-y-4">
            <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 group">
              <img
                src={selectedImage}
                alt="Selected Leaf Sample"
                className="w-full h-full object-cover"
              />

              <button
                onClick={onClearImage}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 hover:bg-rose-600 text-white transition-colors border border-white/10 shadow-lg"
                title="Remove photo"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                <Check className="h-3.5 w-3.5" /> Leaf Photo Ready
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={onAnalyze}
                disabled={analyzing}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 text-xs"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> Analyzing Image...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Run AI Diagnosis & Grad-CAM
                  </>
                )}
              </Button>

              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-white/10 text-slate-300 hover:text-white bg-slate-900 h-11 px-4 rounded-xl text-xs"
              >
                Change Photo
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <Camera className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Scan Crop Leaf for AI Diagnosis
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Take a direct camera photo of the infected leaf or upload a photo from your device gallery.
              </p>
            </div>

            {/* 2 Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
              <Button
                onClick={() => cameraInputRef.current?.click()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-12 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
              >
                <Camera className="h-4 w-4" /> 📷 Take Live Camera Photo
              </Button>

              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-white/10 hover:border-emerald-500/40 bg-slate-900 text-white font-bold text-xs h-12 rounded-xl flex items-center justify-center gap-2"
              >
                <UploadCloud className="h-4 w-4 text-emerald-400" /> 📁 Upload Leaf File
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Verified Real Leaf Test Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="h-4 w-4 text-emerald-400" /> Real Leaf Test Samples ({SAMPLE_PRESETS.length})
          </span>
          <span className="text-[10px] text-emerald-400 font-normal">Click to diagnose instantly</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onImageSelect(preset.imageUrl, preset)}
              className="p-2 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/50 hover:bg-slate-800/80 cursor-pointer transition-all duration-300 space-y-2 group"
            >
              <div className="relative h-24 rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={preset.imageUrl}
                  alt={preset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1.5 right-1.5 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-400 font-bold border border-white/10">
                  {preset.confidence}%
                </div>
              </div>

              <div className="px-1">
                <div className="font-bold text-white text-xs truncate">{preset.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{preset.crop}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
