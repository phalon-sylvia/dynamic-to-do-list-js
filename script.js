// Ensure the DOM has loaded before running script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory list of tasks
    let tasks = [];

    /**
     * saveTasks - Serialize the tasks array to localStorage
     */
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * createTaskElement - Create DOM element for a task object and append to the list
     * @param {{id: string, text: string}} task
     */
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Create a Remove button and set up its behavior
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When clicked, remove the list item from the list and update storage
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);
            // Remove from tasks array
            tasks = tasks.filter(t => t.id !== task.id);
            // Save updated tasks to localStorage
            saveTasks();
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    /**
     * addTask - Create a new task and append it to the list (optionally save)
     * @param {string} [taskText] - Text for the task; if omitted, value from the input will be used
     * @param {boolean} [save=true] - Whether to save the task to localStorage
     */
    function addTask(taskText, save = true) {
        // Get and trim the input value if taskText wasn't provided
        const text = (typeof taskText === 'undefined' || taskText === null) ? taskInput.value.trim() : String(taskText).trim();

        // If no text, warn the user and return early
        if (text === '') {
            alert('Please enter a task.');
            return; // don't add an empty task
        }

        // Create a new task object
        const task = {
            id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
            text
        };

        // Add to memory and DOM
        tasks.push(task);
        createTaskElement(task);

        // Save to localStorage if requested
        if (save) {
            saveTasks();
        }

        // Clear the input field for the next entry
        taskInput.value = '';
    }

    /**
     * loadTasks - Load tasks array from localStorage and populate DOM
     */
    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (Array.isArray(stored)) {
            tasks = stored;
            tasks.forEach(t => createTaskElement(t));
        }
    }

    // Add click listener to Add Task button
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Add Enter key behavior to the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from localStorage so state persists across sessions
    loadTasks();
});
