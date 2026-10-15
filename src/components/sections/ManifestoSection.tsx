import { motion } from 'motion/react';

export function ManifestoSection() {
  return (
    <section id="manifesto" className="relative py-32 px-6 md:px-14 bg-[#F4F1EC] text-[#090909] select-none border-b border-black/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/15 pb-8 font-mono-code text-xs text-[#8D8D91]">
          <div className="space-y-1">
            <span className="text-[#090909] font-bold tracking-widest uppercase block">
              // 01. EL MANIFIESTO EDITORIAL
            </span>
            <span>IDENTIDAD, CRÉDITOS Y PROPÓSITO</span>
          </div>
          <div>EST. 2026 • MADRID / BARCELONA</div>
        </div>

        {/* Large Scale Editorial Statement */}
        <div className="space-y-10 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] uppercase"
          >
            LA CULTURA DIGITAL NO SE CONTEMPLA. <br />
            <span className="text-[#8D8D91]">SE VIVE EN DIRECTO.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 font-grotesk text-base sm:text-lg text-[#090909]/80 leading-relaxed border-t border-black/10">
            <div className="md:col-span-6 space-y-4">
              <p>
                THIAGOVSC nace como una respuesta a la saturación de formatos genéricos. Fusionamos la inmediatez de la música urbana con el rigor del diseño editorial y la narrativa audiovisual de alta fidelidad.
              </p>
            </div>
            <div className="md:col-span-6 space-y-4">
              <p>
                Desde sesiones en salas icónicas hasta transmisiones continuas en 4K y clips virales en TikTok, creamos un ecosistema donde la música, el estilo y la tecnología convergen sin artificios.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {[
            {
              num: '01',
              title: 'MÚSICA URBANA & VANGUARDIA',
              desc: 'Curaduría musical sin concesiones: ritmos de club, mezclas exclusivas y sesiones en vivo.',
            },
            {
              num: '02',
              title: 'CULTURA VISUAL Y SOCIAL',
              desc: 'Creación de contenido para TikTok e Instagram Reels con dirección estética de nivel moda.',
            },
            {
              num: '03',
              title: 'STREAMING 4K EN TIEMPO REAL',
              desc: 'Infraestructura de emisión continua pensada para ofrecer calidad sin compresión destructiva.',
            },
          ].map((col, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#090909] text-[#F4F1EC] space-y-6 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center font-mono-code text-xs text-[#8D8D91]">
                <span>{col.num}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-white">
                  {col.title}
                </h3>
                <p className="font-grotesk text-sm text-[#8D8D91] leading-relaxed">
                  {col.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
