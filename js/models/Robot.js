class Robot {
    constructor(name, subsystems = [], status = 'idle', currentTask = '') {
        this.id = this.generateIdFromName(name);
        this.name = name;
        this.subsystems = subsystems;
        this.status = status;
        this.currentTask = currentTask;
    }

    generateIdFromName(name) {
        return Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }
}
