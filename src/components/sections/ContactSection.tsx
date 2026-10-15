import { useState } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-14 bg-[#111111] text-[#F4F1EC] border-b border-white/10">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono-code text-[11px] text-[#8D8D91]">
            <MessageSquare className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>// 09. BOOKING & BRAND PARTNERSHIPS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            CONECTA CON <br />
            <span className="text-[#8B5CF6]">LA PLATAFORMA</span>
          </h2>
          <p className="font-grotesk text-sm sm:text-base text-[#8D8D91]">
            Contrataciones de actuaciones, patrocinios de emisiones 4K, colaboraciones de moda e iniciativas de cultura urbana.
          </p>
        </div>

        {/* Clean Editorial Form */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#090909] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {submitted ? (
            <div className="py-16 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-3xl uppercase text-white">
                SOLICITUD ENVIADA CORRECTAMENTE
              </h3>
              <p className="font-grotesk text-sm text-[#8D8D91] max-w-md mx-auto">
                El equipo editorial y de representación responderá a tu propuesta en un plazo máximo de 24 horas laborables.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-grotesk text-xs uppercase tracking-wider transition-colors"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-grotesk">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono-code uppercase tracking-wider text-[#8D8D91]">
                    Nombre o Marca *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Empresa / Promotor / Agencia"
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#8B5CF6] text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono-code uppercase tracking-wider text-[#8D8D91]">
                    Email de Contacto *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="contacto@agencia.com"
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#8B5CF6] text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono-code uppercase tracking-wider text-[#8D8D91]">
                    Tipo de Proyecto *
                  </label>
                  <select className="w-full px-5 py-4 rounded-xl bg-[#090909] border border-white/10 focus:border-[#8B5CF6] text-white text-sm outline-none transition-colors">
                    <option value="booking">Booking / Actuación en Vivo</option>
                    <option value="sponsor">Patrocinio Stream & TV 4K</option>
                    <option value="fashion">Colaboración de Moda / Francesca Chiri</option>
                    <option value="editorial">Prensa y Entrevistas</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono-code uppercase tracking-wider text-[#8D8D91]">
                    Ciudad o Localización
                  </label>
                  <input
                    type="text"
                    placeholder="Madrid, París, Barcelona..."
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#8B5CF6] text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono-code uppercase tracking-wider text-[#8D8D91]">
                  Detalles de la Propuesta *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detalles sobre fechas, formato de colaboración y presupuesto estimado..."
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#8B5CF6] text-white text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#F4F1EC] hover:bg-[#8B5CF6] text-[#090909] hover:text-white font-grotesk font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Enviar Solicitud de Booking</span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
