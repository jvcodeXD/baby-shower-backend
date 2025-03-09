const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/data-source");
const rutas = require("./routes/index");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB()
  .then(() => {
    app.use("/api", rutas);

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ No se pudo iniciar el servidor:", error);
  });
