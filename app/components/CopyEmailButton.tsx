"use client";

import { ArrowUpRight, Check, Mail } from "lucide-react";
import { useState } from "react";

type Props = {
  email: string;
  variant?: "icon" | "full";
};

export default function CopyEmailButton({ email, variant = "icon" }: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={onClick}
        aria-label={copied ? "Email copiado" : "Copiar email"}
        title={copied ? "¡Copiado!" : "Copiar email"}
        className="relative h-9 w-9 inline-flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-white/5 transition"
      >
        {copied ? (
          <Check size={18} strokeWidth={1.8} className="text-emerald-400" />
        ) : (
          <Mail size={18} strokeWidth={1.6} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center justify-between gap-2 w-full rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition px-3 py-2.5 text-sm"
    >
      <span className="inline-flex items-center gap-2">
        {copied ? (
          <Check size={15} strokeWidth={1.8} className="text-emerald-400" />
        ) : (
          <Mail size={15} strokeWidth={1.7} />
        )}
        <span className={copied ? "text-emerald-400" : ""}>
          {copied ? "¡Copiado al portapapeles!" : email}
        </span>
      </span>
      {!copied && (
        <ArrowUpRight
          size={15}
          className="text-neutral-400 group-hover:text-white transition"
        />
      )}
    </button>
  );
}
