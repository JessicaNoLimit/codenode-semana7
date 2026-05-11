import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          FOCUS WORKSPACE
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Organiza proyectos, guarda avances y comenta ideas desde un único
          espacio privado.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-white px-8 py-4 font-medium text-black transition hover:opacity-80"
          >
            Acceder
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-white px-8 py-4 font-medium text-black transition hover:opacity-80"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </main>
  );
}
