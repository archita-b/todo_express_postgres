-- From psql console connecting to a certain database
\c todos

-- Creating a table(database) from psql console
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    item TEXT NOT NULL,
    priority TEXT NOT NULL,
    notes TEXT,
    completed boolean NOT NULL 
);

-- Populating the table
INSERT INTO todos(item,priority,notes, completed)
VALUES
('todo1','none', 'notes1',false),
('todo2','none','notes2',false),
('todo3','none','notes3',false);

-- Retrieving data from table
SELECT * FROM todos;
SELECT <column> FROM todos WHERE <condition>;

-- Updating the value of an already present query record
UPDATE todos SET <columnN> = <valueN> WHERE <condition>;

-- Deleting recods present in the table
DELETE FROM todos WHERE <condition>;

-- Deleting a table(database) from psql console
DROP TABLE <table_name>;
