import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Jessica Serrano
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Desarrolladora web en formación, creando proyectos con Next.js,
          WordPress y JavaScript paso a paso.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            href="/proyectos"
            className="bg-white text-black px-8 py-4 rounded-full font-medium hover:opacity-80 transition"
          >
            Ver proyectos
          </Link>

          <Link
            href="/perfil"
            className="bg-white text-black px-8 py-4 rounded-full font-medium hover:opacity-80 transition"
          >
            Ver mi perfil
          </Link>
        </div>

      </div>
    </main>
  );
}