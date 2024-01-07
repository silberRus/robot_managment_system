
// Это эммулятор ответов сервера для тестов

class ConnectorMock {

    constructor(baseURL = 'testURL', username = 'defaultUsername', password = 'defaultPassword') {

        this.pauseMSec = 1000;

        this.settings = {
            "isActive": false
        };

         this.tasks = [
            {id: 1, type: "task", name: "Задача 1", subsystem: "Подсистема 1"},
            {
                id: 2, type: "package", name: "Пакет 1", tasks: [
                    {id: 4, name: "Задача в пакете 1", subsystem: "Подсистема 2"},
                    {id: 5, name: "Задача в пакете 2", subsystem: "Подсистема 2"}]
            },
            {id: 3, type: "task", name: "Задача 2", subsystem: "Подсистема 3"},
        ];

        this.subsystems = [
            {
                "id": "t",
                "name": "Весь транспорт",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "tM",
                        "name": "Маршрутные листы",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "tS",
                        "name": "Сборка заказа",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            },
            {
                "id": "x",
                "name": "Все процессы xPL",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "xM",
                        "name": "xPL Статусы маршрутных листов",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "xR",
                        "name": "xPL Размещение после растановки межблока",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "xU",
                        "name": "xPL Отмена ЗНС по e-COMM",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            },
            {
                "id": "w",
                "name": "Все складские процессы",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "wA",
                        "name": "Аптечный хаб",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "wS",
                        "name": "Динамика работы склада",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            },
            {
                "id": "s",
                "name": "Все продажи",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "sA",
                        "name": "Аптека",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "sC",
                        "name": "Подбор товаров",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "s7",
                        "name": "Схема 702",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "sM",
                        "name": "Маркировка",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    },
                    {
                        "id": "sV",
                        "name": "Виды расчетов",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            },
            {
                "id": "b",
                "name": "Бюджетные продажи",
                "lifetimeOfCompleted": 600,
                "maxBackgroundRuntime": 1200,
                "attemptCount": 3,
                "pauseBetweenAttempts": 30,
                "children": [
                    {
                        "id": "bA",
                        "name": "Актуализация статусов РА",
                        "lifetimeOfCompleted": 600,
                        "maxBackgroundRuntime": 1200,
                        "attemptCount": 3,
                        "pauseBetweenAttempts": 30
                    }
                ]
            }
        ];
        this.robots = [
            {
                "name": "BUMBLEBEE",
                "subsystems": [],
                "insertDate": "2024-01-03T21:16:56",
                "currentTaskGuid": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "idle",
                "status": null
            },
            {
                "name": "GLaDOS",
                "subsystems": [],
                "insertDate": "2024-01-03T21:17:18",
                "currentTaskGuid": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "idle",
                "status": null
            },
            {
                "name": "IRONMAN",
                "subsystems": [],
                "insertDate": "2024-01-03T21:16:55",
                "currentTaskGuid": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "idle",
                "status": null
            },
            {
                "name": "Ева",
                "subsystems": [],
                "insertDate": "2024-01-03T21:17:16",
                "currentTaskGuid": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "idle",
                "status": null
            },
            {
                "name": "Рита",
                "subsystems": [],
                "insertDate": "2024-01-03T19:19:26",
                "currentTaskGuid": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "idle",
                "status": null
            },
            {
                "name": "Федя",
                "subsystems": [],
                "insertDate": "2024-01-03T19:11:10",
                "currentTaskGuid": "",
                "currentTask": "",
                "currentTaskUUID": "",
                "errorDescription": "idle",
                "status": null
            }
        ];

        this.tasks = this.allTasks();
    }

