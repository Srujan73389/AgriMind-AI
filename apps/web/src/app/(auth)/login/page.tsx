"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("agrimind_user", JSON.stringify({ email }));
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 relative z-10">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
          <Leaf className="text-white h-7 w-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
        <p className="text-slate-400">Enter your credentials to access your dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <Input 
              required
              type="email" 
              placeholder="farmer@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</Link>
            </div>
            <Input 
              required
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-900/80 border-slate-800 focus:border-blue-500 h-12 text-white"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-600/25"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        <Button 
          type="button"
          onClick={() => {
            setLoading(true);
            router.push("/dashboard");
          }}
          variant="outline" 
          className="w-full h-12 bg-slate-900/80 border-slate-800 hover:bg-slate-800 text-white font-medium rounded-xl"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
