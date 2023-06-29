let todos = [];
fetch("/todos", {
  method: "GET",
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
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
    // date: new Date(),
    notes: "",
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
  // props.appendChild(addDate(todo));
  props.appendChild(addEditBtn(todo));

  return props;
}

function addTextarea(todo) {
  const notes = document.createElement("input");
  notes.setAttribute("type", "textarea");
  const todoId = todo.id;
  notes.id = todoId;
  notes.value = todo.notes;
  return notes;
}

function addPriority(todo) {
  const priorityMenu = document.createElement("select");
  priorityMenu.className = "priority";
  const priorityOptions = ["none", "low", "high"];
  priorityMenu.value = todo.priority;

  priorityOptions.forEach((element) => {
    const options = document.createElement("option");
    options.textContent = element;
    priorityMenu.appendChild(options);
  });
  return priorityMenu;
}

function addDate(todo) {
  const date = document.createElement("input");
  date.setAttribute("type", "date");
  return date;
}

function addEditBtn(todo) {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  // editBtn.onclick = () => editTodo(todo);
  editBtn.addEventListener("click", () => {
    editTodo(todo);
    // console.log("edit todo =", todo);
  });
  return editBtn;
}

function editTodo(todo) {
  const notes = document.getElementById(todo.id);
  todo.notes = notes.value;
  // todo.priority = priorityMenu.value;
  // console.log("notes =", notes.value);
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
  deleteBtn.textContent = "\u00d7";
  deleteBtn.onclick = () => deleteTodo(todo.id);
  return deleteBtn;
}

function toggleCompleted(todo) {
  todo.completed = !todo.completed;
  fetch("/todos", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res)
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
        return element.id !== data.id;
      });
      displayTodos();
    });
}
