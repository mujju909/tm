import React, { useState } from 'react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { Flower2, MailOpen, Volume2, Sparkles, Heart } from 'lucide-react';
import { CornerFloralDecor, IslamicArchHero } from './IslamicOrnaments';

interface LandingPageProps {
  onOpenInvitation: () => void;
  onTogglePetals: () => void;
  isPetalsActive: boolean;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenInvitation,
  onTogglePetals,
  isPetalsActive,
  onToggleMusic,
  isMusicPlaying,
}) => {
  const [envelopeOpening, setEnvelopeOpening] = useState(false);

  const handleOpen = () => {
    setEnvelopeOpening(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 600);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F5ECE8]">
      {/* Corner Floral Ornaments */}
      <CornerFloralDecor position="top-left" className="top-2 left-2 sm:top-6 sm:left-6" />
      <CornerFloralDecor position="top-right" className="top-2 right-2 sm:top-6 sm:right-6" />
      <CornerFloralDecor position="bottom-left" className="bottom-2 left-2 sm:bottom-6 sm:left-6" />
      <CornerFloralDecor position="bottom-right" className="bottom-2 right-2 sm:bottom-6 sm:right-6" />

      {/* Decorative Gold Arch Header */}
      <IslamicArchHero className="max-w-sm sm:max-w-md opacity-90 mb-2" />

      {/* Main Luxury Invitation Card Envelope Mockup */}
      <div
        className={`relative w-full max-w-md bg-[#FFFDFB] border-2 border-[#E8D3A2] rounded-3xl p-6 sm:p-9 shadow-2xl transition-all duration-700 text-center ${
          envelopeOpening ? 'scale-95 opacity-90 translate-y-4' : 'hover:shadow-3xl'
        }`}
      >
        {/* Gold Border Filigree inner box */}
        <div className="absolute inset-2.5 rounded-2xl border border-[#C5A059]/40 pointer-events-none" />

        {/* Bismillah Calligraphy */}
        <div className="mb-3">
          <p className="font-arabic text-xl sm:text-2xl text-[#6B1D2F] font-bold leading-relaxed">
            {WEDDING_CONFIG.quranicVerses.bismillah.arabic}
          </p>
          <p className="text-[11px] sm:text-xs text-[#7A6B6B] italic font-serif-luxury mt-0.5">
            "{WEDDING_CONFIG.quranicVerses.bismillah.english}"
          </p>
        </div>

        {/* Quran Verse */}
        <div className="my-3 py-2 border-y border-[#E8D3A2]/60">
          <p className="text-xs uppercase tracking-widest text-[#8E2B43] font-semibold">
            {WEDDING_CONFIG.quranicVerses.verse1.translation}
          </p>
          <p className="text-[10px] text-[#A68846] mt-0.5 font-medium">
            — {WEDDING_CONFIG.quranicVerses.verse1.reference} —
          </p>
        </div>

        {/* Warm invitation greeting */}
        <p className="text-xs sm:text-sm uppercase tracking-wider text-[#7A6B6B] font-medium mt-4">
          You're Cordially Invited to Celebrate
        </p>

        {/* Couple Names */}
        <div className="my-5">
          <h1 className="font-script text-5xl sm:text-6xl text-[#6B1D2F] drop-shadow-xs">
            {WEDDING_CONFIG.couple.groom.firstName}
          </h1>

          <div className="flex items-center justify-center my-1">
            <div className="w-12 h-px bg-[#C5A059]/50" />
            <div className="mx-3 w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center text-[#8E2B43] bg-[#FAF7F2] text-sm font-decorative">
              &
            </div>
            <div className="w-12 h-px bg-[#C5A059]/50" />
          </div>

          <h2 className="font-script text-5xl sm:text-6xl text-[#6B1D2F] drop-shadow-xs">
            {WEDDING_CONFIG.couple.bride.firstName}
          </h2>
        </div>

        {/* Event Type & City (Dates kept for the scratch cards!) */}
        <div className="text-xs font-cinzel text-[#8E2B43] font-bold tracking-widest uppercase">
          Nikah & Walima Celebration
        </div>
        <div className="text-xs text-[#7A6B6B] mt-1 font-medium">
          Pune, Maharashtra
        </div>

        {/* Wax Seal Motif */}
        <div className="my-6 flex justify-center">
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#8E2B43] via-[#6B1D2F] to-[#420B17] border-2 border-[#E8D3A2] shadow-md flex items-center justify-center text-white">
            <Heart className="w-6 h-6 text-[#E8D3A2]" />
            <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/40 pointer-events-none" />
          </div>
        </div>

        {/* Primary CTA: Open Invitation */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleOpen}
            className="w-full group relative overflow-hidden py-3.5 px-6 rounded-xl font-cinzel font-semibold text-sm tracking-wider text-white bg-gradient-to-r from-[#6B1D2F] via-[#8E2B43] to-[#6B1D2F] shadow-lg hover:shadow-xl hover:from-[#5A1222] hover:to-[#5A1222] transition-all duration-300 cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-center justify-center gap-2">
              <MailOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>Open Invitation</span>
              <Sparkles className="w-4 h-4 text-[#E8D3A2]" />
            </div>
          </button>

          {/* Interactive Feature Controls: Activate/Stop Petals & Music */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={onTogglePetals}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95 ${
                isPetalsActive
                  ? 'bg-[#6B1D2F] text-white border border-[#6B1D2F]'
                  : 'bg-[#FAF7F2] text-[#6B1D2F] border border-[#E8B4B8] hover:bg-[#F7E7E9]'
              }`}
              title={isPetalsActive ? 'Stop falling petals' : 'Start continuous floating petals'}
            >
              <Flower2 className={`w-3.5 h-3.5 ${isPetalsActive ? 'text-[#E8B4B8] animate-spin' : 'text-[#E8B4B8]'}`} />
              <span>{isPetalsActive ? 'Stop Petals' : 'Activate Petals'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleMusic}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95 ${
                isMusicPlaying
                  ? 'bg-[#E8D3A2]/40 text-[#6B1D2F] border border-[#C5A059]'
                  : 'bg-[#FAF7F2] text-[#7A6B6B] border border-[#E8D3A2]/60 hover:text-[#6B1D2F]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isMusicPlaying ? 'Music Playing' : 'Play Music'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Downward indicator */}
      <div className="mt-8 text-center text-xs text-[#8E2B43] flex flex-col items-center gap-1 select-none">
        <span className="font-cinzel text-[11px] tracking-widest uppercase">
          Scroll to view invitation
        </span>
        <div className="w-4 h-7 border border-[#C5A059] rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-[#8E2B43] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
