// static/scripts.js

// Fonction pour ajouter une tâche
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: taskText })
        })
        .then(response => response.json())
        .then(() => {
            loadTasks();
            taskInput.value = '';
        });
    }
}

// Ajouter un écouteur d'événements pour le bouton "Add Task"
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Ajouter un écouteur d'événements pour le bouton "Clear List"
document.getElementById('clear-tasks-btn').addEventListener('click', function() {
    fetch('/tasks', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        loadTasks();
    });
});

// Ajouter un écouteur d'événements pour le champ de saisie pour la touche "Enter"
document.getElementById('new-task').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire
        addTask();
    }
});

// Fonction pour charger les tâches
function loadTasks() {
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task[1];
            taskList.appendChild(li);
        });
    });
}

// Charger les tâches au chargement de la page
loadTasks();
