import type { Metadata } from "next";
import "./globals.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FOCUS WORKSPACE",
  description:
    "Organiza proyectos, guarda avances y comenta ideas desde un único espacio privado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-black text-white">
        <ParticlesBackground />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
