class LoadFunctions {

    constructor() { };

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

    indexLoad() {
        const fillFeaturedBlogs = () => {
            const blogsElem = document.getElementById('new-blogs');
            const getMainImagePath = (images) => {
                if (!images || !images.length) {
                    return '';
                }
                images.forEach(e => {
                    if (e.isMainImage) {
                        return e.imagePath;
                    }
                })
                return images[0].imagePath;
            }
            this.apiCall('GET', 'http://localhost:52162/api/blogs', (json) => {
                const result = JSON.parse(json);
                result.forEach(e => {
                    blogsElem.innerHTML += `
                    <div class="item--new-blog">
                        <img src="./images/BlogImages/${getMainImagePath(e.images)}" alt="">
                        <div class="new-blog-title">
                            ${e.blogTitle}
                        </div>
                    </div>
                `;
                });
            });
        };

        fillFeaturedBlogs();
    };
};

const loadFuncs = new LoadFunctions();
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
            loadFuncs.indexLoad();
        }
    },
    '/index': {
        filePath: '/index.html',
        callBack: () => {
            var script = document.createElement('script');

            script.setAttribute('type', 'module');
            script.setAttribute('src', './scripts/index_script.js');

            appElem.appendChild(script);
            loadFuncs.indexLoad();
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
