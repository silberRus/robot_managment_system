// Функция для обновления списка задач и пакетов
function updateTasksAndPackagesList() {
    const listElement = document.getElementById('tasks-packages-list');
    listElement.innerHTML = '<h2>Tasks and Packages</h2>'; // Очистка списка

    // Добавление задач и пакетов в список (заглушка)
    for (const task of tasks) {
        listElement.innerHTML += '<div>' + task.name + '</div>';
    }

    for (const package of packages) {
        listElement.innerHTML += '<div>' + package.name + '</div>';
    }
}


function updateTasksList() {
    const tasks = fetchTasksFromServer();
    const listElement = document.getElementById('tasks-list');
    if (!listElement) {
        return;
    }
    listElement.innerHTML = ''; // Очистка списка

    // Добавление задач в список
    for (const task of tasks) {
        listElement.innerHTML += `
            <div class="task-item \${task.status}" draggable="true">
                <input type="checkbox" class="task-checkbox" id="task-\${task.id}" />
                <label for="task-\${task.id}">\${task.name}</label>
                <button class="delete-task-btn" data-task-id="\${task.id}">Delete</button>
            </div>
        `;
    }
}


// Модальное окно для добавления новой задачи
const addTaskModal = `
    <div id="add-task-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeAddTaskModal()">&times;</span>
            <h2>Add New Task</h2>
            <div>
                <label for="task-name">Name:</label>
                <input type="text" id="task-name" />
            </div>
            <div>
                <label for="task-subsystem">Subsystem:</label>
                <input type="text" id="task-subsystem" />
            </div>
            <div>
                <label for="task-code">Code:</label>
                <textarea id="task-code"></textarea>
            </div>
            <button onclick="addNewTask()">Add Task</button>
        </div>
    </div>
`;

document.body.innerHTML += addTaskModal;

// Открыть модальное окно для добавления задачи
function openAddTaskModal() {
    document.getElementById('add-task-modal').style.display = 'block';
}

// Закрыть модальное окно для добавления задачи
function closeAddTaskModal() {
    document.getElementById('add-task-modal').style.display = 'none';
}

// Добавить новую задачу
function addNewTask() {
    const newTask = {
        id: serverMocks.tasks.length + 1, // Для простоты, просто увеличиваем ID
        name: document.getElementById('task-name').value,
        status: 'waiting',
        subsystem: document.getElementById('task-subsystem').value,
        code: document.getElementById('task-code').value,
        variables: {}
    };
    serverMocks.tasks.push(newTask);
    closeAddTaskModal();
    updateTasksList();
}

// Добавляем кнопку для открытия модального окна добавления задачи
//document.getElementById('add-task-btn').addEventListener('click', openAddTaskModal);

// Функциональность для удаления задачи

// Удалить задачу
function deleteTask(taskId) {
    serverMocks.tasks = serverMocks.tasks.filter(task => task.id !== taskId);
    updateTasksList();
}

// Добавляем обработчик событий для кнопок удаления задач
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.className === 'delete-task-btn') {
        const taskId = parseInt(event.target.getAttribute('data-task-id'));
        deleteTask(taskId);
    }
});

// Функциональность drag-and-drop для задач

let draggedTaskId = null;

function dragStart(event) {
    draggedTaskId = parseInt(event.target.getAttribute('data-task-id'));
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    const droppedOnTaskId = parseInt(event.target.getAttribute('data-task-id'));

    if (draggedTaskId && droppedOnTaskId && draggedTaskId !== droppedOnTaskId) {
        const draggedTaskIndex = serverMocks.tasks.findIndex(task => task.id === draggedTaskId);
        const droppedOnTaskIndex = serverMocks.tasks.findIndex(task => task.id === droppedOnTaskId);

        // Swap tasks in the array
        const temp = serverMocks.tasks[draggedTaskIndex];
        serverMocks.tasks[draggedTaskIndex] = serverMocks.tasks[droppedOnTaskIndex];
        serverMocks.tasks[droppedOnTaskIndex] = temp;

        // Update tasks list
        updateTasksList();
    }

    draggedTaskId = null;
}

// Добавляем обработчики событий drag and drop
document.body.addEventListener('dragstart', dragStart);
document.body.addEventListener('dragover', dragOver);
document.body.addEventListener('drop', drop);

// Функциональность для быстрого перемещения задачи на верх списка

function moveToTop(taskId) {
    const taskIndex = serverMocks.tasks.findIndex(task => task.id === taskId);

    if (taskIndex > -1) {
        const task = serverMocks.tasks[taskIndex];

        // Удаляем задачу из текущего индекса
        serverMocks.tasks.splice(taskIndex, 1);
        // Добавляем задачу на верх списка
        serverMocks.tasks.unshift(task);

        // Update tasks list
        updateTasksList();
    }
}

// Добавляем обработчик событий для кнопок перемещения задачи на верх
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.className === 'move-to-top-btn') {
        const taskId = parseInt(event.target.getAttribute('data-task-id'));
        moveToTop(taskId);
    }
});

// Функциональность для выбора и удаления нескольких задач одновременно

function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('.task-checkbox:checked');
    const selectedTaskIds = Array.from(checkboxes).map(checkbox => parseInt(checkbox.getAttribute('data-task-id')));

    serverMocks.tasks = serverMocks.tasks.filter(task => !selectedTaskIds.includes(task.id));

    // Update tasks list
    updateTasksList();
}

// Добавляем обработчик событий для кнопки удаления выбранных задач
//document.getElementById('delete-selected-btn').addEventListener('click', deleteSelectedTasks);

// Функциональность для редактирования задачи

// Модальное окно для редактирования задачи
const editTaskModal = `
    <div id="edit-task-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeEditTaskModal()">&times;</span>
            <h2>Edit Task</h2>
            <div>
                <label for="edit-task-name">Name:</label>
                <input type="text" id="edit-task-name" />
            </div>
            <div>
                <label for="edit-task-subsystem">Subsystem:</label>
                <input type="text" id="edit-task-subsystem" />
            </div>
            <div>
                <label for="edit-task-code">Code:</label>
                <textarea id="edit-task-code"></textarea>
            </div>
            <button onclick="saveEditedTask()">Save</button>
        </div>
    </div>
`;

document.body.innerHTML += editTaskModal;

let editingTaskId = null;

// Открыть модальное окно для редактирования задачи
function openEditTaskModal(taskId) {
    const task = serverMocks.tasks.find(t => t.id === taskId);
    if (task) {
        editingTaskId = taskId;
        document.getElementById('edit-task-name').value = task.name;
        document.getElementById('edit-task-subsystem').value = task.subsystem;
        document.getElementById('edit-task-code').value = task.code;
        document.getElementById('edit-task-modal').style.display = 'block';
    }
}

// Закрыть модальное окно для редактирования задачи
function closeEditTaskModal() {
    editingTaskId = null;
    document.getElementById('edit-task-modal').style.display = 'none';
}

// Сохранить отредактированную задачу
function saveEditedTask() {
    if (editingTaskId) {
        const task = serverMocks.tasks.find(t => t.id === editingTaskId);
        if (task) {
            task.name = document.getElementById('edit-task-name').value;
            task.subsystem = document.getElementById('edit-task-subsystem').value;
            task.code = document.getElementById('edit-task-code').value;

            closeEditTaskModal();
            updateTasksList();
        }
    }
}

// Добавляем обработчик событий для кнопок редактирования задач
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.className === 'edit-task-btn') {
        const taskId = parseInt(event.target.getAttribute('data-task-id'));
        openEditTaskModal(taskId);
    }
});
