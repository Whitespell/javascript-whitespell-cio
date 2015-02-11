var Whitespell = function(apiKey, options){

    //make it possible to only pass an apiKey
    //or to don't pass either one
    if(typeof arguments[0] === 'object'){
        apiKey = undefined;
        options = arguments[0];
    }

    //default options
    var defaults = {

        workers: {
            Cors: {
                task: "request",
                params: {
                    url: 'http://172.16.1.2:8040/blox',
                    method: "post"
                }
            },
            WebSocket: {
                host: 'http://172.16.1.2',
                port: 9092
            }
        }

    };

    //merge defaults and user specified options
    options = typeof options === 'object' ? this.mergeRecursive(defaults, options) : defaults;

    //set extra options
    options.apiKey = apiKey;
    options.deviceType = this.getDeviceType();

    //initialize workerHandler
    this.workerHandler = new WorkerHandler(options);

    this.options = options;

    //make functionality available for other parts
    //of the application
    this.Cache = C;
    this.ie = ie;
};

Whitespell.prototype.getDeviceType = function(){
    var uA = navigator.userAgent;

    if(uA.match(/iPhone/i)){
        return 'mobile';
    }

    if(uA.match(/Android/i)){
        return 'mobile';
    }

    return 'desktop';

};

Whitespell.prototype.mergeRecursive = function(obj1, obj2) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if ( obj2[p].constructor==Object ) {
                obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

        } catch(e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }

    return obj1;

};

Whitespell.prototype.sendData = function(data, options, callback){

    //allow users to not pass additional options
    if(typeof options === 'function'){
        callback = arguments[1];
        options = {};
    }

    //merge passed options with defaults
    options = this.mergeRecursive(this.options.workers.Cors, options);

    //add data
    options.params.parseData = data;

    //assign worker
    myOwnWs.workerHandler.assign("Cors", options, callback);

};