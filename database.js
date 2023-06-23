const { Client } = require("pg");
// const dotenv = require("dotenv");
// dotenv.config();

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123",
  database: "todos",
});

module.exports = client;

client.connect();

client.query("select * from todos", (err, result) => {
  if (!err) {
    console.log(result.rows);
  }
  client.end();
});
