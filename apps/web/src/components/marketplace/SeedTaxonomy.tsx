"use client";

import { useState } from "react";
import { Wheat, Carrot, Sparkles, Filter, X, Check, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SeedGroup {
  id: string;
  name: string;
  icon: string;
  subCategories: string[];
}

export const SEED_GROUPS: SeedGroup[] = [
  {
    id: "cereals",
    name: "Cereals & Millets",
    icon: "🌾",
    subCategories: ["Paddy / Rice", "Maize", "Ragi", "Jowar / Sorghum", "Bajra / Pearl Millet"]
  },
  {
    id: "pulses",
    name: "Pulses",
    icon: "🥜",
    subCategories: ["Groundnut", "Red Gram / Toor Dal", "Green Gram / Moong", "Black Gram / Urad", "Chickpea / Bengal Gram", "Cowpea"]
  },
  {
    id: "vegetables",
    name: "Vegetables",
    icon: "🥬",
    subCategories: ["Tomato", "Onion", "Chilli", "Brinjal", "Cabbage", "Cauliflower", "Carrot", "Beans", "Okra / Bhendi", "Cucumber", "Pumpkin", "Bitter Gourd", "Bottle Gourd", "Watermelon"]
  },
  {
    id: "commercial",
    name: "Commercial / Oil Crops",
    icon: "🌻",
    subCategories: ["Sunflower", "Sesame", "Soybean", "Cotton"]
  },
  {
    id: "other",
    name: "Other / Spices & Greens",
    icon: "🌿",
    subCategories: ["Coriander", "Fenugreek", "Spinach", "Marigold"]
  }
];

interface SeedTaxonomyProps {
  selectedSubCategory: string | null;
  onSelectSubCategory: (subCat: string | null) => void;
  onOpenSeedAdvisor?: () => void;
}

export function SeedTaxonomy({
  selectedSubCategory,
  onSelectSubCategory,
  onOpenSeedAdvisor,
}: SeedTaxonomyProps) {
  const [activeGroup, setActiveGroup] = useState<string>("all");

  return (
    <div className="p-5 rounded-3xl bg-slate-900/60 border border-emerald-500/30 backdrop-blur-md space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Wheat className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Seed & Plant Directory
              {selectedSubCategory && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                  Active: {selectedSubCategory}
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">Filter certified seeds and nursery saplings by crop type.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenSeedAdvisor && (
            <Button
              onClick={onOpenSeedAdvisor}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs h-9 px-3 rounded-xl flex items-center gap-1.5 shadow-md"
            >
              <Bot className="h-4 w-4" /> Ask AI Which Seed to Buy
            </Button>
          )}

          {selectedSubCategory && (
            <button
              onClick={() => onSelectSubCategory(null)}
              className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
            >
              <X className="h-3.5 w-3.5" /> Clear Seed Filter
            </button>
          )}
        </div>
      </div>

      {/* Group Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveGroup("all")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            activeGroup === "all"
              ? "bg-emerald-600 text-white shadow-md"
              : "bg-slate-950 border border-white/10 text-slate-300 hover:bg-white/5"
          }`}
        >
          All Seed Categories
        </button>

        {SEED_GROUPS.map((group) => (
          <button
            key={group.id}
            onClick={() => setActiveGroup(group.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
              activeGroup === group.id
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-slate-950 border border-white/10 text-slate-300 hover:bg-white/5"
            }`}
          >
            <span>{group.icon}</span>
            <span>{group.name}</span>
          </button>
        ))}
      </div>

      {/* Sub-Category Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {SEED_GROUPS.filter((g) => activeGroup === "all" || g.id === activeGroup).map((group) =>
          group.subCategories.map((subCat) => {
            const isSelected = selectedSubCategory === subCat;
            return (
              <button
                key={subCat}
                onClick={() => onSelectSubCategory(isSelected ? null : subCat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1 border ${
                  isSelected
                    ? "bg-emerald-500 border-emerald-400 text-black font-bold shadow-md shadow-emerald-950/50 scale-105"
                    : "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-emerald-500/40 hover:text-white"
                }`}
              >
                <span>{group.icon}</span>
                <span>{subCat}</span>
                {isSelected && <Check className="h-3 w-3 text-black shrink-0" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
