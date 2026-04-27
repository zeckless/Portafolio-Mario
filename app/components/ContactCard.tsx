import { MessageCircle } from "lucide-react";
import CopyEmailButton from "./CopyEmailButton";
import { BorderBeam } from "./ui/BorderBeam";

export default function ContactCard() {
  return (
    <div className="card p-5 h-full flex flex-col">
      <BorderBeam colorFrom="#6366f1" colorTo="#a855f7" duration={7000} delay={1} />
      <div className="flex items-center gap-2 mb-3">
        <span className="chip">
          <MessageCircle size={13} strokeWidth={1.8} />
          Contactar
        </span>
      </div>

      <p className="text-sm leading-relaxed">
        Construyendo experiencias digitales — desde APIs robustas hasta soluciones con datos.
      </p>
      <p className="text-xs subtle-text mt-1">
        Si quieres colaborar o tienes una propuesta, escríbeme.
      </p>

      <div className="mt-auto pt-4">
        <CopyEmailButton email="mario.opazo@ug.uchile.cl" variant="full" />
      </div>
    </div>
  );
}
