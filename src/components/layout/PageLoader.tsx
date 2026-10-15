import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function PageLoader({ onComplete }: { onComplete: () => void }) {
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
          }, 350);
          return 100;
        }
        const delta = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + delta, 100);
      });
    }, 35);

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
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[9999] bg-[#090909] text-[#F4F1EC] flex flex-col justify-between p-8 sm:p-14 select-none border-b border-white/10"
        >
          {/* Top Metadata */}
          <div className="flex items-center justify-between font-mono-code text-[11px] tracking-widest text-[#8D8D91] uppercase">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF3434] animate-ping" />
              <span className="text-[#F4F1EC]">THIAGOVSC // DIGITAL ARCHITECTURE</span>
            </div>
            <span>EDITION 2026.04</span>
          </div>

          {/* Center Brand & Number */}
          <div className="my-auto space-y-6">
            <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
              <span className="font-display font-black text-4xl sm:text-7xl tracking-tighter text-white">
                THIAGOVSC
              </span>
              <div className="font-display font-extrabold text-6xl sm:text-9xl text-[#8B5CF6] leading-none">
                {progress}%
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono-code text-xs text-[#8D8D91]">
              <span className="tracking-widest uppercase">
                URBAN CULTURE • LIVE AUDIOVISUAL • MOTION DESIGN
              </span>
              <span>CARGANDO ASSETS AUDIOVISUALES...</span>
            </div>
          </div>

          {/* Bottom Progress Line */}
          <div className="space-y-3">
            <div className="w-full h-[2px] bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-[#8B5CF6]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between items-center font-mono-code text-[10px] text-[#8D8D91]/60">
              <span>MADRID • BARCELONA • PARIS</span>
              <span>SITE OF THE DAY ASPIRATION</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
