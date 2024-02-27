"use strict";
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("myUL");
const inputField = document.getElementById("myInput");
document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM został wywołany");
	const savedToDo = JSON.parse(localStorage.getItem("tasks")) || [];

	savedToDo.forEach((task) => {
		addTaskToList(task);
	});
});

function addTaskToList(taskTxt) {
	const newLi = document.createElement("li");

	newLi.innerText = taskTxt;
	const closeBtn = document.createElement("span");
	closeBtn.className = "close";
	closeBtn.innerHTML = "&times";
	const checked = document.querySelector("ul");
	newLi.append(closeBtn);
	closeBtn.addEventListener("click", () => {
		newLi.remove();
		updateLocalStorage();
	});
	checked.addEventListener("click", () => {
		if (checked.style.textDecoration === "line-through") {
			checked.style.textDecoration = "none";
		} else {
			checked.style.textDecoration = "line-through";
		}
		updateLocalStorage();
	});
	list.append(newLi);
}

addBtn.addEventListener("click", () => {
	const input = inputField.value;

	if (list.children.length > 9) {
		alert("Dodałeś maksymalną liczbę zadań");
		return;
	}

	if (input == "") {
		alert("Przed dodaniem wpisz zadanie 😁😁😁");
		return;
	}

	addTaskToList(input);
	updateLocalStorage();
	inputField.value = "";
});

function updateLocalStorage() {
	const tasks = [];
	list.querySelectorAll("li").forEach((task) => {
		tasks.push(task.innerText);
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}
