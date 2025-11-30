// To-Do List with Local Storage persistence
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input'); 
    const taskList = document.getElementById('task-list'); 

    // Helper: Read tasks array from localStorage (returns array)
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Helper: Save tasks array to localStorage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create a task DOM element and attach remove behavior.
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        // Text node for task
        const textNode = document.createTextNode(taskText + ' ');
        li.appendChild(textNode);

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // When Remove clicked: remove from DOM and update localStorage
        removeBtn.onclick = function () {
            // Remove the <li> from the DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Update localStorage: remove the first matching taskText
            const storedTasks = getStoredTasks();
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                saveTasksToLocalStorage(storedTasks);
            }
        };

        li.appendChild(removeBtn);
        return li;
    }

    /**
     * addTask
     * Adds a task to the DOM and optionally saves it to localStorage.
     * 
     * @param {string|null} taskText - If provided, that text will be used.
     *                                 If null, the function will read from taskInput.
     * @param {boolean} save - If true, the task will also be saved to localStorage.
     */
    function addTask(taskText = null, save = true) {
        // If taskText not provided, take from input
        if (taskText === null) {
            taskText = taskInput.value.trim();

            // Validate input when source is user input
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
        } else {
            // If loading from storage, trim and ignore empty strings
            taskText = String(taskText).trim();
            if (taskText === "") return;
        }

        // Create DOM element and append
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        // If requested, save to localStorage (append to stored array)
        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(taskText);
            saveTasksToLocalStorage(storedTasks);
        }

        // Clear input if this was from user input
        if (document.activeElement === addButton || document.activeElement === taskInput) {
            // clear input field only when it was user-sourced
            if (taskInput.value !== "") taskInput.value = "";
        } else {
            // safe clear anyway if we pulled from input originally
            if (taskText !== null && taskInput.value !== "") taskInput.value = "";
        }
    }

    // Load tasks from localStorage and populate the DOM
    function loadTasks() {
        const storedTasks = getStoredTasks();
        // Clear existing list (avoid duplicates if called multiple times)
        taskList.innerHTML = '';

        storedTasks.forEach(taskText => {
            // pass save = false so we don't re-save to localStorage while loading
            addTask(taskText, false);
        });
    }

    // Attach event listeners
    addButton.addEventListener('click', function () {
        addTask(); 
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize: load saved tasks when page loads
    loadTasks();
});
