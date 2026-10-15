import React from 'react';

export const TornPaperDivider: React.FC<{ flip?: boolean; colorFrom?: string; colorTo?: string }> = ({
  flip = false,
  colorFrom = "#6E1FE8",
  colorTo = "#FFFFFF",
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none z-20 ${
        flip ? 'transform rotate-180 -mt-1' : '-mb-1'
      }`}
      style={{ backgroundColor: colorFrom }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-12 sm:h-16 md:h-20"
        style={{ fill: colorTo }}
      >
        {/* Trazo dentado y orgánico de papel rasgado estilo collage */}
        <path d="M0,0 L0,40 Q30,65 60,35 Q90,75 120,40 Q150,70 180,30 Q210,60 240,45 Q270,80 300,35 Q330,65 360,40 Q390,75 420,30 Q450,70 480,45 Q510,80 540,35 Q570,65 600,40 Q630,75 660,30 Q690,70 720,45 Q750,85 780,35 Q810,65 840,40 Q870,75 900,30 Q930,70 960,45 Q990,80 1020,35 Q1050,65 1080,40 Q1110,75 1140,35 Q1170,70 1200,40 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
};
