const mysql = require("mysql");
require('dotenv').config();



const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database_name,
  connectionLimit: 20,
});

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (error.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (error.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
    console.error("Error connecting to database:", error.message);
    return;
  }

  if (connection) {
    connection.release();
    console.log("Connected to the database.");
  }
});

module.exports = pool;