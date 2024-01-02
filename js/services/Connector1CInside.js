class Connector1CInside {
    constructor() {
        this.MainEvent = new Event('click');
        this.Promises = [];
        this.robots = [];
        this.tasks = [];
        this.subsystems = this.getSubsystems();
    }

    SendData(Func, Data, Patch, WaitFor = 0) {
        let PromIndex = -1;
        if (WaitFor) {
            var Prom = new Promise(Resolve => {
                PromIndex = this.AddPromise(Resolve);
            });
        }
        this.MainEvent.detail = JSON.stringify([Func, Data, Patch, PromIndex]);
        dispatchEvent(this.MainEvent);
        return WaitFor ? Prom : null;
    }

    CommandTinyClient(Func, Data, WaitFor = 0) {
        return this.SendData(Func, Data, 'tiny', WaitFor);
    }

    AddPromise(Res) {
        let Len = this.Promises.length;
        this.Promises[Len] = Res;
        return Len;
    }

    OdinAssCallBack(PromIndex, Param) {
        this.Promises[PromIndex](Param);
        this.Promises.splice(PromIndex, 1);
    }

    getTasks() {
        return this.SendData("GetTasks", {}, "tasksHandler");
    }

    getSubsystems() {
        return this.SendData("GetSubsystems", {}, "subsystemsHandler");
    }

    getRobots() {
        return this.SendData("GetRobots", {}, "robotsHandler");
    }

    // Обработчики для каждого типа данных
    tasksHandler(data) {
        // Обработка данных задач, полученных из 1С
    }

    subsystemsHandler(data) {
        // Обработка данных подсистем, полученных из 1С
    }

    robotsHandler(data) {
        // Обработка данных роботов, полученных из 1С
    }

    // Дополнительные методы...
}

// Пример использования
let connector = new Connector1CInside();
// connector.SendData(...)
// connector.CommandTinyClient(...)
