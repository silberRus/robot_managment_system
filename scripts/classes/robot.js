
class Robot {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.status = 'idle'; // Простаивает по умолчанию
        this.subsystems = [];
    }

    assignSubsystem(subsystem) {
        if (!this.subsystems.includes(subsystem)) {
            this.subsystems.push(subsystem);
        }
    }

    removeSubsystem(subsystem) {
        const index = this.subsystems.indexOf(subsystem);
        if (index > -1) {
            this.subsystems.splice(index, 1);
        }
    }

    executeTask(task) {
        // Здесь будет логика выполнения задачи. Пока это просто заглушка.
        console.log("\`Robot \${this.name} is executing task: \${task.name}\`");
    }
}
