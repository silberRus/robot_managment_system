class Task {
    constructor(taskAPI = {}) {
        this.UID = taskAPI.UID || '';
        this.name = taskAPI.name || '';
        this.subsystem = taskAPI.subsystem || '';
        this.status = taskAPI.status || 'new';
        this.robot = taskAPI.robot || null;
        this.errorDescription = taskAPI.errorDescription || '';
        this.text = taskAPI.text || '';
        this.executionAttempts = taskAPI.executionAttempts || 0;
    }
}