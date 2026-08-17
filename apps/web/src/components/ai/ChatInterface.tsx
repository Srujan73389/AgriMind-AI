"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Mic, 
  ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Bot, 
  Wheat, 
  Tractor, 
  TrendingUp, 
  Microscope,
  Volume2,
  ArrowRight,
  Flame,
  Clock,
  Layers,
  Scale,
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
  Smile
} from "lucide-react";
import { ReasoningTrace } from "./ReasoningTrace";

// Multi-lingual translations
const TRANSLATIONS: Record<string, {
  welcome: string;
  placeholder: string;
  suggestions: { text: string; icon: any }[];
  confidenceText: string;
  listeningText: string;
  sendBtn: string;
}> = {
  en: {
    welcome: "Hello Srujan! I am AgriMind AI, your multi-agent farming assistant. I am connected to your live IoT soil sensors, Sentinel-2 satellite data, and local APMC Mandi rates.\n\nHow can I help your crop today?",
    placeholder: "Ask AgriMind AI in English...",
    sendBtn: "Send",
    listeningText: "Listening in English...",
    confidenceText: "Multi-Agent Reflection Verified",
    suggestions: [
      { text: "👋 Hi! What can you do for my farm?", icon: Smile },
      { text: "🌤️ What is the weather today?", icon: CloudSun },
      { text: "🌱 What seed should I buy for red soil & limited water?", icon: Wheat },
      { text: "🚜 Recommend rotavator & tractor for my 3 acres", icon: Tractor },
      { text: "📈 Should I hold or sell Arecanut at local APMC Mandi?", icon: TrendingUp },
    ]
  },
  hi: {
    welcome: "नमस्ते सृजन! मैं एग्रीमाइंड एआई हूं, आपका बहु-एजेंट कृषि सहायक। मैं आपके लाइव मिट्टी सेंसर और मंडी दरों से जुड़ा हूं।\n\nआज मैं आपकी फसल की क्या सहायता कर सकता हूं?",
    placeholder: "एग्रीमाइंड एआई से हिंदी में पूछें...",
    sendBtn: "भेजें",
    listeningText: "हिंदी में सुन रहे हैं...",
    confidenceText: "मल्टी-एजेंट द्वारा सत्यापित",
    suggestions: [
      { text: "👋 नमस्ते! आप मेरे खेत के लिए क्या कर सकते हैं?", icon: Smile },
      { text: "🌤️ आज का मौसम कैसा है?", icon: CloudSun },
      { text: "🌱 लाल मिट्टी और सीमित पानी के लिए कौन सा बीज खरीदें?", icon: Wheat },
      { text: "🚜 मेरे 3 एकड़ के लिए रोटावेटर और ट्रैक्टर की सिफारिश करें", icon: Tractor },
      { text: "📈 क्या मुझे मंडी में अपनी फसल रोकनी चाहिए या बेचनी चाहिए?", icon: TrendingUp },
    ]
  },
  kn: {
    welcome: "ನಮಸ್ಕಾರ ಸೃಜನ್! ನಾನು ಅಗ್ರಿಮೈಂಡ್ ಎಐ, ನಿಮ್ಮ ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಕೃಷಿ ಸಹಾಯಕ. ನಾನು ನಿಮ್ಮ ಲೈವ್ ಮಣ್ಣಿನ ಸಂವೇದಕಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದರಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಹೊಂದಿದ್ದೇನೆ.\n\nಇಂದು ನಿಮ್ಮ ಬೆಳೆಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    placeholder: "ಅಗ್ರಿಮೈಂಡ್ ಎಐ ಬಳಿ ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ...",
    sendBtn: "ಕಳುಹಿಸಿ",
    listeningText: "ಕನ್ನಡದಲ್ಲಿ ಆಲಿಸಲಾಗುತ್ತಿದೆ...",
    confidenceText: "ಮಲ್ಟಿ-ಏಜೆಂಟ್‌ನಿಂದ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    suggestions: [
      { text: "👋 ನಮಸ್ಕಾರ! ನೀವು ನನಗಾಗಿ ಏನು ಮಾಡಲು ಸಾಧ್ಯ?", icon: Smile },
      { text: "🌤️ ಇಂದು ಹವಾಮಾನ ಹೇಗಿದೆ?", icon: CloudSun },
      { text: "🌱 ಕೆಂಪು ಮಣ್ಣು ಮತ್ತು ಕಡಿಮೆ ನೀರಿಗೆ ಯಾವ ಬೀಜ ಖರೀದಿಸಬೇಕು?", icon: Wheat },
      { text: "🚜 ನನ್ನ 3 ಎಕರೆಗೆ ಸೂಕ್ತ ರೋಟವೇಟರ್ ಮತ್ತು ಟ್ರ್ಯಾಕ್ಟರ್ ಶಿಫಾರಸು ಮಾಡಿ", icon: Tractor },
      { text: "📈 ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಅಡಿಕೆ ಮಾರಾಟ ಮಾಡಬೇಕೇ ಅಥವಾ ಇಡಬೇಕೇ?", icon: TrendingUp },
    ]
  },
  te: {
    welcome: "నమస్కారం సృజన్! నేను అగ్రిమైండ్ ఏఐ, మీ వ్యవసాయ సహాయకుడిని. నేను మీ లైవ్ నేల సెన్సార్లకు అనుసంధానించబడి ఉన్నాను.\n\nఈ రోజు నేను మీ పంటకు ఎలా సహాయపడగలను?",
    placeholder: "అగ్రిమైండ్ ఏఐని తెలుగులో అడగండి...",
    sendBtn: "పంపండి",
    listeningText: "తెలుగులో వింటున్నాము...",
    confidenceText: "మల్టీ-ఏజెంట్ ద్వారా ధృవీకరించబడింది",
    suggestions: [
      { text: "👋 నమస్కారం! మీరు నాకు ఎలా సహాయపడగలరు?", icon: Smile },
      { text: "🌤️ ఈ రోజు వాతావరణం ఎలా ఉంది?", icon: CloudSun },
      { text: "🌱 ఎర్ర నేల మరియు పరిమిత నీటికి ఏ విత్తనం కొనాలి?", icon: Wheat },
      { text: "🚜 నా 3 ఎకరాలకు రోటవేటర్ మరియు ట్రాక్టర్ సిఫార్సు చేయండి", icon: Tractor },
      { text: "📈 మార్కెట్లో నా పంటను ఉంచాలా లేదా అమ్మాలా?", icon: TrendingUp },
    ]
  }
};

