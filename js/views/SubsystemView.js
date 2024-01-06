class SubsystemView {
    constructor() {}

    render(subSystem) {
        const subSystemElement = document.createElement('div');
        subSystemElement.className = 'subsystem';
        subSystemElement.innerText = subSystem.name;

        // Создаем чекбокс для каждой подсистемы
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'subsystem-checkbox';
        checkbox.id = `subsystem-${subSystem.id}`;
        checkbox.dataset.id = subSystem.id; // Сохраняем ID подсистемы

        // Добавляем событие на изменение чекбокса
        checkbox.addEventListener('change', (e) => {
            // Выбор всех дочерних чекбоксов
            const childrenCheckboxes = e.target.parentNode.querySelectorAll('.children .subsystem-checkbox');
            childrenCheckboxes.forEach(childCheckbox => {
                childCheckbox.checked = e.target.checked;
            });

            // Обновление родительских чекбоксов
            let parentCheckbox = e.target.parentNode;
            while (parentCheckbox) {
                parentCheckbox = parentCheckbox.parentNode.closest('.subsystem');
                if (parentCheckbox) {
                    const parentCheckboxInput = parentCheckbox.querySelector('.subsystem-checkbox');
                    const siblingsCheckboxes = parentCheckbox.querySelectorAll('.children .subsystem-checkbox');
                    parentCheckboxInput.checked = Array.from(siblingsCheckboxes).some(checkbox => checkbox.checked);
                }
            }
        });

        subSystemElement.prepend(checkbox);

        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children';
        subSystem.children.forEach(child => {
            childrenContainer.appendChild(this.render(child));
        });

        subSystemElement.appendChild(childrenContainer);
        return subSystemElement;
    }
}
