import Link from "next/link";

type Proyecto = {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
};

async function getProyectos(): Promise<Proyecto[]> {
  try {
    const res = await fetch("http://127.0.0.1/wordpress/wp-json/wp/v2/portfolio", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch {
    return [];
  }
}

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Mis proyectos</h1>

      <div className="max-w-3xl mx-auto space-y-4">
      {proyectos.length > 0 ? (
  proyectos.map((proyecto) => (
    <Link key={proyecto.id} href={`/proyectos/${proyecto.slug}`}>
      <article className="border border-gray-700 rounded-xl p-4 hover:border-white transition mb-4">
        <h2 className="text-2xl font-semibold">
          {proyecto.title.rendered}
        </h2>
        <p className="text-gray-400 mt-2">Slug: {proyecto.slug}</p>
      </article>
    </Link>
  ))
) : (
  <p className="text-center text-red-400">
    No se pudieron cargar los proyectos.
  </p>
)}

        <div className="text-center pt-6">
          <Link href="/" className="underline hover:opacity-70">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}