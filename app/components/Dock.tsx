"use client";

import {
  BookOpen,
  Code2,
  Layers,
  Mail,
  Moon,
  Sun,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useState } from "react";

type DockItem = {
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  href: string;
};

const items: DockItem[] = [
  { label: "Sobre mí", icon: User, href: "#about" },
  { label: "Experiencia", icon: BookOpen, href: "#experience" },
  { label: "Proyectos", icon: Code2, href: "#projects" },
  { label: "Stack", icon: Layers, href: "#stack" },
  { label: "Contacto", icon: Mail, href: "#contact" },
];

export default function Dock() {
  const [dark, setDark] = useState(true);
  const [muted, setMuted] = useState(true);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="card !rounded-full px-2 py-1.5 flex items-center gap-0.5 shadow-2xl shadow-black/40">
        <a
          href="#top"
          className="h-9 w-9 rounded-full overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-xs font-semibold mr-1"
          aria-label="Inicio"
        >
          M
        </a>

        {items.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className="h-9 w-9 inline-flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
            aria-label={label}
            title={label}
          >
            <Icon size={16} strokeWidth={1.7} />
          </a>
        ))}

        <span className="mx-1 h-5 w-px bg-white/10" />

        <button
          onClick={() => setDark((d) => !d)}
          className="h-9 w-9 inline-flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Cambiar tema"
          title="Cambiar tema"
        >
          {dark ? (
            <Moon size={16} strokeWidth={1.7} />
          ) : (
            <Sun size={16} strokeWidth={1.7} />
          )}
        </button>

        <button
          onClick={() => setMuted((m) => !m)}
          className="h-9 w-9 inline-flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Sonido"
          title="Sonido"
        >
          {muted ? (
            <VolumeX size={16} strokeWidth={1.7} />
          ) : (
            <Volume2 size={16} strokeWidth={1.7} />
          )}
        </button>
      </div>
    </div>
  );
}
