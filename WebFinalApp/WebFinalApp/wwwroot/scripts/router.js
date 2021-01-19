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
            this.apiCall('GET', 'http://localhost:52162/api/blogs/GetBlogPreviews', (json) => {
                const result = JSON.parse(json);
                result.forEach(e => {
                    blogsElem.innerHTML += `
                    <div class="item--new-blog">
                        <img src="./images/BlogImages/${e.image.imagePath}" alt="">
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

    galleryLoad() {
        let isLoading = false;
        const fillGallery = async () => {
            const cakesElem = document.getElementById('subsection-cakes');
            const decorElem = document.getElementById('subsection-decor');
            const cookiesElem = document.getElementById('subsection-cookies');
            const skip = Math.max(cakesElem.childElementCount, decorElem.childElementCount, cookiesElem.childElementCount);
            const take = 3;
            this.apiCall('GET', `http://localhost:52162/api/images/GetGalleryImages/${skip}/${take}`, (json) => {
                const result = JSON.parse(json);
                const galleryFill = (source, elem) => {
                    source.forEach(e => {
                        elem.innerHTML += `
                        <div class="gallery-card">
                            <div class="card-content">
                                <img class="gallery-image" src="./images/BlogImages/${e.imagePath}" alt="">
                                <div class="redirections">
                                    <a class="redirect-image" href="./images/BlogImages/${e.imagePath}" target="_blank">
                                        <img class="redirect-image" src="./images/redirect_image.png" alt="">
                                    </a>
                                    <a class="redirect-image" href="./article/${e.blogId}" target="_blank">
                                        <img class="redirect-image" src="./images/redirect_blog.png" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                `;
                    });
                };
                galleryFill(result.cakeImages, cakesElem);
                galleryFill(result.decorImages, decorElem);
                galleryFill(result.cookieImages, cookiesElem);
            });
        };

        isLoading = true;
        fillGallery();
        setTimeout(function () { isLoading = false; }, 200);
        window.addEventListener('scroll', async () => {
            if (isLoading) return;
            const contentElem = document.getElementById('gallery__items');
            if (window.innerHeight + window.scrollY > (contentElem.offsetTop + contentElem.offsetHeight)) {
                isLoading = true;
                await fillGallery();
                setTimeout(function () { isLoading = false; }, 200);
            }
        });
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
            loadFuncs.galleryLoad();
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
