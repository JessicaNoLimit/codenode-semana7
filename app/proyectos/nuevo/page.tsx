"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function NuevoProyectoPage() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!titulo.trim() || !descripcion.trim() || !url.trim()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (isPending || !session) {
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

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm text-gray-300 backdrop-blur-xl">
          Comprobando sesión...
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
                Nuevo proyecto
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Nuevo proyecto
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-gray-400">
                Guarda una nueva idea o proyecto en tu espacio privado.
              </p>
            </div>

            {(error || mensaje) && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  error
                    ? "border-red-400/20 bg-red-400/10 text-red-200"
                    : "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                }`}
              >
                {error || mensaje}
              </div>
            )}

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
                  disabled={cargando}
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.01] hover:opacity-90 disabled:opacity-50"
                >
                  {cargando ? "Creando..." : "Crear proyecto"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
