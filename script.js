// Task Manager App
document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const priority = document.getElementById("priority");
  const tasksUl = document.getElementById("tasks");
  const themeToggle = document.getElementById("theme-toggle");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();
  const root = document.documentElement;

  // Load theme
  if (localStorage.getItem("theme") === "dark") {
    root.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    tasksUl.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task-item priority-${task.priority}`;
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button onclick="deleteTask(${index})">🗑</button>
        </div>
      `;
      tasksUl.appendChild(li);
    });
  }

  window.deleteTask = function (index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ text, priority: priority.value });
    saveTasks();
    renderTasks();

    taskForm.reset();
  });

  renderTasks();
});
