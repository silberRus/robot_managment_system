class ConnectorAPI {
    constructor(baseURL = 'https://default-api.example.com/', username = 'defaultUsername', password = 'defaultPassword') {
        this.baseURL = baseURL;
        this.basicAuth = "Basic " + btoa(username + ":" + password);
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
}
