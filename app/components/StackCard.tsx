import { Layers } from "lucide-react";
import TechIcon from "./TechIcon";

const groups: { label: string; items: string[] }[] = [
  {
    label: "Lenguajes",
    items: ["Python", "Java", "Scala", "JavaScript", "TypeScript", "C", "C++", "GDScript"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "Django", "Spring Boot", "Flask", "SQLAlchemy", "JWT", "REST"],
  },
  {
    label: "Frontend",
    items: ["React", "Vite", "Tailwind", "shadcn", "React Router", "AJAX"],
  },
  {
    label: "Datos & Cloud",
    items: ["PostgreSQL", "SQLite", "Docker", "AWS", "Fly.io", "Linux"],
  },
  {
    label: "Herramientas",
    items: ["Git", "Maven", "SBT", "Pytest", "ROS2", "Godot"],
  },
];

export default function StackCard() {
  return (
    <div className="card p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="chip">
          <Layers size={13} strokeWidth={1.8} />
          Stack
        </span>
      </div>

      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="text-[11px] subtle-text mb-1.5">{g.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs bg-white/[0.04] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.06] transition"
                >
                  <TechIcon name={item} size={13} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
