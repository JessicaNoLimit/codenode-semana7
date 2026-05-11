"use client";

import Link from "next/link";
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
  const [guardando, setGuardando] = useState(false);

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
    setGuardando(true);

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
      <main className="min-h-screen flex items-center justify-center px-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm text-gray-300 backdrop-blur-xl">
          Cargando proyecto...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12 text-white md:py-16">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
          <div className="space-y-8">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-300/75">
                Editar proyecto
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Editar proyecto
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-gray-400">
                Actualiza la información de este proyecto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm text-gray-400" htmlFor="titulo">
                  Título
                </label>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Nombre del proyecto"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/45 focus:bg-black/35"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400" htmlFor="descripcion">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  placeholder="Describe brevemente la idea, alcance o estado del proyecto"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="min-h-32 w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/45 focus:bg-black/35"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400" htmlFor="url">
                  URL
                </label>
                <input
                  id="url"
                  type="text"
                  placeholder="https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/45 focus:bg-black/35"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Link
                  href="/proyectos"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-white/25 hover:bg-white hover:text-black"
                >
                  Cancelar
                </Link>

                <button
                  type="submit"
                  disabled={guardando}
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.01] hover:opacity-90 disabled:opacity-50"
                >
                  {guardando ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
