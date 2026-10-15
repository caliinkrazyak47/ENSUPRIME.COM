---
name: hankthetank-creative-dev
description: Metodología técnica y patrones de diseño/animación avanzados inspirados en @HankTheTankCoding para la creación de experiencias web Awwwards-level con Three.js, WebGL, shaders, física de scroll interactiva y GSAP.
---

# HankTheTank Creative Dev & Awwwards Engineering System

Esta skill codifica los principios, arquitectura y fórmulas exactas de desarrollo creativo utilizadas por **HankTheTank** (`@HankTheTankCoding`) para construir webs inmersivas, galardonadas y cinemáticas.

---

## 1. Principios Fundamentales de Ingeniería Creativa

### A. Animación Basada en Física e Inercia (Lerp & Momentum)
- **Prohibido:** Animaciones CSS rígidas `ease-in-out` o movimientos lineales sin resistencia física.
- **Regla:** Todo movimiento continuo en pantalla debe calcularse mediante interpolación lineal (**LERP**) en el render loop (`requestAnimationFrame` o `gsap.ticker`):
  ```js
  current += (target - current) * ease; // ease recomendado: 0.075 a 0.14
  ```
- **Velocidad Reactiva:** Medir continuamente el diferencial de desplazamiento `delta = target - current` y utilizar esa velocidad para:
  1. Inclinar elementos en el eje X/Y (`skewX`, `skewY` de máx 4deg a 8deg).
  2. Modificar la escala dinámica de imágenes (`scale = 1 + Math.min(Math.abs(delta) * 0.001, 0.15)`).
  3. Alimentar uniforms de distorsión en shaders WebGL.

---

## 2. WebGL + Three.js: Integración Híbrida con el DOM

### A. Mapeo DOM a Canvas WebGL (Three.js Screen-Space Overlay)
- Un único `<canvas>` con `position: fixed; inset: 0; pointer-events: none; z-index: 1;`.
- La cámara ortográfica o de perspectiva se calibra para que 1 unidad de Three.js equivalga exactamente a 1 píxel de pantalla:
  ```js
  camera.fov = (180 * (2 * Math.atan(window.innerHeight / 2 / distance))) / Math.PI;
  ```
- Cada imagen o tarjeta del DOM tiene una malla correspondiente (`THREE.PlaneGeometry`) sincronizada con `getBoundingClientRect()`.

### B. Vertex Shaders con Deformación Gelatina / Jelly Scroll
Cuando el usuario hace scroll rápido o arrastra una galería, el plano 3D se curva en Z según la velocidad y posición de la pantalla:
```glsl
uniform float uSpeed;
uniform vec2 uViewportSizes;

varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 newPosition = position;
  // Curvatura parabólica reactiva al scroll
  newPosition.z += sin(newPosition.y / uViewportSizes.y * 3.14159) * uSpeed * 25.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
```

### C. Fragment Shaders con Distorsión Líquida en Hover
Hover interactivo sobre fotos o banners mediante mapas de desplazamiento o funciones de ruido:
```glsl
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform float uHoverProgress;
varying vec2 vUv;

void main() {
  vec4 disp = texture2D(uDisplacement, vUv);
  vec2 distortedUv = vUv + vec2(disp.r * 0.1 * uHoverProgress);
  gl_FragColor = texture2D(uTexture, distortedUv);
}
```

---

## 3. Dinámica del Cursor Magnético y Microinteracciones

### A. Cursor Cinético Bicomponente
1. **Dot Central Instantáneo:** Posicionado con coordenadas exactas del ratón sin retraso (`gsap.set`).
2. **Halo / Follower Elástico:** Posicionado con GSAP ticker y lerp elástico (resorte de masa suave).
3. **Deformación por Vector de Movimiento:** Al mover el ratón rápidamente, el cursor se aplana y rota en la dirección del vector `atan2(vy, vx)`.

### B. Magnetismo en Botones y Tarjetas
Cuando el cursor entra en el radio de influencia (umbral de 60-100px) de un botón interactivo:
```js
const rect = button.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

if (dist < 80) {
  gsap.to(button, {
    x: (e.clientX - centerX) * 0.35,
    y: (e.clientY - centerY) * 0.35,
    duration: 0.3,
    ease: "power2.out"
  });
}
```

---

## 4. Tipografía Monumental & SplitText Revelations

- **Efecto Máscara Inset:**
  ```css
  .line-mask {
    overflow: hidden;
    display: block;
  }
  .line-inner {
    transform: translateY(110%) rotateX(15deg);
    transform-origin: bottom center;
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  ```
- **Contraste de Fuentes:**
  - Titular primario gigante en Display Sans brutal/geométrica (Clash Display, Syne, Monument).
  - Palabra de quiebre lírico/poético en Serif itálica ultra contrastada (Instrument Serif, PP Editorial New).
  - Metadatos milimétricos en monoespaciada (JetBrains Mono) con mayúsculas y etiquetas de coordenadas.

---

## 5. Galerías Cilíndricas y 3D Infinite Helix Scroll

- Elementos dispuestos matemáticamente en un cilindro o espiral helicoidal mediante ecuaciones trigonométricas:
  ```js
  const angle = (index / totalItems) * Math.PI * 2 + scrollOffset;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  mesh.position.set(x, y, z);
  mesh.rotation.y = angle;
  ```
- Inmersión profunda: el elemento activo al frente se escala a tamaño completo, mientras los elementos traseros se desvanecen en niebla (fog) y reducen su opacidad.

---

## 6. Checklist de Calidad "HankTheTank / Awwwards"

- [ ] ¿Hay scroll suave o inercia elástica (Lenis + Lerp)?
- [ ] ¿Hay deformación de imagen o skew tipográfico ligado a la velocidad de scroll?
- [ ] ¿El cursor es interactivo, magnético y responde con etiquetas contextuales?
- [ ] ¿Las transiciones de entrada utilizan máscaras `overflow: hidden` o `clip-path` escalonadas?
- [ ] ¿Los botones tienen arquitectura anidada y respuesta háptica elástica (`active:scale-[0.97]`)?
- [ ] ¿El fondo cuenta con textura analógica continua (grano/noise) a 60 FPS sin degradar la GPU?
