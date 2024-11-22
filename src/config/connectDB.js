const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "204.10.161.7",
  port: 3306,
  user: "testDB",
  password: "Y7TL2Kaix2d656de",
  database: "testdb",
  connectTimeout: 20000,
});

export default connection;