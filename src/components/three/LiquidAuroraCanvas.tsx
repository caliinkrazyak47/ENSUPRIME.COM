import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const LiquidAuroraCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3.8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Shader personalizado: Flujo de mercurio líquido cromático con iridiscencia de lujo
    const vertexShader = `
      uniform float uTime;
      uniform float uScrollVelocity;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying float vElevation;

      // Simplex noise simplificado
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vUv = uv;
        vNormal = normal;
        vec3 pos = position;

        float noiseVal = snoise(vec3(pos.x * 0.8, pos.y * 0.8 + uTime * 0.25, uTime * 0.15));
        float elevation = noiseVal * 0.45;
        
        // Reacción elástica ultra viva a la inercia del scroll
        elevation += sin(pos.y * 3.14159) * uScrollVelocity * 1.5;

        pos.z += elevation;
        vElevation = elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying float vElevation;

      void main() {
        // Paleta de hiper-lujo:
        // Obsidiana violeta profundo (#0B0410), Ámbar/Oro imperial (#FFB300), Fucsia Neón (#FF007F), Cyan Esmeralda eléctrico (#00F0FF)
        vec3 deepObsidian = vec3(0.043, 0.015, 0.062);
        vec3 neonFuchsia = vec3(1.0, 0.0, 0.498);
        vec3 imperialGold = vec3(1.0, 0.702, 0.0);
        vec3 electricCyan = vec3(0.0, 0.941, 1.0);

        // Mezcla cromática por elevación y tiempo
        float t = vElevation * 2.2 + sin(vUv.x * 4.0 + uTime * 0.4) * 0.2;
        vec3 color = mix(deepObsidian, neonFuchsia, smoothstep(-0.3, 0.1, t));
        color = mix(color, imperialGold, smoothstep(0.1, 0.35, t));
        color = mix(color, electricCyan, smoothstep(0.35, 0.55, t));

        // Reflejo de luz especular perlada de alta gama
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
        color += vec3(1.0, 0.95, 0.85) * fresnel * 0.35;

        // Niebla luminosa translúcida
        float alpha = clamp(0.28 + abs(vElevation) * 0.65, 0.0, 0.65);
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const geometry = new THREE.PlaneGeometry(9, 6.5, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScrollVelocity: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let lastY = window.scrollY;
    let targetVelocity = 0;
    let currentVelocity = 0;

    const handleScroll = () => {
      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      targetVelocity = delta * 0.006;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;

      currentVelocity += (targetVelocity - currentVelocity) * 0.12;
      targetVelocity *= 0.9;
      material.uniforms.uScrollVelocity.value = currentVelocity;

      mesh.rotation.z = Math.sin(elapsed * 0.15) * 0.08;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] w-full h-full opacity-80 mix-blend-screen"
    />
  );
};
