"use client";

import { useState } from "react";
import { Listing } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  Calendar,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Phone,
  UserCheck,
  CheckCircle2,
  DollarSign
} from "lucide-react";

interface ProductDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
  onAddToCart: (listing: Listing, rentalDays?: number, includeOperator?: boolean) => void;
  onChatSeller: (listing: Listing) => void;
}

export function ProductDetailModal({
  listing,
  onClose,
  onAddToCart,
  onChatSeller,
}: ProductDetailModalProps) {
  if (!listing) return null;

  const isRent = listing.type === "rent";
  const [activeImage, setActiveImage] = useState(listing.imageUrl);
  const [rentalDays, setRentalDays] = useState(3);
  const [includeOperator, setIncludeOperator] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [offerAmount, setOfferAmount] = useState<string>("");

  const gallery = listing.galleryUrls?.length ? listing.galleryUrls : [listing.imageUrl];

  const operatorFeePerDay = 600;
  const totalPrice = isRent
    ? listing.price * rentalDays + (includeOperator ? operatorFeePerDay * rentalDays : 0)
    : listing.price;

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerAmount) return;
    setOfferSubmitted(true);
    setTimeout(() => {
      setOfferSubmitted(false);
      setOfferAmount("");
      alert(`Offer of ₹${offerAmount} sent to ${listing.seller.name}! They will respond shortly.`);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-red-600 text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column - Gallery */}
          <div className="space-y-4">
            <div className="h-72 md:h-96 rounded-2xl bg-slate-900 overflow-hidden relative border border-white/10">
              <img
                src={activeImage}
                alt={listing.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80";
                }}
                className="w-full h-full object-cover"
              />

              {listing.aiRecommendedFor && (
                <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300" /> AI Matched Recommendation
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {gallery.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(url)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === url ? "border-emerald-500 scale-105" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img src={url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Seller Profile Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={listing.seller.avatarUrl}
                    alt={listing.seller.name}
                    className="w-11 h-11 rounded-full object-cover border border-emerald-500/50"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                      {listing.seller.name}
                      {listing.seller.isVerified && (
                        <UserCheck className="h-4 w-4 text-emerald-400" title="Verified Seller" />
                      )}
                    </h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-emerald-400" /> {listing.seller.location} ({listing.seller.distanceMiles} mi)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {listing.seller.rating}
                  </div>
                  <p className="text-[10px] text-slate-400">{listing.seller.reviewsCount} reviews</p>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={() => onChatSeller(listing)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-9 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> Direct Chat
                </Button>
                <a href={`tel:${listing.seller.phone}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-white/10 bg-white/5 text-white text-xs h-9 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-400" /> Call Seller
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details & Booking */}
          <div className="flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  className={`font-semibold text-xs border-0 ${
                    isRent ? "bg-amber-500 text-black" : "bg-emerald-500 text-black"
                  }`}
                >
                  {isRent ? "Rental Equipment" : "Direct Purchase"}
                </Badge>
                {listing.isVerifiedItem && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <ShieldCheck className="h-4 w-4" /> Quality Inspected
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white leading-tight">{listing.title}</h2>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400">₹{listing.price.toLocaleString("en-IN")}</span>
                <span className="text-sm text-slate-400 font-medium">{listing.priceUnit}</span>
              </div>

              <p className="text-xs leading-relaxed text-slate-300 bg-white/5 p-3.5 rounded-xl border border-white/10">
                {listing.description}
              </p>
            </div>

            {/* Equipment Rental Booking Options */}
            {isRent && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> Select Rental Duration & Options:
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1">Rental Days</label>
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                      <button
                        onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-white text-sm">
                        {rentalDays} {rentalDays === 1 ? "day" : "days"}
                      </span>
                      <button
                        onClick={() => setRentalDays(rentalDays + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {listing.operatorAvailable && (
                    <div>
                      <label className="text-xs text-slate-300 font-medium block mb-1">Certified Driver</label>
                      <button
                        onClick={() => setIncludeOperator(!includeOperator)}
                        className={`w-full h-10 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                          includeOperator
                            ? "bg-emerald-600 border-emerald-500 text-white"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {includeOperator ? "Driver (+ ₹600/day)" : "No Driver"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-emerald-500/20 text-sm">
                  <span className="text-slate-300 font-medium">Total Booking Price:</span>
                  <span className="text-xl font-extrabold text-emerald-400">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}

            {/* Specs Table */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(listing.specs).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col">
                    <span className="text-slate-400 text-[10px] uppercase font-mono">{key}</span>
                    <span className="text-white font-medium text-xs mt-0.5">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiation / Make Offer Form */}
            <form onSubmit={handleMakeOffer} className="flex gap-2">
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  placeholder="Negotiate / Offer Price (₹)"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 h-9 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <Button type="submit" variant="outline" className="border-white/10 bg-white/5 text-white text-xs h-9 rounded-xl">
                Submit Offer
              </Button>
            </form>

            {/* Primary Action Button */}
            <Button
              onClick={() => {
                onAddToCart(listing, rentalDays, includeOperator);
                onClose();
              }}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 text-base"
            >
              {isRent ? (
                <>
                  <Calendar className="h-5 w-5" /> Reserve Equipment (₹{totalPrice.toLocaleString("en-IN")})
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" /> Add to Order (₹{totalPrice.toLocaleString("en-IN")})
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
