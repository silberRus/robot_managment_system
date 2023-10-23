class DataService {
    constructor() {
        // Mock data
        this.tasks = [
            new Task(1, "Задача 1", "Подсистема 1", 1),
            new Task(2, "Задача 2", "Подсистема 2", 1),
            new Task(3, "Задача 3", "Подсистема 3", 2),
            // ... добавьте другие задачи по аналогии
        ];

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

        this.subsystems = [
            new Subsystem(1, "Подсистема 1"),
            new Subsystem(2, "Подсистема 2"),
            new Subsystem(3, "Подсистема 3"),
            // ... добавьте другие подсистемы по аналогии
        ];

        this.tasks = [];
        this.packages = [];

        // Пример данных, которые могут приходить с сервера
        const rawData = [
            { id: 1, type: "task", name: "Задача 1", subsystem: "Подсистема 1" },
            { id: 2, type: "package", name: "Пакет 1", tasks: [
                { id: 4, name: "Задача в пакете 1", subsystem: "Подсистема 2" },
                { id: 5, name: "Задача в пакете 2", subsystem: "Подсистема 2"}] },
            { id: 3, type: "task", name: "Задача 2", subsystem: "Подсистема 3" },
            // ... и так далее
        ];

        this.items = [];

        rawData.forEach(item => {
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
    }

    deleteRobot(id) {
        this.robots = this.robots.filter(robot => robot.id !== id);
    }

    addRobot(robot) {
        this.robots.push(robot);
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

    getRobots() {
        return this.robots;
    }

    getSubsystems() {
        return this.subsystems;
    }
}
