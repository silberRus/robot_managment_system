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
        return await this.makeRequest('robots');
    }

    async addRobot(robot) {
        return await this.makeRequest('robots', 'POST', robot);
    }

    async updateRobot(robot) {
        return await this.makeRequest('robot/' + robot.name, 'POST', robot, false);
    }

    async deleteRobot(robot) {
        return await this.makeRequest('robot/' + robot.name, 'DELETE', null, false);
    }

    async changeRobot(robot) {
        return await this.makeRequest('robot/' + robot.id, 'POST', robot, false);
    }

    async getTasks(limit, filter, markedSubsystemsIds) {
        console.log(limit);
        let filterApi = {limit: limit};
        // Проверяем, есть ли в фильтре хотя бы одно свойство со значением false
        if (Object.values(filter).some(value => !value)) {
            filterApi = {
                ...filterApi,
                "filters": filter
            };
        }
        if (markedSubsystemsIds.length) {
            filterApi = {
                ...filterApi,
                "subsystems": markedSubsystemsIds
            };
        }
        // Отправляем запрос с фильтрами, если filterApi не пустой
        return Object.keys(filterApi).length ?
            await this.makeRequest('tasks', 'POST', filterApi) :
            await this.makeRequest('tasks');
    }

    async getTask(UID) {
        return await this.makeRequest('tasks/' + UID);
    }

    async getSettings() {
        return await this.makeRequest('settings');
    }

    async setSettings(settings) {
        return await this.makeRequest('settings', 'POST', settings, false);
    }

    async getSubsystems() {
        return await this.makeRequest('subsystems');
    }

    async updateSubsystem(subsystem) {
        return await this.makeRequest('subsystems/' + subsystem.id, 'POST', subsystem, false);
    }
}
