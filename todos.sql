CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    item TEXT NOT NULL,
    completed boolean NOT NULL DEFAULT FALSE
);

INSERT INTO todos(item, completed)
VALUES
('todo1', false),
('todo2', false),
('todo3', false);
