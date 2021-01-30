import Gallery from '/scripts/gallery_script.js';
import Index from '/scripts/index_script.js';
import Blogs from '/scripts/blogs_script.js';
import Article from '/scripts/article_script.js';
import Order from '/scripts/order_script.js';

const gallery = new Gallery();
const index = new Index();
const blogs = new Blogs();
const article = new Article();
const order = new Order();

const appElem = document.getElementById('app'); 

// Regex matching code stolen from https://dev.to/dcodeyt/building-a-single-page-app-without-frameworks-hl9
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
        unload: () => {
            index.indexUnload();
        }
    },
    '/index': {
        filePath: '/index.html',
        callBack: (params) => {
            index.indexLoad();
        },
        unload: () => {
            index.indexUnload();
        }
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
        callBack: (params) => {
            article.articleLoad(params.id);
        },
        unload: () => { }
    },
    '/about': {
        filePath: '/about.html',
        callBack: (params) => { },
        unload: () => { }
    },
    '/order': {
        filePath: '/order.html',
        callBack: (params) => {
            order.orderLoad();
        },
        unload: () => {
            order.orderUnload();
        }
    },
};

let unloadFunc;

const loadContent = (uri) => {
    const uriSections = uri.split('#', 2);
    uri = uriSections[0];
    let hash = '';
    if (uriSections.length === 2) {
        hash = uriSections[1];
    }
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
            if (hash) {
                setTimeout(() => {
                    document.getElementById(hash).scrollIntoView(true);
                }, 10);
            }
        };
    };
    xhttp.open('GET', routeMaps[match.route].filePath, true);
    xhttp.send();
    unloadFunc = routeMaps[match.route].unload;
};

window.goTo = (uri, routeName) => {
    if (uri.split('#')[0] === window.location.pathname) return;
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

window.onload = loadContent(window.location.pathname + window.location.hash);
window.addEventListener("popstate", popStateHandler);



document.getElementById('back-to-top-button').addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
