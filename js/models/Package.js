class Package {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = []; // список задач, принадлежащих этому пакету
    }

    addTask(task) {
        this.tasks.push(task);
    }
}
