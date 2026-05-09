import Link from "next/link";
import BotonEliminarProyecto from "@/components/BotonEliminarProyecto";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import db from "@/lib/db";
import ComentarioForm from "@/components/ComentarioForm";

type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
};

type Comentario = {
  id: number;
  texto: string;
  proyectoId: number;
  userId: string;
  createdAt: string;
};

async function getProyectos(userId: string): Promise<Proyecto[]> {
  return db
    .prepare("SELECT * FROM proyectos WHERE userId = ?")
    .all(userId) as Proyecto[];
}

function getComentarios(proyectoId: number): Comentario[] {
  return db
    .prepare("SELECT * FROM comentarios WHERE proyectoId = ? ORDER BY id DESC")
    .all(proyectoId) as Comentario[];
}

export default async function ProyectosPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

 const proyectos = await getProyectos(session.user.id);
 const usuario = db
  .prepare("SELECT role FROM user WHERE id = ?")
  .get(session.user.id) as { role: string } | undefined;

const role = usuario?.role || "user";

  return (
    <main className="min-h-screen text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Mis proyectos
        </h1>

        <p className="text-center text-gray-300 text-lg mb-10">
  ¡Hola {session.user.name || "usuario"}! 👋
</p>

<p className="text-center text-sm text-gray-500 mb-8">
  Rol: <span className="text-gray-300">{role}</span>
</p>

{role === "admin" && (
  <div className="flex justify-center mb-8">
    <Link
      href="/admin"
      className="border border-yellow-500/40 text-yellow-300 px-5 py-2 rounded-full text-sm hover:bg-yellow-500 hover:text-black transition"
    >
      Ir al panel admin 👑
    </Link>
  </div>
)}

<div className="flex justify-center mb-10">
  <LogoutButton />
</div>

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

<div className="mt-6">
  <h3 className="text-sm text-gray-400 mb-2">💬 Comentarios</h3>

  {getComentarios(proyecto.id).length > 0 ? (
    getComentarios(proyecto.id).map((comentario) => (
      <div
        key={comentario.id}
        className="text-sm text-gray-300 mb-2 border-b border-gray-800 pb-2"
      >
        {comentario.texto}
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">
      No hay comentarios todavía.
    </p>
  )}

  <ComentarioForm
  proyectoId={proyecto.id}
  userId={session.user.id}
/>

</div>

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