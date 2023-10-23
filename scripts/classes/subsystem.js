
class Subsystem {
    constructor(id, name, parentSubsystem = null) {
        this.id = id;
        this.name = name;
        this.parentSubsystem = parentSubsystem;
    }

    getHierarchy() {
        // Возвращает иерархию подсистемы
        let hierarchy = [this.name];
        let currentSubsystem = this.parentSubsystem;
        while (currentSubsystem) {
            hierarchy.unshift(currentSubsystem.name);
            currentSubsystem = currentSubsystem.parentSubsystem;
        }
        return hierarchy;
    }
}
