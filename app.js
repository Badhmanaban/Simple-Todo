const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

// All Event Run
allEvent();

// Load All Event Listerns
function allEvent() {
  // DOM Loadevent listerns
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add Task Event
  form.addEventListener("submit", addTask);
  // Remove Task
  taskList.addEventListener("click", removeTask);
  // Clear Button
  clearBtn.addEventListener("click", clearTask);
  // filter Tasks
  filter.addEventListener("keyup", filterTasks);
}
// GetTasks From Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create li Element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    //   create TextNode
    li.appendChild(document.createTextNode(task));

    // create link Element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // icon fontawesom html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Append Li to Ul
    taskList.appendChild(li);
  });
}

// Add Task  Function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }

  // create li Element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  //   create TextNode
  li.appendChild(document.createTextNode(taskInput.value));

  // create link Element
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // icon fontawesom html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  // Append
  li.appendChild(link);

  // Append Li to Ul
  taskList.appendChild(li);

  // Store LocalStorage
  storeLocalstorage(taskInput.value);

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}

// set Local Storage
function storeLocalstorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Tasks
function removeTask(e) {
  // Event Bubbling
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    // Remove From LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove from LS

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ClearTask
function clearTask() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // taskList.innerHTML = "";
  clearLocalStorage();
}
// ClearALL from LS
function clearLocalStorage() {
  localStorage.clear();
}
// FilterTasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
