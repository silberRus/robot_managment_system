
// Добавляем обработчики событий для кнопок управления роботами
document.getElementById('add-robot').addEventListener('click', function() {
    const robotName = prompt("Enter robot name:");
    if (robotName) {
        addRobot(robotName);
    }
});

document.getElementById('delete-selected-robot').addEventListener('click', function() {
    const robotId = prompt("Enter robot ID to delete:");
    if (robotId) {
        deleteRobot(robotId);
    }
});

// Инициализация системы управления роботами
function initRobotManagementSystem() {
    fetchDataFromServer();
    updateTasksAndPackagesList();
}

// Функция для добавления нового робота
function addRobot(name) {
    // Здесь будет логика добавления робота (заглушка)
    console.log("\`Adding robot: \${name}\`");
    robots.push({ name: name });
    updateRobotsList();
}

// Функция для удаления робота
function deleteRobot(id) {
    // Здесь будет логика удаления робота (заглушка)
    console.log("\`Deleting robot with ID: \${id}\`");
    robots = robots.filter(robot => robot.id !== id);
    updateRobotsList();
}

// Функция для назначения подсистемы роботу
function assignSubsystemToRobot(robotId, subsystem) {
    // Здесь будет логика назначения подсистемы роботу (заглушка)
    console.log("\`Assigning subsystem \${subsystem} to robot with ID: \${robotId}\`");
}

// Инициализация экрана роботов
function initRobotsSection() {
    fetchRobotsFromServer();
    updateRobotsList();
}

// Заглушка для функции получения списка роботов с сервера
function fetchRobotsFromServer() {
    // В реальной системе здесь будет запрос к серверу
    console.log("Fetching robots from server...");
    return serverMocks.robots;
}


// Функция для обновления списка роботов
function updateRobotsList() {
    const listElement = document.getElementById('robots-list');
    listElement.innerHTML = ''; // Очистка списка

    // Добавление роботов в список (заглушка)
    for (const robot of robots) {
        listElement.innerHTML += '<div>' + robot.name + '</div>';
    }
}

// Функция для назначения подсистемы роботу
function assignSubsystemToRobot(robotId, subsystem) {
    // Здесь будет логика назначения подсистемы роботу (заглушка)
    console.log(`\`Assigning subsystem \${subsystem} to robot with ID: \${robotId}\``);
}

function updateRobotsList() {
    const robots = fetchRobotsFromServer();
    const listElement = document.getElementById('robots-list');
    listElement.innerHTML = ''; // Очистка списка

    // Добавление роботов в список
    for (const robot of robots) {
        listElement.innerHTML += `
            <div class="robot-item \${robot.status}">
                <span>\${robot.name}</span>
                <span>(\${robot.subsystems.join(', ')})</span>
            </div>
        `;
    }
}


// Модальное окно для добавления нового робота
const addRobotModal = `
    <div id="add-robot-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeAddRobotModal()">&times;</span>
            <h2>Add New Robot</h2>
            <div>
                <label for="robot-name">Name:</label>
                <input type="text" id="robot-name" />
            </div>
            <div>
                <label for="robot-subsystems">Subsystems (comma separated):</label>
                <input type="text" id="robot-subsystems" />
            </div>
            <button onclick="addNewRobot()">Add Robot</button>
        </div>
    </div>
`;

document.body.innerHTML += addRobotModal;

// Открыть модальное окно для добавления робота
function openAddRobotModal() {
    document.getElementById('add-robot-modal').style.display = 'block';
}

// Закрыть модальное окно для добавления робота
function closeAddRobotModal() {
    document.getElementById('add-robot-modal').style.display = 'none';
}

// Добавить нового робота
function addNewRobot() {
    const newRobot = {
        id: serverMocks.robots.length + 1, // Для простоты, просто увеличиваем ID
        name: document.getElementById('robot-name').value,
        status: 'idle',
        subsystems: document.getElementById('robot-subsystems').value.split(',').map(s => s.trim())
    };
    serverMocks.robots.push(newRobot);
    closeAddRobotModal();
    updateRobotsList();
}

// Добавляем кнопку для открытия модального окна добавления робота
//document.getElementById('add-robot-btn').addEventListener('click', openAddRobotModal);

// Функциональность для удаления робота

// Удалить робота
function deleteRobot(robotId) {
    serverMocks.robots = serverMocks.robots.filter(robot => robot.id !== robotId);
    updateRobotsList();
}

// Добавляем обработчик событий для кнопок удаления роботов
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.className === 'delete-robot-btn') {
        const robotId = parseInt(event.target.getAttribute('data-robot-id'));
        deleteRobot(robotId);
    }
});
