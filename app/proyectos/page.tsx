import Link from "next/link";
import BotonEliminarProyecto from "@/components/BotonEliminarProyecto";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { query } from "@/lib/db";
import ComentarioForm from "@/components/ComentarioForm";
import ScrollToTopButton from "@/components/ScrollToTopButton";

type Proyecto = {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
  userId: string;
};

type Comentario = {
  id: number;
  texto: string;
  proyectoId: number;
  userId: string;
  createdAt: string;
};

async function getProyectos(userId: string): Promise<Proyecto[]> {
  const { rows } = await query(
    'SELECT id, titulo, descripcion, url, "userId" FROM proyectos WHERE "userId" = $1 ORDER BY id DESC',
    [userId]
  );

  return rows as Proyecto[];
}

async function getRole(userId: string): Promise<string> {
  const { rows } = await query(
    'SELECT role FROM "user" WHERE id = $1 LIMIT 1',
    [userId]
  );

  return rows[0]?.role || "user";
}

async function getComentariosByProyectoIds(
  proyectoIds: number[]
): Promise<Map<number, Comentario[]>> {
  if (proyectoIds.length === 0) {
    return new Map();
  }

  const { rows } = await query(
    'SELECT id, texto, "proyectoId", "userId", "createdAt" FROM comentarios WHERE "proyectoId" = ANY($1::int[]) ORDER BY id DESC',
    [proyectoIds]
  );

  const comentarios = rows as Comentario[];
  const comentariosPorProyecto = new Map<number, Comentario[]>();

  for (const comentario of comentarios) {
    const actuales = comentariosPorProyecto.get(comentario.proyectoId) || [];
    actuales.push(comentario);
    comentariosPorProyecto.set(comentario.proyectoId, actuales);
  }

  return comentariosPorProyecto;
}

export default async function ProyectosPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const proyectos = await getProyectos(session.user.id);
  const role = await getRole(session.user.id);
  const comentariosPorProyecto = await getComentariosByProyectoIds(
    proyectos.map((proyecto) => proyecto.id)
  );

  return (
    <main className="min-h-screen px-6 py-12 text-white md:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-8">
            <div className="space-y-3 text-center md:text-left">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-300/75">
                Focus Workspace
              </p>
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                    Mis proyectos
                  </h1>
                  <p className="mt-3 text-base text-gray-400">
                    Tu espacio privado.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-gray-300 md:min-w-[220px]">
                  <p className="text-gray-500">Hola</p>
                  <p className="mt-1 text-lg font-medium text-white">
                    {session.user.name || "usuario"}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.22em] text-gray-500">
                    Rol
                  </p>
                  <p className="mt-1 text-sm text-gray-300">{role}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href="/perfil"
                className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-gray-100 transition hover:border-white/30 hover:bg-white hover:text-black"
              >
                Ver mi perfil
              </Link>

              {role === "admin" && (
                <Link
                  href="/admin"
                  className="rounded-full border border-amber-400/30 bg-amber-300/5 px-5 py-2.5 text-sm font-medium text-amber-200 transition hover:bg-amber-300 hover:text-black"
                >
                  Ir al panel admin
                </Link>
              )}

              <LogoutButton />

              <Link
                href="/proyectos/nuevo"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:scale-[1.01] hover:opacity-90"
              >
                + Nuevo proyecto
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6">
          {proyectos.length > 0 ? (
            proyectos.map((proyecto) => {
              const comentarios = comentariosPorProyecto.get(proyecto.id) || [];

              return (
                <article
                  key={proyecto.id}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.06] md:p-8"
                >
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
                          Proyecto
                        </p>
                        <a
                          href={proyecto.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-block"
                        >
                          <h2 className="text-2xl font-semibold tracking-tight text-white transition group-hover:text-cyan-200 md:text-3xl">
                            {proyecto.titulo}
                          </h2>
                          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
                            {proyecto.descripcion || "Sin descripción"}
                          </p>
                          <p className="mt-4 text-sm text-cyan-300/85 transition group-hover:text-cyan-200">
                            Abrir enlace
                          </p>
                        </a>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-3">
                        <Link
                          href={`/proyectos/editar/${proyecto.id}`}
                          className="rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-400 hover:text-black"
                        >
                          Editar
                        </Link>

                        <BotonEliminarProyecto id={proyecto.id} />
                      </div>
                    </div>

                    <div className="rounded-[1.4rem] border border-white/8 bg-black/20 p-5 md:p-6">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-medium uppercase tracking-[0.22em] text-gray-500">
                            Comentarios
                          </h3>
                          <p className="mt-1 text-sm text-gray-400">
                            Ideas, notas y seguimiento rápido.
                          </p>
                        </div>
                        <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-gray-400">
                          {comentarios.length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {comentarios.length > 0 ? (
                          comentarios.map((comentario) => (
                            <div
                              key={comentario.id}
                              className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-gray-200"
                            >
                              {comentario.texto}
                            </div>
                          ))
                        ) : (
                          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-5 text-sm text-gray-500">
                            Aún no hay comentarios. Usa este espacio para guardar contexto del proyecto.
                          </div>
                        )}
                      </div>

                      <ComentarioForm proyectoId={proyecto.id} />
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-6 py-12 text-center text-gray-400 backdrop-blur-xl">
              No se pudieron cargar los proyectos.
            </div>
          )}
        </section>

        <div className="pt-10 text-center">
          <ScrollToTopButton />
        </div>
      </div>
    </main>
  );
}