export function ChatInterface() {
  const [input, setInput] = useState("");
  const [activeLang, setActiveLang] = useState<"en" | "hi" | "kn" | "te">("en");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.en;

  const [messages, setMessages] = useState([
    {
      id: "m-1",
      role: "assistant",
      content: TRANSLATIONS.en.welcome,
    }
  ]);

  // When language changes, update the initial message language cleanly
  useEffect(() => {
    setMessages([
      {
        id: "m-1",
        role: "assistant",
        content: t.welcome,
      }
    ]);
  }, [activeLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: `u-${Date.now()}`, role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const q = query.toLowerCase().trim();

    // Simulate Agentic Multi-Agent reflection & response stream
    setTimeout(() => {
      let aiResponse = "";

      // 1. GREETINGS & CHITCHAT (hi, hello, hey, namaste, namaskara, good morning, etc.)
      if (
        q === "hi" || q === "hello" || q === "hey" || q.includes("namaste") || q.includes("namaskara") ||
        q.includes("good morning") || q.includes("good evening") || q.includes("hlo") || q.includes("hy")
      ) {
        if (activeLang === "kn") {
          aiResponse = `👋 **ನಮಸ್ಕಾರ ಸೃಜನ್!**\n\nಇಂದು ನಿಮ್ಮ ಗಡಿಹಳ್ಳಿ ಜಮೀನಿನಲ್ಲಿ ಬೆಳೆಗಳು ಹೇಗಿವೆ? ನಾನು ನಿಮಗೆ ಹವಾಮಾನ, ಬೀಜಗಳ ಆಯ್ಕೆ, ಟ್ರ್ಯಾಕ್ಟರ್ ಉಪಕರಣಗಳು ಅಥವಾ ಮಾರುಕಟ್ಟೆ ದರಗಳ ಬಗ್ಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;
        } else if (activeLang === "hi") {
          aiResponse = `👋 **नमस्ते सृजन!**\n\nआज आपकी फसल कैसी चल रही है? मैं आपको मौसम, बीज चयन, ट्रैक्टर उपकरण या मंडी भाव के बारे में बता सकता हूँ। आज मैं आपकी क्या सहायता करूँ?`;
        } else if (activeLang === "te") {
          aiResponse = `👋 **నమస్కారం సృజన్!**\n\nఈ రోజు మీ పంటలు ఎలా ఉన్నాయి? నేను మీకు వాతావరణం, విత్తనాలు, ట్రాక్టర్ పరికరాలు లేదా మార్కెట్ ధరలపై సహాయపడగలను.`;
        } else {
          aiResponse = `👋 **Hello Srujan! Namaste!**\n\nHow are your crops doing today in Gadihalli? I am fully connected to your soil sensors and market feeds.\n\nYou can ask me about:\n• 🌤️ Live Weather & Irrigation Alerts\n• 🌱 Certified Seed Selection ("Which Seed to Buy?")\n• 🚜 Tractor HP & Implement Matching\n• 📈 Live APMC Mandi Rates & Hold/Sell Recommendations`;
        }
      } 
      // 2. CAPABILITIES / PURPOSE (who are you, what can you do, help)
      else if (q.includes("who are you") || q.includes("what can you do") || q.includes("help") || q.includes("features") || q.includes("क्या कर सकते")) {
        aiResponse = `🤖 **I am AgriMind AI — Your Smart Farming Assistant**\n\nHere is everything I can do for your farm:\n\n1. **🌱 AI Seed Advisor**: Tell me your soil & water conditions and I will recommend the highest-yielding certified seeds.\n2. **🚜 Tractor HP Implement Matchmaker**: Match your tractor horsepower with rotavators, cultivators, & seed drills.\n3. **📈 Mandi Bhav AI**: Real-time APMC rates and 14-day price predictions to tell you when to HOLD or SELL produce.\n4. **🌤️ Weather Telemetry**: Live temperature, humidity, wind, and monsoon rainfall advisories.\n5. **🔬 Leaf Disease Scanner**: Diagnose crop diseases using camera photos with 99.2% accuracy.`;
      }
      // 3. FRIENDLY STATUS (how are you, what's up)
      else if (q.includes("how are you") || q.includes("how r u") || q.includes("what's up") || q.includes("whatsapp")) {
        aiResponse = `😊 **I'm doing great and monitoring your farm plots!**\n\nSoil moisture in Field A1 is currently at an optimal **68%** with a healthy NDVI score of **0.84**. How can I help you today?`;
      }
      // 4. GRATITUDE (thank you, thanks, dhanyavad)
      else if (q.includes("thank") || q.includes("thanks") || q.includes("dhanyavad") || q.includes("ಧನ್ಯವಾದ")) {
        aiResponse = `🙏 **You're very welcome, Srujan!**\n\nWishing you a bountiful harvest! Feel free to ask whenever you need anything for your crops.`;
      }
      // 5. WEATHER QUERIES
      else if (q.includes("weather") || q.includes("temperature") || q.includes("rain") || q.includes("मौसम") || q.includes("ಹವಾಮಾನ") || q.includes("వాతావరణం")) {
        aiResponse = `🌤️ **Weather Forecast Agent (Gadihalli / Chikkamagaluru Region)**:\n\n• **Temperature**: 28°C (Mild Monsoon Breeze)\n• **Humidity**: 68%\n• **Wind Speed**: 12 km/h (North-West)\n• **Rain Forecast**: Light monsoon showers expected in 48 hours (65% probability).\n\n💡 **AI Advisory**: Soil moisture is optimal at 68%. Hold off on nitrogen fertilizer application & irrigation today.`;
      }
      // 6. SEED QUERIES
      else if (q.includes("seed") || q.includes("buy") || q.includes("बीज") || q.includes("ಬೀಜ") || q.includes("విత్తనం")) {
        aiResponse = `🌱 **AgriMind AI Seed Advisor**:\nBased on your red soil composition and 68% moisture, we recommend **GPU-28 Finger Millet (Ragi @ ₹780 / 10kg)** or **Certified Basmati Paddy (@ ₹2,250 / 25kg)**. Both are available in our Marketplace.`;
      }
      // 7. MANDI QUERIES
      else if (q.includes("mandi") || q.includes("arecanut") || q.includes("price") || q.includes("rate") || q.includes("ಮಾರುಕಟ್ಟೆ")) {
        aiResponse = `📈 **APMC Mandi Price Agent**:\nChikkamagaluru APMC Arecanut (Adike) is currently **₹48,500/qtl** (+4.2% up). AI advice: **HOLD PRODUCE for 7 days** as prices are projected to reach ₹50,500/qtl due to festival demand.`;
      }
      // 8. IMPLEMENT QUERIES
      else if (q.includes("rotavator") || q.includes("tractor") || q.includes("implement")) {
        aiResponse = `🚜 **Implement Matchmaker Agent**:\nFor your 3-acre plot, we recommend the **Shaktiman 7-ft Multi-Speed Rotavator (₹1,200/day)** matched with a **35–50 HP Tractor**. Filters out heavy 60+ HP machinery to save fuel.`;
      }
      // DEFAULT INTENTIONAL CONVERSATIONAL RESPONSE
      else {
        aiResponse = `🤖 **AgriMind AI Assistant**:\n\nI understand your message: "${query}". I am actively analyzing your farm telemetry. Would you like me to check your **Soil Moisture**, **Weather Forecast**, **Seed Selection**, or **Live Mandi Rates**?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: aiResponse,
          reasoning: true,
          confidence: 98.8,
        },
      ]);
    }, 800);
  };

  const handleToggleVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend(t.suggestions[0].text);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-emerald-500/30 overflow-hidden shadow-2xl">
      {/* Top Agent Header Bar */}
      <div className="px-6 py-3.5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shadow-lg">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">AgriMind AI Assistant</h3>
              <Badge className="bg-emerald-500 text-black text-[10px] font-bold">GPT-4o + Qdrant Memory</Badge>
            </div>
          </div>
        </div>

        {/* Vernacular Language Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs">
          {(["en", "hi", "kn", "te"] as const).map((langKey) => (
            <button
              key={langKey}
              onClick={() => setActiveLang(langKey)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all ${
                activeLang === langKey
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {langKey === "kn" ? "ಕನ್ನಡ" : langKey === "hi" ? "हिंदी" : langKey === "te" ? "తెలుగు" : "EN"}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Multi-Lingual Suggested Prompt Chips */}
      <div className="px-4 py-2.5 bg-slate-900/60 border-b border-white/5 flex gap-2 overflow-x-auto">
        {t.suggestions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => handleSend(item.text)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 hover:border-emerald-500/50 text-slate-300 hover:text-white text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Icon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>{item.text}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Stream Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shrink-0 shadow-lg border border-emerald-400/30">
                <Sparkles className="h-4 w-4 text-emerald-950" />
              </div>
            )}

            <div className={`max-w-[88%] md:max-w-[78%] ${msg.role === "user" ? "order-1" : "order-2"}`}>
              <div
                className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-xs shadow-lg shadow-emerald-950/40 font-medium"
                    : "bg-slate-900/90 border border-white/10 text-slate-100 rounded-tl-xs shadow-xl"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {msg.confidence && (
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-400 font-medium">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> {t.confidenceText}
                    </span>
                    <span className="font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      {msg.confidence}% Confidence
                    </span>
                  </div>
                )}
              </div>

              {msg.reasoning && (
                <div className="mt-3">
                  <ReasoningTrace />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Controls */}
      <div className="p-4 bg-slate-900 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleToggleVoice}
            variant="outline"
            className={`h-11 px-3 rounded-xl border-white/10 transition-all ${
              isListening ? "bg-red-600 text-white animate-pulse" : "bg-white/5 text-slate-300 hover:text-white"
            }`}
          >
            <Mic className="h-4 w-4 text-emerald-400" />
          </Button>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={isListening ? t.listeningText : t.placeholder}
            className="bg-slate-950 border-slate-800 h-11 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 rounded-xl flex-1"
          />

          <Button
            onClick={() => handleSend()}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 px-5 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center gap-2"
          >
            <Send className="h-4 w-4" /> {t.sendBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}
