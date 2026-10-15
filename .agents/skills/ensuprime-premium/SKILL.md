---
name: ensuprime-premium
description: Usar SIEMPRE que se diseñe o programe cualquier parte de ENSUPRIME.ES. Define la dirección de arte, el stack de animación y las prohibiciones anti-diseño-genérico.
---

# ENSUPRIME Premium Design System

## Prohibido (si aparece, rehazlo)
- Degradados morados/azules, glassmorphism por todas partes, blobs flotantes
- Fuente Inter, Roboto, Poppins o Arial
- Hero centrado con titular + 2 botones redondeados
- Cards idénticas en grid de 3 con iconos y sombra suave
- Emojis como iconos, iconos genéricos de librería sin personalizar
- Textos de relleno tipo "Bienvenido a nuestra plataforma", "Descubre", "Soluciones innovadoras"
- Animaciones fade-in-up iguales en todos los elementos

## Dirección de arte
- Editorial, cinematográfico, nivel Awwwards. Contraste brutal de escalas tipográficas.
- Paleta: Negro tinta #0A0A0A, Hueso #EDE8DF, Rojo señal #FF2E1F (solo acentos, máx 5% de la pantalla), Gris humo #6B6B6B
- Tipografía: Clash Display (Fontshare) para titulares gigantes, Instrument Serif itálica para palabras de contraste, General Sans para texto, JetBrains Mono para datos/contadores/etiquetas
- Grid de 12 columnas con asimetría intencionada, márgenes generosos, elementos que rompen el grid a propósito
- Grano/noise sutil sobre todo el sitio, cursor personalizado que reacciona a enlaces y vídeos
- Microdetalles: numeración 01/09, coordenadas, timestamps, etiquetas en mono mayúsculas

## Stack obligatorio
- Vite + HTML/CSS/JS vanilla (o React si se pide), sin Bootstrap ni plantillas
- GSAP + ScrollTrigger + SplitText para animación, Lenis para scroll suave
- Cada sección tiene SU propia animación de entrada, ninguna repetida
- 60fps: animar solo transform y opacity, will-change con cuidado, prefers-reduced-motion respetado

## Proceso
1. Antes de programar, escribe un plan de diseño corto por sección y revísalo: si algo parece la opción por defecto que haría cualquier IA, cámbialo y explica por qué.
2. Programa sección a sección, muéstrame cada una y espera feedback.
3. Al terminar, haz una autocrítica final contra la lista de "Prohibido"
