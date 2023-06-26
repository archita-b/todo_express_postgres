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
    // console.log("todo_fetch =", todos);
  });

// displayTodos();

const addBtn = document.querySelector("#add-btn");
addBtn.onclick = addTodo;

function addTodo() {
  // console.log("todos =", todos);
  const todoInput = document.querySelector(".todoInput");
  const todoText = todoInput.value.trim();
  if (todoText === "") {
    alert("You must write something!");
    return;
  }
  const todo = {
    item: todoText,
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
      todos.push(todo);
      displayTodos();
      // console.log(data);
    });
}

function displayTodos() {
  // console.log(todos);
  const todoList = document.querySelector(".todoList");
  todoList.textContent = "";

  todos.forEach((todo, id) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    todoItem.appendChild(createCheckbox(todo, id));

    todoItem.appendChild(createTodoText(todo, id));

    todoItem.appendChild(createDeleteBtn(todo, id));

    todoList.appendChild(todoItem);
  });
}

function createCheckbox(todo, id) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  checkbox.onclick = () => toggleCompleted(id);
  return checkbox;
}

function createTodoText(todo, id) {
  // console.log("todo =", todo);
  const todoTextSpan = document.createElement("span");
  todoTextSpan.textContent = todo.item;
  if (todo.completed) {
    todoTextSpan.classList.add("completed");
  }
  return todoTextSpan;
}

function createDeleteBtn(todo, id) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "\u00d7";
  deleteBtn.onclick = () => deleteTodo(id);
  return deleteBtn;
}

function toggleCompleted(id) {
  todos[id].completed = !todos[id].completed;
  displayTodos();
}

function deleteTodo(id) {
  todos.splice(id, 1);
  fetch("/todos", {
    method: "DELETE",
  })
    .then((res) => {
      return res;
    })
    .then((data) => {
      // todos.splice(id, 1);
      displayTodos();
      console.log(todos);
    });
}
