class App {
    constructor() {
        this.dataService = new DataService();

        this.taskView = new TaskView();
        this.packageView = new PackageView();
        this.robotView = new RobotView(this.dataService);
        this.subsystemView = new SubsystemView();

        document.addEventListener('deleteRobot', (event) => {
            this.dataService.deleteRobot(event.detail);
            this.renderRobots();
        });
    }

    renderRobots() {
        const robotsContainer = document.getElementById('robots');
        robotsContainer.innerHTML = '';  // Очистка контейнера
        const robots = this.dataService.getRobots();
        robots.forEach(robot => {
            robotsContainer.appendChild(this.robotView.render(robot));
        });
    }

    renderSubsystems() {
        const subsystemsContainer = document.getElementById('subsystems');
        const subsystems = this.dataService.getSubsystems();
        subsystems.forEach(subsystem => {
            subsystemsContainer.appendChild(this.subsystemView.render(subsystem));
        });
    }

    renderPackagesAndTasks() {
        const packagesContainer = document.getElementById('packages');
        const standaloneTasks = this.dataService.getTasks().filter(task => !task.packageId);
        standaloneTasks.forEach(task => {
            packagesContainer.appendChild(this.taskView.render(task));
        });

        const packages = this.dataService.getPackages();
        packages.forEach(pkg => {
            packagesContainer.appendChild(this.packageView.render(pkg));
        });
    }

    renderItems() {
        const itemsContainer = document.getElementById('packages');
        const items = this.dataService.getItems();
        items.forEach(item => {
            if (item instanceof Task) {
                itemsContainer.appendChild(this.taskView.render(item));
            } else if (item instanceof Package) {
                itemsContainer.appendChild(this.packageView.render(item));
            }
        });

         itemsContainer.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });

        itemsContainer.addEventListener('dragover', (e) => {
            e.preventDefault();  // Разрешить сброс
        });

        itemsContainer.addEventListener('drop', (e) => {
            e.preventDefault();

            const draggedId = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(draggedId);
            const dropTarget = e.target.closest('.task, .package');  // Предполагая, что у вас есть эти классы

            if (dropTarget && dropTarget !== draggedElement) {
                const siblings = Array.from(itemsContainer.children);
                const draggedIndex = siblings.indexOf(draggedElement);
                const dropTargetIndex = siblings.indexOf(dropTarget);

                // Проверка, находится ли перетаскиваемый элемент внутри пакета и является ли целью тот же пакет
                if (draggedElement.classList.contains('package') && dropTarget.classList.contains('package') && draggedElement.dataset.packageId === dropTarget.dataset.packageId) {
                    itemsContainer.insertBefore(draggedElement, draggedIndex < dropTargetIndex ? dropTarget.nextSibling : dropTarget);
                } else if (!draggedElement.classList.contains('package') && !dropTarget.classList.contains('package')) {
                    itemsContainer.insertBefore(draggedElement, draggedIndex < dropTargetIndex ? dropTarget.nextSibling : dropTarget);
                }
            }
        });

    }

    init() {
        this.renderRobots();
        this.renderSubsystems();
        this.renderItems();

        document.getElementById('addRobot').addEventListener('click', this.addRobot.bind(this));
    }

    addRobot() {
        const robotName = "robot " + this.dataService.robots.length + 1;
        if (robotName) {
            this.dataService.addRobot(new Robot(Date.now(), robotName, []));
            this.renderRobots();
        }
    }
}

// Запускаем приложение
const app = new App();
app.init();
