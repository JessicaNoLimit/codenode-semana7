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

        <Link
          href="/proyectos"
          className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:opacity-80 transition"
        >
          Ver proyectos
        </Link>

      </div>
    </main>
  );
}