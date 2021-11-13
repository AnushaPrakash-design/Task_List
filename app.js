// define the variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const tasklist = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

//  all event listeners
loadEventListeners();

function loadEventListeners() {
	document.addEventListener("DOMContentLoaded", getTasks);
	form.addEventListener("submit", addtask);
	tasklist.addEventListener("click", removeTask);
	clearBtn.addEventListener("click", clearAllTasks);
	filter.addEventListener("keyup", filterTasks);
}

// get tasks from local Storage
function getTasks() {
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task) {
		const li = document.createElement("li");
		li.className = "collection-item";
		li.appendChild(document.createTextNode(task));

		const link = document.createElement("a");
		link.className = " delete-item secondary-content";
		link.innerHTML = "<img src='/img/x.png' width='15px' height='15px'>";
		li.appendChild(link);

		tasklist.appendChild(li);
	});
}

//  Add the task
function addtask(e) {
	if (taskInput.value === "") {
		alert("Add the task");
	}

	//  create the elements
	const li = document.createElement("li");
	li.className = "collection-item";
	li.appendChild(document.createTextNode(taskInput.value));

	const link = document.createElement("a");
	link.className = " delete-item secondary-content";
	link.innerHTML = "<img src='/img/x.png' width='15px' height='15px'>";
	li.appendChild(link);

	tasklist.appendChild(li);

	// store in local storage
	storeTaskInLocalStorage(taskInput.value);

	taskInput.value = "";
	e.preventDefault();
}

// Storing the task

function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove the task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		console.log(e.target);
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();

			// removing from local storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
	// console.log('taskItem');
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

//  clear all the tasks
function clearAllTasks() {
	// tasklist.innerHTML = "";
	while (tasklist.firstChild) {
		tasklist.removeChild(tasklist.firstChild);
	}

	//  clearing from the local storage
	clearAllTasksFromLocalStorage();
}

function clearAllTasksFromLocalStorage() {
	localStorage.clear();
}
//  Filter the tasks

function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	console.log(text);
	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
