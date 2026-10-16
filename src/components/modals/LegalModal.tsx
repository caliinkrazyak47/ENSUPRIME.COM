import React from 'react';
import { X, ShieldCheck, FileText, Cookie } from 'lucide-react';

export type LegalModalType = 'terms' | 'privacy' | 'cookies' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#0E0918] text-[#EDE8E3] rounded-3xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Cabecera elegante estilo Messi.com */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#6E1FE8]/30 border border-[#6E1FE8]/50 flex items-center justify-center text-[#C0D43E]">
              {type === 'terms' && <FileText className="w-5 h-5" />}
              {type === 'privacy' && <ShieldCheck className="w-5 h-5" />}
              {type === 'cookies' && <Cookie className="w-5 h-5" />}
            </span>
            <div>
              <h3 className="font-impact text-xl sm:text-2xl uppercase tracking-wider text-white">
                {type === 'terms' && 'TÉRMINOS Y CONDICIONES'}
                {type === 'privacy' && 'POLÍTICA DE PRIVACIDAD'}
                {type === 'cookies' && 'POLÍTICA DE COOKIES'}
              </h3>
              <p className="text-[10px] font-mono-code text-white/50 uppercase tracking-widest">
                ENSUPRIME LEGAL // ACTUALIZADO 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#6E1FE8] text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido con scroll elegante */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-white/80 font-body leading-relaxed">
          {/* Identificación de la compañía legal */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-mono-code space-y-1.5 text-white/90">
            <p className="text-[#C0D43E] font-bold uppercase tracking-wider">Aviso Legal e Identificación</p>
            <p>
              Esta web pertenece a <strong className="text-white">ENSUPRIME S.L.</strong>, compañía española con Código de Identificación Fiscal (C.I.F) <strong className="text-white">B-67894215</strong>, inscrita en el Registro Mercantil de Barcelona en el Tomo 41.224, Folio 191, Sección General, Hoja 383226, Inscripción I/A 1.
            </p>
            <p>Sede Social: Gran Vía, 32, 28013 Madrid / Contacto: legal@ensuprime.com</p>
          </div>

          {type === 'terms' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base uppercase font-mono-code">1. Objeto y Ámbito de Aplicación</h4>
              <p>
                El acceso y utilización del portal ENSUPRIME atribuye la condición de usuario e implica la aceptación plena de las presentes condiciones generales de uso. Estas condiciones regulan el acceso, navegación y uso de los contenidos multimedia, señales de streaming y servicios interactivos.
              </p>
              <h4 className="font-bold text-white text-base uppercase font-mono-code">2. Propiedad Intelectual e Industrial</h4>
              <p>
                Todos los contenidos, diseños, elementos gráficos, logotipos, marcas, audios, emisiones de radio y video son titularidad de ENSUPRIME o de sus legítimos licenciantes. Queda prohibida la reproducción, distribución, comunicación pública o transformación sin autorización previa por escrito.
              </p>
              <h4 className="font-bold text-white text-base uppercase font-mono-code">3. Responsabilidad</h4>
              <p>
                ENSUPRIME no se hace responsable de las interrupciones del servicio derivadas de causas ajenas o de enlaces a plataformas de terceros (YouTube, Instagram, TikTok, Fourvenues).
              </p>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base uppercase font-mono-code">1. Tratamiento de Datos Personales</h4>
              <p>
                De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), le informamos que los datos facilitados a través de nuestros formularios o suscripciones a boletines serán tratados por ENSUPRIME S.L. como responsable del tratamiento.
              </p>
              <h4 className="font-bold text-white text-base uppercase font-mono-code">2. Finalidad y Legitimación</h4>
              <p>
                La recogida y tratamiento tiene por finalidad la gestión de suscripciones exclusivas, notificaciones de eventos y respuesta a solicitudes de contacto. La base jurídica del tratamiento es el consentimiento expreso del usuario.
              </p>
              <h4 className="font-bold text-white text-base uppercase font-mono-code">3. Derechos del Usuario</h4>
              <p>
                Puede ejercer sus derechos de acceso, rectificación, supresión, limitación y oposición remitiendo una solicitud firmada con copia de su documento de identidad a legal@ensuprime.com o a nuestra sede social.
              </p>
            </div>
          )}

          {type === 'cookies' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base uppercase font-mono-code">1. ¿Qué son las Cookies?</h4>
              <p>
                Una cookie es un pequeño archivo que se almacena en el dispositivo del usuario al navegar por determinadas páginas web para recordar sus preferencias de navegación y permitir la reproducción multimedia eficiente.
              </p>
              <h4 className="font-bold text-white text-base uppercase font-mono-code">2. Cookies que Utilizamos</h4>
              <ul className="list-disc list-inside space-y-1 pl-2 text-white/70">
                <li><strong className="text-white">Cookies técnicas estrictamente necesarias:</strong> Permiten el funcionamiento del reproductor de audio/video y preferencias de volumen.</li>
                <li><strong className="text-white">Cookies analíticas:</strong> Recopilan datos anónimos sobre el tráfico y uso para mejorar la experiencia.</li>
              </ul>
              <h4 className="font-bold text-white text-base uppercase font-mono-code">3. Gestión y Desactivación</h4>
              <p>
                El usuario puede configurar su navegador en cualquier momento para rechazar o eliminar cookies a través del panel de ajustes de su navegador web (Chrome, Safari, Firefox, Edge).
              </p>
            </div>
          )}
        </div>

        {/* Pie de modal */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <span className="text-[11px] font-mono-code text-white/40">ENSUPRIME S.L. · C.I.F B-67894215</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#6E1FE8] hover:bg-[#5815BD] text-white text-xs font-mono-code font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
};
