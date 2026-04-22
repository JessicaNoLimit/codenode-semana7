import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProyectoDetalle = {
  id: number;
  slug: string;
  title?: {
    rendered?: string;
  };
  content?: {
    rendered?: string;
  };
  descripcion_corta?: string;
  url_proyecto?: string;
  imagen_proyecto?: string;
};

async function getProyecto(slug: string): Promise<ProyectoDetalle | null> {
  try {
    const res = await fetch(
      `http://127.0.0.1/wordpress/wp-json/wp/v2/portfolio?slug=${slug}&t=${Date.now()}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data[0] || null;
  } catch {
    return null;
  }
}

export default async function ProyectoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);

  if (!proyecto) {
    return (
      <main className="min-h-screen bg-black text-white px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Proyecto no encontrado
        </h1>
        <div className="text-center">
          <Link href="/proyectos" className="underline hover:opacity-70">
            ← Volver a proyectos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          {proyecto.title?.rendered || "Proyecto sin título"}
        </h1>

        {proyecto.descripcion_corta && (
          <p className="text-lg text-gray-300 mb-6">
            {proyecto.descripcion_corta}
          </p>
        )}
{proyecto.imagen_proyecto && (
  <img
    src={proyecto.imagen_proyecto}
    alt={proyecto.title?.rendered || "Imagen del proyecto"}
    className="w-full max-w-3xl rounded-xl border border-gray-700 mb-8"
  />
)}
{proyecto.content?.rendered && (
  <div
    className="prose prose-invert max-w-none mb-8"
    dangerouslySetInnerHTML={{ __html: proyecto.content.rendered }}
  />
)}

        {proyecto.url_proyecto && (
          <a
            href={proyecto.url_proyecto}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-5 py-3 rounded-full font-semibold hover:opacity-80 transition"
          >
            Ver proyecto
          </a>
        )}

        <div className="mt-8">
          <Link href="/proyectos" className="underline hover:opacity-70">
            ← Volver a proyectos
          </Link>
        </div>
      </div>
    </main>
  );
}