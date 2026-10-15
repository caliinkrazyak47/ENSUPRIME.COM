import React from 'react';

interface CrencyWaveDividerProps {
  fillColor?: string;
  bgColor?: string;
  flip?: boolean;
}

/**
 * Divisor de sección asimétrico de estilo agencia digital Awwwards (Crency Agency).
 * Curva suave continua Bézier con pendiente diagonal elegante que reemplaza las ondas líquidas infantiles.
 */
export const LiquidDripDivider: React.FC<CrencyWaveDividerProps> = ({
  fillColor = "#FFFFFF",
  bgColor = "transparent",
  flip = false,
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none z-20 select-none pointer-events-none ${
        flip ? 'transform rotate-180 -mt-1' : '-mb-1'
      }`}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 2315 140"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-20 md:h-28 lg:h-36 block"
        style={{ fill: fillColor }}
      >
        {/* Curva asimétrica auténtica de Crency Agency */}
        <path d="M-6,6 L311,42 C499,68 918,122 1092,112 C1309,99 1770,16 1987,5 C2205,-6 2373,5 2418,5 L2315,140 L0,140 Z" />
      </svg>
    </div>
  );
};
