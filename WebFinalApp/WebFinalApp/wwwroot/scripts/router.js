
const appElem = document.getElementById('app'); 

// uri : filePath
const routeMaps = {
    '/': {
        filePath: '/index.html',
        callBack: () => {
            var script = document.createElement('script');

            script.setAttribute('type', 'module');
            script.setAttribute('src', './scripts/index_script.js');

            appElem.appendChild(script);
        }
    },
    '/index': {
        filePath: '/index.html',
        callBack: () => {
            var script = document.createElement('script');

            script.setAttribute('type', 'module');
            script.setAttribute('src', './scripts/index_script.js');

            appElem.appendChild(script);
        }
    },
    '/gallery': {
        filePath: '/gallery.html',
        callBack: () => {
            var script = document.createElement('script');

            script.setAttribute('type', 'module');
            script.setAttribute('src', './scripts/gallery_script.js');

            appElem.appendChild(script);
        }
    },
    '/blog': {
        filePath: '/blog.html',
        callBack: () => { }
    },
    '/article': {
        filePath: '/article.html',
        callBack: () => { }
    },
};

const loadContent = (uri) => {
    const callBack = routeMaps[uri].callBack;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === this.DONE && this.status < 400) {
            appElem.innerHTML = this.responseText;
            callBack();
        };
    };
    xhttp.open('GET', routeMaps[uri].filePath, true);
    xhttp.send();
};

function goTo(uri, routeName) {
    window.history.pushState({}, routeName, uri);

    loadContent(uri);
};

window.onload = loadContent(window.location.pathname);
