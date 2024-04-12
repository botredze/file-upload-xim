const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DB_PORT || 3306, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}


async function query(sql, params) {
    const connection = await mysql.createConnection(config);
    const [results,] = await connection.execute(sql, params);

    return results;
}

module.exports = {query};