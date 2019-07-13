function createTodo(name, id) {
  return { name: name, id: id, completed: false };
}

let tasks = [
  {
    id: 0,
    name: "Do homework",
    completed: false
  },
  {
    id: 1,
    name: "Pay bills",
    completed: false
  },
  {
    id: 2,
    name: "sleep",
    completed: true
  },
  {
    id: 3,
    name: "wake up",
    completed: true
  }
];

function renderItems(element, tasks, completedCheck) {
  element.innerHTML = tasks
    .filter(completedCheck)
    .map(task => {
      return `<li class="${task.completed ? "item completed-item" : "item uncompleted-item"}">
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

function addTask(name) {
  tasks.push(createTodo(name, tasks.length));
  render(tasks);
}

function completeItem(event) {
  let taskToComplete = tasks.find(task => task.id == getId(event));
  taskToComplete.completed = true;
  render(tasks);
}

function deleteItem(event) {
  tasks = tasks.filter(task => task.id != getId(event));
  render(tasks);
}

function unCompleteItem(event) {
  let taskToUnComplete = tasks.find(task => task.id == getId(event));
  taskToUnComplete.completed = false;
  render(tasks);
}

const getId = event => {
  return Number(event.target.id);
};

function render(tasks) {
  let uncompletedList = document.querySelector(".uncompleted-tasks ul");
  let completedList = document.querySelector(".completed-tasks ul");
  renderItems(completedList, tasks, task => task.completed);
  renderItems(uncompletedList, tasks, task => !task.completed);
  Array.from(document.querySelectorAll("div.actions i.completeAction")).forEach(el =>
    el.addEventListener("click", completeItem)
  );
  Array.from(document.querySelectorAll("div.actions i.deleteAction")).forEach(el =>
    el.addEventListener("click", deleteItem)
  );
  Array.from(document.querySelectorAll("div.actions i.unCompleteAction")).forEach(el =>
    el.addEventListener("click", unCompleteItem)
  );
}

render(tasks);

document.querySelector("#add-task").addEventListener("click", event => {
  event.preventDefault();
  let input = document.querySelector("#new-task");
  addTask(input.value);
  input.value = "";
});
