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
      {/* 1. TELARAÑA DELICADA Y ELEGANTE CON ARAÑA QUE BAJA POR SU HILO */}
      <div className="absolute top-0 right-4 sm:right-12 z-40 pointer-events-none">
        {/* Hilo de seda y Araña bajando con animación pendular suave */}
        <div
          className="relative flex flex-col items-center animate-spider-descend origin-top"
          style={{
            transform: `translate3d(${mousePos.x * 0.3}px, 0, 0)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          {/* Hilo de seda translúcido brillante */}
          <div className="w-[1px] h-28 sm:h-36 bg-gradient-to-b from-[#FF6B00]/70 via-[#FF851A]/50 to-white/80" />

          {/* Araña vectorial detallada y moderna */}
          <div className="relative -mt-0.5 animate-spider-swing origin-top">
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8 sm:w-10 sm:h-10 text-[#110B1C] drop-shadow-[0_4px_10px_rgba(255,107,0,0.5)]"
            >
              {/* Ojos brillantes naranja neón */}
              <circle cx="18" cy="18" r="1.2" fill="#FF6B00" />
              <circle cx="22" cy="18" r="1.2" fill="#FF6B00" />

              {/* Patas izquierdas */}
              <path d="M16 19 Q10 13 4 15" stroke="#110B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M16 21 Q8 18 3 22" stroke="#110B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M16 23 Q9 25 4 30" stroke="#110B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M17 24 Q11 30 7 35" stroke="#110B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Patas derechas */}
              <path d="M24 19 Q30 13 36 15" stroke="#110B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M24 21 Q32 18 37 22" stroke="#110B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M24 23 Q31 25 36 30" stroke="#110B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M23 24 Q29 30 33 35" stroke="#110B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Cefalotórax (cabeza) */}
              <circle cx="20" cy="19" r="3.5" fill="#110B1C" stroke="#FF6B00" strokeWidth="0.8" />
              {/* Abdomen (cuerpo) */}
              <ellipse cx="20" cy="26" rx="5" ry="6.5" fill="#110B1C" stroke="#FF6B00" strokeWidth="0.8" />
              {/* Detalle reloj de arena o marca en el lomo */}
              <polygon points="19,23 21,23 20,25" fill="#FF6B00" />
              <polygon points="20,26 19,28 21,28" fill="#FF6B00" />
            </svg>
          </div>
        </div>

        {/* Telaraña de esquina refinada y estilizada con curvas sutiles */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0)`,
            transition: 'transform 0.4s ease-out',
          }}
          className="absolute -top-4 -right-8 w-44 sm:w-56 h-44 sm:h-56 opacity-50"
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full text-[#FF6B00]">
            <path d="M100 0 L15 85" strokeWidth="0.5" strokeDasharray="1 1" />
            <path d="M100 0 L45 95" strokeWidth="0.4" />
            <path d="M100 0 L0 55" strokeWidth="0.4" />
            <path d="M100 25 Q75 25 75 0" strokeWidth="0.6" />
            <path d="M100 50 Q50 50 50 0" strokeWidth="0.6" />
            <path d="M100 75 Q25 75 25 0" strokeWidth="0.6" />
          </svg>
        </div>
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
