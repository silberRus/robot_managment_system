
document.getElementById('select-all-subsystems').addEventListener('click', selectAllSubsystems);
document.getElementById('deselect-all-subsystems').addEventListener('click', deselectAllSubsystems);

// Заглушка для функции получения списка подсистем с сервера
function fetchSubsystemsFromServer() {
    // В реальной системе здесь будет запрос к серверу
    console.log("Fetching subsystems from server...");
    serverMocks.subsystems;
}

// Функция для обновления списка подсистем
function updateSubsystemsList() {
    const listElement = document.getElementById('subsystems-list');
    listElement.innerHTML = ''; // Очистка списка

    // Добавление подсистем в список (заглушка)
    for (const subsystem of subsystems) {
        listElement.innerHTML += `<div><input type="checkbox" class="subsystem-checkbox" id="subsystem-${subsystem.id}" /><label for="subsystem-${subsystem.id}">${subsystem.name}</label></div>`;
    }
}

// Функция для выбора всех подсистем
function selectAllSubsystems() {
    const checkboxes = document.querySelectorAll('.subsystem-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
}

// Функция для снятия выбора со всех подсистем
function deselectAllSubsystems() {
    const checkboxes = document.querySelectorAll('.subsystem-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}


// Инициализация экрана подсистем
function initSubsystemsSection() {
    fetchSubsystemsFromServer();
    updateSubsystemsList();
}
