// Ensure the DOM has loaded before running script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * addTask - Create a new task list item and append it to the list
     * @param {boolean} [suppressAlert=false] - When true, don't show an alert if input is empty.
     */
    function addTask(suppressAlert = false) {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // If no text, optionally warn the user and return early
        if (taskText === '') {
            if (!suppressAlert) {
                alert('Please enter a task.');
            }
            return; // don't add an empty task
        }

        // Create a new list item and set its content
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a Remove button and set up its behavior
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // When clicked, remove the list item from the list
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Append the remove button to the list item and add the item to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field for the next entry
        taskInput.value = '';
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

    // Run addTask on DOMContentLoaded to initialize state if needed
    // Use suppressAlert=true to prevent showing an alert when the input is empty
    addTask(true);
});
