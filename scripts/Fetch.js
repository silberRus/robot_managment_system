let tasks = [];
let packages = [];
let robots = [];
const subsystems = [];

const serverMocks = {
    tasks: [
        { id: 1, name: "Task 1", status: "completed", subsystem: "Subsys1", code: "code1", variables: { var1: "value1" } },
        { id: 2, name: "Task 2", status: "inProgress", subsystem: "Subsys2", code: "code2", variables: { var2: "value2" } },
        // ... другие задачи
    ],
    robots: [
        { id: 1, name: "Robot 1", status: "idle", subsystems: ["Subsys1"] },
        { id: 2, name: "Robot 2", status: "working", subsystems: ["Subsys2", "Subsys3"] },
        // ... другие роботы
    ],
    subsystems: [
        { id: 1, name: "Subsys1", parent: null },
        { id: 2, name: "Subsys2", parent: null },
        { id: 3, name: "Subsys3", parent: 2 },
        // ... другие подсистемы
    ],
    settings: {
        retryAttempts: 3,
        pauseBetweenAttempts: 5
        // ... другие настройки
    }
};

// Функция для получения данных с сервера (заглушка)
function fetchDataFromServer() {
    // В реальной системе здесь будет запрос к серверу
    console.log("Fetching data from server...");
}

// Функции-заглушки для работы с "сервером"

function getTasks() {
    return serverMocks.tasks;
}

function getRobots() {
    return serverMocks.robots;
}

function getSubsystems() {
    return serverMocks.subsystems;
}

function getSettings() {
    return serverMocks.settings;
}

// Обновление функции загрузки задач

function fetchTasksFromServer() {
    // Используем заглушку для получения данных
    return getTasks();
}

// Обновление функции загрузки роботов

function fetchRobotsFromServer() {
    // Используем заглушку для получения данных
    return getRobots();
}

// Обновление функции загрузки подсистем

function fetchSubsystemsFromServer() {
    // Используем заглушку для получения данных
    return getSubsystems();
}

// Обновление функции загрузки настроек

function fetchSettingsFromServer() {
    // Используем заглушку для получения данных
    return getSettings();
}



// Функциональность для добавления нового робота

