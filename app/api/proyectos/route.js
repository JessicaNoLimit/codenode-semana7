import db from "@/lib/db";

export async function GET() {
  const proyectos = db.prepare("SELECT * FROM proyectos").all();
  return Response.json(proyectos);
}

export async function POST(request) {
  const { titulo, descripcion, url } = await request.json();

  const result = db
    .prepare("INSERT INTO proyectos (titulo, descripcion, url) VALUES (?, ?, ?)")
    .run(titulo, descripcion, url);

  return Response.json({
    id: result.lastInsertRowid,
    titulo,
    descripcion,
    url,
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