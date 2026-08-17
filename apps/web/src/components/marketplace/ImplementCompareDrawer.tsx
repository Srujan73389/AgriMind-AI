"use client";

import { Listing } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Scale, Tractor, CheckCircle2, ShieldCheck, ShoppingBag } from "lucide-react";

interface ImplementCompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Listing[];
  onRemoveItem: (id: string) => void;
  onAddToCart: (listing: Listing) => void;
}

export function ImplementCompareDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onAddToCart,
}: ImplementCompareDrawerProps) {
  if (!isOpen || items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Compare Agri Implements</h2>
              <p className="text-xs text-slate-400">Side-by-side comparison of tractor HP, fuel burn, and rental rates.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-red-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Comparison Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col justify-between space-y-4 relative"
            >
              <button
                onClick={() => onRemoveItem(item.id)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950 text-slate-400 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-3">
                <div className="h-32 rounded-xl overflow-hidden bg-slate-950">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm line-clamp-1">{item.title}</h3>
                  <div className="text-emerald-400 font-bold text-lg font-mono">
                    ₹{item.price.toLocaleString("en-IN")}{" "}
                    <span className="text-xs font-normal text-slate-400">{item.priceUnit}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Suitable Tractor:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Tractor className="h-3 w-3" /> {item.minHpRequired || 35} – {item.maxHpRequired || 55} HP
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Main Application:</span>
                    <span className="text-white font-medium truncate max-w-[130px]">
                      {item.specs["Main Use"] || item.specs["Crop"] || "Tillage"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Fuel Burn:</span>
                    <span className="text-amber-400 font-medium">
                      ~{item.fuelBurnLitersPerHour || 3.0} L / Hr
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Operator Option:</span>
                    <span className={item.operatorAvailable ? "text-emerald-400" : "text-slate-500"}>
                      {item.operatorAvailable ? "Yes (+Driver)" : "Implement Only"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  onAddToCart(item);
                  onClose();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs h-10 flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="h-4 w-4" /> Book Rental
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
