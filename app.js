const express = require("express");
const db = require("./models/database");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (!err) {
      res.status(200).json(result.rows);
    } else {
      console.error("Error retrieving todos", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.post("/todos", (req, res) => {
  const text = req.body.item;
  const priority = req.body.priority;
  // const date = req.body.date;
  const notes = req.body.notes;
  const completed = req.body.completed;

  db.query(
    "INSERT INTO todos(item,priority,notes,completed) VALUES ($1,$2,$3,$4) RETURNING *",
    [text, priority, notes, completed],
    (err, result) => {
      if (!err) {
        res.status(201).json(result.rows[0]);
      } else {
        console.error("Error creating todo", err);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
});

app.put("/todos", (req, res) => {
  // console.log("request =", req.body);
  const id = req.body.id;
  const notes = req.body.notes;
  const priority = req.body.priority;
  const date = req.body.date;
  db.query(
    "UPDATE todos SET priority=$2, notes=$3 WHERE id=$1 RETURNING *",
    [id, priority, notes],
    (err, result) => {
      if (!err) {
        res.status(200).json(result.rows[0]);
      } else {
        console.error("Error updating todo data", err);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
});

app.patch("/todos", (req, res) => {
  const id = req.body.id;
  const bool = req.body.completed;

  db.query(
    "UPDATE todos SET completed=$2 WHERE id = $1 RETURNING *",
    [id, bool],
    (err, result) => {
      if (!err) {
        res.status(200).send("Todo checked item updated");
      } else {
        console.error("Error updating todo checked item", err);
        res.status(500).json({ error: "Internal server error" });
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
        res.json(result.rows[0]);
      } else {
        console.error("Error deleting todo", err);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Express listening at port 5000");
});
