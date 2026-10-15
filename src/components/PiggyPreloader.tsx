import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PiggyPreloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = 'auto';
            onComplete();
          }, 400);
          return 100;
        }
        const jump = Math.floor(Math.random() * 9) + 4;
        return Math.min(prev + jump, 100);
      });
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[999999] bg-[#1C1C1C] flex flex-col justify-between p-8 md:p-14 select-none piggy-grain border-b-4 border-[#33e4b8]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#33e4b8]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#33e4b8] animate-ping" />
              <span>ENSUPRIME // THE PIGGY BREWING EXPERIENCE</span>
            </div>
            <span className="text-[#E56DB1] font-bold">CHARGEMENT EN COURS</span>
          </div>

          {/* Central Isotype & Dynamic Number */}
          <div className="my-auto flex flex-col items-center justify-center text-center space-y-6">
            {/* Animated Piggy Badge */}
            <motion.div
              animate={{ rotate: [0, -4, 4, 0], scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#33e4b8] flex items-center justify-center border-4 border-[#1C1C1C] shadow-[8px_8px_0px_#E56DB1]"
            >
              {/* Rotating outer text circular SVG */}
              <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.5px] font-mono uppercase font-bold tracking-widest fill-[#1C1C1C]">
                    <textPath href="#circlePath">
                      • BRASSERIE LIBRE ET CRÉATIVE • ENSUPRIME
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Center Piggy Face / E Logo */}
              <div className="w-16 h-16 rounded-full bg-[#1C1C1C] flex items-center justify-center text-white font-display text-4xl shadow-inner">
                EP
              </div>
            </motion.div>

            {/* Percentage Counter in Giant Abolition/Bebas Neue Display */}
            <div className="flex flex-col items-center">
              <div className="font-display text-8xl md:text-[140px] leading-none text-white tracking-tight drop-shadow-[4px_4px_0px_#33e4b8]">
                {progress}<span className="text-[#E56DB1] text-6xl md:text-8xl">%</span>
              </div>
              <div className="mt-2 text-xs font-mono uppercase tracking-[0.3em] text-[#33e4b8] font-bold">
                PRÉPARATION DU FLUX ARTISANAL & AUDIOVISUEL
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full space-y-3">
            <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#33e4b8] via-[#FFD84D] to-[#E56DB1] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/50">
              <span>EST. 2026 • FINESSE & CRAZINESS</span>
              <span>PARIS / STRASBOURG / MADRID</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
