import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const context = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export const connectionDB = async () => {
  try {
    await context.connect();
    console.log("Kết nối với PostgreSQL thành công!");
  } catch (err) {
    console.error("Kết nối với PostgreSQL thất bại", err.message);
  }
}

