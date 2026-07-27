const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,         // Vai ler 'db' vindo do docker-compose
    user: process.env.DB_USER,         // Vai ler 'root'
    password: process.env.DB_PASSWORD, // Vai ler 'sua_senha_root'
    database: process.env.DB_NAME      // Vai ler 'db_parcerias'
});

module.exports = pool.promise();