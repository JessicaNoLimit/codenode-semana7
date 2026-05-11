import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definido.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function rawQuery(text, params = []) {
  return pool.query(text, params);
}

async function initDb() {
  await rawQuery(`
    CREATE TABLE IF NOT EXISTS proyectos (
      id SERIAL PRIMARY KEY,
      titulo TEXT,
      descripcion TEXT,
      url TEXT,
      "userId" TEXT
    )
  `);

  await rawQuery(`
    CREATE TABLE IF NOT EXISTS comentarios (
      id SERIAL PRIMARY KEY,
      texto TEXT,
      "proyectoId" INTEGER,
      "userId" TEXT,
      "createdAt" TEXT
    )
  `);

  await rawQuery(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = 'user'
      ) THEN
        ALTER TABLE "user"
        ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
      END IF;
    END $$;
  `);
}

const initPromise = initDb().catch((error) => {
  console.error("Error inicializando PostgreSQL:", error);
  throw error;
});

export async function query(text, params = []) {
  await initPromise;
  return rawQuery(text, params);
}

export { pool, initPromise };
