import Shared from './shared.js';

const sharedFuncs = new Shared();


export default class Blogs {
    constructor() {
        this.isLoading = false;
    };

    async fillBlogs() {
        const blogsElem = document.getElementById('article__items');
        const skip = blogsElem.childElementCount;
        const take = 6;
        let queryString = sharedFuncs.apiUrl + `/api/blogs/GetBlogPreviews?skip=${skip}&take=${take}`;
        if (this.dateFrom) {
            queryString += `&dateFrom=${this.dateFrom}`;
        }
        if (this.dateTo) {
            queryString += `&dateTo=${this.dateTo}`;
        }
        if (this.titleFilter) {
            queryString += `&title=${this.titleFilter}`;
        }
        sharedFuncs.apiCall('GET', queryString, function(json) {
            const result = JSON.parse(json);
            result.forEach(e => {
                const curDate = new Date(e.dateCreated);
                blogsElem.innerHTML += `
                    <div class="article-card">
                        <img class="article-image" src="/images/BlogImages/${e.image.imagePath}" alt="">
                        <div class="article-info">
                            <div class="article-date">
                                <img class="date-logo" src="/images/clock.png" alt="">
                                <p>${curDate.toLocaleTimeString() + ' · ' + curDate.toLocaleDateString()}</p>
                            </div>
                            <a class="article-title" href="/article/${e.id}" target="_blank">
                                ${e.blogTitle}
                            </a>
                        </div>
                    </div>
                 `;
            });
            setTimeout(() => { this.isLoading = false; }, 800);
        }.bind(this));
    };

    fillFeaturedBlogs() {
        const blogsElem = document.getElementById('main-article__items');
        const take = 3;
        sharedFuncs.apiCall('GET', sharedFuncs.apiUrl + `/api/blogs/GetBlogPreviews?skip=3&take=${take}`, function(json) {
            const result = JSON.parse(json);
            const curDate1 = new Date(result[0].dateCreated);
            blogsElem.innerHTML += `
                <div class="main-article-card">
                    <img class="main-article-image" src="/images/BlogImages/${result[0].image.imagePath}" alt="">
                    <div class="main-article-info">
                        <a class="main-article-title" href="/article/${result[0].id}" target="_blank">
                                ${result[0].blogTitle}
                        </a>
                        <div class="main-article-date">
                            <img class="date-logo" src="/images/clock.png" alt="">
                            <p>${curDate1.toLocaleTimeString() + ' · ' + curDate1.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            `;
            blogsElem.innerHTML += `<div id="main-article-secondaries" class="main-article-secondaries"></div>`;
            const secondaryElems = document.getElementById('main-article-secondaries');
            const addSecondary = (elem) => {
                const curDate1 = new Date(elem.dateCreated);
                secondaryElems.innerHTML += `
                    <div class="main-article-secondary-card">
                        <img class="main-article-image" src="/images/BlogImages/${elem.image.imagePath}" alt="">
                        <div class="main-article-info">
                            <a class="main-article-title" href="/article/${elem.id}" target="_blank">
                                ${elem.blogTitle}
                            </a>
                            <div class="main-article-date">
                                <img class="date-logo" src="/images/clock.png" alt="">
                                <p>${curDate1.toLocaleTimeString() + ' · ' + curDate1.toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
            addSecondary(result[1]);
            addSecondary(result[2]);
        }.bind(this));
    };

    async scrollHandler() {
        if (this.isLoading) return;
        const contentElem = document.getElementById('article__items');
        if (window.innerHeight + window.scrollY > (contentElem.offsetTop + contentElem.offsetHeight)) {
            this.isLoading = true;
            this.fillBlogs();
        }
    }

    blogsLoad() {
        this.isLoading = true;
        this.fillBlogs();
        setTimeout(() => { this.isLoading = false; }, 800);
        this.scrollHandlerProt = this.scrollHandler.bind(this);
        window.addEventListener('scroll', this.scrollHandlerProt);
        this.fillFeaturedBlogs();
        document.getElementById('filter_button').addEventListener('click', function () {
            this.dateFrom = document.getElementById('blog_filter_start_time').value;
            this.dateTo = document.getElementById('blog_filter_end_time').value;
            this.titleFilter = document.getElementById('title_input_text').value;
            document.getElementById('article__items').innerHTML = '';
            this.fillBlogs();
        }.bind(this));
    }

    blogsUnload() {
        window.removeEventListener('scroll', this.scrollHandlerProt);
    }
}