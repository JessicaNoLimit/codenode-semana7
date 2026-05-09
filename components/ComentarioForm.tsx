"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ComentarioFormProps = {
  proyectoId: number;
  userId: string;
};

export default function ComentarioForm({
  proyectoId,
  userId,
}: ComentarioFormProps) {
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!texto.trim()) return;

    setCargando(true);

    await fetch("/api/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texto,
        proyectoId,
        userId,
      }),
    });

    setTexto("");
    setCargando(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe un comentario..."
        className="min-h-20 rounded-xl bg-white/10 border border-white/20 p-3 text-sm text-white placeholder:text-gray-500"
      />

      <button
        type="submit"
        disabled={cargando}
        className="self-start rounded-full bg-white px-5 py-2 text-sm text-black hover:opacity-80 disabled:opacity-50 transition"
      >
        {cargando ? "Guardando..." : "Añadir comentario"}
      </button>
    </form>
  );
}