import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const JellyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Escena, Cámara y Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Shaders de deformación fluida inspirados en HankTheTank
    const vertexShader = `
      uniform float uTime;
      uniform float uScrollSpeed;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying float vDistort;

      void main() {
        vUv = uv;
        vec3 pos = position;

        // Ondulación orgánica y deformación reactiva al scroll
        float wave = sin(pos.y * 2.5 + uTime * 1.5) * cos(pos.x * 2.0 + uTime * 1.2);
        float scrollWave = sin(pos.y * 3.14159) * uScrollSpeed * 1.8;
        
        pos.z += wave * 0.25 + scrollWave;
        vDistort = pos.z;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vDistort;

      void main() {
        // Acento rojo señal #FF2E1F fusionado con negro profundo y reflejo de luz
        vec3 darkColor = vec3(0.039, 0.039, 0.039);
        vec3 signalRed = vec3(1.0, 0.18, 0.12);
        vec3 boneWhite = vec3(0.93, 0.91, 0.87);

        float edge = smoothstep(0.0, 1.0, vUv.y);
        vec3 finalColor = mix(darkColor, signalRed, clamp(vDistort * 1.2 + 0.1, 0.0, 0.35));
        finalColor += boneWhite * clamp(vDistort * 0.4, 0.0, 0.15);

        // Alpha muy suave para funcionar como niebla cinemática de fondo
        float alpha = clamp(0.12 + abs(vDistort) * 0.5, 0.0, 0.45);
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const geometry = new THREE.PlaneGeometry(10, 8, 48, 48);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScrollSpeed: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Control de inercia y velocidad de scroll (Lerp Physics)
    let lastScrollY = window.scrollY;
    let targetSpeed = 0;
    let currentSpeed = 0;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      targetSpeed = delta * 0.005;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // Animación de loop continuo
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Lerp hacia la velocidad objetivo (inercia elástica)
      currentSpeed += (targetSpeed - currentSpeed) * 0.1;
      targetSpeed *= 0.92; // decaimiento
      material.uniforms.uScrollSpeed.value = currentSpeed;

      // Rotación sutil
      mesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-60"
    />
  );
};
