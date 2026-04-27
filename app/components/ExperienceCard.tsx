import { Briefcase, Bot, Dices, Gamepad2, Spade } from "lucide-react";

type Experience = {
  org: string;
  role: string;
  period: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  accent: string;
};

const experiences: Experience[] = [
  {
    org: "CIRTA",
    role: "Desarrollador — Plataforma EduRobotics",
    period: "Feb 2026 — Presente",
    icon: Bot,
    accent: "from-sky-500 to-cyan-600",
  },
  {
    org: "UCasino",
    role: "Backend Developer & Líder Sistema de Apuestas",
    period: "Ago 2025 — Dic 2025",
    icon: Dices,
    accent: "from-emerald-500 to-teal-600",
  },
  {
    org: "Prime-MICh",
    role: "Programador de Mecánicas de Juego",
    period: "Ago 2025 — Dic 2025",
    icon: Gamepad2,
    accent: "from-fuchsia-500 to-violet-600",
  },
  {
    org: "Malatro",
    role: "Desarrollador Scala",
    period: "Mar 2025 — Jul 2025",
    icon: Spade,
    accent: "from-amber-400 to-orange-600",
  },
];

export default function ExperienceCard() {
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="chip">
          <Briefcase size={13} strokeWidth={1.8} />
          Experiencia
        </span>
      </div>

      <ul className="space-y-4">
        {experiences.map((e) => (
          <li key={e.org} className="flex items-start gap-3">
            <div
              className={`shrink-0 h-9 w-9 rounded-lg bg-gradient-to-br ${e.accent} flex items-center justify-center text-white/90 shadow-inner`}
            >
              <e.icon size={17} strokeWidth={1.7} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium truncate">{e.org}</p>
                <p className="text-[11px] subtle-text whitespace-nowrap">
                  {e.period}
                </p>
              </div>
              <p className="text-xs subtle-text leading-snug mt-0.5">
                {e.role}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
