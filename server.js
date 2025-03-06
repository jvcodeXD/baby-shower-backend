const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { Pool } = require("pg"); // 📌 Importar Pool de PostgreSQL

const app = express();
const port = process.env.PORT || 5000; // 📌 Heroku usa una variable de entorno para el puerto

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 📌 Conectar a PostgreSQL en Heroku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Heroku asigna esta variable automáticamente
  ssl: {
    rejectUnauthorized: false, // Necesario para conectarse en Heroku
  },
});

// 📌 Crear la tabla si no existe
pool
  .query(
    `CREATE TABLE IF NOT EXISTS invitaciones (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    hora TEXT NOT NULL
  );`
  )
  .catch((err) => console.error("Error creando la tabla:", err));

// 📌 Obtener todas las invitaciones
app.get("/api/invitaciones", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM invitaciones");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Obtener una invitación por ID
app.get("/api/invitaciones/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM invitaciones WHERE id = $1",
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "Invitación no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Crear una nueva invitación con UUID
app.post("/api/invitaciones", async (req, res) => {
  try {
    const { nombre, hora } = req.body;
    const id = uuidv4();
    await pool.query(
      "INSERT INTO invitaciones (id, nombre, hora) VALUES ($1, $2, $3)",
      [id, nombre, hora]
    );
    res.status(201).json({ id, nombre, hora });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Eliminar una invitación
app.delete("/api/invitaciones/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM invitaciones WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Invitación no encontrada" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
