import { BookOpen, Download, FileText } from "lucide-react";

export default function CvCard() {
  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="chip">
          <FileText size={13} strokeWidth={1.8} />
          CV
        </span>
      </div>

      <p className="text-sm leading-relaxed">
        Estudiante de último año, enfocado en desarrollo web fullstack y ciencia de datos.
      </p>
      <p className="text-xs subtle-text mt-1">
        Español (nativo) · Inglés (intermedio).
      </p>

      <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-1.5 text-xs rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition px-3 py-2"
        >
          <BookOpen size={13} strokeWidth={1.8} />
          Ver CV
        </a>
        <a
          href="/cv.pdf"
          download="Mario-Opazo-CV.pdf"
          className="inline-flex items-center justify-center gap-1.5 text-xs rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition px-3 py-2"
        >
          <Download size={13} strokeWidth={1.8} />
          Descargar
        </a>
      </div>
    </div>
  );
}
