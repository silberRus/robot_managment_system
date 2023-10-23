mock_tasks = [
    { id: 1, type: "task", name: "Задача 1", subsystem: "Подсистема 1" },
    { id: 2, type: "package", name: "Пакет 1", tasks: [
            { id: 4, name: "Задача в пакете 1", subsystem: "Подсистема 2" },
            { id: 5, name: "Задача в пакете 2", subsystem: "Подсистема 2"}] },
    { id: 3, type: "task", name: "Задача 2", subsystem: "Подсистема 3" },
    // ... и так далее
];

mock_subsystems = [
    { id: 1, type: "subsystem", name: "Подсистема 1", parentId: null },
    { id: 2, type: "subsystem", name: "Подсистема 1.1", parentId: 1 },
    { id: 3, type: "subsystem", name: "Подсистема 1.2", parentId: 1 },
    { id: 4, type: "subsystem", name: "Подсистема 1.1.1", parentId: 2 },
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

        this.subSystems = mock_subsystems.map(data => new SubSystem(data.id, data.name));
        mock_subsystems.forEach(data => {
            if (data.parentId) {
                const parent = this.subSystems.find(subSystem => subSystem.id === data.parentId);
                const child = this.subSystems.find(subSystem => subSystem.id === data.id);
                parent.addChild(child);
            }
        });

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
}
