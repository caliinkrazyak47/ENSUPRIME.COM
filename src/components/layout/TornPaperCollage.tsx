import React from 'react';

interface TornDividerProps {
  fillColor: string; // Color de la sección hacia la que se expande
  bgColor?: string;  // Color del fondo de la sección actual
  position?: 'top' | 'bottom';
  className?: string;
}

export const TornPaperCollage: React.FC<TornDividerProps> = ({
  fillColor,
  bgColor = 'transparent',
  position = 'bottom',
  className = '',
}) => {
  const isTop = position === 'top';

  return (
    <div
      className={`relative w-full overflow-hidden leading-none z-30 select-none pointer-events-none ${
        isTop ? '-top-1' : '-bottom-1'
      } ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`w-full h-16 sm:h-20 md:h-28 lg:h-36 block ${
          isTop ? 'transform rotate-180' : ''
        }`}
        style={{ fill: fillColor }}
      >
        {/* Trazo detallado, roto, rasgado y texturizado de papel artesanal rasgado a mano */}
        <path d="M0,0 
          L0,35 
          Q25,65 50,30 
          T95,55 
          Q125,15 160,45 
          T215,25 
          Q255,75 290,38 
          T345,62 
          Q385,20 420,48 
          T475,32 
          Q515,70 550,40 
          T610,65 
          Q645,18 680,50 
          T735,28 
          Q775,72 810,42 
          T865,60 
          Q905,22 940,52 
          T995,30 
          Q1035,76 1070,44 
          T1125,62 
          Q1165,15 1200,48 
          T1255,35 
          Q1295,68 1330,40 
          T1385,58 
          Q1415,25 1440,45 
          L1440,120 
          L0,120 Z" 
        />
        {/* Segunda capa tenue de fibra de papel para mayor realismo artesanal */}
        <path
          opacity="0.25"
          d="M0,15 
          Q30,45 65,20 
          T130,42 
          Q180,68 220,35 
          T310,50 
          Q360,18 410,42 
          T500,28 
          Q560,65 605,38 
          T700,55 
          Q750,22 800,48 
          T890,32 
          Q950,68 995,40 
          T1090,56 
          Q1140,20 1190,45 
          T1280,30 
          Q1340,65 1385,38 
          L1440,25 
          L1440,120 
          L0,120 Z"
        />
      </svg>
    </div>
  );
};
