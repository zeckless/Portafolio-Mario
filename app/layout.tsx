import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mario Opazo — Portafolio",
  description:
    "Estudiante de Ingeniería Civil en Computación en la Universidad de Chile. Desarrollo web enfocado en backend, frontend y soluciones fullstack.",
};

// Inline script that runs before React to avoid flash of wrong theme
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'dark';
    var resolved = t === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : t;
    document.documentElement.classList.add(resolved);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Anti-flash: sets theme class before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

