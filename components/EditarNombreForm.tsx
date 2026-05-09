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
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 rounded bg-white/10 border border-white/20 text-white"
      />

      <button
        type="submit"
        className="bg-white text-black p-3 rounded-xl hover:opacity-80 transition"
      >
        Guardar nombre
      </button>

      {mensaje && <p className="text-sm text-gray-300">{mensaje}</p>}
    </form>
  );
}