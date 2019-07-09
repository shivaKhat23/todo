function createTodo(name) {
  return { name: name, completed: false };
}

const isCompleted = task => task.completed;
const isNotCompleted = task => !task.completed;

const getFilteredTasks = (tasks, test) => {
  let result = [];
  for (let task of tasks) {
    if (test(task)) {
      result.push(task);
    }
  }
  return result;
};

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

let uncompletedContainer = document.getElementById("todo");
let completedContainer = document.getElementById("completed");

let completedTasks = getFilteredTasks(tasks, isCompleted);
let uncompletedTasks = getFilteredTasks(tasks, isNotCompleted);

console.log(completedTasks);
console.log(uncompletedTasks);

uncompletedContainer.innerHTML = uncompletedTasks.map(task => {
  return `<li>${task.name}</li>`;
}).join("");

completedContainer.innerHTML = completedTasks.map(task => {
  return `<li>${task.name}</li>`;
}).join("");

