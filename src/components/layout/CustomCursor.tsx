import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Cursor personalizado estilo Crency Agency:
 * - Esfera magnética con blend mode (difference / mix-blend), aro sutil y micro-dot
 * - Escala suave y fluida con física elástica de aceleración
 * - Colores adaptados a ENSUPRIME (#6E1FE8 / #A855F7 y contraste blanco)
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Punto central pegado al cursor de manera instantánea
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Animación suave de amortiguación estilo Crency Agency
    const ticker = () => {
      posX += (mouseX - posX) * 0.18;
      posY += (mouseY - posY) * 0.18;
      gsap.set(ring, { x: posX, y: posY });
    };

    gsap.ticker.add(ticker);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Eventos hover sobre interactivos
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorText(type || '');
        setIsHovered(true);
      } else {
        const clickable = (e.target as HTMLElement).closest('button, a, input, [role="button"]');
        if (clickable) {
          setIsHovered(true);
          setCursorText('');
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor], button, a, input, [role="button"]');
      if (target) {
        setIsHovered(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden mix-blend-difference">
      {/* 1. Punto central morado vibrante */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none transition-transform duration-75 ${
          isHovered ? 'scale-0' : 'scale-100'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* 2. Anillo magnético elástico con estética Crency en tonos ENSUPRIME */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered
            ? cursorText
              ? 'w-20 h-20 -ml-10 -mt-10 bg-[#6E1FE8] text-white shadow-[0_0_30px_rgba(110,31,232,0.6)] scale-100'
              : 'w-14 h-14 -ml-7 -mt-7 bg-white text-black scale-100'
            : isClicking
            ? 'w-6 h-6 -ml-3 -mt-3 bg-white/70 scale-90'
            : 'w-9 h-9 -ml-[18px] -mt-[18px] border-2 border-white/60 bg-transparent'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {cursorText && (
          <span className="font-mono-code text-[10px] font-extrabold tracking-widest uppercase select-none text-white drop-shadow">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
