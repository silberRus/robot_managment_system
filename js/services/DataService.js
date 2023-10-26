mock_tasks = [
    { id: 1, type: "task", name: "Задача 1", subsystem: "Подсистема 1" },
    { id: 2, type: "package", name: "Пакет 1", tasks: [
            { id: 4, name: "Задача в пакете 1", subsystem: "Подсистема 2" },
            { id: 5, name: "Задача в пакете 2", subsystem: "Подсистема 2"}] },
    { id: 3, type: "task", name: "Задача 2", subsystem: "Подсистема 3" },
    // ... и так далее
];

mock_subsystems = [
    {
        "id": "ТС",
        "name": "Весь транспорт",
        "children": [
            {
                "id": "МЛ",
                "name": "Маршрутные листы"
            },
            {
                "id": "Сборка",
                "name": "Сборка заказа"
            }
        ]
    },
    {
        "id": "xPL",
        "name": "Все процессы xPL",
        "children": [
            {
                "id": "МаршрутныеЛисты",
                "name": "Все процессы xPL"
            },
            {
                "id": "РазмещениеПослеМежблока",
                "name": "Все процессы xPL"
            }
        ]
    },
    {
        "id": "WMS",
        "name": "Все складские процессы",
        "children": [
            {
                "id": "АптечныйХаб",
                "name": "Аптечный хаб"
            }
        ]
    },
    {
        "id": "Продажи",
        "name": "Все продажи",
        "children": [
            {
                "id": "Аптека",
                "name": "Продажи.Аптека"
            },
            {
                "id": "ПодборТоваров",
                "name": "Продажи.ПодборТоваров"
            },
            {
                "id": "Схема_702",
                "name": "Продажи.Схема_702"
            },
            {
                "id": "Маркировка",
                "name": "Продажи.Маркировка"
            },
            {
                "id": "ВидыРасчетов",
                "name": "Продажи.ВидыРасчетов"
            }
        ]
    },
    {
        "id": "БюджетныеПродажи",
        "name": "БюджетныеПродажи",
        "children": [
            {
                "id": "АктуализацияСтатусовРА",
                "name": "БюджетныеПродажи.АктуализацияСтатусовРА"
            }
        ]
    }
];

class DataService {
    constructor() {

        this.packages = [
            new Package(1, "Пакет 1"),
            new Package(2, "Пакет 2"),
            // ... добавьте другие пакеты по аналогии
        ];

        this.robots = [
            new Robot(1, "Робот 1", ["Подсистема 1", "Подсистема 2"]),
            new Robot(2, "Робот 2", ["Подсистема 3"]),
            // ... добавьте других роботов по аналогии
        ];

        this.tasks = [];
        this.packages = [];
        this.items = [];

        mock_tasks.forEach(item => {
            if (item.type === "task") {
                this.items.push(new Task(item.id, item.name, item.subsystem));
            } else if (item.type === "package") {
                const pkg = new Package(item.id, item.name);
                this.items.push(pkg);
                item.tasks.forEach(taskData => {
                    const task = new Task(taskData.id, taskData.name, taskData.subsystem, pkg.id);
                    pkg.addTask(task);
                });
            }
        });

        this.subSystems = this.parseSubsystems(mock_subsystems);
    }

    deleteRobot(id) {
        this.robots = this.robots.filter(robot => robot.id !== id);
    }

    addRobot(robot) {
        this.robots.push(robot);
    }

    getRobots() {
        return this.robots;
    }

    updateRobot(updatedRobot) {
        const index = this.robots.findIndex(robot => robot.id === updatedRobot.id);
        if (index !== -1) {
            this.robots[index] = updatedRobot;
        }
    }

    getItems() {
        return this.items;
    }

    getTasks() {
        return this.tasks;
    }

    getPackages() {
        return this.packages;
    }

    getSubsystems() {
        return this.subSystems;
    }

    parseSubsystems(data) {
        return data.map(item => {
            const subSystem = new SubSystem(item.id, item.name);
            if (item.children && item.children.length) {
                const children = this.parseSubsystems(item.children);
                children.forEach(child => subSystem.addChild(child));
            }
            return subSystem;
        });
    }
}
