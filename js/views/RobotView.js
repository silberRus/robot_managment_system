class RobotView {
    constructor(dataService) {
        this.dataService = dataService;
    }

    render(robot) {
        const robotElement = document.createElement('div');
        robotElement.className = 'robot';
        robotElement.innerHTML = `
        <span class="robot-name">${robot.name}</span>
        <span class="robot-subsystems">${robot.subsystems.join(", ") || "Все подсистемы"}</span>
        <button class="select-subsystems" data-id="${robot.id}">Выбрать подсистемы</button>
        <button class="delete-robot" data-id="${robot.id}">Удалить</button>
    `;

        robotElement.querySelector('.delete-robot').addEventListener('click', () => {
            this.deleteRobot(robot.id);
        });

        robotElement.querySelector('.select-subsystems').addEventListener('click', () => {
            this.selectSubsystems(robot);
        });

        return robotElement;
    }

    selectSubsystems(robot) {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const subsystemsList = this.dataService.getSubsystems();
        subsystemsList.forEach(subsystem => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'subsystem-' + subsystem.id;
            checkbox.checked = robot.subsystems.includes(subsystem.name);

            const label = document.createElement('label');
            label.htmlFor = 'subsystem-' + subsystem.id;
            label.innerText = subsystem.name;

            modal.appendChild(checkbox);
            modal.appendChild(label);
        });

        const saveButton = document.createElement('button');
        saveButton.innerText = 'Сохранить';
        saveButton.addEventListener('click', () => {
            const checkedSubsystems = [];
            subsystemsList.forEach(subsystem => {
                const checkbox = modal.querySelector('#subsystem-' + subsystem.id);
                if (checkbox.checked) {
                    checkedSubsystems.push(subsystem.name);
                }
            });
            robot.subsystems = checkedSubsystems;
            this.dataService.updateRobot(robot);
            this.updateView();
            modal.remove();
        });
        modal.appendChild(saveButton);

        document.body.appendChild(modal);
    }

    updateView() {
        const robotsContainer = document.getElementById('robots');
        robotsContainer.innerHTML = ''; // Очищаем список роботов
        const robots = this.dataService.getRobots();
        robots.forEach(robot => {
            robotsContainer.appendChild(this.render(robot));
        });
    }


    deleteRobot(id) {
        const event = new CustomEvent('deleteRobot', { detail: id });
        document.dispatchEvent(event);
    }

}
