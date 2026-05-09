import db from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const proyectoId = searchParams.get("proyectoId");

  const comentarios = db
    .prepare(`
      SELECT * FROM comentarios
      WHERE proyectoId = ?
      ORDER BY id DESC
    `)
    .all(proyectoId);

  return Response.json(comentarios);
}

export async function POST(request) {
  const { texto, proyectoId, userId } = await request.json();

  const createdAt = new Date().toISOString();

  const result = db
    .prepare(`
      INSERT INTO comentarios
      (texto, proyectoId, userId, createdAt)
      VALUES (?, ?, ?, ?)
    `)
    .run(texto, proyectoId, userId, createdAt);

  return Response.json({
    id: result.lastInsertRowid,
    texto,
    proyectoId,
    userId,
    createdAt,
  });
}