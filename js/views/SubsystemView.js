class SubsystemView {
    constructor(dataService) {
        this.dataService = dataService;
    }

    render(subSystem) {
        const propertiesContainer = this.createPropertiesContainer(subSystem);
        const subSystemElement = this.createSubsystemElement(subSystem, propertiesContainer);
        const checkbox = this.createCheckbox(subSystem);
        const childrenContainer = this.createChildrenContainer(subSystem);

        subSystemElement.prepend(checkbox);
        subSystemElement.appendChild(propertiesContainer);
        subSystemElement.appendChild(childrenContainer);

        return subSystemElement;
    }


    createSubsystemElement(subSystem, propertiesContainer) {
        const subSystemElement = document.createElement('div');
        subSystemElement.className = 'subsystem';

        const subSystemTitle = document.createElement('span');
        subSystemTitle.className = 'subsystem-title';
        subSystemTitle.innerText = subSystem.name;

        subSystemTitle.addEventListener('click', () => {
            propertiesContainer.style.display = propertiesContainer.style.display === 'none' ? 'block' : 'none';
        });

        subSystemElement.appendChild(subSystemTitle);
        return subSystemElement;
    }

    createCheckbox(subSystem) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'subsystem-checkbox';
        checkbox.id = `subsystem-${subSystem.id}`;
        checkbox.dataset.id = subSystem.id;
        checkbox.checked = subSystem.isMarked();

        checkbox.addEventListener('change', (e) => this.handleCheckboxChange(e, subSystem));
        return checkbox;
    }

    handleCheckboxChange(event, subSystem) {
        subSystem.setMarked(event.target.checked);
        this.updateChildrenCheckboxes(event.target, subSystem);
        this.updateParentCheckboxes(event.target);
        document.dispatchEvent(new CustomEvent('updateView'));
    }

    updateChildrenCheckboxes(checkbox, subSystem) {
        const childrenCheckboxes = checkbox.parentNode.querySelectorAll('.children .subsystem-checkbox');
        childrenCheckboxes.forEach(childCheckbox => {
            childCheckbox.checked = checkbox.checked;
        });
        subSystem.children.forEach(child => child.setMarked(checkbox.checked));
    }

    updateParentCheckboxes(checkbox) {
        let parentCheckbox = checkbox.parentNode;
        while (parentCheckbox) {
            parentCheckbox = parentCheckbox.parentNode.closest('.subsystem');
            if (parentCheckbox) {
                const parentCheckboxInput = parentCheckbox.querySelector('.subsystem-checkbox');
                const siblingsCheckboxes = parentCheckbox.querySelectorAll('.children .subsystem-checkbox');
                const isAnyChecked = Array.from(siblingsCheckboxes).some(c => c.checked);
                parentCheckboxInput.checked = isAnyChecked;

                const parentSubSystem = this.dataService.subSystems.find(ss => ss.id === parentCheckboxInput.dataset.id);
                if (parentSubSystem) {
                    parentSubSystem.setMarked(isAnyChecked);
                }
            }
        }
    }

    createChildrenContainer(subSystem) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children';
        subSystem.children.forEach(child => {
            childrenContainer.appendChild(this.render(child));
        });
        return childrenContainer;
    }

    createPropertiesContainer(subSystem) {
        const propertiesContainer = document.createElement('div');
        propertiesContainer.className = 'subsystem-properties';
        propertiesContainer.style.display = 'none';

        const createPropertyInput = (labelText, value, updateMethod, className) => {
            const container = document.createElement('div');
            const label = document.createElement('label');
            label.classList.add('subsystem-properties-label');
            label.textContent = labelText;
            const input = document.createElement('input');
            input.type = 'number';
            input.value = value;
            input.min = '0';
            input.step = '1';
            input.className = className;
            input.addEventListener('change', (e) => {
                updateMethod.call(subSystem, e.target.value);
                this.dataService.connector.updateSubsystem(subSystem);
            });
            container.appendChild(label);
            container.appendChild(input);
            return container;
        };

        propertiesContainer.appendChild(createPropertyInput('Время жизни выполненных (сек): ', subSystem.lifetimeOfCompleted, subSystem.updateLifetimeOfCompleted, 'input-seconds'));
        propertiesContainer.appendChild(createPropertyInput('Максимальное время работы фонового (сек): ', subSystem.maxBackgroundRuntime, subSystem.updateMaxBackgroundRuntime, 'input-seconds'));
        propertiesContainer.appendChild(createPropertyInput('Количество попыток: ', subSystem.attemptCount, subSystem.updateAttemptCount, 'input-quantity'));
        propertiesContainer.appendChild(createPropertyInput('Пауза между попытками (сек): ', subSystem.pauseBetweenAttempts, subSystem.updatePauseBetweenAttempts, 'input-seconds'));

        return propertiesContainer;
    }
}
