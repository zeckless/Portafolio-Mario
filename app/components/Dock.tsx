"use client";

import { BookOpen, Code2, Layers, Mail, User } from "lucide-react";
import Image from "next/image";

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
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="card !rounded-full px-2 py-1.5 flex items-center gap-0.5 shadow-2xl shadow-black/40">
        <a
          href="#top"
          className="relative h-9 w-9 rounded-full overflow-hidden ring-1 ring-white/10 bg-neutral-800 mr-1"
          aria-label="Inicio"
        >
          <Image
            src="/Imagen.png"
            alt="Mario Opazo"
            fill
            className="object-cover object-top"
          />
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
      </div>
    </div>
  );
}
