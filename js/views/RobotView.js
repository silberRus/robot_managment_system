class RobotView {
    constructor(app) {
        this.dataService = app.dataService;
        this.app = app;
    }

    render(robot) {
        const idDelButton = "delete-robot-" + robot.id; // Уникальный ID для кнопки удаления

        const robotElement = document.createElement('div');
        robotElement.className = 'robot';
        robotElement.innerHTML = `
        <div class="robot-name">${robot.name}</div>
        <div class="robot-subsystems-list" title="Выбрать подсистемы"><a href="#">${robot.subsystems.join(", ") || "Все подсистемы"}</a></div>
        <button class="delete-robot" data-id="${robot.id}" id="${idDelButton}" title="Удалить робота">&times;</button>        
        `;

        robotElement.querySelector('.robot-subsystems-list').addEventListener('click', () => {
            this.selectSubsystems(robot);
        });

        const deleteRobotButton = robotElement.querySelector('#' + idDelButton);
        deleteRobotButton.addEventListener('click', () => {
            deleteRobotButton.classList.add('working-progress');
            deleteRobotButton.disabled = true;
            this.dataService.deleteRobot(robot).then(() => {
                this.dataService.getRobots().then(r => this.app.renderRobots(r));
            }).catch(error => {
                console.error('Ошибка при удалении робота', error);
                deleteRobotButton.classList.remove('working-progress');
                deleteRobotButton.disabled = false;
            });
        });

        return robotElement;
    }

    renderSubsystemCheckbox(subsystem, robot) {
        const container = document.createElement('div');
        container.className = 'subsystem-checkbox-container';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'subsystem-' + subsystem.id;
        checkbox.checked = robot.subsystems.includes(subsystem.id);

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
                const childCheckbox = this.renderSubsystemCheckbox(child, robot);
                childrenContainer.appendChild(childCheckbox);
                // Устанавливаем состояние чекбокса на основе сохраненных подсистем
                childCheckbox.querySelector('input[type="checkbox"]').checked = robot.subsystems.includes(child.id);
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
        this.openModal(); // Открыть модальное окно и затемнить фон
        const modal = this.createModal();
        const subsystemsList = this.dataService.getSubsystemsCash();
        this.appendSubsystemCheckboxes(modal, subsystemsList, robot);

        const saveButton = this.createSaveButton(() => {
            const checkedSubsystems = this.getCheckedSubsystems(modal, subsystemsList);
            this.saveSelectedSubsystems(robot, checkedSubsystems, modal);
        });
        modal.appendChild(saveButton);
        document.body.appendChild(modal);
    }

    saveSelectedSubsystems(robot, checkedSubsystemsIds, modal) {
        robot.subsystems = checkedSubsystemsIds;
        this.dataService.updateRobot(robot);
        this.closeModal(); // Закрыть модальное окно и убрать затемнение
    }

    openModal() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
        overlay.style.display = 'block';
    }

    closeModal() {
        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.remove();
        const modal = document.querySelector('.modal');
        if (modal) modal.remove();
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
        saveButton.innerText = 'Выбрать подсистемы';
        saveButton.addEventListener('click', onClickHandler);
        return saveButton;
    }

    getCheckedSubsystems(modal, subsystemsList) {
        const checkedSubsystemsIds = [];

        const addCheckedSubsystems = (subsystems, list) => {
            subsystems.forEach(sub => {
                const checkbox = modal.querySelector('#subsystem-' + sub.id);
                if (checkbox && checkbox.checked) {
                    list.push(sub.id); // Сохраняем ID подсистемы
                }
                if (sub.children && sub.children.length > 0) {
                    addCheckedSubsystems(sub.children, list);
                }
            });
        };
        addCheckedSubsystems(subsystemsList, checkedSubsystemsIds);
        return checkedSubsystemsIds; // Возвращаем массив ID подсистем
    }
}
