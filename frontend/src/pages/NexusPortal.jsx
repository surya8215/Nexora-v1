import React, { useState } from 'react';
import { Sparkles, Film, Tv, Gamepad2, MapPin, Utensils, Heart, Users, RefreshCw, Cpu, Layers } from 'lucide-react';
import { 
  useFeedQuery, 
  useActiveFriendsQuery, 
  useListingsQuery 
} from '../api/queries';

// Import local image assets (we copied these to frontend/src/assets)
import cyberCityImg from '../assets/cyber_future_city.png';
import skyRealmImg from '../assets/sky_realm.png';
import bladeMasterImg from '../assets/blade_master.png';
import quantumValkyrieImg from '../assets/quantum_valkyrie.png';
import cyberNinjaImg from '../assets/cyber_ninja.png';
import techMageImg from '../assets/tech_mage.png';
import spiderTechImg from '../assets/spider_tech_robot.png';

const NexusPortal = () => {
  const [bgType, setBgType] = useState('cyber'); // 'cyber' or 'sky'

  // Fetch real-time platform statistics using TanStack Query
  const { data: feed = [] } = useFeedQuery();
  const { data: friends = [] } = useActiveFriendsQuery();
  const { data: movies = [] } = useListingsQuery('movies', {});
  const { data: series = [] } = useListingsQuery('webseries', {});
  const { data: games = [] } = useListingsQuery('games', {});

  // Selected loader index for interactive showcase
  const [selectedLoader, setSelectedLoader] = useState(0);

  // 10 Premium Animated Custom Loaders
  const loaders = [
    {
      name: 'Mini Anime Hero',
      desc: 'Running anime hero silhouette with trailing speed lines.',
      render: () => (
        <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden">
          <div className="nexus-hero-runner"></div>
          <div className="runner-floor"></div>
        </div>
      )
    },
    {
      name: 'Mini Cyber Ninja',
      desc: 'Stealth cyber ninja sprinting with neon blade trails.',
      render: () => (
        <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden">
          <div className="nexus-ninja-sprint"></div>
          <div className="ninja-blade-trail"></div>
        </div>
      )
    },
    {
      name: 'Energy Orb Spinner',
      desc: 'Glowing plasma vortex orbiting around a core.',
      render: () => (
        <div className="relative w-12 h-12">
          <div className="energy-orb-core"></div>
          <div className="energy-ring ring-fast"></div>
          <div className="energy-ring ring-slow"></div>
          <div className="energy-particle ep-1"></div>
          <div className="energy-particle ep-2"></div>
        </div>
      )
    },
    {
      name: 'Futuristic Circular Loader',
      desc: 'Rotating high-tech HUD rings with segment progress.',
      render: () => (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="hud-ring hud-outer"></div>
          <div className="hud-ring hud-inner"></div>
          <div className="hud-dot"></div>
        </div>
      )
    },
    {
      name: 'Floating AI Drone',
      desc: 'Futuristic scan drone hovering with neon particle sweeps.',
      render: () => (
        <div className="relative w-16 h-16 flex flex-col items-center justify-center">
          <svg className="w-10 h-10 animate-float text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="1.5" className="fill-cyan-400 animate-pulse"/>
          </svg>
          <div className="drone-scan-laser"></div>
        </div>
      )
    },
    {
      name: 'Friendly Spider Tech',
      desc: 'Cute robotic helper spider walking on thread.',
      render: () => (
        <div className="relative w-16 h-16 flex flex-col items-center justify-center">
          <div className="spider-tech-body">
            <div className="spider-tech-eye"></div>
            <div className="spider-tech-leg sl-1"></div>
            <div className="spider-tech-leg sl-2"></div>
            <div className="spider-tech-leg sl-3"></div>
            <div className="spider-tech-leg sl-4"></div>
          </div>
          <div className="spider-tech-thread"></div>
        </div>
      )
    },
    {
      name: 'Mini Battle Angel',
      desc: 'Angelic wings flapping with floating particles.',
      render: () => (
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="battle-angel-core"></div>
          <div className="angel-wing wing-left"></div>
          <div className="angel-wing wing-right"></div>
        </div>
      )
    },
    {
      name: 'Tiny Mecha Robot',
      desc: 'Pulsing dual-legged mech walker walking cycle.',
      render: () => (
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="mecha-torso">
            <div className="mecha-visor"></div>
            <div className="mecha-leg ml-left"></div>
            <div className="mecha-leg ml-right"></div>
          </div>
        </div>
      )
    },
    {
      name: 'Quantum Energy Cube',
      desc: '3D wireframe rotating quantum cell spinner.',
      render: () => (
        <div className="relative w-12 h-12 flex items-center justify-center perspective-500">
          <div className="quantum-cube">
            <div className="cube-face face-front"></div>
            <div className="cube-face face-back"></div>
            <div className="cube-face face-left"></div>
            <div className="cube-face face-right"></div>
            <div className="cube-face face-top"></div>
            <div className="cube-face face-bottom"></div>
          </div>
        </div>
      )
    },
    {
      name: 'Holographic AI Mascot',
      desc: 'Pulsing cyber mascot head with facial scanner mesh.',
      render: () => (
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="holo-mascot-face">
            <div className="holo-eye"></div>
            <div className="holo-scanner"></div>
          </div>
          <div className="holo-glitch-ring"></div>
        </div>
      )
    }
  ];

  return (
    <div className="relative min-h-[85vh] rounded-3xl overflow-hidden border border-slate-900 shadow-2xl flex flex-col justify-between">
      
      {/* ═══════════════════════════════════════════════════════
         STYLESHEET ENCAPSULATION FOR PREMIUM COMPOSITE ANIMATIONS
         ═══════════════════════════════════════════════════════ */}
      <style>{`
        /* Dynamic Portal Backgrounds */
        .portal-bg-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: background-image 1s ease-in-out, transform 8s ease-out;
          z-index: 0;
        }

        .portal-overlay-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(3, 7, 18, 0.4) 0%, rgba(3, 7, 18, 0.8) 100%);
          z-index: 1;
        }

        /* Characters Animation Setup */
        .portal-characters-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .animated-character {
          position: absolute;
          bottom: 5%;
          height: 48%;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(168, 85, 247, 0.35));
          animation: character-idle 4s ease-in-out infinite alternate;
          transition: left 25s linear, right 25s linear;
        }

        /* Continuous Left to Right Characters */
        .char-ltr-1 {
          animation: character-idle 3.5s ease-in-out infinite alternate, walk-ltr-1 45s linear infinite;
        }
        .char-ltr-2 {
          animation: character-idle 4.2s ease-in-out infinite alternate, walk-ltr-2 55s linear infinite;
          bottom: 12%;
          height: 40%;
        }

        /* Continuous Right to Left Characters */
        .char-rtl-1 {
          animation: character-idle 3.8s ease-in-out infinite alternate, walk-rtl-1 48s linear infinite;
        }
        .char-rtl-2 {
          animation: character-idle 4.5s ease-in-out infinite alternate, walk-rtl-2 52s linear infinite;
          bottom: 8%;
          height: 44%;
        }

        @keyframes character-idle {
          0% {
            transform: translateY(0px) rotate(0deg);
            filter: drop-shadow(0 10px 20px rgba(168, 85, 247, 0.35)) brightness(1);
          }
          50% {
            filter: drop-shadow(0 15px 30px rgba(6, 182, 212, 0.5)) brightness(1.1);
          }
          100% {
            transform: translateY(-12px) rotate(1.5deg);
            filter: drop-shadow(0 10px 20px rgba(236, 72, 153, 0.35)) brightness(1);
          }
        }

        @keyframes walk-ltr-1 {
          0% { left: -25%; }
          100% { left: 125%; }
        }
        @keyframes walk-ltr-2 {
          0% { left: -30%; }
          100% { left: 130%; }
        }
        @keyframes walk-rtl-1 {
          0% { right: -25%; transform: scaleX(-1); }
          100% { right: 125%; transform: scaleX(-1); }
        }
        @keyframes walk-rtl-2 {
          0% { right: -30%; transform: scaleX(-1); }
          100% { right: 130%; transform: scaleX(-1); }
        }

        /* Loaders Animations styling */
        .nexus-hero-runner {
          width: 24px;
          height: 36px;
          background-color: #06b6d4;
          clip-path: polygon(40% 0%, 75% 15%, 55% 45%, 85% 55%, 65% 100%, 35% 65%, 45% 50%, 15% 40%);
          animation: runner-dash 0.6s steps(4) infinite;
          filter: drop-shadow(0 0 8px #06b6d4);
        }
        .runner-floor {
          position: absolute;
          bottom: 12px;
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
          animation: floor-slide 0.3s linear infinite;
        }

        @keyframes runner-dash {
          0% { transform: skewX(-15deg) translateY(0); }
          50% { transform: skewX(-15deg) translateY(-4px) scaleY(0.9); }
          100% { transform: skewX(-15deg) translateY(0); }
        }
        @keyframes floor-slide {
          0% { transform: translateX(-10px); }
          100% { transform: translateX(10px); }
        }

        /* Cyber Ninja */
        .nexus-ninja-sprint {
          width: 32px;
          height: 24px;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          clip-path: polygon(10% 20%, 90% 10%, 100% 40%, 80% 90%, 20% 90%, 0% 50%);
          animation: ninja-warp 0.4s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 10px #ec4899);
        }
        .ninja-blade-trail {
          position: absolute;
          right: 2px;
          width: 20px;
          height: 3px;
          background: #ec4899;
          filter: blur(1px);
          animation: trail-warp 0.2s linear infinite;
        }

        @keyframes ninja-warp {
          0% { transform: scaleX(1.3) skewX(-20deg); }
          100% { transform: scaleX(1) skewX(-25deg) translateY(-2px); }
        }
        @keyframes trail-warp {
          0% { opacity: 0.3; width: 10px; }
          100% { opacity: 0.9; width: 30px; }
        }

        /* Energy Spinner */
        .energy-orb-core {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 14px;
          height: 14px;
          background: #06b6d4;
          border-radius: 50%;
          box-shadow: 0 0 16px 4px #06b6d4;
          animation: pulse-core 1.2s infinite ease-in-out;
        }
        .energy-ring {
          position: absolute;
          inset: -6px;
          border: 2px solid transparent;
          border-top-color: #a855f7;
          border-bottom-color: #ec4899;
          border-radius: 50%;
        }
        .ring-fast { animation: spin 0.8s linear infinite; }
        .ring-slow { animation: spin 1.8s linear reverse infinite; inset: -12px; }

        .energy-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background: #ec4899;
          border-radius: 50%;
          filter: drop-shadow(0 0 4px #ec4899);
        }
        .ep-1 { animation: orbit-p1 1.5s linear infinite; }
        .ep-2 { animation: orbit-p2 1.5s linear infinite; }

        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes orbit-p1 {
          0% { transform: rotate(0deg) translateX(24px) scale(0.6); }
          100% { transform: rotate(360deg) translateX(24px) scale(1); }
        }
        @keyframes orbit-p2 {
          0% { transform: rotate(180deg) translateX(20px) scale(1); }
          100% { transform: rotate(540deg) translateX(20px) scale(0.6); }
        }

        /* Circular Loader */
        .hud-ring {
          position: absolute;
          border: 2px solid transparent;
          border-radius: 50%;
        }
        .hud-outer {
          inset: 0;
          border-top-color: #06b6d4;
          border-right-color: rgba(6, 182, 212, 0.2);
          animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        .hud-inner {
          inset: 6px;
          border-bottom-color: #a855f7;
          border-left-color: rgba(168, 85, 247, 0.2);
          animation: spin 0.8s linear reverse infinite;
        }
        .hud-dot {
          width: 4px;
          height: 4px;
          background: #ec4899;
          border-radius: 50%;
          box-shadow: 0 0 6px #ec4899;
          animation: pulse-core 0.5s infinite alternate;
        }

        /* Scan Laser */
        .drone-scan-laser {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
          box-shadow: 0 0 6px #06b6d4;
          animation: laser-sweep 2s ease-in-out infinite;
          margin-top: 6px;
        }
        @keyframes laser-sweep {
          0%, 100% { transform: scaleX(0.2); opacity: 0.2; }
          50% { transform: scaleX(1); opacity: 1; }
        }

        /* Spider Tech Loader */
        .spider-tech-body {
          width: 20px;
          height: 16px;
          background: #1e293b;
          border: 1.5px solid #06b6d4;
          border-radius: 50% 50% 40% 40%;
          position: relative;
          animation: bounce-spider 0.6s infinite alternate;
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
        }
        .spider-tech-eye {
          position: absolute;
          top: 3px;
          left: 4px;
          width: 4px;
          height: 4px;
          background: #06b6d4;
          border-radius: 50%;
          box-shadow: 0 0 4px #06b6d4;
          animation: blink-eye 2s infinite;
        }
        .spider-tech-leg {
          position: absolute;
          width: 10px;
          height: 1px;
          background: #06b6d4;
        }
        .sl-1 { left: -8px; top: 6px; transform: rotate(-30deg); animation: crawl-l 0.3s infinite alternate; }
        .sl-2 { left: -8px; top: 10px; transform: rotate(10deg); animation: crawl-l 0.3s infinite alternate-reverse; }
        .sl-3 { right: -8px; top: 6px; transform: rotate(30deg); animation: crawl-r 0.3s infinite alternate-reverse; }
        .sl-4 { right: -8px; top: 10px; transform: rotate(-10deg); animation: crawl-r 0.3s infinite alternate; }
        .spider-tech-thread {
          width: 1px;
          height: 24px;
          background: rgba(6, 182, 212, 0.4);
          position: absolute;
          top: -12px;
        }

        @keyframes bounce-spider {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
        @keyframes blink-eye {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0); }
        }
        @keyframes crawl-l {
          0% { transform: rotate(-30deg); }
          100% { transform: rotate(-15deg) translateY(-2px); }
        }
        @keyframes crawl-r {
          0% { transform: rotate(30deg); }
          100% { transform: rotate(15deg) translateY(-2px); }
        }

        /* Angel Wing */
        .battle-angel-core {
          width: 12px;
          height: 12px;
          background: #a855f7;
          border-radius: 50%;
          box-shadow: 0 0 10px #a855f7;
          z-index: 2;
        }
        .angel-wing {
          position: absolute;
          width: 22px;
          height: 8px;
          background: rgba(168, 85, 247, 0.6);
          border-radius: 200px 0 0 200px;
          top: 28px;
          transform-origin: right center;
        }
        .wing-left { left: 8px; transform: rotate(-25deg); animation: flap-left 0.6s infinite alternate; }
        .wing-right { right: 8px; transform: rotate(25deg) scaleX(-1); transform-origin: left center; animation: flap-right 0.6s infinite alternate; }

        @keyframes flap-left {
          0% { transform: rotate(-30deg); }
          100% { transform: rotate(15deg); }
        }
        @keyframes flap-right {
          0% { transform: rotate(30deg) scaleX(-1); }
          100% { transform: rotate(-15deg) scaleX(-1); }
        }

        /* Mecha Walker */
        .mecha-torso {
          width: 18px;
          height: 16px;
          background: #334155;
          border: 1px solid #94a3b8;
          border-radius: 4px;
          position: relative;
        }
        .mecha-visor {
          width: 12px;
          height: 3px;
          background: #ef4444;
          box-shadow: 0 0 4px #ef4444;
          margin: 3px auto 0;
        }
        .mecha-leg {
          position: absolute;
          width: 4px;
          height: 12px;
          background: #475569;
          bottom: -10px;
          transform-origin: top center;
        }
        .ml-left { left: 2px; animation: march-l 0.8s infinite linear; }
        .ml-right { right: 2px; animation: march-r 0.8s infinite linear; }

        @keyframes march-l {
          0%, 100% { transform: rotate(-20deg) translateY(0); }
          50% { transform: rotate(20deg) translateY(-2px); }
        }
        @keyframes march-r {
          0%, 100% { transform: rotate(20deg) translateY(-2px); }
          50% { transform: rotate(-20deg) translateY(0); }
        }

        /* Quantum Cube */
        .quantum-cube {
          width: 20px;
          height: 20px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate-cube 3s infinite linear;
        }
        .cube-face {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 1.5px solid #06b6d4;
          background: rgba(6, 182, 212, 0.05);
        }
        .face-front  { transform: translateZ(10px); }
        .face-back   { transform: rotateY(180deg) translateZ(10px); }
        .face-left   { transform: rotateY(-90deg) translateZ(10px); }
        .face-right  { transform: rotateY(90deg) translateZ(10px); }
        .face-top    { transform: rotateX(90deg) translateZ(10px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(10px); }

        @keyframes rotate-cube {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        /* Holographic Mascot */
        .holo-mascot-face {
          width: 24px;
          height: 28px;
          border: 2px solid #a855f7;
          border-radius: 40% 40% 50% 50%;
          position: relative;
          animation: glitch-face 2.5s infinite;
          background: rgba(168, 85, 247, 0.05);
        }
        .holo-eye {
          width: 14px;
          height: 2px;
          background: #a855f7;
          box-shadow: 0 0 6px #a855f7;
          position: absolute;
          top: 10px;
          left: 3px;
        }
        .holo-scanner {
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          height: 1px;
          background: #ec4899;
          box-shadow: 0 0 4px #ec4899;
          animation: sweep-y 1s infinite alternate ease-in-out;
        }
        .holo-glitch-ring {
          position: absolute;
          width: 36px;
          height: 36px;
          border: 1px dashed rgba(168, 85, 247, 0.4);
          border-radius: 50%;
          animation: spin 8s linear infinite;
        }

        @keyframes glitch-face {
          0%, 94%, 96%, 100% { transform: translate(0) scale(1); filter: hue-rotate(0deg); }
          95% { transform: translate(-2px, 1px) scale(0.95); filter: hue-rotate(90deg) brightness(1.2); }
          97% { transform: translate(3px, -1px) scale(1.05); }
        }
        @keyframes sweep-y {
          0% { bottom: 20px; }
          100% { bottom: 2px; }
        }

        /* Generic Helpers */
        .perspective-500 { perspective: 500px; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .animate-float { animation: float-anim 3s ease-in-out infinite alternate; }
        @keyframes float-anim { 0% { transform: translateY(-3px); } 100% { transform: translateY(3px); } }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
         A. PARALLAX BACKDROP SCENE LAYER
         ═══════════════════════════════════════════════════════ */}
      <div 
        className="portal-bg-layer"
        style={{
          backgroundImage: `url(${bgType === 'cyber' ? cyberCityImg : skyRealmImg})`,
          transform: `scale(1.05) translate(${(bgType === 'cyber' ? 1 : -1) * 3}px, 0)`
        }}
      />
      <div className="portal-overlay-shimmer" />

      {/* ═══════════════════════════════════════════════════════
         B. TRANSPARENT PORTABLE ANIMATED CHARACTERS
         ═══════════════════════════════════════════════════════ */}
      <div className="portal-characters-container">
        {/* LTR Character 01: Neo Blade Master */}
        <img 
          src={bladeMasterImg} 
          alt="Neo Blade Master" 
          className="animated-character char-ltr-1"
          style={{ width: '22%' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* LTR Character 02: Arcane Tech Mage */}
        <img 
          src={techMageImg} 
          alt="Arcane Tech Mage" 
          className="animated-character char-ltr-2"
          style={{ width: '18%' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* RTL Character 03: Quantum Valkyrie */}
        <img 
          src={quantumValkyrieImg} 
          alt="Quantum Valkyrie" 
          className="animated-character char-rtl-1"
          style={{ width: '20%' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* RTL Character 04: Shadow Cyber Ninja */}
        <img 
          src={cyberNinjaImg} 
          alt="Shadow Cyber Ninja" 
          className="animated-character char-rtl-2"
          style={{ width: '19%' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
         C. INTERACTIVE CONSOLE HEADER
         ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-sm border-b border-white/5">
        <div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/25 tracking-widest uppercase mb-1.5 inline-block">
            SaaS Asset Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            <Cpu className="h-6 w-6 text-purple-400 animate-pulse" />
            Nexus Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-medium max-w-lg mt-0.5">
            Futuristic WebGL compatible layout. Powered by TanStack Query for instant client-state reactivity.
          </p>
        </div>

        {/* Backdrop Switcher */}
        <div className="flex bg-slate-950/80 p-1 rounded-2xl border border-slate-800 self-stretch md:self-auto justify-around">
          <button 
            onClick={() => setBgType('cyber')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              bgType === 'cyber' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" /> Cyber City
          </button>
          <button 
            onClick={() => setBgType('sky')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              bgType === 'sky' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" /> Sky Realm
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
         D. INTERACTIVE WIDGETS PANEL (MIDDLE SECTION)
         ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        
        {/* Card 1: Feed Moments count */}
        <div className="glass-nav rounded-2xl p-4 border border-white/5 backdrop-blur-md flex items-center gap-4 group hover:border-cyan-500/30 transition-all duration-300">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform duration-300">
            <Heart className="h-5 w-5 fill-cyan-400/25" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Social Feed</span>
            <span className="text-lg font-bold text-slate-200 block">{feed.length} Moments</span>
          </div>
        </div>

        {/* Card 2: Friends Count */}
        <div className="glass-nav rounded-2xl p-4 border border-white/5 backdrop-blur-md flex items-center gap-4 group hover:border-purple-500/30 transition-all duration-300">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform duration-300">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Network Connections</span>
            <span className="text-lg font-bold text-slate-200 block">{friends.length} Active Friends</span>
          </div>
        </div>

        {/* Card 3: Movies Count */}
        <div className="glass-nav rounded-2xl p-4 border border-white/5 backdrop-blur-md flex items-center gap-4 group hover:border-pink-500/30 transition-all duration-300">
          <div className="h-10 w-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-300 group-hover:scale-105 transition-transform duration-300">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Movie Uploads</span>
            <span className="text-lg font-bold text-slate-200 block">{movies.length} Recommendations</span>
          </div>
        </div>

        {/* Card 4: Interactive Mascot */}
        <div className="glass-nav rounded-2xl p-4 border border-white/5 backdrop-blur-md flex items-center gap-4 group hover:border-yellow-500/30 transition-all duration-300">
          <div className="h-10 w-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-300 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <img src={spiderTechImg} alt="Spider Mascot" className="w-8 h-8 object-contain animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Interactive Mascot</span>
            <span className="text-xs font-semibold text-yellow-400 block flex items-center gap-1">
              Active & Guarded <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
            </span>
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════
         E. 10-LOADER PACK SHOWCASE WIDGET
         ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 px-6 pb-6 pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 mt-auto">
        
        {/* Left column: Loader details card (5 cols) */}
        <div className="md:col-span-5 glass-nav p-5 rounded-3xl border border-white/5 backdrop-blur-md flex flex-col justify-between min-h-56">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold tracking-wider uppercase">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Anime Loader Pack
            </div>
            
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-200">
                {loaders[selectedLoader].name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {loaders[selectedLoader].desc}
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap pt-4">
            {loaders.map((loader, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedLoader(idx)}
                className={`px-3 py-1 rounded-full text-[10px] font-semibold border transition cursor-pointer ${
                  selectedLoader === idx 
                    ? 'bg-cyan-500/15 border-cyan-500/35 text-cyan-300'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300'
                }`}
              >
                Loader 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Animated canvas displaying the selected loader (7 cols) */}
        <div className="md:col-span-7 glass-nav p-5 rounded-3xl border border-white/5 backdrop-blur-md flex items-center justify-center min-h-56 relative overflow-hidden group">
          {/* Subtle grid backdrop for mecha portal feel */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            {/* Render selected loader component */}
            <div className="h-24 w-24 rounded-full bg-slate-950/70 border border-slate-800 flex items-center justify-center shadow-inner group-hover:border-purple-500/30 transition-colors duration-500">
              {loaders[selectedLoader].render()}
            </div>
            
            <div>
              <span className="text-[9px] text-slate-500 tracking-widest uppercase block font-bold">
                Rendering Asset Frame
              </span>
              <span className="text-[10px] text-purple-400 font-bold block mt-0.5">
                60 FPS Hardware Accelerated
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default NexusPortal;
