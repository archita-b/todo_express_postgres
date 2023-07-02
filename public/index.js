let todos = [];
fetch("/todos", {
  method: "GET",
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.map((element) => {
      if (element.duedate !== null) {
        const match = element.duedate.match(/T/);
        const matchIndex = match.index;
        return (element.duedate = element.duedate.slice(0, matchIndex));
      }
    });
    todos = data;
    displayTodos();
  });

const addBtn = document.querySelector("#add-btn");
addBtn.onclick = addTodo;

function addTodo() {
  const todoInput = document.querySelector(".todoInput");
  const todoText = todoInput.value.trim();
  if (todoText === "") {
    alert("You must write something!");
    return;
  }

  const todo = {
    item: todoText,
    priority: "none",
    notes: "",
    duedate: null, //Date.now(),
    completed: false,
  };
  todoInput.value = "";

  fetch("/todos", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      todos.push(data);
      displayTodos();
    });
}

function displayTodos() {
  const todoList = document.querySelector(".todoList");
  todoList.textContent = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    todoItem.appendChild(createCheckbox(todo));

    todoItem.appendChild(createTodoText(todo));

    todoItem.appendChild(createTodoProps(todo));

    todoItem.appendChild(createDeleteBtn(todo));

    todoList.appendChild(todoItem);
  });
}

function createCheckbox(todo) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  checkbox.onclick = () => toggleCompleted(todo);
  return checkbox;
}

function createTodoText(todo) {
  const todoTextSpan = document.createElement("span");
  todoTextSpan.textContent = todo.item;
  if (todo.completed) {
    todoTextSpan.classList.add("completed");
  }
  return todoTextSpan;
}

function createTodoProps(todo) {
  const props = document.createElement("div");
  props.className = "todo-props";

  props.appendChild(addTextarea(todo));
  props.appendChild(addPriority(todo));
  props.appendChild(addDate(todo));
  props.appendChild(addSubmitBtn(todo));

  return props;
}

function addTextarea(todo) {
  const notes = document.createElement("input");
  notes.setAttribute("type", "textarea");
  notes.id = "notes" + todo.id;
  notes.value = todo.notes;
  return notes;
}

function addPriority(todo) {
  const priorityMenu = document.createElement("select");
  priorityMenu.className = "priority";
  const priorityOptions = ["none", "low", "high"];

  priorityMenu.id = "priority" + todo.id;

  priorityOptions.forEach((element) => {
    const options = document.createElement("option");
    options.textContent = element;
    priorityMenu.appendChild(options);
  });

  priorityMenu.value = todo.priority;

  return priorityMenu;
}

function addDate(todo) {
  const duedate = document.createElement("input");
  duedate.setAttribute("type", "date");
  duedate.id = "date" + todo.id;
  duedate.value = todo.duedate;
  return duedate;
}

function addSubmitBtn(todo) {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Submit";
  editBtn.onclick = () => submitTodo(todo);
  return editBtn;
}

function submitTodo(todo) {
  const notesID = "notes" + todo.id;
  const notes = document.getElementById(notesID);
  todo.notes = notes.value;

  const priorityID = "priority" + todo.id;
  const priority = document.getElementById(priorityID);
  todo.priority = priority.value;

  const duedateID = "date" + todo.id;
  const duedate = document.getElementById(duedateID);
  todo.duedate = duedate.value;

  fetch("/todos", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((data) => {
      displayTodos();
    });
}

function createDeleteBtn(todo) {
  const deleteBtn = document.createElement("button");
  deleteBtn.id = "del-btn";
  deleteBtn.textContent = "\u00d7";
  deleteBtn.onclick = () => deleteTodo(todo.id);
  return deleteBtn;
}

function toggleCompleted(todo) {
  todo.completed = !todo.completed;
  fetch("/todos/checked", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((data) => {
      displayTodos();
    });
}

function deleteTodo(id) {
  fetch("/todos/" + id, {
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      todos = todos.filter((element) => {
        return element.id !== id;
      });
      displayTodos();
    });
}
