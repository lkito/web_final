import Gallery from './gallery_script.js';
import Index from './index_script.js';
import Blogs from './blogs_script.js';

const gallery = new Gallery();
const index = new Index();
const blogs = new Blogs();

const appElem = document.getElementById('app'); 

// uri : filePath
const routeMaps = {
    '/': {
        filePath: '/index.html',
        callBack: () => {
            index.indexLoad();
        },
        unload: () => { }
    },
    '/index': {
        filePath: '/index.html',
        callBack: () => {
            index.indexLoad();
        },
        unload: () => { }
    },
    '/gallery': {
        filePath: '/gallery.html',
        callBack: () => {
            gallery.galleryLoad();
        },
        unload: () => {
            gallery.galleryUnload();
        }
    },
    '/blogs': {
        filePath: '/blogs.html',
        callBack: () => {
            blogs.blogsLoad();
        },
        unload: () => {
            blogs.blogsUnload();
        }
    },
    '/article': {
        filePath: '/article.html',
        callBack: () => { },
        unload: () => { }
    },
};

let unloadFunc;

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
    unloadFunc = routeMaps[uri].unload;
};

window.goTo = (uri, routeName) => {
    if (unloadFunc !== undefined) {
        unloadFunc();
    }
    window.history.pushState({}, routeName, uri);

    loadContent(uri);
};

window.onload = loadContent(window.location.pathname);
