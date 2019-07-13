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
      return `<li>${task.name}</li>`;
    })
    .join("");
}

render(uncompletedList,tasks,task => task.completed);
render(completedList,tasks,task => !task.completed);


