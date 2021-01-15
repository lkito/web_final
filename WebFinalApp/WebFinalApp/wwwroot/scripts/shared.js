export default class Shared {
    constructor() {
        document.getElementById('back-to-top-button').addEventListener('click', () => {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
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