import React, { useState, useRef } from 'react';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { MosqueEmblem } from './IslamicOrnaments';
import { ScratchCard } from './ScratchCard';
import { Sparkles, ArrowDown } from 'lucide-react';

export const CeremonyExperience: React.FC = () => {
  const [selectedCeremony, setSelectedCeremony] = useState<'nikah' | 'walima'>('nikah');
  const scratchSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSelectCeremony = (ceremony: 'nikah' | 'walima') => {
    setSelectedCeremony(ceremony);
    // Smoothly scroll down to the scratch card area
    setTimeout(() => {
      scratchSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section id="ceremonies" className="py-14 md:py-24 px-4 max-w-5xl mx-auto">
      {/* SECTION 3: CEREMONY SELECTION */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8E2B43]/10 text-[#6B1D2F] rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          Ceremony Selection
        </div>
        <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#6B1D2F] mt-1">
          Choose a Ceremony to Discover
        </h2>
        <p className="text-xs sm:text-sm text-[#7A6B6B] mt-2 max-w-md mx-auto">
          Select either ceremony below to open its dedicated scratch card and reveal the auspicious date and venue.
        </p>
      </div>

      {/* The Two Primary Ceremony Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
        {/* CARD ONE: NIKAH CEREMONY */}
        <div
          className={`relative bg-[#FFFDF9] border-2 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between transition-all duration-300 ${
            selectedCeremony === 'nikah'
              ? 'border-[#6B1D2F] ring-4 ring-[#8E2B43]/10 shadow-xl'
              : 'border-[#E8D3A2] hover:border-[#6B1D2F]/50 hover:shadow-lg'
          }`}
        >
          {selectedCeremony === 'nikah' && (
            <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 bg-[#6B1D2F] text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
              Selected
            </div>
          )}

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MosqueEmblem color="#2E5A36" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E5A36] bg-[#2E5A36]/10 px-3 py-1 rounded-full inline-block mb-2">
              Ceremony 01
            </span>

            <h3 className="text-2xl font-cinzel font-bold text-[#6B1D2F]">
              {WEDDING_CONFIG.events.nikah.title}
            </h3>

            <p className="text-xs text-[#7A6B6B] mt-1 font-serif-luxury">
              {WEDDING_CONFIG.events.nikah.tagline}
            </p>

            <div className="my-5 p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8D3A2]/60">
              <p className="text-xs font-semibold text-[#8E2B43]">
                Scratch to reveal the details
              </p>
              <p className="text-[11px] text-[#7A6B6B] mt-0.5">
                Date & Time will be revealed through the scratch card below
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSelectCeremony('nikah')}
            className={`w-full py-3 px-4 rounded-xl text-xs font-cinzel font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              selectedCeremony === 'nikah'
                ? 'bg-[#6B1D2F] text-white shadow-md'
                : 'bg-[#FAF7F2] text-[#6B1D2F] border border-[#6B1D2F]/40 hover:bg-[#F5ECEE]'
            }`}
          >
            <span>Open Nikah Scratch Card</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* CARD TWO: WALIMA RECEPTION */}
        <div
          className={`relative bg-[#FFFDF9] border-2 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between transition-all duration-300 ${
            selectedCeremony === 'walima'
              ? 'border-[#6B1D2F] ring-4 ring-[#8E2B43]/10 shadow-xl'
              : 'border-[#E8D3A2] hover:border-[#6B1D2F]/50 hover:shadow-lg'
          }`}
        >
          {selectedCeremony === 'walima' && (
            <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 bg-[#6B1D2F] text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
              Selected
            </div>
          )}

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MosqueEmblem color="#7A3B2E" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E2B43] bg-[#8E2B43]/10 px-3 py-1 rounded-full inline-block mb-2">
              Ceremony 02
            </span>

            <h3 className="text-2xl font-cinzel font-bold text-[#6B1D2F]">
              {WEDDING_CONFIG.events.walima.title}
            </h3>

            <p className="text-xs text-[#7A6B6B] mt-1 font-serif-luxury">
              {WEDDING_CONFIG.events.walima.tagline}
            </p>

            <div className="my-5 p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8D3A2]/60">
              <p className="text-xs font-semibold text-[#8E2B43]">
                Scratch to reveal the details
              </p>
              <p className="text-[11px] text-[#7A6B6B] mt-0.5">
                Date & Time will be revealed through the scratch card below
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSelectCeremony('walima')}
            className={`w-full py-3 px-4 rounded-xl text-xs font-cinzel font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              selectedCeremony === 'walima'
                ? 'bg-[#6B1D2F] text-white shadow-md'
                : 'bg-[#FAF7F2] text-[#6B1D2F] border border-[#6B1D2F]/40 hover:bg-[#F5ECEE]'
            }`}
          >
            <span>Open Walima Scratch Card</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SECTIONS 4 & 5: DEDICATED SCRATCH-CARD EXPERIENCE */}
      <div ref={scratchSectionRef} className="scroll-mt-8 pt-4">
        {/* Quick Tabs to toggle between ceremonies if user wants to switch */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setSelectedCeremony('nikah')}
            className={`px-4 py-2 text-xs font-cinzel font-bold rounded-full transition-all cursor-pointer ${
              selectedCeremony === 'nikah'
                ? 'bg-[#6B1D2F] text-white shadow-sm'
                : 'bg-[#FAF7F2] text-[#7A6B6B] border border-[#E8D3A2] hover:text-[#6B1D2F]'
            }`}
          >
            1. Nikah Ceremony
          </button>
          <button
            type="button"
            onClick={() => setSelectedCeremony('walima')}
            className={`px-4 py-2 text-xs font-cinzel font-bold rounded-full transition-all cursor-pointer ${
              selectedCeremony === 'walima'
                ? 'bg-[#6B1D2F] text-white shadow-sm'
                : 'bg-[#FAF7F2] text-[#7A6B6B] border border-[#E8D3A2] hover:text-[#6B1D2F]'
            }`}
          >
            2. Walima Reception
          </button>
        </div>

        <div className="max-w-2xl mx-auto">
          {selectedCeremony === 'nikah' ? (
            <div key="nikah-experience" className="animate-fadeIn">
              <ScratchCard
                event={WEDDING_CONFIG.events.nikah}
                eventType="nikah"
              />
            </div>
          ) : (
            <div key="walima-experience" className="animate-fadeIn">
              <ScratchCard
                event={WEDDING_CONFIG.events.walima}
                eventType="walima"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
