import Shared from '/scripts/shared.js';

const sharedFuncs = new Shared();


export default class Index {
    constructor() { };


    addScroller(elem) {
        let pos = { top: 0, left: 0, x: 0, y: 0 };
        let startPos = { x: 0, y: 0 };

        const mouseDownHandler = function (e) {
            elem.style.cursor = 'grabbing';
            elem.style.userSelect = 'none';

            pos = {
                left: elem.scrollLeft,
                top: elem.scrollTop,
                // Get the current mouse position
                x: e.clientX,
                y: e.clientY,
            };

            startPos = {
                x: e.clientX,
                y: e.clientY,
            };
            elem.addEventListener('mousemove', mouseMoveHandler);
            elem.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            // Scroll the element
            elem.scrollTop = pos.top - dy;
            elem.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function (e) {
            elem.style.cursor = 'pointer';
            elem.style.removeProperty('user-select');

            elem.removeEventListener('mousemove', mouseMoveHandler);
            elem.removeEventListener('mouseup', mouseUpHandler);
            if (startPos.x == e.x && startPos.y == e.y) {
                e.target.querySelector('.targ_link').dispatchEvent(new MouseEvent('click'));
            }
        };

        // Attach the handler
        elem.addEventListener('mousedown', mouseDownHandler);
    }

    scrollRight (elem) {
        elem.scrollLeft += 200;
    };

    scrollLeft (elem) {
        elem.scrollLeft -= 200;
    };

    indexLoad() {
        const scrollerImgCenter = document.getElementById('scroller_img_center');
        const scrollerImgLeft = document.getElementById('scroller_img_left');
        const scrollerImgRight = document.getElementById('scroller_img_right');


        scrollerImgLeft.onclick = function () {
            const temp = scrollerImgCenter.src;
            scrollerImgCenter.src = scrollerImgLeft.src;
            scrollerImgLeft.src = temp;
        };

        scrollerImgRight.onclick = function () {
            const temp = scrollerImgCenter.src;
            scrollerImgCenter.src = scrollerImgRight.src;
            scrollerImgRight.src = temp;
        };


        const blog_elem = document.getElementById('new-blogs');
        const tweet_elem = document.getElementById('new-tweets');
        this.addScroller(blog_elem);
        this.addScroller(tweet_elem);

        document.getElementById('right-arrow-blogs').addEventListener('click', () => {
            this.scrollRight(blog_elem);
        });
        document.getElementById('left-arrow-blogs').addEventListener('click', () => {
            this.scrollLeft(blog_elem);
        });


        document.getElementById('right-arrow-tweets').addEventListener('click', () => {
            this.scrollRight(tweet_elem);
        });
        document.getElementById('left-arrow-tweets').addEventListener('click', () => {
            this.scrollLeft(tweet_elem);
        });

        const fillFeaturedBlogs = () => {
            const blogsElem = document.getElementById('new-blogs');
            sharedFuncs.apiCall('GET', 'http://localhost:52162/api/blogs/GetBlogPreviews/?skip=0&take=10', (json) => {
                const result = JSON.parse(json);
                result.forEach(e => {
                    blogsElem.innerHTML += `
                        <div class="item--new-blog" target="_blank">
                            <a class="targ_link" href="/article/${e.id}" target="_blank"></a>
                            <img src="/images/BlogImages/${e.image.imagePath}" alt="">
                            <div class="new-blog-title">
                                ${e.blogTitle}
                            </div>
                        </div>
                    `;
                });
            });
        };

        fillFeaturedBlogs();
    }
}

