const { Pool } = require('pg');

const dbConfig = {
    user: 'dqpuvkvc',
    host: 'kashin.db.elephantsql.com',
    database: 'dqpuvkvc',
    password: 'evZDrjDUjrE9BP9thtyz6lD0RLFxU4ht',
    port: 5432
}

export async function executeSQL(sqlScript) {
    try {
        const pool = new Pool(dbConfig);
        const cliente = await pool.connect();

        const result = await cliente.query(sqlScript);
        console.log('Deu certo', result.rows);
    } catch (err) {
        console.log('Erro ao executar SQL', err);
    }
}