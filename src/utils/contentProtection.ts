// =========================================================================
// ENSUPRIME ANTI-SCRAPE & ASSET INTEGRITY SHIELD
// Bloquea clic derecho, inspeccionar elemento (F12, Ctrl+U, Ctrl+Shift+I/J/C),
// arrastrar o guardar imágenes y shortcuts de copia en todo el documento.
// =========================================================================

export function initContentProtection() {
  if (typeof window === 'undefined') return;

  // 1. Bloquear Clic Derecho (Context Menu) globalmente
  document.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, { capture: true });

  // 2. Bloquear Arrastre de Imágenes y Elementos multimedia (Drag & Drop)
  document.addEventListener('dragstart', (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, { capture: true });

  // 3. Bloquear Atajos de Teclado de Desarrollador y Guardado
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const isCtrlOrMeta = e.ctrlKey || e.metaKey;

    // F12 (DevTools)
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / Cmd+Opt+I (Inspeccionar)
    // Ctrl+Shift+J / Cmd+Opt+J (Consola)
    // Ctrl+Shift+C / Cmd+Opt+C (Selector de Elementos)
    if (isCtrlOrMeta && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+U (Ver Código Fuente)
    if (isCtrlOrMeta && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Guardar Página Web / Guardar como)
    if (isCtrlOrMeta && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+P / Cmd+P (Imprimir pantalla/página)
    if (isCtrlOrMeta && key === 'p') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 4. Bloquear copiado directo de código o assets (Copy Event) en toda la interfaz
  document.addEventListener('copy', (e: ClipboardEvent) => {
    // Si el usuario no está dentro de un input de texto legítimo, cancelar copiado
    const target = e.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
  }, { capture: true });

  // 5. Blindaje de Imágenes: Inyectar atributos preventivos y desactivar guardado táctil
  const secureImages = () => {
    const images = document.querySelectorAll<HTMLImageElement>('img');
    images.forEach((img) => {
      img.setAttribute('draggable', 'false');
      img.setAttribute('oncontextmenu', 'return false;');
      img.style.userSelect = 'none';
      img.style.webkitUserSelect = 'none';
      (img.style as any).webkitTouchCallout = 'none';
      (img.style as any).pointerEvents = 'auto';
    });
  };

  // Ejecución inicial y observador de mutaciones DOM para proteger imágenes cargadas dinámicamente
  secureImages();
  const observer = new MutationObserver(() => secureImages());
  observer.observe(document.body, { childList: true, subtree: true });
}
