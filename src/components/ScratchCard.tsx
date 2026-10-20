import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { EventDetail } from '../config/weddingConfig';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';
import { MapPin, Calendar, Copy, Check, Sparkles, ExternalLink, Navigation } from 'lucide-react';

interface ScratchCardProps {
  event: EventDetail;
  eventType: 'nikah' | 'walima';
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ event, eventType, onRevealed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [copied, setCopied] = useState(false);
  const isRevealedRef = useRef(false);

  // Initialize canvas overlay
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw luxury metallic/gold floral cover layer
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    if (eventType === 'nikah') {
      gradient.addColorStop(0, '#5A1222'); // Rich deep maroon
      gradient.addColorStop(0.5, '#7F1D32'); // Crimson rose
      gradient.addColorStop(1, '#420B17'); // Dark maroon
    } else {
      gradient.addColorStop(0, '#2D3B2D'); // Deep emerald
      gradient.addColorStop(0.5, '#405B43'); // Sage forest
      gradient.addColorStop(1, '#1E2C1E'); // Forest olive
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle gold foil speckles pattern
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(232, 211, 162, 0.28)' : 'rgba(255, 255, 255, 0.18)';
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 2.5 + 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Elegant gold border outline
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Inner hairline border
    ctx.strokeStyle = 'rgba(232, 211, 162, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Text instructions on cover
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Emblem symbol
    ctx.fillStyle = '#E8D3A2';
    ctx.font = '22px serif';
    ctx.fillText('✦ ⚜ ✦', width / 2, height / 2 - 42);

    // Action headline
    ctx.font = 'bold 17px "Cinzel", Georgia, serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('SCRATCH TO REVEAL DATE & TIME', width / 2, height / 2 - 10);

    // Subtitle
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#E8D3A2';
    ctx.fillText('Rub with your finger or mouse', width / 2, height / 2 + 18);

    // Event title badge
    ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(`[ ${event.title.toUpperCase()} ]`, width / 2, height / 2 + 42);
  }, [eventType, event.title]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealedRef.current) {
        initCanvas();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const fireCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#6B1D2F', '#E8B4B8', '#D4AF37', '#FAF7F2'],
      });
    } catch {
      // ignore
    }
  }, []);

  const revealCompletely = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setScratchPercent(100);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    fireCelebration();
    onRevealed?.();
  }, [fireCelebration, onRevealed]);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealedRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Sample pixels on a downscaled stride to maintain 60fps performance
      const stride = 16;
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      let totalSampled = 0;

      for (let i = 3; i < data.length; i += 4 * stride) {
        totalSampled++;
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / totalSampled) * 100);
      setScratchPercent(percent);

      if (percent >= 40) {
        revealCompletely();
      }
    } catch {
      // ignore
    }
  }, [revealCompletely]);

  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealedRef.current) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();

      checkScratchPercentage();
    },
    [checkScratchPercentage]
  );

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  // Touch handlers with touch scroll prevention while scratching
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    if (e.touches[0]) {
      e.preventDefault();
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(event.fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = event.fullAddress;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#FFFDF9] border-2 border-[#E8D3A2] rounded-3xl p-5 sm:p-8 shadow-xl transition-all duration-300"
    >
      {/* Event Header (No date/time leaks before scratching!) */}
      <div className="text-center mb-5">
        <span className="text-[11px] uppercase tracking-widest text-[#8E2B43] font-bold bg-[#8E2B43]/10 px-3 py-1 rounded-full inline-block mb-2">
          {event.title}
        </span>
        <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#6B1D2F]">
          Discover the {event.title} Details
        </h3>
        <p className="text-xs sm:text-sm text-[#7A6B6B] mt-1 font-serif-luxury italic">
          Scratch here to unveil the special day.
        </p>
      </div>

      {/* Interactive Scratch Area: Hides Date & Time */}
      <div className="relative w-full h-[220px] sm:h-[240px] rounded-2xl overflow-hidden shadow-inner border border-[#D4AF37]/50 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE0]">
        {/* UNDERNEATH: Hidden Date and Time */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8E2B43]/10 text-[#6B1D2F] rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Official Date & Time Revealed
          </div>

          <div className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#2D2424] tracking-tight">
            {event.day}, {event.dateFormatted}
          </div>

          <div className="text-base font-semibold text-[#8E2B43] mt-1.5">
            {event.startTimeLabel}
          </div>

          {isRevealed && (
            <div className="mt-3 text-xs font-medium text-[#2E7D32] flex items-center gap-1">
              <Check className="w-4 h-4" /> Date & Time Unveiled!
            </div>
          )}
        </div>

        {/* OVERLAY: HTML5 Canvas Cover Layer */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10 transition-opacity duration-300"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        )}
      </div>

      {/* Progress & Quick Reveal Option */}
      {!isRevealed ? (
        <div className="mt-3 flex items-center justify-between text-xs text-[#7A6B6B] px-1">
          <span>Uncovered: {scratchPercent}%</span>
          <button
            type="button"
            onClick={revealCompletely}
            className="text-[#8E2B43] hover:text-[#6B1D2F] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
          >
            Reveal Instantly
          </button>
        </div>
      ) : (
        <div className="mt-3 text-center text-xs text-[#2E7D32] font-semibold">
          Date & Time Unveiled! See venue details below.
        </div>
      )}

      {/* Venue Information Block (Shown clearly for the ceremony) */}
      <div className="mt-6 p-4 sm:p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8D3A2]/60 text-xs text-[#4A3E3E]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#8E2B43]/10 flex items-center justify-center text-[#8E2B43] shrink-0 mt-0.5">
            <Navigation className="w-4 h-4 text-[#8E2B43]" />
          </div>
          <div>
            <div className="font-cinzel text-base sm:text-lg font-bold text-[#6B1D2F]">
              {event.venueName}
            </div>
            <div className="text-xs text-[#5C4D4D] mt-1 leading-relaxed">
              {event.fullAddress}
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Action Buttons Below Scratch Card */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* 1. View Location on Map */}
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-[#6B1D2F] hover:bg-[#5A1222] transition-colors shadow-xs"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>View on Map</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>

        {/* 2. Venue Information & Copy */}
        <button
          type="button"
          onClick={handleCopyAddress}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#6B1D2F] bg-[#FAF7F2] border border-[#6B1D2F]/30 hover:bg-[#F5ECEE] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span className="text-[#2E7D32]">Address Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Address</span>
            </>
          )}
        </button>

        {/* 3. Add to Calendar */}
        <div className="relative group">
          <button
            type="button"
            onClick={() => downloadIcsFile(event)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#8B6B23] bg-[#E8D3A2]/30 border border-[#D4AF37]/50 hover:bg-[#E8D3A2]/50 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Add to Calendar</span>
          </button>
          <a
            href={getGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-[10px] text-[#8E2B43] hover:underline mt-1"
          >
            or Google Calendar link
          </a>
        </div>
      </div>

      {/* Copy notification confirmation */}
      {copied && (
        <div className="mt-3 p-2 bg-[#E8F5E9] border border-[#81C784] rounded-lg text-center text-xs text-[#1B5E20] animate-fadeIn">
          Address copied successfully to your clipboard!
        </div>
      )}
    </div>
  );
};
