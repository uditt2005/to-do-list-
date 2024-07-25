document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const eventForm = document.getElementById('event-form');
    const eventInput = document.getElementById('event-input');
    const eventDate = document.getElementById('event-date');
    const eventList = document.getElementById('event-list');

    // Load tasks and events from local storage
    loadTasks();
    loadEvents();

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(todoInput.value);
        todoInput.value = '';
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addEvent(eventInput.value, eventDate.value);
        eventInput.value = '';
        eventDate.value = '';
    });

    function addTask(task, completed = false) {
        const taskItem = document.createElement('li');
        taskItem.className = completed ? 'completed' : '';

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.onchange = () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        };

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            todoList.removeChild(taskItem);
            saveTasks();
        };

        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);
        todoList.appendChild(taskItem);

        saveTasks();
    }

    function addEvent(event, date) {
        const eventItem = document.createElement('li');
        const eventTitle = document.createElement('span');
        eventTitle.classList.add('event-title');
        eventTitle.textContent = event;

        const eventDateElement = document.createElement('span');
        eventDateElement.classList.add('event-date');
        eventDateElement.textContent = `at ${new Date(date).toLocaleString()}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            eventList.removeChild(eventItem);
            saveEvents();
        };

        eventItem.appendChild(eventTitle);
        eventItem.appendChild(eventDateElement);
        eventItem.appendChild(deleteButton);
        eventList.appendChild(eventItem);
        saveEvents();
    }

    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => addTask(task.text, task.completed));
    }

    function saveEvents() {
        const events = [];
        eventList.querySelectorAll('li').forEach(eventItem => {
            events.push({
                event: eventItem.querySelector('.event-title').textContent,
                date: eventItem.querySelector('.event-date').textContent.replace('at ', '')
            });
        });
        localStorage.setItem('events', JSON.stringify(events));
    }

    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        events.forEach(event => addEvent(event.event, new Date(event.date)));
    }
});
