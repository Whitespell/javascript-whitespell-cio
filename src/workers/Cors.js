(function () {
    var Cors = {};
    Cors.work = function (data) {
        switch (data.task) {
            case"initialize":
                return;
            case"request":
                if (data.params.method === undefined) {
                    data.params.method = "GET"
                }
                Cors.makeCorsRequest(data.params.url, data.params.method, data.uid, data.params.payLoad, data.params.headerObject);
                return
        }
    };
    Cors.createCORSRequest = function (method, url, payLoad, headerObject) {
        try {
            if (method === "get") {
                url = url + "?" + payLoad
            }
            var xhr = new XMLHttpRequest();


            if ("withCredentials" in xhr) {
                xhr.open(method, url, true);
            } else {
                if (typeof XDomainRequest != "undefined") {
                    xhr = new XDomainRequest();
                    xhr.open("GET", url)
                } else {
                    xhr = null
                }
            }

            for(var key in headerObject) {
                console.log("set key" + headerObject)
                    xhr.setRequestHeader(key, headerObject[key]);
            }


        } catch (er) {
            console.log(er.message)
        }
        return xhr
    };
    Cors.makeCorsRequest = function (url, method, uid, payLoad, headerObject) {
        var url = url;
        var xhr = Cors.createCORSRequest(method, url, payLoad, headerObject);
        if (!xhr) {
            Cors.say({task: "request", uid: uid, content: "ERROR"});
            return
        }
        xhr.onload = function () {
            var data = {
                responseText : xhr.responseText,
                status : xhr.status
            };
            Cors.say({task: "request", uid: uid, content: data})
        };
        xhr.onerror = function () {
            Cors.say({task: "request", uid: uid, content: "ERROR"})
        };
        if (method === "post") {
            xhr.send(payLoad)
        } else {
            xhr.send()
        }
    };
    self.addEventListener("message", function (e) {
        Cors.work(e.data)
    }, false);
    Cors.say = function (e) {
        try {
            self.postMessage(e)
        } catch (error) {
            workerHandler.handleResponse(e)
        }
    };
    Cors.CorsListen = function (e) {
        Cors.work(e)
    };
    return Cors;
}());
