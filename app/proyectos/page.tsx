import Link from "next/link";
import BotonEliminarProyecto from "@/components/BotonEliminarProyecto";

type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
};

async function getProyectos(): Promise<Proyecto[]> {
  try {
    const res = await fetch("http://localhost:3000/api/proyectos", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return res.json();
  } catch {
    return [];
  }
}

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <main className="min-h-screen text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
          Mis proyectos
        </h1>

        {/* 🔥 BOTÓN NUEVO PROYECTO */}
        <div className="flex justify-center mb-10">
          <Link
            href="/proyectos/nuevo"
            className="bg-white text-black px-6 py-3 rounded-xl hover:opacity-80 transition"
          >
            + Nuevo proyecto
          </Link>
        </div>

        <div className="grid gap-6">
          {proyectos.length > 0 ? (
            proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className="block border border-gray-800 rounded-2xl p-6 hover:border-white/50 hover:bg-white/5 transition"
              >
                <a
                  href={proyecto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="text-2xl font-semibold mb-2">
                    {proyecto.titulo}
                  </h2>

                  <p className="text-gray-400">
                    {proyecto.descripcion || "Sin descripción"}
                  </p>
      </a>

<Link
  href={`/proyectos/editar/${proyecto.id}`}
  className="mt-3 mr-4 inline-block text-blue-400 hover:text-blue-200 text-sm"
>
  Editar
</Link>

<BotonEliminarProyecto id={proyecto.id} />
              </div>
            ))
          ) : (
            <p className="text-center text-red-400">
              No se pudieron cargar los proyectos.
            </p>
          )}
        </div>

        <div className="text-center pt-10">
          <Link href="/" className="underline hover:opacity-70">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}