"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Heart,
  Share2,
  Award,
  Sparkles,
  Image as ImageIcon,
  Send,
  Plus,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Bot,
  ThumbsUp,
  Mic,
  Bookmark,
  Users,
  Search
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  isAi?: boolean;
  text: string;
  time: string;
}

interface Post {
  id: string;
  author: string;
  role: string;
  badge: string;
  location: string;
  avatar: string;
  time: string;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  tags: string[];
}

const INITIAL_POSTS: Post[] = [
  {
    id: "p-1",
    author: "Dr. K. M. Shivakumar",
    role: "Senior Agronomist, KVK Chikkamagaluru",
    badge: "KVK Scientist",
    location: "Chikkamagaluru, KA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    time: "1 hour ago",
    title: "Preventing Leaf Blast in GPU-28 Ragi & Paddy during Monsoon Showers",
    content: "With light monsoon rain forecasted across Ajjampura & Tarikere, relative humidity is rising to 70%+. Spray Copper Oxychloride 50 WP (3g/L) or Bio-Fungicide Trichoderma Viride before heavy rain starts. Avoid applying excess nitrogen fertilizer this week.",
    imageUrl: "/images/leaf_blast.jpg",
    likes: 42,
    isLiked: false,
    tags: ["#RagiFarming", "#PaddyBlast", "#MonsoonAlert"],
    comments: [
      {
        id: "c-1",
        author: "AgriMind AI Assistant",
        avatar: "bot",
        isAi: true,
        text: "🤖 AI Verification: Dr. Shivakumar's advice is 99.4% verified against Sentinel-2 humidity telemetry. Holding nitrogen top-dressing today will save ₹850/acre in leaching losses.",
        time: "55 mins ago"
      },
      {
        id: "c-2",
        author: "Srujan M",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        text: "Thank you doctor! Sprayed Trichoderma Viride in my Gadihalli Plot A1 yesterday.",
        time: "30 mins ago"
      }
    ]
  },
  {
    id: "p-2",
    author: "Manjunath Gowda",
    role: "Arecanut Grower & Master Farmer",
    badge: "Master Farmer",
    location: "Ajjampura, KA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    time: "3 hours ago",
    title: "Chikkamagaluru Mandi Arecanut (Adike) Price Hit ₹48,500/qtl!",
    content: "Good news for growers! Arecanut prices rose +₹1,200/qtl at Chikkamagaluru APMC today. Traders from Shivamogga are active. What are fellow farmers planning — holding or selling now?",
    imageUrl: "/images/commercial_oil_seeds.jpg",
    likes: 68,
    isLiked: true,
    tags: ["#ArecanutPrice", "#ChikkamagaluruMandi", "#AdikeMarket"],
    comments: [
      {
        id: "c-3",
        author: "AgriMind Mandi AI Agent",
        avatar: "bot",
        isAi: true,
        text: "📈 Mandi AI Prediction: Hold for 7 days. Cold storage hold profit calculator projects prices to reach ₹50,500/qtl due to Gutkha mill inventory buildup.",
        time: "2 hours ago"
      }
    ]
  },
  {
    id: "p-3",
    author: "Ramesh Naik",
    role: "Progressive Organic Farmer",
    badge: "Organic Certified",
    location: "Shivamogga, KA",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    time: "5 hours ago",
    title: "Results from using Humic Acid 98% Flakes + Vermicompost in Sugarcane",
    content: "Applied 2kg/acre Humic Acid shiny flakes along with organic Neem Cake meal. White root density increased by almost 40% in 15 days! Leaves are deep emerald green.",
    likes: 31,
    isLiked: false,
    tags: ["#OrganicFarming", "#SugarcaneCare", "#HumicAcid"],
    comments: []
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTag, setNewPostTag] = useState("#RagiFarming");
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            isLiked: !p.isLiked
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text || !text.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: "SRUJAN M (Gadihalli)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      text: text,
      time: "Just now"
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, comments: [...p.comments, newComment] };
        }
        return p;
      })
    );

    setCommentInput({ ...commentInput, [postId]: "" });
  };

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostContent) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: "SRUJAN M",
      role: "Progressive Paddy & Ragi Farmer",
      badge: "Gadihalli Farmer",
      location: "Gadihalli, Ajjampura Tq, KA",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      time: "Just now",
      title: newPostTitle,
      content: newPostContent,
      likes: 1,
      isLiked: true,
      tags: [newPostTag],
      comments: [
        {
          id: `c-ai-${Date.now()}`,
          author: "AgriMind AI Assistant",
          avatar: "bot",
          isAi: true,
          text: `🤖 AgriMind AI Response: Thank you for sharing, Srujan! Your post on "${newPostTitle}" has been analyzed across Gadihalli soil telemetry.`,
          time: "Just now"
        }
      ]
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setIsComposerOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 mb-2">
            <Users className="h-3.5 w-3.5" /> Karnataka Kisan Farmer Community & AI Knowledge Exchange
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Farmer Community & Krishi Network</h1>
          <p className="text-muted-foreground text-sm">
            Share crop tips, ask KVK scientists questions, discuss APMC Mandi rates, and get instant AI verified answers.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            onClick={() => setIsComposerOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-11 px-5 font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Share Post / Ask Question
          </Button>
        </div>
      </div>

      {/* Main Grid: Social Feed & Sidebar Trending Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Posts Feed */}
        <div className="lg:col-span-2 space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="glass p-6 space-y-4 border-white/10 hover:border-emerald-500/40 transition-all shadow-xl">
              {/* Author Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 border border-emerald-500/40 ring-2 ring-emerald-500/20">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback className="bg-emerald-600 text-white font-bold text-xs">
                      {post.author[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm">{post.author}</h3>
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px] font-bold flex items-center gap-1">
                        <Award className="h-3 w-3" /> {post.badge}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {post.role} • <span className="text-emerald-400">{post.location}</span> • {post.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="space-y-2">
                <h2 className="text-base font-bold text-white leading-snug">{post.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

                {/* Optional Image */}
                {post.imageUrl && (
                  <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 mt-3">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Like / Comment / Share Bar */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      post.isLiked ? "text-rose-400" : "hover:text-rose-400"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${post.isLiked ? "fill-rose-400" : ""}`} />
                    <span>{post.likes} Likes</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-sky-400" />
                    <span>{post.comments.length} Comments</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const shareText = `Check out "${post.title}" on AgriMind AI Farmer Community!`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
                  }}
                  className="flex items-center gap-1.5 text-emerald-400 hover:underline font-bold text-xs"
                >
                  <Share2 className="h-4 w-4" /> Share on WhatsApp
                </button>
              </div>

              {/* Comments Thread */}
              <div className="space-y-3 pt-2 border-t border-white/5">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-3 rounded-2xl text-xs space-y-1 ${
                      comment.isAi
                        ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-200"
                        : "bg-slate-950 border border-white/5 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center gap-1.5">
                        {comment.isAi ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[10px] font-bold">
                            🤖
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                            👨‍🌾
                          </div>
                        )}
                        <span className={comment.isAi ? "text-emerald-400" : "text-white"}>{comment.author}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{comment.time}</span>
                    </div>

                    <p className="text-[11px] leading-relaxed pl-6">{comment.text}</p>
                  </div>
                ))}

                {/* Comment Input */}
                <div className="flex items-center gap-2 pt-1">
                  <Input
                    placeholder="Write a comment or reply..."
                    value={commentInput[post.id] || ""}
                    onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                    className="bg-slate-950 border-slate-800 h-9 text-xs text-white rounded-xl placeholder:text-slate-500"
                  />
                  <Button
                    onClick={() => handleAddComment(post.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-9 px-3 rounded-xl text-xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Right Column: Trending Topics & Top Krishi Experts */}
        <div className="space-y-6">
          <Card className="glass p-5 space-y-4 border-white/10">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
              <TrendingUp className="h-4 w-4 text-emerald-400" /> Trending Topics in Karnataka
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { tag: "#ChikkamagaluruArecanut", posts: "1.4k posts", trend: "+12% today" },
                { tag: "#RagiFarming2026", posts: "980 posts", trend: "+8% today" },
                { tag: "#AjjampuraMonsoonAlert", posts: "750 posts", trend: "High Activity" },
                { tag: "#TrichodermaFungicide", posts: "540 posts", trend: "Verified Solution" }
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{item.tag}</div>
                    <div className="text-[10px] text-slate-400">{item.posts}</div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.trend}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass p-5 space-y-4 border-white/10">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-3">
              <Award className="h-4 w-4 text-amber-400" /> Top Verified KVK Agronomists
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { name: "Dr. K. M. Shivakumar", role: "Senior Pathologist, KVK", location: "Chikkamagaluru" },
                { name: "Prof. S. R. Patil", role: "Soil Scientist, UAS Dharwad", location: "Shivamogga" }
              ].map((expert, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-white/5">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                    👨‍🔬
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{expert.name}</div>
                    <div className="text-[10px] text-slate-400">{expert.role} • {expert.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Composer Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-emerald-400" /> Share Post to Kisan Community
              </h3>
              <button onClick={() => setIsComposerOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Post Title / Question</label>
                <Input
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="e.g. How to control stem borer in Ragi?"
                  className="bg-slate-900 border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Topic Tag</label>
                <select
                  value={newPostTag}
                  onChange={(e) => setNewPostTag(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 h-10 text-xs text-white"
                >
                  <option value="#RagiFarming">#RagiFarming</option>
                  <option value="#PaddyCare">#PaddyCare</option>
                  <option value="#ArecanutPrice">#ArecanutPrice</option>
                  <option value="#OrganicFarming">#OrganicFarming</option>
                  <option value="#TractorSharing">#TractorSharing</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Details / Explanation</label>
                <textarea
                  rows={4}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Describe your crop condition, soil type, or question for KVK scientists..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <Button
              onClick={handleCreatePost}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-emerald-950/40"
            >
              Publish Post & Get AI Verification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
