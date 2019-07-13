function createTodo(name) {
  return { name: name, completed: false };
}

let tasks = [
  {
    name: "Do homework",
    completed: false
  },
  {
    name: "Pay bills",
    completed: false
  },
  {
    name: "sleep",
    completed: true
  },
  {
    name: "wake up",
    completed: true
  }
];

let uncompletedList = document.querySelector(".uncompleted-tasks ul");
let completedList = document.querySelector(".completed-tasks ul");

function render(element, tasks, completedCheck) {
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
       <i class="fa fa-check-square"></i>
       <i class="fa fa-trash-alt"></i>
    `;
  } else {
    return `
       <i class="fa fa-undo"></i>
       <i class="fa fa-trash-alt"></i>
    `;
  }
}

render(completedList, tasks, task => task.completed);
render(uncompletedList, tasks, task => !task.completed);
