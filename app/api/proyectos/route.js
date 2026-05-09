import db from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  const proyectos = db
    .prepare("SELECT * FROM proyectos WHERE userId = ?")
    .all(session.user.id);

  return Response.json(proyectos);
}

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  const { titulo, descripcion, url } = await request.json();

  const result = db
    .prepare(
      "INSERT INTO proyectos (titulo, descripcion, url, userId) VALUES (?, ?, ?, ?)"
    )
    .run(titulo, descripcion, url, session.user.id);

  return Response.json({
    id: result.lastInsertRowid,
    titulo,
    descripcion,
    url,
    userId: session.user.id,
  });
}

export async function DELETE(request) {
  const { id } = await request.json();

  db.prepare("DELETE FROM proyectos WHERE id = ?").run(id);

  return Response.json({ success: true });
}

export async function PUT(request) {
  const { id, titulo, descripcion, url } = await request.json();

  db.prepare(`
    UPDATE proyectos
    SET titulo = ?, descripcion = ?, url = ?
    WHERE id = ?
  `).run(titulo, descripcion, url, id);

  return Response.json({ success: true });
}