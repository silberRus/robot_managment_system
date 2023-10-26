class PackageView {
    constructor() {}

    render(pkg) {
        const packageElement = document.createElement('div');
        packageElement.classList.add('package');
        packageElement.innerText = pkg.name;
        packageElement.setAttribute('draggable', 'true');
        pkg.tasks.forEach(task => {
            const taskView = new TaskView();
            packageElement.appendChild(taskView.render(task));
        });
        return packageElement;
    }
}
