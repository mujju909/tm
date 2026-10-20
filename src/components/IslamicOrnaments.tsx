import React from 'react';

/**
 * Islamic Arch SVG with hanging brass lanterns
 */
export const IslamicArchHero: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      <svg
        viewBox="0 0 500 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        <defs>
          <linearGradient id="goldArchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C5A059" />
            <stop offset="50%" stopColor="#E8D3A2" />
            <stop offset="100%" stopColor="#9A7B38" />
          </linearGradient>
          <linearGradient id="lanternGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E8B4B8" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Outer Islamic Trefoil Arch */}
        <path
          d="M 50 230 L 50 120 C 50 80, 150 20, 250 15 C 350 20, 450 80, 450 120 L 450 230"
          stroke="url(#goldArchGrad)"
          strokeWidth="3.5"
          fill="none"
        />

        {/* Inner Intricate Scalloped Arch */}
        <path
          d="M 70 230 L 70 130 C 70 95, 120 70, 160 65 C 200 60, 230 40, 250 25 C 270 40, 300 60, 340 65 C 380 70, 430 95, 430 130 L 430 230"
          stroke="url(#goldArchGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          fill="none"
        />

        {/* Hanging Lantern Left */}
        <line x1="120" y1="40" x2="120" y2="100" stroke="#C5A059" strokeWidth="1.5" />
        <g transform="translate(110, 100)">
          {/* Lantern Cap */}
          <path d="M 5 0 L 15 0 L 18 8 L 2 8 Z" fill="#9A7B38" />
          {/* Lantern Body */}
          <path d="M 2 8 L 18 8 L 15 28 L 5 28 Z" fill="url(#lanternGlowGrad)" stroke="#C5A059" strokeWidth="1.2" />
          {/* Lantern Bottom & Tassel */}
          <path d="M 5 28 L 15 28 L 10 34 Z" fill="#9A7B38" />
          <circle cx="10" cy="36" r="1.5" fill="#C5A059" />
        </g>

        {/* Hanging Lantern Right */}
        <line x1="380" y1="40" x2="380" y2="100" stroke="#C5A059" strokeWidth="1.5" />
        <g transform="translate(370, 100)">
          <path d="M 5 0 L 15 0 L 18 8 L 2 8 Z" fill="#9A7B38" />
          <path d="M 2 8 L 18 8 L 15 28 L 5 28 Z" fill="url(#lanternGlowGrad)" stroke="#C5A059" strokeWidth="1.2" />
          <path d="M 5 28 L 15 28 L 10 34 Z" fill="#9A7B38" />
          <circle cx="10" cy="36" r="1.5" fill="#C5A059" />
        </g>

        {/* Center Crest Finial */}
        <circle cx="250" cy="15" r="4" fill="#C5A059" />
        <path d="M 250 5 L 250 15" stroke="#C5A059" strokeWidth="2" />
        <path d="M 245 10 Q 250 7 255 10" stroke="#C5A059" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
};

/**
 * Mosque Silhouette Crest for Ceremony Cards
 */
export const MosqueEmblem: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#2E5A36',
}) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-11"
      >
        {/* Central Dome */}
        <path
          d="M 50 12 C 40 12 36 28 36 44 L 64 44 C 64 28 60 12 50 12 Z"
          fill={color}
        />
        {/* Dome Finial & Crescent */}
        <line x1="50" y1="5" x2="50" y2="12" stroke="#C5A059" strokeWidth="1.5" />
        <circle cx="50" cy="5" r="1.5" fill="#C5A059" />

        {/* Left Minaret */}
        <path d="M 20 22 L 24 22 L 25 44 L 19 44 Z" fill={color} />
        <path d="M 19 22 L 22 15 L 25 22 Z" fill="#C5A059" />
        <rect x="21" y="28" width="2" height="4" fill="#E8D3A2" />

        {/* Right Minaret */}
        <path d="M 76 22 L 80 22 L 81 44 L 75 44 Z" fill={color} />
        <path d="M 75 22 L 78 15 L 81 22 Z" fill="#C5A059" />
        <rect x="77" y="28" width="2" height="4" fill="#E8D3A2" />

        {/* Arched Windows on Dome */}
        <path d="M 45 44 L 45 34 C 45 30 55 30 55 34 L 55 44 Z" fill="#E8D3A2" />

        {/* Foundation Base Line */}
        <line x1="12" y1="46" x2="88" y2="46" stroke="#C5A059" strokeWidth="2" />
      </svg>
    </div>
  );
};

/**
 * Luxury Gold Arabesque Divider
 */
export const FloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059] flex-1 max-w-[120px]" />
      <div className="text-[#C5A059] flex items-center gap-1.5 text-xs select-none">
        <span>❖</span>
        <span className="text-sm">❦</span>
        <span>❖</span>
      </div>
      <div className="h-px bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059] flex-1 max-w-[120px]" />
    </div>
  );
};

/**
 * Corner Floral Ornament (Maroon & Blush Rose motif)
 */
export const CornerFloralDecor: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const getRotation = () => {
    switch (position) {
      case 'top-left':
        return '';
      case 'top-right':
        return 'scale-x-[-1]';
      case 'bottom-left':
        return 'scale-y-[-1]';
      case 'bottom-right':
        return 'scale-[-1]';
    }
  };

  return (
    <div className={`absolute pointer-events-none select-none z-10 ${getRotation()} ${className}`}>
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24 sm:w-32 sm:h-32 opacity-85"
      >
        {/* Soft Eucalyptus leaves in sage & gold */}
        <path
          d="M 20 20 Q 70 30 110 90 Q 70 70 20 20 Z"
          fill="#4A5844"
          opacity="0.35"
        />
        <path
          d="M 20 20 Q 30 70 90 110 Q 70 70 20 20 Z"
          fill="#5D6D55"
          opacity="0.3"
        />

        {/* Gold filigree swirls */}
        <path
          d="M 15 15 Q 60 10 85 50 Q 110 90 140 95"
          stroke="#C5A059"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 15 15 Q 10 60 50 85 Q 90 110 95 140"
          stroke="#C5A059"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Rich Maroon Rose Bud */}
        <circle cx="50" cy="45" r="14" fill="#6B1D2F" />
        <path
          d="M 44 40 C 48 35 56 35 60 42 C 58 50 48 52 44 46"
          stroke="#E8B4B8"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Blush Pink Peony Bloom */}
        <circle cx="85" cy="40" r="12" fill="#E8B4B8" opacity="0.85" />
        <circle cx="40" cy="85" r="12" fill="#E8B4B8" opacity="0.85" />

        {/* Golden seed pearls */}
        <circle cx="95" cy="65" r="2.5" fill="#E8D3A2" />
        <circle cx="65" cy="95" r="2.5" fill="#E8D3A2" />
      </svg>
    </div>
  );
};
