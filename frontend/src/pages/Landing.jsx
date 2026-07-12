import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, Search, Film, Tv, Gamepad2, MapPin, Utensils } from 'lucide-react';
import BubbleBackground from '../components/BubbleBackground';
import { HomeSpider } from '../components/SpiderMascot';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <Users className="h-6 w-6 text-purple-400" />, title: "Private Social Feed", desc: "Share moments, photos and status updates visible only to mutually accepted friends." },
    { icon: <Film className="h-6 w-6 text-blue-400" />, title: "Movie Recommendations", desc: "Discover and contribute movie specifications, cast, and OTT availability." },
    { icon: <Tv className="h-6 w-6 text-pink-400" />, title: "Web Series Catalog", desc: "Browse community Web Series listings, season details, and streaming platforms." },
    { icon: <Gamepad2 className="h-6 w-6 text-green-400" />, title: "Gaming Hub", desc: "Curate lists of favorite console, PC, and mobile games." },
    { icon: <MapPin className="h-6 w-6 text-yellow-400" />, title: "Places & Travel", desc: "Explore local spots and tourist destinations filtered by price and distance." },
    { icon: <Utensils className="h-6 w-6 text-rose-400" />, title: "Restaurants & Dining", desc: "Find food recommendations, price tiers, and menus uploaded by foodies." }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between text-slate-100 z-10 px-4 md:px-8">
      <BubbleBackground />
      <HomeSpider />
      
      {/* Landing Pill Header */}
      <header className="w-full max-w-6xl mt-6 px-6 py-4 glass-nav rounded-full flex justify-between items-center z-10 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Nexora
          </span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/login?tab=signin')}
            className="px-4 py-2 text-sm font-medium hover:text-purple-400 transition"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/login?tab=signup')}
            className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 transition-all transform hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-6xl flex-grow flex flex-col items-center justify-center py-16 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
          Introducing Nexora 2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Share <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">Moments</span>.<br className="md:hidden" /> Discover <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">Worlds</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Blend a private, friend-gated social feed with an open, community-curated directory of movies, web series, games, places, and restaurants.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button 
            onClick={() => navigate('/login?tab=signup')}
            className="px-8 py-4 font-semibold rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all transform hover:scale-105 active:scale-95"
          >
            Create Your Account
          </button>
          <button 
            onClick={() => navigate('/login?tab=signin')}
            className="px-8 py-4 font-semibold rounded-full border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-900/90 transition-all transform hover:scale-105 active:scale-95"
          >
            Access Discovery Hub
          </button>
        </div>

        {/* Feature Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {features.map((feat, index) => (
            <div key={index} className="glass p-6 rounded-2xl hover:bg-slate-900/40 hover:-translate-y-1 hover:border-slate-700 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-slate-950 flex items-center justify-center mb-4 border border-slate-800">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-100">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl py-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
        <span>© 2026 Nexora Inc. Share Moments. Discover Worlds.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-300 transition">Terms</a>
          <a href="#" className="hover:text-slate-300 transition">Privacy</a>
          <a href="#" className="hover:text-slate-300 transition">Security</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
