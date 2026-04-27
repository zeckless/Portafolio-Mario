import { GraduationCap } from "lucide-react";

const items = [
  {
    org: "Universidad de Chile",
    role: "Ingeniería Civil en Computación",
    period: "2020 — Presente",
  },
  {
    org: "Internado Nacional Barros Arana",
    role: "Educación secundaria",
    period: "2017 — 2019",
  },
];

export default function EducationCard() {
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="chip">
          <GraduationCap size={13} strokeWidth={1.8} />
          Educación
        </span>
      </div>

      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.org} className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{it.org}</p>
              <p className="text-xs subtle-text leading-snug mt-0.5">{it.role}</p>
            </div>
            <span className="text-[11px] subtle-text whitespace-nowrap mt-1">
              {it.period}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
