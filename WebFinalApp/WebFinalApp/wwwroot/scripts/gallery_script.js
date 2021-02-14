import Shared from '/scripts/shared.js';

const sharedFuncs = new Shared();


export default class Gallery {
    constructor() {
        this.isLoading = false;
    };

    gallerySectionHandler (e) {
        const gallerySections = [
            {
                'title': document.getElementById('gallery-title-cakes'),
                'section': document.getElementById('subsection-cakes'),
            },
            {
                'title': document.getElementById('gallery-title-decor'),
                'section': document.getElementById('subsection-decor'),
            },
            {
                'title': document.getElementById('gallery-title-cookies'),
                'section': document.getElementById('subsection-cookies'),
            }
        ];

        var clickedList = e.srcElement.classList;
        if (clickedList.contains('gallery-title--clicked')) {
            if (window.innerWidth <= 960) return;
            clickedList.remove('gallery-title--clicked');
            gallerySections.forEach(s => {
                s.section.style.display = 'flex';
            });
            document.getElementById('dynamic_style').innerHTML = ``;
        } else {
            document.getElementById('dynamic_style').innerHTML = `
                div .gallery-subsection {
                    width: 100%;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-evenly;
                }

                div .gallery-card {
                    width: 30%;
                }
            `;
            gallerySections.forEach(s => {
                if (s.title.id != e.srcElement.id) {
                    s.section.style.display = 'none';
                    if (s.title.classList.contains('gallery-title--clicked')) {
                        s.title.classList.remove('gallery-title--clicked');
                    }
                } else {
                    s.section.style.display = 'flex';
                }
            });
            clickedList.add('gallery-title--clicked');
        }
    }

    async fillGallery(filtersUpdated = false) {
        const cakesElem = document.getElementById('subsection-cakes');
        const decorElem = document.getElementById('subsection-decor');
        const cookiesElem = document.getElementById('subsection-cookies');
        if (filtersUpdated) {
            cakesElem.innerHTML = '';
            decorElem.innerHTML = '';
            cookiesElem.innerHTML = '';
        }
        const skip = Math.max(cakesElem.childElementCount, decorElem.childElementCount, cookiesElem.childElementCount);
        const take = 3;
        let queryString = sharedFuncs.apiUrl + `/api/images/GetGalleryImages?skip=${skip}&take=${take}`;
        this.filterTags.forEach(e => queryString += `&filters=${e}`);
        sharedFuncs.apiCall('GET', queryString, function(json) {
            const result = JSON.parse(json);
            const galleryFill = (source, elem) => {
                source.forEach(e => {
                    let newElem = `<div class="gallery-card">
                            <div class="card-content">
                                <img class="gallery-image" src="/images/BlogImages/${e.imagePath}" alt="">
                                <div class="redirections">
                                    <a class="redirect-image" href="/images/BlogImages/${e.imagePath}" target="_blank">
                                        <img class="redirect-image" src="/images/redirect_image.png" alt="">
                                    </a>`;
                    if (e.blogId != null) {
                        newElem += `
                                    <a class="redirect-image" onclick="goTo('/article/${e.blogId}');">
                                        <img class="redirect-image" src="/images/redirect_blog.png" alt="">
                                    </a>`;
                    }
                    newElem += `
                                    <a class="redirect-image" onclick="goTo('/order/${e.imageId}', 'order')">
                                        <img class="redirect-image" src="/images/redirect_order.png" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>`;
                    elem.innerHTML += newElem;
                });
            };
            galleryFill(result.cakeImages, cakesElem);
            galleryFill(result.decorImages, decorElem);
            galleryFill(result.cookieImages, cookiesElem);
            setTimeout(() => { this.isLoading = false; }, 1500);
        }.bind(this));
    };

    async scrollHandler() {
        if (this.isLoading) return;
        const contentElem = document.getElementById('gallery__items');
        if (window.innerHeight + window.scrollY > (contentElem.offsetTop + contentElem.offsetHeight)) {
            this.isLoading = true;
            this.fillGallery();
        }
    }

    addTags(e) {
        if (e.key !== undefined && e.key !== 'Enter') return;
        const tagList = document.getElementById('filter_tags');
        const inputElem = document.getElementById('tag_input_text');
        const inputVal = inputElem.value;
        inputElem.value = '';
        const tags = inputVal.split(/(\s+)/);

        tags.forEach(t => {
            if (t === '' || /^\s+$/.test(t) || this.filterTags.includes(t)) return;
            this.filterTags.push(t);
            const tagElem = document.createElement('div');
            tagElem.className = 'filter_tag';
            tagElem.innerHTML = t;
            tagList.appendChild(tagElem);
            tagElem.addEventListener('click', (e) => {
                this.filterTags = this.filterTags.filter(function (item) {
                    return item !== e.target.textContent;
                })
                e.target.remove();
                this.fillGallery(true);
            });
        });
        this.fillGallery(true);
    }

    galleryLoad() {
        this.filterTags = [];
        const gallerySections = [
            {
                'title': document.getElementById('gallery-title-cakes'),
                'section': document.getElementById('subsection-cakes'),
            },
            {
                'title': document.getElementById('gallery-title-decor'),
                'section': document.getElementById('subsection-decor'),
            },
            {
                'title': document.getElementById('gallery-title-cookies'),
                'section': document.getElementById('subsection-cookies'),
            }
        ];
        gallerySections.forEach(e => {
            e.title.addEventListener('click', this.gallerySectionHandler);
        });


        if (window.innerWidth <= 960) gallerySections[1].title.dispatchEvent(new MouseEvent('click'));
        this.windResizeEvent = () => {
            if (window.innerWidth <= 960 && !gallerySections.some(e => e.title.classList.contains('gallery-title--clicked'))) {
                gallerySections[1].title.dispatchEvent(new MouseEvent('click'));
            }
        };

        window.addEventListener('resize', this.windResizeEvent);

        this.isLoading = true;
        this.fillGallery();
        setTimeout(() => { this.isLoading = false; }, 1000);
        this.scrollHandlerProt = this.scrollHandler.bind(this);
        window.addEventListener('scroll', this.scrollHandlerProt);


        document.getElementById('tag_input_button').addEventListener('click', this.addTags.bind(this));
        document.getElementById('tag_input_text').addEventListener('keydown', this.addTags.bind(this));
    }

    galleryUnload() {
        this.filterTags = [];
        window.removeEventListener('scroll', this.scrollHandlerProt);
        window.removeEventListener('resize', this.windResizeEvent);
    }
}