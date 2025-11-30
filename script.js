// Step 1: Run script only after the page loads
document.addEventListener('DOMContentLoaded', function () {

    // Step 2: Select DOM elements
    const addButton = document.getElementById('add-task-btn'); 
    const taskInput = document.getElementById('task-input'); 
    const taskList = document.getElementById('task-list');

    // Step 3: Define the addTask function
    function addTask() {

        // Get and clean the user's input
        let taskText = taskInput.value.trim();

        // Step 4: Validate input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Set onclick to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Attach button to the <li>, and <li> to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Step 5: Add event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Step 6: Call addTask on DOMContentLoaded
    addTask();
});
