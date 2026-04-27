import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";

export default function ContactCard() {
  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="chip">
          <MessageCircle size={13} strokeWidth={1.8} />
          Contactar
        </span>
      </div>

      <p className="text-sm leading-relaxed">
        Construyendo experiencias digitales — desde APIs robustas hasta sistemas de juego.
      </p>
      <p className="text-xs subtle-text mt-1">
        Si quieres colaborar o tienes una propuesta, escríbeme.
      </p>

      <a
        href="mailto:mario.opazo@ug.uchile.cl"
        className="group mt-auto pt-4 inline-flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition px-3 py-2.5 text-sm"
      >
        <span className="inline-flex items-center gap-2">
          <Mail size={15} strokeWidth={1.7} />
          mario.opazo@ug.uchile.cl
        </span>
        <ArrowUpRight
          size={15}
          className="text-neutral-400 group-hover:text-white transition"
        />
      </a>
    </div>
  );
}
