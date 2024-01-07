class SubsystemView {
    constructor(dataService) {
        this.dataService = dataService;
    }

    render(subSystem) {
        const propertiesContainer = this.createPropertiesContainer(subSystem); // Создание контейнера свойств
        const subSystemElement = this.createSubsystemElement(subSystem, propertiesContainer); // Создание элемента подсистемы с заголовком
        const checkbox = this.createCheckbox(subSystem); // Создание чекбокса
        const childrenContainer = this.createChildrenContainer(subSystem); // Создание контейнера для дочерних элементов

        subSystemElement.prepend(checkbox); // Добавление чекбокса в начало элемента подсистемы
        subSystemElement.appendChild(propertiesContainer); // Добавление контейнера свойств перед дочерними элементами
        subSystemElement.appendChild(childrenContainer); // Добавление контейнера для дочерних элементов

        return subSystemElement;
    }


    createSubsystemElement(subSystem, propertiesContainer) {
        const subSystemElement = document.createElement('div');
        subSystemElement.className = 'subsystem';

        const subSystemTitle = document.createElement('span');
        subSystemTitle.className = 'subsystem-title';
        subSystemTitle.innerText = subSystem.name;

        // Обработчик события клика для разворачивания и сворачивания свойств подсистемы
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
        const checked = event.target.checked;
        subSystem.setMarked(checked); // Обновление отметки подсистемы

        // Обновление отметок для дочерних подсистем
        this.updateChildrenCheckboxes(event.target, subSystem);
        // Обновление отметок для родительских подсистем
        this.updateParentCheckboxes(event.target);

        // Оповещение DataService о необходимости обновить задачи с новыми фильтрами
        //this.dataService.updateTasksWithFilters();

        // Оповещение о необходимости обновить представление
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

        // Функция для создания поля редактирования свойства
        const createPropertyInput = (labelText, value, updateMethod) => {
            const container = document.createElement('div');
            const label = document.createElement('label');
            label.textContent = labelText;
            const input = document.createElement('input');
            input.type = 'number';
            input.value = value;
            input.addEventListener('change', (e) => {
                updateMethod.call(subSystem, e.target.value);
            });
            container.appendChild(label);
            container.appendChild(input);
            return container;
        };

        // Добавляем поля для свойств
        propertiesContainer.appendChild(createPropertyInput('Время жизни выполненных (сек): ', subSystem.lifetimeOfCompleted, subSystem.updateLifetimeOfCompleted));
        propertiesContainer.appendChild(createPropertyInput('Максимальное время работы фонового (сек): ', subSystem.maxBackgroundRuntime, subSystem.updateMaxBackgroundRuntime));
        propertiesContainer.appendChild(createPropertyInput('Количество попыток: ', subSystem.attemptCount, subSystem.updateAttemptCount));
        propertiesContainer.appendChild(createPropertyInput('Пауза между попытками (сек): ', subSystem.pauseBetweenAttempts, subSystem.updatePauseBetweenAttempts));

        return propertiesContainer;
    }
}
