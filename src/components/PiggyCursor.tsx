import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function PiggyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const textSpan = textRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.12,
        ease: 'power2.out',
      });
    };

    const handleHoverIn = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const customText = target.getAttribute('data-cursor-text') || 'VOIR';

      gsap.to(cursor, {
        scale: 2.5,
        backgroundColor: '#33e4b8',
        mixBlendMode: 'normal',
        duration: 0.25,
        ease: 'power3.out',
      });

      if (textSpan) {
        textSpan.innerText = customText;
        gsap.to(textSpan, { opacity: 1, duration: 0.2 });
      }
    };

    const handleHoverOut = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#FFFFFF',
        mixBlendMode: 'difference',
        duration: 0.22,
        ease: 'power3.out',
      });

      if (textSpan) {
        gsap.to(textSpan, { opacity: 0, duration: 0.15 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    const clickables = document.querySelectorAll('a, button, [data-magnet]');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white pointer-events-none z-[9999999] hidden lg:flex items-center justify-center mix-blend-difference select-none"
    >
      <span
        ref={textRef}
        className="font-display text-[9px] text-[#1C1C1C] uppercase tracking-wider font-bold opacity-0 transition-opacity"
      >
        VOIR
      </span>
    </div>
  );
}
