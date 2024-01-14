class TaskView {
    constructor(dataService) {
        this.connector = dataService;
    }

    render(task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task', `task-${task.status}`);

        const toggleDetailsIcon = this.createIconElement();
        const createDateElement = this.createDateElement(task.creationDate);
        const subsystemElement = this.createSubsystemElement(task.subsystemTitle);
        const taskNameElement = this.createNameElement(task.name);
        const taskStatusElement = this.createStatusElement(task.status);
        const taskDetailsElement = this.createDetailsElement();

        toggleDetailsIcon.addEventListener('click', () => {
            this.toggleTaskDetails(task, taskDetailsElement, toggleDetailsIcon);
        });

        taskElement.append(toggleDetailsIcon, createDateElement, subsystemElement, taskNameElement, taskStatusElement, taskDetailsElement);

        return taskElement;
    }

    createIconElement() {
        const icon = document.createElement('span');
        icon.innerHTML = '&#x25BC;'; // HTML-код стрелки вниз
        icon.classList.add('toggle-details-icon');
        return icon;
    }

    createDateElement(date) {
        const dateElement = document.createElement('span');
        dateElement.classList.add('task-creation-date');
        dateElement.textContent = strData(date); // Предполагается, что strData - это ваша функция
        return dateElement;
    }

    createSubsystemElement(subsystemTitle) {
        const subsystemElement = document.createElement('span');
        subsystemElement.classList.add('task-subsystem');
        subsystemElement.textContent = subsystemTitle;
        return subsystemElement;
    }

    createNameElement(name) {
        const nameElement = document.createElement('span');
        nameElement.classList.add('task-name');
        nameElement.textContent = name;
        return nameElement;
    }

    createStatusElement(status) {
        const statusElement = document.createElement('span');
        statusElement.classList.add('task-status');
        statusElement.textContent = `(${status})`;
        return statusElement;
    }

    createDetailsElement() {
        const detailsElement = document.createElement('div');
        detailsElement.classList.add('task-details');
        detailsElement.style.display = 'none';
        return detailsElement;
    }

    async toggleTaskDetails(task, detailsElement, icon) {
        const isHidden = detailsElement.style.display === 'none';
        detailsElement.style.display = isHidden ? 'block' : 'none';
        icon.innerHTML = isHidden ? '&#x25B2;' : '&#x25BC;'; // Стрелка вверх или вниз

        if (isHidden && !detailsElement.hasChildNodes()) {
            detailsElement.innerHTML = '<div class="loader">1С</div>';
            try {
                await this.connector.updateTaskDetail(task);
                detailsElement.innerHTML = '';
                this.populateTaskDetails(task, detailsElement);
            } catch (error) {
                detailsElement.innerHTML = `<div class="error">Ошибка загрузки деталей задачи: ${error}</div>`;
            }
        }
    }

    populateTaskDetails(task, detailsElement) {
        if (task.errorDescription) {
            const errorDescElement = document.createElement('div');
            errorDescElement.classList.add('task-error');
            errorDescElement.textContent = `Текст ошибки: ${task.errorDescription}`;
            detailsElement.appendChild(errorDescElement);
        }
        if (task.properties) {
            for (const [key, value] of Object.entries(task.properties)) {
                const propertyElement = document.createElement('div');
                propertyElement.classList.add('task-property');
                propertyElement.innerHTML = `<span class="task-property-key">${key} =</span><span class="task-property-value"> ${value}</span>`;
                detailsElement.appendChild(propertyElement);
            }
        }
        if (task.text) {
            const taskTextElement = document.createElement('pre');
            taskTextElement.classList.add('task-text');
            taskTextElement.textContent = task.text;
            detailsElement.appendChild(taskTextElement);
        }
    }
}
