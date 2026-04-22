import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Jesica Serrano
      </h1>

      <p className="text-lg md:text-xl text-center max-w-2xl mb-8 text-gray-300">
        Desarrolladora web en formación, creando proyectos con Next.js,
        WordPress y JavaScript paso a paso.
      </p>

      <Link
        href="/proyectos"
        className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:opacity-80 transition"
      >
        Ver proyectos
      </Link>
    </main>
  );
}