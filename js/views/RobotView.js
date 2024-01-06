class RobotView {
    constructor(app) {
        this.dataService = app.dataService;
        this.app = app;
    }

    render(robot) {
        const robotElement = document.createElement('div');
        robotElement.className = 'robot';
        robotElement.innerHTML = `
        <div class="robot-name">${robot.name}</div>
        <button class="select-subsystems" data-id="${robot.id}">...</button>
        <div class="robot-subsystems">${robot.subsystems.join(", ") || "все подсистемы"}</div>
        <div class="robot-actions">
            
            <button class="delete-robot" data-id="${robot.id}">Удалить</button>
        </div>
    `;

        robotElement.querySelector('.delete-robot').addEventListener('click', () => {
            this.deleteRobot(robot);
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
        checkbox.checked = robot.subsystems.includes(subsystem.id); // Это должно работать для любого уровня подсистемы

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
        saveButton.innerText = 'Сохранить';
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
                // Рекурсивно проверяем дочерние элементы независимо от состояния родителя
                if (sub.children && sub.children.length > 0) {
                    addCheckedSubsystems(sub.children, list);
                }
            });
        };

        addCheckedSubsystems(subsystemsList, checkedSubsystemsIds);
        return checkedSubsystemsIds; // Возвращаем массив ID подсистем
    }


    deleteRobot(robot) {
        const event = new CustomEvent('deleteRobot', { detail: robot });
        document.dispatchEvent(event);
    }
}
