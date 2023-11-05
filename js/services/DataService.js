
class DataService {
    constructor() {

        //this.connector = new ConnectorAPI();
        this.connector = new ConnectorMock();
        this.robots = this.connector.robots;

        this.tasks = [];
        this.items = [];

        console.log(this.connector.tasks);
        this.connector.tasks.forEach(item => {
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

        this.subSystems = this.parseSubsystems(this.connector.subsystems);
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
