var Cache = function() {
    this.storage = [];
};

Cache.prototype.get = function (container, id, name) {
    if (this.storage[container] === undefined || this.storage[container][id] === undefined || this.storage[container][id][name] === undefined) {
        return null;
    }

    return name !== undefined ? this.storage[container][id][name] : this.storage[container][id];
};

Cache.prototype.set = function (container, id, name, val) {

    if (this.storage[container][id] === undefined) {
        this.storage[container][id] = [];
    }

    this.storage[container][id][name] = val;
};

Cache.prototype.remove = function (container, id, name) {

    if (this.storage[container][id] === undefined) {
        this.storage[container][id] = [];
    }

    this.storage[container][id][name] = undefined;
};

Cache.prototype.addMemory = function (container) {

    if (this.storage[container] === undefined) {
        this.storage[container] = [];
    } else {
        var b = Math.random() * 10000;
        return C.addMemory(container + b);
    }
    return container;

};

var C = new Cache();