"use client";

import { useState } from "react";
import { CartItem } from "./types";
import { Button } from "@/components/ui/button";
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AGRI10" || promoCode.trim().toUpperCase() === "FARM10") {
      setDiscount(0.1); // 10%
    } else {
      alert("Invalid code. Use AGRI10 for 10% discount!");
    }
  };

  const calculateItemPrice = (item: CartItem) => {
    const isRent = item.listing.type === "rent";
    const days = item.rentalDays || 1;
    const base = isRent ? item.listing.price * days : item.listing.price * item.quantity;
    const operator = item.includeOperator ? 600 * days : 0;
    return base + operator;
  };

  const subtotal = items.reduce((acc, item) => acc + calculateItemPrice(item), 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 0 ? (subtotal > 3000 ? 0 : 250) : 0;
  const total = subtotal - discountAmount + shipping;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-950 border-l border-white/10 h-full flex flex-col justify-between shadow-2xl p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-white">Your Cart ({items.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
              <ShoppingBag className="h-12 w-12 text-slate-600" />
              <p className="text-sm text-slate-400">Your cart is currently empty.</p>
              <Button onClick={onClose} variant="outline" className="text-xs border-white/10">
                Browse Marketplace
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const itemTotal = calculateItemPrice(item);
              const isRent = item.listing.type === "rent";

              return (
                <div
                  key={item.listing.id}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex gap-3 relative group"
                >
                  <img
                    src={item.listing.imageUrl}
                    alt={item.listing.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-900"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-white text-xs truncate">{item.listing.title}</h4>
                      <p className="text-[11px] text-slate-400">
                        {isRent ? `${item.rentalDays || 1} days rental` : `₹${item.listing.price.toLocaleString("en-IN")} ${item.listing.priceUnit}`}
                        {item.includeOperator && " • Driver Incl."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                        <button
                          onClick={() => onUpdateQuantity(item.listing.id, -1)}
                          className="w-5 h-5 rounded text-xs font-bold text-slate-300 hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {isRent ? item.rentalDays : item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.listing.id, 1)}
                          className="w-5 h-5 rounded text-xs font-bold text-slate-300 hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-emerald-400">₹{itemTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.listing.id)}
                    className="text-slate-500 hover:text-red-400 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <form onSubmit={applyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  placeholder="Promo Code (e.g. AGRI10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 h-9 text-xs text-white uppercase outline-none focus:border-emerald-500"
                />
              </div>
              <Button type="submit" variant="outline" className="border-white/10 text-xs h-9">
                Apply
              </Button>
            </form>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount (10%)</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Freight / Transport</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString("en-IN")}`}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-emerald-400 text-lg">₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 justify-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Guaranteed Escrow & Buyer Protection
            </div>

            <Button
              onClick={onProceedToCheckout}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
            >
              Checkout Now (₹{total.toLocaleString("en-IN")}) <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
