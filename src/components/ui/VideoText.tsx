import React, { useEffect, useRef, useState } from 'react';

export interface VideoTextProps {
  src?: string;
  text?: string;
  className?: string;
}

// UMBRALES DE COLOR (Luma Keying / Eliminación de fondo blanco):
// T0: por debajo de este valor de oscuridad, el pixel es 100% transparente (blanco puro)
// T1: por encima de este valor de oscuridad, el pixel es 100% opaco (líquido de color)
const T0 = 14;
const T1 = 80;

// Margen en segundos antes del final del video para reiniciar suavemente sin interrupciones del reproductor
const LOOP_SAFETY_MARGIN = 0.08;

export const VideoText: React.FC<VideoTextProps> = ({
  src = 'https://res.cloudinary.com/v47hsuhi/video/upload/v1791999461/Animar_liquido_medida_16_9_20261014193629.mp4',
  text = 'ENSUPRIME',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  // 1. Esperar a que la fuente Anton esté 100% cargada
  useEffect(() => {
    if (document.fonts && document.fonts.load) {
      document.fonts.load('100px Anton').then(() => {
        setFontLoaded(true);
      }).catch(() => {
        setFontLoaded(true);
      });
    } else {
      setFontLoaded(true);
    }
  }, []);

  // 2. Control de reproducción de video y bucle Canvas
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((err) => {
        console.warn('Video auto-reproducción rechazada o en espera:', err);
      });
    }
  }, [src]);

  // 3. Render loop con requestAnimationFrame
  useEffect(() => {
    if (!fontLoaded) return;

    const canvas = canvasRef.current;
    const h1 = textRef.current;
    const video = videoRef.current;
    if (!canvas || !h1 || !video) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    // Canvas fuera de pantalla para retener el último fotograma válido y evitar cualquier parpadeo en el salto de bucle
    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
    let hasRenderedValidFrame = false;

    const updateCanvasSize = () => {
      const rect = h1.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const targetWidth = Math.round(rect.width * dpr);
      const targetHeight = Math.round(rect.height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        offscreenCanvas.width = targetWidth;
        offscreenCanvas.height = targetHeight;
      }
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(h1);

    const render = () => {
      if (!isRunning) return;

      // Loop sin parpadeos: si el video se acerca al final exacto de su duración, se rebobina suavemente
      if (video.duration && video.duration > 0.5) {
        if (video.currentTime >= video.duration - LOOP_SAFETY_MARGIN) {
          video.currentTime = 0.01;
        }
      }

      if (canvas.width > 0 && canvas.height > 0) {
        const rect = h1.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(h1);
        const baseFontSize = parseFloat(computedStyle.fontSize) || 100;
        const scale = rect.width > 0 ? canvas.width / rect.width : 1;
        const fontSizePx = baseFontSize * scale;

        // Comprobar si el video tiene fotograma activo disponible
        const isVideoActive =
          video.readyState >= 2 &&
          video.videoWidth > 0 &&
          video.videoHeight > 0 &&
          !video.seeking;

        if (isVideoActive && offscreenCtx) {
          const vWidth = video.videoWidth;
          const vHeight = video.videoHeight;
          const cWidth = canvas.width;
          const cHeight = canvas.height;

          const hRatio = cWidth / vWidth;
          const vRatio = cHeight / vHeight;
          const coverRatio = Math.max(hRatio, vRatio);

          const drawWidth = vWidth * coverRatio;
          const drawHeight = vHeight * coverRatio;
          const drawX = (cWidth - drawWidth) / 2;
          const drawY = (cHeight - drawHeight) / 2;

          // Dibujar en el canvas offscreen
          offscreenCtx.clearRect(0, 0, cWidth, cHeight);
          offscreenCtx.drawImage(video, drawX, drawY, drawWidth, drawHeight);

          // Clavear fondo blanco: min(R,G,B) para calcular transparencia del blanco
          try {
            const imgData = offscreenCtx.getImageData(0, 0, cWidth, cHeight);
            const data = imgData.data;
            const len = data.length;
            const diff = T1 - T0;

            for (let i = 0; i < len; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const m = Math.min(r, g, b); // Blanco = 255, oscuro = cercano a 0

              const val = ((255 - m - T0) * 255) / diff;
              const alpha = val < 0 ? 0 : val > 255 ? 255 : val;

              data[i + 3] = alpha;
            }
            offscreenCtx.putImageData(imgData, 0, 0);
          } catch (e) {
            // Manejo de restricción de CORS
          }

          // Recorte vectorial usando la tipografía "Anton" centrada
          offscreenCtx.globalCompositeOperation = 'destination-in';
          offscreenCtx.font = `${fontSizePx}px 'Anton', Impact, 'Arial Narrow', sans-serif`;
          offscreenCtx.textAlign = 'center';
          offscreenCtx.textBaseline = 'alphabetic';

          const metrics = offscreenCtx.measureText(text);
          const ascent = metrics.actualBoundingBoxAscent || fontSizePx * 0.75;
          const descent = metrics.actualBoundingBoxDescent || fontSizePx * 0.2;
          const textCenterY = cHeight / 2 + (ascent - descent) / 2;

          offscreenCtx.fillStyle = '#FFFFFF';
          offscreenCtx.fillText(text, cWidth / 2, textCenterY);
          offscreenCtx.globalCompositeOperation = 'source-over';

          // Volcar inmediatamente al canvas visible
          ctx.clearRect(0, 0, cWidth, cHeight);
          ctx.drawImage(offscreenCanvas, 0, 0);
          hasRenderedValidFrame = true;
        } else if (hasRenderedValidFrame && offscreenCanvas.width > 0) {
          // Si el reproductor está reiniciando el bucle o en 'seeking', mantenemos el último fotograma sin parpadeo negro/blanco
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(offscreenCanvas, 0, 0);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [fontLoaded, text]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* 1. Video oculto (fuente para el canvas) */}
      <video
        ref={videoRef}
        src={src}
        crossOrigin="anonymous"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute opacity-0 pointer-events-none w-[1px] h-[1px] -z-50"
        aria-hidden="true"
      />

      {/* 2. H1 real accesible y con tamaño exacto (color: transparent) */}
      <h1
        ref={textRef}
        className="font-impact text-[14vw] sm:text-[16vw] md:text-[18vw] leading-none tracking-normal uppercase whitespace-nowrap block select-none pointer-events-none"
        style={{
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
        }}
      >
        {text}
      </h1>

      {/* 3. Canvas superpuesto exactamente encima donde se pinta el líquido sin fondo blanco y sin parpadeos */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default VideoText;
