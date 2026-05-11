import { query } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const proyectoId = searchParams.get("proyectoId");

  const { rows } = await query(
    'SELECT * FROM comentarios WHERE "proyectoId" = $1 ORDER BY id DESC',
    [proyectoId]
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

  const { texto, proyectoId } = await request.json();
  const createdAt = new Date().toISOString();

  const { rows } = await query(
    'INSERT INTO comentarios (texto, "proyectoId", "userId", "createdAt") VALUES ($1, $2, $3, $4) RETURNING id, texto, "proyectoId", "userId", "createdAt"',
    [texto, proyectoId, session.user.id, createdAt]
  );

  return Response.json(rows[0]);
}
