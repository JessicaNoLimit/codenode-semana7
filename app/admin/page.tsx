import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { rows: userRows } = await query(
    'SELECT role FROM "user" WHERE id = $1 LIMIT 1',
    [session.user.id]
  );
  const usuario = userRows[0] as { role: string } | undefined;

  if (usuario?.role !== "admin") {
    redirect("/proyectos");
  }

  const { rows: totalUsuariosRows } = await query(
    'SELECT COUNT(*)::int as total FROM "user"'
  );
  const { rows: totalProyectosRows } = await query(
    "SELECT COUNT(*)::int as total FROM proyectos"
  );
  const { rows: totalComentariosRows } = await query(
    "SELECT COUNT(*)::int as total FROM comentarios"
  );

  const totalUsuarios = totalUsuariosRows[0] as { total: number };
  const totalProyectos = totalProyectosRows[0] as { total: number };
  const totalComentarios = totalComentariosRows[0] as { total: number };

  return (
    <main className="min-h-screen text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">
          Panel Admin
        </h1>

        <p className="text-center text-gray-400 mb-12">
          Bienvenida administradora
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-gray-800 rounded-2xl p-6 bg-white/5">
            <h2 className="text-gray-400 text-sm mb-2">
              Usuarios
            </h2>

            <p className="text-4xl font-bold">
              {totalUsuarios.total}
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6 bg-white/5">
            <h2 className="text-gray-400 text-sm mb-2">
              Proyectos
            </h2>

            <p className="text-4xl font-bold">
              {totalProyectos.total}
            </p>
          </div>

          <div className="border border-gray-800 rounded-2xl p-6 bg-white/5">
            <h2 className="text-gray-400 text-sm mb-2">
              Comentarios
            </h2>

            <p className="text-4xl font-bold">
              {totalComentarios.total}
            </p>
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/proyectos"
              className="border border-gray-700 text-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              ← Volver a proyectos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
