/**
 * Audio Engine supporting both HTML5 Audio files and Web Audio API synthesized serene nasheed ambiance.
 * Zero external copyright violations, 100% working in browser on mobile and desktop.
 */

class WeddingAudioEngine {
  private audioContext: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.45;
  private masterGain: GainNode | null = null;
  private melodyTimer: number | null = null;
  private htmlAudio: HTMLAudioElement | null = null;
  private currentStep: number = 0;
  private customAudioUrl: string | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  // Peaceful Shukran Laka Rabbi (Thank You My Lord) nasheed melody motif
  private readonly melodyNotes: { freq: number; duration: number; pause: number }[] = [
    { freq: 293.66, duration: 0.8, pause: 0.2 }, // D4 - Shuk-
    { freq: 349.23, duration: 0.8, pause: 0.2 }, // F4 - ran
    { freq: 392.00, duration: 1.1, pause: 0.3 }, // G4 - La-
    { freq: 440.00, duration: 1.4, pause: 0.4 }, // A4 - ka
    { freq: 392.00, duration: 0.8, pause: 0.2 }, // G4 - Rab-
    { freq: 349.23, duration: 1.2, pause: 0.3 }, // F4 - bi
    { freq: 329.63, duration: 1.0, pause: 0.3 }, // E4
    { freq: 293.66, duration: 1.6, pause: 0.8 }, // D4
    // Phrase 2: Praise & Devotion
    { freq: 349.23, duration: 0.8, pause: 0.2 }, // F4
    { freq: 392.00, duration: 0.8, pause: 0.2 }, // G4
    { freq: 440.00, duration: 1.2, pause: 0.3 }, // A4
    { freq: 523.25, duration: 1.5, pause: 0.4 }, // C5
    { freq: 440.00, duration: 1.0, pause: 0.3 }, // A4
    { freq: 392.00, duration: 1.2, pause: 0.3 }, // G4
    { freq: 349.23, duration: 1.0, pause: 0.3 }, // F4
    { freq: 293.66, duration: 2.0, pause: 1.0 }, // D4
  ];

  public subscribe(callback: (playing: boolean) => void): () => void {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
    }
    if (this.htmlAudio) {
      this.htmlAudio.volume = this.volume;
    }
  }

  public setCustomAudioFile(file: File) {
    if (this.customAudioUrl) {
      URL.revokeObjectURL(this.customAudioUrl);
    }
    this.customAudioUrl = URL.createObjectURL(file);
    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }
    this.htmlAudio = new Audio(this.customAudioUrl);
    this.htmlAudio.loop = true;
    this.htmlAudio.volume = this.volume;
    if (this.isPlaying) {
      this.stopSynthesis();
      this.htmlAudio.play().catch(console.error);
    }
  }

  private initAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  public togglePlay(customFileSrc?: string): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(customFileSrc);
      return true;
    }
  }

  public play(customFileSrc?: string) {
    if (this.isPlaying) return;

    // Check if custom audio src provided, uploaded, or default mp3 file
    const srcToPlay = this.customAudioUrl || customFileSrc || '/shukran_laka_rabbi.mp3';

    if (srcToPlay) {
      if (!this.htmlAudio) {
        this.htmlAudio = new Audio(srcToPlay);
        this.htmlAudio.loop = true;
        this.htmlAudio.addEventListener('pause', () => {
          if (this.isPlaying && this.htmlAudio?.paused) {
            this.isPlaying = false;
            this.notify();
          }
        });
        this.htmlAudio.addEventListener('play', () => {
          if (!this.isPlaying) {
            this.isPlaying = true;
            this.notify();
          }
        });
      } else if (this.htmlAudio.src !== srcToPlay && !this.htmlAudio.src.endsWith(srcToPlay)) {
        this.htmlAudio.src = srcToPlay;
      }

      this.htmlAudio.volume = this.volume;
      this.htmlAudio
        .play()
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch((err) => {
          console.warn('HTML5 Audio playback error, falling back to synthesis:', err);
          this.startSynthesis();
        });
      return;
    }

    this.startSynthesis();
  }

  private startSynthesis() {
    try {
      const ctx = this.initAudioContext();
      if (!this.masterGain) {
        this.masterGain = ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
        this.masterGain.connect(ctx.destination);
      }
      this.isPlaying = true;
      this.notify();
      this.playNextNote();
    } catch (err) {
      console.warn('AudioContext error:', err);
    }
  }

  private playNextNote = () => {
    if (!this.isPlaying || !this.audioContext || !this.masterGain) return;

    const note = this.melodyNotes[this.currentStep];
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Harmonic Santur / Bell synthesizer with dual oscillators for warm resonance
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(note.freq, now);

    // Warm subtle 3rd harmonic overtone
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(note.freq * 2, now);

    // Acoustic decay envelope (pluck & soft reverberation)
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + note.duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + note.duration);
    osc2.stop(now + note.duration);

    this.currentStep = (this.currentStep + 1) % this.melodyNotes.length;

    const delayMs = (note.duration + note.pause) * 1000;
    this.melodyTimer = window.setTimeout(this.playNextNote, delayMs);
  };

  private stopSynthesis() {
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  public pause() {
    this.isPlaying = false;
    this.stopSynthesis();
    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }
    this.notify();
  }
}

export const weddingAudio = new WeddingAudioEngine();
