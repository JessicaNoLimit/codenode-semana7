import { query } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function PUT(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  const { name } = await request.json();

  if (!name || name.trim() === "") {
    return Response.json(
      { error: "El nombre no puede estar vacío" },
      { status: 400 }
    );
  }

  await query('UPDATE "user" SET name = $1 WHERE id = $2', [
    name.trim(),
    session.user.id,
  ]);

  return Response.json({
    success: true,
    name: name.trim(),
  });
}
