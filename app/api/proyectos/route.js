import { query } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { rows } = await query(
    'SELECT * FROM proyectos WHERE "userId" = $1 ORDER BY id DESC',
    [session.user.id]
  );

  return Response.json(rows);
}

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { titulo, descripcion, url } = await request.json();

  const { rows } = await query(
    'INSERT INTO proyectos (titulo, descripcion, url, "userId") VALUES ($1, $2, $3, $4) RETURNING id, titulo, descripcion, url, "userId"',
    [titulo, descripcion, url, session.user.id]
  );

  return Response.json(rows[0]);
}

export async function DELETE(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await request.json();

  const { rowCount } = await query(
    'DELETE FROM proyectos WHERE id = $1 AND "userId" = $2',
    [id, session.user.id]
  );

  if (!rowCount) {
    return Response.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }

  return Response.json({ success: true });
}

export async function PUT(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id, titulo, descripcion, url } = await request.json();

  const { rowCount } = await query(
    'UPDATE proyectos SET titulo = $1, descripcion = $2, url = $3 WHERE id = $4 AND "userId" = $5',
    [titulo, descripcion, url, id, session.user.id]
  );

  if (!rowCount) {
    return Response.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }

  return Response.json({ success: true });
}
