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

    renderSubsystemCheckbox(subsystem, robot) {
        const container = document.createElement('div');
        container.className = 'subsystem-checkbox-container';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'subsystem-' + subsystem.id;
        checkbox.checked = robot.subsystems.includes(subsystem.name);

        const label = document.createElement('label');
        label.htmlFor = 'subsystem-' + subsystem.id;
        label.innerText = subsystem.name;

        container.appendChild(checkbox);
        container.appendChild(label);

        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                this.checkChildSubsystems(container);
            } else {
                this.uncheckChildSubsystems(container);
            }
        });

        if (subsystem.children.length > 0) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'children';
            subsystem.children.forEach(child => {
                childrenContainer.appendChild(this.renderSubsystemCheckbox(child, robot));
            });
            container.appendChild(childrenContainer);
        }

        return container;
    }

    checkChildSubsystems(container) {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = true);
    }

    uncheckChildSubsystems(container) {
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
    }

    selectSubsystems(robot) {
        const modal = this.createModal();
        const subsystemsList = this.dataService.getSubsystems();
        this.appendSubsystemCheckboxes(modal, subsystemsList, robot);

        const saveButton = this.createSaveButton(() => {
            const checkedSubsystems = this.getCheckedSubsystems(modal, subsystemsList);
            this.saveSelectedSubsystems(robot, checkedSubsystems, modal);
        });
        modal.appendChild(saveButton);
        document.body.appendChild(modal);
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        return modal;
    }

    appendSubsystemCheckboxes(modal, subsystemsList, robot) {
        subsystemsList.filter(subsystem => !subsystem.parentId).forEach(subsystem => {
            modal.appendChild(this.renderSubsystemCheckbox(subsystem, robot));
        });
    }

    createSaveButton(onClickHandler) {
        const saveButton = document.createElement('button');
        saveButton.innerText = 'Сохранить';
        saveButton.addEventListener('click', onClickHandler);
        return saveButton;
    }

    getCheckedSubsystems(modal, subsystemsList) {
        const getAllSubsystems = (subs, list = []) => {
            subs.forEach(sub => {
                list.push(sub);
                if (sub.children) {
                    getAllSubsystems(sub.children, list);
                }
            });
            return list;
        };

        const allSubsystems = getAllSubsystems(subsystemsList);
        return allSubsystems.filter(sub => {
            const checkbox = modal.querySelector('#subsystem-' + sub.id);
            return checkbox && checkbox.checked;
        }).map(sub => sub.name);
    }

    saveSelectedSubsystems(robot, checkedSubsystems, modal) {
        robot.subsystems = checkedSubsystems;
        this.dataService.updateRobot(robot);
        this.updateView();
        modal.remove();
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
