/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { MainInvitation } from './components/MainInvitation';
import { CeremonyExperience } from './components/CeremonyExperience';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { PetalAnimation } from './components/PetalAnimation';
import { weddingAudio } from './utils/audioEngine';
import { WEDDING_CONFIG } from './config/weddingConfig';

export default function App() {
  const [isPetalsActive, setIsPetalsActive] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  const handleTogglePetals = () => {
    setIsPetalsActive((prev) => !prev);
  };

  const handleOpenInvitation = () => {
    // Smoothly scroll down to main invitation section
    const target = document.getElementById('invitation-main');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Also activate the romantic petals if not yet active
    setIsPetalsActive(true);
  };

  const handleToggleMusic = () => {
    const nextState = weddingAudio.togglePlay(WEDDING_CONFIG.music.audioFileSrc);
    setIsMusicPlaying(nextState);
  };

  return (
    <div id="top" className="min-h-screen bg-[#FAF7F2] text-[#2D2424] relative selection:bg-[#800020]/20 selection:text-[#800020]">
      {/* Continuous Lightweight Canvas Rose Petal Particle Effect */}
      <PetalAnimation isActive={isPetalsActive} />

      {/* Persistent Floating Music & Petal Controller */}
      <MusicPlayer
        onPlayStateChange={setIsMusicPlaying}
        isPetalsActive={isPetalsActive}
        onTogglePetals={handleTogglePetals}
      />

      {/* 
        NOTE: Top Navigation Bar has been completely removed as requested.
        The guest experiences the invitation naturally by scrolling continuously through its sections.
      */}

      {/* SECTION 1: LANDING PAGE */}
      <LandingPage
        onOpenInvitation={handleOpenInvitation}
        onTogglePetals={handleTogglePetals}
        isPetalsActive={isPetalsActive}
        onToggleMusic={handleToggleMusic}
        isMusicPlaying={isMusicPlaying}
      />

      {/* SECTION 2: MAIN ISLAMIC WEDDING INVITATION */}
      <MainInvitation />

      {/* SECTIONS 3, 4 & 5: CEREMONY SELECTION & INDEPENDENT SCRATCH-CARD EXPERIENCES */}
      <CeremonyExperience />

      {/* SECTION 6: CONTACT INFORMATION & WHATSAPP */}
      <ContactSection />

      {/* SECTION 7: FOOTER WITH PROPHETIC WEDDING DUA */}
      <Footer />
    </div>
  );
}
