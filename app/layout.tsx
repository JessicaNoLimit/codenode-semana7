import type { Metadata } from "next";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";

export const metadata: Metadata = {
  title: "Jessica Serrano | Portfolio",
  description: "Portfolio con Next.js y WordPress REST API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white min-h-screen">

        {/* 🌌 Fondo global animado */}
        <ParticlesBackground />

        {/* 📦 Contenido de la app */}
        <main className="relative z-10 min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}