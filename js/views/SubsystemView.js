class SubsystemView {
    constructor() {}

    render(subSystem) {
        const subSystemElement = document.createElement('div');
        subSystemElement.className = 'subsystem';
        subSystemElement.innerText = subSystem.name;

        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children';
        subSystem.children.forEach(child => {
            childrenContainer.appendChild(this.render(child));
        });

        subSystemElement.appendChild(childrenContainer);
        return subSystemElement;
    }
}
