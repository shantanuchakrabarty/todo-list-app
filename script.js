const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const checkbox = li.querySelector("input[type='checkbox']");
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: checkbox.checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create a task element
function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "10px";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    // Task text
    const span = document.createElement("span");
    span.textContent = taskText;
    if (isCompleted) {
        span.style.textDecoration = "line-through";
        span.style.color = "#888";
    }

    // Toggle complete when checkbox is clicked
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            span.style.color = "#888";
        } else {
            span.style.textDecoration = "none";
            span.style.color = "#333";
        }
        saveTasks();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "auto";
    deleteBtn.style.backgroundColor = "#dc3545";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.padding = "5px 12px";
    deleteBtn.style.borderRadius = "6px";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", function() {
        li.remove();
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    saveTasks();
    taskInput.value = "";
}

// Load tasks on page load
loadTasks();