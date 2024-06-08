
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI' || event.target.closest('li')) {
            const taskItem = event.target.closest('li');
            removeTask(taskItem);
        }
    });
    function addTask() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        const taskItem = document.createElement('li');
        taskItem.className = `task ${priority}`;
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="task-priority">[${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority]</span>
            <button class="complete-btn"><i class="fa fa-check-circle"></i></button>
            <button class="trash-btn"><i class="fa fa-trash"></i></button>
        `;
        taskList.appendChild(taskItem);
        taskItem.querySelector('.complete-btn').addEventListener('click', markComplete);
        taskItem.querySelector('.trash-btn').addEventListener('click', event => {
            event.stopPropagation(); 
        });

        taskInput.value = '';
    }

    function markComplete(event) {
        event.stopPropagation();

        const taskItem = event.target.closest('li');
        taskItem.classList.toggle('completed');
    }

    function removeTask(taskItem) {
        taskItem.classList.add('slide');
        taskItem.addEventListener('transitionend', () => {
            taskItem.remove();
        });
    }
});