// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); 
        storedTasks.forEach(taskText => {
            addTask(taskText, false); 
        });
    }

    // Function to save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(task => task.firstChild.textContent); 
        localStorage.setItem('tasks', JSON.stringify(tasks)); 
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        const taskItem = document.createElement('li'); 
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button'); 
        removeButton.textContent = 'Remove';
        removeButton.classList.add= 'remove-btn';

        // Add click event listener to remove the task
        removeButton.onclick = () => {
            taskList.removeChild(taskItem); 
            saveTasks(); 
        };

        taskItem.appendChild(removeButton); 
        taskList.appendChild(taskItem); 

        if (save) {
            saveTasks(); 
        }
    }

    // Add click event listener to the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); 

        if (taskText === '') {
            alert('Please enter a task.'); 
            return;
        }

        addTask(taskText); 
        taskInput.value = '';
    });

    // Add keypress event listener to the input field for the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addButton.click(); 
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
