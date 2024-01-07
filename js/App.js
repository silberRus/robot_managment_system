class App {
    constructor() {
        this.dataService = new DataService();
        this.taskView = new TaskView(this.dataService);
        this.packageView = new PackageView(this.dataService);
        this.robotView = new RobotView(this);
        this.subsystemView = new SubsystemView(this.dataService);
    }

    mainToggle = () => document.getElementById('toggle-system');

    updateView() {
        this.dataService.getSettings().then(s => this.renderSettings(s));
        this.dataService.getRobots().then(r => this.renderRobots(r));
        this.dataService.getTasks().then(t => this.renderPackagesAndTasks(t));
    }

    renderRobots(robots) {
        const robotsContainer = document.getElementById('robots');
        robotsContainer.innerHTML = '';  // Очистка контейнера
        robots.forEach(robot => {
            robotsContainer.appendChild(this.robotView.render(robot));
        });
    }

    renderSettings(settings) {
        this.mainToggle.checked = this.mainToggle().isActive;
    }

    renderSubsystems(subsystems) {
        const subsystemsContainer = document.getElementById('subsystems');
        subsystemsContainer.innerHTML = '';
        subsystems.forEach(subsystem => {
            subsystemsContainer.appendChild(this.subsystemView.render(subsystem));
        });
    }

    renderPackagesAndTasks(PackagesAndTasks) {
        const packagesContainer = document.getElementById('packages');
        packagesContainer.innerHTML = '';
        PackagesAndTasks.forEach(t => {
            if (t.tasks) {
                packagesContainer.appendChild(this.packageView.render(t));
            } else {
                packagesContainer.appendChild(this.taskView.render(t));
            }
        });
    }

    addEventListeners() {
        const addRobotButton = document.getElementById('addRobot'); // Сохраняем ссылку на кнопку
        addRobotButton.addEventListener('click', async () => {
            addRobotButton.classList.add('working-progress');
            addRobotButton.disabled = true;
            try {
                await this.dataService.addRobot();
                this.updateView();
            } catch (error) {
                console.error('Произошла ошибка при добавлении робота', error);
            } finally {
                addRobotButton.classList.remove('working-progress');
                addRobotButton.disabled = false;
            }
        });

        this.mainToggle().addEventListener('change',(event) => {
            this.dataService.setSettings({isActive: this.mainToggle().checked}).then(() => {
                this.updateView();
            });
        });
        document.addEventListener('updateView', () => {
            this.updateView();
        });

        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                const filterName = button.id.replace('filter', '');
                this.toggleFilter(filterName);
            });
        });
    }

    toggleFilter(filterName) {
        const button = document.getElementById(`filter${filterName}`);
        const isActive = button.classList.toggle('active');
        this.dataService.setFilterState(filterName.toLowerCase(), isActive);
        this.updateView();
    }


    init() {
        this.dataService.getSubsystems().then(s => this.renderSubsystems(s));
        this.dataService.getSettings().then(s => this.renderSettings(s));
        this.dataService.getRobots().then(r => this.renderRobots(r));
        this.dataService.getTasks().then(t => this.renderPackagesAndTasks(t));
        this.addEventListeners();
    }
}

function MyDate(date) {
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

// Запускаем приложение
const app = new App();
app.init();
