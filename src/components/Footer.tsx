import React from 'react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { FloralDivider } from './IslamicOrnaments';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 bg-[#F5ECE8] border-t border-[#E8D3A2]/60 text-center">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Couple Names */}
        <h3 className="font-script text-4xl sm:text-5xl text-[#6B1D2F]">
          {WEDDING_CONFIG.couple.groom.firstName} & {WEDDING_CONFIG.couple.bride.firstName}
        </h3>

        {/* Traditional Prophetic Wedding Dua */}
        <div className="py-2">
          <p className="font-arabic text-xl sm:text-2xl text-[#6B1D2F] font-bold">
            {WEDDING_CONFIG.invitationText.dua.arabic}
          </p>
          <p className="text-xs sm:text-sm text-[#7A6B6B] font-serif-luxury italic mt-1.5 max-w-lg mx-auto">
            "{WEDDING_CONFIG.invitationText.dua.english}"
          </p>
        </div>

        <FloralDivider />

        <div className="text-xs text-[#8E2B43] flex items-center justify-center gap-1.5 font-medium">
          <span>Made with love for our special wedding celebration</span>
          <Heart className="w-3.5 h-3.5 fill-[#8E2B43]" />
        </div>

        <div className="text-[11px] text-[#A68846] tracking-wider uppercase font-cinzel">
          27 – 28 December 2026 · Pune
        </div>
      </div>
    </footer>
  );
};
