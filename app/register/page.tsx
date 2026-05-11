"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Completa todos los campos.");
      return;
    }

    setCargando(true);

    const resultado = await authClient.signUp.email({
      email,
      password,
      name: "Usuario",
    });

    setCargando(false);

    if (resultado.error) {
      setError("No se pudo registrar. Puede que ya exista.");
      return;
    }

    setMensaje("Registro correcto. Redirigiendo a login...");

    setTimeout(() => {
      router.push("/login");
    }, 1200);
  }

  return (
    <main className="min-h-screen px-6 py-12 text-white md:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full max-w-4xl gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:grid-cols-[1.05fr_0.95fr]">
          <section className="flex flex-col justify-between border-b border-white/10 bg-gradient-to-br from-white/[0.06] via-cyan-400/10 to-transparent p-8 md:border-b-0 md:border-r md:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/75">
                Focus Workspace
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
                Crea tu espacio
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-gray-300">
                Empieza a organizar tus ideas y proyectos.
              </p>
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-gray-400">
                Diseñado para centralizar notas, proyectos y avances en un entorno privado y simple.
              </p>
            </div>
          </section>

          <section className="p-8 md:p-10">
            <div className="mx-auto max-w-md">
              {(error || mensaje) && (
                <div
                  className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
                    error
                      ? "border-red-400/20 bg-red-400/10 text-red-200"
                      : "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                  }`}
                >
                  {error || mensaje}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/45 focus:bg-black/35"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Crea una contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-white/12 bg-black/25 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/45 focus:bg-black/35"
                  />
                </div>

                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full rounded-2xl bg-white px-4 py-3.5 font-medium text-black transition hover:scale-[1.01] hover:opacity-90 disabled:opacity-50"
                >
                  {cargando ? "Creando cuenta..." : "Crear cuenta"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-400">
                ¿Ya tienes cuenta?{" "}
                <Link
                  href="/login"
                  className="font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
