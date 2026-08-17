"use client";

import { Listing } from "./types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Sparkles, ShoppingBag, Calendar, MessageSquare, ShieldCheck, Tractor, Scale } from "lucide-react";

interface ProductCardProps {
  listing: Listing;
  onSelect: (listing: Listing) => void;
  onAddToCart: (listing: Listing) => void;
  onChatSeller: (listing: Listing) => void;
  onCompare?: (listing: Listing) => void;
  userTractorHp?: number | null;
}

export function ProductCard({
  listing,
  onSelect,
  onAddToCart,
  onChatSeller,
  onCompare,
  userTractorHp,
}: ProductCardProps) {
  const isRent = listing.type === "rent";
  const isService = listing.type === "service";

  const minHp = listing.minHpRequired;
  const maxHp = listing.maxHpRequired;

  const isHpCompatible =
    !userTractorHp ||
    !minHp ||
    (userTractorHp >= minHp && (!maxHp || userTractorHp <= maxHp + 10));

  return (
    <Card
      className={`glass overflow-hidden flex flex-col group transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20 border-white/10 ${
        !isHpCompatible ? "opacity-60 saturate-50" : ""
      }`}
    >
      {/* Top Media Area */}
      <div
        onClick={() => onSelect(listing)}
        className="h-48 bg-slate-900 relative overflow-hidden cursor-pointer"
      >
        <img
          src={listing.imageUrl}
          alt={listing.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80";
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge
            className={`font-semibold text-xs border-0 backdrop-blur-md shadow-md ${
              isRent
                ? "bg-amber-500 text-black"
                : isService
                ? "bg-purple-500 text-white"
                : "bg-emerald-500 text-black"
            }`}
          >
            {isRent ? "For Rent" : isService ? "Service" : "For Sale"}
          </Badge>

          {listing.isVerifiedItem && (
            <Badge className="bg-slate-900/90 text-emerald-400 border border-emerald-500/40 text-[10px] flex items-center gap-1 backdrop-blur-md">
              <ShieldCheck className="h-3 w-3 text-emerald-400" /> Verified
            </Badge>
          )}

          {minHp && (
            <Badge
              className={`text-[10px] flex items-center gap-1 backdrop-blur-md border ${
                isHpCompatible
                  ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/50"
                  : "bg-red-950/90 text-red-300 border-red-500/50"
              }`}
            >
              <Tractor className="h-3 w-3" />
              {isHpCompatible ? `Requires ${minHp}-${maxHp || 60} HP` : `Requires ${minHp}+ HP (Incompatible)`}
            </Badge>
          )}
        </div>

        {/* AI Recommended Badge */}
        {listing.aiRecommendedFor && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white flex items-center justify-between shadow-lg">
            <span className="flex items-center gap-1 truncate">
              <Sparkles className="h-3 w-3 text-yellow-300 shrink-0" /> AI Matched Recommendation
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="truncate max-w-[150px] font-medium text-slate-300">
              {listing.seller.name}
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {listing.rating} ({listing.reviewsCount})
            </span>
          </div>

          <h3
            onClick={() => onSelect(listing)}
            className="font-bold text-white text-base leading-snug line-clamp-2 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {listing.title}
          </h3>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-black text-emerald-400">₹{listing.price.toLocaleString("en-IN")}</span>
            <span className="text-xs text-slate-400 font-medium">{listing.priceUnit}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              {listing.location}
            </span>
            <span className="text-slate-500 font-mono text-[11px]">
              {listing.distanceMiles} mi away
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => onAddToCart(listing)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-9 rounded-xl shadow-md flex items-center justify-center gap-1.5"
            >
              {isRent ? (
                <>
                  <Calendar className="h-3.5 w-3.5" /> Rent Now
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
                </>
              )}
            </Button>

            <div className="flex items-center gap-1">
              <Button
                onClick={() => onChatSeller(listing)}
                variant="outline"
                className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs h-9 rounded-xl flex items-center justify-center gap-1"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-400" /> Chat
              </Button>

              {onCompare && listing.category === "equipment" && (
                <Button
                  onClick={() => onCompare(listing)}
                  variant="outline"
                  title="Compare Implement"
                  className="px-2 border-white/10 bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 text-xs h-9 rounded-xl"
                >
                  <Scale className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
