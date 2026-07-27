// src/config/db.js
const mysql = require('mysql2/promise');

// Usamos um 'pool' de conexões para melhor performance e controle de concorrência
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'rootpassword', // A senha que definimos no docker-compose
  database: 'editorial_saas',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;