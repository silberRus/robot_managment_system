class Robot {
    constructor(id, name, subsystems = []) {
        this.id = id;
        this.name = name;
        this.subsystems = subsystems; // подсистемы, в рамках которых робот может выполнять задачи
    }
}
