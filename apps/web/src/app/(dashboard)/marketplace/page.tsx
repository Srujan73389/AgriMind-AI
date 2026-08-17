"use client";

import { useState } from "react";
import { Listing, CartItem, MarketplaceCategory, ListingType } from "@/components/marketplace/types";
import { INITIAL_LISTINGS } from "@/components/marketplace/data";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { ProductDetailModal } from "@/components/marketplace/ProductDetailModal";
import { CreateListingModal } from "@/components/marketplace/CreateListingModal";
import { CartDrawer } from "@/components/marketplace/CartDrawer";
import { CheckoutModal } from "@/components/marketplace/CheckoutModal";
import { ChatSellerModal } from "@/components/marketplace/ChatSellerModal";
import { SeedTaxonomy } from "@/components/marketplace/SeedTaxonomy";
import { AiImplementMatchmakerModal } from "@/components/marketplace/AiImplementMatchmakerModal";
import { AiSeedAdvisorModal } from "@/components/marketplace/AiSeedAdvisorModal";
import { ImplementCompareDrawer } from "@/components/marketplace/ImplementCompareDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  ShoppingBag,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Check,
  ShieldCheck,
  Wheat,
  Tractor,
  Package,
  Wrench,
  Bot,
  Scale,
  Gauge
} from "lucide-react";

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<MarketplaceCategory | "all">("all");
  const [activeType, setActiveType] = useState<ListingType | "all">("all");
  const [maxDistance, setMaxDistance] = useState<number>(500);
  const [onlyAiRecommended, setOnlyAiRecommended] = useState(false);
  const [selectedSeedSubCategory, setSelectedSeedSubCategory] = useState<string | null>(null);

  // Tractor HP Filter State
  const [userTractorHp, setUserTractorHp] = useState<number | null>(null);

  // Modals & Drawers state
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [chatListing, setChatListing] = useState<Listing | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAiMatchmakerOpen, setIsAiMatchmakerOpen] = useState(false);
  const [isAiSeedAdvisorOpen, setIsAiSeedAdvisorOpen] = useState(false);
  const [compareItems, setCompareItems] = useState<Listing[]>([]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      listing: INITIAL_LISTINGS[1],
      quantity: 1
    }
  ]);

  const handleAddToCart = (listing: Listing, rentalDays = 3, includeOperator = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.listing.id === listing.id);
      if (existing) {
        return prev.map((item) =>
          item.listing.id === listing.id
            ? { ...item, quantity: item.quantity + 1, rentalDays, includeOperator }
            : item
        );
      }
      return [...prev, { listing, quantity: 1, rentalDays, includeOperator }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.listing.id === id) {
            if (item.listing.type === "rent") {
              const newDays = Math.max(1, (item.rentalDays || 1) + delta);
              return { ...item, rentalDays: newDays };
            } else {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.listing.id !== id));
  };

  const handleCreateListing = (newListing: Listing) => {
    setListings([newListing, ...listings]);
  };

  const handleToggleCompare = (listing: Listing) => {
    setCompareItems((prev) => {
      const exists = prev.find((item) => item.id === listing.id);
      if (exists) {
        return prev.filter((item) => item.id !== listing.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 implements at a time.");
        return prev;
      }
      return [...prev, listing];
    });
  };

  // Filter listings logic
  const filteredListings = listings.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesType = activeType === "all" || item.type === activeType;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      (item.seedSubCategory && item.seedSubCategory.toLowerCase().includes(query));

    const matchesDistance = item.distanceMiles <= maxDistance;
    const matchesAi = !onlyAiRecommended || !!item.aiRecommendedFor;

    // Seed subcategory filter match
    const matchesSeedSub =
      !selectedSeedSubCategory ||
      (item.seedSubCategory &&
        item.seedSubCategory.toLowerCase().includes(selectedSeedSubCategory.toLowerCase())) ||
      item.title.toLowerCase().includes(selectedSeedSubCategory.toLowerCase());

    // Tractor HP Compatibility Filter Match
    let matchesTractorHp = true;
    if (userTractorHp && item.minHpRequired) {
      matchesTractorHp =
        userTractorHp >= item.minHpRequired &&
        (!item.maxHpRequired || userTractorHp <= item.maxHpRequired + 10);
    }

    return matchesCategory && matchesType && matchesSearch && matchesDistance && matchesAi && matchesSeedSub && matchesTractorHp;
  });

  const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <ShieldCheck className="h-3.5 w-3.5" /> AgriMind Multi-Agent Crop, Seed & Implement Platform
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Smart Agricultural Marketplace</h1>
          <p className="text-muted-foreground text-sm">
            AI Seed Advisor, Implement Matchmaker, Tractor HP compatibility filters, certified seeds & rentals.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {compareItems.length > 0 && (
            <Button
              onClick={() => {}}
              variant="outline"
              className="border-emerald-500/40 bg-emerald-500/10 text-emerald-400 rounded-xl h-11 px-4 flex items-center gap-2"
            >
              <Scale className="h-4 w-4" />
              <span>Compare ({compareItems.length})</span>
            </Button>
          )}

          <Button
            onClick={() => setIsCartOpen(true)}
            variant="outline"
            className="relative border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl h-11 px-4 flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4 text-emerald-400" />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <Badge className="bg-emerald-500 text-black font-bold text-xs h-5 px-1.5 rounded-full ml-1">
                {totalCartCount}
              </Badge>
            )}
          </Button>

          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 px-5 font-semibold shadow-lg shadow-emerald-950/40 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Create Listing
          </Button>
        </div>
      </div>

      {/* AI Multi-Agent Implement & Seed Assistant Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banner 1: AI Implement Assistant */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/40 flex flex-col justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">AI Implement Matchmaker</h4>
                <Badge className="bg-amber-400 text-black text-[10px] font-bold">New</Badge>
              </div>
              <p className="text-xs text-slate-300">
                Match implements & tractor HP for your farm size & soil condition.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsAiMatchmakerOpen(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Launch AI Implement Assistant</span>
          </Button>
        </div>

        {/* Banner 2: AI Seed Advisor */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 border border-teal-500/40 flex flex-col justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
              <Wheat className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">AI Seed Advisor ("Which Seed to Buy?")</h4>
                <Badge className="bg-emerald-400 text-black text-[10px] font-bold">Smart Crop</Badge>
              </div>
              <p className="text-xs text-slate-300">
                Ask AI which crop & seed variety to grow for your soil & water availability.
              </p>
            </div>
          </div>

          <Button
            onClick={() => setIsAiSeedAdvisorOpen(true)}
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-black font-bold text-xs h-10 rounded-xl shadow-lg shadow-teal-950/50 flex items-center justify-center gap-2"
          >
            <Bot className="h-4 w-4 fill-black" />
            <span>Ask AI Which Seed to Buy</span>
          </Button>
        </div>
      </div>

      {/* Seed Taxonomy Directory */}
      <SeedTaxonomy
        selectedSubCategory={selectedSeedSubCategory}
        onSelectSubCategory={(subCat) => {
          setSelectedSeedSubCategory(subCat);
          if (subCat) {
            setActiveCategory("supplies");
          }
        }}
        onOpenSeedAdvisor={() => setIsAiSeedAdvisorOpen(true)}
      />

      {/* Tractor HP Compatibility Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Gauge className="h-4 w-4" />
          </div>
          <div>
            <span className="text-white font-bold block">Tractor HP Compatibility Filter</span>
            <span className="text-slate-400 text-[11px]">Filter implements compatible with your tractor power capacity</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-slate-300 font-medium whitespace-nowrap">Tractor Power:</span>
          <select
            value={userTractorHp || "all"}
            onChange={(e) => setUserTractorHp(e.target.value === "all" ? null : Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 h-10 text-xs font-semibold text-emerald-400 outline-none cursor-pointer"
          >
            <option value="all">Show All Tractor HPs</option>
            <option value={30}>25 - 35 HP (Mini Tractors)</option>
            <option value={45}>35 - 50 HP (Utility Tractors)</option>
            <option value={60}>50 - 75 HP (Heavy Duty Tractors)</option>
          </select>

          {userTractorHp && (
            <Button
              onClick={() => setUserTractorHp(null)}
              variant="outline"
              className="text-[11px] h-10 border-white/10 text-slate-400 hover:text-white"
            >
              Clear HP Filter
            </Button>
          )}
        </div>
      </div>

      {/* Search & Distance Radius Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search Rotavator, Seed Drill, 45 HP Tractor, Groundnut, Red Chilli..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900/80 border-white/10 h-11 text-xs text-white rounded-xl focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 rounded-xl px-3 h-11">
          <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-xs text-slate-300 whitespace-nowrap">Radius:</span>
          <select
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="bg-transparent text-xs font-semibold text-white outline-none w-full cursor-pointer"
          >
            <option value={10} className="bg-slate-950">Within 10 miles</option>
            <option value={25} className="bg-slate-950">Within 25 miles</option>
            <option value={50} className="bg-slate-950">Within 50 miles</option>
            <option value={500} className="bg-slate-950">Any Distance</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 rounded-xl px-3 h-11">
          <SlidersHorizontal className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-xs text-slate-300 whitespace-nowrap">Option:</span>
          <select
            value={activeType}
            onChange={(e) => setActiveType(e.target.value as ListingType | "all")}
            className="bg-transparent text-xs font-semibold text-white outline-none w-full cursor-pointer"
          >
            <option value="all" className="bg-slate-950">All Options</option>
            <option value="buy" className="bg-slate-950">Sell / Direct Buy</option>
            <option value="rent" className="bg-slate-950">Rent / Sapling Lease</option>
            <option value="service" className="bg-slate-950">Agri Services</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-white/10">
        {[
          { id: "all", label: "All Marketplace Items", icon: Package },
          { id: "supplies", label: "Seeds & Plant Nursery", icon: Wheat },
          { id: "equipment", label: "Tractors & Implements", icon: Tractor },
          { id: "crops", label: "Harvested Crops (B2B)", icon: Package },
          { id: "services", label: "Drone & Agri Services", icon: Wrench },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as MarketplaceCategory | "all");
                if (cat.id !== "supplies") {
                  setSelectedSeedSubCategory(null);
                }
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/40"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Product Cards */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-slate-900/40 border border-white/10 space-y-3">
          <Package className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Items Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try resetting your seed filter, tractor HP slider, or distance radius.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
              setActiveType("all");
              setMaxDistance(500);
              setOnlyAiRecommended(false);
              setSelectedSeedSubCategory(null);
              setUserTractorHp(null);
            }}
            variant="outline"
            className="text-xs border-white/10"
          >
            Reset All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <ProductCard
              key={item.id}
              listing={item}
              userTractorHp={userTractorHp}
              onSelect={(listing) => setSelectedListing(listing)}
              onAddToCart={(listing) => handleAddToCart(listing)}
              onChatSeller={(listing) => setChatListing(listing)}
              onCompare={(listing) => handleToggleCompare(listing)}
            />
          ))}
        </div>
      )}

      {/* Modals & Drawers */}
      <AiImplementMatchmakerModal
        isOpen={isAiMatchmakerOpen}
        onClose={() => setIsAiMatchmakerOpen(false)}
        onSelectListing={(listing) => setSelectedListing(listing)}
        onCompareListing={(listing) => handleToggleCompare(listing)}
      />

      <AiSeedAdvisorModal
        isOpen={isAiSeedAdvisorOpen}
        onClose={() => setIsAiSeedAdvisorOpen(false)}
        onSelectListing={(listing) => setSelectedListing(listing)}
        onAddToCart={(listing) => handleAddToCart(listing)}
      />

      <ImplementCompareDrawer
        isOpen={compareItems.length > 0}
        onClose={() => setCompareItems([])}
        items={compareItems}
        onRemoveItem={(id) => setCompareItems((prev) => prev.filter((i) => i.id !== id))}
        onAddToCart={(listing) => handleAddToCart(listing)}
      />

      <ProductDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        onAddToCart={(listing, rentalDays, includeOperator) =>
          handleAddToCart(listing, rentalDays, includeOperator)
        }
        onChatSeller={(listing) => {
          setSelectedListing(null);
          setChatListing(listing);
        }}
      />

      <CreateListingModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateListing}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onSuccess={() => setCart([])}
      />

      <ChatSellerModal
        listing={chatListing}
        onClose={() => setChatListing(null)}
      />
    </div>
  );
}
