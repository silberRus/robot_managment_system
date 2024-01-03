class Robot {
    constructor(name, subsystems = []) {
        this.id = this.generateIdFromName(name);
        this.name = name;
        this.subsystems = subsystems;
    }

    generateIdFromName(name) {
        return Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }
}
