-- From psql console connecting to a certain database
\c todos

-- Creating a table(database) from psql console
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    item TEXT NOT NULL,
    completed boolean NOT NULL 
);

-- Populating the table
INSERT INTO todos(item, completed)
VALUES
('todo1', false),
('todo2', false),
('todo3', false);

-- Retrieving data from table
SELECT * FROM todos;
SELECT <column> FROM todos WHERE <condition>;

-- Updating the value of an already present query record
UPDATE todos SET <columnN> = <valueN> WHERE <condition>;

-- Deleting recods present in the table
DELETE FROM todos WHERE <condition>;

-- Deleting a table(database) from psql console
DROP TABLE <table_name>;
