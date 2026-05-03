"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
};

export default function EditarProyectoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarProyecto() {
      const res = await fetch("/api/proyectos");
      const data: Proyecto[] = await res.json();

      const proyecto = data.find((p) => p.id === Number(id));

      if (proyecto) {
        setTitulo(proyecto.titulo);
        setDescripcion(proyecto.descripcion);
        setUrl(proyecto.url);
      }

      setLoading(false);
    }

    cargarProyecto();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch("/api/proyectos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(id),
        titulo,
        descripcion,
        url,
      }),
    });

    router.push("/proyectos");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Cargando proyecto...
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white px-6 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Editar proyecto
        </h1>

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
            className="bg-white text-black p-3 rounded hover:opacity-80"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </main>
  );
}