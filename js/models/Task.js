class Task {
    constructor(taskAPI = {}) {
        this.UID = taskAPI.UID || '';
        this.name = taskAPI.name || '';
        this.subsystemTitle = taskAPI.subsystemTitle || '';
        this.status = taskAPI.status || 'new';
        this.robot = taskAPI.robot || null;
        this.errorDescription = taskAPI.errorDescription || '';
        this.text = taskAPI.text || '';
        this.properties = taskAPI.properties || {};
        this.executionAttempts = taskAPI.executionAttempts || 0;

        this.creationDate = taskAPI.creationDate ? new Date(taskAPI.creationDate) : null;
        this.completionDate = taskAPI.completionDate ? new Date(taskAPI.completionDate) : null;
        this.launchDate = taskAPI.launchDate ? new Date(taskAPI.launchDate) : null;
    }
}