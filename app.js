const express = require("express");
const db = require("./models/database");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos_table", (err, result) => {
    if (!err) {
      res.status(200).json(result.rows);
    } else {
      console.error("Error retrieving todos", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.post("/todos", (req, res) => {
  const { item, priority, notes, duedate, completed } = req.body;

  db.query(
    "INSERT INTO todos_table(item,priority,notes,duedate,completed) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [item, priority, notes, duedate, completed],
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
  console.log("request=", req.body);
  const { id, notes, priority, duedate } = req.body;

  db.query(
    "UPDATE todos_table SET priority=$2, notes=$3, duedate=$4 WHERE id=$1 RETURNING *",
    [id, priority, notes, duedate],
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
  const { id, completed } = req.body;

  db.query(
    "UPDATE todos_table SET completed=$2 WHERE id = $1 RETURNING *",
    [id, completed],
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
    "DELETE FROM todos_table WHERE id = $1 RETURNING *",
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
