import Gallery from './gallery_script.js';
import Index from './index_script.js';
import Blogs from './blogs_script.js';

const gallery = new Gallery();
const index = new Index();
const blogs = new Blogs();

const appElem = document.getElementById('app'); 

const pathToRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
const getParams = match => {
    if (match.result === []) return [];
    const values = match.result.slice(1);
    const keys = Array.from(match.route.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};



// uri : filePath
const routeMaps = {
    '/': {
        filePath: '/index.html',
        callBack: (params) => {
            index.indexLoad();
        },
        unload: () => { }
    },
    '/index': {
        filePath: '/index.html',
        callBack: (params) => {
            index.indexLoad();
        },
        unload: () => { }
    },
    '/gallery': {
        filePath: '/gallery.html',
        callBack: (params) => {
            gallery.galleryLoad();
        },
        unload: () => {
            gallery.galleryUnload();
        }
    },
    '/blogs': {
        filePath: '/blogs.html',
        callBack: (params) => {
            blogs.blogsLoad();
        },
        unload: () => {
            blogs.blogsUnload();
        }
    },
    '/article/:id': {
        filePath: '/article.html',
        callBack: (params) => { console.log(params); },
        unload: () => { }
    },
};

let unloadFunc;

const loadContent = (uri) => {
    let match;
    for (const [route] of Object.entries(routeMaps)) {
        const curMatch = uri.match(pathToRegex(route));
        if (curMatch !== null) {
            match = {
                route,
                result: curMatch
            };
            break;
        }
    }
    if (match === undefined) {
        match = {
            route: '/',
            result: []
        };
    }

    const callBack = routeMaps[match.route].callBack;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === this.DONE && this.status < 400) {
            appElem.innerHTML = this.responseText;
            callBack(getParams(match));
        };
    };
    xhttp.open('GET', routeMaps[match.route].filePath, true);
    xhttp.send();
    unloadFunc = routeMaps[match.route].unload;
};

window.goTo = (uri, routeName) => {
    if (unloadFunc !== undefined) {
        unloadFunc();
    }
    window.history.pushState({}, routeName, uri);

    loadContent(uri);
};

function popStateHandler() {
    if (unloadFunc !== undefined) {
        unloadFunc();
    }
    loadContent(window.location.pathname);
}

window.onload = loadContent(window.location.pathname);
window.addEventListener("popstate", popStateHandler);



document.getElementById('back-to-top-button').addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
