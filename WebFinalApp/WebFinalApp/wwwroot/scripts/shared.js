export default class Shared {
    constructor() {

    };

    //apiUrl = 'https://webfinalkt.azurewebsites.net';
    apiUrl = 'http://localhost:52162';

    apiCall(method, url, callback) {
        var request = new XMLHttpRequest();
        request.open(method, url, true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                callback(this.response);
            } else {
                // We reached our target server, but it returned an error

            }
        };

        request.onerror = function () {
            console.log('errored!!');
        };

        request.send();
    };

    asyncApiCall(method, url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    addListenerMulti(el, s, fn) {
        s.split(' ').forEach(e => el.addEventListener(e, fn));
    }

    removeListenerMulti(el, s, fn) {
        s.split(' ').forEach(e => el.removeEventListener(e, fn));
    }
}