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

    todoItem.appendChild(createDeleteBtn(todo));

    todoList.appendChild(todoItem);
  });
}

function createCheckbox(todo) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  checkbox.onclick = () => toggleCompleted(todo); //changed
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

function createDeleteBtn(todo) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "\u00d7";
  deleteBtn.onclick = () => deleteTodo(todo.id);
  return deleteBtn;
}

function toggleCompleted(todo) {
  todo.completed = !todo.completed; //changed
  fetch("/todos", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res)
    .then((data) => {
      // todos.push(data);
      displayTodos();
    });
  // displayTodos();
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
