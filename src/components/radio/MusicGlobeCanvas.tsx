import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { CountryGroup } from '../../data/radioStations';

interface MusicGlobeCanvasProps {
  countries: CountryGroup[];
  activeCountry: CountryGroup;
  onSelectCountry: (country: CountryGroup) => void;
  isPlaying: boolean;
}

// Convert Lat/Lng to 3D Cartesian coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const MusicGlobeCanvas: React.FC<MusicGlobeCanvasProps> = ({
  countries,
  activeCountry,
  onSelectCountry,
  isPlaying,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeCountryRef = useRef(activeCountry);
  activeCountryRef.current = activeCountry;

  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 270);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Group for entire globe rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const GLOBE_RADIUS = 92;

    // 1. Texturas de Continentes Reales de la Tierra y Luces Nocturnas
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('/textures/earth_atmos.jpg');
    earthMap.colorSpace = THREE.SRGBColorSpace;

    const earthLights = textureLoader.load('/textures/earth_lights.png');

    // Globo con continentes visibles nítidos en modo oscuro/neón
    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
      map: earthMap,
      roughness: 0.7,
      metalness: 0.1,
      color: 0x908bb0, // Tinte sutil cyberpunk violeta-azul para que los continentes se vean definidos
      emissiveMap: earthLights,
      emissive: new THREE.Color(0xa855f7),
      emissiveIntensity: 0.65,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globeMesh);

    // 2. Atmósfera exterior luminosa (glow rim)
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 48, 48);
    const atmosMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0x9333ea) },
        viewVector: { value: camera.position },
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.65 - dot(vNormal, vNormel), 2.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          gl_FragColor = vec4(glowColor, intensity * 0.45);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // 3. Balizas de Países Luminosas e Interactivas
    const countryMarkers: {
      mesh: THREE.Mesh;
      ring: THREE.Mesh;
      labelCanvas: THREE.Sprite;
      country: CountryGroup;
    }[] = [];
    const interactiveObjects: THREE.Object3D[] = [];

    // Helper para generar sprite con bandera y nombre de país
    const createCountryLabel = (country: CountryGroup) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 84;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(10, 7, 19, 0.85)';
        ctx.roundRect(8, 8, 240, 68, 16);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#A855F7';
        ctx.stroke();

        ctx.font = 'bold 26px sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${country.flag} ${country.country}`, 128, 42);
      }
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(22, 7.2, 1);
      return sprite;
    };

    countries.forEach((cg) => {
      const pos = latLngToVector3(cg.lat, cg.lng, GLOBE_RADIUS * 1.01);

      // Baliza central (Pin esférico)
      const pinGeo = new THREE.SphereGeometry(3.2, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xa855f7),
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      pinMesh.userData = { country: cg };

      // Anillo de ondas concéntricas
      const ringGeo = new THREE.RingGeometry(4.5, 6.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xa855f7),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.002));
      ringMesh.lookAt(pos.clone().multiplyScalar(2));

      // Etiqueta flotante con Bandera y Nombre
      const label = createCountryLabel(cg);
      label.position.copy(pos.clone().multiplyScalar(1.12));
      globeGroup.add(label);

      globeGroup.add(pinMesh);
      globeGroup.add(ringMesh);

      countryMarkers.push({ mesh: pinMesh, ring: ringMesh, labelCanvas: label, country: cg });
      interactiveObjects.push(pinMesh);
    });

    // 4. Arcos de Conexión entre Madrid (España) y los demás países
    const spainCountry = countries.find((c) => c.countryCode === 'ES') || countries[0];
    const spainPos = latLngToVector3(spainCountry.lat, spainCountry.lng, GLOBE_RADIUS * 1.01);

    countries.forEach((cg) => {
      if (cg.countryCode === spainCountry.countryCode) return;
      const destPos = latLngToVector3(cg.lat, cg.lng, GLOBE_RADIUS * 1.01);

      const mid = spainPos.clone().add(destPos).multiplyScalar(0.5);
      const dist = spainPos.distanceTo(destPos);
      mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.01 + dist * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(spainPos, mid, destPos);
      const arcPoints = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(0xa855f7),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);
    });

    // 5. Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(250, 120, 200);
    scene.add(sunLight);

    const purpleLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    purpleLight.position.set(-200, 100, -150);
    scene.add(purpleLight);

    // Calcular rotación para enfocar el país seleccionado
    const rotateToCountry = (c: CountryGroup) => {
      // Longitud rota en Y, Latitud rota en X
      const targetY = -(c.lng * (Math.PI / 180)) - Math.PI / 2;
      const targetX = c.lat * (Math.PI / 180) * 0.5;
      targetRotationRef.current = { x: targetX, y: targetY };
    };

    rotateToCountry(activeCountry);

    // 6. Controles de Arrastre y Selección de País
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let autoRotate = true;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      autoRotate = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
      rotationVelocityX = 0;
      rotationVelocityY = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        prevMouseX = clientX;
        prevMouseY = clientY;

        rotationVelocityX = deltaX * 0.005;
        rotationVelocityY = deltaY * 0.005;

        globeGroup.rotation.y += rotationVelocityX;
        globeGroup.rotation.x += rotationVelocityY;
      }
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      isDragging = false;

      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const selected = intersects[0].object.userData.country as CountryGroup;
        if (selected) {
          onSelectCountry(selected);
          rotateToCountry(selected);
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    dom.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    dom.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Redimensionamiento responsivo
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animación continua y pulsación del país activo
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inercia o auto-rotación si no se arrastra
      if (!isDragging) {
        if (autoRotate) {
          globeGroup.rotation.y += isPlaying ? 0.0035 : 0.0015;
        } else {
          rotationVelocityX *= 0.93;
          rotationVelocityY *= 0.93;
          globeGroup.rotation.y += rotationVelocityX;
          globeGroup.rotation.x += rotationVelocityY;

          if (Math.abs(rotationVelocityX) < 0.0001 && Math.abs(rotationVelocityY) < 0.0001) {
            autoRotate = true;
          }
        }
      }

      // Iluminar y hacer palpitar intensamente el país activo
      const currentActive = activeCountryRef.current;
      countryMarkers.forEach(({ mesh, ring, labelCanvas, country }) => {
        const isActive = country.countryCode === currentActive.countryCode;
        if (isActive) {
          const pulse = 1 + Math.sin(elapsedTime * 7) * 0.45;
          mesh.scale.set(pulse * 1.6, pulse * 1.6, pulse * 1.6);
          (mesh.material as THREE.MeshBasicMaterial).color.setHex(0xe879f9); // Rosa/Púrpura neón intenso

          ring.scale.set(pulse * 2.2, pulse * 2.2, pulse * 2.2);
          (ring.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(elapsedTime * 7) * 0.4;
          (ring.material as THREE.MeshBasicMaterial).color.setHex(0xa855f7);

          labelCanvas.scale.set(26, 8.5, 1);
        } else {
          mesh.scale.set(1, 1, 1);
          (mesh.material as THREE.MeshBasicMaterial).color.setHex(0xa855f7);

          ring.scale.set(1, 1, 1);
          (ring.material as THREE.MeshBasicMaterial).opacity = 0.25;

          labelCanvas.scale.set(20, 6.5, 1);
        }
      });

      atmosMat.uniforms.viewVector.value = camera.position;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      dom.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      dom.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      earthMap.dispose();
      earthLights.dispose();
    };
  }, [countries, onSelectCountry, isPlaying]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] md:min-h-[500px] cursor-grab active:cursor-grabbing relative flex items-center justify-center overflow-hidden"
    />
  );
};
