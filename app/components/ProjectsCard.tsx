import { ArrowUpRight, Code2, Bot, Dices, Globe } from "lucide-react";
import TechIcon from "./TechIcon";
import React from "react";

type Project = {
  title: string;
  role: string;
  description: string;
  tags: string[];
  gradient: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  iconColor: string;
};

const projects: Project[] = [
  {
    title: "CIRTA — EduRobotics",
    role: "Desarrollo backend y simulación",
    description:
      "Plataforma educativa de robótica. Backend en FastAPI con autenticación JWT, frontend en React + Vite y simulación con ROS2 en Docker.",
    tags: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "ROS2", "Tailwind"],
    gradient: "from-sky-500/30 via-cyan-500/20 to-emerald-500/10",
    href: "https://www.edurobotics.cl",
    icon: Bot,
    iconColor: "text-sky-300/70",
  },
  {
    title: "UCasino",
    role: "Backend Developer & Líder Apuestas",
    description:
      "Plataforma de apuestas ficticias para fomentar deportes en la U. de Chile. Django ORM, transacciones atómicas y búsqueda en tiempo real con AJAX.",
    tags: ["Django", "AJAX", "Scrum"],
    gradient: "from-emerald-500/30 via-teal-500/20 to-amber-500/10",
    href: "https://github.com/DCC-CC4401/2025-2-CC4401-grupo-7",
    icon: Dices,
    iconColor: "text-emerald-300/70",
  },
  {
    title: "Olimpo PAC",
    role: "Desarrollador Fullstack",
    description:
      "Sitio web para gimnasio con más de 20 años en Pedro Aguirre Cerda, Santiago. Desarrollado con Next.js, Tailwind CSS y desplegado en producción.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    gradient: "from-violet-500/30 via-purple-500/20 to-fuchsia-500/10",
    href: "https://www.olimpopac.cl",
    icon: Globe,
    iconColor: "text-violet-300/70",
  },
];

export default function ProjectsCard() {
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="chip">
          <Code2 size={13} strokeWidth={1.8} />
          Proyectos
        </span>
        <span className="text-[11px] subtle-text">{projects.length} destacados</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {projects.map((p) => {
          const isExternal = p.href.startsWith("http");
          return (
            <a
              key={p.title}
              href={p.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer noopener" : undefined}
              className="group relative rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-white/15 transition"
            >
              <div className={`h-24 bg-gradient-to-br ${p.gradient} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
                <p.icon size={36} strokeWidth={1.2} className={p.iconColor} />
                <ArrowUpRight
                  size={16}
                  className="absolute top-2.5 right-2.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-[11px] subtle-text mt-0.5">{p.role}</p>
                <p className="text-[12px] subtle-text leading-snug mt-1.5">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-white/[0.05] border border-white/[0.06] text-neutral-300"
                    >
                      <TechIcon name={t} size={10} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
