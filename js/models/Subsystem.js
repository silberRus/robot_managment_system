class SubSystem {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.children = [];
    }

    addChild(subSystem) {
        this.children.push(subSystem);
    }
}