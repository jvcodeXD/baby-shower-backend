import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/data-source";
import invitacionRoutes from "./routes";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB()
  .then(() => {
    app.use("/api", invitacionRoutes);

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ No se pudo iniciar el servidor:", error);
  });
