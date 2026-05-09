import Database from "better-sqlite3";

const db = new Database("database.sqlite");

// Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS proyectos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    descripcion TEXT,
    url TEXT,
    userId TEXT
  )
`).run();

try {
  db.prepare("ALTER TABLE proyectos ADD COLUMN userId TEXT").run();
} catch {
  // La columna ya existe, no hacemos nada
} 

try {
  db.prepare("ALTER TABLE user ADD COLUMN role TEXT DEFAULT 'user'").run();
} catch {
  // La columna ya existe
}
db.prepare(`
  CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT,
    proyectoId INTEGER,
    userId TEXT,
    createdAt TEXT
  )
`).run();
export default db;