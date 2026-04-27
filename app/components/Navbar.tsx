"use client";

import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, type ThemeMode } from "../context/ThemeContext";

const navItems = [
  { label: "Sobre mí",    href: "#about" },
  { label: "Experiencia", href: "#experience" },
  { label: "Proyectos",   href: "#projects" },
  { label: "Stack",       href: "#stack" },
  { label: "Contacto",    href: "#contact" },
];

const themeOptions: { value: ThemeMode; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { value: "light",  label: "Light",  icon: Sun },
  { value: "dark",   label: "Dark",   icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export default function Navbar() {
  const { mode, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = ["about", "experience", "projects", "stack", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const ThemeIcon =
    mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="navbar-pill flex items-center px-1.5 py-1.5">
        {/* Nav links */}
        {navItems.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = active === id;
          return (
            <a
              key={label}
              href={href}
              className={`navbar-link${isActive ? " active" : ""}`}
            >
              {label}
            </a>
          );
        })}

        {/* Divider */}
        <span className="navbar-divider" />

        {/* Theme toggle */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Cambiar tema"
            className="navbar-theme-btn"
          >
            <ThemeIcon size={15} strokeWidth={1.7} />
          </button>

          {open && (
            <div className="theme-dropdown">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => { setMode(value); setOpen(false); }}
                  className={`theme-option${mode === value ? " selected" : ""}`}
                >
                  <Icon size={13} strokeWidth={1.7} />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
