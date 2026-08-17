"use client";

import { useState } from "react";
import { UploadZone, SAMPLE_PRESETS, SamplePreset } from "@/components/disease/UploadZone";
import { DiseaseResult } from "@/components/disease/DiseaseResult";

export default function DiseaseDetectionPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_PRESETS[0].imageUrl);
  const [selectedPreset, setSelectedPreset] = useState<SamplePreset | null>(SAMPLE_PRESETS[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageSelect = (imageUrl: string, preset?: SamplePreset) => {
    setSelectedImage(imageUrl);
    if (preset) {
      setSelectedPreset(preset);
    } else {
      setSelectedPreset({
        id: "custom-upload",
        name: "Uploaded Plant Leaf",
        crop: "Field Sample",
        imageUrl: imageUrl,
        diseaseName: "Foliar Spot & Early Blight Lesions",
        scientificName: "Alternaria solani / Computer Vision Scan",
        confidence: 91,
        severity: 54,
        severityLabel: "Moderate (54%)",
        description: "Vision AI model detected characteristic concentric rings with chlorotic margin on leaf surface.",
        treatments: [
          "Foliar application of Copper Hydroxide or Mancozeb fungicide.",
          "Ensure adequate row spacing to encourage rapid canopy drying.",
          "Scout surrounding crop acreage for further lesion expansion."
        ]
      });
    }
    // Automatically trigger AI analysis animation when selecting a new leaf
    triggerAnalysis();
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setSelectedPreset(null);
    setAnalyzing(false);
    setProgress(0);
  };

  const triggerAnalysis = () => {
    setAnalyzing(true);
    setProgress(15);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setAnalyzing(false);
          return 100;
        }
        return prev + 20;
      });
    }, 180);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
          AI Disease Detection & Grad-CAM Heatmaps
        </h1>
        <p className="text-muted-foreground">
          Upload plant leaf photos or choose a test sample for real-time computer vision diagnosis and treatments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <UploadZone
            selectedImage={selectedImage}
            analyzing={analyzing}
            onImageSelect={handleImageSelect}
            onClearImage={handleClearImage}
            onAnalyze={triggerAnalysis}
          />

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-xs text-blue-200">
            <h4 className="font-semibold mb-1 flex items-center gap-2 text-sm text-blue-300">
              <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[10px] font-bold text-black">i</span>
              Tips for Best Diagnostics Accuracy
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-blue-300/80">
              <li>Ensure leaf surface is well lit without strong backlight shadows.</li>
              <li>Include both healthy tissue and lesion boundaries in the photo frame.</li>
              <li>Use the <strong>1-Click Quick Samples</strong> below the card to test instantly.</li>
            </ul>
          </div>
        </div>

        <div>
          <DiseaseResult
            result={selectedPreset}
            selectedImage={selectedImage}
            analyzing={analyzing}
            progress={progress}
          />
        </div>
      </div>
    </div>
  );
}
