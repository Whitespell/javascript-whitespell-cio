(function(){

    var Cors = {};

    Cors.work = function(data) {
        "use strict";

        switch(data.task) {

            case "initialize": {
                return;
            }
            case "request": {
                if(data.params.method === undefined) {
                    data.params.method = "GET";
                }
                Cors.makeCorsRequest(data.params.url, data.params.method,  data.uid, data.params.parseData);
                return;
            }
        }
    };

// Create the XHR object.
    Cors.createCORSRequest = function(method, url, parseData) {

        try {
            if(method === "get") {
                url = url+"?"+parseData;
            }
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // XHR for Chrome/Firefox/Opera/Safari.
                xhr.open(method, url, true);
                if(method === "post") {
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }
            } else if (typeof XDomainRequest != "undefined") {
                // XDomainRequest for IE.
                xhr = new XDomainRequest();
                xhr.open("GET", url);
            } else {
                // CORS not supported.
                xhr = null;
            }
        }catch(er){
            console.log(er.message);
        }
        return xhr;
    };

// Helper method to parse the title tag from the response.


// Make the actual CORS request.
    Cors.makeCorsRequest = function(url, method,  uid, parseData) {

        var url = url;

        var xhr = Cors.createCORSRequest(method,
            url, parseData);
        if (!xhr) {
            Cors.say({
                task: "request",
                uid: uid,
                content: "ERROR"

            });
            return;
        }

        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;
            Cors.say({
                task: "request",
                uid: uid,
                content: text
            });
        };

        xhr.onerror = function() {
            Cors.say({
                task: "request",
                uid: uid,
                content: "ERROR"
            });
        };

        if(method === "post") {
            xhr.send(parseData);
        } else {
            xhr.send();
        }
    };


    self.addEventListener("message", function(e) {
        Cors.work(e.data);
    }, false);


    Cors.say = function(e) {
        try {
            self.postMessage(e);
        } catch(error) {
            Whitespell.workers.handleManualResponse("Cors", e);
        }
    };

    Cors.CorsListen = function(e) {
        Cors.work(e);
    };

    return Cors;

}());