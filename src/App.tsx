import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { PremiumPreloader } from './components/layout/PremiumPreloader';
import { CustomCursor } from './components/layout/CustomCursor';
import { InteractiveCharacterHero } from './components/hero/InteractiveCharacterHero';
import { PremiumTicker } from './components/sections/PremiumTicker';
import { LiquidDripDivider } from './components/layout/LiquidDripDivider';
import { PremiumTVSection } from './components/sections/PremiumTVSection';
import { PremiumTikTokSection } from './components/sections/PremiumTikTokSection';
import { PremiumTalentSection } from './components/sections/PremiumTalentSection';
import { PremiumInstaFeedSection } from './components/sections/PremiumInstaFeedSection';
import { PremiumEventsSection } from './components/sections/PremiumEventsSection';
import { PremiumFooter } from './components/layout/PremiumFooter';
import { RadioFloatingModal } from './components/radio/RadioFloatingModal';

export default function App() {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isRadioModalOpen, setIsRadioModalOpen] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll continuous motion 60 FPS
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleToggleRadio = () => {
    setIsRadioModalOpen(true);
    setIsRadioPlaying(true);
  };

  const handleWatchLive = () => {
    const tvSection = document.getElementById('tv');
    if (tvSection) {
      tvSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#EDE8E3] text-[#110B1C] selection:bg-[#6E1FE8] selection:text-white overflow-x-hidden font-body w-full">
      {/* 0. PRELOADER CINEMATOGRÁFICO DE ENSUPRIME (CONSERVADO EXACTAMENTE COMO ESTÁ) */}
      <PremiumPreloader onComplete={() => {}} />

      {/* CURSOR MAGNÉTICO PERSONALIZADO (AWWWARDS TIER) */}
      <CustomCursor />

      {/* CONTENIDO PRINCIPAL FULL-WIDTH EDGE-TO-EDGE */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* 1. NUEVA SECCIÓN HÉROE INTERACTIVA (CONTROL DE MIRADA CON EL MOUSE) */}
        <InteractiveCharacterHero
          onWatchLive={handleWatchLive}
          isRadioPlaying={isRadioPlaying}
          onToggleRadio={handleToggleRadio}
        />

        {/* CINTA TICKER EN PÚRPURA */}
        <PremiumTicker />

        {/* 2. TV ONLINE EN BLOQUE MORADO CON ESTRELLAS Y TARJETA FLOTANTE */}
        <PremiumTVSection />

        {/* ONDA LÍQUIDA FLUIDA DE CRENCY AGENCY */}
        <LiquidDripDivider fillColor="#FFFFFF" bgColor="#6E1FE8" />

        {/* 3. TIKTOK FEED EN BLOQUE BLANCO LIMPIO */}
        <PremiumTikTokSection />

        {/* ONDA LÍQUIDA FLUIDA DE CRENCY AGENCY */}
        <LiquidDripDivider fillColor="#6E1FE8" bgColor="#FFFFFF" />

        {/* 4. COVER STORY EN BLOQUE MORADO VIBRANTE */}
        <PremiumTalentSection />

        {/* ONDA LÍQUIDA FLUIDA DE CRENCY AGENCY */}
        <LiquidDripDivider fillColor="#FFFFFF" bgColor="#6E1FE8" />

        {/* 5. INSTA FEED EN FORMATO TARJETAS LA MEGA EN BLOQUE BLANCO */}
        <PremiumInstaFeedSection />

        {/* CURVA LÍQUIDA FLUIDA DE CRENCY AGENCY: DE BLANCO A MORADO */}
        <LiquidDripDivider fillColor="#6E1FE8" bgColor="#FAFAFA" />

        {/* 6. AGENDA DE SHOWS EN BLOQUE MORADO */}
        <PremiumEventsSection />

        {/* CURVA LÍQUIDA FLUIDA DE CRENCY AGENCY: DE MORADO AL FOOTER NEGRO */}
        <LiquidDripDivider fillColor="#110B1C" bgColor="#6E1FE8" />
      </main>

      {/* 6. FOOTER EN CONTRASTE NEGRO TINTA */}
      <PremiumFooter />

      {/* 7. VENTANA FLOTANTE 3D MUSIC GLOBE RADIO PLAYER */}
      <RadioFloatingModal
        isOpen={isRadioModalOpen}
        onClose={() => {
          setIsRadioModalOpen(false);
          setIsRadioPlaying(false);
        }}
      />
    </div>
  );
}
