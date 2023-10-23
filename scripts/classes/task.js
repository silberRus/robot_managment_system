
class Task {
    constructor(id, name, subsystem, code, variables) {
        this.id = id;
        this.name = name;
        this.status = 'pending'; // Ожидает выполнения по умолчанию
        this.subsystem = subsystem;
        this.code = code;
        this.variables = variables || [];
    }

    execute() {
        // Здесь будет логика выполнения задачи. Пока это просто заглушка.
        console.log("\`Executing task: \${this.name}\`");
    }

    getDetails() {
        return {
            id: this.id,
            name: this.name,
            status: this.status,
            subsystem: this.subsystem,
            code: this.code,
            variables: this.variables
        };
    }
}
