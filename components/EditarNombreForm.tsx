"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type EditarNombreFormProps = {
  nombreActual: string;
};

export default function EditarNombreForm({
  nombreActual,
}: EditarNombreFormProps) {
  const [name, setName] = useState(nombreActual);
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setMensaje("No se pudo actualizar el nombre.");
      return;
    }

    setMensaje("Nombre actualizado correctamente.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-400" htmlFor="name">
          Editar nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/40 focus:bg-white/[0.06]"
        />
      </div>

      <button
        type="submit"
        className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.01] hover:opacity-90"
      >
        Guardar nombre
      </button>

      {mensaje && (
        <p className="text-sm leading-6 text-gray-300">{mensaje}</p>
      )}
    </form>
  );
}
