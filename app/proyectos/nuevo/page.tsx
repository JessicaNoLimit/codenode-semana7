"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoProyectoPage() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
const [error, setError] = useState("");
const [mensaje, setMensaje] = useState("");
const [cargando, setCargando] = useState(false);
  
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
setError("");
setMensaje("");

if (!titulo.trim() || !descripcion.trim() || !url.trim()) {
  setError("Por favor, completa todos los campos.");
  return;
}

setCargando(true);
    await fetch("/api/proyectos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo,
        descripcion,
        url,
      }),
    });

    setTitulo("");
    setDescripcion("");
    setUrl("");

    setMensaje("Proyecto creado correctamente.");
setCargando(false);

    router.push("/proyectos");
    router.refresh();
  }

  return (
    <main className="min-h-screen text-white px-6 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Nuevo proyecto
        </h1>
{error && (
  <p className="mb-4 text-center text-red-400 font-semibold">
    {error}
  </p>
)}

{mensaje && (
  <p className="mb-4 text-center text-green-400 font-semibold">
    {mensaje}
  </p>
)}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="p-3 rounded bg-white/10 border border-white/20"
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="p-3 rounded bg-white/10 border border-white/20"
          />

          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-3 rounded bg-white/10 border border-white/20"
          />

         <button
  type="submit"
  disabled={cargando}
  className="bg-white text-black p-3 rounded hover:opacity-80 disabled:opacity-50"
>
  {cargando ? "Creando..." : "Crear proyecto"}
</button>
        </form>
      </div>
    </main>
  );
}