import React from 'react';

/**
 * NexoraLoader — Premium animated loader with 3 variants:
 * 
 * "page"   → Full-page orbital loader with glowing Nexora core (for page transitions)
 * "card"   → Skeleton card shimmer with floating particles (for grid loading)  
 * "inline" → Small DNA helix spinner (for buttons & inline)
 */

// ═══════════════════════════════════════════════════════
// 1. FULL PAGE LOADER — Orbital rings around glowing core
// ═══════════════════════════════════════════════════════
export const PageLoader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col justify-center items-center h-[55vh] select-none">
    <div className="nexora-orbital-loader">
      {/* Orbital rings */}
      <div className="orbital-ring ring-1"></div>
      <div className="orbital-ring ring-2"></div>
      <div className="orbital-ring ring-3"></div>
      
      {/* Core glow */}
      <div className="orbital-core">
        <span className="core-letter">N</span>
      </div>
      
      {/* Floating particles */}
      <div className="orbital-particle p1"></div>
      <div className="orbital-particle p2"></div>
      <div className="orbital-particle p3"></div>
      <div className="orbital-particle p4"></div>
      <div className="orbital-particle p5"></div>
      <div className="orbital-particle p6"></div>
    </div>
    <p className="mt-8 text-xs font-semibold text-slate-500 tracking-widest uppercase animate-loader-text">
      {message}
    </p>
  </div>
);

// ═══════════════════════════════════════════════════════
// 2. CARD SKELETON LOADER — Shimmer cards with wave effect
// ═══════════════════════════════════════════════════════
export const CardSkeletonLoader = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="nexora-skeleton-card glass rounded-3xl overflow-hidden"
        style={{ animationDelay: `${i * 150}ms` }}
      >
        {/* Image placeholder */}
        <div className="h-48 relative overflow-hidden bg-slate-950/60">
          <div className="skeleton-shimmer"></div>
          {/* Floating dots */}
          <div className="skeleton-dot dot-1"></div>
          <div className="skeleton-dot dot-2"></div>
          <div className="skeleton-dot dot-3"></div>
        </div>
        {/* Content placeholder */}
        <div className="p-4 space-y-3">
          <div className="skeleton-line w-3/4 h-3 rounded-full"></div>
          <div className="flex gap-2">
            <div className="skeleton-line w-16 h-2.5 rounded-full"></div>
            <div className="skeleton-line w-12 h-2.5 rounded-full"></div>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-slate-900/30">
            <div className="skeleton-line w-20 h-2 rounded-full"></div>
            <div className="flex gap-2">
              <div className="skeleton-line w-6 h-2 rounded-full"></div>
              <div className="skeleton-line w-6 h-2 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════
// 3. BUTTON / INLINE LOADER — DNA Helix spinner
// ═══════════════════════════════════════════════════════
export const InlineLoader = ({ size = 18, text = '' }) => (
  <span className="inline-flex items-center gap-2">
    <span className="nexora-helix-loader" style={{ width: size, height: size }}>
      <span className="helix-dot hd-1"></span>
      <span className="helix-dot hd-2"></span>
      <span className="helix-dot hd-3"></span>
    </span>
    {text && <span className="text-xs font-medium animate-loader-text">{text}</span>}
  </span>
);

// ═══════════════════════════════════════════════════════
// 4. SUBMIT BUTTON LOADER — Gradient pulse with dots
// ═══════════════════════════════════════════════════════
export const ButtonLoader = ({ text = 'Processing' }) => (
  <span className="inline-flex items-center gap-2 justify-center">
    <span className="nexora-btn-loader">
      <span className="btn-dot bd-1"></span>
      <span className="btn-dot bd-2"></span>
      <span className="btn-dot bd-3"></span>
    </span>
    <span>{text}</span>
  </span>
);

export default { PageLoader, CardSkeletonLoader, InlineLoader, ButtonLoader };
