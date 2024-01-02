class ConnectorAPI {
    constructor(baseURL = 'http://localhost/MSK/hs/queue_actions/', basicAuth = 'Basic Um9ib3Q6MTIzNDU2') {
        this.baseURL = baseURL;
        this.basicAuth = basicAuth;
        this.robots = [];
        this.tasks = [];
        this.subsystems = [];
    }

    async makeRequest(endpoint, method = 'GET', data = null) {
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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    }

    async getRobots() {
        return this.makeRequest('robots');
    }

    async addRobot(robot) {
        return this.makeRequest('robots', 'POST', robot);
    }

    async deleteRobot(id) {
        return this.makeRequest('robots/' + id, 'DELETE');
    }

    async changeRobot(robot) {
        return this.makeRequest('robots/' + robot.id, 'POST', robot);
    }

    getSubsystems() {
        return this.makeRequest('subsystems');
    }
}
