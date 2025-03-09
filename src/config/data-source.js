const { DataSource } = require("typeorm");
require("dotenv").config(); // Cargar variables de entorno

// Detectar si estamos en Heroku (si DATABASE_URL está definida)
const isHeroku = !!process.env.DATABASE_URL;

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "", // Si no estamos en Heroku, DATABASE_URL puede no estar definida
  host: isHeroku ? undefined : process.env.POSTGRES_HOST, // No necesario si estamos en Heroku
  port: isHeroku ? undefined : Number(process.env.POSTGRES_PORT) || 5432, // No necesario si estamos en Heroku
  username: isHeroku ? undefined : process.env.POSTGRES_USER, // No necesario si estamos en Heroku
  password: isHeroku ? undefined : process.env.POSTGRES_PASSWORD, // No necesario si estamos en Heroku
  database: isHeroku ? undefined : process.env.POSTGRES_DB, // No necesario si estamos en Heroku
  synchronize: true, // Solo en desarrollo o si estás seguro de que la base de datos está bien estructurada
  logging: false,
  ssl: isHeroku ? { rejectUnauthorized: false } : undefined, // Requerido en Heroku para conexiones SSL
  entities: ["src/app/entities/*"], // Asegúrate de que las rutas a tus entidades sean correctas
  migrations: ["src/migrations"], // Asegúrate de que las rutas a tus migraciones sean correctas
});

const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Base de datos conectada exitosamente");
  } catch (error) {
    console.error("❌ Error conectando la base de datos:", error);
  }
};

module.exports = { AppDataSource, connectDB };
