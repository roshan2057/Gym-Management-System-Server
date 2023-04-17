const mysql= require("mysql");



const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "gym_db",
    connectionLimit: 10,
});
 

module.exports=pool;