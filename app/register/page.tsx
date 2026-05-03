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
    <main className="min-h-screen text-white px-6 py-16 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Crear cuenta
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
            {cargando ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}