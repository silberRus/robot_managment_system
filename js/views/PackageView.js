class PackageView {
    constructor(dataService) {
        this.connector = dataService;
    }

    render(pkg) {
        const packageElement = document.createElement('div');
        packageElement.classList.add('package');
        packageElement.innerText = pkg.name;
        packageElement.setAttribute('draggable', 'true');
        pkg.tasks.forEach(task => {
            const taskView = new TaskView(this.connector);
            packageElement.appendChild(taskView.render(task));
        });
        return packageElement;
    }
}
