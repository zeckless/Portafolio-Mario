import { Phone, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import AvatarModal from "./AvatarModal";
import CopyEmailButton from "./CopyEmailButton";

const EMAIL = "mario.opazo@ug.uchile.cl";

type Social = {
  href: string;
  label: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

const socials: Social[] = [
  {
    href: "https://github.com/zeckless",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://www.linkedin.com/in/mario-opazo-arnaiz-16642b392/",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
];

export default function Hero() {
  return (
    <header className="flex flex-col items-start gap-4 pt-14 sm:pt-20">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-1.5 rounded-full bg-[radial-gradient(closest-side,rgba(255,180,80,0.45),transparent)] blur-md"
        />
        <AvatarModal />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Mario Opazo
        </h1>
        <p className="subtle-text max-w-md leading-relaxed">
          Estudiante de Ingeniería Civil en Computación en la Universidad de Chile.
        </p>
        <p className="subtle-text max-w-md leading-relaxed">
          Desarrollo web fullstack y ciencia de datos — bases de datos, minería de datos y PLN.
        </p>
      </div>

      <div className="chip mt-1">
        <span className="status-dot" />
        Disponible para nuevos proyectos
      </div>

      <nav className="flex items-center gap-1 mt-2">
        {socials.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-white/5 transition"
          >
            <Icon size={18} strokeWidth={1.6} />
          </a>
        ))}
        <CopyEmailButton email={EMAIL} variant="icon" />
        <span className="mx-2 h-5 w-px bg-white/10" />
        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
          <MapPin size={13} strokeWidth={1.6} />
          Santiago, Chile
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 ml-3">
          <Phone size={13} strokeWidth={1.6} />
          +569 33915483
        </span>
      </nav>
    </header>
  );
}
