import React, { useState, useEffect, useRef } from 'react';
import { weddingAudio } from '../utils/audioEngine';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { Music, Pause, Play, Volume2, VolumeX, Upload, Flower2 } from 'lucide-react';

interface MusicPlayerProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
  isPetalsActive?: boolean;
  onTogglePetals?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  onPlayStateChange,
  isPetalsActive = false,
  onTogglePetals,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(45);
  const [showControls, setShowControls] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
      onPlayStateChange?.(playing);
    });
    return unsubscribe;
  }, [onPlayStateChange]);

  const handleTogglePlay = () => {
    const nextState = weddingAudio.togglePlay(WEDDING_CONFIG.music.audioFileSrc);
    setIsPlaying(nextState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    weddingAudio.setVolume(val / 100);
    if (val === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      weddingAudio.setVolume((volume || 45) / 100);
    } else {
      setIsMuted(true);
      weddingAudio.setVolume(0);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      weddingAudio.setCustomAudioFile(file);
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Controls Panel */}
      {showControls && (
        <div className="mb-3 w-72 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E8D3A2] rounded-2xl p-4 shadow-xl text-[#2D2424] transition-all duration-200">
          <div className="flex items-center justify-between border-b border-[#E8D3A2]/50 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-[#8E2B43]" />
              <span className="text-xs font-cinzel font-bold text-[#6B1D2F]">
                Wedding Nasheed
              </span>
            </div>
            <span className="text-[10px] text-[#8E2B43] bg-[#8E2B43]/10 px-2 py-0.5 rounded-full font-medium">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>

          <div className="text-xs font-semibold text-[#2D2424] truncate">
            {WEDDING_CONFIG.music.title}
          </div>
          <div className="text-[11px] text-[#7A6B6B] mt-0.5">
            {WEDDING_CONFIG.music.artist}
          </div>

          {/* Volume Control */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleMute}
              className="text-[#6B1D2F] hover:text-[#8E2B43] transition-colors p-1"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-[#E8D3A2]/60 rounded-lg appearance-none cursor-pointer accent-[#6B1D2F]"
            />
            <span className="text-[10px] tabular-nums text-[#7A6B6B] w-6 text-right">
              {isMuted ? 0 : volume}%
            </span>
          </div>

          {/* Continuous Petal Quick Switch inside Audio Panel */}
          {onTogglePetals && (
            <div className="mt-3 pt-2.5 border-t border-[#E8D3A2]/40 flex items-center justify-between">
              <span className="text-[10px] text-[#7A6B6B]">Continuous Petals:</span>
              <button
                type="button"
                onClick={onTogglePetals}
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                  isPetalsActive
                    ? 'bg-[#6B1D2F] text-white'
                    : 'bg-white border border-[#E8D3A2] text-[#6B1D2F] hover:bg-[#F5ECEE]'
                }`}
              >
                <Flower2 className={`w-3 h-3 ${isPetalsActive ? 'animate-spin text-[#E8B4B8]' : ''}`} />
                <span>{isPetalsActive ? 'Stop Petals' : 'Activate Petals'}</span>
              </button>
            </div>
          )}

          {/* Custom audio upload option */}
          <div className="mt-2.5 pt-2 border-t border-[#E8D3A2]/40 flex items-center justify-between">
            <span className="text-[10px] text-[#7A6B6B]">Custom Track:</span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8E2B43] hover:text-[#6B1D2F] bg-white border border-[#E8D3A2] px-2 py-1 rounded shadow-xs transition-colors"
            >
              <Upload className="w-3 h-3" />
              <span>Choose MP3</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Floating Action Controls */}
      <div className="flex items-center gap-2">
        {/* Floating Petals Toggle Button */}
        {onTogglePetals && (
          <button
            type="button"
            onClick={onTogglePetals}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer ${
              isPetalsActive
                ? 'bg-[#6B1D2F] text-white ring-3 ring-[#E8B4B8]/50'
                : 'bg-[#FAF7F2]/90 backdrop-blur-md text-[#6B1D2F] border border-[#E8D3A2] hover:bg-[#F7E7E9]'
            }`}
            title={isPetalsActive ? 'Stop falling petals' : 'Activate floating petals'}
            aria-label={isPetalsActive ? 'Stop petals' : 'Activate petals'}
          >
            <Flower2 className={`w-4 h-4 ${isPetalsActive ? 'text-[#E8B4B8] animate-spin' : 'text-[#6B1D2F]'}`} />
          </button>
        )}

        {/* Audio Ambiance label button */}
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E8D3A2] text-[#6B1D2F] rounded-full shadow-lg text-xs font-medium hover:bg-[#FAF7F2] transition-all cursor-pointer"
          title="Audio Settings"
        >
          <Music className="w-3.5 h-3.5" />
          <span className="max-w-[120px] truncate text-[11px]">
            {isPlaying ? 'Shukran Laka Rabbi' : 'Audio Ambiance'}
          </span>
        </button>

        {/* Main Play/Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`relative p-3.5 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
            isPlaying
              ? 'bg-[#6B1D2F] text-white ring-4 ring-[#E8B4B8]/40 scale-105'
              : 'bg-[#FAF7F2] text-[#6B1D2F] border-2 border-[#C5A059] hover:bg-[#F7E7E9]'
          }`}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          title={isPlaying ? 'Pause background nasheed' : 'Play wedding music'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white animate-pulse" />
          ) : (
            <Play className="w-5 h-5 ml-0.5 text-[#6B1D2F]" />
          )}

          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/60 animate-ping pointer-events-none opacity-40" />
          )}
        </button>
      </div>
    </div>
  );
};
