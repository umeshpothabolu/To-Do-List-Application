let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll("[data-filter]");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //backend
    saveTasks()
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks
        .filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        })
        .forEach((task, index) => {
            const li = document.createElement("li");
            if (task.completed) li.classList.add("completed");

            const span = document.createElement("span");
            span.textContent = task.text;
            span.addEventListener("click", () => toggleComplete(index));

            const actions = document.createElement("div");
            actions.className = "actions";

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editTask(index));

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteTask(index));

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            li.appendChild(span);
            li.appendChild(actions);
            taskList.appendChild(li);
        });
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return alert("Enter a task");

    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText && newText.trim()) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filter = button.dataset.filter;
        renderTasks();
    });
});

addBtn.addEventListener("click", addTask);

renderTasks();