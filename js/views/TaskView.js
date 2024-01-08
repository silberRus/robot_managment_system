class TaskView {
    constructor(dataService) {
        this.connector = dataService;
    }

    render(task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.classList.add('task-' + task.status);

        const toggleDetailsIcon = document.createElement('span');
        toggleDetailsIcon.innerHTML = '&#x25BC;'; // HTML-код стрелки вниз
        toggleDetailsIcon.classList.add('toggle-details-icon');

        const createDateElement = document.createElement('span');
        createDateElement.classList.add('task-creation-date');
        createDateElement.textContent = `${strData(task.creationDate)}`;

        const subsystemElement = document.createElement('span');
        subsystemElement.classList.add('task-subsystem');
        subsystemElement.textContent = `${task.subsystemTitle}`;

        const taskNameElement = document.createElement('span');
        taskNameElement.classList.add('task-name');
        taskNameElement.textContent = `${task.name}`;

        const taskStatusElement = document.createElement('span');
        taskStatusElement.classList.add('task-status');
        taskStatusElement.textContent = ` (${task.status})`;

        const taskDetailsElement = document.createElement('div');
        taskDetailsElement.classList.add('task-details');
        taskDetailsElement.style.display = 'none';

        toggleDetailsIcon.addEventListener('click', async () => {
            const isHidden = taskDetailsElement.style.display === 'none';
            taskDetailsElement.style.display = isHidden ? 'block' : 'none';
            toggleDetailsIcon.innerHTML = isHidden ? '&#x25B2;' : '&#x25BC;'; // Стрелка вверх или вниз

            if (isHidden && !taskDetailsElement.hasChildNodes()) {
                // Показываем индикатор загрузки
                taskDetailsElement.innerHTML = '<div class="loader">(...)</div>';
                try {
                    // Загружаем детали задачи
                    await this.connector.updateTaskDetail(task);
                    // Очищаем индикатор загрузки
                    taskDetailsElement.innerHTML = '';
                    // Отображаем детали задачи
                    if (task.errorDescription) {
                        const errorDescElement = document.createElement('div');
                        errorDescElement.classList.add('task-error');
                        errorDescElement.textContent = `Текст ошибки: ${task.errorDescription}`;
                        taskDetailsElement.appendChild(errorDescElement);
                    }
                    if (task.text) {
                        const taskTextElement = document.createElement('pre');
                        taskTextElement.classList.add('task-text');
                        taskTextElement.textContent = task.text;
                        taskDetailsElement.appendChild(taskTextElement);
                    }
                } catch (error) {
                    // Обработка ошибок
                    taskDetailsElement.innerHTML = '<div class="error">Ошибка загрузки деталей задачи: ' + error + '</div>';
                }
            }
        });

        taskElement.appendChild(toggleDetailsIcon);
        taskElement.appendChild(createDateElement);
        taskElement.appendChild(subsystemElement);
        taskElement.appendChild(taskNameElement);
        taskElement.appendChild(taskStatusElement);
        taskElement.appendChild(taskDetailsElement);

        return taskElement;
    }
}
