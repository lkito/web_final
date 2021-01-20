import Shared from './shared.js';

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
                    justify-content: space-around;
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

    async fillGallery() {
        const cakesElem = document.getElementById('subsection-cakes');
        const decorElem = document.getElementById('subsection-decor');
        const cookiesElem = document.getElementById('subsection-cookies');
        const skip = Math.max(cakesElem.childElementCount, decorElem.childElementCount, cookiesElem.childElementCount);
        const take = 3;
        sharedFuncs.apiCall('GET', `http://localhost:52162/api/images/GetGalleryImages/${skip}/${take}`, (json) => {
            const result = JSON.parse(json);
            const galleryFill = (source, elem) => {
                source.forEach(e => {
                    let newElem = `<div class="gallery-card">
                            <div class="card-content">
                                <img class="gallery-image" src="./images/BlogImages/${e.imagePath}" alt="">
                                <div class="redirections">
                                    <a class="redirect-image" href="./images/BlogImages/${e.imagePath}" target="_blank">
                                        <img class="redirect-image" src="./images/redirect_image.png" alt="">
                                    </a>`;
                    if (e.blogId != null) {
                        newElem += `
                                    <a class="redirect-image" href="./article/${e.blogId}" target="_blank">
                                        <img class="redirect-image" src="./images/redirect_blog.png" alt="">
                                    </a>`;
                    }
                    newElem += `
                                </div>
                            </div>
                        </div>`;
                    elem.innerHTML += newElem;
                });
            };
            galleryFill(result.cakeImages, cakesElem);
            galleryFill(result.decorImages, decorElem);
            galleryFill(result.cookieImages, cookiesElem);
        });
    };

    async scrollHandler() {
        if (this.isLoading) return;
        const contentElem = document.getElementById('gallery__items');
        if (window.innerHeight + window.scrollY > (contentElem.offsetTop + contentElem.offsetHeight)) {
            this.isLoading = true;
            await this.fillGallery();
            setTimeout(() => { this.isLoading = false; }, 200);
        }
    }

    galleryLoad() {
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

        this.isLoading = true;
        this.fillGallery();
        setTimeout(() => { this.isLoading = false; }, 200);
        this.scrollHandlerProt = this.scrollHandler.bind(this);
        window.addEventListener('scroll', this.scrollHandlerProt);
    }

    galleryUnload() {
        window.removeEventListener('scroll', this.scrollHandlerProt);
    }
}