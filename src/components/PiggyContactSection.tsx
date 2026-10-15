import { useState } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';

export function PiggyContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-8 md:px-14 bg-[#121316] text-white border-b border-white/10 piggy-grain">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#33e4b8]/10 border border-[#33e4b8]/20 text-[#33e4b8] font-mono text-[11px] uppercase tracking-widest font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>(06) BOOKING & CONTRATACIONES</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white">
            TRAVAILLONS <span className="text-[#33e4b8]">ENSEMBLE</span>
          </h2>
          <p className="font-grotesk text-sm sm:text-base text-white/70">
            Campagnes de marque, sponsoring TV 4K, activations d'influenceurs et production d'événements exclusifs.
          </p>
        </div>

        {/* Double-Bezel Form Container */}
        <div className="p-2 rounded-[2.5rem] bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)]">
          <div className="p-8 md:p-14 rounded-[calc(2.5rem-0.5rem)] bg-[#181a20] border border-white/5">
            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#33e4b8] text-[#121316] flex items-center justify-center mx-auto shadow-[0_15px_30px_rgba(51,228,184,0.4)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-syne font-extrabold text-3xl md:text-4xl uppercase text-white">
                  DEMANDE TRANSMRISE AVEC SUCCÈS !
                </h3>
                <p className="font-grotesk text-sm text-white/70 max-w-md mx-auto">
                  Notre direction artistique et équipe de management vous répondra en moins de 24 heures ouvrées.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  data-magnet
                  className="px-8 py-3.5 rounded-full bg-[#33e4b8] text-[#121316] font-display text-lg uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-grotesk">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                      Votre Nom ou Marque *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Red Bull / Maison Laurent"
                      className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-[#33e4b8] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                      Adresse Email Pro *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="contact@entreprise.com"
                      className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-[#33e4b8] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                      Type de Collaboration *
                    </label>
                    <select className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-[#33e4b8] text-white text-sm outline-none transition-colors">
                      <option value="stream">Sponsoring Stream TV 4K</option>
                      <option value="talent">Booking Francesca Chiri / Talents</option>
                      <option value="tiktok">Campagne TikTok & Reels Viraux</option>
                      <option value="event">Événement & Résidence Club</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                      Budget Estimé
                    </label>
                    <select className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-[#33e4b8] text-white text-sm outline-none transition-colors">
                      <option value="1">2 000€ - 5 000€</option>
                      <option value="2">5 000€ - 15 000€</option>
                      <option value="3">15 000€ - 50 000€</option>
                      <option value="4">+ 50 000€</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/60">
                    Détails du Projet *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Expliquez-nous vos objectifs, dates clés et attentes..."
                    className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 focus:border-[#33e4b8] text-white text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-magnet
                  data-cursor-text="ENVOYER"
                  className="group w-full py-4.5 px-8 rounded-full bg-[#33e4b8] hover:bg-white text-[#121316] font-display text-2xl uppercase tracking-wider transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(51,228,184,0.4)] flex items-center justify-center gap-3 active:scale-[0.99]"
                >
                  <span>Transmettre la Demande de Booking</span>
                  <div className="w-8 h-8 rounded-full bg-[#121316]/10 group-hover:bg-[#121316]/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <Send className="w-4 h-4 fill-current" />
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
