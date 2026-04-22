import Link from "next/link";

type Proyecto = {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  acf?: {
    descripcion_corta?: string;
  };
};

async function getProyectos(): Promise<Proyecto[]> {
  try {
    const res = await fetch(
      `http://127.0.0.1/wordpress/wp-json/wp/v2/portfolio?t=${Date.now()}`,
      { cache: "no-store" }
    );

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

        <div className="grid gap-6">
          {proyectos.length > 0 ? (
            proyectos.map((proyecto) => (
              <Link
                key={proyecto.id}
                href={`/proyectos/${proyecto.slug}`}
                className="block border border-gray-800 rounded-2xl p-6 hover:border-white/50 hover:bg-white/5 transition"
              >
                <h2 className="text-2xl font-semibold mb-2">
                  {proyecto.title.rendered}
                </h2>

                <p className="text-gray-400">
                  {proyecto.acf?.descripcion_corta ||
                    "Haz clic para ver más detalles"}
                </p>
              </Link>
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