const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid"); // 📌 Importar UUID

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./invitaciones.db");

// Crear la tabla si no existe (cambia id a TEXT para UUID)
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS invitaciones (id TEXT PRIMARY KEY, nombre TEXT, hora TEXT)"
  );
});

// 📌 Obtener todas las invitaciones desde SQLite
app.get("/api/invitaciones", (req, res) => {
  db.all("SELECT * FROM invitaciones", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 📌 Obtener una invitación por ID
app.get("/api/invitaciones/:id", (req, res) => {
  db.get(
    "SELECT * FROM invitaciones WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row)
        return res.status(404).json({ error: "Invitación no encontrada" });
      res.json(row);
    }
  );
});

// 📌 Crear una nueva invitación con UUID
app.post("/api/invitaciones", (req, res) => {
  const { nombre, hora } = req.body;
  const id = uuidv4(); // Genera un UUID único

  db.run(
    "INSERT INTO invitaciones (id, nombre, hora) VALUES (?, ?, ?)",
    [id, nombre, hora],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id, nombre, hora });
    }
  );
});

// 📌 Eliminar una invitación
app.delete("/api/invitaciones/:id", (req, res) => {
  db.run(
    "DELETE FROM invitaciones WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Invitación no encontrada" });
      res.status(204).send();
    }
  );
});

// 📌 Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
