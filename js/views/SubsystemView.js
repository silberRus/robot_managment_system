class SubsystemView {
    constructor() {}

    render(subsystem) {
        const subsystemElement = document.createElement('div');
        subsystemElement.classList.add('subsystem');
        subsystemElement.innerText = subsystem.name;
        return subsystemElement;
    }
}
