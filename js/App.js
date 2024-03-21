class App {
    constructor() {
        this.dataService = new DataService();
        this.taskView = new TaskView(this.dataService);
        this.packageView = new PackageView(this.dataService);
        this.robotView = new RobotView(this);
        this.subsystemView = new SubsystemView(this.dataService);
        this.tasksPerPage = 10;
        this.updateTasksDebounced = this.debounce(this.updateView, 500);
        this.mainToggleElement = null;
        this.currentBaseElement = document.getElementById('currentBase');
    }

    mainToggle = () => document.getElementById('toggle-system');

    updateView() {

        const tasksContainer = document.getElementById('packages');
        tasksContainer.innerHTML = '<div class="loader">ЕИС</div>';

        this.dataService.getSettings().then(s => this.renderSettings(s));
        this.dataService.getRobots().then(r => this.renderRobots(r));

        this.dataService.getTasks(this.tasksPerPage).then(t => {
            tasksContainer.innerHTML = '';
            this.renderPackagesAndTasks(t);
        });
    }

    renderRobots(robots) {
        const robotsContainer = document.getElementById('robots');
        robotsContainer.innerHTML = '';  // Очистка контейнера
        robots.forEach(robot => {
            robotsContainer.appendChild(this.robotView.render(robot));
        });
    }

    renderSettings(settings) {
        //this.renderSwitch(settings);
    }
    renderSwitch(settings) {
        if (!this.mainToggleElement) {
            this.mainToggleElement = document.getElementById('toggle-system');
        }
        if (this.mainToggleElement) {
            this.mainToggleElement.checked = settings.isActive;
        } else {
            console.error('Элемент переключателя не найден');
        }
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

    renderBasesList() {
        const element = document.getElementById('bases');
        const appInstance = this;

        Settings.getInstance().listBases.forEach(base => {
            const option = document.createElement('div');
            option.innerText = base.name;
            option.addEventListener('click', function() {
                appInstance.setBase(base.url, base.name);
                element.style.display = 'none';
            });
            element.appendChild(option);
        });
    }

    addEventListeners() {
        const addRobotButton = document.getElementById('addRobot');
        addRobotButton.addEventListener('click', async () => {
            // addRobotButton.classList.add('working-progress');
            addRobotButton.disabled = true;
            try {
                await this.dataService.addRobot();
                this.dataService.getRobots().then(r => this.renderRobots(r));
            } catch (error) {
                console.error('Произошла ошибка при добавлении робота', error);
            } finally {
                addRobotButton.classList.remove('working-progress');
                addRobotButton.disabled = false;
            }
        });

        const updateTasksButtonElement = document.getElementById('updateTasksButton');
        updateTasksButtonElement.addEventListener('click', () => {
            this.updateView();
        })

        // this.mainToggle().addEventListener('change',(event) => {
        //     this.dataService.setSettings({isActive: this.mainToggle().checked}).then(() => {
        //         this.updateView();
        //     });
        // });
        document.addEventListener('updateView', () => {
            this.updateView();
        });

        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                const filterName = button.id.replace('filter', '');
                this.toggleFilter(filterName);
            });
        });

        const tasksPerPageSlider = document.getElementById('tasksPerPage');
        tasksPerPageSlider.addEventListener('input', (event) => {
            this.tasksPerPage = event.target.value;
            this.updateTasksDebounced(); // Используйте debounced версию updateView
        });
    }

    toggleFilter(filterName) {
        const button = document.getElementById(`filter${filterName}`);
        const isActive = button.classList.toggle('active');
        this.dataService.setFilterState(filterName.toLowerCase(), isActive);
        this.updateView();
    }


    init() {
        this.renderBasesList();
        this.addEventListeners();
        this.dataService.getSettings().then(s => this.renderSettings(s));
        this.dataService.getSubsystems().then(s => this.renderSubsystems(s));

        const first = Settings.getInstance().listBases[0];
        this.setBase(first.url, first.name);

        document.querySelector('.dropdown').addEventListener('mouseenter', function() {
            document.getElementById('bases').style.display = 'block';
        });
        document.addEventListener('click', function(event) {
            const dropdown = document.querySelector('.dropdown');
            const withinBoundaries = event.composedPath().includes(dropdown);

            if (!withinBoundaries) {
                document.getElementById('bases').style.display = 'none';
            }
        });
    }

    // Ограничитель запросов к 1с чтобы не долбить сервер
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    setBase(url, name) {
        const settings = Settings.getInstance();
        this.dataService.setBase(settings.url_start + url + settings.url_end);
        this.currentBaseElement.innerText = name;
        this.updateView();
    }
}

function strData(date) {
    return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

const app = new App();
app.init();
