"use client";

import { useState } from "react";
import { Listing } from "./types";
import { Button } from "@/components/ui/button";
import { X, Send, UserCheck, Phone, CheckCheck } from "lucide-react";

interface ChatSellerModalProps {
  listing: Listing | null;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "seller";
  text: string;
  time: string;
}

export function ChatSellerModal({
  listing,
  onClose,
}: ChatSellerModalProps) {
  if (!listing) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "seller",
      text: `Hello! Thanks for your interest in "${listing.title}". How can I help you today?`,
      time: "Just now"
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulated automated seller response
    setTimeout(() => {
      const sellerMsg: ChatMessage = {
        id: `s-${Date.now()}`,
        sender: "seller",
        text: `Thanks for your inquiry! Yes, this listing is currently available for dispatch. Feel free to proceed with the booking or call me directly at ${listing.seller.phone}.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, sellerMsg]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-white/10 rounded-3xl w-full max-w-lg h-[550px] flex flex-col justify-between relative shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={listing.seller.avatarUrl}
              alt={listing.seller.name}
              className="w-10 h-10 rounded-full object-cover border border-emerald-500/50"
            />
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-1">
                {listing.seller.name}
                {listing.seller.isVerified && <UserCheck className="h-3.5 w-3.5 text-emerald-400" />}
              </h3>
              <p className="text-[11px] text-emerald-400">Online • Reaches back in &lt; 5 mins</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a href={`tel:${listing.seller.phone}`} className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white">
              <Phone className="h-4 w-4" />
            </a>
            <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Item context strip */}
        <div className="bg-emerald-950/40 px-4 py-2 border-b border-emerald-500/20 flex items-center justify-between text-xs">
          <span className="text-slate-300 truncate font-medium">{listing.title}</span>
          <span className="text-emerald-400 font-bold font-mono">₹{listing.price.toLocaleString("en-IN")} {listing.priceUnit}</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 px-1">
                  {msg.time} {isUser && <CheckCheck className="h-3 w-3 text-emerald-400" />}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-slate-900/50 flex gap-2">
          <input
            type="text"
            placeholder="Type your message or custom offer..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
          />
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white h-10 px-4 rounded-xl">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