    allTasks() {
        return [
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 041694be-551d-4980-81f3-320331698bce",
                "type": "package",
                "tasks": [
                    {
                        "UID": "9a732a54-f173-4644-a260-4ec5280754e0",
                        "subsystem": "tM",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "tasks": []
                    },
                    {
                        "UID": "a606a1c3-fe37-4cfa-b775-6ff99836ff54",
                        "subsystem": "tM",
                        "name": "Расчет итогов",
                        "type": "task",
                        "tasks": []
                    },
                    {
                        "UID": "81900a3e-1f57-43aa-8b85-fd3b41019716",
                        "subsystem": "t",
                        "name": "Запись документа",
                        "type": "task",
                        "tasks": []
                    },
                    {
                        "UID": "13a520a5-dc41-4675-b606-406bda7fae49",
                        "subsystem": "t",
                        "name": "Расчет итогов",
                        "type": "task",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 1dc2e5ed-607c-4184-96ea-3e5d19324013",
                "type": "package",
                "tasks": [
                    {
                        "UID": "6d8bf7de-a4f1-4489-a213-cd72cafbac7e",
                        "subsystem": "tM",
                        "name": "Расчет суммовых показателей",
                        "type": "task",
                        "tasks": []
                    },
                    {
                        "UID": "e0d2d928-fb4d-4ddb-b05c-f44e4f4d109e",
                        "subsystem": "tM",
                        "name": "Расчет итогов",
                        "type": "task",
                        "tasks": []
                    },
                    {
                        "UID": "8a0669b4-7795-44aa-8498-8d7f0d82937c",
                        "subsystem": "tM",
                        "name": "Проведение документа",
                        "type": "task",
                        "tasks": []
                    }
                ]
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 83e01860-756e-4994-8850-7b77bafa0a7d",
                "type": "package",
                "tasks": [
                    {
                        "UID": "cb598028-95c0-4b7b-a582-901c01b0612e",
                        "name": "Расчет суммовых показателей",
                        "subsystem": "tM",
                        "type": "task",
                        "tasks": []
                    },
                    {
                        "UID": "c123d2b6-bd07-42d8-a144-1a5004ca9447",
                        "name": "Проведение документа",
                        "subsystem": "tM",
                        "type": "task",
                        "tasks": []
                    },
                    {
                        "UID": "66f8a069-08f2-4505-9d65-90355a79f8b5",
                        "name": "Расчет итогов",
                        "subsystem": "tM",
                        "type": "task",
                        "tasks": []
                    }
                ]
            },

            {
                "UID": "87569315-b98f-4535-980e-7e2649b9dd43",
                "name": "+++ Расчет итогов ++++",
                "subsystem": "ТС",
                "type": "task",
                "status": "wait",
                "robot": "",
                "errorDescription": "",
                "text": "ЭтотОбъект = XMLЗначение(Тип(\"ДокументСсылка.МаршрутныйЛист\"), \"66eb054d-bda7-11ed-bde8-b47af15e6e0c\").ПолучитьОбъект();\n\nЭтотОбъект.ДополнительныеСвойства.Вставить(\"ВыполнитьОбработчики\", Ложь);\nЭтотОбъект.РассчитатьИтоги_Фоново();\nЭтотОбъект.Записать();",
                "executionAttempts": 0
            },
            {
                "UID": "70bfa710-cf0c-4959-a85b-43772ef06271",
                "name": "Одинокое задание",
                "type": "task",
                "subsystem": "wA",
                "robot":"R2D2",
                "status": "working",
                "text": `
                
// **********************************************************
//          Основной код
// **********************************************************


// Инициализация переменных
Статус = Параметры.Статус;

ОписаниеОшибки = "";
Результат = Неопределено;

// Основной блок
ЭтотОбъект = XMLЗначение(Тип("ДокументСсылка.МаршрутныйЛист"), "72a0dafe-bda5-11ed-bde8-b47af15e6e0c").ПолучитьОбъект();

ЭтотОбъект.ДополнительныеСвойства.Вставить("ВыполнитьОбработчики", Ложь);
ЭтотОбъект.РасчитатьСуммовыеПоказатели_Фоново(Статус);
ЭтотОбъект.Записать();
 
                `
            },
            {
                "UID": "22569315-b98f-4535-980e-7e2649b9dd43",
                "name": "Задание с ошибкой",
                "type": "task",
                "subsystem": "t",
                "robot":"R2D2",
                "status": "working",
                "text": `
                
// **********************************************************
//          Основной код
// **********************************************************


// Инициализация переменных


ОписаниеОшибки = "";
Результат = Неопределено;

// Основной блок
c = 3
                `,
                "errorDescription": " Это ошибка емое ОписаниеОшибки"
            },
            {
                "UID": "00000000-0000-0000-0000-000000000000",
                "name": "пакет 92d59c62-a102-4e70-9d17-395b2489d0c3",
                "type": "package",
                "tasks": [
                    {
                        "UID": "0fe1d5e2-c504-402b-9a62-e9489b6d9652",
                        "name": "Задание пакета 2",
                        "subsystem": "xR",
                        "type": "task",
                        "tasks": []
                    },
                    {
                        "UID": "4816382a-b099-4087-b443-3ecc8f8265d0",
                        "subsystem": "xR",
                        "name": "Задание пакета 1",
                        "type": "task",
                        "tasks": []
                    }
                ]
            }
        ];
    }

    async getRobots() {
        return this.robots;
    }

    async updateRobot(updatedRobot) {
        const index = this.robots.findIndex(robot => robot.name === updatedRobot.name);
        if (index !== -1) {
            this.robots[index] = updatedRobot;
        }
    }

    async deleteRobot(robot) {
        await sleep(this.pauseMSec);
        const index = this.robots.findIndex(r => r.name === robot.name);
        if (index !== -1) {
            this.robots.splice(index, 1);
        }
    }

    async getTasks() {
        // удалим свойство text
        for (const task of this.tasks) {
            delete task.text;
        }
        return this.tasks;
    }

    async getTasksFilteredBySubsystems(subsystems) {
        return this.tasks.filter(task => subsystems.includes(task.subsystem));
    }

    async getTask(UID) {
        await sleep(this.pauseMSec);
        const tasks = this.allTasks();
        return tasks.find(task => task.UID === UID);
    }

    async getSettings() {
        return this.settings;
    }

    async setSettings(settings) {
        this.settings = !this.settings;
    }

    async getSubsystems() {
        return this.subsystems;
    }

    async addRobot(robot) {
        await sleep(this.pauseMSec);
        this.robots.push(new Robot("robot"));
    }

    async updateSubsystem(subsystem) {
        await sleep(this.pauseMSec);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}