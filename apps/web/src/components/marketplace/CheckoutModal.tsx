"use client";

import { useState } from "react";
import { CartItem } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, Truck } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSuccess: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  onSuccess,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "SRUJAN Farmer",
    email: "srujan@agrimind.ai",
    address: "GT Road, Sector 14",
    city: "Karnal, Haryana",
    cardNumber: "•••• •••• •••• 4242",
  });

  const total = items.reduce((acc, item) => {
    const days = item.rentalDays || 1;
    const base = item.listing.type === "rent" ? item.listing.price * days : item.listing.price * item.quantity;
    const operator = item.includeOperator ? 600 * days : 0;
    return acc + base + operator;
  }, 0);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("confirmed");
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950 border border-white/10 rounded-3xl w-full max-w-lg p-6 relative shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-red-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "confirmed" ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">Order & Rental Confirmed!</h2>
            <p className="text-sm text-slate-300">
              Receipt code <span className="font-mono text-emerald-400 font-bold">#AGRI-{Math.floor(100000 + Math.random() * 900000)}</span> sent to {formData.email}.
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-left space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Shipping / Transport:</span>
                <span className="text-white font-medium">Express Farm Delivery</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Paid:</span>
                <span className="text-emerald-400 font-bold">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl"
            >
              Done & Return to Marketplace
            </Button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                <Lock className="h-3.5 w-3.5" /> 256-Bit Encrypted Payment
              </div>
              <h2 className="text-2xl font-bold text-white">Marketplace Checkout</h2>
              <p className="text-slate-400 text-xs">Complete shipping & payment information.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Full Name</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-900 border-slate-800 h-10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Delivery Address</label>
                <Input
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-slate-900 border-slate-800 h-10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">City / State</label>
                  <Input
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-slate-900 border-slate-800 h-10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Card / UPI Info</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="bg-slate-900 border-slate-800 h-10 text-xs text-white pl-8"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Order Total ({items.length} items):</span>
              <span className="text-xl font-black text-emerald-400">₹{total.toLocaleString("en-IN")}</span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/40"
            >
              {loading ? "Processing Secure Payment..." : `Pay ₹${total.toLocaleString("en-IN")} & Confirm Order`}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
