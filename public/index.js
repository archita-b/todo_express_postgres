let todos = [];

const storedTodos = localStorage.getItem("todos");
if (storedTodos !== null) {
  todos = JSON.parse(storedTodos);
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

displayTodos();

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
    text: todoText,
    completed: false,
  };
  todos.push(todo);
  todoInput.value = "";
  saveToLocalStorage();
  displayTodos();

  fetch("/", {
    method: "POST",
    body: JSON.stringify(todo),
  }).then((res) => {
    res.json;
  });
}

function displayTodos() {
  const todoList = document.querySelector(".todoList");
  todoList.textContent = "";

  todos.forEach((todo, id) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    todoItem.appendChild(createCheckbox(todo, id));

    todoItem.appendChild(createTodoText(todo, id));

    todoItem.appendChild(createDeleteBtn(todo, id));

    todoList.appendChild(todoItem);

    fetch("/todos", {
      method: "GET",
    })
      .then((res) => {
        res.json;
      })
      .then((data) => {
        console.log(data);
      });
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
  const todoTextSpan = document.createElement("span");
  todoTextSpan.textContent = todo.text;
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
  saveToLocalStorage();
  displayTodos();
}

function deleteTodo(id) {
  todos.splice(id, 1);
  fetch("/", {
    method: "DELETE",
    body: JSON.stringify(id),
  }).then((res) => {
    res.json;
  });
  saveToLocalStorage();
  displayTodos();
}
