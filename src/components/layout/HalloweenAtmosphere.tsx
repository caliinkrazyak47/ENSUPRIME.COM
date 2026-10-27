import React, { useEffect, useState } from 'react';

// Elementos flotantes vectoriales minimalistas para ambientación Halloween estilo americano moderno
export const HalloweenAtmosphere: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Parallax sutil basado en la posición normalizada del cursor
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
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
      {/* 1. TELARAÑA EDITORIAL EN ESQUINA SUPERIOR DERECHA */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute -top-6 -right-6 w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 opacity-25 hover:opacity-40 transition-opacity duration-700"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-[#FF7A00]">
          <path d="M100 0 L0 100" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
          <path d="M100 0 L30 100" strokeWidth="0.4" />
          <path d="M100 0 L70 100" strokeWidth="0.4" />
          <path d="M100 0 L0 70" strokeWidth="0.4" />
          <path d="M100 0 L0 30" strokeWidth="0.4" />
          {/* Círculos concéntricos de la telaraña */}
          <path d="M100 20 Q80 20 80 0" strokeWidth="0.6" />
          <path d="M100 45 Q55 45 55 0" strokeWidth="0.6" />
          <path d="M100 70 Q30 70 30 0" strokeWidth="0.6" />
          <path d="M100 95 Q5 95 5 0" strokeWidth="0.6" />
        </svg>
      </div>

      {/* 2. MURCIÉLAGOS EDITORIALES EN BANDADA SUTIL */}
      <div
        style={{
          transform: `translate3d(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute top-28 sm:top-36 left-4 sm:left-12 opacity-35"
      >
        <div className="relative">
          {/* Murciélago 1 */}
          <svg
            viewBox="0 0 24 16"
            className="w-7 h-5 sm:w-9 sm:h-6 fill-[#110B1C] drop-shadow-[0_4px_12px_rgba(255,122,0,0.25)] animate-pulse"
            style={{ animationDuration: '4s' }}
          >
            <path d="M12 4 C10 1, 6 0, 0 3 C2 7, 5 9, 8 7 C9 11, 11 12, 12 10 C13 12, 15 11, 16 7 C19 9, 22 7, 24 3 C18 0, 14 1, 12 4 Z" />
          </svg>
          {/* Murciélago 2 pequeño y desplazado */}
          <svg
            viewBox="0 0 24 16"
            className="w-4 h-3 sm:w-5 sm:h-4 fill-[#110B1C] absolute -top-4 -right-6 opacity-80"
          >
            <path d="M12 4 C10 1, 6 0, 0 3 C2 7, 5 9, 8 7 C9 11, 11 12, 12 10 C13 12, 15 11, 16 7 C19 9, 22 7, 24 3 C18 0, 14 1, 12 4 Z" />
          </svg>
        </div>
      </div>

      {/* 3. CALABAZA GEOMÉTRICA MODERNA "JACK-O'-LANTERN" FLOTANTE LATERAL DERECHO */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)`,
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="hidden lg:block absolute top-[45%] right-6 opacity-40 hover:opacity-80 transition-opacity"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg viewBox="0 0 32 32" className="w-10 h-10 drop-shadow-[0_0_15px_rgba(255,122,0,0.5)]">
            {/* Tallo */}
            <path d="M15 4 C15 2, 17 2, 17 5 L16 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
            {/* Cuerpo Calabaza */}
            <ellipse cx="16" cy="18" rx="12" ry="10" fill="#FF7A00" />
            <ellipse cx="16" cy="18" rx="8" ry="10" fill="#FF8D1A" />
            <ellipse cx="16" cy="18" rx="4" ry="10" fill="#FFA133" />
            {/* Ojos y Sonrisa Jack geométrica tallada */}
            <polygon points="12,14 14,17 10,17" fill="#110B1C" />
            <polygon points="20,14 22,17 18,17" fill="#110B1C" />
            <polygon points="16,17 17,19 15,19" fill="#110B1C" />
            <path d="M11 22 Q16 26 21 22 Q19 25 16 25 Q13 25 11 22 Z" fill="#110B1C" />
          </svg>
        </div>
      </div>

      {/* 4. NIEBLA AMBIENTAL INFERIOR SUTIL (ESTILO NOCHE AMERICANA) */}
      <div className="absolute -bottom-10 left-0 right-0 h-32 bg-gradient-to-t from-[#FF7A00]/[0.04] to-transparent pointer-events-none" />
    </div>
  );
};
