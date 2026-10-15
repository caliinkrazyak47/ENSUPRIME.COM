import React from 'react';

interface BannerItem {
  text: string;
  // Estado Normal
  bg: string;
  textColor: string;
  // Estado Hover (Giro 3D y cambio de color exacto a designbomb.it)
  hoverBg: string;
  hoverTextColor: string;
}

const BANNER_ITEMS: BannerItem[] = [
  {
    text: "BRANDING",
    bg: "#FF3EBA", // Rosa Neón / Magenta
    textColor: "#F7F6EB", // Crema / Blanco
    hoverBg: "#F7F6EB",
    hoverTextColor: "#141414",
  },
  {
    text: "INTERACTIVE",
    bg: "#31A362", // Verde Esmeralda
    textColor: "#141414", // Negro profundo
    hoverBg: "#F7F6EB",
    hoverTextColor: "#141414",
  },
  {
    text: "ART DIRECTION",
    bg: "#CEFF00", // Lima / Amarillo Ácido
    textColor: "#31A362", // Verde
    hoverBg: "#F7F6EB",
    hoverTextColor: "#141414",
  },
  {
    text: "SERVICES",
    bg: "#4A60FF", // Azul Cobalto Eléctrico
    textColor: "#CEFF00", // Lima
    hoverBg: "#F7F6EB",
    hoverTextColor: "#141414",
  },
  {
    text: "DIGITAL ART",
    bg: "#31A362", // Verde
    textColor: "#CEFF00", // Lima
    hoverBg: "#F7F6EB",
    hoverTextColor: "#141414",
  },
  {
    text: "PACKAGING",
    bg: "#F7F6EB", // Crema / Blanco
    textColor: "#FF3EBA", // Rosa Neón
    hoverBg: "#141414",
    hoverTextColor: "#CEFF00",
  },
  {
    text: "ENSUPRIME FM",
    bg: "#6E1FE8", // Púrpura ENSUPRIME
    textColor: "#FFFFFF",
    hoverBg: "#CEFF00",
    hoverTextColor: "#141414",
  },
  {
    text: "LIVE 24/7",
    bg: "#CEFF00", // Lima Neón
    textColor: "#141414",
    hoverBg: "#FF3EBA",
    hoverTextColor: "#FFFFFF",
  },
];

/**
 * Marquee idéntico a www.designbomb.it (componente Banner Pill 3D Flip):
 * - UNA SOLA LÍNEA continua
 * - Cápsulas rectangulares con esquinas redondeadas (border-radius: 16px)
 * - Tipografía brutalista itálica extra condensada
 * - EFECTO DE ROTACIÓN 3D FLIP (rotateX: 180deg) al hacer hover con cambio de color y texto
 */
export const PremiumTicker: React.FC = () => {
  // Duplicamos la secuencia para un loop infinito continuo y sin saltos
  const sequence = [...BANNER_ITEMS, ...BANNER_ITEMS, ...BANNER_ITEMS, ...BANNER_ITEMS];

  return (
    <section className="relative w-full py-4 sm:py-6 bg-[#141414] border-y border-white/10 overflow-hidden select-none z-20">
      {/* Sombra ambiental sutil de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-10" />

      {/* Ticker continuo de una sola línea */}
      <div className="flex w-max animate-marquee-editorial hover:[animation-play-state:paused] items-center">
        {sequence.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 mx-2 sm:mx-3 cursor-pointer group"
            style={{ perspective: '1000px' }}
          >
            {/* Tarjeta contenedor con perspectiva 3D */}
            <div
              className="relative transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] rounded-[14px] sm:rounded-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.15, 0.45, 0.15, 1.35)', // Ease de Design Bomb
              }}
            >
              {/* CARA FRONTAL (Normal) */}
              <div
                className="flex items-center justify-center px-6 sm:px-9 py-2.5 sm:py-4 rounded-[14px] sm:rounded-[18px] [backface-visibility:hidden]"
                style={{
                  backgroundColor: item.bg,
                }}
              >
                <span
                  className="font-impact italic tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase whitespace-nowrap leading-none select-none"
                  style={{
                    color: item.textColor,
                  }}
                >
                  {item.text}
                </span>
              </div>

              {/* CARA TRASERA (Giro 180° con cambio de color) */}
              <div
                className="absolute inset-0 flex items-center justify-center px-6 sm:px-9 py-2.5 sm:py-4 rounded-[14px] sm:rounded-[18px] [backface-visibility:hidden] [transform:rotateX(180deg)]"
                style={{
                  backgroundColor: item.hoverBg,
                }}
              >
                <span
                  className="font-impact italic tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase whitespace-nowrap leading-none select-none"
                  style={{
                    color: item.hoverTextColor,
                  }}
                >
                  {item.text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
