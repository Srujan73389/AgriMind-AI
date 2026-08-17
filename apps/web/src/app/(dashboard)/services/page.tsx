"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  TestTube,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  ArrowRight,
  Plus,
  X,
  Droplets,
  Award,
  Search
} from "lucide-react";

interface AgriService {
  id: string;
  title: string;
  category: "Drone Spraying" | "Soil Sample Lab Pickup" | "Harvest Crew" | "Borewell Testing";
  price: number;
  priceUnit: string;
  provider: string;
  rating: number;
  reviewsCount: number;
  location: string;
  turnaroundTime: string;
  description: string;
  features: string[];
}

const SERVICES: AgriService[] = [
  {
    id: "srv-1",
    title: "10-Liter Payload Agri-Drone Precision Spraying Service",
    category: "Drone Spraying",
    price: 450,
    priceUnit: "/ acre",
    provider: "Malnad Agri-Drone Squadron",
    rating: 4.9,
    reviewsCount: 128,
    location: "Ajjampura & Chikkamagaluru",
    turnaroundTime: "15 mins / acre",
    description: "Certified DGCA pilot with 10L multi-rotor drone for ultra-fine liquid pesticide and micronutrient spray. 10x faster than manual spraying with zero crop trampling.",
    features: [
      "DGCA Certified Drone Pilot & Assistant",
      "GPS Automated Waypoint Flight Navigation",
      "99% Uniform Droplet Canopy Coverage",
      "Saves up to 30% chemical mixture volume"
    ]
  },
  {
    id: "srv-2",
    title: "Door-Step Soil Sample Pickup & Full Lab N-P-K Audit",
    category: "Soil Sample Lab Pickup",
    price: 350,
    priceUnit: "/ sample",
    provider: "District Soil Testing Laboratory",
    rating: 4.8,
    reviewsCount: 210,
    location: "Gadihalli & Chikkamagaluru Dist",
    turnaroundTime: "24-Hour Results",
    description: "Lab agent visits your farm plot to collect 4-core depth soil samples. Generates official N-P-K, pH, Micronutrient, and Organic Carbon certificate PDF.",
    features: [
      "Door-step sample pickup from farm plot",
      "16-parameter lab nutrient chemical audit",
      "Official Government Soil Health Card PDF",
      "Custom fertilizer dosage advisory"
    ]
  },
  {
    id: "srv-3",
    title: "Combine Harvester & Skilled Paddy/Ragi Crew Rental",
    category: "Harvest Crew",
    price: 2400,
    priceUnit: "/ hour",
    provider: "Karnataka Harvester Fleet Co-Op",
    rating: 4.9,
    reviewsCount: 85,
    location: "Shivamogga & Tarikere",
    turnaroundTime: "Same Day Dispatch",
    description: "Heavy-duty rubber track combine harvester with skilled operator crew for lodging-free paddy & ragi harvesting.",
    features: [
      "Track harvester for wet paddy fields",
      "Includes fuel & experienced operator",
      "Grain cleaning & bagging attachment",
      "Zero grain loss guarantee"
    ]
  }
];

export default function ServicesPage() {
  const [services, setServices] = useState<AgriService[]>(SERVICES);
  const [selectedService, setSelectedService] = useState<AgriService | null>(null);
  const [acresToBook, setAcresToBook] = useState(2.5);
  const [bookingDate, setBookingDate] = useState("2026-08-10");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <Zap className="h-3.5 w-3.5" /> Certified Agri-Drone Pilots & Lab Soil Testing Services
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Agri-Services & Drone Spraying</h1>
          <p className="text-muted-foreground text-sm">
            Book certified Agri-Drone pilots for 15-minute liquid spraying and door-step lab soil sample collection.
          </p>
        </div>

        {bookingSuccess && (
          <Badge className="bg-emerald-500 text-black font-bold text-xs px-3.5 py-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Service Booking Confirmed!
          </Badge>
        )}
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="glass p-6 flex flex-col justify-between space-y-4 border-white/10 hover:border-emerald-500/50 transition-all duration-300 shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] font-bold">
                  {service.category}
                </Badge>

                <div className="text-xs font-mono font-bold text-emerald-400">
                  ★ {service.rating} ({service.reviewsCount} reviews)
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white text-lg group-hover:text-emerald-400 transition-colors leading-snug">
                  {service.title}
                </h3>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" /> {service.provider} • {service.location}
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px]">Service Rate</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ₹{service.price}{" "}
                    <span className="text-xs text-slate-400 font-normal">{service.priceUnit}</span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-300 font-mono">
                  <div className="text-slate-400 text-[10px]">Turnaround Time</div>
                  <div className="font-bold text-amber-400">{service.turnaroundTime}</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-white/5 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <div className="space-y-1.5 pt-1">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setSelectedService(service)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-11 rounded-xl flex items-center justify-center gap-2 mt-2 shadow-md"
            >
              <span>1-Click Schedule Service Booking</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <Badge className="bg-emerald-500 text-black font-bold text-xs">Direct Service Booking</Badge>
              <h3 className="text-xl font-bold text-white">{selectedService.title}</h3>
              <p className="text-xs text-slate-400">{selectedService.provider}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Number of Acres / Samples</label>
                <Input
                  type="number"
                  value={acresToBook}
                  onChange={(e) => setAcresToBook(Math.max(1, Number(e.target.value)))}
                  className="bg-slate-900 border-slate-800 text-white font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Preferred Booking Date</label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white font-mono"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-[10px]">Total Booking Cost</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ₹{(selectedService.price * acresToBook).toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-300">
                  <div>Location: <strong>Gadihalli Plot A1</strong></div>
                  <div className="text-emerald-400 font-bold">Pilot Arrives at 8:00 AM</div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setBookingSuccess(true);
                setSelectedService(null);
                setTimeout(() => setBookingSuccess(false), 4000);
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40"
            >
              Confirm Service Booking & Dispatch Crew
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
