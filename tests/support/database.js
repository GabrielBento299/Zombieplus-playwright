require('dotenv').config();

const { Pool } = require('pg');

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

export async function executeSQL(sqlScript) {
    try {
        const pool = new Pool(dbConfig);
        const cliente = await pool.connect();

        const result = await cliente.query(sqlScript);
    } catch (err) {
    }
}