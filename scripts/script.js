const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div class="todo-grid">
      <input type="checkbox" class="js-input-checkbox input-checkbox">
      <label class="todo-task">${name}</label>
      <div class="todo-due-date">${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
      </div>
    `;

    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document
    .querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
        saveToStorage();
      });
    });
}

const inputElement = document.querySelector('.js-name-input');

document
  .querySelector('.js-name-input')
  .addEventListener('keydown', (event) => {
    if (inputElement.value != '' && event.key === 'Enter') {
      addTodo();
    }
  });

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');

  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');

  const dueDate = dateInputElement.value;

  todoList.push({
    name,
    dueDate,
  });

  inputElement.value = '';

  renderTodoList();

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
