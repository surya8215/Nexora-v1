import React from 'react';

/**
 * SpiderMascot — Cute animated spider mascot for Nexora
 * Used across loaders, homepage, empty states, and page transitions
 */

// ─── INLINE SVG SPIDER ───────────────────────────────
const SpiderSVG = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Body */}
    <ellipse cx="32" cy="34" rx="12" ry="14" fill="url(#spiderBody)" />
    {/* Head */}
    <circle cx="32" cy="18" r="9" fill="url(#spiderHead)" />
    {/* Eyes */}
    <circle cx="28" cy="16" r="3.5" fill="#fff" />
    <circle cx="36" cy="16" r="3.5" fill="#fff" />
    <circle cx="29" cy="15.5" r="1.8" fill="#1e293b" />
    <circle cx="37" cy="15.5" r="1.8" fill="#1e293b" />
    {/* Eye shine */}
    <circle cx="30" cy="14.5" r="0.7" fill="#fff" />
    <circle cx="38" cy="14.5" r="0.7" fill="#fff" />
    {/* Smile */}
    <path d="M28 21 Q32 24 36 21" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    {/* Legs - Left side */}
    <path d="M20 28 Q14 22 8 18" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" className="spider-leg-l1" />
    <path d="M20 34 Q12 32 4 30" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" className="spider-leg-l2" />
    <path d="M20 38 Q12 42 6 46" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" className="spider-leg-l3" />
    <path d="M22 44 Q16 50 10 56" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" className="spider-leg-l4" />
    {/* Legs - Right side */}
    <path d="M44 28 Q50 22 56 18" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" className="spider-leg-r1" />
    <path d="M44 34 Q52 32 60 30" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" className="spider-leg-r2" />
    <path d="M44 38 Q52 42 58 46" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" className="spider-leg-r3" />
    <path d="M42 44 Q48 50 54 56" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" fill="none" className="spider-leg-r4" />
    {/* Nexora logo mark on body */}
    <text x="32" y="38" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="800" fontFamily="Outfit, sans-serif" opacity="0.6">N</text>
    {/* Gradients */}
    <defs>
      <radialGradient id="spiderBody" cx="0.5" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1e293b" />
      </radialGradient>
      <radialGradient id="spiderHead" cx="0.5" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#334155" />
      </radialGradient>
    </defs>
  </svg>
);

// ═══════════════════════════════════════════════════════
// 1. SPIDER HANGING LOADER — Spider descends on thread
// ═══════════════════════════════════════════════════════
export const SpiderHangingLoader = ({ message = 'Loading...', size = 56 }) => (
  <div className="flex flex-col items-center justify-center select-none">
    <div className="spider-hanging-container" style={{ height: size * 2.5 }}>
      {/* Thread */}
      <div className="spider-thread"></div>
      {/* Spider on thread */}
      <div className="spider-hanging-body">
        <SpiderSVG size={size} className="spider-swing" />
      </div>
    </div>
    <p className="mt-4 text-xs font-semibold text-slate-500 tracking-widest uppercase animate-loader-text">
      {message}
    </p>
  </div>
);

// ═══════════════════════════════════════════════════════
// 2. SPIDER CRAWLING — Spider walks across screen
// ═══════════════════════════════════════════════════════
export const SpiderCrawling = ({ direction = 'right', size = 40 }) => (
  <div className={`spider-crawl-container ${direction === 'left' ? 'spider-crawl-left' : 'spider-crawl-right'}`}>
    <SpiderSVG size={size} className="spider-wiggle" />
    {/* Web trail */}
    <div className="spider-web-trail"></div>
  </div>
);

// ═══════════════════════════════════════════════════════
// 3. SPIDER WEB SPINNER — Spider spins a circular web
// ═══════════════════════════════════════════════════════
export const SpiderWebSpinner = ({ size = 120, message = '' }) => (
  <div className="flex flex-col items-center justify-center select-none">
    <div className="spider-web-spinner" style={{ width: size, height: size }}>
      {/* Web rings */}
      <svg className="spider-web-svg" viewBox="0 0 120 120" width={size} height={size}>
        {/* Radial threads */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="60" y1="60"
            x2={60 + 55 * Math.cos(angle * Math.PI / 180)}
            y2={60 + 55 * Math.sin(angle * Math.PI / 180)}
            stroke="rgba(168,85,247,0.15)"
            strokeWidth="0.8"
          />
        ))}
        {/* Concentric web circles */}
        {[15, 28, 40, 52].map((r, i) => (
          <circle
            key={i}
            cx="60" cy="60" r={r}
            fill="none"
            stroke="rgba(168,85,247,0.1)"
            strokeWidth="0.6"
            className="spider-web-ring"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        {/* Building web animation circle */}
        <circle
          cx="60" cy="60" r="52"
          fill="none"
          stroke="url(#webGrad)"
          strokeWidth="1.5"
          strokeDasharray="12 8"
          className="spider-web-building"
        />
        <defs>
          <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Spider in center */}
      <div className="spider-web-center">
        <SpiderSVG size={size * 0.35} className="spider-breathe" />
      </div>
    </div>
    {message && (
      <p className="mt-6 text-xs font-semibold text-slate-500 tracking-widest uppercase animate-loader-text">
        {message}
      </p>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════
// 4. FULL-PAGE API OVERLAY LOADER — Transparent overlay 
// ═══════════════════════════════════════════════════════
export const SpiderOverlayLoader = ({ visible = false, message = 'Processing...' }) => {
  if (!visible) return null;
  return (
    <div className="spider-overlay-backdrop">
      <div className="spider-overlay-content">
        <SpiderWebSpinner size={140} />
        <p className="mt-6 text-sm font-bold text-slate-300 tracking-wide animate-loader-text">
          {message}
        </p>
        <div className="spider-overlay-dots">
          <span className="dot d1"></span>
          <span className="dot d2"></span>
          <span className="dot d3"></span>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// 5. HOMEPAGE SPIDER — Floating animated spider for landing
// ═══════════════════════════════════════════════════════
export const HomeSpider = () => (
  <div className="home-spider-container">
    {/* Spider 1: hanging from top-right */}
    <div className="home-spider home-spider-1">
      <div className="home-spider-thread"></div>
      <SpiderSVG size={32} className="spider-swing-slow" />
    </div>
    {/* Spider 2: crawling bottom-left */}
    <div className="home-spider home-spider-2">
      <SpiderSVG size={28} className="spider-crawl-anim" />
    </div>
    {/* Spider 3: sitting on web, top-left */}
    <div className="home-spider home-spider-3">
      <SpiderSVG size={24} className="spider-breathe" />
    </div>
    {/* Decorative web strands */}
    <svg className="home-web-deco" viewBox="0 0 200 200" width="200" height="200">
      <path d="M0 0 Q100 50 200 0" stroke="rgba(168,85,247,0.08)" strokeWidth="0.8" fill="none" />
      <path d="M0 0 Q50 100 0 200" stroke="rgba(168,85,247,0.06)" strokeWidth="0.8" fill="none" />
      <path d="M200 0 Q150 100 200 200" stroke="rgba(236,72,153,0.05)" strokeWidth="0.8" fill="none" />
    </svg>
  </div>
);

// Export spider SVG for reuse
export { SpiderSVG };
export default { SpiderHangingLoader, SpiderCrawling, SpiderWebSpinner, SpiderOverlayLoader, HomeSpider };
