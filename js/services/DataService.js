
class DataService {
    constructor() {

        this.connector = new ConnectorAPI();
        //this.connector = new ConnectorMock();
        //this.connector = new Connector1CInside();

        this.connector.getSubsystems().then(data => {
            this.subSystems = this.parseSubsystems(data);
        })

        this.robots = [];
    }

    async deleteRobot(robot) {
        await this.connector.deleteRobot(robot);
    }

    addRobot = async robot => {
        await this.connector.addRobot(robot);
    };

    async getRobots() {
        const r = await this.connector.getRobots();
        this.robots = [];
        for (let i = 0; i < r.length; i++) {
            this.robots.push(new Robot(r[i].name, r[i].subsystems));
        }
        return this.robots;
    }

    updateRobot(updatedRobot) {
        const index = this.robots.findIndex(robot => robot.name === updatedRobot.name);
        if (index !== -1) {
            this.robots[index] = updatedRobot;
        }
    }

    getItems() {
        return this.items;
    }

    async getTasks() {
        const tasks = await this.connector.getTasks();
        this.tasks = [];
        tasks.forEach(item => {
            if (item.type === "task") {
                this.tasks.push(new Task(item.UID, item.name, item.subsystem));
            } else if (item.type === "package") {
                const pkg = new Package(item.name);
                this.tasks.push(pkg);
                item.tasks.forEach(taskData => {
                    const task = new Task(taskData.id, taskData.name, taskData.subsystem, pkg.id);
                    pkg.addTask(task);
                });
            }
        })
        return this.tasks;
    }

    async getSubsystems() {
        return this.parseSubsystems(await this.connector.getSubsystems());
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
