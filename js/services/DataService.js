
class DataService {
    constructor() {

        this.subSystems = [];
        this.robots = [];
        this.tasks = [];

        //this.connector = new ConnectorAPI();
        this.connector = new ConnectorMock();
        //this.connector = new Connector1CInside();

        this.connector.getSubsystems().then(data => {
            this.subSystems = this.parseSubsystems(data);
        })
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

    async updateRobot(updatedRobot) {
        const index = this.robots.findIndex(robot => robot.name === updatedRobot.name);
        if (index !== -1) {
            this.robots[index] = updatedRobot;
            await this.connector.updateRobot(updatedRobot);
            document.dispatchEvent(new CustomEvent('updateView'));
        }
    }

    async getTasks() {

        this.tasks = [];
        const markedSubsystemsIds = this.getMarkedSubsystemsIds(this.subSystems);
        console.log(markedSubsystemsIds);
        const tasks = await this.connector.getTasks(markedSubsystemsIds);
        tasks.forEach(item => {
            if (item.type === "task") {
                this.tasks.push(new Task(item)); // Убедитесь, что item действительно содержит данные задачи
            } else if (item.type === "package") {
                const pkg = new Package(item.name);
                this.tasks.push(pkg);
                item.tasks.forEach(taskData => {
                    const task = new Task(taskData); // Убедитесь, что taskData содержит нужные данные
                    pkg.addTask(task);
                });
            }
        });
        return this.tasks;
    }

    async updateTaskDetail(task) {
        if (task.text.length === 0) {
            const updatedTaskData = await this.connector.getTask(task.UID);
            for (const key in updatedTaskData) {
                if (updatedTaskData.hasOwnProperty(key)) {
                    task[key] = updatedTaskData[key];
                }
            }
        }
    }

    getMarkedSubsystemsIds(subsystems) {
        let ids = [];
        for (let ss of subsystems) {
            if (ss.isMarked()) {
                ids.push(ss.id);
                if (ss.children && ss.children.length > 0) {
                    ids = ids.concat(this.getMarkedSubsystemsIds(ss.children));
                }
            }
        }
        return ids;
    }

    async getSettings() {
        const s = await this.connector.getSettings();
        return new Settings(s.isActive);
    }

    async setSettings(settings) {
        await this.connector.setSettings(settings);
    }

    async getSubsystems() {
        const subSystem = await this.connector.getSubsystems();
        this.subSystems = this.parseSubsystems(subSystem);
        return this.subSystems;
    }

    getSubsystemsCash() {
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
