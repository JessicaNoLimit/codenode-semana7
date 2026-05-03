"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
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
      setError("Completa email y contraseña.");
      return;
    }

    setCargando(true);

const resultado = await authClient.signIn.email({
  email,
  password,
});
    setCargando(false);

    if (resultado.error) {
    setError("No se pudo iniciar sesión. Revisa email o contraseña.");
      return;
    }

    setMensaje("Sesión iniciada correctamente. Redirigiendo...");

    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1200);
  }

  return (
    <main className="min-h-screen text-white px-6 py-16 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Acceso privado
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-white/10 border border-white/20"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-white/10 border border-white/20"
          />

          <button
            type="submit"
            disabled={cargando}
            className="bg-white text-black p-3 rounded hover:opacity-80 disabled:opacity-50"
          >
           {cargando ? "Procesando..." : "Iniciar sesión"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
