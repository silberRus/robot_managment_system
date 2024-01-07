class ConnectorAPI {
    constructor(baseURL = 'http://localhost/MSK/hs/queue_actions/', basicAuth = 'Basic Um9ib3Q6MTIzNDU2') {
        this.baseURL = baseURL;
        this.basicAuth = basicAuth;
        this.robots = [];
        this.tasks = [];
        this.subsystems = [];
    }

    async makeRequest(endpoint, method = 'GET', data = null, returnJson = true) {
        const headers = {
            'Authorization': this.basicAuth,
            'Content-Type': 'application/json'
        };

        const options = {
            method: method,
            headers: headers
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(this.baseURL + endpoint, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} body: ${await response.text()}`);
        }
        return  returnJson ? response.json() : true;
    }

    async getRobots() {
        return this.makeRequest('robots');
    }

    async addRobot(robot) {
        return this.makeRequest('robots', 'POST', robot);
    }

    async updateRobot(robot) {
        return this.makeRequest('robot/' + robot.name, 'POST', robot, false);
    }

    async deleteRobot(robot) {
        return this.makeRequest('robot/' + robot.name, 'DELETE', null, false);
    }

    async changeRobot(robot) {
        return this.makeRequest('robot/' + robot.id, 'POST', robot, false);
    }

    async getTasks(markedSubsystemsIds) {
        return markedSubsystemsIds.length ?
            this.makeRequest('tasks', 'POST', {"subsystems": markedSubsystemsIds}) :
            this.makeRequest('tasks');
    }

    async getTask(UID) {
        return this.makeRequest('tasks/' + UID);
    }

    async getSettings() {
        return this.makeRequest('settings');
    }

    async setSettings(settings) {
        return this.makeRequest('settings', 'POST', settings, false);
    }

    getSubsystems() {
        return this.makeRequest('subsystems');
    }

    async updateSubsystem(subsystem) {
        return this.makeRequest('subsystems/' + subsystem.id, 'POST', subsystem, false);
    }
}
