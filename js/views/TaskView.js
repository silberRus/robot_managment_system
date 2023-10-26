class TaskView {
    constructor() {}

    render(task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerText = task.name;
        taskElement.setAttribute('draggable', 'true');
        return taskElement;
    }
}
