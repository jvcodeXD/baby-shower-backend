import { DataSource } from "typeorm";
import "dotenv/config"; // Cargar variables de entorno

const isHeroku = !!process.env.DATABASE_URL; // Detectar si estamos en Heroku

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  ssl: isHeroku ? { rejectUnauthorized: false } : undefined,
  entities: ["src/app/entities/*"],
  migrations: ["src/migrations"],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Base de datos conectada exitosamente");
  } catch (error) {
    console.error("❌ Error conectando la base de datos:", error);
  }
};
