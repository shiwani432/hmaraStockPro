require('dotenv').config(); // Ye line .env file ko read karegi
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log("Online DB Connection Failed: " + err.message);
    } else {
        console.log("Database connected successfully using Environment Variables!");
        connection.release();
    }
});

module.exports = pool.promise();    