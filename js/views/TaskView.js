class TaskView {
    constructor() {}

    render(task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerText = task.name;
        return taskElement;
    }
}
