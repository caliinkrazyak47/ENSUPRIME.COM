import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryStackProps {
  cards: React.ReactNode[];
  onChange?: (index: number) => void;
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
}

export const GalleryStack: React.FC<GalleryStackProps> = ({
  cards,
  onChange,
  className = '',
}) => {
  const [topIndex, setTopIndex] = useState(0);
  const total = cards.length;

  const handleNext = () => {
    setTopIndex((prev) => {
      const next = (prev + 1) % total;
      onChange?.(next);
      return next;
    });
  };

  // Pre-configured stacking angles & offsets faithful to Devique Studio GalleryStack
  // Rotations alternate subtly (-3deg, 6deg, 0deg, etc.)
  const STACK_CONFIG = [
    { scale: 1, y: 0, rotate: 0, opacity: 1 },
    { scale: 0.95, y: -14, rotate: -3.5, opacity: 0.92 },
    { scale: 0.90, y: -26, rotate: 5, opacity: 0.82 },
    { scale: 0.85, y: -36, rotate: -2, opacity: 0.70 },
  ];

  return (
    <div
      onClick={handleNext}
      className={`relative w-full h-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center cursor-pointer select-none group perspective-1000 ${className}`}
    >
      <div className="relative w-full max-w-[460px] h-[520px] sm:h-[580px] lg:h-[620px] mx-auto">
        <AnimatePresence initial={false} mode="popLayout">
          {Array.from({ length: Math.min(total, 4) })
            .map((_, slotIdx) => {
              const cardRealIndex = (topIndex + slotIdx) % total;
              const isTop = slotIdx === 0;
              const config = STACK_CONFIG[slotIdx] || STACK_CONFIG[STACK_CONFIG.length - 1];
              const zIndex = total - slotIdx;

              return (
                <motion.div
                  key={cardRealIndex}
                  layoutId={`gallery-card-${cardRealIndex}`}
                  initial={
                    isTop
                      ? {
                          scale: 0.85,
                          y: -36,
                          rotate: -2,
                          opacity: 0,
                        }
                      : undefined
                  }
                  animate={{
                    scale: config.scale,
                    y: config.y,
                    rotate: config.rotate,
                    opacity: config.opacity,
                    zIndex,
                    transition: {
                      duration: 0.58,
                      ease: [0.12, 0.23, 0.5, 1], // Exact GalleryStack bezier curve from Devique Framer component
                    },
                  }}
                  exit={{
                    x: 420,
                    scale: 0.92,
                    rotate: 14,
                    opacity: 0,
                    zIndex: total + 1,
                    transition: {
                      duration: 0.52,
                      ease: [0.12, 0.23, 0.5, 1],
                    },
                  }}
                  whileHover={
                    isTop
                      ? {
                          scale: 1.015,
                          y: -4,
                          transition: { duration: 0.2, ease: 'easeOut' },
                        }
                      : undefined
                  }
                  whileTap={
                    isTop
                      ? {
                          scale: 0.97,
                          x: 20,
                          transition: { duration: 0.15 },
                        }
                      : undefined
                  }
                  className="absolute inset-0 w-full h-full rounded-[2.5rem] shadow-[0_22px_60px_-15px_rgba(0,0,0,0.55),0_10px_25px_-5px_rgba(0,0,0,0.35)] overflow-hidden will-change-transform"
                  style={{
                    transformOrigin: '50% 90%',
                  }}
                >
                  {cards[cardRealIndex]}
                </motion.div>
              );
            })
            .reverse()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GalleryStack;
