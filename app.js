const express = require("express");
// const client = require("./database");

const app = express();
const todos = [];

app.use(express.static("public"));

app.use(express.text());

app.get("/todos", (req, res) => {
  res.send(todos);
  console.log("This is a GET request");
});

app.post("/", (req, res) => {
  todos.push(req.body);
  console.log("Created todo item =", req.body);
});

app.delete("/", (req, res) => {
  console.log("Deleted the todo item at index", req.body);
});

app.listen(3000, () => {
  console.log("Express listening at port 3000");
});

// client.connect();

// client.query("select * from todos", (err, result) => {
//   if (!err) {
//     console.log(result.rows);
//   }
//   client.end();
// });
