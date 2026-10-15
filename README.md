# 🌌 ENSUPRIME — Studio de Innovación Digital 3D & Craft de Élite

Experiencia web inmersiva de nivel **Awwwards Site of the Day** / **MotionSites**, desarrollada con WebGL en tiempo real, shaders de deformación orgánica, seguimiento de cursor (cursor tracking), tipografía monumental editorial y smooth scrolling cinemático continuo a 60 FPS.

Inspirada en el estilo y sofisticación técnica de referencias punteras como [thiagovsc.es](https://thiagovsc.es) y estudios creativos galardonados.

---

## 🛠️ Stack Tecnológico de Alto Rendimiento

- **Motor 3D / WebGL**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Shaders & Materiales**: `MeshDistortMaterial`, campos de partículas estelares volumétricos y anillos giroscópicos con luz emisiva reactiva.
- **Microinteracciones y Animación**: [GSAP](https://gsap.com/) para secuencias y revelación de tipografía; [Lenis](https://lenis.darkroom.engineering/) para desplazamiento inercial continuo.
- **Tipografía Editorial**: Syne, Space Grotesk, Plus Jakarta Sans y JetBrains Mono.
- **Framework & Estilos**: React 19 + TypeScript + Vite + Tailwind CSS v4 con efecto de grano cinemático y glassmorphism.

---

## 🚀 Cómo Iniciar el Proyecto

Abre una terminal en esta carpeta (`C:\Users\deeza\Desktop\ensuprime\ensuprime`):

```bash
# 1. Iniciar el servidor de desarrollo
npm run dev

# 2. Compilar para producción
npm run build

# 3. Previsualizar la versión de producción
npm run preview
```

El servidor local se abrirá en `http://localhost:5173`.

---

## 💎 Características Principales Implementadas

1. **Cursor Tracking 3D en Tiempo Real**: El núcleo tridimensional orbita y se deforma suavemente respondiendo a la posición del ratón mediante interpolación física (lerp).
2. **Capas y Profundidad Awwwards**: Superposición de tipografía monumental sobre el lienzo WebGL con modos de mezcla y contrastes editoriales.
3. **Smooth Scroll Lenis**: Desplazamiento ultra fluido sin tirones a 60 FPS con soporte para rueda de ratón y gestos táctiles móviles.
4. **Custom Cursor Magnético**: Puntero interactivo de doble capa con física elástica que reacciona a los botones y elementos clicables.
5. **Showcase Interactivo**: Selector cinemático de proyectos con panel flotante de especificaciones y render interactivo.
6. **Mobile Ready**: Detección de punteros gruesos/táctiles para animar de forma autónoma en bucle sin exigir tracking de puntero inexistente.
