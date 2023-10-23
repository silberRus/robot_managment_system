class RobotView {
    constructor() {}

    render(robot) {
        const robotElement = document.createElement('div');
        robotElement.className = 'robot';
        robotElement.innerHTML = `
             <span class="robot-name">${robot.name}</span>
             <button class="delete-robot" data-id="${robot.id}">Удалить</button>
        `;

        robotElement.querySelector('.delete-robot').addEventListener('click', () => {
            this.deleteRobot(robot.id);
        });

        return robotElement;
    }


    deleteRobot(id) {
        const event = new CustomEvent('deleteRobot', { detail: id });
        document.dispatchEvent(event);
    }

}
