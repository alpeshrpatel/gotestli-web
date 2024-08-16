const mysql = require("mysql2/promise");
const dbConfig = require("../config/dbConfig");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports.connectP = connection;
