const { DataSource } = require("typeorm");
require("dotenv").config(); // Cargar variables de entorno

const isHeroku = !!process.env.DATABASE_URL; // Detectar si estamos en Heroku

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Usar DATABASE_URL de Heroku
  synchronize: true,
  logging: false,
  ssl: isHeroku ? { rejectUnauthorized: false } : undefined,
  entities: ["src/app/entities/*"],
  migrations: ["src/migrations"],
});

const connectDB = async () => {
  try {
    // Iniciar la conexión con la base de datos
    await AppDataSource.initialize();
    console.log("📦 Base de datos conectada exitosamente");
  } catch (error) {
    console.error("❌ Error conectando la base de datos:", error);
  }
};

module.exports = { AppDataSource, connectDB };
