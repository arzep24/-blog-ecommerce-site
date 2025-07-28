import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

// Exporta una única función para que el resto de la app la use
// Esto centraliza todas las consultas a través de este módulo
async function query(text, params) {
    const res = await pool.query(text, params);
    return res;
}

// Cierra el pool de conexiones al finalizar la aplicación
async function end() {
    await pool.end();
}
const db = { query, end };
export default db;