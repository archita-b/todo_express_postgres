const express = require("express");
const pool = require("./models/database");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/todos", (req, res) => {
  pool.query("SELECT * FROM todos", (err, result) => {
    if (!err) {
      // console.log(result.rows);
      res.send(result.rows);
    } else {
      console.log("Error =", err);
    }
  });
});

app.post("/todos", (req, res) => {
  // console.log("req =", req.body);
  const text = req.body.item;
  pool.query("INSERT INTO todos(item) VALUES ($1)", [text], (err) => {
    if (!err) {
      res.status(201).json("Todo item created");
    } else {
      // res.send(err)
      console.log("Error =", err);
    }
  });
});

app.delete("/todos", (req, res) => {
  const id = req.id;
  console.log("id =", id);
  pool.query("DELETE FROM todos WHERE id = $1", [id], (err) => {
    if (!err) {
      res.send("Todo item deleted");
    } else {
      console.log("Error =", err);
    }
  });
});

app.listen(3000, () => {
  console.log("Express listening at port 3000");
});
