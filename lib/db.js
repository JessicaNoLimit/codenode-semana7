import Database from "better-sqlite3";

const db = new Database("database.sqlite");

// Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS proyectos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    descripcion TEXT,
    url TEXT
  )
`).run();


export default db;