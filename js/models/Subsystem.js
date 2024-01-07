class SubSystem {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.children = [];
        this.marked = false;

        this.lifetimeOfCompleted = 0; // Время жизни выполненных
        this.maxBackgroundRuntime = 0; // Максимальное время работы фонового
        this.attemptCount = 0; // Количество попыток
        this.pauseBetweenAttempts = 0; // Пауза между попытками
    }

    addChild(subSystem) {
        this.children.push(subSystem);
    }

    setMarked(marked) {
        this.marked = marked;
    }
    isMarked() {
        return this.marked;
    }

    updateLifetimeOfCompleted(value) {
        this.lifetimeOfCompleted = value;
    }

    updateMaxBackgroundRuntime(value) {
        this.maxBackgroundRuntime = value;
    }

    updateAttemptCount(value) {
        this.attemptCount = value;
    }

    updatePauseBetweenAttempts(value) {
        this.pauseBetweenAttempts = value;
    }
}