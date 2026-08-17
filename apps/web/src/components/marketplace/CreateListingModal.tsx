"use client";

import { useState } from "react";
import { Listing, MarketplaceCategory, ListingType } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Sparkles, Image as ImageIcon, MapPin, Tag } from "lucide-react";

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newListing: Listing) => void;
}

export function CreateListingModal({
  isOpen,
  onClose,
  onCreate,
}: CreateListingModalProps) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: "",
    category: "equipment" as MarketplaceCategory,
    type: "rent" as ListingType,
    price: "",
    priceUnit: "/ day",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?q=80&w=800&auto=format&fit=crop",
    description: "",
    location: "Ludhiana, Punjab",
    sellerName: "My Local Kisan Farm",
    phone: "+91 98765 00000"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    const newListing: Listing = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      type: formData.type,
      price: parseFloat(formData.price),
      priceUnit: formData.priceUnit,
      imageUrl: formData.imageUrl,
      description: formData.description || "Freshly listed item on AgriMind AI Marketplace.",
      specs: {
        "Condition": "Inspected & Verified",
        "Availability": "Immediate Delivery",
        "Listed By": formData.sellerName
      },
      seller: {
        id: `seller-${Date.now()}`,
        name: formData.sellerName,
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        rating: 5.0,
        reviewsCount: 1,
        location: formData.location,
        distanceMiles: 5,
        isVerified: true,
        phone: formData.phone
      },
      location: formData.location,
      distanceMiles: 5,
      isVerifiedItem: true,
      rating: 5.0,
      reviewsCount: 1,
      createdDate: new Date().toISOString().split("T")[0]
    };

    onCreate(newListing);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-950 border border-white/10 rounded-3xl w-full max-w-xl p-6 relative shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-red-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Sparkles className="h-3.5 w-3.5" /> Publish New Listing
          </div>
          <h2 className="text-2xl font-bold text-white">Create Marketplace Listing</h2>
          <p className="text-slate-400 text-xs">Sell machinery, supplies, harvested crops, or drone services.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Listing Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as MarketplaceCategory })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="equipment">Machinery & Equipment</option>
                <option value="supplies">Seeds, Fertilizer & Chemicals</option>
                <option value="crops">Harvested Crops (B2B Sale)</option>
                <option value="services">Drone & Lab Services</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Listing Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ListingType })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="rent">For Rent</option>
                <option value="buy">For Sale</option>
                <option value="service">Service Rate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Title</label>
            <Input
              required
              placeholder="e.g. Mahindra Tractor or Pusa Basmati Paddy Harvest"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-slate-900 border-slate-800 h-10 text-xs text-white focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Price (₹)</label>
              <Input
                required
                type="number"
                placeholder="2500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-slate-900 border-slate-800 h-10 text-xs text-white focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Price Unit</label>
              <select
                value={formData.priceUnit}
                onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white outline-none focus:border-emerald-500"
              >
                <option value="/ day">/ day</option>
                <option value="/ quintal">/ quintal</option>
                <option value="/ acre">/ acre</option>
                <option value="/ bag">/ bag</option>
                <option value="flat">flat price</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Describe specifications, condition, and delivery details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Location / Town</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-slate-900 border-slate-800 h-10 text-xs text-white focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Seller Name / Farm</label>
              <Input
                value={formData.sellerName}
                onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                className="bg-slate-900 border-slate-800 h-10 text-xs text-white focus:border-emerald-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Publish Listing Now
          </Button>
        </form>
      </div>
    </div>
  );
}
