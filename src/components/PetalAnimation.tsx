import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayOffset: number;
  color: string;
  opacity: number;
}

interface PetalAnimationProps {
  isActive: boolean;
}

export const PetalAnimation: React.FC<PetalAnimationProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const isActiveRef = useRef<boolean>(isActive);

  // Keep ref in sync so animation loop always reads latest active state
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Color palette: ivory white, blush pink, soft rose, and subtle deep maroon
  const petalColors = [
    '#FFFFFF', // ivory white
    '#FDF8F5', // soft cream
    '#E8B4B8', // blush pink
    '#F7E7E9', // pale rose
    '#F2D7D9', // dusty rose
    '#6B1D2F', // deep maroon accent
    '#8E2B43', // medium crimson rose
  ];

  const spawnPetal = (startY?: number): Petal => {
    const width = window.innerWidth;
    return {
      x: Math.random() * width,
      y: startY !== undefined ? startY : -25 - Math.random() * 50,
      size: 10 + Math.random() * 13,
      speedY: 1.1 + Math.random() * 1.8,
      speedX: -0.6 + Math.random() * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.035,
      swaySpeed: 0.015 + Math.random() * 0.02,
      swayOffset: Math.random() * Math.PI * 2,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: 0.7 + Math.random() * 0.28,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // If active, populate initial natural distribution across viewport height
    if (isActive) {
      const targetCount = window.innerWidth < 640 ? 18 : 30;
      petalsRef.current = [];
      for (let i = 0; i < targetCount; i++) {
        // Spread evenly across the visible height on activation for instant gentle ambiance
        petalsRef.current.push(spawnPetal(Math.random() * window.innerHeight));
      }
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isCurrentlyActive = isActiveRef.current;
      const targetCount = window.innerWidth < 640 ? 18 : 30;

      // CONTINUOUS GENERATION: If active and petal count dropped below target, continuously replenish
      if (isCurrentlyActive && petalsRef.current.length < targetCount) {
        if (Math.random() < 0.3) {
          petalsRef.current.push(spawnPetal(-30));
        }
      }

      const activePetals: Petal[] = [];

      for (let i = 0; i < petalsRef.current.length; i++) {
        const p = petalsRef.current[i];
        p.y += p.speedY * 60 * dt;
        p.swayOffset += p.swaySpeed * 60 * dt;
        p.x += Math.sin(p.swayOffset) * 1.6 + p.speedX * 30 * dt;
        p.rotation += p.rotationSpeed * 60 * dt;

        // Draw organic curved petal geometry
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.8, p.size * 0.9, p.size * 0.3, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.3, -p.size * 0.7, -p.size * 0.8, 0, -p.size);
        ctx.fill();

        // Subtle organic petal vein line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.lineTo(0, p.size * 0.6);
        ctx.stroke();

        ctx.restore();

        // Screen boundary check
        if (p.y < canvas.height + 40 && p.x > -60 && p.x < canvas.width + 60) {
          activePetals.push(p);
        } else if (isCurrentlyActive) {
          // If active and petal exited bottom, loop it back to the top with fresh random parameters!
          activePetals.push(spawnPetal(-25));
        }
      }

      petalsRef.current = activePetals;

      // Continue animation if active OR if exiting petals are still falling off screen
      if (isCurrentlyActive || activePetals.length > 0) {
        animationFrameId.current = requestAnimationFrame(render);
      } else {
        // All petals cleared and inactive - pause render loop to conserve 100% CPU/battery
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameId.current = null;
      }
    };

    // Start render loop
    if (isActive || petalsRef.current.length > 0) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
};
