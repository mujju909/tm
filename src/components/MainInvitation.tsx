import React from 'react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { FloralDivider } from './IslamicOrnaments';

export const MainInvitation: React.FC = () => {
  return (
    <section id="invitation-main" className="py-14 md:py-20 px-4 max-w-4xl mx-auto text-center">
      {/* Decorative Gold Arch Frame Container */}
      <div className="relative bg-[#FFFDF9] border border-[#E8D3A2] rounded-3xl p-6 sm:p-12 md:p-14 shadow-xl">
        {/* Double inner gold hairline frame */}
        <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-[#C5A059]/40 pointer-events-none" />

        {/* 1. Islamic Invocation */}
        <div className="mb-6">
          <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#6B1D2F] font-bold tracking-wide">
            {WEDDING_CONFIG.quranicVerses.bismillah.arabic}
          </p>
          <p className="text-xs sm:text-sm text-[#7A6B6B] font-serif-luxury italic mt-1.5">
            "{WEDDING_CONFIG.quranicVerses.bismillah.english}"
          </p>
        </div>

        {/* Quran 78:8 Header Quote */}
        <div className="inline-block py-1.5 px-4 bg-[#FAF7F2] rounded-full border border-[#E8D3A2]/60 mb-6">
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#8E2B43] font-semibold">
            {WEDDING_CONFIG.quranicVerses.verse1.translation}
          </p>
          <p className="text-[10px] text-[#C5A059] font-medium">
            — {WEDDING_CONFIG.quranicVerses.verse1.reference} —
          </p>
        </div>

        {/* Warm invitation message */}
        <div className="space-y-1 mb-8 max-w-lg mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8E2B43] font-semibold">
            {WEDDING_CONFIG.invitationText.preTitle}
          </p>
          <p className="text-xs sm:text-sm text-[#4A3E3E] font-serif-luxury tracking-wide">
            {WEDDING_CONFIG.invitationText.title}
          </p>
          <p className="text-xs text-[#7A6B6B] font-serif-luxury">
            {WEDDING_CONFIG.invitationText.subtitle}
          </p>
        </div>

        {/* 2. The Couple - Visual Centerpiece */}
        <div className="my-8 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-center">
            {/* Groom Card */}
            <div className="p-5 bg-[#FAF7F2]/70 rounded-2xl border border-[#E8D3A2]/50 shadow-2xs">
              <span className="text-[11px] uppercase tracking-widest text-[#8E2B43] font-bold">
                Groom
              </span>
              <h2 className="font-script text-5xl sm:text-6xl text-[#6B1D2F] my-2">
                {WEDDING_CONFIG.couple.groom.firstName}
              </h2>
              <p className="text-xs sm:text-sm font-serif-luxury font-medium text-[#4A3E3E]">
                {WEDDING_CONFIG.couple.groom.lineage}
              </p>
            </div>

            {/* Bride Card */}
            <div className="p-5 bg-[#FAF7F2]/70 rounded-2xl border border-[#E8D3A2]/50 shadow-2xs">
              <span className="text-[11px] uppercase tracking-widest text-[#8E2B43] font-bold">
                Bride
              </span>
              <h2 className="font-script text-5xl sm:text-6xl text-[#6B1D2F] my-2">
                {WEDDING_CONFIG.couple.bride.firstName}
              </h2>
              <p className="text-xs sm:text-sm font-serif-luxury font-medium text-[#4A3E3E]">
                {WEDDING_CONFIG.couple.bride.lineage}
              </p>
            </div>
          </div>

          <FloralDivider className="my-7" />

          {/* Subheading */}
          <div className="text-base sm:text-lg font-cinzel font-bold text-[#6B1D2F] tracking-widest uppercase">
            Nikah & Walima Celebration
          </div>
          <p className="text-xs sm:text-sm text-[#7A6B6B] mt-1 font-serif-luxury">
            Together with the Khan and Mulla families
          </p>
        </div>

        {/* Family blessing quote */}
        <p className="mt-6 text-xs sm:text-sm text-[#5C4D4D] font-serif-luxury italic max-w-md mx-auto">
          "{WEDDING_CONFIG.invitationText.closingBlessing}"
        </p>
      </div>
    </section>
  );
};
