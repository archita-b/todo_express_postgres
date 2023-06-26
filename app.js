const express = require("express");
const db = require("./models/database");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log("Error =", err);
    }
  });
});

app.post("/todos", (req, res) => {
  const text = req.body.item;
  db.query(
    "INSERT INTO todos(item) VALUES ($1) RETURNING *",
    [text],
    (err, result) => {
      if (!err) {
        res.send(result.rows[0]);
      } else {
        console.log("Error =", err);
      }
    }
  );
});

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params["id"];
  db.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *",
    [todoId],
    (err, result) => {
      if (!err) {
        res.send(result.rows[0]);
      } else {
        console.log("Error =", err);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Express listening at port 5000");
});
