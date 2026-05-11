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
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe un comentario..."
        className="min-h-28 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/40 focus:bg-white/[0.06]"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={cargando}
          className="rounded-full border border-white/12 bg-white px-5 py-2 text-sm font-medium text-black transition hover:scale-[1.01] hover:opacity-90 disabled:opacity-50"
        >
          {cargando ? "Guardando..." : "Añadir comentario"}
        </button>
      </div>
    </form>
  );
}
