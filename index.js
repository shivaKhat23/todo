// Task creation and management
function createTodo(name, id) {
  return { name: name, id: id, completed: false };
}

let tasks = [
  { id: 0, name: "Do homework", completed: false },
  { id: 1, name: "Pay bills", completed: false },
  { id: 2, name: "sleep", completed: true },
  { id: 3, name: "wake up", completed: true },
];

// Utility functions
const getId = (event) => Number(event.target.id);

function getActions(task) {
  if (!task.completed) {
    return `
      <i id="${task.id}" class="fa fa-check-square completeAction"></i>
      <i id="${task.id}" class="fa fa-trash-alt deleteAction"></i>
    `;
  } else {
    return `
      <i id="${task.id}" class="fa fa-undo unCompleteAction"></i>
      <i id="${task.id}" class="fa fa-trash-alt deleteAction"></i>
    `;
  }
}

// Rendering functions
function renderItems(element, tasks, completedCheck) {
  element.innerHTML = tasks
    .filter(completedCheck)
    .map((task) => {
      return `<li 
        id="${task.id}"
        draggable="true" 
        class="${
          task.completed ? "item completed-item" : "item uncompleted-item"
        }">
          <div>
            <i class="fa fa-circle"></i>
            <span>${task.name}</span>
          </div>
          <div class="actions">
            ${getActions(task)}
          </div>
      </li>`;
    })
    .join("");
}

function render(tasks) {
  const uncompletedList = document.querySelector(".uncompleted-tasks ul");
  const completedList = document.querySelector(".completed-tasks ul");
  renderItems(completedList, tasks, (task) => task.completed);
  renderItems(uncompletedList, tasks, (task) => !task.completed);

  const uncompletedContainer = document.querySelector("div.uncompleted-tasks");
  const completedContainer = document.querySelector("div.completed-tasks");

  uncompletedContainer.addEventListener("dragover", dragOverHandler);
  uncompletedContainer.addEventListener("drop", (event) =>
    dropHandler(event, false)
  );

  completedContainer.addEventListener("dragover", dragOverHandler);
  completedContainer.addEventListener("drop", dropHandler);

  document
    .querySelectorAll("li")
    .forEach((el) => el.addEventListener("dragstart", dragStartHandler));
  document
    .querySelectorAll("div.actions i.completeAction")
    .forEach((el) => el.addEventListener("click", completeItem));
  document
    .querySelectorAll("div.actions i.deleteAction")
    .forEach((el) => el.addEventListener("click", deleteItem));
  document
    .querySelectorAll("div.actions i.unCompleteAction")
    .forEach((el) => el.addEventListener("click", unCompleteItem));
}

// Event handlers
function addTask(name) {
  tasks.push(createTodo(name, tasks.length));
  render(tasks);
}

function completeItem(event) {
  const taskToComplete = tasks.find((task) => task.id == getId(event));
  taskToComplete.completed = true;
  render(tasks);
}

function deleteItem(event) {
  tasks = tasks.filter((task) => task.id != getId(event));
  render(tasks);
}

function unCompleteItem(event) {
  const taskToUnComplete = tasks.find((task) => task.id == getId(event));
  taskToUnComplete.completed = false;
  render(tasks);
}

function dragStartHandler(event) {
  const id = getId(event);
  event.dataTransfer.setData("text/plain", id);
}

function dragOverHandler(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function dropHandler(event, completed = true) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  const task = tasks.find((task) => task.id == id);
  task.completed = completed;
  render(tasks);
}

// Initial render and event listener setup
render(tasks);

document.querySelector("#add-task").addEventListener("click", (event) => {
  event.preventDefault();
  const input = document.querySelector("#new-task");
  addTask(input.value);
  input.value = "";
});
