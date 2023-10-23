
class TaskPackage {
    constructor(id, name, subsystem) {
        this.id = id;
        this.name = name;
        this.tasks = [];
        this.subsystem = subsystem;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}
