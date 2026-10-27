import React, { useEffect, useState } from 'react';

// Elementos decorativos vectoriales premium estilo americano (moderno, editorial, limpio)
// No interfiere con clics (pointer-events-none), no toca menús ni texto de componentes
export const HalloweenAtmosphere: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Parallax suave al mover el ratón
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 26;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
    >
      {/* 1. TELARAÑA EDITORIAL ESQUINA SUPERIOR DERECHA (MÁS VISIBLE Y ELEGANTE) */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute -top-3 -right-3 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 opacity-60 transition-opacity duration-500"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-[#FF6B00]">
          <path d="M100 0 L0 100" strokeWidth="0.8" strokeDasharray="2 2" />
          <path d="M100 0 L30 100" strokeWidth="0.6" />
          <path d="M100 0 L70 100" strokeWidth="0.6" />
          <path d="M100 0 L0 70" strokeWidth="0.6" />
          <path d="M100 0 L0 30" strokeWidth="0.6" />
          {/* Círculos concéntricos de la telaraña con brillo naranja */}
          <path d="M100 20 Q80 20 80 0" strokeWidth="0.9" />
          <path d="M100 45 Q55 45 55 0" strokeWidth="0.9" />
          <path d="M100 70 Q30 70 30 0" strokeWidth="0.9" />
          <path d="M100 95 Q5 95 5 0" strokeWidth="0.9" />
          {/* Pequeña araña minimalista colgando */}
          <line x1="60" y1="20" x2="60" y2="40" stroke="#FF6B00" strokeWidth="0.6" />
          <circle cx="60" cy="42" r="2.5" fill="#110B1C" stroke="#FF6B00" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 2. TELARAÑA INVERTIDA ESQUINA SUPERIOR IZQUIERDA (CONTRASTE SUTIL) */}
      <div
        style={{
          transform: `translate3d(${-mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute -top-4 -left-4 w-36 sm:w-48 h-36 sm:h-48 opacity-45"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-[#FF6B00]">
          <path d="M0 0 L100 100" strokeWidth="0.6" strokeDasharray="2 2" />
          <path d="M0 0 L70 100" strokeWidth="0.5" />
          <path d="M0 0 L100 70" strokeWidth="0.5" />
          <path d="M0 25 Q25 25 25 0" strokeWidth="0.7" />
          <path d="M0 55 Q55 55 55 0" strokeWidth="0.7" />
          <path d="M0 85 Q85 85 85 0" strokeWidth="0.7" />
        </svg>
      </div>

      {/* 3. FLOTA DE MURCIÉLAGOS SILUETA AMERICANA (IZQUIERDA SUPERIOR) */}
      <div
        style={{
          transform: `translate3d(${-mousePos.x * 0.9}px, ${-mousePos.y * 0.9}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute top-24 sm:top-32 left-4 sm:left-14 opacity-75"
      >
        <div className="relative">
          {/* Murciélago principal grande */}
          <svg
            viewBox="0 0 24 16"
            className="w-10 h-7 sm:w-12 sm:h-8 fill-[#110B1C] drop-shadow-[0_4px_16px_rgba(255,107,0,0.35)] animate-pulse"
            style={{ animationDuration: '3.5s' }}
          >
            <path d="M12 4 C10 1, 6 0, 0 3 C2 7, 5 9, 8 7 C9 11, 11 12, 12 10 C13 12, 15 11, 16 7 C19 9, 22 7, 24 3 C18 0, 14 1, 12 4 Z" />
          </svg>
          {/* Murciélago secundario hacia arriba */}
          <svg
            viewBox="0 0 24 16"
            className="w-6 h-4 sm:w-7 sm:h-5 fill-[#110B1C] absolute -top-5 -right-7 opacity-85 rotate-[-12deg]"
          >
            <path d="M12 4 C10 1, 6 0, 0 3 C2 7, 5 9, 8 7 C9 11, 11 12, 12 10 C13 12, 15 11, 16 7 C19 9, 22 7, 24 3 C18 0, 14 1, 12 4 Z" />
          </svg>
          {/* Murciélago tercero distante */}
          <svg
            viewBox="0 0 24 16"
            className="w-4 h-3 sm:w-5 sm:h-3.5 fill-[#110B1C] absolute top-6 -left-4 opacity-70 rotate-[8deg]"
          >
            <path d="M12 4 C10 1, 6 0, 0 3 C2 7, 5 9, 8 7 C9 11, 11 12, 12 10 C13 12, 15 11, 16 7 C19 9, 22 7, 24 3 C18 0, 14 1, 12 4 Z" />
          </svg>
        </div>
      </div>

      {/* 4. MURCIÉLAGOS VOLANDO EN LA DERECHA */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 0.7}px, ${-mousePos.y * 0.7}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="hidden md:block absolute top-48 right-16 sm:right-24 opacity-60"
      >
        <div className="relative">
          <svg
            viewBox="0 0 24 16"
            className="w-8 h-5 fill-[#110B1C] rotate-[15deg] drop-shadow-[0_4px_12px_rgba(255,107,0,0.3)]"
          >
            <path d="M12 4 C10 1, 6 0, 0 3 C2 7, 5 9, 8 7 C9 11, 11 12, 12 10 C13 12, 15 11, 16 7 C19 9, 22 7, 24 3 C18 0, 14 1, 12 4 Z" />
          </svg>
          <svg
            viewBox="0 0 24 16"
            className="w-5 h-3.5 fill-[#110B1C] absolute -top-4 -left-5 opacity-75 rotate-[5deg]"
          >
            <path d="M12 4 C10 1, 6 0, 0 3 C2 7, 5 9, 8 7 C9 11, 11 12, 12 10 C13 12, 15 11, 16 7 C19 9, 22 7, 24 3 C18 0, 14 1, 12 4 Z" />
          </svg>
        </div>
      </div>

      {/* 5. CALABAZA GEOMÉTRICA "JACK-O'-LANTERN" ESTILO AMERICANO NEÓN (LATERAL DERECHO) */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)`,
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute top-[40%] right-3 sm:right-7 opacity-75 hover:opacity-100 transition-opacity"
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,107,0,0.65)]">
            {/* Tallo verde curvado */}
            <path d="M15 4 C14 1, 18 2, 17 6 L16 8" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
            {/* Cuerpo Calabaza naranja profundo */}
            <ellipse cx="16" cy="19" rx="13" ry="10.5" fill="#FF6B00" />
            <ellipse cx="16" cy="19" rx="8.5" ry="10.5" fill="#FF851A" />
            <ellipse cx="16" cy="19" rx="4.5" ry="10.5" fill="#FFA033" />
            {/* Ojos triangulares, nariz y sonrisa tallada americana */}
            <polygon points="11,15 14,18 10,18" fill="#110B1C" />
            <polygon points="21,15 22,18 18,18" fill="#110B1C" />
            <polygon points="16,18 17.5,20 14.5,20" fill="#110B1C" />
            <path d="M10 23 Q16 28 22 23 Q19 26.5 16 26.5 Q13 26.5 10 23 Z" fill="#110B1C" />
          </svg>
        </div>
      </div>

      {/* 6. FANTASMA MINIMALISTA EDITORIAL AMERICANO (LATERAL IZQUIERDO) */}
      <div
        style={{
          transform: `translate3d(${-mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`,
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="hidden lg:block absolute top-[60%] left-6 opacity-70 hover:opacity-95 transition-opacity"
      >
        <div className="relative w-12 h-14">
          <svg viewBox="0 0 24 30" className="w-full h-full fill-white drop-shadow-[0_8px_25px_rgba(255,255,255,0.4)]">
            {/* Cuerpo fantasma con ondulación inferior */}
            <path d="M12 2 C6 2 4 7 4 13 L4 25 C6 23 8 26 10 24 C12 26 14 23 16 25 C18 23 20 25 20 13 C20 7 18 2 12 2 Z" />
            {/* Ojos negros ovalados */}
            <ellipse cx="9" cy="11" rx="1.5" ry="2.2" fill="#110B1C" />
            <ellipse cx="15" cy="11" rx="1.5" ry="2.2" fill="#110B1C" />
            {/* Boca ovalada */}
            <ellipse cx="12" cy="16" rx="1.2" ry="1.8" fill="#110B1C" />
          </svg>
        </div>
      </div>

      {/* 7. LUNA CRECIENTE GEOMÉTRICA CON BRILLO CÁLIDO (FONDO SUPERIOR IZQUIERDA) */}
      <div className="absolute top-14 left-8 sm:left-24 w-12 h-12 opacity-30 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-full h-full fill-[#FFA033] drop-shadow-[0_0_18px_rgba(255,160,51,0.5)]">
          <path d="M12 3 C7 3 3 7 3 12 C3 17 7 21 12 21 C14.5 21 16.8 20 18.4 18.3 C14.5 18 11.5 14.8 11.5 11 C11.5 7.5 14.2 4.6 17.8 4 C16.1 3.4 14.1 3 12 3 Z" />
        </svg>
      </div>

      {/* 8. SUTIL LUZ AMBIENTAL NOCTURNA CÁLIDA Y NIEBLA INFERIOR */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/[0.025] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 left-0 right-0 h-36 bg-gradient-to-t from-[#FF6B00]/[0.05] via-[#110B1C]/[0.02] to-transparent pointer-events-none" />
    </div>
  );
};
