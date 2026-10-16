import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { PremiumPreloader } from './components/layout/PremiumPreloader';
import { FilmbotTopMarquee } from './components/layout/FilmbotTopMarquee';
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
import { FlaixBottomPlayer } from './components/radio/FlaixBottomPlayer';
import { EventAnnouncementModal } from './components/modals/EventAnnouncementModal';

export default function App() {
  const [isFullscreenTv, setIsFullscreenTv] = useState<boolean>(false);
  const [isReelModalOpen, setIsReelModalOpen] = useState<boolean>(false);
  const [isTikTokModalOpen, setIsTikTokModalOpen] = useState<boolean>(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState<boolean>(false);

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

  const handleWatchLive = () => {
    const tvSection = document.getElementById('tv');
    if (tvSection) {
      tvSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#EDE8E3] text-[#3B0764] selection:bg-[#6E1FE8] selection:text-white overflow-x-hidden font-body w-full editorial-grain">
      {/* 0. PRELOADER CINEMATOGRÁFICO DE ENSUPRIME (CONSERVADO EXACTAMENTE COMO ESTÁ) */}
      <PremiumPreloader onComplete={() => setIsPreloaderDone(true)} />

      {/* CURSOR MAGNÉTICO PERSONALIZADO (AWWWARDS TIER) */}
      <CustomCursor />

      {/* BARRA SUPERIOR MARQUEE DE NOTICIAS (ESTILO FILMBOT: RSS ESPAÑA & FÚTBOL) */}
      <FilmbotTopMarquee />

      {/* CONTENIDO PRINCIPAL FULL-WIDTH EDGE-TO-EDGE */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* 1. NUEVA SECCIÓN HÉROE INTERACTIVA (CONTROL DE MIRADA CON EL MOUSE) */}
        <InteractiveCharacterHero
          onWatchLive={handleWatchLive}
        />

        {/* CINTA TICKER EN PÚRPURA */}
        <PremiumTicker />

        {/* 2. TV ONLINE EN BLOQUE MORADO CON ESTRELLAS Y TARJETA FLOTANTE */}
        <PremiumTVSection onFullscreenChange={setIsFullscreenTv} />

        {/* ONDA LÍQUIDA FLUIDA DE CRENCY AGENCY */}
        <LiquidDripDivider fillColor="#FFFFFF" bgColor="#6E1FE8" />

        {/* 3. TIKTOK FEED EN BLOQUE BLANCO LIMPIO */}
        <PremiumTikTokSection onModalOpen={setIsTikTokModalOpen} />

        {/* ONDA LÍQUIDA FLUIDA DE CRENCY AGENCY */}
        <LiquidDripDivider fillColor="#6E1FE8" bgColor="#FFFFFF" />

        {/* 4. COVER STORY EN BLOQUE MORADO VIBRANTE */}
        <PremiumTalentSection />

        {/* ONDA LÍQUIDA FLUIDA DE CRENCY AGENCY */}
        <LiquidDripDivider fillColor="#FFFFFF" bgColor="#6E1FE8" />

        {/* 5. INSTA FEED EN FORMATO TARJETAS LA MEGA EN BLOQUE BLANCO */}
        <PremiumInstaFeedSection onModalOpen={setIsReelModalOpen} />

        {/* CURVA LÍQUIDA FLUIDA DE CRENCY AGENCY: DE BLANCO A MORADO */}
        <LiquidDripDivider fillColor="#6E1FE8" bgColor="#FAFAFA" />

        {/* 6. AGENDA DE SHOWS EN BLOQUE MORADO */}
        <PremiumEventsSection />

        {/* CURVA LÍQUIDA FLUIDA DE CRENCY AGENCY: DE MORADO A FOOTER BLANCO LIMPIO */}
        <LiquidDripDivider fillColor="#FFFFFF" bgColor="#6E1FE8" />
      </main>

      {/* 6. FOOTER EN CONTRASTE NEGRO TINTA */}
      <div className="pb-20 md:pb-24">
        <PremiumFooter />
      </div>

      {/* 7. REPRODUCTOR DE RADIO EN BARRA INFERIOR CON FLECHA DESPLEGABLE (MODELO FLAIX FM) */}
      <FlaixBottomPlayer
        isHidden={isFullscreenTv || isReelModalOpen || isTikTokModalOpen}
      />

      {/* 8. MODAL CARTEL / POPUP ANUNCIO ESTILO CARDI B (SE ABRE TRAS TERMINAR EL PRELOADER) */}
      <EventAnnouncementModal isReady={isPreloaderDone} />
    </div>
  );
}
