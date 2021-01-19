export default class Shared {
    constructor() {

    };

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
}