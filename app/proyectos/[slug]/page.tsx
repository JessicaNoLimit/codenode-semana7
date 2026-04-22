import Link from "next/link";

type ImagenProyecto =
  | string
  | {
      url?: string;
    };

type Proyecto = {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  imagen_proyecto?: string;
  acf?: {
    descripcion?: string;
    descripcion_corta?: string;
    url_proyecto?: string;
    imagen_proyecto?: ImagenProyecto;
  };
};

async function getProyecto(slug: string): Promise<Proyecto | null> {
  try {
    const res = await fetch(
      `http://127.0.0.1/wordpress/wp-json/wp/v2/portfolio?slug=${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (!data || data.length === 0) return null;

    return data[0];
  } catch {
    return null;
  }
}

export default async function ProyectoDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);

  if (!proyecto) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        No se encontró el proyecto.
      </main>
    );
  }

  const imagen =
    proyecto.imagen_proyecto ||
    (typeof proyecto.acf?.imagen_proyecto === "string"
      ? proyecto.acf.imagen_proyecto
      : proyecto.acf?.imagen_proyecto?.url);

  return (
    <main className="min-h-screen px-6 py-16 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-white">
        {imagen && (
          <img
            src={imagen}
            alt={proyecto.title.rendered}
            className="w-full h-auto rounded-xl mb-6 object-cover"
          />
        )}

        <h1 className="text-4xl font-bold mb-6">
          {proyecto.title.rendered}
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          {proyecto.acf?.descripcion ||
            proyecto.acf?.descripcion_corta ||
            "Sin descripción"}
        </p>

        {proyecto.acf?.url_proyecto && (
          <a
            href={proyecto.acf.url_proyecto}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-6 py-3 rounded-xl hover:opacity-80 transition"
          >
            Ver proyecto
          </a>
        )}

        <div className="mt-10">
          <Link href="/proyectos" className="underline hover:opacity-70">
            ← Volver a proyectos
          </Link>
        </div>
      </div>
    </main>
  );
}