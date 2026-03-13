const mysql = require("mysql2"); // import mysql2 package

// create database connection
const db = mysql.createConnection({
    host: "localhost",        // database host
    user: "root",             // mysql username
    password: "Kuld7458#",    // mysql password
    database: "project_manager" // database name
});

// connect to mysql database
db.connect(err => {

    // if connection fails
    if (err) {
        console.log(err);
    } 
    else {
        console.log("MySQL Connected"); // success message
    }
});

// export database connection so other files can use it
module.exports = db;