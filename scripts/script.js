const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <input type="checkbox" class="js-input-checkbox input-checkbox">
      <div class="todo-task">${name}</div>
      <div class="todo-due-date">${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
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

const checkboxElement = document.querySelectorAll('.js-input-checkbox');

const todoTaskElement = document.querySelectorAll('.todo-task');

checkboxElement.forEach((checkbox) => {
  todoTaskElement.forEach((element) => {
    checkbox.addEventListener('click', () => {
      element.classList.toggle('todo-task-checked');
    });
  });
});

// todoTaskElement.forEach((element) => {
//   checkboxElement.forEach((checkbox) => {

//   });
// });

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
